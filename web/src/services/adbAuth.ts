import { AdbClient } from "../libs/wadb/AdbClient";
import { Message } from "../libs/wadb/message";
import * as remoteAuth from "../api/remoteAuth";
import { openAlertModal } from "src/modals";
import { modals } from "@mantine/modals";

export const remoteAuthHandler = async (
  client: AdbClient,
  response: Message
): Promise<Message> => {
  if (response.header.cmd !== "AUTH") {
    throw new Error("Not an AUTH response");
  }

  if (response.header.arg0 !== 1) {
    throw new Error(`
        Invalid AUTH parameter. Expected 1 and received ${response.header.arg0}`);
  }

  if (!response.data) {
    throw new Error("AUTH message doens't contain data");
  }

  const token = response.data.buffer;

  const { token: signed, pubKey } = await remoteAuth.getSignedToken(token);

  // Send signed token
  const sigMsg = Message.authSignature(
    new DataView(signed),
    client.options.useChecksum
  );
  await client.sendMessage(sigMsg);

  // Wait for next step
  let next = await client.awaitMessage();
  if (next.header.cmd === "AUTH" && next.header.arg0 === 1) {
    const { modalId } = openAlertModal(
      "Confirmation Required",
      "On the laser ink display, confirm you want to grant access to this computer."
    );

    // Signature not recognized, send public key
    const keyMsg = Message.authPublicKey(
      new DataView(pubKey),
      client.options.useChecksum
    );
    await client.sendMessage(keyMsg);

    // And wait one more time for the device to prompt user
    next = await client.awaitMessage();
    modals.close(modalId);
  }

  // Now we should get CNXN
  if (next.header.cmd === "CNXN") {
    return next;
  } else {
    console.error("Authentication failed:", next);
    throw new Error("Authentication failed");
  }
};

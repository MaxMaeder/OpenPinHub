import { AdbClient } from "../libs/wadb/AdbClient";
import { Message } from "../libs/wadb/message";
import * as remoteAuth from "../api/remoteAuth";

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

  const signed = await remoteAuth.getSignedToken(token);

  const signatureMessage = Message.authSignature(
    new DataView(signed),
    client.options.useChecksum
  );
  await client.sendMessage(signatureMessage);

  const signatureResponse = await client.awaitMessage();
  if (signatureResponse.header.cmd === "CNXN") {
    return signatureResponse;
  } else {
    console.error("Authentication failed:", signatureResponse);
    throw Error("Authentication failed");
  }
};

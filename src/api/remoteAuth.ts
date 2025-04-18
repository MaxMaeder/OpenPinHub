import axios from "axios";

const authClient = axios.create({
  baseURL: "https://signing.openpin.org",
});

interface SerializedResponse {
  token: string;
  public_key: string;
}

interface SignedResponse {
  token: ArrayBuffer;
  pubKey: ArrayBuffer;
}

const decodeToken = (base64: string): ArrayBuffer => {
  const binaryString = atob(base64); // decode base64 to binary string
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer; // return the underlying ArrayBuffer
};

function parseOpenSshPubKey(line: string): ArrayBuffer {
  // 1) strip whitespace & trailing newline
  const trimmed = line.trim();
  // 2) split off the comment
  const [b64] = trimmed.split(" ");
  // 3) atob() ➔ binary string ➔ Uint8Array
  const binStr = atob(b64!);
  const u8 = new Uint8Array(binStr.length);
  for (let i = 0; i < binStr.length; i++) {
    u8[i] = binStr.charCodeAt(i);
  }
  // 4) wrap in DataView
  return u8.buffer;
}

export const getSignedToken = async (
  payload: ArrayBufferLike
): Promise<SignedResponse> => {
  const res = await authClient.post("/", payload);
  console.log(res);

  const data: SerializedResponse = res.data;

  return {
    token: decodeToken(data.token),
    pubKey: parseOpenSshPubKey(data.public_key),
  };
};

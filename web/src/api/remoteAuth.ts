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

const parsePubKey = (line: string): ArrayBuffer =>
  decodeToken(line.trim().split(" ")[0]!);

export const getSignedToken = async (
  payload: ArrayBufferLike
): Promise<SignedResponse> => {
  const res = await authClient.post("/", payload);
  console.log(res);

  const data: SerializedResponse = res.data;

  return {
    token: decodeToken(data.token),
    pubKey: parsePubKey(data.public_key),
  };
};

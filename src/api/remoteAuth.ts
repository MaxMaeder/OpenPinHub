import axios from "axios";

const authClient = axios.create({
  baseURL: "https://adb.openpinsigning.workers.dev",
});

interface SignedResponse {
  token: string;
  public_key: string;
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

export const getSignedToken = async (
  payload: ArrayBufferLike
): Promise<ArrayBuffer> => {
  const res = await authClient.post("/", payload);
  console.log(res);
  const signed: SignedResponse = res.data;

  return decodeToken(signed.token);
};

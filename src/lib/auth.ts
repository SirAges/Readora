import * as jose from "jose";
const getJwtSecretKey = () => {
  const secret = process.env.NEXT_PUBLIC_KEY;
  if (!secret || secret.length === 0) {
    throw new Error("no secret key");
  }
  return secret;
};

export const verifyAuth = async (token: string) => {
  try {
    const { payload } = await jose.jwtVerify(
      token,
      new TextEncoder().encode(getJwtSecretKey())
    );
    return payload;
  } catch (error) {
    console.log("error", error);
  }
};

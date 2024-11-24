import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function getTokenData(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    return null;
  }

  return token;
}

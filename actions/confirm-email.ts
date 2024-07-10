"use server";

import db from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { getVerificationToken } from "@/data/verificationToken";

export const confirmEmail = async (token: string, email: string) => {
  const verificationToken = await getVerificationToken(token, email);
  if (!verificationToken) {
    return { error: "Token does not exist" };
  }

  const isExpired = verificationToken.expires < new Date();
  if (isExpired) {
    return { error: "Token has expired" };
  }

  const existingUser = await getUserByEmail(verificationToken.email);
  if (!existingUser) {
    return { error: "User does not exist" };
  }

  await db.user.update({
    where: {
      email: verificationToken.email,
    },
    data: {
      emailVerified: new Date(),
      email: verificationToken.email,
    },
  });

  await db.verificationToken.delete({
    where: {
      token_email: {
        token: verificationToken.token,
        email: verificationToken.email,
      },
    },
  });

  return { success: "Email verified" };
};

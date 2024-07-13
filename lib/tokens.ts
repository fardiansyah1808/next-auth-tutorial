import { v4 as uuidv4 } from "uuid";
import db from "@/lib/db";
import { getVerificationTokenByEmail } from "@/data/verificationToken";
import { getVerificationResetPasswordTokenByEmail } from "@/data/resetPasswordToken";

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);
  if (existingToken) {
    await db.verificationToken.delete({
      where: { id: existingToken.id },
    });
  }

  const verificationToken = await db.verificationToken.create({
    data: { token, email, expires },
  });

  return verificationToken;
};

export const generateResetPasswordToken = async (email: string) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationResetPasswordTokenByEmail(email);
  if (existingToken) {
    await db.resetPasswordToken.delete({
      where: { id: existingToken.id },
    });
  }

  const resetPasswordToken = await db.resetPasswordToken.create({
    data: { token, email, expires },
  });

  return resetPasswordToken;
};

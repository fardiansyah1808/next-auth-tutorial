"use server";

import { NewPasswordSchema, RegisterSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcrypt";
import db from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { getVerificationResetPasswordToken } from "@/data/resetPasswordToken";

export const newPassword = async (
  data: z.infer<typeof NewPasswordSchema>,
  email: string,
  token: string
) => {
  const validatedFields = NewPasswordSchema.safeParse(data);
  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { confirmPassword } = data;
  const hashedPassword = await bcrypt.hash(confirmPassword, 10);
  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    return { error: "User not found" };
  }

  const resetPasswordToken = await getVerificationResetPasswordToken(
    token,
    email
  );
  if (!resetPasswordToken) {
    return { error: "Token not found" };
  }

  if (resetPasswordToken.expires < new Date()) {
    return { error: "Token expired" };
  }

  if (!existingUser.emailVerified) {
    await db.user.update({
      where: {
        email: resetPasswordToken.email,
      },
      data: {
        emailVerified: new Date(),
        email: resetPasswordToken.email,
      },
    });

    await db.verificationToken.delete({
      where: {
        token_email: {
          token: resetPasswordToken.token,
          email: resetPasswordToken.email,
        },
      },
    });
  }

  try {
    await db.user.update({
      where: { id: existingUser.id },
      data: { password: hashedPassword },
    });
  } catch (error) {
    return { error: "Error updating password" };
  }

  return { success: "Password updated" };
};

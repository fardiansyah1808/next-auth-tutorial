"use server";

import { ResetPasswordSchema } from "@/schemas";
import { z } from "zod";
import { getUserByEmail } from "@/data/user";
import { sendResetPasswordEmail } from "@/lib/mail";
import { generateResetPasswordToken } from "@/lib/tokens";
import { getVerificationResetPasswordTokenByEmail } from "@/data/resetPasswordToken";

export const resetPassword = async (
  data: z.infer<typeof ResetPasswordSchema>
) => {
  const validatedFields = ResetPasswordSchema.safeParse(data);
  if (!validatedFields.success) {
    return { error: "Invalid email!" };
  }

  const { email } = validatedFields.data;
  const user = await getUserByEmail(email);
  if (!user || !user.name) {
    return { error: "User not found!" };
  }

  const existingResetPasswordToken =
    await getVerificationResetPasswordTokenByEmail(email);
  if (existingResetPasswordToken) {
    return {
      error: "Reset password token already sent!, please check your email.",
    };
  }

  //TODO: Generate a reset token and send it to the user's email
  const resetPasswordToken = await generateResetPasswordToken(email);
  await sendResetPasswordEmail(
    user.name,
    resetPasswordToken.email,
    resetPasswordToken.token
  );

  return { success: "Reset password email sent!" };
};

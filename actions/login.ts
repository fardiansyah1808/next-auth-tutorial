"use server";

import { LoginSchema } from "@/schemas";
import * as z from "zod";
import { signIn } from "@/auth";
import { DEFAULT_REDIRECT_PATH } from "@/routes";
import { AuthError } from "next-auth";
import { generateVerificationToken } from "@/lib/tokens";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";

export const login = async (formData: z.infer<typeof LoginSchema>) => {
  const validatedField = LoginSchema.safeParse(formData);

  if (!validatedField.success) {
    return { error: "Invalid fields" };
  }

  const { email, password } = validatedField.data;

  const existingUser = await getUserByEmail(email);
  if (
    !existingUser ||
    !existingUser.email ||
    !existingUser.password ||
    !existingUser.name
  ) {
    return { error: "User does not exist" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );

    await sendVerificationEmail(
      existingUser.name,
      existingUser.email,
      verificationToken.token
    );
    return {
      success: "Please verify your email by clicking the link in the email",
    };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_REDIRECT_PATH,
    });
    return { success: "Login successful" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went wrong" };
      }
    }
    throw error;
  }
};

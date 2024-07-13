"use server";

import { LoginSchema } from "@/schemas";
import * as z from "zod";
import { signIn } from "@/auth";
import { DEFAULT_REDIRECT_PATH } from "@/routes";
import { AuthError } from "next-auth";
import { generateVerificationToken } from "@/lib/tokens";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import bcrypt from "bcryptjs";
import { getVerificationTokenByEmail } from "@/data/verificationToken";

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
    !existingUser.name ||
    !existingUser.password
  ) {
    return { error: "User does not exist" };
  }

  const passwordMatch = await bcrypt.compare(password, existingUser.password);
  if (!passwordMatch) {
    return { error: "Invalid credentials" };
  }

  if (!existingUser.emailVerified) {
    const existingVerificationToken = await getVerificationTokenByEmail(
      existingUser.email
    );
    if (
      !existingVerificationToken ||
      existingVerificationToken.expires < new Date()
    ) {
      const verificationToken = await generateVerificationToken(
        existingUser.email
      );
      await sendVerificationEmail(
        existingUser.name,
        existingUser.email,
        verificationToken.token
      );
      return {
        success: "Verification email sent",
      };
    } else {
      return {
        error: "Please verify your email by clicking the link in the email",
      };
    }
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
        case "AccessDenied":
          return { error: "Access denied. Please check your credentials." };
        default:
          return { error: "Something went wrong" };
      }
    }
    throw error;
  }
};

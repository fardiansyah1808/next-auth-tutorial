import db from "@/lib/db";

export const getVerificationResetPasswordTokenByEmail = async (
  email: string
) => {
  try {
    const verificationToken = await db.resetPasswordToken.findFirst({
      where: { email },
    });
    return verificationToken;
  } catch (error) {
    return null;
  }
};

export const getVerificationResetPasswordToken = async (
  token: string,
  email: string
) => {
  try {
    const verificationToken = await db.resetPasswordToken.findUnique({
      where: {
        token_email: {
          token,
          email,
        },
      },
    });
    return verificationToken;
  } catch (error) {
    console.error(error);
    return null;
  }
};

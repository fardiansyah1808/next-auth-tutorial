import db from "@/lib/db";

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: { email },
    });
    return verificationToken;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getVerificationToken = async (token: string, email: string) => {
  try {
    const verificationToken = await db.verificationToken.findUnique({
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

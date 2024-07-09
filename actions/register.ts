"use server";

import { RegisterSchema } from "@/schemas";
import * as z from "zod";

export const register = async (formData: z.infer<typeof RegisterSchema>) => {
  const validatedField = RegisterSchema.safeParse(formData);

  if (!validatedField.success) {
    return { error: "Invalid fields" };
  }

  return { success: "Register successful" };
};

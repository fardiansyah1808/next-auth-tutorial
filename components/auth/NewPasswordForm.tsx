"use client";

import React, { useState, useTransition } from "react";
import CardWrapper from "@/components/auth/CardWrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewPasswordSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormError from "@/components/FormError";
import FormSuccess from "@/components/FormSuccess";

import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { newPassword } from "@/actions/new-password";

const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const email = searchParams.get("email") || "";
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (
    data: z.infer<typeof NewPasswordSchema>,
    email: string,
    token: string
  ) => {
    startTransition(() => {
      newPassword(data, email, token).then((value) => {
        setError(value?.error || "");
        setSuccess(value?.success || "");
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Reset Your Password"
      backButtonLabel="Back to Login"
      backButtonHref="/auth/login"
      // showSocial
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => onSubmit(data, email, token))}
          className="space-y-6"
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        placeholder="********"
                        type={showPassword ? "text" : "password"}
                        disabled={isPending}
                        className="pr-10"
                      />
                      <div
                        className="absolute top-1/2 right-3 rtl:left-3 -translate-y-1/2 cursor-pointer"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? (
                          <EyeIcon className="w-5 h-5 text-default-400" />
                        ) : (
                          <EyeOffIcon className="w-5 h-5 text-default-400" />
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        placeholder="********"
                        type={showPassword ? "text" : "password"}
                        disabled={isPending}
                        className="pr-10"
                      />
                      <div
                        className="absolute top-1/2 right-3 rtl:left-3 -translate-y-1/2 cursor-pointer"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? (
                          <EyeIcon className="w-5 h-5 text-default-400" />
                        ) : (
                          <EyeOffIcon className="w-5 h-5 text-default-400" />
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button className="w-full" type="submit" disabled={isPending}>
            Reset Password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default NewPasswordForm;

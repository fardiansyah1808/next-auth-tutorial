"use client";

import React, { useState, useTransition } from "react";
import CardWrapper from "@/components/auth/CardWrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetPasswordSchema } from "@/schemas";
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
import { resetPassword } from "@/actions/reset-password";

const ResetPasswordForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: z.infer<typeof ResetPasswordSchema>) => {
    startTransition(() => {
      resetPassword(data).then((value) => {
        setError(value?.error || "");
        setSuccess(value?.success || "");
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Forgot your Password?"
      backButtonLabel="Back to Login"
      backButtonHref="/auth/login"
      // showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="jhon.doe@example.com"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button className="w-full" type="submit" disabled={isPending}>
            Send request to reset password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default ResetPasswordForm;

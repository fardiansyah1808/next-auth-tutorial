"use client";

import { useCallback, useEffect, useState } from "react";
import { PropagateLoader } from "react-spinners";
import CardWrapper from "@/components/auth/CardWrapper";
import { useSearchParams } from "next/navigation";
import { confirmEmail } from "@/actions/confirm-email";
import FormError from "@/components/FormError";
import FormSuccess from "@/components/FormSuccess";

const ConfirmEmailForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const onSubmit = useCallback(() => {
    if (success || error) return;
    if (token && email) {
      confirmEmail(token, email)
        .then((res) => {
          if (res.success) {
            setSuccess(res.success);
            return;
          } else {
            setError(res.error);
          }
        })
        .catch((err) => {
          setError("Something went wrong");
        });
    } else {
      setError("Invalid token or email");
    }
  }, [token, email, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Confirming your email verification"
      backButtonLabel="Back to Login"
      backButtonHref="/auth/login"
    >
      <div className="flex items-center w-full justify-center py-2">
        {!error && !success && (
          <PropagateLoader color={"#8b5cf6"} loading={true} />
        )}
      </div>
      <FormSuccess message={success} />
      {!success && error && <FormError message={error} />}
    </CardWrapper>
  );
};

export default ConfirmEmailForm;

"use client";
import { FC, useCallback, useEffect, useState } from "react";
import { CardWrapper } from "./card-wrapper";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { verifyEmail } from "@/actions/verification";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-succcess";
import { AuthRoutes } from "@/routes";
import { Verify2FA } from "@/actions/two-factor";
export const TwoFactorForm: FC = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const onSubmit = useCallback(async () => {
    if (success || error) return;
    setError(undefined);
    setSuccess(undefined);
    if (!token) {
      setError("Invalid token!");
      return;
    }
    const response = await Verify2FA(token);
    if (response.error) {
      setError(response.error);
      return;
    }
    if (response.success) {
      setSuccess(response.success);
    }
  }, [token, success, error]);
  useEffect(() => {
    onSubmit();
  }, []);
  return (
    <CardWrapper
      headerLabel="Confirm you'r email"
      backButtonHref={AuthRoutes.LOGIN}
      backButtonLabel="Back to login"
    >
      <div className="flex items-center w-full justify-center">
        {!error && !success && <BeatLoader />}
        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
};

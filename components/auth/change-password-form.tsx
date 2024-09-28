"use client";
import { useForm } from "react-hook-form";
import { CardWrapper } from "./card-wrapper";
import { ChangePasswordSchema } from "@/schemas/index";
import { useState, useTransition } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-succcess";
import { AuthRoutes } from "@/routes";
import { useSearchParams } from "next/navigation";
import { changePassword } from "@/actions/change-password";

export const ChangePasswordForm = () => {
  const [isTransition, setTransition] = useTransition();
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const form = useForm<z.infer<typeof ChangePasswordSchema>>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      password: "",
    },
  });
  const onSubmit = (values: z.infer<typeof ChangePasswordSchema>) => {
    setError("");
    setSuccess("");
    setTransition(() => {
      changePassword(values, token).then((response) => {
        setError(response.error ?? "");
        setSuccess(response.success ?? "");
      });
    });
  };
  return (
    <CardWrapper
      headerLabel="Enter a new password"
      backButtonHref={AuthRoutes.LOGIN}
      backButtonLabel="Back to login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isTransition}
                      placeholder="*******"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={isTransition} type="submit" className="w-full">
            Reset password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

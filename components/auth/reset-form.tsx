"use client";
import { useForm } from "react-hook-form";
import { CardWrapper } from "./card-wrapper";
import { ResetSchema } from "@/schemas/index";
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
import { reset } from "@/actions/reset";

export const ResetForm = () => {
  const [isTransition, setTransition] = useTransition();
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError("");
    setSuccess("");
    setTransition(() => {
      reset(values).then((response) => {
        setError(response.error ?? "");
        setSuccess(response.success ?? "");
      });
    });
  };
  return (
    <CardWrapper
      headerLabel="Forgot your password?"
      backButtonHref={AuthRoutes.LOGIN}
      backButtonLabel="Back to login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
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
                      disabled={isTransition}
                      placeholder="test@example.com"
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
            Send reset link
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { CardWrapper } from "./FormWrapper";
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
import { FormError } from "./FormError";
import { FormSuccess } from "./FormSuccess";

export const LoginForm = () => {
  const [showTwoFactor] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      code: "",
    },
  });

  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/register"
      showSocial
    >
      <Form {...form}>
        <form className="space-y-6">
          <div className="space-y-4">
            {showTwoFactor && (
              <FormField
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-labelColor">
                      Two Factor Code
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="123456"
                        className="text-textDark placeholder-placeholder"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {!showTwoFactor && (
              <>
                <FormField
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-labelColor">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Email"
                          type="email"
                          className="text-textDark placeholder-placeholder"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-labelColor">
                        Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Password"
                          type="password"
                          className="text-textDark placeholder-placeholder"
                        />
                      </FormControl>
                      <Button
                        size="sm"
                        variant="link"
                        asChild
                        className="px-0 font-normal"
                      >
                        <Link href="/auth/reset">
                          Forgot Password?
                        </Link>
                      </Button>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>

          <FormError message={""} />
          <FormSuccess message={""} />

          <Button
            type="submit"
            className="w-full bg-primaryColor"
          >
            {showTwoFactor ? "Confirm" : "Login"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

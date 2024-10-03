"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { passwordChangeSchema } from "@/schemas";

interface PasswordChangeFormProps {
  onSubmit: (data: unknown) => void;
}

export const PasswordChangeForm: React.FC<
  PasswordChangeFormProps
> = ({ onSubmit }) => {
  const passwordForm = useForm({
    resolver: zodResolver(passwordChangeSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">
        Change Password
      </h2>
      <p className="text-textGray">
        Update your account password
      </p>
      <Form {...passwordForm}>
        <form
          onSubmit={passwordForm.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <FormField
            control={passwordForm.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-labelColor">
                  Current Password
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter current password"
                    {...field}
                    className="bg-inputBg border-inputBorder placeholder-placeholder"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={passwordForm.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-labelColor">
                  New Password
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter new password"
                    {...field}
                    className="bg-inputBg border-inputBorder placeholder-placeholder"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={passwordForm.control}
            name="confirmNewPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-labelColor">
                  Confirm New Password
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm new password"
                    {...field}
                    className="bg-inputBg border-inputBorder placeholder-placeholder"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="bg-primaryColor hover:bg-primaryColor/80 text-babyPowder"
          >
            Change Password
          </Button>
        </form>
      </Form>
    </section>
  );
};

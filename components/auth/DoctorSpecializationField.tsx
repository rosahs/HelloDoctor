import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";

interface DoctorSpecializationFieldProps {
  form: UseFormReturn<any>;
  activeRole: string;
}

export function DoctorSpecializationField({
  form,
  activeRole,
}: DoctorSpecializationFieldProps) {
  if (activeRole !== "DOCTOR") {
    return null;
  }

  return (
    <FormField
      control={form.control}
      name="specialization"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-labelColor">
            Specialization
          </FormLabel>
          <FormControl>
            <Input
              {...field}
              placeholder="Enter your medical specialization"
              type="text"
              className="text-textDark placeholder-placeholder"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

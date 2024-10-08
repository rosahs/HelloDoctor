"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import CustomFormField, { FormFieldType } from "@/components/auth/CustomFormField";
import { createAppointment } from "@/lib/appointment-actions";
import { getAppointmentSchema } from "@/lib/appointment-validations";
import { useRouter } from "next/navigation";

const AppointmentPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const AppointmentFormValidation = getAppointmentSchema("create");

  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: "",
      schedule: new Date(),
      reason: "",
      note: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof AppointmentFormValidation>) => {
    setIsLoading(true);

    try {
      const appointment = {
        userId: "staticUser", // Using a static user ID for now
        patient: "staticPatientId", // Static patient ID (can be replaced later)
        primaryPhysician: values.primaryPhysician,
        schedule: new Date(values.schedule),
        reason: values.reason!,
        status: "pending",
        note: values.note,
      };

      const newAppointment = await createAppointment(appointment);

      if (newAppointment) {
        form.reset();
        router.push(`/appointments/patients/staticUser/new-appointment/success`);
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">New Appointment</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="primaryPhysician"
          label="Doctor"
          placeholder="Enter doctor's name"
        />

        <CustomFormField
          fieldType={FormFieldType.DATE_PICKER}
          control={form.control}
          name="schedule"
          label="Appointment Date"
          showTimeSelect
          dateFormat="MM/dd/yyyy h:mm aa"
        />

        <CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          control={form.control}
          name="reason"
          label="Reason for Appointment"
          placeholder="Describe your reason for the appointment"
        />

        <CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          control={form.control}
          name="note"
          label="Additional Notes"
          placeholder="Any additional notes"
        />

        <Button type="submit" disabled={isLoading} className="bg-blue-500 text-white w-full">
          {isLoading ? "Submitting..." : "Book Appointment"}
        </Button>
      </form>
    </div>
  );
};

export default AppointmentPage;
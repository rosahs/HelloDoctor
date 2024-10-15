"use client";

import React, {
  useState,
  useEffect,
  useTransition,
} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Avatar,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateProfile } from "@/actions/update-profile/update-profile"; // Import the server action
import { useSession } from "next-auth/react";
import { FormError } from "@/components/auth/FormError";
import { FormSuccess } from "@/components/auth/FormSuccess";
import { UpdateProfileSchema } from "@/schemas";
import { ExtendedUser } from "@/next-auth";

export const UserProfileEditForm = ({
  isPatient,
  user,
}: {
  isPatient: boolean;
  user: ExtendedUser;
}) => {
  const { update } = useSession();

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    user?.image || ""
  );
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch(
      "https://restcountries.com/v3.1/all?fields=name,cca2"
    )
      .then((response) => response.json())
      .then((data) => {
        const sortedCountries = data
          .map((country) => ({
            code: country.cca2,
            name: country.name.common,
          }))
          .sort((a, b) => a.name.localeCompare(b.name));
        setCountries(sortedCountries);
      })
      .catch((error) =>
        console.error("Error fetching countries:", error)
      );
  }, []);

  const form = useForm({
    resolver: zodResolver(UpdateProfileSchema),
    defaultValues: {
      name: user?.name || "",
      country: user?.patient?.country || "", // Set the default value to user.patient.country
      city: user?.patient?.city || "", // Set the default value to user.patient.city
    },
  });

  const onSubmit = async (values) => {
    startTransition(async () => {
      const formData = new FormData();
      formData.append("name", values.name);
      if (values.avatar) {
        formData.append("avatar", values.avatar);
      }
      formData.append("country", values.country);
      formData.append("city", values.city);

      const result = await updateProfile(formData);

      if (result.error) {
        setError(result.error);
        setSuccess("");
      } else if (result.success) {
        setSuccess(result.success);

        update();

        setError("");
      }
    });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
      form.setValue("avatar", file);
    }
  };

  return (
    <section className="space-y-6 px-mobileX py-mobileY">
      <div>
        <h2 className="text-xl font-semibold text-textDark mb-5">
          Edit Profile
        </h2>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <FormField
            control={form.control}
            name="avatar"
            render={({
              field: { value, onChange, ...field },
            }) => (
              <FormItem>
                <FormLabel>Profile Picture</FormLabel>
                <FormControl>
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-20 h-20">
                      <AvatarImage
                        src={
                          avatarPreview || "/profile.jpg"
                        }
                        alt="Profile picture"
                      />
                    </Avatar>
                    <div>
                      <Input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id="avatar-upload"
                        onChange={(e) => {
                          handleAvatarChange(e);
                          onChange(e.target.files[0]);
                        }}
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="bg-inputBg border-inputBorder text-textDark"
                        onClick={() =>
                          document
                            .getElementById("avatar-upload")
                            .click()
                        }
                      >
                        Choose Image
                      </Button>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-labelColor">
                  Name
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter your name"
                    className="bg-inputBg border-inputBorder text-textDark placeholder:text-placeholder"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {isPatient && (
            <>
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-labelColor">
                      Country
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || ""} // Ensure the select uses the correct value
                    >
                      <FormControl>
                        <SelectTrigger className="bg-inputBg border-inputBorder text-textDark placeholder:text-placeholder">
                          <SelectValue placeholder="Select your country" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-inputBg border-inputBorder text-textDark">
                        {countries.map((country) => (
                          <SelectItem
                            key={country.code}
                            value={country.code}
                          >
                            {country.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-labelColor">
                      City
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your city"
                        className="bg-inputBg border-inputBorder text-textDark placeholder:text-placeholder"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          <FormError message={error} />
          <FormSuccess message={success} />

          <Button
            type="submit"
            disabled={isPending}
            className="!bg-primaryColor text-white"
          >
            {isPending ? "Updating..." : "Update Profile"}
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default UserProfileEditForm;

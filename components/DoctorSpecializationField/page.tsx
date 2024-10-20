import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface DoctorSpecializationFieldProps {
  form: UseFormReturn<{
    role: "DOCTOR" | "PATIENT";
    specialization?: string;
  }>;
  activeRole: "DOCTOR" | "PATIENT" | null;
}

export function DoctorSpecializationField({ form, activeRole }: DoctorSpecializationFieldProps) {
  if (activeRole !== "DOCTOR") return null;

  return (
    <FormField
      control={form.control}
      name="specialization"
      render={() => (
        <FormItem>
          <FormLabel>Specialization</FormLabel>
          <Select
            onValueChange={(value) => form.setValue("specialization", value || '')}
            value={form.getValues("specialization") || ''}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a specialization" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="cardiology">Cardiology</SelectItem>
              <SelectItem value="dermatology">Dermatology</SelectItem>
              {/* Add more specializations as needed */}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
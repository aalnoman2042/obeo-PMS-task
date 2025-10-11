import React from "react";
import { useForm, Controller } from "react-hook-form";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react"; // lucide-react icon import kora hoyeche
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { contraFilterFormData } from "../../types/types";

interface VoucherFilterFormProps {
  onSubmit: (data: Partial<contraFilterFormData>) => void;
}

export const VoucherFilterForm: React.FC<VoucherFilterFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, reset, control } = useForm<contraFilterFormData>({
    defaultValues: {
      voucherId: "",
      amount: "",
      date: undefined,
    },
  });

  const handleClear = () => {
    reset(); // Reset form to default values
    onSubmit({}); // Submit empty object to clear filters in parent state
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="border border-gray-300 p-3 mb-4 rounded-md bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div>
          <Label htmlFor="voucherId" className="text-sm font-medium text-gray-700 mb-1">
            Voucher Id
          </Label>
          <Input 
            id="voucherId" 
            placeholder="Type Your Voucher Id" 
            {...register("voucherId")} 
            className="h-10 border-gray-300"
          />
        </div>
        <div>
          <Label htmlFor="amount" className="text-sm font-medium text-gray-700 mb-1">
            Amount
          </Label>
          <Input 
            id="amount" 
            placeholder="Type Your Amount" 
            {...register("amount")} 
            className="h-10 border-gray-300"
          />
        </div>
        <div>
          <Label htmlFor="date" className="text-sm font-medium text-gray-700 mb-1">
            Date
          </Label>
          {/* Date Picker logic using shadcn/ui components and lucide-react icon */}
          <Controller
            control={control}
            name="date"
            render={({ field }) => (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal h-10 border-gray-300",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.value ? (
                      format(field.value, "PPP") 
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 z-50" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            )}
          />
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <Button type="submit" className="bg-[#17A2B8] text-white hover:bg-cyan-600">Submit</Button>
        <Button type="button" variant="outline" onClick={handleClear} className="border-gray-400 hover:bg-gray-100">Clear</Button>
      </div>
    </form>
  );
};
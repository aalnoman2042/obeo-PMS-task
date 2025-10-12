import React from "react";
import { useForm, Controller } from "react-hook-form";
import { format } from "date-fns";
import { FaCalendarAlt } from "react-icons/fa";
import { cn } from "@/lib/utils";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea"; // Assuming a Shadcn Textarea component
import { OpeningBalanceFormData } from "../types/types";

const OpeningBalance: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<OpeningBalanceFormData>({
    defaultValues: {
      headOfAccount: "",
      totalAmount: 0,
      remark: "",
    },
  });

  const loading = false; // development purpose
  const error = ""; // use a string for the error message

  const onSubmit = (data: OpeningBalanceFormData) => {
    const formattedData = {
      ...data,
      date: format(data.date, "yyyy-MM-dd"),
    };
    // dispatch(saveOpeningBalance(formattedData));
    console.log("Submitted Data:", formattedData);
    reset(); // Reset form after submission
  };

  return (
    <div className="container p-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Opening Balance</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 bg-white p-6 border rounded-lg shadow-sm"
      >
        {/* Head of Account  */}
        <div>
          <Label htmlFor="headOfAccount" className="text-sm font-medium mb-2">
            Head of Account
          </Label>
          <Controller
            name="headOfAccount"
            control={control}
            rules={{ required: "Head of Account is required" }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full h-10 border-gray-300">
                  <SelectValue placeholder="Select Option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="Bank">Bank</SelectItem>
                  <SelectItem value="Equity">Equity</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.headOfAccount && (
            <p className="text-red-500 text-xs mt-1">
              {errors.headOfAccount.message}
            </p>
          )}
        </div>

        {/* Date  */}
        <div>
          <Label htmlFor="date" className="text-sm font-medium mb-2">
            Date
          </Label>
          <Controller
            name="date"
            control={control}
            rules={{ required: "Date is required" }}
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
                    <FaCalendarAlt className="mr-2 h-4 w-4" />
                    {field.value ? (
                      format(field.value, "MM/dd/yyyy")
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
          {errors.date && (
            <p className="text-red-500 text-xs mt-1">Date is required</p>
          )}
        </div>

        {/* Total Amount  */}
        <div>
          <Label htmlFor="totalAmount" className="text-sm font-medium mb-2">
            Total Amount
          </Label>
          <Input
            type="text"
            id="totalAmount"
            step="0.01"
            {...register("totalAmount", {
              required: "Total Amount is required",
              valueAsNumber: true, // Ensures the value is a number, not a string
            })}
            className="w-full h-10 border-gray-300"
          />
          {errors.totalAmount && (
            <p className="text-red-500 text-xs mt-1">
              {errors.totalAmount.message}
            </p>
          )}
        </div>

        {/* Remark */}
        <div>
          <Label htmlFor="remark" className="text-sm font-medium mb-2">
            Remark
          </Label>
          <Textarea
            id="remark"
            {...register("remark")}
            className="w-full border-gray-300"
            rows={3}
          />
        </div>

        {/* Submit and Cancel Buttons  */}
        <div className="flex justify-between pt-2">
          <Button
            type="submit"
            disabled={loading}
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 transition-colors duration-200"
          >
            {loading ? "Saving..." : "Submit"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => reset()}
            className="bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200 px-6 py-2 transition-colors duration-200"
          >
            Cancel
          </Button>
        </div>
      </form>

      {/* Display Errors */}
      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
          {error}
        </div>
      )}
    </div>
  );
};

export default OpeningBalance;

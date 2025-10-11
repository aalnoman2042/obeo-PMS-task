import React from "react";
import { useForm, Controller } from "react-hook-form";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
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
import { contraNewVoucherFormData } from "../../types/types";

interface AddVoucherModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddVoucher: (data: contraNewVoucherFormData) => void;
}

export const AddVoucherModal: React.FC<AddVoucherModalProps> = ({
  isOpen,
  onClose,
  onAddVoucher,
}) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<contraNewVoucherFormData>();

  const handleSave = (data: contraNewVoucherFormData) => {
    onAddVoucher(data);
    reset(); 
    onClose(); 
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-2xl w-full max-w-sm sm:max-w-md z-50">
        <h2 className="text-xl font-semibold mb-4 text-[#17A2B8]">
          Add New Contra Voucher
        </h2>
        <form onSubmit={handleSubmit(handleSave)} className="space-y-4">
          {/* Voucher ID Input */}
          <div>
            <Label htmlFor="modal-id" className="block text-sm font-medium text-gray-700 mb-1">
              Voucher ID
            </Label>
            <Input
              id="modal-id"
              {...register("id", { required: "Voucher ID is required" })}
              className="h-10 border-gray-300"
            />
            {errors.id && (
              <p className="text-red-500 text-xs mt-1">{errors.id.message}</p>
            )}
          </div>

          {/* Amount Input */}
          <div>
            <Label htmlFor="modal-amount" className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </Label>
            <Input
              id="modal-amount"
              type="number"
              step="0.01"
              {...register("amount", {
                required: "Amount is required",
                valueAsNumber: true,
              })}
              className="h-10 border-gray-300"
            />
            {errors.amount && (
              <p className="text-red-500 text-xs mt-1">{errors.amount.message}</p>
            )}
          </div>

          {/* Date Picker Input */}
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </Label>
            <Controller
              control={control}
              name="date"
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
            {errors.date && (
              <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>
            )}
          </div>

          {/* Modal Buttons */}
          <div className="mt-6 flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-[#17A2B8] text-white hover:bg-cyan-600">
              Save Voucher
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
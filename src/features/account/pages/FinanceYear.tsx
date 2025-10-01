/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FinanceYearFormData } from '../types/types'; // Assuming you have this type defined
import { CalendarIcon } from 'lucide-react'; // For the DatePicker icon
import { format } from 'date-fns'; // For formatting the date display

// --- SHADCN/UI IMPORTS (MOCKING for illustration) ---
// Assuming you have these components configured from shadcn/ui
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Calendar } from '@/components/ui/calendar'; // The date picker calendar component
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'; // For DatePicker dropdown
import { cn } from '@/lib/utils'; // Utility for combining tailwind classes

const FinanceYear: React.FC = () => {
  // 1. Initialize useForm and set default values (especially for status and dates)
  const form = useForm<FinanceYearFormData>({
    defaultValues: {
      title: '',
      fromDate: '', // Will be set by DatePicker, but needed for type/initial state
      toDate: '',   // Will be set by DatePicker
      status: 'Active', // Default status set here
    },
  });

  const { handleSubmit, formState: { errors }, reset, control, setValue } = form;

  const loading = false; // development purpose
  const error = false; // development purpose

  // Form submission handler
  const onSubmit = (data: FinanceYearFormData) => {
    // In a real application, data.fromDate and data.toDate will be Date objects,
    // you might need to convert them to strings (e.g., ISO string) before an API call.
    console.log({
        ...data,
        fromDate: data.fromDate ? format(new Date(data.fromDate), 'yyyy-MM-dd') : null,
        toDate: data.toDate ? format(new Date(data.toDate), 'yyyy-MM-dd') : null,
    });
    reset(); // Reset form after submission
  };



  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Financial Year</h1>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Title Field */}
          <FormField
            control={control}
            name="title"
            rules={{ required: 'Title is required' }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="2025-2026"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* From Date Field  */}
          <FormField
            control={control}
            name="fromDate"
            rules={{ required: 'From date is required' }}
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>From Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full justify-start text-left font-normal px-4 py-2 border border-gray-300 rounded-md',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? format(new Date(field.value), 'PPP') : <span>Pick a date</span>}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) => {
                        // Set the value as a Date object or null
                        field.onChange(date ? date.toISOString() : '');
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* To Date Field */}
          <FormField
            control={control}
            name="toDate"
            rules={{ required: 'To date is required' }}
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>To Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full justify-start text-left font-normal px-4 py-2 border border-gray-300 rounded-md',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? format(new Date(field.value), 'PPP') : <span>Pick a date</span>}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) => {
                        // Set the value as a Date object or null
                        field.onChange(date ? date.toISOString() : '');
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Status Field  */}
          <FormField
            control={control}
            name="status"
            rules={{ required: 'Status is required' }}
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex items-center space-x-4"
                  >
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value="Active" id="active" />
                      </FormControl>
                      <FormLabel htmlFor="active" className="font-normal cursor-pointer">
                        Active
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value="Inactive" id="inactive" />
                      </FormControl>
                      <FormLabel htmlFor="inactive" className="font-normal cursor-pointer">
                        Inactive
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <div>
            <Button
              type="submit"
              disabled={loading}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md"
            >
              {loading ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </form>
      </Form>

      {/* Display errors */}
      {error && <div className="mt-4 text-red-500">{error}</div>}
    </div>
  );
};

export default FinanceYear;
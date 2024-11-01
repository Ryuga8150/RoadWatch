"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  date: z.string().date(),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  timing: z.string().time({ message: "Invalid time string!" }),
  sensorDetail: z.string({
    required_error: "Name is required",
  }),
});

function SensorForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    toast.success("Sucessfully Submitted");
  }

  return (
    <div>
      <Form {...form}>
        <h2 className="mb-6 text-2xl font-semibold uppercase leading-[normal] text-black [font-family:Roboto]">
          Form
        </h2>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          {[
            {
              name: "title",
              label: "Title",
              placeholder: "Enter your title here...",
            },
            {
              name: "date",
              label: "Date",
              placeholder: "2020-01-01",
            },
            {
              name: "location",
              label: "Location",
              placeholder: "Delhi",
            },
            {
              name: "timing",
              label: "Timing",
              placeholder: "23:59:59",
            },
          ].map(
            (
              {
                name,
                label,
                placeholder,
              }: { name: string; label: string; placeholder: string },
              index,
            ) => (
              <FormField
                key={index}
                control={form.control}
                name={name}
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <div className="flex items-center gap-5">
                      <FormLabel className="w-20">{label}</FormLabel>
                      <FormControl>
                        <Input placeholder={placeholder} {...field} />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ),
          )}

          <FormField
            control={form.control}
            name="sensorDetail"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <div className="flex items-center gap-5">
                  <FormLabel className="w-20">Sensor Detail</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter details here.."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="mt-2 w-24 bg-[#52B788] hover:bg-[#316e52]"
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default SensorForm;

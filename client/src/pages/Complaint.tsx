import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useUser } from "@/providers/userProvider";
import { useState } from "react";

// Define Zod schema for validation
const formSchema = z.object({
  to: z.string().email({ message: "Please enter a valid email address." }),
  subject: z
    .string()
    .min(5, { message: "Subject should be at least 5 characters long." }),
  message: z
    .string()
    .min(10, { message: "Message should be at least 10 characters long." }),
});

type FormData = z.infer<typeof formSchema>;

const ComplaintForm: React.FC = () => {
  const url = import.meta.env.VITE_BACKEND_URL;
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  const { user } = useUser();

  // Loading state for form submission
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true); // Set loading to true when submission starts

      const res = await fetch(`${url}/api/complaint`, {
        method: "POST",
        body: JSON.stringify({ ...data, userId: user!.id }),
        headers: {
          "Content-type": "application/json",
        },
      });

      const resData = await res.json();

      if (resData.status === "success") {
        toast.success("Complaint submitted successfully!");
        reset();
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.log(err);
      toast.error("Client Side Error in Submission");
    } finally {
      setLoading(false); // Set loading to false after submission is complete
    }
  };

  return (
    <div className="flex h-full w-full flex-col rounded-lg bg-white p-8 shadow-lg">
      <h2 className="mb-6 text-2xl font-bold text-gray-800 [font-family:Roboto]">
        ISSUE A COMPLAINT
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-grow flex-col justify-between"
      >
        {/* To Field */}
        <div className="space-y-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-6">
              <label
                className="w-16 text-base font-medium text-[#7C819A] [font-family:Roboto]"
                htmlFor="to"
              >
                To
              </label>
              <Controller
                name="to"
                control={control}
                render={({ field }) => (
                  <Input
                    id="to"
                    {...field}
                    type="email"
                    placeholder="Recipient's Email"
                    className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-700 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                )}
              />
              {errors.to && (
                <span className="text-sm text-red-600">
                  {errors.to.message}
                </span>
              )}
            </div>
            <Separator />
          </div>

          {/* Subject Field */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-6">
              <label
                className="w-16 text-base font-medium text-[#7C819A] [font-family:Roboto]"
                htmlFor="subject"
              >
                Subject
              </label>
              <Controller
                name="subject"
                control={control}
                render={({ field }) => (
                  <Input
                    id="subject"
                    {...field}
                    type="text"
                    placeholder="Urgent Report of Deteriorating Road Conditions"
                    className="w-full rounded-md border border-gray-300 px-4 py-3 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                )}
              />
              {errors.subject && (
                <span className="text-sm text-red-600">
                  {errors.subject.message}
                </span>
              )}
            </div>
            <Separator />
          </div>

          {/* Message Field */}
          <div className="flex flex-grow flex-col">
            <label
              className="mb-1 text-base font-medium text-[#7C819A] [font-family:Roboto]"
              htmlFor="message"
            >
              Message
            </label>
            <Controller
              name="message"
              control={control}
              render={({ field }) => (
                <Textarea
                  id="message"
                  {...field}
                  placeholder="Dear [Recipient's Name/Title], I'm reporting deteriorating road conditions on Location ID 2500 and Segment ID 1001..."
                  className="w-full flex-grow rounded-md border border-gray-300 px-4 py-3 focus:border-indigo-500 focus:ring-indigo-500"
                  rows={6}
                />
              )}
            />
            {errors.message && (
              <span className="text-sm text-red-600">
                {errors.message.message}
              </span>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="mb-10 flex">
          <Button
            type="submit"
            className={`rounded-md px-6 py-3 font-semibold text-white transition duration-200 ${
              loading
                ? "cursor-not-allowed bg-gray-400"
                : "bg-green-600 hover:bg-green-700"
            }`}
            disabled={loading} // Disable button while loading
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="mr-3 h-5 w-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 3v3m0 12v3m9-9h-3m-12 0H3"
                  />
                </svg>
                Submitting...
              </div>
            ) : (
              "Send"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ComplaintForm;

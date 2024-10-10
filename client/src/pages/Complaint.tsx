import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import { toast } from "sonner";

const ComplaintForm: React.FC = () => {
  // State for form fields
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic
    console.log({ to, subject, message });
    toast.success("Complaint submitted successfully!");
  };

  return (
    <div className="flex h-full w-full flex-col rounded-lg bg-white p-8 shadow-lg">
      <h2 className="mb-6 text-2xl font-bold text-gray-800 [font-family:Roboto]">
        ISSUE A COMPLAINT
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-grow flex-col justify-between"
      >
        {/* To Field */}
        <div className="space-y-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-6">
              <label
                className="text-base font-medium text-[#7C819A] [font-family:Roboto]"
                htmlFor="to"
              >
                To
              </label>
              <Input
                id="to"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                type="email"
                placeholder="Recipient's Email"
                // flex-[1_0_0] text-black [font-family:Roboto] text-lg font-normal leading-[normal]
                className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-700 focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <Separator />
          </div>
          {/* Subject Field */}

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-6">
              <label
                className="text-base font-medium text-[#7C819A] [font-family:Roboto]"
                htmlFor="subject"
              >
                Subject
              </label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                type="text"
                placeholder="Urgent Report of Deteriorating Road Conditions"
                className="w-full rounded-md border border-gray-300 px-4 py-3 focus:border-indigo-500 focus:ring-indigo-500"
              />
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
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Dear [Recipient's Name/Title], I'm reporting deteriorating road conditions on Location ID 2500 and Segment ID 1001..."
              className="w-full flex-grow rounded-md border border-gray-300 px-4 py-3 focus:border-indigo-500 focus:ring-indigo-500"
              rows={6}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="mb-10 flex">
          <Button
            type="submit"
            className="rounded-md bg-green-600 px-6 py-3 font-semibold text-white transition duration-200 hover:bg-green-700"
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ComplaintForm;

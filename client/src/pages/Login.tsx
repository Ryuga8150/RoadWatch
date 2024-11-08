import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { useUser } from "@/providers/userProvider";
import { User } from "@/utils/types";

const FormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

const Login: React.FC = () => {
  const url = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  // Loading state for the submit button
  const [loading, setLoading] = useState(false);

  // Redirect to dashboard if user is already logged in
  useEffect(() => {
    if (user?.id) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setLoading(true); // Set loading to true before starting the request
    try {
      const res = await fetch(`${url}/api/auth/signin`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
        },
      });

      const resData = await res.json();

      if (resData.status === "success") {
        const { _id, username, email, avatar, createdAt, updatedAt } =
          resData.data.user;

        // Store the user data directly into global state
        const loggedInUser: User = {
          id: _id,
          username,
          email,
          password: data.password,
          avatar: avatar || undefined,
          createdAt,
          updatedAt,
        };

        setUser(loggedInUser);
        toast.success("Signed In Successfully");
        navigate("/dashboard");
      } else if (resData.status === "fail") {
        toast.error(resData.message);
      } else {
        alert("Unhandled response status in SignIn");
      }
    } catch (err) {
      console.error(err);
      toast.error("Client Side Error in Sign In");
    } finally {
      setLoading(false); // Set loading to false after the request finishes
      form.reset();
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="w-1/4">
        <Avatar className="mb-6 h-20 w-full rounded-none">
          <AvatarImage src="./roadwatch-logo.png" alt="Roadwatch Logo" />
          <AvatarFallback>ROADWATCH LOGO</AvatarFallback>
        </Avatar>
        <h2 className="mb-4 text-center text-2xl font-bold uppercase [font-family:Roboto]">
          Login
        </h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="test@gmail.com"
                      type="email"
                      {...field}
                      className="bg-slate-50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="test1234"
                      {...field}
                      className="bg-slate-50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-green-800 hover:bg-green-900"
              disabled={loading} // Disable the button when loading is true
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="mr-2 h-5 w-5 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M14 2a10 10 0 0 1 0 20"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                  Loading...
                </span>
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;

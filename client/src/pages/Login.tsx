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
  // username: z.string().min(2, {
  //   message: "Username must be at least 2 characters.",
  // }),
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
    try {
      const res = await fetch(`${url}/api/auth/signin`, {
        // Adding method type
        method: "POST",

        // Adding body or contents to send
        body: JSON.stringify(data),

        // Adding headers to the request
        headers: {
          "Content-type": "application/json",
        },
      });

      const resData = await res.json();

      if (resData.status === "success") {
        console.log(resData);
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

        // Set the user state in context
        setUser(loggedInUser);
        toast.success("Signed In SuccessFully");
        navigate("/dashboard");
      } else if (resData.status === "fail") {
        toast.error(resData.message);
      } else {
        alert("Unhandled reposnse status in SgnUp");
      }
    } catch (err) {
      console.log(err);
      toast.error("Client Side Error in Sign In ");
    } finally {
      form.reset();
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      {/* <img src="/path/to/logo.png" alt="Logo" className="mb-6 w-32" />  */}
      <div className="w-1/4">
        <Avatar className="mb-6 h-20 w-full rounded-none">
          <AvatarImage src="./roadwatch-logo.png" alt="Roadwatch Logo" />
          <AvatarFallback>ROADWATCH LOGO</AvatarFallback>
        </Avatar>
        {/* Replace with your logo path */}
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
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;

"use client";
import { signUpSchema } from "@/app/models/UserSchema";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function SignUp() {
  const router = useRouter();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<signUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit: SubmitHandler<signUpSchema> = async (data) => {
    try {
      console.log("d", data);
      const res = await fetch("/api/u/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (!res.ok) {
        return toast.error(result?.message || "An Error Occurred");
      }
      reset();
      toast.success(result?.message || "User Registered");
      return router.push("/user/login");
    } catch (error) {
      console.log(`Something went wrong. Please try agin. ${error}`);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      <Card className="container mx-auto max-w-xl shadow">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-center">
            Sign Up
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3">
            <div>
              <Input
                {...register("username", { required: true })}
                type="text"
                placeholder="Type UserName"
              />
              {errors?.username && (
                <span className="text-sm text-red-500 font-bold">
                  {errors?.username?.message}
                </span>
              )}
            </div>
            <div>
              <Input
                {...register("email", { required: true })}
                type="email"
                placeholder="Type Email"
              />
              {errors?.email && (
                <span className="text-sm text-red-500 font-bold">
                  {errors?.email?.message}
                </span>
              )}
            </div>
            <div>
              <Input
                {...register("password", { required: true })}
                type="password"
                placeholder="Type Password"
              />
              {errors?.password && (
                <span className="text-sm text-red-500 font-bold">
                  {errors?.password?.message}
                </span>
              )}
            </div>
            <Button type="submit">Sign Up</Button>
          </form>
        </CardContent>
        <CardFooter className="flex items-center justify-center">
          <p>
            Already an User ? <Link href="/user/login">Login</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

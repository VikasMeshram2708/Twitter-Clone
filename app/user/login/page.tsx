"use client";
import { loginSchema } from "@/app/models/UserSchema";
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
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function Login() {
  const router = useRouter();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<loginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<loginSchema> = async (data) => {
    try {
      console.log("d", data);
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (!res?.ok) {
        return toast.error(res?.error || "Login An Error Occurred");
      }

      reset();
      toast.success("User Logged In");
      return router.push("/");
    } catch (error) {
      console.log(`Something went wrong. Please try agin. ${error}`);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      <Card className="container mx-auto max-w-xl shadow">
        <CardHeader>
          <CardTitle className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-center">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3">
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
            <Button type="submit">Login</Button>
          </form>
        </CardContent>
        <CardFooter className="flex items-center justify-center">
          <p>
            Not an User ? <Link href="/user/signup">Sign Up</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

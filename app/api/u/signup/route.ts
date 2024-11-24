import { signUpSchema } from "@/app/models/UserSchema";
import { ErrorHandler } from "@/lib/errorHandler";
import { prismaInstance } from "@/lib/prismaInstance";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();

    const parsedRes = signUpSchema.safeParse(reqBody);

    if (!parsedRes.success) {
      return new Error(parsedRes.error?.message || "Invalid Data");
    }

    const parsedData = parsedRes.data;
    
    const hashedPassword = await bcrypt.hash(parsedData.password, 10);

    const userExist = await prismaInstance.user.findFirst({
      where: {
        email: parsedData.email,
      },
    });

    if (userExist) {
      return new Error("User Already Exist");
    }

    await prismaInstance.user.create({
      data: {
        username: parsedData.username,
        email: parsedData.email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      {
        message: "User Created Successfully",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return ErrorHandler(error as Error);
  }
};

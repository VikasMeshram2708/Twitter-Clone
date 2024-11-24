import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export const ErrorHandler = (error: Error) => {
  if (error instanceof PrismaClientKnownRequestError) {
    return NextResponse.json(
      {
        code: error?.code,
        message: error?.message,
        stack:
          process.env.NODE_ENV === "development" ? error?.stack : "No Stack",
      },
      {
        status: 500,
      }
    );
  }
  if (error instanceof ZodError) {
    const errMsg = error.issues.map((e) => ({
      filed: e.path.join("."),
      message: e.message,
    }));
    return NextResponse.json(
      {
        message: errMsg,
        stack:
          process.env.NODE_ENV === "development" ? error?.stack : "No Stack",
      },
      {
        status: 500,
      }
    );
  }
  return NextResponse.json(
    {
      message: error?.message,
      stack: process.env.NODE_ENV === "development" ? error?.stack : "No Stack",
    },
    {
      status: 500,
    }
  );
};

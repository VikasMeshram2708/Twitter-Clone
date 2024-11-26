import { deletePostSchema } from "@/app/models/ChatSchema";
import { ErrorHandler } from "@/lib/errorHandler";
import { prismaInstance } from "@/lib/prismaInstance";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();

    const parsedRes = deletePostSchema.safeParse(reqBody);

    if (!parsedRes.success) {
      const errMsg = parsedRes.error.issues.map((e) => ({
        filed: e.path.join("."),
        message: e.message,
      }));
      return NextResponse.json(
        {
          message: errMsg,
        },
        {
          status: 400,
        }
      );
    }

    const parsedData = parsedRes.data;

    const postExist = await prismaInstance.chat.findFirst({
      where: {
        id: parsedData.chatId,
      },
    });

    if (!postExist) {
      return NextResponse.json(
        {
          message: "Post Doesn't Exist",
        },
        {
          status: 400,
        }
      );
    }

    await prismaInstance.chat.delete({
      where: {
        id: parsedData.chatId,
      },
    });

    return NextResponse.json(
      {
        message: "Deleted",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return ErrorHandler(error as Error);
  }
};

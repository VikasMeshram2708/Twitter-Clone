import { ErrorHandler } from "@/lib/errorHandler";
import { getTokenData } from "@/lib/getTokenData";
import { prismaInstance } from "@/lib/prismaInstance";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const token = await getTokenData(request);
    if (!token) {
      return NextResponse.json(
        {
          message: "Un-Authorized. Login Required",
        },
        {
          status: 400,
        }
      );
    }

    const details = await prismaInstance.user.findFirst({
      where: {
        id: Number(token?.id),
      },
      select: {
        id: true,
        email: true,
        username: true,
        createdAt: true,
        updatedAt: true,
        _count: true,
      },
    });

    return NextResponse.json(
      {
        data: details,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return ErrorHandler(error as Error);
  }
};

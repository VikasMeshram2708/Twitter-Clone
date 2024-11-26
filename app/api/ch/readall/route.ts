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
          message: "Unauthorized access. Login required.",
        },
        { status: 401 }
      );
    }

    const url = new URL(request.url);
    const skip = parseInt(url.searchParams.get("skip") || "0");
    const take = parseInt(url.searchParams.get("take") || "10");

    const [posts, totalCount] = await Promise.all([
      prismaInstance.chat.findMany({
        orderBy: { createdAt: "desc" },
        skip,
        take,
        include: {
          User: {
            select: {
              id: true,
              username: true,
              email: true,
            },
          },
        },
      }),
      prismaInstance.chat.count(),
    ]);

    return NextResponse.json({ posts, totalCount }, { status: 200 });
  } catch (error) {
    return ErrorHandler(error as Error);
  }
};

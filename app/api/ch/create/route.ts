import { createPostSchema } from "@/app/models/ChatSchema";
import { ErrorHandler } from "@/lib/errorHandler";
import { getTokenData } from "@/lib/getTokenData";
import { prismaInstance } from "@/lib/prismaInstance";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    // Parse the JSON body of the request
    const reqBody = await request.json();

    // Extract and verify the token
    const token = await getTokenData(request);
    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized: Token not found or invalid." },
        { status: 401 }
      );
    }

    // Validate the input data using the schema
    const validationResult = createPostSchema.safeParse(reqBody);
    if (!validationResult.success) {
      // Construct a detailed error response for validation issues
      const validationErrors = validationResult.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));

      return NextResponse.json(
        {
          message: "Invalid input data.",
          errors: validationErrors,
        },
        { status: 400 }
      );
    }

    // Extract validated data
    const { content, img_url, video_url } = validationResult.data;

    // Create a new post in the database
    await prismaInstance.chat.create({
      data: {
        content: content ?? "", // Default empty string if `content` is null
        img_url: img_url ?? null, // Explicitly handle nullable fields
        video_url: video_url ?? null,
        User: {
          connect: {
            id: Number(token.id),
          },
        },
      },
    });

    // Respond with success
    return NextResponse.json(
      { message: "Post created successfully." },
      { status: 201 }
    );
  } catch (error) {
    // Handle unexpected errors gracefully
    return ErrorHandler(error as Error);
  }
};

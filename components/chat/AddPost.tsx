/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImageIcon, VideoIcon, SendHorizontal, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { SubmitHandler, useForm } from "react-hook-form";
import { createPostSchema } from "@/app/models/ChatSchema";
import { useCreatePostMutation } from "@/app/store/chats/chatSlice";
import toast from "react-hot-toast";

export default function AddPost() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [mediaType, setMediaType] = useState<"photo" | "video" | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      content: "",
      img_url: "",
      video_url: "",
    },
  });

  const content = watch("content");

  const [createPost, { isLoading, error, isError }] = useCreatePostMutation();

  const onSubmit: SubmitHandler<createPostSchema> = async (data) => {
    try {
      const result = await createPost(data).unwrap();
      reset();
      setIsExpanded(false)
      return toast.success(result?.message || "Post Created");
    } catch (error) {
      console.error(`Something went wrong. Please try again. ${error}`);
    }
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto shadow-lg">
        <CardContent className="p-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-4">
              <Input
                className={`rounded-2xl border-2 focus-visible:ring-0 min-h-[50px] px-4 py-2 transition-all duration-200 ${
                  isExpanded ? "min-h-[100px]" : ""
                }`}
                {...register("content", { required: true })}
                placeholder="What's on your mind?"
                onFocus={() => setIsExpanded(true)}
              />
              {errors.content && (
                <Alert variant="destructive">
                  <AlertDescription>Content is required</AlertDescription>
                </Alert>
              )}

              {mediaType === "photo" && (
                <Input
                  {...register("img_url", {
                    pattern: /^(http|https):\/\/[^ "]+$/,
                  })}
                  placeholder="Enter image URL"
                />
              )}

              {mediaType === "video" && (
                <Input
                  {...register("video_url", {
                    pattern: /^(http|https):\/\/[^ "]+$/,
                  })}
                  placeholder="Enter video URL"
                />
              )}

              {isError && (
                <Alert variant="destructive">
                  <AlertDescription>
                    {String(error) || "An error occurred while posting"}
                  </AlertDescription>
                </Alert>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={mediaType === "photo" ? "default" : "ghost"}
                  onClick={() =>
                    setMediaType(mediaType === "photo" ? null : "photo")
                  }
                >
                  <ImageIcon className="h-5 w-5 mr-2" /> Photo
                </Button>
                <Button
                  type="button"
                  variant={mediaType === "video" ? "default" : "ghost"}
                  onClick={() =>
                    setMediaType(mediaType === "video" ? null : "video")
                  }
                >
                  <VideoIcon className="h-5 w-5 mr-2" /> Video
                </Button>
              </div>

              <div className="flex gap-2">
                {(isExpanded || content) && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      reset();
                      setMediaType(null);
                      setIsExpanded(false);
                    }}
                  >
                    Cancel <X className="h-4 w-4" />
                  </Button>
                )}
                <Button type="submit" disabled={isLoading || !content.trim()}>
                  {isLoading ? "Posting..." : "Post"}{" "}
                  <SendHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
}

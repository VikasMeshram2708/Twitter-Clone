/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImageIcon, VideoIcon, SendHorizontal, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCreatePostMutation } from "@/app/store/chats/chatSlice";
import toast from "react-hot-toast";
import Image from "next/image";
import { FileUploaderRegular } from "@uploadcare/react-uploader/next";
import "@uploadcare/react-uploader/core.css";

const pubKey = process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY;

const AddPost: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [mediaType, setMediaType] = useState<"photo" | "video" | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      content: "",
    },
  });

  const content = watch("content");

  const [createPost, { isLoading, error, isError }] = useCreatePostMutation();

  // Handle file uploads
  const handleFileUpload = (e: any) => {
    const successfulFiles = e.allEntries.filter(
      (file: any) => file.status === "success"
    );
    if (successfulFiles.length > 0) {
      setFileUrl(successfulFiles[0].cdnUrl); // Store the file's CDN URL
    }
  };

  const onSubmit: SubmitHandler<{ content: string }> = async (data) => {
    try {
      // Construct the payload including fileUrl
      const payload = {
        content: data.content,
        img_url: fileUrl && mediaType === "photo" ? fileUrl : null, // For photos
        video_url: fileUrl && mediaType === "video" ? fileUrl : null, // For videos
      };

      // Call the mutation to create the post
      const result = await createPost(payload).unwrap();

      // Reset form state
      reset();
      setIsExpanded(false);
      setFileUrl(null);
      toast.success(result?.message || "Post Created");
    } catch (error) {
      console.error(`Something went wrong: ${error}`);
      toast.error("Failed to create post");
    }
  };

  // Clear media (file upload and preview)
  const clearMedia = () => {
    setMediaType(null);
    setFileUrl(null);
  };

  return (
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

            {/* File Upload Section */}
            {mediaType && (
              <div>
                <FileUploaderRegular
                  // @ts-ignore
                  pubkey={pubKey}
                  onChange={handleFileUpload}
                  options={{
                    imagesOnly: mediaType === "photo",
                    videoOnly: mediaType === "video",
                  }}
                />
                {/* Preview Section */}
                {fileUrl && (
                  <div className="relative mt-2">
                    {mediaType === "photo" ? (
                      <div className="aspect-video relative">
                        <Image
                          layout="fill"
                          src={fileUrl}
                          alt="Preview"
                          className="w-full h-64 bg-contain rounded-lg"
                        />
                      </div>
                    ) : (
                      <video
                        src={fileUrl}
                        controls
                        className="w-full h-64 rounded-lg"
                      />
                    )}
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={clearMedia}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
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
              {(isExpanded || content || fileUrl) && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    reset();
                    clearMedia();
                    setIsExpanded(false);
                  }}
                >
                  Cancel <X className="h-4 w-4" />
                </Button>
              )}
              <Button
                type="submit"
                disabled={isLoading || (!content.trim() && !fileUrl)}
              >
                {isLoading ? "Posting..." : "Post"}{" "}
                <SendHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddPost;

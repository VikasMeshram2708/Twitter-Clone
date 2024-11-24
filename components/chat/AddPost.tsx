"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ImageIcon, VideoIcon, SendHorizontal, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function AddPost() {
  const [content, setContent] = useState("");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleInputFocus = () => {
    setIsExpanded(true);
  };

  const handleClose = () => {
    setContent("");
    setSelectedFile(null);
    setIsExpanded(false);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-1 space-y-4">
            <Input
              className="rounded-2xl border-2 focus-visible:ring-0 focus-visible:ring-offset-0 min-h-[50px] px-4 py-2"
              type="text"
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onFocus={handleInputFocus}
            />
            {isExpanded && (
              <div className="space-y-4 animate-in slide-in-from-top duration-200">
                {selectedFile && (
                  <div className="relative w-full h-40 bg-accent/10 rounded-lg flex items-center justify-center">
                    <span className="text-sm text-muted-foreground">
                      File selected: {selectedFile}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 h-6 w-6"
                      onClick={() => setSelectedFile(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-primary"
                      onClick={() => setSelectedFile("image.jpg")}
                    >
                      <ImageIcon className="h-5 w-5 mr-2" />
                      Photo
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-primary"
                      onClick={() => setSelectedFile("video.mp4")}
                    >
                      <VideoIcon className="h-5 w-5 mr-2" />
                      Video
                    </Button>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={handleClose}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="gap-2"
                      size="sm"
                      disabled={!content && !selectedFile}
                    >
                      Post
                      <SendHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
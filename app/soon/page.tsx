/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react";

export default function ComingSoon() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <video
        loading="lazy"
        // @ts-ignore
        muted="muted"
        src="https://cdnl.iconscout.com/lottie/premium/thumb/opening-soon-13152936-10741869.mp4"
        type="video/mp4"
        // @ts-ignore
        autoPlay="autoplay"
        className="bg-blend-color-burn"
        // @ts-ignore
        loop="loop"
      ></video>
    </div>
  );
}

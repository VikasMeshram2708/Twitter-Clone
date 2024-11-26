"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { store } from "./store/store";

const queryClient = new QueryClient();
export default function Wrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <Provider store={store}>{children}</Provider>
      </SessionProvider>
      <Toaster position="top-right" />
    </QueryClientProvider>
  );
}

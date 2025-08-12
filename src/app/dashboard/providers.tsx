"use client";

import {QueryCache, QueryClient, QueryClientProvider,} from "@tanstack/react-query";
import {ReactNode} from "react";
import toast from "react-hot-toast";

export default function DashboardProviders({children}: { children: ReactNode }) {
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => {
        toast.error(error.message);
      },
    }),
  });

  return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
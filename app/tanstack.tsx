"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function ReactQueryClient(props: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
      <ReactQueryDevtools client={queryClient} />
    </>
  );
}

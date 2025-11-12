import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Optional: Prevents refetching when the window gains focus
      staleTime: 1000 * 60 * 5, // Optional: Data considered fresh for 5 minutes
      cacheTime: 1000 * 60 * 10, // Optional: Cached data lives for 10 minutes
      retry: 1, // Optional: Number of retry attempts on failure
    },
  },
});

export default queryClient;

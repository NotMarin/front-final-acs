import { QueryClient, isServer } from "@tanstack/react-query";

// Create QueryClient - separate for server/browser
function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // SSR: staleTime > 0 avoids immediate refetch on client
        staleTime: 60 * 1000, // 60 sec
        retry: 1,
        refetchOnWindowFocus: false,
      },
      mutations: {
        onError: (error) => {
          console.error("Mutation error:", error);
        },
      },
    },
  });
}

// Browser: singleton QueryClient
let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (isServer) {
    // Server: always a new client (avoids data leaks between requests)
    return makeQueryClient();
  } else {
    // Browser: reuse the same client
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

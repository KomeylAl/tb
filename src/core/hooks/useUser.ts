import { useQuery } from "@tanstack/react-query";

export function useUserData() {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await fetch("/api/auth/user");
      return res.json();
    },
  });
}
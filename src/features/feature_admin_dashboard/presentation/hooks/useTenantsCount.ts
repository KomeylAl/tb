import {useQuery} from "@tanstack/react-query";

export function useTenantsCount(
    pageSize: number = 1,
    page: number = 0,
    textSearch: string = ""
) {
  return useQuery({
    queryKey: ["tenantsCount", page, pageSize],
    queryFn: async () => {
      const res = await fetch(
          `/api/sysadmin/tenants?page=${page}&pageSize=${pageSize}&textSearch=${textSearch}`
      );
      if (!res.ok) {
        throw new Error("مشکلی در دریافت اطلاعات پیش آمده!");
      }
      return res.json();
    },
  });
}
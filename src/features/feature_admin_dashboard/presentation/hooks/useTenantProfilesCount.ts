import {useQuery} from "@tanstack/react-query";

export function useTenantProfilesCount(
    pageSize: number = 1,
    page: number = 0,
    textSearch: string = ""
) {
  return useQuery({
    queryKey: ["tenantProfiles", page, pageSize],
    queryFn: async () => {
      const res = await fetch(
          `/api/sysadmin/tenants/profiles?pageSize=${pageSize}&page=${page}&textSearch=${textSearch}`
      );
      if (!res.ok) {
        throw new Error("مشکلی در دریافت اطلاعات پیش آمده!");
      }
      return res.json();
    },
  });
}
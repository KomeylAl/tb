import {useMutation} from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useStoreDevice(onSuccess: () => void) {
  return useMutation({
    mutationFn: async (assetData: any) => {
      const res = await fetch("/api/tenant/devices", {
        method: "POST",
        body: JSON.stringify(assetData),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error("مشکلی در افزودن دستگاه پیش آمده!");
      }
    },
    onError(error) {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("دستگاه با موفقت افزوده شد");
      onSuccess();
    },
  });
}
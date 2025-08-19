import {StoreDeviceRepositoryImpl} from "@/features/feature_devices/data/repositories/store_device_repository_impl";
import {StoreDeviceApi} from "@/features/feature_devices/data/data_source/store_device_api";
import {StoreDeviceUseCase} from "@/features/feature_devices/domain/use_cases/store_device_use_case";
import {useMutation} from "@tanstack/react-query";
import {storeDeviceType} from "@/core/types";
import toast from "react-hot-toast";

export function useStoreDevice(onSuccess: () => void) {

  const repo = new StoreDeviceRepositoryImpl(new StoreDeviceApi());
  const useCase = new StoreDeviceUseCase(repo);

  return useMutation({
    mutationFn: (deviceData: storeDeviceType) => useCase.execute(deviceData),
    onError(error) {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("دستگاه با موفقیت افزوده شد.");
      onSuccess();
    },
  });
}
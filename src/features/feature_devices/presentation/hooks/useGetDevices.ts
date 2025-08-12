import {useQuery} from "@tanstack/react-query";
import {GetDevicesRepositoryImpl} from "@/features/feature_devices/data/repositories/get_devices_repository_impl";
import {DeviceApi} from "@/features/feature_devices/data/data_source/device_api";
import {GetDevicesUseCase} from "@/features/feature_devices/domain/use_cases/get_devices_use_case";

export function useGetDevices(
    page: number = 0,
    pageSize: number = 1,
    textSearch: string = ""
) {
  const repo = new GetDevicesRepositoryImpl(new DeviceApi());
  const useCase = new GetDevicesUseCase(repo);

  return useQuery({
    queryKey: ["devices", page, pageSize],
    queryFn: () => useCase.execute(page, pageSize, textSearch),
  });
}
import {
  GetTenantDevicesRepositoryImpl
} from "@/features/feature_tenants/data/repositories/get_tenant_devices_repository_impl";
import {GetTenantDevicesApi} from "@/features/feature_tenants/data/data_source/get_tenant_devices_api";
import {GetTenantDevicesUseCase} from "@/features/feature_tenants/domain/use_cases/get_tenant_devices_use_case";
import {useQuery} from "@tanstack/react-query";

export function useGetTenantDevices(
    page: number = 0,
    pageSize: number = 1,
    tenantId: string = ""
) {
  const repo = new GetTenantDevicesRepositoryImpl(new GetTenantDevicesApi());
  const useCase = new GetTenantDevicesUseCase(repo);

  return useQuery({
    queryKey: ["tenantDevices", page, pageSize],
    queryFn: () => useCase.execute(page, pageSize, tenantId),
  });
}
import {GetTenantsApi} from "@/features/feature_tenants/data/data_source/get_tenants_api";
import {GetTenantsRepositoryImpl} from "@/features/feature_tenants/data/repositories/get_tenants_repository_impl";
import {GetTenantsUseCase, GetTenantUseCase} from "@/features/feature_tenants/domain/use_cases/get_tenants_use_case";
import {useQuery} from "@tanstack/react-query";

export function useGetTenant(tenantId: string) {
  const repo = new GetTenantsRepositoryImpl(new GetTenantsApi());
  const useCase = new GetTenantUseCase(repo);

  return useQuery({
    queryKey: ["tenant"],
    queryFn: () => useCase.execute(tenantId),
  });
}

export function useGetTenants(
    page: number = 0,
    pageSize: number = 1,
    textSearch: string = ""
) {
  const repo = new GetTenantsRepositoryImpl(new GetTenantsApi());
  const useCase = new GetTenantsUseCase(repo);

  return useQuery({
    queryKey: ["tenants", page, pageSize],
    queryFn: () => useCase.execute(page, pageSize, textSearch),
  });
}
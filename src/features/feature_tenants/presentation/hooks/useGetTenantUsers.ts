import {
  GetTenantUsersRepositoryImpl
} from "@/features/feature_tenants/data/repositories/get_tenant_users_repository_impl";
import {GetTenantUsersApi} from "@/features/feature_tenants/data/data_source/get_tenant_users_api";
import {GetTenantUsersUseCase} from "@/features/feature_tenants/domain/use_cases/get_tenant_users_use_case";
import {useQuery} from "@tanstack/react-query";

export function useGetTenantUsers(
    page: number = 0,
    pageSize: number = 1,
    tenantId: string = ""
) {
  const repo = new GetTenantUsersRepositoryImpl(new GetTenantUsersApi());
  const useCase = new GetTenantUsersUseCase(repo);

  return useQuery({
    queryKey: ["tenantUsers", page, pageSize],
    queryFn: () => useCase.execute(page, pageSize, tenantId),
  });
}
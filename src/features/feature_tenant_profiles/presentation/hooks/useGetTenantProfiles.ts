import {
    GetTenantProfilesRepositoryImpl
} from "@/features/feature_tenant_profiles/data/repositories/get_tenant_profiles_repository_impl";
import {GetTenantProfilesApi} from "@/features/feature_tenant_profiles/data/data_source/get_tenant_profiles_api";
import {
    GetTenantProfilesUseCase
} from "@/features/feature_tenant_profiles/domain/use_cases/get_tenant_profiles_use_case";
import {useQuery} from "@tanstack/react-query";

export function useGetTenantProfiles(
    page: number = 0,
    pageSize: number = 1,
    textSearch: string = ""
) {
  const repo = new GetTenantProfilesRepositoryImpl(new GetTenantProfilesApi());
  const useCase = new GetTenantProfilesUseCase(repo);

  return useQuery({
    queryKey: ["tenantProfiles", page, pageSize],
    queryFn: () => useCase.execute(page, pageSize, textSearch),
  });
}
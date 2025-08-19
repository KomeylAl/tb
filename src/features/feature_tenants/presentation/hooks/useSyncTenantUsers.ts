import {
  SyncTenantUsersRepositoryImpl
} from "@/features/feature_tenants/data/repositories/sync_tenant_users_repository_impl";
import {SyncTenantUsersApi} from "@/features/feature_tenants/data/data_source/sync_tenant_users_api";
import {SyncTenantUsersUseCase} from "@/features/feature_tenants/domain/use_cases/sync_tenant_users_use_case";
import {useMutation} from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useSyncTenantUsers() {
  const repo = new SyncTenantUsersRepositoryImpl(new SyncTenantUsersApi());
  const useCase = new SyncTenantUsersUseCase(repo);

  return useMutation({
    mutationFn: (tenantId: string) => useCase.execute(tenantId),
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: () => {
      toast.success("همگام سازی با موفقیت انجام شد.");
    }
  });
}
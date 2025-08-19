import {DeleteTenantRepositoryImpl} from "@/features/feature_tenants/data/repositories/delete_tenant_repository_impl";
import {DeleteTenantApi} from "@/features/feature_tenants/data/data_source/delete_tenant_api";
import {DeleteTenantUseCase} from "@/features/feature_tenants/domain/use_cases/delete_tenant_use_case";
import {useMutation} from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useDeleteTenant(onSuccess: () => void) {

  const repo = new DeleteTenantRepositoryImpl(new DeleteTenantApi());
  const useCase = new DeleteTenantUseCase(repo);

  return useMutation({
    mutationFn: (tenantId: string) => useCase.execute(tenantId),
    onError(error) {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("سازمان با موفقیت حذف شد.");
      onSuccess();
    },
  });
}
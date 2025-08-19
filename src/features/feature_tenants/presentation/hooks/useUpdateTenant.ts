import {UpdateTenantRepositoryImpl} from "@/features/feature_tenants/data/repositories/update_tenant_repository_impl";
import {UpdateTenantApi} from "@/features/feature_tenants/data/data_source/update_tenant_api";
import {UpdateTenantUseCase} from "@/features/feature_tenants/domain/use_cases/update_tenant_use_case";
import {useMutation} from "@tanstack/react-query";
import {storeTenantType} from "@/core/types/tenantsTypes";
import toast from "react-hot-toast";

export function useUpdateTenant(onSuccess: () => void) {

  const repo = new UpdateTenantRepositoryImpl(new UpdateTenantApi());
  const useCase = new UpdateTenantUseCase(repo);

  return useMutation({
    mutationFn: ({tenantData, tenantId}: {
      tenantId: string,
      tenantData: storeTenantType
    }) => useCase.execute(tenantData, tenantId),
    onError(error) {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("سازمان با موفقیت ویرایش شد.");
      onSuccess();
    },
  });
}
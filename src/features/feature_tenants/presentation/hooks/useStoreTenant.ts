import {StoreTenantRepositoryImpl} from "@/features/feature_tenants/data/repositories/store_tenant_repository_impl";
import {StoreTenantApi} from "@/features/feature_tenants/data/data_source/store_tenant_api";
import {StoreTenantUseCase} from "@/features/feature_tenants/domain/use_cases/store_tenant_use_case";
import {useMutation} from "@tanstack/react-query";
import {storeTenantType} from "@/core/types/tenantsTypes";
import toast from "react-hot-toast";

export function useStoreTenant(onSuccess: () => void) {

  const repo = new StoreTenantRepositoryImpl(new StoreTenantApi());
  const useCase = new StoreTenantUseCase(repo);

  return useMutation({
    mutationFn: (tenantData: storeTenantType) => useCase.execute(tenantData),
    onError(error) {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("سازمان با موفقیت افزوده شد.");
      onSuccess();
    },
  });
}
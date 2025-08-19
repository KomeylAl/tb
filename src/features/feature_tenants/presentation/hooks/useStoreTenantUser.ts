import {
  StoreTenantUserRepositoryImpl
} from "@/features/feature_tenants/data/repositories/store_tenant_user_repository_impl";
import {StoreTenantUserApi} from "@/features/feature_tenants/data/data_source/store_tenant_user_api";
import {StoreTenantUserUseCase} from "@/features/feature_tenants/domain/use_cases/store_tenant_user_use_case";
import {useMutation} from "@tanstack/react-query";
import {storeTenantUserType} from "@/core/types/tenantsTypes";
import toast from "react-hot-toast";

export function useStoreTenantUser(onSuccess: () => void) {

  const repo = new StoreTenantUserRepositoryImpl(new StoreTenantUserApi());
  const useCase = new StoreTenantUserUseCase(repo);

  return useMutation({
    mutationFn: ({userData, tenantId}: {
      userData: storeTenantUserType,
      tenantId: string
    }) => useCase.execute(userData, tenantId),
    onError(error) {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("کاربر با موفقیت افزوده شد.");
      onSuccess();
    },
  });
}
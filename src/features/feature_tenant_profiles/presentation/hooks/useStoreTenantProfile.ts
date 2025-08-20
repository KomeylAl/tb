
import {useMutation} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
    StoreTenantProfileRepositoryImpl
} from "@/features/feature_tenant_profiles/data/repositories/store_tenant_profile_repository_impl";
import {StoreTenantProfileApi} from "@/features/feature_tenant_profiles/data/data_source/store_tenant_profile_api";
import {
    StoreTenantProfileUseCase
} from "@/features/feature_tenant_profiles/domain/use_cases/store_tenant_profile_use_case";
import {storeTenantProfileType} from "@/core/types/tenantsTypes";

export function useStoreTenantProfile(onSuccess: () => void) {

  const repo = new StoreTenantProfileRepositoryImpl(new StoreTenantProfileApi());
  const useCase = new StoreTenantProfileUseCase(repo);

  return useMutation({
    mutationFn: (assetProfileData: storeTenantProfileType) => useCase.execute(assetProfileData),
    onError(error) {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("پروفایل سازمان با موفقیت افزوده شد.");
      onSuccess();
    },
  });
}
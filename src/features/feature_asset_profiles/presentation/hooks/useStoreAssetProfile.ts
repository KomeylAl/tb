import {
  StoreAssetProfileRepositoryImpl
} from "@/features/feature_asset_profiles/data/repositories/store_asset_profile_repository_impl";
import {StoreAssetProfileApi} from "@/features/feature_asset_profiles/data/data_source/store_asset_profile_api";
import {
  StoreAssetProfileUseCase
} from "@/features/feature_asset_profiles/domain/use_cases/store_asset_profile_use_case";
import {useMutation} from "@tanstack/react-query";
import {storeAssetProfileType} from "@/core/types/assetsTypes";
import toast from "react-hot-toast";

export function useStoreAssetProfile(onSuccess: () => void) {

  const repo = new StoreAssetProfileRepositoryImpl(new StoreAssetProfileApi());
  const useCase = new StoreAssetProfileUseCase(repo);

  return useMutation({
    mutationFn: (assetProfileData: storeAssetProfileType) => useCase.execute(assetProfileData),
    onError(error) {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("پروفایل دارایی با موفقیت افزوده شد.");
      onSuccess();
    },
  });
}
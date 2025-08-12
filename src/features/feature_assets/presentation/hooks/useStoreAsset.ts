import {useMutation} from "@tanstack/react-query";
import {StoreAssetRepositoryImpl} from "@/features/feature_assets/data/repositories/store_asset_repository_impl";
import {StoreAssetApi} from "@/features/feature_assets/data/data_source/store_asset_api";
import {StoreAssetUseCase} from "@/features/feature_assets/domain/use_cases/store_asset_use_case";
import toast from "react-hot-toast";
import {storeAssetType} from "@/core/types";

export function useStoreAsset(onSuccess: () => void) {

  const repo = new StoreAssetRepositoryImpl(new StoreAssetApi());
  const useCase = new StoreAssetUseCase(repo);

  return useMutation({
    mutationFn: (assetData: storeAssetType) => useCase.execute(assetData),
    onError(error) {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("دارایی با موفقیت افزوده شد.");
      onSuccess();
    },
  });
}
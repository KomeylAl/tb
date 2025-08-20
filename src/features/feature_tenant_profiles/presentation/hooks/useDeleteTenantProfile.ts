import {useMutation} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  DeleteAssetProfileRepositoryImpl
} from "@/features/feature_asset_profiles/data/repositories/delete_asset_profile_repository_impl";
import {DeleteAssetProfileApi} from "@/features/feature_asset_profiles/data/data_source/delete_asset_profile_api";
import {
  DeleteAssetProfileUseCase
} from "@/features/feature_asset_profiles/domain/use_cases/delete_asset_profile_use_case";

export function useDeleteAssetProfile(onSuccess: () => void) {

  const repo = new DeleteAssetProfileRepositoryImpl(new DeleteAssetProfileApi());
  const useCase = new DeleteAssetProfileUseCase(repo);

  return useMutation({
    mutationFn: (profileId: string) => useCase.execute(profileId),
    onError(error) {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("پروفایل دارایی با موفقیت حذف شد.");
      onSuccess();
    },
  });
}
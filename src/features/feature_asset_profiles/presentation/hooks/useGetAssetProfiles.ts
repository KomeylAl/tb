import {useQuery} from "@tanstack/react-query";
import {
  GetAssetProfilesRepositoryImpl
} from "@/features/feature_asset_profiles/data/repositories/get_asset_profiles_repository_impl";
import {GetAssetProfilesApi} from "@/features/feature_asset_profiles/data/data_source/get_asset_profiles_api";
import {GetAssetProfilesUseCase} from "@/features/feature_asset_profiles/domain/use_cases/get_asset_profiles_use_case";

export function useGetAssetProfiles(
    page: number = 0,
    pageSize: number = 1,
    textSearch: string = ""
) {
  const repo = new GetAssetProfilesRepositoryImpl(new GetAssetProfilesApi());
  const useCase = new GetAssetProfilesUseCase(repo);

  return useQuery({
    queryKey: ["assetProfiles", page, pageSize],
    queryFn: () => useCase.execute(page, pageSize, textSearch),
  });
}
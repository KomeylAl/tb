import {useQuery} from "@tanstack/react-query";
import {GetAssetsRepositoryImpl} from "@/features/feature_assets/data/repositories/get_assets_repository_impl";
import {GetAssetsApi} from "@/features/feature_assets/data/data_source/get_assets_api";
import {GetAssetsUseCase} from "@/features/feature_assets/domain/use_cases/get_assets_use_case";

export function useGetAssets(
    page: number = 0,
    pageSize: number = 1,
    textSearch: string = ""
) {
  const repo = new GetAssetsRepositoryImpl(new GetAssetsApi());
  const useCase = new GetAssetsUseCase(repo);

  return useQuery({
    queryKey: ["assets", page, pageSize],
    queryFn: () => useCase.execute(page, pageSize, textSearch),
  });
}
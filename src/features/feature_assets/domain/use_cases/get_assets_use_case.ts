import {GetAssetsRepository} from "@/features/feature_assets/domain/repositories/get_assets_repository";
import {AssetsDataType} from "@/core/types";

export class GetAssetsUseCase {
  constructor(private repository: GetAssetsRepository) {
  }

  async execute(page: number, pageSize: number, textSearch: string): Promise<AssetsDataType> {
    return await this.repository.getAssets(page, pageSize, textSearch);
  }
}
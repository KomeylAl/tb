import {GetAssetsRepository} from "@/features/feature_assets/domain/repositories/get_assets_repository";
import {GetAssetsApi} from "@/features/feature_assets/data/data_source/get_assets_api";
import {AssetsDataType} from "@/core/types";

export class GetAssetsRepositoryImpl implements GetAssetsRepository {
  constructor(private getAssetsApi: GetAssetsApi) {
  }

  async getAssets(page: number, pageSize: number, pageToken: string): Promise<AssetsDataType> {
    return await this.getAssetsApi.getAssets(page, pageSize, pageToken);
  }
}
import {
  GetAssetProfilesRepository
} from "@/features/feature_asset_profiles/domain/repositories/get_asset_profiles_repository";
import {GetAssetProfilesApi} from "@/features/feature_asset_profiles/data/data_source/get_asset_profiles_api";
import {AssetProfilesDataType} from "@/core/types";

export class GetAssetProfilesRepositoryImpl implements GetAssetProfilesRepository {
  constructor(private getAssetProfilesApi: GetAssetProfilesApi) {
  }

  async getAssetProfiles(page: number, pageSize: number, textSearch: string): Promise<AssetProfilesDataType> {
    return await this.getAssetProfilesApi.getAssetProfiles(page, pageSize, textSearch);
  }
}
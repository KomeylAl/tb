import {
  GetAssetProfilesRepository
} from "@/features/feature_asset_profiles/domain/repositories/get_asset_profiles_repository";
import {AssetProfilesDataType} from "@/core/types";

export class GetAssetProfilesUseCase {
  constructor(private repository: GetAssetProfilesRepository) {}

  async execute(page: number, pageSize: number, textSearch: string): Promise<AssetProfilesDataType> {
    return await this.repository.getAssetProfiles(page, pageSize, textSearch);
  }
}
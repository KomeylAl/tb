import {
  StoreAssetProfileRepository
} from "@/features/feature_asset_profiles/domain/repositories/store_asset_profile_repository";
import {AssetProfileEntity} from "@/features/feature_asset_profiles/domain/entities/asset_profile_entity";
import {storeAssetProfileType} from "@/core/types/assetsTypes";

export class StoreAssetProfileUseCase {
  constructor(private repository: StoreAssetProfileRepository) {
  }

  async execute(assetProfileData: storeAssetProfileType): Promise<AssetProfileEntity> {
    return await this.repository.storeAssetProfile(assetProfileData);
  }
}
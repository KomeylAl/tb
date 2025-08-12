import {
  StoreAssetProfileRepository
} from "@/features/feature_asset_profiles/domain/repositories/store_asset_profile_repository";
import {StoreAssetProfileApi} from "@/features/feature_asset_profiles/data/data_source/store_asset_profile_api";
import {storeAssetProfileType} from "@/core/types/assetsTypes";
import {AssetProfileEntity} from "@/features/feature_asset_profiles/domain/entities/asset_profile_entity";

export class StoreAssetProfileRepositoryImpl implements StoreAssetProfileRepository {
  constructor(private storeAssetProfileApi: StoreAssetProfileApi) {
  }

  async storeAssetProfile(assetProfileData: storeAssetProfileType): Promise<AssetProfileEntity> {
    return await this.storeAssetProfileApi.storeAsset(assetProfileData);
  }
}
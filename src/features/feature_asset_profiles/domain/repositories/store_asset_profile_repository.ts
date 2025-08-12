import {storeAssetProfileType} from "@/core/types/assetsTypes";
import {AssetProfileEntity} from "@/features/feature_asset_profiles/domain/entities/asset_profile_entity";

export interface StoreAssetProfileRepository {
  storeAssetProfile(assetProfileData: storeAssetProfileType): Promise<AssetProfileEntity>;
}
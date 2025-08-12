import {storeAssetProfileType} from "@/core/types/assetsTypes";
import {AssetProfileEntity} from "@/features/feature_asset_profiles/domain/entities/asset_profile_entity";

export class StoreAssetProfileApi {
  async storeAsset(assetProfileData: storeAssetProfileType): Promise<AssetProfileEntity> {
    const res = await fetch('/api/tenant/assets/profiles', {
      method: 'POST',
      body: JSON.stringify(assetProfileData),
    });
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return await res.json();
  }
}
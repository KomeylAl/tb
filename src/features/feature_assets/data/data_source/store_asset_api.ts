import {AssetEntity} from "@/features/feature_assets/domain/entities/asset_entity";
import {storeAssetType} from "@/core/types";

export class StoreAssetApi {
  async storeAsset(assetData: storeAssetType): Promise<AssetEntity> {
    const res = await fetch('/api/tenant/assets', {
      method: 'POST',
      body: JSON.stringify(assetData),
    });
    if (res.status !== 201) {
      throw new Error(res.statusText);
    }
    return await res.json();
  }
}
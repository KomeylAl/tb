import {AssetEntity} from "@/features/feature_assets/domain/entities/asset_entity";
import {storeAssetType} from "@/core/types";

export interface StoreAssetRepository {
  storeAsset(assetData: storeAssetType): Promise<AssetEntity>;
}
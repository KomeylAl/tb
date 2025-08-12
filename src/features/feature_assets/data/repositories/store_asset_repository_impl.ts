import {StoreAssetRepository} from "@/features/feature_assets/domain/repositories/store_asset_repository";
import {StoreAssetApi} from "@/features/feature_assets/data/data_source/store_asset_api";
import {AssetEntity} from "@/features/feature_assets/domain/entities/asset_entity";
import {storeAssetType} from "@/core/types";

export class StoreAssetRepositoryImpl implements StoreAssetRepository {
  constructor(private storeAssetApi: StoreAssetApi) {
  }

  async storeAsset(assetData: storeAssetType): Promise<AssetEntity> {
    return await this.storeAssetApi.storeAsset(assetData);
  }
}
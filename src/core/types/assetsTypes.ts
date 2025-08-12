import {AssetEntity} from "@/features/feature_assets/domain/entities/asset_entity";
import {AssetProfileEntity} from "@/features/feature_asset_profiles/domain/entities/asset_profile_entity";

export type storeAssetType = {
  type?: string | undefined;
  label?: string | undefined;
  name: string;
  additionalInfo: {
    description?: string | undefined;
  };
  assetProfileId: {
    id?: string | undefined;
    entityType: string;
  };
};

export type storeAssetProfileType = {
  name: string;
  description?: string | undefined;
};

export interface AssetsDataType {
  data: AssetEntity[];
  hasNext: boolean;
  totalElements: number;
  totalPages: number;
}

export interface AssetProfilesDataType {
  data: AssetProfileEntity[];
  hasNext: boolean;
  totalElements: number;
  totalPages: number;
}
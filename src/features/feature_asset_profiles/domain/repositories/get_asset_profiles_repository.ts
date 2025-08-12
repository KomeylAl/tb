import {AssetProfilesDataType} from "@/core/types";

export interface GetAssetProfilesRepository {
  getAssetProfiles(page: number, pageSize: number, textSearch: string): Promise<AssetProfilesDataType>;
}
import {AssetsDataType} from "@/core/types";

export interface GetAssetsRepository {
  getAssets(page: number, pageSize: number, pageToken: string): Promise<AssetsDataType>;
}
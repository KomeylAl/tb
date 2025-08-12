import {AssetsDataType} from "@/core/types";

export class GetAssetsApi {
  async getAssets(page: number = 0, pageSize: number = 1, textSearch: string = ""): Promise<AssetsDataType> {
    const res = await fetch(`/api/tenant/assets?page=${page}&pageSize=${pageSize}&textSearch=${textSearch}`);
    if (res.status !== 200) {
      throw new Error(res.statusText);
    }
    return await res.json();
  }
}
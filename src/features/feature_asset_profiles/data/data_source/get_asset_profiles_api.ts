import {AssetProfilesDataType} from "@/core/types";

export class GetAssetProfilesApi {
  async getAssetProfiles(page: number = 0, pageSize: number = 1, textSearch: string = ""): Promise<AssetProfilesDataType> {
    const res = await fetch(`/api/tenant/assets/profiles?page=${page}&pageSize=${pageSize}&textSearch=${textSearch}`);
    if (res.status !== 200) {
      throw new Error(res.statusText);
    }
    return await res.json();
  }
}
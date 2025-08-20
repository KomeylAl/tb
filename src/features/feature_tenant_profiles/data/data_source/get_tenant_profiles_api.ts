import {TenantProfilesDataType} from "@/core/types";

export class GetTenantProfilesApi {
    async getTenantProfiles(page: number = 0, pageSize: number = 1, textSearch: string = ""): Promise<TenantProfilesDataType> {
        const res = await fetch(`/api/admin/tenants/profiles?page=${page}&pageSize=${pageSize}&textSearch=${textSearch}`);
        if (res.status !== 200) {
            throw new Error(res.statusText);
        }
        return await res.json();
    }
}
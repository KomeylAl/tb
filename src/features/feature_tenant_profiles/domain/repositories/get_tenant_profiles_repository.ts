import {TenantProfilesDataType} from "@/core/types";

export interface GetTenantProfilesRepository {
    getTenantProfiles(page: number, pageSize: number, textSearch: string): Promise<TenantProfilesDataType>;
}
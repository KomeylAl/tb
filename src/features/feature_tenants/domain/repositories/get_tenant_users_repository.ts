import {TenantUsersDataType} from "@/core/types/tenantsTypes";

export interface GetTenantUsersRepository {
  getTenantUsers(page: number, pageSize: number, tenantId: string): Promise<TenantUsersDataType>;
}
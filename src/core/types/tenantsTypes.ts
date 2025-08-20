import { TenantDeviceEntity } from "@/features/feature_tenants/domain/entities/tenant_device_entity";
import {TenantEntity} from "@/features/feature_tenants/domain/entities/tenant_entity";
import {TenantUserEntity} from "@/features/feature_tenants/domain/entities/tenant_user_entity";
import {TenantProfileEntity} from "@/features/feature_tenant_profiles/domain/entities/tenant_profile_entity";

export interface TenantsDataType {
  data: TenantEntity[];
  hasNext: boolean;
  totalElements: number;
  totalPages: number;
}

export interface TenantProfilesDataType {
    data: TenantProfileEntity[];
    hasNext: boolean;
    totalElements: number;
    totalPages: number;
}

export interface TenantUsersDataType {
  data: TenantUserEntity[];
  hasNext: boolean;
  totalElements: number;
  totalPages: number;
}

export interface TenantDevicesDataType {
  data: TenantDeviceEntity[];
  hasNext: boolean;
  totalElements: number;
  totalPages: number;
}

export type storeTenantType = {
  country?: string;
  state?: string;
  city?: string;
  address?: string;
  address2?: string;
  zip?: string;
  phone: string;
  email: string;
  title: string;
  region?: string;
  tenantProfileId: {
    id?: string;
    entityType?: string;
  };
  additionalInfo: {
    description?: string;
  };
};

export type storeTenantProfileType = {
    name: string;
    description?: string;
    type?: string;

    maxDevices?: number;
    maxDashboards?: number;
    maxAssets?: number;
    maxUsers?: number;
    maxCustomers?: number;
    maxRuleChains?: number;

    maxEmails?: number;
    smsEnabled?: boolean;
    maxSms?: number;

    limit1?: number;
    interval1?: number;
    limit2?: number;
    interval2?: number;

    default?: boolean;
};

export type storeTenantUserType = {
  firstName: string;
  lastName: string;
  phone?: string;
  email: string;
  password: string;
};
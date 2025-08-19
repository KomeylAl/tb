export interface TenantEntity {
  id: Id;
  createdTime: number;
  country: string;
  state: string;
  city: string;
  address: string;
  address2: string;
  zip: string;
  phone: string;
  email: string;
  title: string;
  region: string;
  tenantProfileId: TenantProfileId;
  version: number;
  name: string;
  additionalInfo: null;
}

export interface Id {
  id: string;
  entityType: string;
}

export interface TenantProfileId {
  id: string;
  entityType: string;
}
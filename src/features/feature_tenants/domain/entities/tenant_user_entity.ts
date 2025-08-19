export interface TenantUserEntity {
  id: {
    id: string;
    entityType: string;
  };
  createdTime: number;
  tenantId: {
    id: string;
    entityType: string;
  };
  customerId: {
    id: string;
    entityType: string;
  };
  email: string;
  authority: string;
  firstName: string;
  lastName: string;
  phone: string;
  version: number;
  name: string;
  additionalInfo: null;
}

export interface TenantLocalUserEntity {
  things_id: string;
  tenantId: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  role: string;
  createdAt: Date;
}

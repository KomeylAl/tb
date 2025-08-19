import Link from "next/link";
import {DeviceEntity} from "@/features/feature_devices/domain/entities/device_entity";
import {convertISOToJalali} from "@/config/convertISOToJalali";
import {Column} from "@/core/types";
import {AssetEntity} from "@/features/feature_assets/domain/entities/asset_entity";
import {AssetProfileEntity} from "@/features/feature_asset_profiles/domain/entities/asset_profile_entity";
import {TenantEntity} from "@/features/feature_tenants/domain/entities/tenant_entity";
import {TenantUserEntity} from "@/features/feature_tenants/domain/entities/tenant_user_entity";
import {TenantDeviceEntity} from "@/features/feature_tenants/domain/entities/tenant_device_entity";

export const tenantColumns: Column<TenantEntity>[] = [
  {
    header: "نام",
    accessor: (item: TenantEntity) => (
        <Link
            href={`/sysadmin/tenants/${item.id.id}`}
            className="hover:text-blue-500"
        >
          {item.name}
        </Link>
    ),
  },
  {header: "ایمیل", accessor: "email"},
  {header: "تلفن", accessor: "phone"},
  {header: "زمان ایجاد", accessor: (item: TenantEntity) => convertISOToJalali(item.createdTime)},
];

export const tenantUsersColumns: Column<TenantUserEntity>[] = [
  {header: "نام", accessor: "firstName"},
  {header: "نام خانوادگی", accessor: "lastName"},
  {header: "ایمیل", accessor: "email"},
  {header: "تلفن", accessor: "phone"},
];

export const tenantDeviceColumns: Column<TenantDeviceEntity>[] = [
  { header: "نام", accessor: "name" },
  { header: "پروفایل", accessor: "type" },
  { header: "تاریخ ایجاد", accessor: (item: TenantDeviceEntity) => convertISOToJalali(item.createdAt), },
];

export const devicesColumns: Column<DeviceEntity>[] = [
  {
    header: "نام",
    accessor: (item: DeviceEntity) => (
        <Link
            href={`/dashboard/devices/${item.id.id}`}
            className="hover:text-blue-500"
        >
          {item.name}
        </Link>
    ),
  },
  {header: "پروفایل", accessor: "type"},
  {header: "برچسب", accessor: "label"},
  {
    header: "زمان ایجاد",
    accessor: (item: DeviceEntity) => convertISOToJalali(item.createdTime),
  },
];

export const assetsColumns: Column<AssetEntity>[] = [
  {
    header: "نام",
    accessor: (item: AssetEntity) => (
        <Link
            href={`/dashboard/assets/${item.id.id}`}
            className="hover:text-blue-500"
        >
          {item.name}
        </Link>
    ),
  },
  {header: "پروفایل", accessor: "type"},
  {header: "برچسب", accessor: "label"},
  {
    header: "زمان ایجاد",
    accessor: (item: AssetEntity) => convertISOToJalali(item.createdTime),
  },
];

export const assetProfilesColumns: Column<AssetProfileEntity>[] = [
  {header: "نام", accessor: "name"},
  {header: "توضیحات", accessor: "description"},
  {
    header: "زمان ایجاد",
    accessor: (item: AssetProfileEntity) => convertISOToJalali(item.createdTime),
  },
];
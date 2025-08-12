import Link from "next/link";
import {DeviceEntity} from "@/features/feature_devices/domain/entities/device_entity";
import {convertISOToJalali} from "@/config/convertISOToJalali";
import {Column} from "@/core/types";
import {AssetEntity} from "@/features/feature_assets/domain/entities/asset_entity";
import {AssetProfileEntity} from "@/features/feature_asset_profiles/domain/entities/asset_profile_entity";

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
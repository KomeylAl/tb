import {DeviceEntity} from "@/features/feature_devices/domain/entities/device_entity";
import {AssetsDataType, AssetProfilesDataType} from "@/core/types/assetsTypes";
import React from "react";

import {storeAssetType} from "@/core/types/assetsTypes";

export interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  cellClassName?: (row: T) => string;
}

export interface DevicesDataType {
  data: DeviceEntity[];
  hasNext: boolean;
  totalElements: number;
  totalPages: number;
}

export type EntityType = {
  label: string;
  value: string;
};

export type {storeAssetType, AssetsDataType, AssetProfilesDataType};
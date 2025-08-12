import * as yup from "yup";

export const assetSchema = yup.object({
  name: yup.string().required("نام الزامی است"),
  type: yup.string().optional(),
  label: yup.string().optional(),
  additionalInfo: yup.object({
    description: yup.string().optional(),
  }),
  assetProfileId: yup.object({
    id: yup.string().optional(),
    entityType: yup.string().optional().default("ASSET_PROFILE"),
  }),
});

export const assetProfileSchema = yup.object({
  name: yup.string().required("نام الزامی است"),
  description: yup.string().optional(),
});
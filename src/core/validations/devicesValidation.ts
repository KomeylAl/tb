import * as yup from "yup";

export const devicesValidation = yup.object({
  name: yup.string().required("نام الزامی است"),
  type: yup.string().optional(),
  label: yup.string().optional(),
  tenantId: yup.string(),
  additionalInfo: yup.object({
    description: yup.string().optional(),
    location: yup.string().optional(),
  }),
  deviceProfileId: yup.object({
    id: yup.string().optional(),
    entityType: yup.string().optional().default("DEVICE_PROFILE"),
  }),
});
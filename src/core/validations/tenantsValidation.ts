import * as yup from "yup";

export const tenantSchema = yup.object({
  title: yup.string().required("عنوان الزامی است"),
  country: yup.string().optional(),
  state: yup.string().optional(),
  city: yup.string().optional(),
  address: yup.string().optional(),
  address2: yup.string().optional(),
  zip: yup.string().optional(),
  phone: yup.string().required("تلفن الزامی است"),
  region: yup.string().optional(),
  profile: yup.string().optional(),
  additionalInfo: yup.object({
    description: yup.string().optional(),
  }),
  tenantProfileId: yup.object({
    id: yup.string().optional(),
    entityType: yup.string().optional(),
  }),
  email: yup.string().email("ایمیل معتبر نیست").required("ایمیل الزامی است"),
});

export const tenantUserSchema = yup.object({
  firstName: yup.string().required("نام الزامی است"),
  lastName: yup.string().required("نام خانوادگی الزامی است"),
  phone: yup.string().optional(),
  password: yup.string().required(),
  email: yup.string().required().email("ایمیل معتبر نیست"),
});
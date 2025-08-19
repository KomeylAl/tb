import {useStoreTenant} from "@/features/feature_tenants/presentation/hooks/useStoreTenant";
import {useEffect, useState} from "react";
import {EntityType} from "@/core/types";
import axios from "axios";
import toast from "react-hot-toast";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {storeTenantType} from "@/core/types/tenantsTypes";
import {tenantSchema} from "@/core/validations";
import {Combobox} from "@/core/components/ui/Combobox";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {TenantProfileEntity} from "@/features/feature_tenant_profiles/domain/entities/tenant_profile_entity";

interface StoreTenantFormProps {
  onSuccess: () => void;
}

const StoreTenantForm = ({onSuccess}: StoreTenantFormProps) => {

  const {mutate: storeTenant, isPending} = useStoreTenant(() => onSuccess());

  const [profiles, setProfiles] = useState<EntityType[]>([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get(`/api/admin/tenants/profiles?page=0&pageSize=100`);
        const entities = response.data.data.map((item: TenantProfileEntity) => ({
          label: item.name,
          value: item.id.id,
        }));
        setProfiles(entities);
      } catch (err) {
        toast.error(`${err}`);
      }
    };

    fetchProfiles().then(() => {
    });
  }, []);

  const {
    register,
    handleSubmit,
    control,
    formState: {errors, isSubmitting},
  } = useForm({
    resolver: yupResolver(tenantSchema),
  });

  const onSubmit = (data: storeTenantType) => {
    storeTenant(data);
  };

  return (
      <div className="flex flex-col items-start gap-8">
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3 w-full"
        >
          <Input
              {...register("title")}
              placeholder="عنوان*"
          />
          {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}

          <Controller
              name="tenantProfileId.id"
              control={control}
              render={({field}) => (
                  <Combobox
                      data={profiles}
                      placeholder="انتخاب پروفایل"
                      searchPlaceholder="جستجو..."
                      value={field.value || ""}
                      onChange={field.onChange}
                  />
              )}
          />

          <Input
              {...register("country")}
              placeholder="کشور"
          />

          <div className="w-full flex items-center gap-3">
            <Input
                {...register("city")}
                placeholder="شهر"
            />
            <Input
                {...register("state")}
                placeholder="استان"
            />
            <Input
                {...register("zip")}
                placeholder="کد پستی"
            />
          </div>

          <Input
              {...register("address")}
              placeholder="نشانی"
          />

          <Input
              {...register("address2")}
              placeholder="نشانی 2"
          />

          <Input
              {...register("phone")}
              placeholder="تلفن*"
          />
          {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
          )}

          <Input
              {...register("email")}
              placeholder="ایمیل*"
          />
          {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          <Textarea
              {...register("additionalInfo.description")}
              placeholder="توضیحات"
          />

          <Button
              type="submit"
              disabled={isPending || isSubmitting}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            {isPending || isSubmitting ? "در حال افزودن..." : "افزودن سازمان"}
          </Button>
        </form>
      </div>
  );
}

export default StoreTenantForm;
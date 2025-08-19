import {useStoreTenantUser} from "@/features/feature_tenants/presentation/hooks/useStoreTenantUser";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {tenantUserSchema} from "@/core/validations/tenantsValidation";
import {storeTenantUserType} from "@/core/types/tenantsTypes";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

interface StoreTenantUserFormProps {
  onSuccess: () => void;
  tenantId: string;
}

const StoreTenantUserForm = ({onSuccess, tenantId}: StoreTenantUserFormProps) => {
  const {mutate: storeTenantUser, isPending} = useStoreTenantUser(onSuccess);

  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm({
    resolver: yupResolver(tenantUserSchema),
  });

  const onSubmit = (data: storeTenantUserType) => {
    storeTenantUser({userData: data, tenantId});
  };
  return (
      <div className="flex flex-col items-start gap-8">
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3 w-full"
        >
          <Input {...register("firstName")} placeholder="نام*"/>
          {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName.message}</p>
          )}

          <Input {...register("lastName")} placeholder="نام خانوداگی*"/>
          {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName.message}</p>
          )}

          <Input {...register("email")} placeholder="ایمیل*"/>
          {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          <Input {...register("phone")} placeholder="تلفن"/>

          <Input
              {...register("password")}
              type="password"
              placeholder="رمز عبور*"
          />

          <Button
              type="submit"
              disabled={isPending || isSubmitting}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            {isPending || isSubmitting ? "در حال افزودن..." : "افزودن کاربر"}
          </Button>
        </form>
      </div>
  );
}

export default StoreTenantUserForm;

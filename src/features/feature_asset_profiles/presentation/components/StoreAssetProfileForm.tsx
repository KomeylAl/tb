"use client";

import {useStoreAssetProfile} from "@/features/feature_asset_profiles/presentation/hooks/useStoreAssetProfile";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {assetProfileSchema} from "@/core/validations/assetsValidation";
import {storeAssetProfileType} from "@/core/types/assetsTypes";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";

interface StoreAssetProfileFormProps {
  onSuccess: () => void;
}

const StoreAssetProfileForm = ({onSuccess}: StoreAssetProfileFormProps) => {
  const {mutate: storeAssetProfile, isPending} = useStoreAssetProfile(() => onSuccess());

  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm({
    resolver: yupResolver(assetProfileSchema),
  });

  const onSubmit = (data: storeAssetProfileType) => {
    storeAssetProfile(data);
  };

  return (
      <div className="flex flex-col items-start gap-8">
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3 w-full"
        >
          <Input {...register("name")} placeholder="نام*"/>
          {errors.name && (
              <p className="text-red-500 text-sm">
                {errors.name.message as string}
              </p>
          )}

          <Textarea {...register("description")} placeholder="توضیحات"/>

          <Button type="submit" disabled={isPending || isSubmitting}>
            {isPending || isSubmitting ? "در حال افزودن..." : "افزودن پروفایل"}
          </Button>
        </form>
      </div>
  );
}

export default StoreAssetProfileForm;
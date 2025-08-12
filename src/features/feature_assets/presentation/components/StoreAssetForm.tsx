import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {assetSchema} from "@/core/validations";
import {useStoreAsset} from "@/features/feature_assets/presentation/hooks/useStoreAsset";
import {EntityType, storeAssetType} from "@/core/types";
import {useEffect, useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {Combobox} from "@/core/components/ui/Combobox";
import {AssetProfileEntity} from "@/features/feature_asset_profiles/domain/entities/asset_profile_entity";

interface StoreAssetFormProps {
  onSuccess: () => void;
}

const StoreAssetForm = ({ onSuccess }: StoreAssetFormProps) => {

  const { mutate: storeAsset, isPending } = useStoreAsset(() => onSuccess());

  const [profiles, setProfiles] = useState<EntityType[]>([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get(`/api/tenant/assets/profiles?page=0&pageSize=100`);
        const entities = response.data.data.map((item: AssetProfileEntity) => ({
          label: item.name,
          value: item.id.id,
        }));
        setProfiles(entities);
      } catch (err) {
        toast.error(`${err}`);
      }
    };

    fetchProfiles().then(() => {});
  }, []);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(assetSchema),
  });

  const onSubmit = (data: storeAssetType) => {
    storeAsset(data);
  };

  return (
      <div className="flex flex-col items-start gap-8">
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3 w-full"
        >
          <Input
              {...register("name")}
              placeholder="نام*"
          />
          {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}

          <div className="">
            <Controller
                name="assetProfileId.id"
                control={control}
                render={({ field }) => (
                    <Combobox
                        data={profiles}
                        placeholder="انتخاب پروفایل"
                        searchPlaceholder="جستجو..."
                        value={field.value || ""}
                        onChange={field.onChange}
                    />
                )}
            />
            {errors.assetProfileId && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.assetProfileId.message}
                </p>
            )}
          </div>

          <Input
              {...register("type")}
              placeholder="نوع"
          />

          <Input
              {...register("label")}
              placeholder="برچسب"
          />

          <Textarea
              {...register("additionalInfo.description")}
              placeholder="توضیحات"
          />

          <Button
              type="submit"
              disabled={isPending || isSubmitting}
          >
            {isPending || isSubmitting ? "⏳ در حال افزودن..." : "افزودن دارایی"}
          </Button>
        </form>
      </div>
  );
}

export default StoreAssetForm;
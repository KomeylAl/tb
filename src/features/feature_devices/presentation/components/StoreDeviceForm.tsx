"use client";

import {deviceSchema} from "@/core/validations";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useEffect, useState} from "react";
import {EntityType, storeDeviceType} from "@/core/types";
import {useStoreDevice} from "@/features/feature_devices/presentation/hooks/useStoreDevice";
import axios from "axios";
import toast from "react-hot-toast";
import {Input} from "@/components/ui/input";
import {Combobox} from "@/core/components/ui/Combobox";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";

interface StoreDeviceFormProps {
  onSuccess: () => void;
}

const StoreDeviceForm = ({ onSuccess }: StoreDeviceFormProps) => {
  const { mutate: storeDevice, isPending } = useStoreDevice(onSuccess);

  const [profiles, setProfiles] = useState<EntityType[]>([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get(`/api/tenant/devices/profiles?page=0&pageSize=100`);
        const entities = response.data.data.map((item: any) => ({
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
    resolver: yupResolver(deviceSchema),
  });

  const onSubmit = (data: storeDeviceType) => {
    storeDevice(data);
  };

  return (
      <div className="flex flex-col items-start gap-8">
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3 w-full"
        >
          <Input {...register("name")} placeholder="نام*" />
          {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}

          <div className="">
            <Controller
                name="deviceProfileId.id"
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
            {errors.deviceProfileId && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.deviceProfileId.message}
                </p>
            )}
          </div>

          <Input {...register("type")} placeholder="نوع" />

          <Input {...register("label")} placeholder="برچسب" />

          <Input {...register("additionalInfo.location")} placeholder="مکان" />

          <Textarea
              {...register("additionalInfo.description")}
              placeholder="توضیحات"
          />

          <Button type="submit" disabled={isPending || isSubmitting}>
            {isPending || isSubmitting ? "در حال افزودن..." : "افزودن دستگاه"}
          </Button>
        </form>
      </div>
  );
};

export default StoreDeviceForm;

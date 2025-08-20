"use client";

import {useForm, Resolver, SubmitHandler} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {useStoreTenantProfile} from "@/features/feature_tenant_profiles/presentation/hooks/useStoreTenantProfile";
import {storeTenantProfileType} from "@/core/types/tenantsTypes";
import {tenantProfileSchema} from "@/core/validations/tenantsValidation";
import {useState} from "react";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";

const entityKeys = [
    "maxDevices",
    "maxDashboards",
    "maxAssets",
    "maxUsers",
    "maxCustomers",
    "maxRuleChains",
] as const;

type EntityKey = (typeof entityKeys)[number];

interface StoreTenantProfileFormProps {
  onSuccess: () => void;
}

const StoreTenantProfileForm = ({onSuccess}: StoreTenantProfileFormProps) => {
  const {mutate: storeTenantProfile, isPending} = useStoreTenantProfile(() => onSuccess());

    const [isSmsShow, setIsSmsShow] = useState(false);
    const toggleSmsShow = () => setIsSmsShow((prev) => !prev);

    const [unitPrices, setUnitPrices] = useState<Record<EntityKey, number>>({
        maxDevices: 0,
        maxDashboards: 0,
        maxAssets: 0,
        maxUsers: 0,
        maxCustomers: 0,
        maxRuleChains: 0,
    });

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<storeTenantProfileType>({
        resolver: yupResolver(tenantProfileSchema) as Resolver<storeTenantProfileType>,
    });

    const handleUnitPriceChange = (field: EntityKey, value: number) => {
        setUnitPrices((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const watchValues = watch(entityKeys);
    const totalPrice = watchValues.reduce((acc, val, idx) => {
        const count = Number(val) || 0;
        const price = unitPrices[entityKeys[idx]] || 0;
        return acc! + count * price;
    }, 0);

    const onSubmit: SubmitHandler<storeTenantProfileType> = (data) => {
        const sendData = {
            ...data,
            unitPrices,
        };
        storeTenantProfile(sendData);
    };

  return (
      <div className="flex flex-col items-start gap-8">
          <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-3 w-full"
          >
              <Input
                  {...register("name")}
                  placeholder="عنوان پروفایل*"
              />
              {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}

              <Accordion type="single" collapsible className=''>
                  <AccordionItem value="item1">
                      <AccordionTrigger>کانفیگ پروفایل</AccordionTrigger>
                      <AccordionContent>
                          <div className="flex flex-col gap-3">
                              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                                  <p className="font-semibold">موجودیت‌ها + قیمت گذاری</p>
                                  <div className="mt-3 grid grid-cols-2 gap-3">
                                      {entityKeys.map((key) => (
                                          <div key={key} className="flex flex-col gap-1">
                                              <Input
                                                  {...register(key)}
                                                  type="number"
                                                  placeholder={`تعداد ${key}`}
                                              />
                                              <Input
                                                  type="number"
                                                  value={unitPrices[key]}
                                                  onChange={(e) =>
                                                      handleUnitPriceChange(key, Number(e.target.value))
                                                  }
                                                  placeholder={`قیمت هر ${key}`}
                                              />
                                          </div>
                                      ))}
                                  </div>
                                  <div className="mt-4 p-3 border-t text-right">
                                      <p className="font-semibold">
                                          قیمت کل پروفایل: {totalPrice?.toLocaleString() ?? 0} تومان
                                      </p>
                                  </div>
                              </div>

                              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                                  <p>حداکثر تعداد پیام</p>
                                  <div className="mt-3 grid grid-cols-2 gap-3">
                                      <Input
                                          {...register("limit1")}
                                          type="number"
                                          placeholder="حداکثر پیام در بازه اول*"
                                      />
                                      <Input
                                          {...register("interval1")}
                                          type="number"
                                          placeholder="زمان بازه اول (ثانیه)*"
                                      />
                                      <Input
                                          {...register("limit2")}
                                          type="number"
                                          placeholder="حداکثر پیام در بازه دوم*"
                                      />
                                      <Input
                                          {...register("interval2")}
                                          type="number"
                                          placeholder="زمان بازه دوم (ثانیه)*"
                                      />
                                  </div>
                              </div>

                              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                                  <p>هشدارها و اعلانات</p>
                                  <label className="flex items-center gap-2 mt-3">
                                      <input
                                          {...register("smsEnabled")}
                                          type="checkbox"
                                          onClick={toggleSmsShow}
                                      />
                                      فعال سازی پیامک
                                  </label>
                                  <div className="mt-3 grid grid-cols-2 gap-3">
                                      <Input
                                          {...register("maxSms")}
                                          type="number"
                                          className={` ${
                                              isSmsShow ? "block" : "hidden"
                                          }`}
                                          placeholder="حداکثر تعداد پیامک*"
                                      />
                                      <Input
                                          {...register("maxEmails")}
                                          type="number"
                                          placeholder="حداکثر تعداد ایمیل*"
                                      />
                                  </div>
                              </div>
                          </div>
                      </AccordionContent>
                  </AccordionItem>
              </Accordion>

              <Textarea
                  {...register("description")}
                  placeholder="توضیحات"
              />

              <Button
                  type="submit"
                  disabled={isPending || isSubmitting}
                  className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                  {isPending || isSubmitting ? "در حال افزودن..." : "افزودن پروفایل"}
              </Button>
          </form>
      </div>
  );
}

export default StoreTenantProfileForm;
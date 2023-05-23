import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { fetchServiceTypeState } from "../../../../model/essentialsModel";
import { updateVendorPortfolio } from "../../../../model/vendorModel";
import { essentialsStore } from "../../../../store/essentialsStore";
import { userState } from "../../../../store/userState";
import { Portfolio } from "../../../../types/types";
import ButtonDefault from "../../../../utilityComponents/CustomButton";
import DropdownSingleSelect from "../../../../utilityComponents/DropdownSingleSelect";
import InputField from "../../../../utilityComponents/InputField";
import { toasted } from "../../../../utilityComponents/Toast";

const ProfileInputValues = {
  service: {
    className: "sm:col-span-3",
    id: "service",
    label: "Предоставяна услуга",
  },
  price: {
    className: "sm:col-span-2",
    id: "price",
    label: "Цена (на час)",
  },
};

type TServicesForm = { services: Portfolio[]; isAdhocEnabled: boolean; isSubscriptionEnabled: boolean };

let ValidationSchema = z
  .object({
    services: z
      .object({
        service: z.object({ id: z.number(), value: z.string(), description: z.string().optional(), imgUrl: z.string().optional() }),
        price: z.string().pipe(z.coerce.number({ invalid_type_error: "Въведете цяло число за цена" }).int().min(1, { message: "Въведете цяло число за цена" })),
      })
      .array(),
    isSubscriptionEnabled: z.boolean(),
    isAdhocEnabled: z.boolean(),
  })
  //   add validation for repeating values in service field
  .superRefine(
    (data, ctx) =>
      data.services.forEach((portfolio, index) => {
        const foundDuplicate = data.services.findIndex((item) => item.service.id === portfolio.service.id) !== index;
        if (foundDuplicate)
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Услугата е вече налична`,
            path: [`services.${index}.service`],
          });
      })
    //   data.services.filter((portfolio, index) => data.services.findIndex((service) => service.service.id === portfolio.service.id) !== index).length === 0,
  );
export default function Services() {
  const serviceTypes = essentialsStore((store) => store.serviceTypes);
  const userData = userState((state) => state.userData);
  const services = userData?.vendor?.portfolio;
  const { isAdhocEnabled, isSubscriptionEnabled } = userData.vendor || {};

  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<TServicesForm>({
    defaultValues: { services, isAdhocEnabled, isSubscriptionEnabled },
    values: { services, isAdhocEnabled, isSubscriptionEnabled },
    resolver: zodResolver(ValidationSchema),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "services",
  });

  const submitFormHandler = async (data: any) => {
    console.log(data);
    console.log(data);
    const portfolio = await updateVendorPortfolio(data);
    toasted("Промените са записани");
  };

  useEffect(() => {
    fetchServiceTypeState();
  }, []);

  return (
    <>
      {serviceTypes.length > 0 && (
        <div className="flex-1 py-4">
          <form onSubmit={handleSubmit(submitFormHandler)} className="max-w-3xl">
            <p className="text-sm text-gray-500 sm:col-span-6 ">Типове услуги, които ще предлагате:</p>
            {/* One-time and schedule services */}
            <div className="col-span-6 mb-2 flex border-b pb-3">
              <div className="relative mt-2 flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="subscription"
                    aria-describedby="subscription-description"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600"
                    {...register("isSubscriptionEnabled")}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="subscription" className="font-medium text-gray-700">
                    Абонаментни планове
                  </label>
                  <p id="subscription-description" className="text-xs text-gray-500">
                    Договаря се регулярен график на изпълнение в ден и час от седмицата. Подходящо за услуги като домашни помощници, офис почистване...
                  </p>
                </div>
              </div>
              <div className="relative mt-2 flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="adhoc"
                    aria-describedby="adhoc-description"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 "
                    {...register("isAdhocEnabled")}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="adhoc" className="font-medium text-gray-700">
                    Еднократна услуга
                  </label>
                  <p id="adhoc-description" className="text-xs text-gray-500">
                    Договаря се еднократно конретен ден и час за изъплнение на услугата. Подходящо за услуги като пране на килими, миене на прозорци...
                  </p>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-500 sm:col-span-6">Конретни услуги и цени:</p>
            <ButtonDefault category="secondary" className="mt-2 whitespace-nowrap" onClick={() => append({} as Portfolio)}>
              Добави услуга
            </ButtonDefault>
            {fields.map((item, index) => (
              <div key={item.id} className="mt-4 grid grid-cols-1 sm:grid-cols-6 sm:gap-x-6">
                <DropdownSingleSelect {...ProfileInputValues.service} name={`services.${index}.service` as const} control={control} options={serviceTypes} />
                <InputField {...ProfileInputValues.price} name={`services.${index}.price` as const} control={control} />
                <ButtonDefault
                  onClick={() => remove(index)}
                  category="secondary"
                  className="m-0 w-min place-self-center border-transparent p-0 px-0 shadow-none sm:-ml-10 sm:mt-1.5"
                >
                  Изтрий
                </ButtonDefault>
              </div>
            ))}

            <div className="flex justify-end gap-4 pt-8">
              <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 "
              >
                Запиши
              </button>
              <button
                type="button"
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 shadow-sm hover:bg-gray-50 "
              >
                Отмени
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

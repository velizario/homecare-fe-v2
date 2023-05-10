import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { fetchServiceTypeState } from "../../../../model/essentialsModel";
import { updateVendorPortfolio } from "../../../../model/vendorModel";
import { essentialsStore } from "../../../../store/essentialsStore";
import { userState } from "../../../../store/userState";
import { Portfolio, PortfolioInputForm } from "../../../../types/types";
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

let ValidationSchema = z.object({
  service: z.string({ required_error: "Изберете услуга" }),
  price: z.number({ required_error: "Определете цена на услугата" }),
});



export default function Services() {
  const serviceTypes = essentialsStore((store) => store.serviceTypes);
  const userData = userState((state) => state.userData);
  const services = userData?.vendor?.portfolio 
  console.log(services);

  const { register, control, handleSubmit, reset, trigger, setError } = useForm<{services: Portfolio[]}>({
    defaultValues: {},
    values: {services},
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "services",
  });

  // { resolver: zodResolver(ValidationSchema) }
  const submitFormHandler = async (data: any) => {
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
            <p className="text-sm text-gray-500 sm:col-span-6 ">Тук определяте цени на услугите</p>
            {fields.map((item, index) => (
              <div key={item.id} className="mt-6 grid grid-cols-1 sm:grid-cols-6 sm:items-end sm:gap-x-6">
                <DropdownSingleSelect {...ProfileInputValues.service} name={`services.${index}.service` as const} control={control} options={serviceTypes} />
                <InputField {...ProfileInputValues.price} name={`services.${index}.price` as const} control={control} />
                <ButtonDefault category="secondary" className="m-0 w-min border-transparent p-0 px-0 shadow-none sm:-ml-4">
                  Изтрий
                </ButtonDefault>
              </div>
            ))}
            <ButtonDefault category="secondary" className="mt-8 whitespace-nowrap" onClick={() => append({} as Portfolio)}>
              Добави услуга
            </ButtonDefault>

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

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { fetchServiceTypeState } from "../../../../model/essentialsModel";
import { updateVendorPortfolio } from "../../../../model/vendorModel";
import { essentialsStore } from "../../../../store/essentialsStore";
import { PortfolioInputForm } from "../../../../types/types";
import DropdownSingleSelect from "../../../../utilityComponents/DropdownSingleSelect";
import InputField from "../../../../utilityComponents/InputField";
import { toasted } from "../../../../utilityComponents/Toast";

const ProfileInputValues = {
  service: {
    className: "sm:col-span-6",
    name: "service",
    id: "service",
    label: "Предоставяна услуга",
  },
  price: {
    className: "col-start-1 sm:col-end-7",
    name: "price",
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

  const { control, handleSubmit } = useForm<PortfolioInputForm>(
    // { resolver: zodResolver(ValidationSchema) }
    );
  console.log(serviceTypes);
  const submitFormHandler = async (data: PortfolioInputForm) => {
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
          <form onSubmit={handleSubmit(submitFormHandler)} className="max-w-3xl space-y-8 divide-y">
            <div className="flex flex-col gap-4">
              <p className="text-sm text-gray-500 sm:col-span-6">Промяна на мейл, парола и т.н.</p>
              <DropdownSingleSelect {...ProfileInputValues.service} control={control} options={serviceTypes} />
              <InputField {...ProfileInputValues.price} control={control} />
            </div>

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

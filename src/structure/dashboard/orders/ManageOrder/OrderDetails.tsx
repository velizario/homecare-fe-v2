import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Control, useForm, UseFormRegister } from "react-hook-form";
import { useParams } from "react-router-dom";
import { z } from "zod";
import classNames from "../../../../helpers/classNames";
import { fetchDistrictNames, fetchServiceTypeState } from "../../../../model/essentialsModel";
import { getOrder } from "../../../../model/orderModel";
import { getVendor } from "../../../../model/vendorModel";
import { essentialsStore } from "../../../../store/essentialsStore";
import { estateSizeSelections, hourDaySelections, visitFrequencySelections, weekDaySelections } from "../../../../store/static";
import { Order, Vendor } from "../../../../types/types";
import ComboSingleSelect from "../../../../utilityComponents/ComboSingleSelect";
import DropdownSingleSelect from "../../../../utilityComponents/DropdownSingleSelect";
import ImageGallery from "../../../../utilityComponents/ImageGallery";
import FileAttachmentsList from "./FileAttachmentsList";

type OrderDetailsProps = {
  orderData: Order;
  control: Control<Order, object>;
  register: UseFormRegister<Order>;
  editMode: boolean;
};

const formTemplate = {
  serviceType: { name: "serviceType", id: "serviceType", label: "Услуга" },
  visitFrequency: { name: "visitFrequency", id: "visitFrequency", label: "Честота" },
  districtName: { name: "districtName", id: "districtName", label: "Район" },
  estateSize: { name: "estateSize", id: "estateSize", label: "Площ на имота, кв.м." },
  visitDay: { name: "visitDay", id: "visitDay", label: "Ден на посещение" },
  visitHour: { name: "visitHour", id: "visitHour", label: "Час на посещение" },
  additionalInfo: { name: "additionalInfo", id: "additionalInfo", label: "Допълнителна информация" },
};

export default function OrderDetails({ orderData, control, register, editMode }: OrderDetailsProps) {
  const [districtNames, serviceTypes] = essentialsStore((essentials) => [essentials.districtNames, essentials.serviceTypes]);

  useEffect(() => {
    fetchDistrictNames();
    fetchServiceTypeState();
  }, []);

  const [vendor, setVendor] = useState<Vendor>();

  const fetchVendorData = async () => {
    const vendorData = await getVendor("1");
    setVendor(vendorData);
  };

  useEffect(() => {
    fetchVendorData();
  }, []);

  return (
    <>
      <div className="border-gray-200 pt-4">
        <dl className="grid grid-cols-1  gap-x-4 sm:grid-cols-[5fr_3fr]">
          <dd className="mt-1 text-base font-semibold text-gray-900 sm:col-span-1">
            <DropdownSingleSelect {...formTemplate.serviceType} disabled={!editMode} options={serviceTypes} control={control} />
          </dd>
          <dd className="mt-1 text-base font-semibold text-gray-900 sm:col-span-1">
            <DropdownSingleSelect {...formTemplate.visitFrequency} disabled={!editMode} options={visitFrequencySelections} control={control} />
          </dd>
          <dd className="mt-1 text-base font-semibold text-gray-900 sm:col-span-1">
            <DropdownSingleSelect
              {...formTemplate.visitDay}
              validOptions={orderData.clientDayChoice}
              disabled={!editMode}
              options={weekDaySelections}
              control={control}
            />
          </dd>
          <dd className="mt-1 text-base font-semibold text-gray-900 sm:col-span-1">
            <DropdownSingleSelect
              {...formTemplate.visitHour}
              validOptions={orderData.clientHourChoice}
              disabled={!editMode}
              options={hourDaySelections}
              control={control}
            />
          </dd>
          <dd className="mt-1 text-base font-semibold text-gray-900 sm:col-span-1">
            <ComboSingleSelect {...formTemplate.districtName} disabled={!editMode} options={districtNames} control={control} />
          </dd>
          <dd className="mt-1 text-base font-semibold text-gray-900 sm:col-span-1">
            <ComboSingleSelect {...formTemplate.estateSize} disabled={!editMode} options={estateSizeSelections} control={control} />
          </dd>
          <div className="mt-6 sm:col-span-2">
            <dt className="block text-sm font-normal text-gray-900">Допълнителна информация</dt>
            <textarea
              id="comment"
              {...register("additionalInfo")}
              rows={5}
              disabled={!editMode}
              className={classNames(
                !editMode
                  ? "bg-gray-50 text-gray-600"
                  : "bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600",
                "mt-1 w-full rounded-md border-0 py-1.5 pl-3 pr-10  sm:text-sm sm:leading-6"
              )}
              placeholder={`${editMode ? "Добави коментар" : ""}`}
            />
          </div>
        </dl>
        <div className=" order-3 mt-4 grid w-[calc(100%-3rem)] grid-cols-[repeat(auto-fill,minmax(6rem,1fr))] gap-y-8">
          {vendor && <ImageGallery images={vendor.portfolioImage} />}
        </div>
      </div>
    </>
  );
}

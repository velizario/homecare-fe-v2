import VendorCard from "../cards/VendorCard";

// Filters should be:
// Район
// Оценка
// Град
// Цени (валиден само за един вид услуга)
// Видове услуги
// Име (търсене)

import { Dialog, Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, FunnelIcon, Squares2X2Icon } from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { fetchDistrictNames, fetchServiceTypeState } from "../../model/essentialsModel";
import { findVendors } from "../../model/vendorModel";
import { EssentialDataServiceType, SelectionOption } from "../../types/types";
import ComboMultiSelect from "../../utilityComponents/ComboMultiSelect";
import ListSingleSelect from "../../utilityComponents/ListSingleSelect";
import VendorFilters from "./VendorFilters";
import debounce from "lodash.debounce";
import DropdownSingleSelect from "../../utilityComponents/DropdownSingleSelect";

const sortOptions = [
  { value: "Most Popular", href: "#", current: true },
  { value: "Best Rating", href: "#", current: false },
  { value: "Newest", href: "#", current: false },
  { value: "Price: Low to High", href: "#", current: false },
  { value: "Price: High to Low", href: "#", current: false },
];

export type TVendorFilterSet = {
  isAdhocEnabled: boolean | null;
  isSubscriptionEnabled: Boolean | null;
  servedDistrict: SelectionOption[];
  portfolio: { service: EssentialDataServiceType | null };
};

type TFilterOptions = {
  id: string;
  label: string;
  options: {
    name: string;
    value: string;
    label: string;
    checked: boolean;
  }[];
};

const filters: TFilterOptions = {
  id: "visitType",
  label: "Тип посещение",
  options: [
    { name: "isAdhocEnabled", value: "true", label: "Еднократно", checked: false },
    { name: "isSubscriptionEnabled", value: "true", label: "Абонамент", checked: false },
  ],
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function VendorList() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const { data: vendorData, isSuccess: vendorDataAvailable } = useQuery({
    queryKey: ["vendors"],
    queryFn: () => findVendors(),
    staleTime: Infinity,
  });

  const { data: serviceCategories, isSuccess: serviceCategoriesAvailable } = useQuery({
    queryKey: ["services"],
    queryFn: () => fetchServiceTypeState(),
  });

  const { data: districtNames, isSuccess: districtNamesAvailable } = useQuery({
    queryKey: ["districtNames"],
    queryFn: () => fetchDistrictNames(),
  });

  const handleFilterUpdate = async (filterData: TVendorFilterSet) => {
    return await findVendors(filterData);
  };

  const queryClient = useQueryClient();

  const vendorListMutation = useMutation({
    mutationFn: handleFilterUpdate,
    onSuccess: (newData) => {
      queryClient.setQueryData(["vendors"], newData);
      // queryClient.invalidateQueries(["vendors"], { exact: true });
    },
  });

  const { control, setValue, watch } = useForm<TVendorFilterSet>({
    // resolver: zodResolver(ValidationSchema),
    defaultValues: {
      isAdhocEnabled: null,
      isSubscriptionEnabled: null,
      servedDistrict: [],
      portfolio: { service: null },
    },
    // values: formDefaultValues,
  });

  let filterTimeout: NodeJS.Timeout;

  const userRating = watch();

  console.log(userRating);

  useEffect(() => {
    const subscription = watch((data) => {
      clearTimeout(filterTimeout);
      filterTimeout = setTimeout(() => {
        vendorListMutation.mutate(data as TVendorFilterSet);
      }, 200);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => {
                        setMobileFiltersOpen(false);
                      }}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form onBlur={(d) => console.log(d)} onChange={(d) => console.log(d)} className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Categories</h3>
                    <div className="px-2 py-3 font-medium text-gray-900">
                      {serviceCategoriesAvailable && <ListSingleSelect options={serviceCategories} name="portfolio" setValue={setValue} />}
                      <VendorFilters {...filters} setValue={setValue} />
                      {districtNamesAvailable && (
                        <div className="mt-6">
                          <p className="mb-2 text-xs font-normal uppercase text-gray-900">Район</p>
                          <ComboMultiSelect control={control} options={districtNames} name="servedDistrict" id="servedDistrict" />
                        </div>
                      )}
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-10">
            <h1 className="text-3xl font-semibold tracking-tight text-gray-900">Предлагащи услуги</h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.value}>
                          {({ active }) => (
                            <a
                              href={option.href}
                              className={classNames(
                                option.current ? "font-medium text-gray-900" : "text-gray-500",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              {option.value}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => {
                  setMobileFiltersOpen(true);
                }}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters desktop*/}
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>

                {serviceCategoriesAvailable && (
                  <DropdownSingleSelect options={serviceCategories} name="portfolio.service" control={control} label="Услуга" id="portfolio" />
                )}
                {/* {serviceCategoriesAvailable && <ListSingleSelect options={serviceCategories} name="portfolio" setValue={setValue} />} */}
                <VendorFilters {...filters} setValue={setValue} />
                {districtNamesAvailable && (
                  <div className="mt-6">
                    <p className="mb-2 text-xs font-normal uppercase text-gray-900">Район</p>
                    <ComboMultiSelect control={control} options={districtNames} name="servedDistrict" id="servedDistrict" />
                  </div>
                )}
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3">
                <div className="mx-auto max-w-4xl space-y-5 px-4">
                  {vendorDataAvailable &&
                    vendorData.map((vendor) => (
                      <div key={vendor.id}>
                        <VendorCard vendor={vendor} />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

import { Dispatch, SetStateAction } from "react";
import classNames from "../../helpers/classNames";

const serviceTypeChoices = [
  {
    id: "1",
    title: "Почистване на дома",
    description: "Почистване на гъз, глава, и тем подобни",
    img: "https://topmopscleaning.com/wp-content/uploads/2021/04/keeping-a-house-clean.jpeg",
  },
  {
    id: "2",
    title: "Почистване на офиси и магазини",
    description: "Рязане на кабели и промиване с чист спирт",
    img: "https://nswcommercialcleaning.com.au/wp-content/uploads/2018/04/iStock-609094288.jpg",
  },
  {
    id: "3",
    title: "Основно почистване",
    description: "Рязане на кабели и промиване с чист спирт",
    img: "https://cdn-ffokf.nitrocdn.com/LFtvDxXrnvtNThwjbFdxUfsgQYSGUhUB/assets/images/optimized/rev-37403d5/wp-content/uploads/2023/03/house-dusting.png",
  },
  {
    id: "4",
    title: "Следремонтно чистене",
    description: "Рязане на кабели и промиване с чист спирт",
    img: "https://prohousekeepers.com/wp-content/uploads/2019/05/post-construction-cleanup.jpg",
  },
  {
    id: "5",
    title: "Индустриално обслужване",
    description: "Рязане на кабели и промиване с чист спирт",
    img: "https://www.service-techcorp.com/hs-fs/hubfs/Industrial_Cleaning.jpeg?width=863&name=Industrial_Cleaning.jpeg",
  },
  {
    id: "6",
    title: "Пране на мека мебел",
    description: "Почистване на фотьойли и изхвърляне на котки",
    img: "https://media.angi.com/s3fs-public/Man-professionally-cleaning-couch.jpg?impolicy=leadImage",
  },
  {
    id: "7",
    title: "Пране на мокети / килими",
    description: "Рязане на кабели и промиване с чист спирт",
    img: "https://aadvancedcarpetcleaning.com/wp-content/uploads/2021/07/carpet-cleaners.jpg",
  },
  {
    id: "8",
    title: "Почистване на подови настилки",
    description: "Рязане на кабели и промиване с чист спирт",
    img: "https://www.webstaurantstore.com/images/products/large/573058/2253417.jpg",
  },
  {
    id: "9",
    title: "Почистване на прозорци и витрини",
    description: "Рязане на кабели и промиване с чист спирт",
    img: "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/05/featured-image-window-cleaning.jpeg.jpg",
  },
];

type SelectserviceProps = {
  setService: Dispatch<SetStateAction<string | undefined>>;
  setNextStep: () => void;
};

export default function SelectService({ setService, setNextStep }: SelectserviceProps) {
  return (
    <div className="max-w-4xl py-10">
      <h2 id="step-1" className="mx-auto mb-2 mt-4 w-max text-2xl font-semibold text-gray-900">
        Изберете вид услуга
      </h2>
      <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0">
        {serviceTypeChoices.map((action, actionIdx) => (
          <div
            key={action.title}
            className={classNames(
              "group relative bg-white p-2 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 hover:bg-neutral-100 sm:p-4 md:p-6"
            )}
          >
            <div className="flex max-h-[7rem] justify-between overflow-hidden">
              <div className="h-full">
                <img src={action.img} className="h-full object-cover" aria-hidden="true" />
              </div>
              <span
                className="pointer-events-none ml-4 hidden text-gray-300 group-hover:text-gray-400 sm:block"
                aria-hidden="true"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                </svg>
              </span>
            </div>
            <div className="mt-2">
              <h3 className="text-base font-semibold leading-6 text-gray-900">
                <a
                  onClick={() => {
                    setService(action.id);
                    setNextStep();
                  }}
                  className="cursor-pointer focus:outline-none"
                >
                  {/* Extend touch target to entire panel */}
                  <span className="absolute inset-0" aria-hidden="true" />
                  {action.title}
                </a>
              </h3>
              <p className="mt-2 text-sm text-gray-500">{action.description}</p>
            </div>
          </div>
        ))}
      </div>
      {/* TODO add sub-survice */}
      {/* <Toggle
        visible={watch.service ? true : false}
        options={additionalServiceChoices[watch.service ?? "1"]}
        styles=""
        setValue={setValue}
        name="additionalService"
      /> */}
    </div>
  );
}

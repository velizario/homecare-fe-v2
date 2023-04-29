import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateUserData } from "../../../../model/clientModel";
import { fetchDistrictNames } from "../../../../model/essentialsModel";
import { essentialsStore } from "../../../../store/essentialsStore";
import { userState } from "../../../../store/userState";
import { ProfileInputForm } from "../../../../types/types";
import ComboMultipleSelect from "../../../../utilityComponents/ComboMultipleSelect";
import ComboMultiSelect from "../../../../utilityComponents/ComboMultiSelect";
import ComboSingleSelect from "../../../../utilityComponents/ComboSingleSelect";
import CustomButton from "../../../../utilityComponents/CustomButton";
import InputField from "../../../../utilityComponents/InputField";
import { toasted } from "../../../../utilityComponents/Toast";
import ProfileAbout from "./ProfileAbout";
import ProfilePhoto from "./ProfilePhoto";

const formTemplate = {
  firstName: { className: "sm:col-span-3", name: "firstName", id: "first-name", label: "Име*", autoComplete: "given-name" },
  lastName: { className: "sm:col-span-3", name: "lastName", id: "last-name", label: "Фамилия*", autoComplete: "family-name" },
  district: { className: "sm:col-span-3", name: "district", id: "district", label: "Квартал/Район", autoComplete: "country-name" },
  servedDistrict: { className: "sm:col-span-3", name: "servedDistrict", id: "servedDistrict", label: "Райони на покритие", autoComplete: "country-name" },
  companyName: { className: "sm:col-span-6", name: "companyName", id: "company", label: "Име на фирма" },
  website: { className: "sm:col-span-3", name: "website", id: "website", label: "Уеб сайт" },
  facebook: { className: "sm:col-span-3", name: "facebook", id: "facebook", label: "Фейсбук" },
  instagram: { className: "sm:col-span-3", name: "instagram", id: "instagram", label: "Инстаграм" },
  phone: { className: "sm:col-span-3", name: "phone", id: "phone-number", label: "Телефонен номер*", autoComplete: "tel" },
  address: { className: "sm:col-span-3", name: "address", id: "address", label: "Адрес", autoComplete: "street-address" },
  city: { className: "sm:col-span-3", name: "city", id: "city", label: "Град" },
};

let ValidationSchema = z.object({
  firstName: z
    .string({ required_error: "Required field" })
    .nonempty({ message: "Required field" })
    .min(2, { message: "Minimum allowed characters are 2" })
    .max(40, { message: "Maximum allowed characters are 40" }),
  lastName: z.string().nonempty({ message: "Required field" }).max(40, "Maximum allowed characters are 40"),
  phone: z.string().max(15, "Maximum allowed characters are 15").optional(),
  facebook: z.string().optional(),
  website: z.string().optional(),
  instagram: z.string().optional(),
  district: z.string().optional(),
  city: z.string().optional(),
  about: z.string().optional(),
  address: z.string().optional(),
  servedDistrict: z.array(z.object({ id: z.number(), value: z.string() })).optional(),
  companyName: z.string().max(40, "Maximum allowed characters are 40").optional(),
  // email: z.string({ required_error: "Required field" }).email({ message: "Invalid email address" }),
  // password: z.string({ required_error: "Required field" }).min(8, "Password should be at least 8 characters long"),
  // passwordConfirm: z.string({ required_error: "Required field" }),
});

export default function Profile() {
  const [userData, setUserData] = userState((state) => [state.userData, state.setUserData]);
  const isVendor = Boolean(userData.vendorId);
  //TODO: I'm flattening the form here, but unflattening on the BE, so acting on two places. Is this well managed?
  const formDefaultValues = { ...userData, ...userData.client, ...userData.vendor };
  const districts = essentialsStore((store) => store.districtNames);

  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProfileInputForm>({
    resolver: zodResolver(ValidationSchema),
    defaultValues: {},
    values: formDefaultValues,
  });

  const submitFormHandler = async (userData: ProfileInputForm) => {
    const editedUser = await updateUserData(userData);
    if (!editedUser.hasOwnProperty("id")) {
      console.log("Apperror in Profile.tsx - could not update Profile. Possibly DB constraints not met.");
      return;
    }
    setUserData(editedUser);
    toasted("Информацията е записана успешно", "success");
  };

  useEffect(() => {
    fetchDistrictNames();
  }, []);

  useEffect(() => {
    console.log(watch("district"));
  }, [watch("district")]);

  return (
    <>
      {!userData.id || (districts.length < 1 && <div>loading</div>)}
      {userData.id && districts.length > 0 && (
        <form className="max-w-3xl flex-1 space-y-8 py-4 " encType="multipart/form-data" onSubmit={handleSubmit(submitFormHandler)}>
          <p className="text-sm text-gray-500">Информацията ще бъде използвана за да съставим вашата &quot;Визитка&quot;.</p>
          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
            <ProfilePhoto />
            <InputField {...formTemplate.firstName} register={register} errors={errors} />
            <InputField {...formTemplate.lastName} register={register} errors={errors} />
            {isVendor && <InputField {...formTemplate.companyName} register={register} errors={errors} />}
            <InputField {...formTemplate.phone} register={register} errors={errors} />
            {!isVendor && <InputField {...formTemplate.city} register={register} errors={errors} />}
            {isVendor && <InputField {...formTemplate.city} register={register} errors={errors} />}
            {!isVendor && (
              <ComboSingleSelect  {...formTemplate.district} control={control} options={districts}  />
            )}
            {!isVendor && <InputField {...formTemplate.address} register={register} errors={errors} />}
            {isVendor && <ProfileAbout {...register("about")} defaultValue={userData.vendor.about} control={control} />}
            {isVendor && <ComboMultipleSelect {...formTemplate.servedDistrict} defaultValue={userData.vendor.servedDistrict} setValue={setValue} />}
            {isVendor && <ComboMultiSelect {...formTemplate.servedDistrict} control={control} options={districts}  />}
            {isVendor && <InputField {...formTemplate.facebook} register={register} errors={errors} />}
            {isVendor && <InputField {...formTemplate.instagram} register={register} errors={errors} />}
            {isVendor && <InputField {...formTemplate.website} register={register} errors={errors} />}
          </div>
          <div className="flex justify-end gap-4 pt-8">
            <CustomButton type="submit" category="primary">
              Запиши
            </CustomButton>
          </div>
        </form>
      )}
    </>
  );
}

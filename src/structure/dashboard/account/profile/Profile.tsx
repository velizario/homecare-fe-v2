import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateUserData } from "../../../../model/clientModel";
import { userState } from "../../../../store/userState";
import { ProfileInputForm } from "../../../../types/types";
import CustomButton from "../../../../utilityComponents/CustomButton";
import InputField from "../../../../utilityComponents/InputField";
import InputFieldNew from "../../../../utilityComponents/InputFieldNew";
import { toasted } from "../../../../utilityComponents/Toast";
import ComboSelectBox from "./ComboSelectBoxMultiple";
import ProfileAbout from "./ProfileAbout";
import ProfilePhoto from "./ProfilePhoto";
import RegionSelection from "./RegionSelection";

const profileInputValues = {
  firstName: { className: "sm:col-span-3", name: "firstName", id: "first-name", label: "Име*", autoComplete: "given-name" },
  lastName: { className: "sm:col-span-3", name: "lastName", id: "last-name", label: "Фамилия*", autoComplete: "family-name" },
  companyName: { className: "sm:col-span-6", name: "company", id: "company", label: "Име на фирма" },
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
  servedDistrict: z.array(z.object({ id: z.number(), districtName: z.string() })).optional(),
  companyName: z.string().max(40, "Maximum allowed characters are 40").optional(),
  // email: z.string({ required_error: "Required field" }).email({ message: "Invalid email address" }),
  // password: z.string({ required_error: "Required field" }).min(8, "Password should be at least 8 characters long"),
  // passwordConfirm: z.string({ required_error: "Required field" }),
});

export default function Profile() {
  const [userData, setUserData] = userState((state) => [state.userData, state.setUserData]);
  const isVendor = Boolean(userData.vendorId);

  const formDefaultValues = {
    firstName: userData.firstName || "",
    lastName: userData.lastName || "",
    phone: userData.phone || "",
    companyName: userData.vendor?.companyName || "",
    district: userData.client?.district || "",
    facebook: userData.vendor?.facebook || "",
    instagram: userData.vendor?.instagram || "",
    website: userData.vendor?.website || "",
    servedDistrict: userData.vendor?.servedDistrict,
    city: userData.client?.city || "",
    address: userData.client?.address || "",
    userImage: userData.imageUrl || "",
    about: userData.vendor?.about || "",
  };

  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProfileInputForm>({
    resolver: zodResolver(ValidationSchema),
    defaultValues: formDefaultValues,
  });

  useEffect(() => {
    const formDefaultValues = {
      firstName: userData.firstName || "",
      lastName: userData.lastName || "",
      phone: userData.phone || "",
      companyName: userData.vendor?.companyName || "",
      district: userData.client?.district || "",
      facebook: userData.vendor?.facebook || "",
      instagram: userData.vendor?.instagram || "",
      website: userData.vendor?.website || "",
      servedDistrict: userData.vendor?.servedDistrict,
      city: userData.client?.city || "",
      address: userData.client?.address || "",
      userImage: userData.imageUrl || "",
      about: userData.vendor?.about || "",
    };
    reset(formDefaultValues);
  }, [userData]);

  const submitFormHandler = async (vendorData: ProfileInputForm) => {
    const editedUser = await updateUserData(vendorData);
    if (!editedUser.hasOwnProperty("id")) {
      console.log("Apperror in Profile.tsx - could not update Profile. Possibly DB constraints not met.");
      return;
    }
    setUserData(editedUser);
    toasted("Информацията е записана успешно", "success");
  };

  return (
    <>
      {!userData.id && <div>loading</div>}
      {userData.id && (
        <form className="max-w-3xl flex-1 space-y-8 py-4 " encType="multipart/form-data" onSubmit={handleSubmit(submitFormHandler)}>
          <p className="text-sm text-gray-500">Информацията ще бъде използвана за да съставим вашата &quot;Визитка&quot;.</p>
          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
            <ProfilePhoto />
            <InputFieldNew {...profileInputValues.firstName} register={register} errors={errors} />
            <InputFieldNew {...profileInputValues.lastName} register={register} errors={errors} />
            {isVendor && <InputFieldNew {...profileInputValues.companyName} register={register} errors={errors} />}
            <InputFieldNew {...profileInputValues.phone} register={register} errors={errors} />
            {!isVendor && <InputFieldNew {...profileInputValues.city} register={register} errors={errors}/>}
            {isVendor && <InputFieldNew {...profileInputValues.city} register={register} errors={errors} />}
            {!isVendor && <RegionSelection {...register("district")} defaultValue={userData.client.district} control={control} />}
            {!isVendor && <InputFieldNew {...profileInputValues.address} register={register} errors={errors} />}
            {isVendor && <ProfileAbout {...register("about")} defaultValue={userData.vendor.about} control={control} />}
            {isVendor && <ComboSelectBox defaultValue={userData.vendor.servedDistrict} setValue={setValue} />}
            {isVendor && <InputFieldNew {...profileInputValues.facebook} register={register} errors={errors}/>}
            {isVendor && <InputFieldNew {...profileInputValues.instagram} register={register} errors={errors} />}
            {isVendor && <InputFieldNew {...profileInputValues.website} register={register} errors={errors}/>}
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

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateUserData } from "../../../../model/clientModel";
import { updateVendorData } from "../../../../model/vendorModel";
import { userState } from "../../../../store/userState";
import { District } from "../../../../types/types";
import CustomButton from "../../../../utilityComponents/CustomButton";
import InputField from "../../../../utilityComponents/InputField";
import { toasted } from "../../../../utilityComponents/Toast";
import ComboSelectBox from "./ComboSelectBoxMultiple";
import ProfileAbout from "./ProfileAbout";
import ProfilePhoto from "./ProfilePhoto";

const profileInputValues = {
  firstName: {
    className: "sm:col-span-3",
    name: "firstName",
    id: "first-name",
    label: "Име*",
    autoComplete: "given-name",
  },
  lastName: {
    className: "sm:col-span-3",
    name: "last-name",
    id: "last-name",
    label: "Фамилия*",
    autoComplete: "family-name",
  },
  companyName: {
    className: "sm:col-span-6",
    name: "company",
    id: "company",
    label: "Име на фирма*",
  },
  website: {
    className: "sm:col-span-3",
    name: "website",
    id: "website",
    label: "Уеб сайт",
  },
  facebook: {
    className: "sm:col-span-3",
    name: "facebook",
    id: "facebook",
    label: "Фейсбук",
  },
  instagram: {
    className: "sm:col-span-3",
    name: "instagram",
    id: "instagram",
    label: "Инстаграм",
  },
  phone: {
    className: "sm:col-span-3",
    name: "phone-number",
    id: "phone-number",
    label: "Телефонен номер*",
    autoComplete: "tel",
  },
};

export type ProfileInputForm = {
  // id: string;
  firstName: string;
  lastName: string;
  phone: string;
  companyName: string;
  facebook: string;
  instagram: string;
  website: string;
  about: string;
  servedDistrict: District[];
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
  about: z.string().optional(),
  servedDistrict: z.array(z.object({ id: z.number(), districtName: z.string() })).optional(),
  companyName: z
    .string()
    .max(40, "Maximum allowed characters are 40")
    .nonempty({ message: "Required field" })
    .optional(),
  // email: z.string({ required_error: "Required field" }).email({ message: "Invalid email address" }),
  // password: z.string({ required_error: "Required field" }).min(8, "Password should be at least 8 characters long"),
  // passwordConfirm: z.string({ required_error: "Required field" }),
});

export default function ProfileVendor() {
  const [userData, setUserData] = userState((state) => [state.userData, state.setUserData]);

  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProfileInputForm>({
    resolver: zodResolver(ValidationSchema),
  });

  useEffect(() => {
    reset(userData);
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
        <div className="flex-1 py-4 px-4 md:px-6 lg:px-8">
          <form
            className="max-w-3xl space-y-8"
            encType="multipart/form-data"
            onSubmit={handleSubmit(submitFormHandler)}
          >
            <p className="text-sm text-gray-500">
              Информацията ще бъде използвана за да съставим вашата &quot;Визитка&quot;.
            </p>
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
              <ProfilePhoto />
              <InputField
                {...profileInputValues.firstName}
                {...register("firstName")}
                defaultValue={userData.firstName}
                control={control}
              />
              <InputField
                {...profileInputValues.lastName}
                {...register("lastName")}
                defaultValue={userData.lastName}
                control={control}
              />
              <InputField
                {...profileInputValues.companyName}
                {...register("companyName")}
                defaultValue={userData.vendor.companyName}
                control={control}
              />
              <InputField
                {...profileInputValues.phone}
                {...register("phone")}
                defaultValue={userData.phone}
                control={control}
              />

              <ProfileAbout {...register("about")} defaultValue={userData.vendor.about} control={control} />

              <ComboSelectBox defaultValue={userData.vendor.servedDistrict} setValue={setValue} />
              <InputField
                {...profileInputValues.facebook}
                {...register("facebook")}
                defaultValue={userData.vendor.facebook}
                control={control}
              />
              <InputField
                {...profileInputValues.instagram}
                {...register("instagram")}
                defaultValue={userData.vendor.instagram}
                control={control}
              />
              <InputField
                {...profileInputValues.website}
                {...register("website")}
                defaultValue={userData.vendor.website}
                control={control}
              />
            </div>
            <div className="flex justify-end gap-4 pt-8">
              <CustomButton type="submit" category="primary">
                Запиши
              </CustomButton>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

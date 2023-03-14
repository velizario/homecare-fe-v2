import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, FormEventHandler, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import checkIfVisible from "../../../../helpers/checkIfVisible";
import { UserType } from "../../../../helpers/types";
import InputField from "../../../../utilityComponents/InputField";
import ComboSelectBox from "./ComboSelectBox";
import ProfilePhoto from "./ProfilePhoto";
import ProfileAbout from "./ProfileAbout";
import RegionSelection from "./RegionSelection";

const profileInputValues = {
  firstName: {
    scope: [UserType.CLIENT, UserType.VENDOR_INDIVIDUAL],
    className: "sm:col-span-3",
    name: "firstName",
    id: "first-name",
    label: "Име*",
    autoComplete: "given-name",
  },
  lastName: {
    scope: [UserType.CLIENT, UserType.VENDOR_INDIVIDUAL],
    className: "sm:col-span-3",
    name: "last-name",
    id: "last-name",
    label: "Фамилия*",
    autoComplete: "family-name",
  },
  companyName: {
    scope: [UserType.VENDOR_COMPANY],
    className: "sm:col-span-6",
    name: "company",
    id: "company",
    label: "Име на фирма*",
  },
  url: {
    scope: [UserType.VENDOR_COMPANY, UserType.VENDOR_INDIVIDUAL],
    className: "sm:col-span-3",
    name: "url",
    id: "url",
    label: "Уеб сайт",
  },
  facebook: {
    scope: [UserType.VENDOR_COMPANY, UserType.VENDOR_INDIVIDUAL],
    className: "sm:col-span-3",
    name: "facebook",
    id: "facebook",
    label: "Фейсбук",
  },
  instagram: {
    scope: [UserType.VENDOR_COMPANY, UserType.VENDOR_INDIVIDUAL],
    className: "sm:col-span-3",
    name: "instagram",
    id: "instagram",
    label: "Инстаграм",
  },
  phone: {
    scope: [
      UserType.VENDOR_COMPANY,
      UserType.VENDOR_INDIVIDUAL,
      UserType.CLIENT,
    ],
    className: "sm:col-span-3",
    name: "phone-number",
    id: "phone-number",
    label: "Телефонен номер*",
    autoComplete: "tel",
  },
};

export type ProfileForm = {
  firstName: string;
  lastName: string;
  phone: string;
  district: string;
  companyName: string;
  facebook: string;
  instagram: string;
  url: string;
  userImage: string;
};

let BaseValidationSchema = z.object({
  firstName: z
    .string({ required_error: "Required field" })
    .min(2, { message: "Minimum allowed characters are 2" })
    .max(40, { message: "Maximum allowed characters are 40" }),
  lastName: z
    .string({ required_error: "Required field" })
    .max(40, "Maximum allowed characters are 40"),
  companyName: z
    .string()
    .max(40, "Maximum allowed characters are 40")
    .nonempty({ message: "Required field" }),
  email: z
    .string({ required_error: "Required field" })
    .email({ message: "Invalid email address" }),
  password: z
    .string({ required_error: "Required field" })
    .min(8, "Password should be at least 8 characters long"),
  passwordConfirm: z.string({ required_error: "Required field" }),
});

let DefaultValidationSchema = BaseValidationSchema.omit({
  companyName: true,
}).refine((data) => data.password === data.passwordConfirm, {
  message: "Passwords don't match",
  path: ["passwordConfirm"],
});

let CompanyValidationSchema = BaseValidationSchema.refine(
  (data) => data.password === data.passwordConfirm,
  {
    message: "Passwords don't match",
    path: ["passwordConfirm"],
  }
);


export default function Profile() {
  const [scrolledPosition, setScrolledPosition] = useState<number | null>(null);
  const [roles, setRoles] = useState<UserType[]>([]);

  const ActiveValidationSchema = roles.includes(UserType.VENDOR_COMPANY)
    ? CompanyValidationSchema
    : DefaultValidationSchema;

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileForm>({
    // resolver: zodResolver(ActiveValidationSchema),
  });

  window.addEventListener("scroll", () => {
    setScrolledPosition(window.scrollY);
  });

  useEffect(() => {}, [scrolledPosition]);

  const submitFormHandler = (data: ProfileForm) => {
    console.log(data);
  };

  

  return (
    <>
      <div className="flex-1 py-4 px-4 md:px-6 lg:px-8">

        <form
          className="max-w-3xl space-y-8"
          encType="multipart/form-data"
          onSubmit={handleSubmit(submitFormHandler)}
        >
          <p className="text-sm text-gray-500">
            Информацията ще бъде използвана за да съставим вашата
            &quot;Визитка&quot;.
          </p>
          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
            <ProfilePhoto/>
            {checkIfVisible(profileInputValues.firstName.scope) && (
              <InputField
                {...profileInputValues.firstName}
                {...register("firstName")}
                control={control}
              />
            )}
            {checkIfVisible(profileInputValues.lastName.scope) && (
              <InputField
                {...profileInputValues.lastName}
                {...register("lastName")}
                control={control}
              />
            )}
            {checkIfVisible(profileInputValues.companyName.scope) && (
              <InputField
                {...profileInputValues.companyName}
                {...register("companyName")}
                control={control}
              />
            )}
            {checkIfVisible(profileInputValues.phone.scope) && (
              <InputField
                {...profileInputValues.phone}
                {...register("phone")}
                control={control}
              />
            )}
            {checkIfVisible([
              UserType.VENDOR_COMPANY,
              UserType.VENDOR_INDIVIDUAL,
            ]) && <ComboSelectBox />}
            {checkIfVisible([
              UserType.VENDOR_COMPANY,
              UserType.VENDOR_INDIVIDUAL,
            ]) && <ProfileAbout />}
            {checkIfVisible(profileInputValues.facebook.scope) && (
              <InputField
                {...profileInputValues.facebook}
                {...register("facebook")}
                control={control}
              />
            )}
            {checkIfVisible(profileInputValues.instagram.scope) && (
              <InputField
                {...profileInputValues.instagram}
                {...register("instagram")}
                control={control}
              />
            )}
            {checkIfVisible(profileInputValues.url.scope) && (
              <InputField
                {...profileInputValues.url}
                {...register("url")}
                control={control}
              />
            )}
            {checkIfVisible([UserType.CLIENT]) && <RegionSelection />}
          </div>
          <div className="flex justify-end gap-4 pt-8">
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 "
            >
              Запиши
            </button>
            <button
              type="button"
              className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-900 shadow-sm hover:bg-gray-50 "
            >
              Отмени
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

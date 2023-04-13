import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import checkIfVisible from "../../../../helpers/checkIfVisible";
import InputField from "../../../../utilityComponents/InputField";
import ComboSelectBox from "./ComboSelectBoxMultiple";
import ProfilePhoto from "./ProfilePhoto";
import ProfileAbout from "./ProfileAbout";
import RegionSelection from "./RegionSelection";
import { userState } from "../../../../store/userState";
import { userEdit } from "../../../../model/clientModel";
import { District, UserRole } from "../../../../types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { toasted } from "../../../../utilityComponents/Toast";
import ComboSelectFullScreen from "../../../searchOrders/ComboSelectFullscreen";

const profileInputValues = {
  firstName: {
    scope: [UserRole.CLIENT, UserRole.VENDOR_INDIVIDUAL],
    className: "sm:col-span-3",
    name: "firstName",
    id: "first-name",
    label: "Име*",
    autoComplete: "given-name",
  },
  lastName: {
    scope: [UserRole.CLIENT, UserRole.VENDOR_INDIVIDUAL],
    className: "sm:col-span-3",
    name: "last-name",
    id: "last-name",
    label: "Фамилия*",
    autoComplete: "family-name",
  },
  companyName: {
    scope: [UserRole.VENDOR_COMPANY],
    className: "sm:col-span-6",
    name: "company",
    id: "company",
    label: "Име на фирма*",
  },
  website: {
    scope: [UserRole.VENDOR_COMPANY, UserRole.VENDOR_INDIVIDUAL],
    className: "sm:col-span-3",
    name: "website",
    id: "website",
    label: "Уеб сайт",
  },
  facebook: {
    scope: [UserRole.VENDOR_COMPANY, UserRole.VENDOR_INDIVIDUAL],
    className: "sm:col-span-3",
    name: "facebook",
    id: "facebook",
    label: "Фейсбук",
  },
  instagram: {
    scope: [UserRole.VENDOR_COMPANY, UserRole.VENDOR_INDIVIDUAL],
    className: "sm:col-span-3",
    name: "instagram",
    id: "instagram",
    label: "Инстаграм",
  },
  phone: {
    scope: [UserRole.VENDOR_COMPANY, UserRole.VENDOR_INDIVIDUAL, UserRole.CLIENT],
    className: "sm:col-span-3",
    name: "phone-number",
    id: "phone-number",
    label: "Телефонен номер*",
    autoComplete: "tel",
  },
  address: {
    scope: [UserRole.CLIENT],
    className: "sm:col-span-3",
    name: "address",
    id: "address",
    label: "Адрес",
    autoComplete: "street-address",
  },
  city: {
    scope: [UserRole.CLIENT],
    className: "sm:col-span-3",
    name: "city",
    id: "city",
    label: "Град",
  },
};

export type ProfileForm = {
  // id: string;
  firstName: string;
  lastName: string;
  phone: string;
  district: string;
  companyName: string;
  facebook: string;
  instagram: string;
  website: string;
  about: string;
  city: string;
  address: string;
  servedDistrict: District[];
};

let BaseValidationSchema = z.object({
  firstName: z
    .string({ required_error: "Required field" })
    .nonempty({ message: "Required field" })
    .min(2, { message: "Minimum allowed characters are 2" })
    .max(40, { message: "Maximum allowed characters are 40" }),
  lastName: z.string().nonempty({ message: "Required field" }).max(40, "Maximum allowed characters are 40"),
  phone: z.string().max(15, "Maximum allowed characters are 15").optional(),
  district: z.string().optional(),
  facebook: z.string().optional(),
  website: z.string().optional(),
  instagram: z.string().optional(),
  about: z.string().optional(),
  city: z.string().optional(),
  address: z.string().optional(),
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

let DefaultValidationSchema = BaseValidationSchema.omit({
  companyName: true,
});
// .refine((data) => data.password === data.passwordConfirm, {
//   message: "Passwords don't match",
//   path: ["passwordConfirm"],
// });

let CompanyValidationSchema = BaseValidationSchema;
// .refine((data) => data.password === data.passwordConfirm, {
//   message: "Passwords don't match",
//   path: ["passwordConfirm"],
// });

export default function Profile() {
  const [userData, setUserData] = userState((state) => [state.userData, state.setUserData]);
  const ActiveValidationSchema = userData.roles.includes(UserRole.VENDOR_COMPANY)
    ? CompanyValidationSchema
    : DefaultValidationSchema;

  useEffect(() => {
    reset(userData);
  }, [userData]);

  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProfileForm>({
    resolver: zodResolver(ActiveValidationSchema),
    // defaultValues: userData,
    // {
    //   firstName: userData.firstName || "",
    //   lastName: userData.lastName || "",
    //   phone: userData.phone || "",
    //   companyName: userData.vendor?.companyName || "",
    //   district: "",
    //   facebook: "",
    //   instagram: "",
    //   url: "",
    //   userImage: "",
    // },
    // values: userData,
    // resolver: zodResolver(ActiveValidationSchema),
  });

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  const submitFormHandler = async (data: ProfileForm) => {
    console.log("!!!!", data);
    const editedUser = await userEdit(data);
    if (!editedUser.hasOwnProperty("id")) {
      console.log("Apperror in Profile.tsx - could not update Profile. Possibly DB constraints not met.");
      return;
    }

    setUserData(editedUser);
    toasted("Информацията е записана успешно", "success");
  };

  return (
    <>
      <div className="flex-1 py-4 px-4 md:px-6 lg:px-8">
        <form className="max-w-3xl space-y-8" encType="multipart/form-data" onSubmit={handleSubmit(submitFormHandler)}>
          <p className="text-sm text-gray-500">
            Информацията ще бъде използвана за да съставим вашата &quot;Визитка&quot;.
          </p>
          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-6">
            <ProfilePhoto />
            {checkIfVisible(profileInputValues.firstName.scope) && (
              <InputField
                {...profileInputValues.firstName}
                {...register("firstName")}
                defaultValue={userData.firstName}
                control={control}
              />
            )}
            {checkIfVisible(profileInputValues.lastName.scope) && (
              <InputField
                {...profileInputValues.lastName}
                {...register("lastName")}
                defaultValue={userData.lastName}
                control={control}
              />
            )}
            {checkIfVisible(profileInputValues.companyName.scope) && (
              <InputField
                {...profileInputValues.companyName}
                {...register("companyName")}
                defaultValue={userData.companyName}
                control={control}
              />
            )}
            {checkIfVisible(profileInputValues.phone.scope) && (
              <InputField
                {...profileInputValues.phone}
                {...register("phone")}
                defaultValue={userData.phone}
                control={control}
              />
            )}
            {checkIfVisible(profileInputValues.city.scope) && (
              <InputField
                {...profileInputValues.city}
                {...register("city")}
                defaultValue={userData.city}
                control={control}
              />
            )}
            {checkIfVisible([UserRole.CLIENT]) && (
              <RegionSelection {...register("district")} defaultValue={userData.district} control={control} />
            )}
            {checkIfVisible(profileInputValues.address.scope) && (
              <InputField
                {...profileInputValues.address}
                {...register("address")}
                defaultValue={userData.address}
                control={control}
              />
            )}
            {checkIfVisible([UserRole.VENDOR_COMPANY, UserRole.VENDOR_INDIVIDUAL]) && (
              <ProfileAbout {...register("about")} defaultValue={userData.about} control={control} />
            )}

            {checkIfVisible([UserRole.VENDOR_COMPANY, UserRole.VENDOR_INDIVIDUAL]) && (
              <ComboSelectBox
                defaultValue={userData.servedDistrict}
                // {...register("servedDistrict")}
                // control={control}
                setValue={setValue}
              />
            )}
            {checkIfVisible(profileInputValues.facebook.scope) && (
              <InputField
                {...profileInputValues.facebook}
                {...register("facebook")}
                defaultValue={userData.facebook}
                control={control}
              />
            )}
            {checkIfVisible(profileInputValues.instagram.scope) && (
              <InputField
                {...profileInputValues.instagram}
                {...register("instagram")}
                defaultValue={userData.instagram}
                control={control}
              />
            )}
            {checkIfVisible(profileInputValues.website.scope) && (
              <InputField
                {...profileInputValues.website}
                {...register("website")}
                defaultValue={userData.website}
                control={control}
              />
            )}
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

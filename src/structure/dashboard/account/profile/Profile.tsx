import { useEffect} from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import checkIfVisible from "../../../../helpers/checkIfVisible";
import InputField from "../../../../utilityComponents/InputField";
import ComboSelectBox, { District } from "./ComboSelectBox";
import ProfilePhoto from "./ProfilePhoto";
import ProfileAbout from "./ProfileAbout";
import RegionSelection from "./RegionSelection";
import { userState } from "../../../../store/userState";
import { User, userEdit, UserType } from "../../../../model/userModel";

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
  website: {
    scope: [UserType.VENDOR_COMPANY, UserType.VENDOR_INDIVIDUAL],
    className: "sm:col-span-3",
    name: "website",
    id: "website",
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
  address: {
    scope: [UserType.CLIENT],
    className: "sm:col-span-3",
    name: "address",
    id: "address",
    label: "Адрес",
    autoComplete: "street-address",
  },
  city: {
    scope: [UserType.CLIENT],
    className: "sm:col-span-3",
    name: "city",
    id: "city",
    label: "Град",
  },
};

export type ProfileForm = {
  id: string;
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

let userDataFlat = {} as ProfileForm;

export default function Profile() {
  const userData = userState((state) => state.userData);

  const ActiveValidationSchema = userData.roles.includes(
    UserType.VENDOR_COMPANY
  )
    ? CompanyValidationSchema
    : DefaultValidationSchema;

  useEffect(() => {
    const { vendor, client, imageUrl, isSuspended, id, ...rest } = userData;
    Object.assign(userDataFlat, rest, vendor, client);
    reset(userDataFlat);
  }, [userData]);

  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProfileForm>({
    // defaultValues: userDataFlat,
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
    // values: userDataFlat,
    // resolver: zodResolver(ActiveValidationSchema),
  });



  const submitFormHandler = (data: ProfileForm) => {
    console.log("Data to insert", data);
    userEdit(data);
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
            <ProfilePhoto />
            {checkIfVisible(profileInputValues.firstName.scope) && (
              <InputField
                {...profileInputValues.firstName}
                {...register("firstName")}
                defaultValue={userDataFlat.firstName}
                control={control}
              />
            )}
            {checkIfVisible(profileInputValues.lastName.scope) && (
              <InputField
                {...profileInputValues.lastName}
                {...register("lastName")}
                defaultValue={userDataFlat.lastName}
                control={control}
              />
            )}
            {checkIfVisible(profileInputValues.companyName.scope) && (
              <InputField
                {...profileInputValues.companyName}
                {...register("companyName")}
                defaultValue={userDataFlat.companyName}
                control={control}
              />
            )}
            {checkIfVisible(profileInputValues.phone.scope) && (
              <InputField
                {...profileInputValues.phone}
                {...register("phone")}
                defaultValue={userDataFlat.phone}
                control={control}
              />
            )}
            {checkIfVisible(profileInputValues.city.scope) && (
              <InputField
                {...profileInputValues.city}
                {...register("city")}
                defaultValue={userDataFlat.city}
                control={control}
              />
            )}
            {checkIfVisible([UserType.CLIENT]) && (
              <RegionSelection
                {...register("district")}
                defaultValue={userDataFlat.district}
                control={control}
              />
            )}
            {checkIfVisible(profileInputValues.address.scope) && (
              <InputField
                {...profileInputValues.address}
                {...register("address")}
                defaultValue={userDataFlat.address}
                control={control}
              />
            )}
            {checkIfVisible([
              UserType.VENDOR_COMPANY,
              UserType.VENDOR_INDIVIDUAL,
            ]) && (
              <ProfileAbout
                {...register("about")}
                defaultValue={userDataFlat.about}
                control={control}
              />
            )}
            {checkIfVisible([
              UserType.VENDOR_COMPANY,
              UserType.VENDOR_INDIVIDUAL,
            ]) && (
              <ComboSelectBox
                defaultValue={userDataFlat.servedDistrict}
                // {...register("servedDistrict")}
                // control={control}
                setValue={setValue}
              />
            )}
            {checkIfVisible(profileInputValues.facebook.scope) && (
              <InputField
                {...profileInputValues.facebook}
                {...register("facebook")}
                defaultValue={userDataFlat.facebook}
                control={control}
              />
            )}
            {checkIfVisible(profileInputValues.instagram.scope) && (
              <InputField
                {...profileInputValues.instagram}
                {...register("instagram")}
                defaultValue={userDataFlat.instagram}
                control={control}
              />
            )}
            {checkIfVisible(profileInputValues.website.scope) && (
              <InputField
                {...profileInputValues.website}
                {...register("website")}
                defaultValue={userDataFlat.website}
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

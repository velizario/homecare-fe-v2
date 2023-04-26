import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateUserData } from "../../../../model/clientModel";
import { userState } from "../../../../store/userState";
import { District } from "../../../../types/types";
import CustomButton from "../../../../utilityComponents/CustomButton";
import InputField from "../../../../utilityComponents/InputField";
import { toasted } from "../../../../utilityComponents/Toast";
import ProfilePhoto from "./ProfilePhoto";
import RegionSelection from "./RegionSelection";

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
  phone: {
    className: "sm:col-span-3",
    name: "phone-number",
    id: "phone-number",
    label: "Телефонен номер*",
    autoComplete: "tel",
  },
  address: {
    className: "sm:col-span-3",
    name: "address",
    id: "address",
    label: "Адрес",
    autoComplete: "street-address",
  },
  city: {
    className: "sm:col-span-3",
    name: "city",
    id: "city",
    label: "Град",
  },
};

export type ProfileInputForm = {
  // id: string;
  firstName: string;
  lastName: string;
  phone: string;
  district: string;
  city: string;
  address: string;
};

let ValidationSchema = z.object({
  firstName: z
    .string({ required_error: "Required field" })
    .nonempty({ message: "Required field" })
    .min(2, { message: "Minimum allowed characters are 2" })
    .max(40, { message: "Maximum allowed characters are 40" }),
  lastName: z.string().nonempty({ message: "Required field" }).max(40, "Maximum allowed characters are 40"),
  phone: z.string().max(15, "Maximum allowed characters are 15").optional(),
  district: z.string().optional(),
  city: z.string().optional(),
  address: z.string().optional(),

  // email: z.string({ required_error: "Required field" }).email({ message: "Invalid email address" }),
  // password: z.string({ required_error: "Required field" }).min(8, "Password should be at least 8 characters long"),
  // passwordConfirm: z.string({ required_error: "Required field" }),
});

export default function ProfileClient() {
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

  const submitFormHandler = async (clientData: ProfileInputForm) => {
    const editedUser = await updateUserData(clientData);
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
                {...profileInputValues.phone}
                {...register("phone")}
                defaultValue={userData.phone}
                control={control}
              />
              <InputField
                {...profileInputValues.city}
                {...register("city")}
                defaultValue={userData.client.city}
                control={control}
              />
              <RegionSelection {...register("district")} defaultValue={userData.client.district} control={control} />
              <InputField
                {...profileInputValues.address}
                {...register("address")}
                defaultValue={userData.client.address}
                control={control}
              />
            </div>
            <div className="flex justify-end gap-4 pt-8">
              <CustomButton  category="primary">Запиши</CustomButton>
              <CustomButton category="secondary">Отмени</CustomButton>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

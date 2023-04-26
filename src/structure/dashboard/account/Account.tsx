import { Route, Routes } from "react-router-dom";
import TabsMenu from "../../../utilityComponents/TabsMenu";
import Profile from "./profile/ProfileClient";
import AccountSettings from "./settings/AccountSettings";
import Security from "./security/Security";
import { userState } from "../../../store/userState";
import ProfileVendor from "./profile/ProfileVendor";
import ProfileClient from "./profile/ProfileClient";

const tabs = [
  { id: 1, name: "Профил", href: "/dashboard/account/profile" },
  { id: 2, name: "Сигурност", href: "/dashboard/account/security" },
  { id: 3, name: "Нотификации", href: "/dashboard/account/settings" },
];

export default function Account() {

  const vendorId = userState(state => state.userData.vendorId);
  const isVendor = Boolean(vendorId);

  return (
    <>
      <div className='px-4 md:px-6 lg:px-8'>
        <TabsMenu tabs={tabs} defaultTab={"Профил"} />
      </div>
      <Routes>
        <Route path="/" element={isVendor ? <ProfileVendor /> : <ProfileClient/>} />
        <Route path="profile" element={isVendor ? <ProfileVendor /> : <ProfileClient/>} />
        <Route path="security" element={<Security />} />
        <Route path="settings" element={<AccountSettings />} />
      </Routes>
    </>
  );
}

import { Route, Routes } from "react-router-dom";
import { userState } from "../../../store/userState";
import TabsMenu from "../../../utilityComponents/TabsMenu";
import Profile from "./profile/Profile";
import RenderTest from "./RenderTest";
import Security from "./security/Security";
import AccountSettings from "./settings/AccountSettings";
import Services from "./services/Services"

const tabs = [
  { id: 1, name: "Профил", href: "/dashboard/account/profile" },
  { id: 2, name: "Сигурност", href: "/dashboard/account/security" },
  { id: 3, name: "Услуги", href: "/dashboard/account/services" },
  { id: 4, name: "Нотификации", href: "/dashboard/account/settings" },
];

export default function Account() {


  return (
    <>
      <TabsMenu tabs={tabs} defaultTab={"Профил"} />
      <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="profile" element={<Profile />} />
        <Route path="services" element={<Services />} />
        <Route path="security" element={<Security />} />
        <Route path="settings" element={<AccountSettings />} />
      </Routes>
    </>
  );
}

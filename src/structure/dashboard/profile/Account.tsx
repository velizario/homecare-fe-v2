import { Route, Routes } from "react-router-dom";
import TabsMenu from "../../../utilityComponents/TabsMenu";
import ProfileSettingsContent from "./account/Profile";
import Security from "./security/Security";
import Settings from "./settings/Settings";

const tabs = [
  { id: 1, name: "Профил", href: "#/dashboard/account/profile" },
  { id: 2, name: "Сигурност", href: "#/dashboard/account/security" },
  { id: 3, name: "Настройки", href: "#/dashboard/account/settings" },
];

export default function Account() {
  return (
    <>
      <div className='px-4 md:px-6 lg:px-8'>
        <TabsMenu tabs={tabs} defaultTab={"Профил"} />
      </div>
      <Routes>
        <Route path="/" element={<ProfileSettingsContent />} />
        <Route path="profile" element={<ProfileSettingsContent />} />
        <Route path="security" element={<Security />} />
        <Route path="settings" element={<Settings />} />
      </Routes>
    </>
  );
}

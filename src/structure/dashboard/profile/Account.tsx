import { Route, Routes } from "react-router-dom";
import TabsMenu from "../../../utilityComponents/TabsMenu";
import ProfileSettingsContent from "./ProfileSettingsContent";

const tabs = [
  { id: 1, name: "Профил", href: "#/dashboard/account/profile" },
  { id: 2, name: "Сигурност", href: "#/dashboard/profile/profile" },
  { id: 3, name: "Нотификации", href: "#/dashboard/profile" },
];

export default function Account() {
  return (
    <>
      <div className='px-4 md:px-6 lg:px-8'>
        <TabsMenu tabs={tabs} defaultTab={"Профил"} />
      </div>
      <Routes>
        <Route path="profile" element={<ProfileSettingsContent />} />
        <Route path="/" element={<ProfileSettingsContent />} />
      </Routes>
    </>
  );
}

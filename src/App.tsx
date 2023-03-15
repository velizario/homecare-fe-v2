import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { userDataRefresh } from "./model/userModel";
import { userState } from "./store/userState";
import About from "./structure/about/About";
import VendorCard from "./structure/cards/VendorCard";
import VendorCardFull from "./structure/cards/VendorCardFull";
import Contact from "./structure/contact/Contact";
import Dashboard from "./structure/dashboard/Dashboard";
import PageNotFound from "./structure/defaultRoutePage/PageNotFound";
import Header from "./structure/header/Header";
import HomePage from "./structure/homepage/HomePage";
import SignIn from "./structure/login/SignIn";
import Register from "./structure/register/Register";
import SearchOrderWizard from "./structure/searchOrders/SearchOrderWizard";
import VendorList from "./structure/searchOrders/VendorList";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userLoggedIn, setUserData] = userState((state) => [state.userData, state.setUserData]);

  // do I need to refresh user? How is data lost? Added only for development purposes
  const refreshUser = async () => {
    const user = await userDataRefresh();
    if (user) {
      setUserData(user)
    }
  }


  useEffect(() => {
    refreshUser()
  },[])

  return (
    <BrowserRouter>
      <Header setSidebarOpen={setSidebarOpen} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route index element={<HomePage />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="register" element={<Register />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="dashboard/*" element={<Dashboard />} />
        <Route path="search-wizard/*" element={<SearchOrderWizard />} />
        <Route path="vendor-card-full/*" element={<VendorCardFull />} />
        <Route path="vendor-card/*" element={<VendorCard />} />
        <Route path="vendor-list/*" element={<VendorList />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

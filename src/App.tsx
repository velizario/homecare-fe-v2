import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { userDataRefresh } from "./model/clientModel";
import { fetchServices } from "./model/essentialsModel";
import About from "./structure/about/About";
import VendorCard from "./structure/cards/VendorCard";
import VendorCardFull from "./structure/cards/VendorCardFull";
import Contact from "./structure/contact/Contact";
import Dashboard from "./structure/dashboard/Dashboard";
import PageNotFound from "./structure/defaultRoutePage/PageNotFound";
import Footer from "./structure/footer/Footer";
import Header from "./structure/header/Header";
import HomePage from "./structure/homepage/HomePage";
import SignIn from "./structure/login/SignIn";
import Register from "./structure/register/Register";
import VendorList from "./structure/searchOrders/VendorList";
import Toaster from "./utilityComponents/Toast";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // do I need to refresh user? How is data lost? Added only for development purposes
  const refreshUser = async () => {
    const user = await userDataRefresh();

  }

  const getServices = async () => {
    const services = await fetchServices()
  }

  useEffect(() => {
    refreshUser()
    getServices();
  },[])

  return (
    <BrowserRouter>
      <Toaster />
      <Header setSidebarOpen={setSidebarOpen} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route index element={<HomePage />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="register" element={<Register />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="dashboard/*" element={<Dashboard />} />
        <Route path="vendor-card-full/*" element={<VendorCardFull vendorId="1" />} />
        <Route path="vendor-card/*" element={<VendorCard />} />
        <Route path="vendor-list/*" element={<VendorList />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;

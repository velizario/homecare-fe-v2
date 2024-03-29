import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { fetchUserState } from "./model/clientModel";
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
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // default: true
      },
    },
  });

  // do I need to refresh user? How is data lost? Added only for development purposes
  useEffect(() => {
    fetchUserState();
  }, []);

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
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
          <Route path="vendor-card/:id" element={<VendorCardFull />} />
          <Route path="vendor-list/*" element={<VendorList />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        {/* <Footer /> */}
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;

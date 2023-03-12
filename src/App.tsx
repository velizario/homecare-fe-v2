import { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import { userState } from './store/userState';
import About from './structure/about/About';
import VendorCard from './structure/cards/VendorCard';
import VendorCardFull from './structure/cards/VendorCardFull';
import Contact from './structure/contact/Contact';
import Dashboard from './structure/dashboard/Dashboard';
import PageNotFound from './structure/defaultRoutePage/PageNotFound';
import Header from './structure/header/Header';
import HomePage from './structure/homepage/HomePage';
import SignIn from './structure/login/SignIn';
import Register from './structure/register/Register';
import SearchOrderWizard from './structure/searchOrders/SearchOrderWizard';
import VendorList from './structure/searchOrders/VendorList';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isLoggedIn = userState(state => state.isLoggedIn)

  // TODO: do something with this var

  console.log(isLoggedIn);

  return (
    <BrowserRouter>
      <Header setSidebarOpen={setSidebarOpen}/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route index element={<HomePage />} />
        <Route path='signin' element={<SignIn/>} />
        <Route path='register' element={<Register/>} />
        <Route path='about' element={<About/>} />
        <Route path='contact' element={<Contact/>} />
        <Route path='dashboard/*' element={<Dashboard/>} />
        <Route path='search-wizard/*' element={<SearchOrderWizard/>} />
        <Route path='vendor-card-full/*' element={<VendorCardFull/>} />
        <Route path='vendor-card/*' element={<VendorCard/>} />
        <Route path='vendor-list/*' element={<VendorList/>} />
        <Route path='*' element={<PageNotFound/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

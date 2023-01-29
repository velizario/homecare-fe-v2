import './App.css'
import { Routes, Route, HashRouter } from "react-router-dom";
import HomePage from './structure/homepage/HomePage';
import About from './structure/about/About';
import Contact from './structure/contact/Contact';
import Dashboard from './structure/dashboard/Dashboard';
import PageNotFound from './structure/defaultRoutePage/PageNotFound';
import SearchOrderWizard from './structure/searchOrders/SearchOrderWizard';
import VendorCardFull from './structure/cards/VendorCardFull';
import VendorCard from './structure/cards/VendorCard';
import VendorList from './structure/searchOrders/VendorList';
import Header from './structure/header/Header';
import { useState } from 'react';
import SignIn from './structure/login/SignIn';
import CreateOrder from './structure/searchOrders/CreateOrder';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <HashRouter>
      <Header setSidebarOpen={setSidebarOpen}/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route index element={<HomePage />} />
        <Route path='signin' element={<SignIn/>} />
        <Route path='about' element={<About/>} />
        <Route path='contact' element={<Contact/>} />
        <Route path='dashboard/*' element={<Dashboard/>} />
        <Route path='create-order/*' element={<CreateOrder/>} />
        <Route path='search-wizard/*' element={<SearchOrderWizard/>} />
        <Route path='vendor-card-full/*' element={<VendorCardFull/>} />
        <Route path='vendor-card/*' element={<VendorCard/>} />
        <Route path='vendor-list/*' element={<VendorList/>} />
        <Route path='*' element={<PageNotFound/>} />
      </Routes>
    </HashRouter>
  )
}

export default App

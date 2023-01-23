import './App.css'
import { Routes, Route, HashRouter } from "react-router-dom";
import HomePage from './structure/homepage/HomePage';
import About from './structure/about/About';
import Contact from './structure/contact/Contact';
import Dashboard from './structure/dashboard/Dashboard';
import PageNotFound from './structure/defaultRoutePage/PageNotFound';
import SearchOrderWizard from './structure/orderManagement/SearchOrderWizard';
import VendorCard from './structure/cards/VendorCard';
import VendorCardBrief from './structure/cards/VendorCardBrief';

function App() {

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route index element={<HomePage />} />
        <Route path='about' element={<About/>} />
        <Route path='about' element={<Contact/>} />
        <Route path='dashboard/*' element={<Dashboard/>} />
        <Route path='create-order/*' element={<SearchOrderWizard/>} />
        <Route path='card-vendor/*' element={<VendorCard/>} />
        <Route path='card-vendor-brief/*' element={<VendorCardBrief/>} />
        <Route path='*' element={<PageNotFound/>} />
      </Routes>
    </HashRouter>
  )
}

export default App




// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import CustomNavbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import Home from "./pages/Home";
// import About from "./pages/About";
// import Services from "./pages/services/Services";
// import ServiceCategory from "./pages/services/ServiceCategory";
// import ServicePage from "./pages/services/ServicePage";
// import WebDevelopment from "./pages/WebDevelopment";
// import DigitalMarketing from "./pages/DigitalMarketing";
// import TermsAndConditions from "./pages/terms-and-conditions";
// import PrivacyPolicy from "./pages/privacy-policy";
// import RefundPolicy from "./pages/refund-policy";
// import News from "./pages/News";
// import Blog from "./pages/Blog";
// import Gallery from "./pages/Gallery";
// import Contact from "./pages/Contact";
// import SocialSidebar from "./components/SocialSidebar";
// import ScrollToTop from "./components/ScrollToTop";

// // PR Visa Subclasses
// import Subclass189 from "./pages/services/immigration/pr-visa/Subclass189";
// // import Subclass190 from "./pages/services/immigration/pr-visa/Subclass190";
// // import Subclass491 from "./pages/services/immigration/pr-visa/Subclass491";

// // Visit Visa Subclasses
// // import Subclass600 from "./pages/services/immigration/visit-visa/Subclass600";

// // // Partner Visa Subclasses
// // import Subclass309 from "./pages/services/immigration/partner-visa/Subclass309";
// // import Subclass820 from "./pages/services/immigration/partner-visa/Subclass820";

// // Employer Sponsored Visa Subclasses
// // import Subclass482 from "./pages/services/immigration/employer-sponsored-visa/Subclass482";
// // import Subclass186 from "./pages/services/immigration/employer-sponsored-visa/Subclass186";

// function App() {
//   return (
//     <Router>
//        <ScrollToTop />
//       <CustomNavbar />
//       <div style={{ marginTop: "80px", padding: "20px" }}>
    
       
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/services" element={<Services />} />
//           <Route path="/services/immigration" element={<ServiceCategory type="immigration" />} />
//           <Route path="/services/education" element={<ServiceCategory type="education" />} />
//           <Route path="/services/training" element={<ServiceCategory type="training" />} />

//           <Route path="/services/immigration/:slug" element={<ServicePage />} />
//           <Route path="/services/education/:slug" element={<ServicePage />} />
//           <Route path="/services/training/:slug" element={<ServicePage />} />
//  {/* New visa subclass routes */}
//   {/* <Route path="/services/immigration/subclass-189" element={<ServicePage />} />
//   <Route path="/services/immigration/subclass-190" element={<ServicePage />} />
//   <Route path="/services/immigration/subclass-491" element={<ServicePage />} />
//   <Route path="/services/immigration/subclass-600" element={<ServicePage />} />
//   <Route path="/services/immigration/subclass-820" element={<ServicePage />} />
//   <Route path="/services/immigration/subclass-309" element={<ServicePage />} />
//   <Route path="/services/immigration/subclass-482" element={<ServicePage />} />
//   <Route path="/services/immigration/subclass-186" element={<ServicePage />} />
//   <Route path="/services/immigration/partner-visa" element={<ServicePage />} />
//   <Route path="/services/immigration/employer-sponsored-visa" element={<ServicePage />} />  */}
//           <Route path="/services/web-development" element={<WebDevelopment />} />
//           <Route path="/services/digital-marketing" element={<DigitalMarketing />} />
//           <Route path="/news" element={<News />} />
//           <Route path="/blog" element={<Blog />} />
//           <Route path="/gallery" element={<Gallery />} />
//           <Route path="/contact" element={<Contact />} />

//           <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
//           <Route path="/privacy-policy" element={<PrivacyPolicy />} />
//           <Route path="/refund-policy" element={<RefundPolicy />} />
  

//    {/* PR Visa Subclasses */}
//           <Route path="/services/immigration/pr-visa/subclass-189" element={<Subclass189 />} />
//           {/* <Route path="/services/immigration/pr-visa/subclass-190" element={<Subclass190 />} />
//           <Route path="/services/immigration/pr-visa/subclass-491" element={<Subclass491 />} /> */}

//           {/* Visit Visa Subclasses */}
//           {/* <Route path="/services/immigration/visit-visa/subclass-600" element={<Subclass600 />} /> */}

//           {/* Partner Visa Subclasses */}
//           {/* <Route path="/services/immigration/partner-visa/subclass-309" element={<Subclass309 />} />
//           <Route path="/services/immigration/partner-visa/subclass-820" element={<Subclass820 />} /> */}

//           {/* Employer Sponsored Visa Subclasses
//           <Route path="/services/immigration/employer-sponsored-visa/subclass-482" element={<Subclass482 />} />
//           <Route path="/services/immigration/employer-sponsored-visa/subclass-186" element={<Subclass186 />} /> */}
//         </Routes>
//       </div>
//       <Footer />
//         <SocialSidebar />
//     </Router>
//   );
// }

// export default App;


// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import CustomNavbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import Home from "./pages/Home";
// import About from "./pages/About";
// import Services from "./pages/services/Services";
// import ServiceCategory from "./pages/services/ServiceCategory";
// import ServicePage from "./pages/services/ServicePage";
// import WebDevelopment from "./pages/WebDevelopment";
// import DigitalMarketing from "./pages/DigitalMarketing";
// import TermsAndConditions from "./pages/terms-and-conditions";
// import PrivacyPolicy from "./pages/privacy-policy";
// import RefundPolicy from "./pages/refund-policy";
// import News from "./pages/News";
// import Blog from "./pages/Blog";
// import Gallery from "./pages/Gallery";
// import Contact from "./pages/Contact";
// import SocialSidebar from "./components/SocialSidebar";
// import ScrollToTop from "./components/ScrollToTop";
// import TrainingPage from "./pages/services/TrainingPage"; 

// function App() {
//   return (
//     <Router>
//       <ScrollToTop />
//       <CustomNavbar />
//       <div style={{ marginTop: "80px", padding: "20px" }}>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/contact" element={<Contact />} />
          
//           {/* Services Routes */}
//           <Route path="/services" element={<Services />} />
          
//           {/* Main Service Categories */}
//           <Route path="/services/immigration" element={<ServiceCategory type="immigration" />} />
//           <Route path="/services/education" element={<ServiceCategory type="education" />} />
//           {/* <Route path="/services/training" element={<ServiceCategory type="training" />} /> */}
// <Route path="/services/training" element={<TrainingPage />} />
//           {/* Nested Immigration Service Routes */}
//           <Route path="/services/immigration/pr-visa/:slug" element={<ServicePage />} />
//           <Route path="/services/immigration/visit-visa/:slug" element={<ServicePage />} />
//           <Route path="/services/immigration/business-visa/:slug" element={<ServicePage />} />
//           <Route path="/services/immigration/partner-visa/:slug" element={<ServicePage />} />
//           <Route path="/services/immigration/employer-sponsored-visa/:slug" element={<ServicePage />} />
          
//           {/* Education Service Routes - FIXED */}
//           <Route path="/services/education/student-visa" element={<ServicePage />} />
          
//           {/* Training Service Routes - FIXED */}
//           <Route path="/services/training/ielts-coaching" element={<ServicePage />} />
//           <Route path="/services/training/pte-coaching" element={<ServicePage />} />
//           <Route path="/services/training/sat-coaching" element={<ServicePage />} />

//           {/* Generic catch-all route for any service */}
//           <Route path="/services/:type/:slug" element={<ServicePage />} />

//           {/* Other routes */}
//           <Route path="/services/web-development" element={<WebDevelopment />} />
//           <Route path="/services/digital-marketing" element={<DigitalMarketing />} />
//           <Route path="/news" element={<News />} />
//           <Route path="/blog" element={<Blog />} />
//           <Route path="/gallery" element={<Gallery />} />

//           <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
//           <Route path="/privacy-policy" element={<PrivacyPolicy />} />
//           <Route path="/refund-policy" element={<RefundPolicy />} />
//         </Routes>
//       </div>
//       <Footer />
//       <SocialSidebar />
//     </Router>
//   );
// }

// export default App;



// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import CustomNavbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import Home from "./pages/Home";
// import About from "./pages/About";
// import Services from "./pages/services/Services";
// import ServiceCategory from "./pages/services/ServiceCategory";
// import ServicePage from "./pages/services/ServicePage";
// import WebDevelopment from "./pages/WebDevelopment";
// import DigitalMarketing from "./pages/DigitalMarketing";
// import TermsAndConditions from "./pages/terms-and-conditions";
// import PrivacyPolicy from "./pages/privacy-policy";
// import RefundPolicy from "./pages/refund-policy";
// import News from "./pages/News";
// import Blog from "./pages/Blog";
// import Gallery from "./pages/Gallery";
// import Contact from "./pages/Contact";
// import SocialSidebar from "./components/SocialSidebar";
// import ScrollToTop from "./components/ScrollToTop";
// import TrainingPage from "./pages/services/TrainingPage"; 

// function App() {
//   return (
//     <Router>
//       <ScrollToTop />
//       <CustomNavbar />
//       <div style={{ marginTop: "80px", padding: "20px" }}>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/contact" element={<Contact />} />
          
//           {/* Services Routes */}
//           <Route path="/services" element={<Services />} />
          
//           {/* Main Service Categories */}
//           <Route path="/services/immigration" element={<ServiceCategory type="immigration" />} />
//           <Route path="/services/education" element={<ServiceCategory type="education" />} />
//           <Route path="/services/training" element={<TrainingPage />} />
          
//           {/* Nested Immigration Service Routes */}
//           <Route path="/services/immigration/pr-visa/:slug" element={<ServicePage />} />
//           <Route path="/services/immigration/visit-visa/:slug" element={<ServicePage />} />
//           <Route path="/services/immigration/business-visa/:slug" element={<ServicePage />} />
//           <Route path="/services/immigration/partner-visa/:slug" element={<ServicePage />} />
//           <Route path="/services/immigration/employer-sponsored-visa/:slug" element={<ServicePage />} />
          
//           {/* Education Service Routes - FIXED */}
//           <Route path="/services/education/student-visa" element={<ServicePage />} />
          
//           {/* Training Service Routes - FIXED */}
//           <Route path="/services/training/ielts-coaching" element={<ServicePage />} />
//           <Route path="/services/training/pte-coaching" element={<ServicePage />} />
//           <Route path="/services/training/sat-coaching" element={<ServicePage />} />
//           {/* New Training Routes */}
//           <Route path="/services/training/gmat-coaching" element={<ServicePage />} />
//           <Route path="/services/training/gre-coaching" element={<ServicePage />} />
//           <Route path="/services/training/language-certification" element={<ServicePage />} />
//           <Route path="/services/training/duolingo-coaching" element={<ServicePage />} />
//           <Route path="/services/training/toefl-coaching" element={<ServicePage />} />

//           {/* Generic catch-all route for any service */}
//           <Route path="/services/:type/:slug" element={<ServicePage />} />

//           {/* Other routes */}
//           <Route path="/services/web-development" element={<WebDevelopment />} />
//           <Route path="/services/digital-marketing" element={<DigitalMarketing />} />
//           <Route path="/news" element={<News />} />
//           <Route path="/blog" element={<Blog />} />
//           <Route path="/gallery" element={<Gallery />} />

//           <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
//           <Route path="/privacy-policy" element={<PrivacyPolicy />} />
//           <Route path="/refund-policy" element={<RefundPolicy />} />
//         </Routes>
//       </div>
//       <Footer />
//       <SocialSidebar />
//     </Router>
//   );
// }

// export default App;

import QRCodeLanding from "./pages/QRCodeLanding";
import {HashRouter as Router, Routes, Route } from "react-router-dom";
import CustomNavbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/services/Services";
import ServiceCategory from "./pages/services/ServiceCategory";
import ServicePage from "./pages/services/ServicePage";
import WebDevelopment from "./pages/WebDevelopment";
import DigitalMarketing from "./pages/DigitalMarketing";
import TermsAndConditions from "./pages/terms-and-conditions";
import PrivacyPolicy from "./pages/privacy-policy";
import RefundPolicy from "./pages/refund-policy";
import News from "./pages/News";
import Blog from "./pages/Blog";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import SocialSidebar from "./components/SocialSidebar";
import ScrollToTop from "./components/ScrollToTop";
import TrainingPage from "./pages/services/TrainingPage"; 
import DemoPage from "./pages/DemoPage";
function App() {
  return (
    <Router>
      <ScrollToTop />
      <CustomNavbar />
      <div style={{ marginTop: "80px", padding: "20px" }}>
        <Routes>
         
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/demo" element={<DemoPage />} />
          {/* Services Routes */}
          <Route path="/services" element={<Services />} />
          
          {/* Main Service Categories */}
          <Route path="/services/immigration" element={<ServiceCategory type="immigration" />} />
          <Route path="/services/education" element={<ServiceCategory type="education" />} />
          <Route path="/services/training" element={<TrainingPage />} />
          
          {/* Nested Immigration Service Routes */}
          <Route path="/services/immigration/pr-visa/:slug" element={<ServicePage />} />
          <Route path="/services/immigration/visit-visa/:slug" element={<ServicePage />} />
          <Route path="/services/immigration/business-visa/:slug" element={<ServicePage />} />
          <Route path="/services/immigration/partner-visa/:slug" element={<ServicePage />} />
          <Route path="/services/immigration/employer-sponsored-visa/:slug" element={<ServicePage />} />
          
          {/* Education Service Routes - FIXED */}
          <Route path="/services/education/:slug" element={<ServicePage />} />
          
          {/* Training Service Routes - Use parameter for all training services */}
          <Route path="/services/training/:slug" element={<ServicePage />} />

          {/* Generic catch-all route for any service */}
          <Route path="/services/:type/:slug" element={<ServicePage />} />

          {/* Other routes */}
          <Route path="/services/web-development" element={<WebDevelopment />} />
          <Route path="/services/digital-marketing" element={<DigitalMarketing />} />
          <Route path="/news" element={<News />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/gallery" element={<Gallery />} />
<Route path="/qr-training" element={<QRCodeLanding />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
        </Routes>
      </div>
      <Footer />
      <SocialSidebar />
    </Router>
  );
}


export default App;


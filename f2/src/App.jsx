
// // export default App;
// import ApplyForDiplomaCourses from "./pages/services/ApplyForDiplomaCourses";
// import QRCodeLanding from "./pages/QRCodeLanding";
// import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
// import DemoPage from "./pages/DemoPage";

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
//           <Route path="/demo" element={<DemoPage />} />
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
//           <Route path="/services/education/:slug" element={<ServicePage />} />
          
//           {/* Training Service Routes - Use parameter for all training services */}
//           <Route path="/services/training/:slug" element={<ServicePage />} />

//           {/* Generic catch-all route for any service */}
//           <Route path="/services/:type/:slug" element={<ServicePage />} />

//           {/* Other routes */}
//           <Route path="/services/web-development" element={<WebDevelopment />} />
//           <Route path="/services/digital-marketing" element={<DigitalMarketing />} />
//           <Route path="/news" element={<News />} />
//           <Route path="/blog" element={<Blog />} />
//           <Route path="/gallery" element={<Gallery />} />
// <Route path="/qr-training" element={<QRCodeLanding />} />
//           <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
//           <Route path="/privacy-policy" element={<PrivacyPolicy />} />
//           <Route path="/refund-policy" element={<RefundPolicy />} />
//           <Route path="/services/applyfordiplomacourses" element={<ApplyForDiplomaCourses />} />
//         </Routes>
//       </div>
//       <Footer />
//       <SocialSidebar />
//     </Router>
//   );
// }


// export default App;

import ApplyForDiplomaCourses from "./pages/services/ApplyForDiplomaCourses";
import QRCodeLanding from "./pages/QRCodeLanding";
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
      <Routes>
        {/* Diploma Courses Route - No Navbar/Footer */}
        <Route path="/services/apply-for-diploma-courses" element={<ApplyForDiplomaCourses />} />
        
        {/* All other routes with Navbar/Footer */}
        <Route path="*" element={
          <>
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
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;
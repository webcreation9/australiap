// // src/pages/ContactUs.jsx
// import React, { useEffect,useRef , useState } from "react";
// import { Container, Row, Col, Form, Button ,Image} from "react-bootstrap";
// import "./Contact.css";
// import { InputGroup } from "react-bootstrap";
// import { FaPhoneAlt } from "react-icons/fa";
// import { FaEnvelope } from "react-icons/fa"; 

// // import { FaMapMarkerAlt , FaPhoneAlt} from "react-icons/fa";
// import { FaMapMarkerAlt} from "react-icons/fa";
// import worldImage from "../assets/worldImage.png"

// import emailjs from "emailjs-com";


// const Contact = () => {
//    const headingRef = useRef(null);
//     const [isVisible, setIsVisible] = useState(false);

//       const [formData, setFormData] = useState({
//     name: "",
//     mobile: "",
//     email: "",
//     lookingFor: "",
//     country: "",
//     message: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   const handleSubmit = (e) => {

//     e.preventDefault();
//   emailjs.send(
//     "service_lqd41id",
//     "template_b1c0jjh",
//     formData,
//     "79LQI8JDkLu8knDCx"
//   ).then(() => {
//     alert("Email sent successfully!");
//   }).catch((err) => console.log(err));

// //     e.preventDefault();

// //     const phoneNumber = "919553537818"; // 👉 Your WhatsApp number (with country code)
// //     const text = `
// // *New Contact Form Submission*
// // Name: ${formData.name}
// // Mobile: ${formData.mobile}
// // Email: ${formData.email}
// // Looking For: ${formData.lookingFor}
// // Country: ${formData.country}
// // Message: ${formData.message}
// //     `;

// //     const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
// //     window.open(url, "_blank"); // Opens WhatsApp
//   };

  
//     useEffect(() => {
//       const observer = new IntersectionObserver(
//         ([entry]) => setIsVisible(entry.isIntersecting),
//         { threshold: 0.5 }
//       );
  
//       if (headingRef.current) {
//         observer.observe(headingRef.current);
//       }
  
//       return () => {
//         if (headingRef.current) {
//           observer.unobserve(headingRef.current);
//         }
//       };
//     }, []);
//   return (
//     <div className="contact-page">
//       <header className="contact-header text-center">
//         <h1 className="header-title">Contact Us</h1>
//         <div className="header-subtitle">One Step Away From Expert Assistance</div>
//       </header>

//       <Container className="contact-main">
//         <Row className="gx-5 gy-5">
//           <Col lg={6}>
//             {/* <iframe
//               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.9537353159043!3d-37.81720997975171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f1f1f1f1%3AXCEL%20GLOBAL%20SERVICES!2sXCEL%20GLOBAL%20SERVICES!5e0!3m2!1sen!2sau!4v1687870000000!5m2!1sen!2sau"
//               width="100%"
//               height="400"
//               style={{ border: 0, borderRadius: "8px" }}
//               allowFullScreen=""
//               loading="lazy"
//               referrerPolicy="no-referrer-when-downgrade"
//               title="Map showing location of XCEL GLOBAL SERVICES"
//             ></iframe> */}
//              {/* <iframe
//               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12909831.308243861!2d135.2945643397396!3d-37.8178188!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad643baf09c7db5%3A0x870a1ecfde50d5fd!2sXcel%20Global%20Services!5e0!3m2!1sen!2sin!4v1751268144885!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"
//               width="100%"
//               height="400"
//               style={{ border: 0, borderRadius: "8px" }}
//               allowFullScreen=""
//               loading="lazy"
//               referrerPolicy="no-referrer-when-downgrade"
//               title="Map showing location of XCEL GLOBAL SERVICES"
//             ></iframe> */}
// <iframe
//   src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12909831.308243861!2d135.2945643397396!3d-37.8178188!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad643baf09c7db5%3A0x870a1ecfde50d5fd!2sXcel%20Global%20Services!5e0!3m2!1sen!2sin!4v1751268144885!5m2!1sen!2sin"
//   width="100%"             // ✅ only once
//   height="400"             // ✅ only once
//   style={{ border: 0, borderRadius: "8px" }}  // ✅ only JSX style
//   allowFullScreen          // ✅ camelCase
//   loading="lazy"
//   referrerPolicy="no-referrer-when-downgrade"
//   title="Map showing location of XCEL GLOBAL SERVICES"
// />





//           </Col>

//         <Col lg={6}>
//             <h2 className="form-title text-danger">Contact Us</h2>
//             <p className="form-subtext text-muted">
//               Our friendly team would love to hear from you
//             </p>
//             <div style={{ width: "100%", height: "100vh" }}>
//           <iframe
//             title="forms-app-form"
//             src="https://gey4w1lt.forms.app/register-free-consultation-1"
//             width="100%"
//             height="100%"
//             frameBorder="0"
//             allowFullScreen
//           ></iframe>
//         </div>
//             {/* <Form onSubmit={handleSubmit} className="contact-form">
//       <Form.Group controlId="name">
//         <Form.Label>Name</Form.Label>
//         <Form.Control type="text" value={formData.name} onChange={handleChange} />
//       </Form.Group>

//       <Form.Group controlId="mobile">
//         <Form.Label>Mobile</Form.Label>
//         <InputGroup>
//           <Form.Control type="tel" value={formData.mobile} onChange={handleChange} />
//           <InputGroup.Text><FaPhoneAlt /></InputGroup.Text>
//         </InputGroup>
//       </Form.Group>

//       <Form.Group controlId="email">
//         <Form.Label>Email</Form.Label>
//         <InputGroup>
//           <Form.Control type="email" value={formData.email} onChange={handleChange} />
//           <InputGroup.Text><FaEnvelope /></InputGroup.Text>
//         </InputGroup>
//       </Form.Group>

//       <Form.Group controlId="lookingFor">
//         <Form.Label>Looking For</Form.Label>
//         <Form.Control as="select" value={formData.lookingFor} onChange={handleChange}>
//           <option value="">Select</option>
//           <option>PR Visa</option>
//           <option>Business Visa</option>
//           <option>Visiting Visa</option>
//           <option>Student Visa</option>
//         </Form.Control>
//       </Form.Group>

//       <Form.Group controlId="country">
//         <Form.Label>Country Interested</Form.Label>
//         <Form.Control as="select" value={formData.country} onChange={handleChange}>
//           <option value="">Select</option>
//           <option>USA</option>
//           <option>UK</option>
//           <option>Australia</option>
//           <option>Canada</option>
//         </Form.Control>
//       </Form.Group>

//       <Form.Group controlId="message">
//         <Form.Label>Message</Form.Label>
//         <Form.Control as="textarea" rows={3} value={formData.message} onChange={handleChange} />
//       </Form.Group>

//       <Button type="submit" className="mt-3 w-100">Send Mail</Button>
//     </Form> */}
//   </Col>


//             {/* ---------------------------------------------------------- */}
//             <div className="global-container bg-white text-black">
//       <Container className="py-5">
//         {/* Addresses Section */}
//         <Row className="pb-4 border-bottom border-dark flex-column flex-md-row justify-content-center gap-5">
//           <Col md={5} className="d-flex flex-column gap-4">
//             <div>
//               <p className="text-primary fw-semibold d-flex align-items-center gap-2">
//                 <FaMapMarkerAlt className="text-danger" /> Head Office Address: Melbourne
//               </p>
//               <p className="ms-4">
//                 Level 7/276 Flinders St, Melbourne VIC 3000 Australia
//               </p>
//             </div>
//             <div>
//               <p className="text-primary fw-semibold d-flex align-items-center gap-2">
//                 <FaMapMarkerAlt className="text-danger" /> Address: Adelaide
//               </p>
//               <p className="ms-4">Level 6, Pirie Street, Adelaide</p>
//             </div>
//           </Col>

//           {/* <div className="vr custom-divider d-none d-md-block" ></div> */}
//           {/* <div className="vr custom-divider d-none d-md-block"></div> */}
//           <Col md="auto" className="d-flex justify-content-center">
//   <div className="custom-vertical-line"></div>
// </Col>



//           <Col md={5} className="d-flex flex-column gap-4">
//             <div>
//               <p className="text-primary fw-semibold d-flex align-items-center gap-2">
//                 <FaMapMarkerAlt className="text-danger" /> Address: Sydney
//               </p>
//               <p className="ms-4">26/44 Market St, Sydney NSW 2000, Australia</p>
//             </div>
//             {/* <div>
//               <p className="text-primary fw-semibold d-flex align-items-center gap-2">
//                 <FaMapMarkerAlt className="text-danger" /> Address: Perth
//               </p>
//               <p className="ms-4">
//                 Level 7/276 Flinders St, Melbourne VIC 3000 Australia
//               </p>
//             </div> */}
//           </Col>
//         </Row>

//         {/* Contact Icons */}
//         <Row className="text-center justify-content-center gap-5 mt-5">
//           {/* <Col xs={12} sm={5} md={3} className="d-flex flex-column align-items-center gap-2">
//             <div className="icon-circle bg-danger">
//               <FaEnvelope className="text-white fs-5" />
//             </div>
//             <p className="mb-0">migration@xcelgs.com</p>
//           </Col> */}

//           <Col xs={12} sm={5} md={3} className="d-flex flex-column align-items-center gap-2">
//   <div className="icon-circle bg-danger">
//     <FaEnvelope className="text-white fs-5" />
//   </div>
//   <a href="mailto:migration@xcelgs.com" className="text-decoration-none text-dark">
//     migration@xcelgs.com
//   </a>
// </Col>
// {/* 
//           <Col xs={12} sm={5} md={3} className="d-flex flex-column align-items-center gap-2">
            
//             <div className="icon-circle" style={{ background: "green", padding: "10px"   }}>
//   <FaPhoneAlt style={{ color: "white", fontSize: "24px" }} />
// </div>

//             <p className="mb-0">1800 959 619</p>
//           </Col> */}
//          <Col xs={12} sm={5} md={3} className="d-flex flex-column align-items-center gap-2">
//   <div className="icon-circle" style={{ background: "green", padding: "10px" }}>
//     <FaPhoneAlt style={{ color: "white", fontSize: "24px" }} />
//   </div>

//   <a href="tel:1800959619" className="text-decoration-none text-dark">
//     1800 959 619
//   </a>
// </Col>


//         </Row>
//         </Container>
//         </div>

//           {/* ------------------------------------------------------------- */}
//  {/* <div className="text-center my-5">
//          {/* <h2 className="global-heading ">
//            Our Global Presence
//          </h2> *}
//           <div className="text-center my-0 py-0">
//          <h2
//            ref={headingRef}
//            className={`global-heading ${isVisible ? "animate" : ""}`}
//          >
//            Our Global Presence
//          </h2>
//        </div>
//        </div>
   
//         <Container fluid className="p-0 m-0">
//          <Image
//            src={worldImage}
//            alt="Responsive Image"
//            fluid
//            className="full-width-image"
//              // className={`full-width-image ${inView ? "animate-up" : ""}`}
            
//          />
//        </Container> */}
   








//           {/* ------------------------------------------------------ */}
        
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default Contact;
// src/pages/ContactUs.jsx
import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Form, Button, Image, Modal } from "react-bootstrap";
import "./Contact.css";
import { InputGroup } from "react-bootstrap";
import { FaPhoneAlt, FaEnvelope, FaCalendarAlt } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import worldImage from "../assets/worldImage.png";

const Contact = () => {
  const headingRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // Form states (copied from Home.jsx)
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const [loading, setLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    lookingFor: "",
    country: "",
    comments: "",
    scheduleDate: "",
    scheduleTime: ""
  });

  // Time slots for scheduling
  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", 
    "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", 
    "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
    "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
    "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM"
  ];

  // Get tomorrow's date for min date
  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  // Handle form submission (copied from Home.jsx)
  const handleSend = async (type) => {
    if (!formData.name || !formData.mobile || !formData.email || !formData.lookingFor || !formData.country) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);

    try {
      // Save to MongoDB and Excel
      const submitResponse = await fetch(`${API_URL}/api/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          pageUrl: window.location.href,
        }),
      });

      const submitResult = await submitResponse.json();

      if (!submitResponse.ok) {
        throw new Error(submitResult.error);
      }

      if (type === "email") {
        // Send email
        const emailResponse = await fetch(`${API_URL}/api/send-email/${submitResult.id}`);
        const emailResult = await emailResponse.json();
        
        if (!emailResponse.ok) {
          throw new Error(emailResult.error);
        }
        
        alert("✅ Form submitted and email sent successfully!");
      } else if (type === "whatsapp") {
        // Send WhatsApp message
        const message = `New Consultation Request:%0A%0AName: ${formData.name}%0AMobile: ${formData.mobile}%0AEmail: ${formData.email}%0ALooking For: ${formData.lookingFor}%0ACountry: ${formData.country}%0AComments: ${formData.comments || "N/A"}%0ASchedule Date: ${formData.scheduleDate || "N/A"}%0ASchedule Time: ${formData.scheduleTime || "N/A"}`;
        
        const whatsappUrl = `https://wa.me/919490677177?text=${message}`;
        window.open(whatsappUrl, "_blank");
        
        alert("✅ Form submitted and WhatsApp message prepared!");
      }

      setFormSubmitted(true);
      setTimeout(() => {
        setFormData({
          name: "",
          mobile: "",
          email: "",
          lookingFor: "",
          country: "",
          comments: "",
          scheduleDate: "",
          scheduleTime: ""
        });
        setFormSubmitted(false);
      }, 2000);

    } catch (error) {
      console.error("Error:", error);
      alert("❌ Error submitting form: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.5 }
    );

    if (headingRef.current) {
      observer.observe(headingRef.current);
    }

    return () => {
      if (headingRef.current) {
        observer.unobserve(headingRef.current);
      }
    };
  }, []);

  return (
    <div className="contact-page">
      <header className="contact-header text-center">
        <h1 className="header-title">Contact Us</h1>
        <div className="header-subtitle">One Step Away From Expert Assistance</div>
      </header>

      <Container className="contact-main">
        <Row className="gx-5 gy-5">
          <Col lg={6}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12909831.308243861!2d135.2945643397396!3d-37.8178188!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad643baf09c7db5%3A0x870a1ecfde50d5fd!2sXcel%20Global%20Services!5e0!3m2!1sen!2sin!4v1751268144885!5m2!1sen!2sin"
              width="100%"
              height="400"
              style={{ border: 0, borderRadius: "8px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Map showing location of XCEL GLOBAL SERVICES"
            />
          </Col>

          <Col lg={6}>
            <h2 className="form-title text-danger">Contact Us</h2>
            <p className="form-subtext text-muted">
              Our friendly team would love to hear from you
            </p>
            
            {/* Replace the iframe with your form */}
            <div className="contact-form-container">
              <Form>
                {/* Name */}
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Your Name *</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </Form.Group>

                {/* Mobile */}
                <Form.Group className="mb-3" controlId="formMobile">
                  <Form.Label>Mobile Number *</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Enter your mobile number"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    required
                  />
                </Form.Group>

                {/* Email */}
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email Address *</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </Form.Group>

                {/* Looking For */}
                <Form.Group className="mb-3" controlId="formLookingFor">
                  <Form.Label>Looking For Visa *</Form.Label>
                  <Form.Select
                    value={formData.lookingFor}
                    onChange={(e) => setFormData({ ...formData, lookingFor: e.target.value })}
                    required
                  >
                    <option value="" disabled>Looking For Visa</option>
                    <option>PR Visa</option>
                    <option>Visit Visa</option>
                    <option>Student Visa</option>
                    <option>Business Visa</option>
                    <option>Other Services</option>
                  </Form.Select>
                </Form.Group>

                {/* Additional Comments - Show only when "Other Services" is selected */}
                {formData.lookingFor === "Other Services" && (
                  <Form.Group className="mb-3" controlId="formOtherService">
                    <Form.Label>Please specify your requirement *</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Please describe the service you are looking for..."
                      value={formData.comments}
                      onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                      required
                    />
                  </Form.Group>
                )}

                {/* Country */}
                <Form.Group className="mb-3" controlId="interestedCountry">
                  <Form.Label>Interested Country *</Form.Label>
                  <Form.Select
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    required
                  >
                    <option value="" disabled>Select an option</option>
                    <option>USA</option>
                    <option>UK</option>
                    <option>Australia</option>
                    <option>Canada</option>
                    <option>Germany</option>
                    <option>Ireland</option>
                    <option>Other</option>
                  </Form.Select>
                </Form.Group>

                {/* Schedule Date */}
                <Form.Group className="mb-3" controlId="formScheduleDate">
                  <Form.Label>Preferred Date for Consultation</Form.Label>
                  <Form.Control
                    type="date"
                    min={getTomorrowDate()}
                    value={formData.scheduleDate}
                    onChange={(e) => setFormData({ ...formData, scheduleDate: e.target.value })}
                  />
                </Form.Group>

                {/* Schedule Time */}
                <Form.Group className="mb-3" controlId="formScheduleTime">
                  <Form.Label>Preferred Time for Consultation</Form.Label>
                  <Form.Select
                    value={formData.scheduleTime}
                    onChange={(e) => setFormData({ ...formData, scheduleTime: e.target.value })}
                  >
                    <option value="">Select a time slot</option>
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </Form.Select>
                  <Form.Text className="text-muted">
                    ⏰ Please select the suitable time for us to reach you
                  </Form.Text>
                </Form.Group>

                {/* General Comments - Hidden when "Other Services" is selected */}
                {formData.lookingFor !== "Other Services" && (
                  <Form.Group className="mb-3" controlId="formComment">
                    <Form.Label>Additional Comments</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Enter any additional information..."
                      value={formData.comments}
                      onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                    />
                  </Form.Group>
                )}

                {/* Success Message */}
                {formSubmitted && (
                  <div className="text-success text-center mb-3">
                    ✅ Successfully Submitted!
                  </div>
                )}

                {/* Buttons */}
                <div className="d-flex justify-content-center gap-3 mt-4">
                  <Button
                    variant="outline-primary"
                    onClick={() => handleSend("email")}
                    disabled={loading}
                    className="d-flex align-items-center gap-2"
                  >
                    {loading ? "⏳" : "📧"} Email
                  </Button>

                  <Button
                    variant="outline-success"
                    onClick={() => handleSend("whatsapp")}
                    disabled={loading}
                    className="d-flex align-items-center gap-2"
                  >
                    {loading ? "⏳" : "💬"} WhatsApp
                  </Button>
                </div>
              </Form>
            </div>
          </Col>

          {/* Address section and other content remains the same */}
          <div className="global-container bg-white text-black">
            <Container className="py-5">
              {/* Addresses Section */}
              <Row className="pb-4 border-bottom border-dark flex-column flex-md-row justify-content-center gap-5">
                <Col md={5} className="d-flex flex-column gap-4">
                  <div>
                    <p className="text-primary fw-semibold d-flex align-items-center gap-2">
                      <FaMapMarkerAlt className="text-danger" /> Head Office Address: Melbourne
                    </p>
                    <p className="ms-4">
                      Level 7/276 Flinders St, Melbourne VIC 3000 Australia
                    </p>
                  </div>
                  <div>
                    <p className="text-primary fw-semibold d-flex align-items-center gap-2">
                      <FaMapMarkerAlt className="text-danger" /> Address: Adelaide
                    </p>
                    <p className="ms-4">Level 6, Pirie Street, Adelaide</p>
                  </div>
                </Col>

                <Col md="auto" className="d-flex justify-content-center">
                  <div className="custom-vertical-line"></div>
                </Col>

                <Col md={5} className="d-flex flex-column gap-4">
                  <div>
                    <p className="text-primary fw-semibold d-flex align-items-center gap-2">
                      <FaMapMarkerAlt className="text-danger" /> Address: Sydney
                    </p>
                    <p className="ms-4">26/44 Market St, Sydney NSW 2000, Australia</p>
                  </div>
                </Col>
              </Row>

              {/* Contact Icons */}
              <Row className="text-center justify-content-center gap-5 mt-5">
                <Col xs={12} sm={5} md={3} className="d-flex flex-column align-items-center gap-2">
                  <div className="icon-circle bg-danger">
                    <FaEnvelope className="text-white fs-5" />
                  </div>
                  <a href="mailto:migration@xcelglobalservices.com" className="text-decoration-none text-dark">
                    migration@xcelglobalservices.com
                  </a>
                </Col>

                <Col xs={12} sm={5} md={3} className="d-flex flex-column align-items-center gap-2">
                  <div className="icon-circle" style={{ background: "green", padding: "10px" }}>
                    <FaPhoneAlt style={{ color: "white", fontSize: "24px" }} />
                  </div>
                  <a href="tel:1800959619" className="text-decoration-none text-dark">
                    1800 959 619
                  </a>
                </Col>
              </Row>
            </Container>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default Contact;

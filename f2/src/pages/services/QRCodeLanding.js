// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import QRCode from 'qrcode.react';
// import "./QRCodeLanding.css";

// const QRCodeLanding = () => {
//   const navigate = useNavigate();
//   const [countdown, setCountdown] = useState(5);

//   // Hardcoded URLs - UPDATE THESE WITH YOUR ACTUAL DOMAIN
//   const trainingPageUrl = "https://xcelglobalservices.com/services/training"; // Replace with your actual domain
  
//   // For development/testing, you can use:
//   // const trainingPageUrl = "http://localhost:5173/services/training";

//   useEffect(() => {
//     if (countdown > 0) {
//       const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
//       return () => clearTimeout(timer);
//     } else {
//       navigate("/services/training");
//     }
//   }, [countdown, navigate]);

//   const handleSkipToTraining = () => {
//     navigate("/services/training");
//   };

//   return (
//     <div className="qr-landing-page">
//       <div className="qr-container">
//         <div className="qr-header">
//           <h1>Scan to Access Training Portal</h1>
//           <p>Point your camera at the QR code below to access our comprehensive training programs</p>
//         </div>

//         <div className="qr-code-section">
//           <div className="qr-code-wrapper">
//             <QRCode 
//               value={trainingPageUrl}
//               size={200}
//               level="H"
//               includeMargin={true}
//               className="qr-code-image"
//               alt="QR Code for Training Portal"
//             />
//             <div className="qr-overlay">
//               <div className="scan-animation"></div>
//             </div>
//           </div>
          
//           <div className="qr-instructions">
//             <h3>How to Scan:</h3>
//             <ol>
//               <li>Open your phone's camera app</li>
//               <li>Point the camera at the QR code</li>
//               <li>Tap the notification that appears</li>
//               <li>You'll be redirected to our training portal</li>
//             </ol>
//           </div>
//         </div>

//         <div className="redirect-section">
//           <p>
//             Redirecting to training page in <span className="countdown">{countdown}</span> seconds...
//           </p>
//           <button 
//             className="skip-button"
//             onClick={handleSkipToTraining}
//           >
//             Skip to Training Page Now
//           </button>
//         </div>

//         <div className="contact-info">
//           <p>
//             <strong>Xcel Global Services</strong><br />
//             Professional Training & Certification
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default QRCodeLanding;
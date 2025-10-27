import React from "react";
import { QRCodeSVG as QRCode } from 'qrcode.react';
import "./QRCodeLanding.css";

const QRCodeLanding = () => {
  // Hardcoded URL - UPDATE THIS WITH YOUR ACTUAL DOMAIN
  // const trainingPageUrl = "http://localhost:5173/services/training";
  // const trainingPageUrl = "http://192.168.0.104:5173/services/training";

  const trainingPageUrl = `${window.location.origin}/services/training`;
  //  const trainingPageUrl = process.env.NODE_ENV === 'development' 
  //   ? `${window.location.origin}/#/services/training`
  //   : `/#/services/training`;
  
  console.log("Current origin:", window.location.origin);
  console.log("QR Code URL:", trainingPageUrl);
 
  return (
    <div className="qr-landing-page">
      <div className="qr-container">
        <div className="qr-header">
          <h1>Scan to Access Training Portal</h1>
          <p>Point your camera at the QR code below to access our comprehensive training programs</p>
        </div>

        <div className="qr-code-section">
          <div className="qr-code-wrapper">
            <QRCode 
              value={trainingPageUrl}
              size={200}
              level="H"
              includeMargin={true}
              className="qr-code-image"
              alt="QR Code for Training Portal"
            />
            <div className="qr-overlay">
              <div className="scan-animation"></div>
            </div>
          </div>
          
          <div className="qr-instructions">
            <h3>How to Scan:</h3>
            <ol>
              <li>Open your phone's camera app</li>
              <li>Point the camera at the QR code</li>
              <li>Tap the notification that appears</li>
              <li>You'll be redirected to our training portal</li>
            </ol>
          </div>
        </div>

        <div className="manual-access">
          <p>
            <strong>Prefer to access on this device?</strong><br />
            <a href="#/services/training">Click here to go to the training page</a>
          </p>
        </div>

        <div className="contact-info">
          <p>
            <strong>Xcel Global Services</strong><br />
            Professional Training & Certification

          </p>
        </div>
      </div>
    </div>
  );
};

export default QRCodeLanding;
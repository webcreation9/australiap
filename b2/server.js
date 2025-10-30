





// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const XLSX = require("xlsx");
// const fs = require("fs");
// const path = require("path");
// const sgMail = require('@sendgrid/mail');
// require("dotenv").config();

// // ================= APP SETUP =================
// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// // ================= SENDGRID SETUP =================
// console.log("📧 SendGrid configuration check:");
// console.log("   Email User:", process.env.EMAIL_USER ? "✅ Set" : "❌ Not set");
// console.log("   SendGrid API Key exists:", !!process.env.SENDGRID_API_KEY);

// // DEBUG: Check API key format
// if (process.env.SENDGRID_API_KEY) {
//   const key = process.env.SENDGRID_API_KEY;
//   console.log("   API Key length:", key.length);
//   console.log("   Starts with SG.:", key.startsWith('SG.'));
//   console.log("   First 10 chars:", key.substring(0, 10));
//   console.log("   Last 10 chars:", key.substring(key.length - 10));
  
//   // Check for invisible characters
//   for (let i = 0; i < key.length; i++) {
//     const char = key[i];
//     if (char < ' ' || char > '~') {
//       console.log(`   ❌ INVALID CHAR at position ${i}:`, char.charCodeAt(0));
//     }
//   }
// }

// // Set API key with trim to remove spaces
// if (process.env.SENDGRID_API_KEY) {
//   const cleanKey = process.env.SENDGRID_API_KEY.trim();
//   sgMail.setApiKey(cleanKey);
//   console.log("✅ SendGrid API Key set (trimmed)");
// }

// // ================= MONGODB CONNECTION =================
// const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://varsha:varsha@backend.rravwpl.mongodb.net/ausexcelDB";

// console.log("🔧 Connecting to MongoDB...");
// mongoose
//   .connect(MONGODB_URI, { 
//     useNewUrlParser: true, 
//     useUnifiedTopology: true 
//   })
//   .then(() => console.log("✅ MongoDB connected successfully"))
//   .catch((err) => {
//     console.error("❌ MongoDB connection error:", err);
//     process.exit(1);
//   });

// // ================= MONGOOSE SCHEMA =================
// const submissionSchema = new mongoose.Schema({
//   name: String,
//   mobile: String,
//   email: String,
//   lookingFor: String,
//   country: String,
//   comments: String,
//   scheduleDate: String,
//   scheduleTime: String,
//   pageUrl: String,
//   studentInsurance: { type: Boolean, default: false },
//   studentAccommodation: { type: Boolean, default: false },
//   createdAt: { type: Date, default: Date.now },
// });

// const Submission = mongoose.model("Submission", submissionSchema);

// // ================= EXCEL FILE SETUP =================
// const excelFile = path.join(__dirname, "submissions.xlsx");
// if (!fs.existsSync(excelFile)) {
//   const ws = XLSX.utils.json_to_sheet([]);
//   const wb = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(wb, ws, "Submissions");
//   XLSX.writeFile(wb, excelFile);
// }

// // ================= API ROUTES =================

// // 1️⃣ Save form submission
// app.post("/api/submit", async (req, res) => {
//   const { 
//     name, mobile, email, lookingFor, country, comments, 
//     scheduleDate, scheduleTime, pageUrl, 
//     studentInsurance, studentAccommodation 
//   } = req.body;

//   console.log("📝 Form submission received:", { 
//     name, email, lookingFor, 
//     studentInsurance, studentAccommodation 
//   });

//   // Enhanced validation for Other Services
//   if (lookingFor === "Other Services") {
//     if (!studentInsurance && !studentAccommodation && !comments) {
//       return res.status(400).json({ error: "❌ Please select at least one service or provide comments for Other Services" });
//     }
//   } else {
//     // Original validation for other types
//     if (!name || !mobile || !email || !lookingFor || !country) {
//       return res.status(400).json({ error: "❌ All required fields must be filled" });
//     }
//   }

//   try {
//     // Save in MongoDB
//     const newSubmission = new Submission({
//       name,
//       mobile,
//       email,
//       lookingFor,
//       country,
//       comments,
//       scheduleDate: scheduleDate || "",
//       scheduleTime: scheduleTime || "",
//       pageUrl,
//       studentInsurance: studentInsurance || false,
//       studentAccommodation: studentAccommodation || false,
//     });
//     const savedSubmission = await newSubmission.save();

//     console.log("✅ Submission saved to MongoDB:", savedSubmission._id);

//     // Save in Excel
//     const wb = XLSX.readFile(excelFile);
//     const ws = wb.Sheets["Submissions"];
//     const data = XLSX.utils.sheet_to_json(ws);

//     data.push({
//       Name: name,
//       Mobile: mobile,
//       Email: email,
//       LookingFor: lookingFor,
//       Country: country,
//       Comments: comments || "",
//       ScheduleDate: scheduleDate || "",
//       ScheduleTime: scheduleTime || "",
//       StudentInsurance: studentInsurance ? 'Yes' : 'No',
//       StudentAccommodation: studentAccommodation ? 'Yes' : 'No',
//       PageUrl: pageUrl || "",
//       Date: new Date().toLocaleString(),
//     });

//     const newWs = XLSX.utils.json_to_sheet(data);
//     wb.Sheets["Submissions"] = newWs;
//     XLSX.writeFile(wb, excelFile);

//     console.log("✅ Submission saved to Excel");
    
//     res.json({
//       message: "✅ Submission saved successfully",
//       id: savedSubmission._id,
//     });
//   } catch (err) {
//     console.error("❌ Error submitting form:", err);
//     res.status(500).json({ error: "❌ Server error" });
//   }
// });

// // 2️⃣ Send email by submission ID
// app.get("/api/send-email/:id", async (req, res) => {
//   console.log("📧 Email endpoint called with ID:", req.params.id);
//   console.log("📧 Environment check - NODE_ENV:", process.env.NODE_ENV);
//   console.log("📧 Email user configured:", !!process.env.EMAIL_USER);
//   console.log("📧 SendGrid API configured:", !!process.env.SENDGRID_API_KEY);

//   try {
//     const submission = await Submission.findById(req.params.id);
//     if (!submission) {
//       console.log("❌ Submission not found for ID:", req.params.id);
//       return res.status(404).json({ error: "Submission not found" });
//     }

//     console.log("✅ Found submission:", submission.name, submission.email);

//     // Check if this is a demo request (by looking for "Training Demo" in lookingFor field)
//     const isDemoRequest = submission.lookingFor && submission.lookingFor.includes("Training Demo");

//     let emailContent = '';

//     if (isDemoRequest) {
//       // Email template for DEMO REQUESTS (without lookingFor and country)
//       emailContent = `
// New Training Demo Request from Xcel Global Services:

// Name: ${submission.name}
// Mobile: ${submission.mobile}
// Email: ${submission.email}
// Comments: ${submission.comments || "N/A"}
// Schedule Date: ${submission.scheduleDate || "N/A"}
// Schedule Time: ${submission.scheduleTime || "N/A"}
// Page URL: ${submission.pageUrl || "N/A"}
// Submission Date: ${submission.createdAt}

// This is an automated message from the Xcel Global Services website.
//       `;
//     } else {
//       // Original email template for OTHER REQUESTS
//       emailContent = `
// New Consultation Request from Xcel Global Services:

// Name: ${submission.name}
// Mobile: ${submission.mobile}
// Email: ${submission.email}
// Looking For: ${submission.lookingFor}
// Country: ${submission.country}
// ${submission.lookingFor === "Other Services" ? 
//   `Student Insurance: ${submission.studentInsurance ? 'Yes' : 'No'}
// Student Accommodation: ${submission.studentAccommodation ? 'Yes' : 'No'}` : ''}
// Comments: ${submission.comments || "N/A"}
// Schedule Date: ${submission.scheduleDate || "N/A"}
// Schedule Time: ${submission.scheduleTime || "N/A"}
// Page URL: ${submission.pageUrl || "N/A"}
// Submission Date: ${submission.createdAt}

// This is an automated message from the Xcel Global Services website.
//       `;
//     }

//     console.log("📤 Attempting to send email via SendGrid API...");

//     const msg = {
//       to: 'sagiraju1770@gmail.com',
//       from: process.env.EMAIL_USER,
//       subject: isDemoRequest ? 'New Training Demo Request - Xcel Global Services' : 'New Consultation Request - Xcel Global Services',
//       text: emailContent,
//     };

//     await sgMail.send(msg);
//     console.log("✅ Email sent successfully via SendGrid API!");
    
//     res.json({ message: "📧 Email sent successfully" });
    
//   } catch (err) {
//     console.error("❌ Error sending email:", err);
    
//     if (err.response) {
//       console.error("❌ SendGrid API error details:", err.response.body);
//     }
    
//     res.status(500).json({ 
//       error: "Failed to send email",
//       details: err.message 
//     });
//   }
// });
// // 3️⃣ Health check endpoint
// app.get("/api/health", (req, res) => {
//   res.json({ 
//     status: 'OK', 
//     environment: process.env.NODE_ENV || 'development',
//     emailConfigured: !!(process.env.EMAIL_USER && process.env.SENDGRID_API_KEY),
//     timestamp: new Date().toISOString()
//   });
// });

// // 4️⃣ JSON Data API Routes
// const readJSONFile = (filePath) => {
//   try {
//     if (fs.existsSync(filePath)) {
//       const data = fs.readFileSync(filePath, 'utf8');
//       return JSON.parse(data);
//     }
//     return null;
//   } catch (error) {
//     console.error(`Error reading ${filePath}:`, error);
//     return null;
//   }
// };

// // Service categories
// app.get("/api/service-categories", (req, res) => {
//   const filePath = process.env.NODE_ENV === 'production'
//     ? path.join(__dirname, '../client/dist/data/service-categories.json')
//     : path.join(__dirname, '../client/public/data/service-categories.json');
  
//   const data = readJSONFile(filePath);
//   if (data) {
//     res.json(data);
//   } else {
//     res.status(500).json({ error: 'Failed to load service categories' });
//   }
// });

// // All services
// app.get("/api/services", (req, res) => {
//   const filePath = process.env.NODE_ENV === 'production'
//     ? path.join(__dirname, '../client/dist/data/services.json')
//     : path.join(__dirname, '../client/public/data/services.json');
  
//   const data = readJSONFile(filePath);
//   if (data) {
//     res.json(data);
//   } else {
//     res.status(500).json({ error: 'Failed to load services' });
//   }
// });

// // Service by slug
// app.get("/api/services/:slug", (req, res) => {
//   const filePath = process.env.NODE_ENV === 'production'
//     ? path.join(__dirname, '../client/dist/data/service-categories.json')
//     : path.join(__dirname, '../client/public/data/service-categories.json');
  
//   const data = readJSONFile(filePath);
//   if (data) {
//     const service = data.find(s => s.slug === req.params.slug);
//     if (service) {
//       res.json(service);
//     } else {
//       res.status(404).json({ error: 'Service not found' });
//     }
//   } else {
//     res.status(500).json({ error: 'Failed to load service data' });
//   }
// });



// // ================= START SERVER =================
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
//   console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
//   console.log(`🔧 API available at http://localhost:${PORT}/api`);
//   console.log(`📧 SendGrid configured: ${!!(process.env.EMAIL_USER && process.env.SENDGRID_API_KEY)}`);
// });


// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const XLSX = require("xlsx");
// const fs = require("fs");
// const path = require("path");
// const sgMail = require('@sendgrid/mail');
// const multer = require('multer');
// require("dotenv").config();

// // ================= APP SETUP =================
// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// // ================= MULTER SETUP FOR FILE UPLOADS =================
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const uploadDir = 'uploads/';
//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir, { recursive: true });
//     }
//     cb(null, uploadDir);
//   },
//   filename: function (req, file, cb) {
//     // Create unique filename with timestamp
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//   }
// });

// const upload = multer({ 
//   storage: storage,
//   limits: {
//     fileSize: 5 * 1024 * 1024 // 5MB limit
//   },
//   fileFilter: (req, file, cb) => {
//     const allowedTypes = /jpeg|jpg|png|pdf|doc|docx/;
//     const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = allowedTypes.test(file.mimetype);

//     if (mimetype && extname) {
//       return cb(null, true);
//     } else {
//       cb(new Error('Only PDF, DOC, DOCX, JPG, and PNG files are allowed'));
//     }
//   }
// });

// // ================= SENDGRID SETUP =================
// console.log("📧 SendGrid configuration check:");
// console.log("   Email User:", process.env.EMAIL_USER ? "✅ Set" : "❌ Not set");
// console.log("   SendGrid API Key exists:", !!process.env.SENDGRID_API_KEY);

// // Set API key with trim to remove spaces
// if (process.env.SENDGRID_API_KEY) {
//   const cleanKey = process.env.SENDGRID_API_KEY.trim();
//   sgMail.setApiKey(cleanKey);
//   console.log("✅ SendGrid API Key set (trimmed)");
// }

// // ================= MONGODB CONNECTION =================
// const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://varsha:varsha@backend.rravwpl.mongodb.net/ausexcelDB";

// console.log("🔧 Connecting to MongoDB...");
// mongoose
//   .connect(MONGODB_URI, { 
//     useNewUrlParser: true, 
//     useUnifiedTopology: true 
//   })
//   .then(() => console.log("✅ MongoDB connected successfully"))
//   .catch((err) => {
//     console.error("❌ MongoDB connection error:", err);
//     process.exit(1);
//   });

// // ================= MONGOOSE SCHEMAS =================
// const submissionSchema = new mongoose.Schema({
//   name: String,
//   mobile: String,
//   email: String,
//   lookingFor: String,
//   country: String,
//   comments: String,
//   scheduleDate: String,
//   scheduleTime: String,
//   pageUrl: String,
//   studentInsurance: { type: Boolean, default: false },
//   studentAccommodation: { type: Boolean, default: false },
//   createdAt: { type: Date, default: Date.now },
// });

// const Submission = mongoose.model("Submission", submissionSchema);

// // New schema for diploma applications
// const diplomaApplicationSchema = new mongoose.Schema({
//   fullName: String,
//   email: String,
//   mobile: String,
//   currentQualification: String,
//   yearOfCompletion: String,
//   preferredCountry: String,
//   preferredCourse: String,
//   additionalInfo: String,
//   documentPath: String,
//   consent: Boolean,
//   pageUrl: String,
//   formType: String,
//   createdAt: { type: Date, default: Date.now },
// });

// const DiplomaApplication = mongoose.model("DiplomaApplication", diplomaApplicationSchema);

// // ================= EXCEL FILE SETUP =================
// const excelFile = path.join(__dirname, "submissions.xlsx");
// if (!fs.existsSync(excelFile)) {
//   const ws = XLSX.utils.json_to_sheet([]);
//   const wb = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(wb, ws, "Submissions");
//   XLSX.writeFile(wb, excelFile);
// }

// // Create Excel file for diploma applications
// const diplomaExcelFile = path.join(__dirname, "diploma-applications.xlsx");
// if (!fs.existsSync(diplomaExcelFile)) {
//   const ws = XLSX.utils.json_to_sheet([]);
//   const wb = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(wb, ws, "DiplomaApplications");
//   XLSX.writeFile(wb, diplomaExcelFile);
// }

// // ================= API ROUTES =================

// // 1️⃣ Save form submission
// app.post("/api/submit", async (req, res) => {
//   const { 
//     name, mobile, email, lookingFor, country, comments, 
//     scheduleDate, scheduleTime, pageUrl, 
//     studentInsurance, studentAccommodation 
//   } = req.body;

//   console.log("📝 Form submission received:", { 
//     name, email, lookingFor, 
//     studentInsurance, studentAccommodation 
//   });

//   // Enhanced validation for Other Services
//   if (lookingFor === "Other Services") {
//     if (!studentInsurance && !studentAccommodation && !comments) {
//       return res.status(400).json({ error: "❌ Please select at least one service or provide comments for Other Services" });
//     }
//   } else {
//     // Original validation for other types
//     if (!name || !mobile || !email || !lookingFor || !country) {
//       return res.status(400).json({ error: "❌ All required fields must be filled" });
//     }
//   }

//   try {
//     // Save in MongoDB
//     const newSubmission = new Submission({
//       name,
//       mobile,
//       email,
//       lookingFor,
//       country,
//       comments,
//       scheduleDate: scheduleDate || "",
//       scheduleTime: scheduleTime || "",
//       pageUrl,
//       studentInsurance: studentInsurance || false,
//       studentAccommodation: studentAccommodation || false,
//     });
//     const savedSubmission = await newSubmission.save();

//     console.log("✅ Submission saved to MongoDB:", savedSubmission._id);

//     // Save in Excel
//     const wb = XLSX.readFile(excelFile);
//     const ws = wb.Sheets["Submissions"];
//     const data = XLSX.utils.sheet_to_json(ws);

//     data.push({
//       Name: name,
//       Mobile: mobile,
//       Email: email,
//       LookingFor: lookingFor,
//       Country: country,
//       Comments: comments || "",
//       ScheduleDate: scheduleDate || "",
//       ScheduleTime: scheduleTime || "",
//       StudentInsurance: studentInsurance ? 'Yes' : 'No',
//       StudentAccommodation: studentAccommodation ? 'Yes' : 'No',
//       PageUrl: pageUrl || "",
//       Date: new Date().toLocaleString(),
//     });

//     const newWs = XLSX.utils.json_to_sheet(data);
//     wb.Sheets["Submissions"] = newWs;
//     XLSX.writeFile(wb, excelFile);

//     console.log("✅ Submission saved to Excel");
    
//     res.json({
//       message: "✅ Submission saved successfully",
//       id: savedSubmission._id,
//     });
//   } catch (err) {
//     console.error("❌ Error submitting form:", err);
//     res.status(500).json({ error: "❌ Server error" });
//   }
// });

// // 2️⃣ Send email by submission ID
// app.get("/api/send-email/:id", async (req, res) => {
//   console.log("📧 Email endpoint called with ID:", req.params.id);
//   console.log("📧 Environment check - NODE_ENV:", process.env.NODE_ENV);
//   console.log("📧 Email user configured:", !!process.env.EMAIL_USER);
//   console.log("📧 SendGrid API configured:", !!process.env.SENDGRID_API_KEY);

//   try {
//     const submission = await Submission.findById(req.params.id);
//     if (!submission) {
//       console.log("❌ Submission not found for ID:", req.params.id);
//       return res.status(404).json({ error: "Submission not found" });
//     }

//     console.log("✅ Found submission:", submission.name, submission.email);

//     // Check if this is a demo request (by looking for "Training Demo" in lookingFor field)
//     const isDemoRequest = submission.lookingFor && submission.lookingFor.includes("Training Demo");

//     let emailContent = '';

//     if (isDemoRequest) {
//       // Email template for DEMO REQUESTS (without lookingFor and country)
//       emailContent = `
// New Training Demo Request from Xcel Global Services:

// Name: ${submission.name}
// Mobile: ${submission.mobile}
// Email: ${submission.email}
// Comments: ${submission.comments || "N/A"}
// Schedule Date: ${submission.scheduleDate || "N/A"}
// Schedule Time: ${submission.scheduleTime || "N/A"}
// Page URL: ${submission.pageUrl || "N/A"}
// Submission Date: ${submission.createdAt}

// This is an automated message from the Xcel Global Services website.
//       `;
//     } else {
//       // Original email template for OTHER REQUESTS
//       emailContent = `
// New Consultation Request from Xcel Global Services:

// Name: ${submission.name}
// Mobile: ${submission.mobile}
// Email: ${submission.email}
// Looking For: ${submission.lookingFor}
// Country: ${submission.country}
// ${submission.lookingFor === "Other Services" ? 
//   `Student Insurance: ${submission.studentInsurance ? 'Yes' : 'No'}
// Student Accommodation: ${submission.studentAccommodation ? 'Yes' : 'No'}` : ''}
// Comments: ${submission.comments || "N/A"}
// Schedule Date: ${submission.scheduleDate || "N/A"}
// Schedule Time: ${submission.scheduleTime || "N/A"}
// Page URL: ${submission.pageUrl || "N/A"}
// Submission Date: ${submission.createdAt}

// This is an automated message from the Xcel Global Services website.
//       `;
//     }

//     console.log("📤 Attempting to send email via SendGrid API...");

//     const msg = {
//       to: 'sagiraju1770@gmail.com',
//       from: process.env.EMAIL_USER,
//       subject: isDemoRequest ? 'New Training Demo Request - Xcel Global Services' : 'New Consultation Request - Xcel Global Services',
//       text: emailContent,
//     };

//     await sgMail.send(msg);
//     console.log("✅ Email sent successfully via SendGrid API!");
    
//     res.json({ message: "📧 Email sent successfully" });
    
//   } catch (err) {
//     console.error("❌ Error sending email:", err);
    
//     if (err.response) {
//       console.error("❌ SendGrid API error details:", err.response.body);
//     }
    
//     res.status(500).json({ 
//       error: "Failed to send email",
//       details: err.message 
//     });
//   }
// });

// // 3️⃣ Diploma Application Endpoint
// app.post("/api/diploma-application", upload.single('document'), async (req, res) => {
//   const { 
//     fullName, email, mobile, currentQualification, yearOfCompletion,
//     preferredCountry, preferredCourse, additionalInfo, consent, pageUrl, formType
//   } = req.body;

//   console.log("🎓 Diploma application received:", { 
//     fullName, email, preferredCountry, preferredCourse 
//   });

//   // Validation
//   if (!fullName || !email || !mobile || !currentQualification || !yearOfCompletion || 
//       !preferredCountry || !preferredCourse || !consent) {
//     return res.status(400).json({ error: "❌ All required fields must be filled" });
//   }

//   try {
//     // Save to MongoDB
//     const newApplication = new DiplomaApplication({
//       fullName,
//       email,
//       mobile,
//       currentQualification,
//       yearOfCompletion,
//       preferredCountry,
//       preferredCourse,
//       additionalInfo: additionalInfo || "",
//       documentPath: req.file ? req.file.path : "",
//       consent: consent === 'true',
//       pageUrl,
//       formType
//     });
//     const savedApplication = await newApplication.save();

//     console.log("✅ Diploma application saved to MongoDB:", savedApplication._id);

//     // Save to Excel
//     const wb = XLSX.readFile(diplomaExcelFile);
//     const ws = wb.Sheets["DiplomaApplications"];
//     const data = XLSX.utils.sheet_to_json(ws);

//     data.push({
//       "Full Name": fullName,
//       "Email": email,
//       "Mobile": mobile,
//       "Current Qualification": currentQualification,
//       "Year of Completion": yearOfCompletion,
//       "Preferred Country": preferredCountry,
//       "Preferred Course": preferredCourse,
//       "Additional Info": additionalInfo || "",
//       "Document Uploaded": req.file ? 'Yes' : 'No',
//       "Consent Given": consent === 'true' ? 'Yes' : 'No',
//       "Page URL": pageUrl || "",
//       "Submission Date": new Date().toLocaleString(),
//     });

//     const newWs = XLSX.utils.json_to_sheet(data);
//     wb.Sheets["DiplomaApplications"] = newWs;
//     XLSX.writeFile(wb, diplomaExcelFile);

//     console.log("✅ Diploma application saved to Excel");

//     // Send WhatsApp message (optional - you can enable this if needed)
//     const message = `New Diploma Course Application:%0A%0A*Name:* ${fullName}%0A*Email:* ${email}%0A*Mobile:* ${mobile}%0A*Qualification:* ${currentQualification}%0A*Completion Year:* ${yearOfCompletion}%0A*Preferred Country:* ${preferredCountry}%0A*Preferred Course:* ${preferredCourse}%0A*Additional Info:* ${additionalInfo || "N/A"}%0A*Consent:* ${consent === 'true' ? 'Yes' : 'No'}`;
    
//     const whatsappUrl = `https://wa.me/919343369999?text=${message}`;
//     console.log("📱 WhatsApp message URL:", whatsappUrl);

//     // Send email notification for diploma application
//     try {
//       const diplomaEmailContent = `
// New Diploma Course Application from Xcel Global Services:

// Full Name: ${fullName}
// Email: ${email}
// Mobile: ${mobile}
// Current Qualification: ${currentQualification}
// Year of Completion: ${yearOfCompletion}
// Preferred Country: ${preferredCountry}
// Preferred Course: ${preferredCourse}
// Additional Information: ${additionalInfo || "N/A"}
// Document Uploaded: ${req.file ? 'Yes' : 'No'}
// Consent Given: ${consent === 'true' ? 'Yes' : 'No'}
// Page URL: ${pageUrl || "N/A"}
// Submission Date: ${new Date()}

// This is an automated message from the Xcel Global Services website.
//       `;

//       const diplomaMsg = {
//         to: 'sagiraju1770@gmail.com',
//         from: process.env.EMAIL_USER,
//         subject: 'New Diploma Course Application - Xcel Global Services',
//         text: diplomaEmailContent,
//       };

//       await sgMail.send(diplomaMsg);
//       console.log("✅ Diploma application email sent successfully!");
//     } catch (emailError) {
//       console.error("❌ Error sending diploma application email:", emailError);
//       // Don't fail the request if email fails
//     }

//     res.json({
//       message: "✅ Application submitted successfully",
//       id: savedApplication._id,
//       whatsappUrl: whatsappUrl // Optional: send back to frontend
//     });
//   } catch (err) {
//     console.error("❌ Error submitting diploma application:", err);
//     res.status(500).json({ error: "❌ Server error" });
//   }
// });

// // 4️⃣ Health check endpoint
// app.get("/api/health", (req, res) => {
//   res.json({ 
//     status: 'OK', 
//     environment: process.env.NODE_ENV || 'development',
//     emailConfigured: !!(process.env.EMAIL_USER && process.env.SENDGRID_API_KEY),
//     timestamp: new Date().toISOString()
//   });
// });

// // 5️⃣ JSON Data API Routes
// const readJSONFile = (filePath) => {
//   try {
//     if (fs.existsSync(filePath)) {
//       const data = fs.readFileSync(filePath, 'utf8');
//       return JSON.parse(data);
//     }
//     return null;
//   } catch (error) {
//     console.error(`Error reading ${filePath}:`, error);
//     return null;
//   }
// };

// // Service categories
// app.get("/api/service-categories", (req, res) => {
//   const filePath = process.env.NODE_ENV === 'production'
//     ? path.join(__dirname, '../client/dist/data/service-categories.json')
//     : path.join(__dirname, '../client/public/data/service-categories.json');
  
//   const data = readJSONFile(filePath);
//   if (data) {
//     res.json(data);
//   } else {
//     res.status(500).json({ error: 'Failed to load service categories' });
//   }
// });

// // All services
// app.get("/api/services", (req, res) => {
//   const filePath = process.env.NODE_ENV === 'production'
//     ? path.join(__dirname, '../client/dist/data/services.json')
//     : path.join(__dirname, '../client/public/data/services.json');
  
//   const data = readJSONFile(filePath);
//   if (data) {
//     res.json(data);
//   } else {
//     res.status(500).json({ error: 'Failed to load services' });
//   }
// });

// // Service by slug
// app.get("/api/services/:slug", (req, res) => {
//   const filePath = process.env.NODE_ENV === 'production'
//     ? path.join(__dirname, '../client/dist/data/service-categories.json')
//     : path.join(__dirname, '../client/public/data/service-categories.json');
  
//   const data = readJSONFile(filePath);
//   if (data) {
//     const service = data.find(s => s.slug === req.params.slug);
//     if (service) {
//       res.json(service);
//     } else {
//       res.status(404).json({ error: 'Service not found' });
//     }
//   } else {
//     res.status(500).json({ error: 'Failed to load service data' });
//   }
// });

// // 6️⃣ Serve uploaded files
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // ================= START SERVER =================
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
//   console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
//   console.log(`🔧 API available at http://localhost:${PORT}/api`);
//   console.log(`📧 SendGrid configured: ${!!(process.env.EMAIL_USER && process.env.SENDGRID_API_KEY)}`);
//   console.log(`🎓 Diploma application endpoint: POST http://localhost:${PORT}/api/diploma-application`);
// });


// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const XLSX = require("xlsx");
// const fs = require("fs");
// const path = require("path");
// const sgMail = require('@sendgrid/mail');
// const multer = require('multer');
// require("dotenv").config();

// // ================= APP SETUP =================
// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// // ================= MULTER SETUP FOR FILE UPLOADS =================
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const uploadDir = path.join(__dirname, 'uploads/');
//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir, { recursive: true });
//     }
//     cb(null, uploadDir);
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//   }
// });

// const upload = multer({ 
//   storage: storage,
//   limits: {
//     fileSize: 5 * 1024 * 1024 // 5MB limit
//   },
//   fileFilter: (req, file, cb) => {
//     const allowedTypes = /jpeg|jpg|png|pdf|doc|docx/;
//     const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = allowedTypes.test(file.mimetype);

//     if (mimetype && extname) {
//       return cb(null, true);
//     } else {
//       cb(new Error('Only PDF, DOC, DOCX, JPG, and PNG files are allowed'));
//     }
//   }
// });

// // ================= SENDGRID SETUP =================
// console.log("📧 SendGrid configuration check:");
// console.log("   Email User:", process.env.EMAIL_USER ? "✅ Set" : "❌ Not set");
// console.log("   SendGrid API Key exists:", !!process.env.SENDGRID_API_KEY);

// if (process.env.SENDGRID_API_KEY) {
//   const cleanKey = process.env.SENDGRID_API_KEY.trim();
//   sgMail.setApiKey(cleanKey);
//   console.log("✅ SendGrid API Key set (trimmed)");
// }

// // ================= MONGODB CONNECTION =================
// const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://varsha:varsha@backend.rravwpl.mongodb.net/ausexcelDB";

// console.log("🔧 Connecting to MongoDB...");
// mongoose
//   .connect(MONGODB_URI, { 
//     useNewUrlParser: true, 
//     useUnifiedTopology: true 
//   })
//   .then(() => console.log("✅ MongoDB connected successfully"))
//   .catch((err) => {
//     console.error("❌ MongoDB connection error:", err);
//     process.exit(1);
//   });

// // ================= MONGOOSE SCHEMAS =================
// const submissionSchema = new mongoose.Schema({
//   name: String,
//   mobile: String,
//   email: String,
//   lookingFor: String,
//   country: String,
//   comments: String,
//   scheduleDate: String,
//   scheduleTime: String,
//   pageUrl: String,
//   studentInsurance: { type: Boolean, default: false },
//   studentAccommodation: { type: Boolean, default: false },
//   createdAt: { type: Date, default: Date.now },
// });

// const Submission = mongoose.model("Submission", submissionSchema);

// const diplomaApplicationSchema = new mongoose.Schema({
//   fullName: String,
//   email: String,
//   mobile: String,
//   currentQualification: String,
//   yearOfCompletion: String,
//   preferredCountry: String,
//   preferredCourse: String,
//   additionalInfo: String,
//   documentPath: String,
//   consent: Boolean,
//   pageUrl: String,
//   formType: String,
//   createdAt: { type: Date, default: Date.now },
// });

// const DiplomaApplication = mongoose.model("DiplomaApplication", diplomaApplicationSchema);

// // ================= EXCEL FILE SETUP =================
// // Function to ensure Excel file exists and is properly formatted
// const ensureExcelFile = (filePath, sheetName) => {
//   try {
//     if (!fs.existsSync(filePath)) {
//       console.log(`📁 Creating new Excel file: ${filePath}`);
//       const wb = XLSX.utils.book_new();
//       const ws = XLSX.utils.json_to_sheet([]);
//       XLSX.utils.book_append_sheet(wb, ws, sheetName);
//       XLSX.writeFile(wb, filePath);
//       console.log(`✅ Excel file created: ${filePath}`);
//     } else {
//       console.log(`✅ Excel file exists: ${filePath}`);
//     }
//   } catch (error) {
//     console.error(`❌ Error ensuring Excel file ${filePath}:`, error);
//   }
// };

// // Define Excel file paths
// const excelFile = path.join(__dirname, "submissions.xlsx");
// const diplomaExcelFile = path.join(__dirname, "diploma-applications.xlsx");

// // Ensure Excel files exist
// ensureExcelFile(excelFile, "Submissions");
// ensureExcelFile(diplomaExcelFile, "DiplomaApplications");

// // ================= API ROUTES =================

// // 1️⃣ Save form submission
// app.post("/api/submit", async (req, res) => {
//   const { 
//     name, mobile, email, lookingFor, country, comments, 
//     scheduleDate, scheduleTime, pageUrl, 
//     studentInsurance, studentAccommodation 
//   } = req.body;

//   console.log("📝 Form submission received:", { 
//     name, email, lookingFor, 
//     studentInsurance, studentAccommodation 
//   });

//   // Enhanced validation for Other Services
//   if (lookingFor === "Other Services") {
//     if (!studentInsurance && !studentAccommodation && !comments) {
//       return res.status(400).json({ error: "❌ Please select at least one service or provide comments for Other Services" });
//     }
//   } else {
//     // Original validation for other types
//     if (!name || !mobile || !email || !lookingFor || !country) {
//       return res.status(400).json({ error: "❌ All required fields must be filled" });
//     }
//   }

//   try {
//     // Save in MongoDB
//     const newSubmission = new Submission({
//       name,
//       mobile,
//       email,
//       lookingFor,
//       country,
//       comments,
//       scheduleDate: scheduleDate || "",
//       scheduleTime: scheduleTime || "",
//       pageUrl,
//       studentInsurance: studentInsurance || false,
//       studentAccommodation: studentAccommodation || false,
//     });
//     const savedSubmission = await newSubmission.save();

//     console.log("✅ Submission saved to MongoDB:", savedSubmission._id);

//     // Save in Excel
//     try {
//       let wb;
//       let data = [];
      
//       if (fs.existsSync(excelFile)) {
//         wb = XLSX.readFile(excelFile);
//         const ws = wb.Sheets["Submissions"];
//         data = XLSX.utils.sheet_to_json(ws);
//       } else {
//         wb = XLSX.utils.book_new();
//       }

//       data.push({
//         Name: name,
//         Mobile: mobile,
//         Email: email,
//         LookingFor: lookingFor,
//         Country: country,
//         Comments: comments || "",
//         ScheduleDate: scheduleDate || "",
//         ScheduleTime: scheduleTime || "",
//         StudentInsurance: studentInsurance ? 'Yes' : 'No',
//         StudentAccommodation: studentAccommodation ? 'Yes' : 'No',
//         PageUrl: pageUrl || "",
//         Date: new Date().toLocaleString(),
//       });

//       const newWs = XLSX.utils.json_to_sheet(data);
//       if (wb.SheetNames.includes("Submissions")) {
//         wb.Sheets["Submissions"] = newWs;
//       } else {
//         XLSX.utils.book_append_sheet(wb, newWs, "Submissions");
//       }
      
//       XLSX.writeFile(wb, excelFile);
//       console.log("✅ Submission saved to Excel");
//     } catch (excelError) {
//       console.error("❌ Error saving to Excel:", excelError);
//       // Don't fail the request if Excel fails
//     }
    
//     res.json({
//       message: "✅ Submission saved successfully",
//       id: savedSubmission._id,
//     });
//   } catch (err) {
//     console.error("❌ Error submitting form:", err);
//     res.status(500).json({ error: "❌ Server error" });
//   }
// });

// // 2️⃣ Send email by submission ID
// app.get("/api/send-email/:id", async (req, res) => {
//   console.log("📧 Email endpoint called with ID:", req.params.id);

//   try {
//     const submission = await Submission.findById(req.params.id);
//     if (!submission) {
//       console.log("❌ Submission not found for ID:", req.params.id);
//       return res.status(404).json({ error: "Submission not found" });
//     }

//     console.log("✅ Found submission:", submission.name, submission.email);

//     const isDemoRequest = submission.lookingFor && submission.lookingFor.includes("Training Demo");

//     let emailContent = '';

//     if (isDemoRequest) {
//       emailContent = `
// New Training Demo Request from Xcel Global Services:

// Name: ${submission.name}
// Mobile: ${submission.mobile}
// Email: ${submission.email}
// Comments: ${submission.comments || "N/A"}
// Schedule Date: ${submission.scheduleDate || "N/A"}
// Schedule Time: ${submission.scheduleTime || "N/A"}
// Page URL: ${submission.pageUrl || "N/A"}
// Submission Date: ${submission.createdAt}

// This is an automated message from the Xcel Global Services website.
//       `;
//     } else {
//       emailContent = `
// New Consultation Request from Xcel Global Services:

// Name: ${submission.name}
// Mobile: ${submission.mobile}
// Email: ${submission.email}
// Looking For: ${submission.lookingFor}
// Country: ${submission.country}
// ${submission.lookingFor === "Other Services" ? 
//   `Student Insurance: ${submission.studentInsurance ? 'Yes' : 'No'}
// Student Accommodation: ${submission.studentAccommodation ? 'Yes' : 'No'}` : ''}
// Comments: ${submission.comments || "N/A"}
// Schedule Date: ${submission.scheduleDate || "N/A"}
// Schedule Time: ${submission.scheduleTime || "N/A"}
// Page URL: ${submission.pageUrl || "N/A"}
// Submission Date: ${submission.createdAt}

// This is an automated message from the Xcel Global Services website.
//       `;
//     }

//     console.log("📤 Attempting to send email via SendGrid API...");

//     const msg = {
//       to: 'sagiraju1770@gmail.com',
//       from: process.env.EMAIL_USER,
//       subject: isDemoRequest ? 'New Training Demo Request - Xcel Global Services' : 'New Consultation Request - Xcel Global Services',
//       text: emailContent,
//     };

//     await sgMail.send(msg);
//     console.log("✅ Email sent successfully via SendGrid API!");
    
//     res.json({ message: "📧 Email sent successfully" });
    
//   } catch (err) {
//     console.error("❌ Error sending email:", err);
    
//     if (err.response) {
//       console.error("❌ SendGrid API error details:", err.response.body);
//     }
    
//     res.status(500).json({ 
//       error: "Failed to send email",
//       details: err.message 
//     });
//   }
// });

// // 3️⃣ Diploma Application Endpoint
// app.post("/api/diploma-application", upload.single('document'), async (req, res) => {
//   const { 
//     fullName, email, mobile, currentQualification, yearOfCompletion,
//     preferredCountry, preferredCourse, additionalInfo, consent, pageUrl, formType
//   } = req.body;

//   console.log("🎓 Diploma application received:", { 
//     fullName, email, preferredCountry, preferredCourse 
//   });

//   // Validation
//   if (!fullName || !email || !mobile || !currentQualification || !yearOfCompletion || 
//       !preferredCountry || !preferredCourse || !consent) {
//     return res.status(400).json({ error: "❌ All required fields must be filled" });
//   }

//   try {
//     // Save to MongoDB
//     const newApplication = new DiplomaApplication({
//       fullName,
//       email,
//       mobile,
//       currentQualification,
//       yearOfCompletion,
//       preferredCountry,
//       preferredCourse,
//       additionalInfo: additionalInfo || "",
//       documentPath: req.file ? req.file.path : "",
//       consent: consent === 'true',
//       pageUrl,
//       formType
//     });
//     const savedApplication = await newApplication.save();

//     console.log("✅ Diploma application saved to MongoDB:", savedApplication._id);

//     // Save to Excel
//     try {
//       let wb;
//       let data = [];
      
//       if (fs.existsSync(diplomaExcelFile)) {
//         wb = XLSX.readFile(diplomaExcelFile);
//         const ws = wb.Sheets["DiplomaApplications"];
//         data = XLSX.utils.sheet_to_json(ws);
//       } else {
//         wb = XLSX.utils.book_new();
//       }

//       data.push({
//         "Full Name": fullName,
//         "Email": email,
//         "Mobile": mobile,
//         "Current Qualification": currentQualification,
//         "Year of Completion": yearOfCompletion,
//         "Preferred Country": preferredCountry,
//         "Preferred Course": preferredCourse,
//         "Additional Info": additionalInfo || "",
//         "Document Uploaded": req.file ? 'Yes' : 'No',
//         "Consent Given": consent === 'true' ? 'Yes' : 'No',
//         "Page URL": pageUrl || "",
//         "Submission Date": new Date().toLocaleString(),
//       });

//       const newWs = XLSX.utils.json_to_sheet(data);
//       if (wb.SheetNames.includes("DiplomaApplications")) {
//         wb.Sheets["DiplomaApplications"] = newWs;
//       } else {
//         XLSX.utils.book_append_sheet(wb, newWs, "DiplomaApplications");
//       }
      
//       XLSX.writeFile(wb, diplomaExcelFile);
//       console.log("✅ Diploma application saved to Excel");
//     } catch (excelError) {
//       console.error("❌ Error saving diploma application to Excel:", excelError);
//       // Don't fail the request if Excel fails
//     }

//     // Send WhatsApp message with proper number format
//     const message = `New Diploma Course Application:%0A%0A*Name:* ${fullName}%0A*Email:* ${email}%0A*Mobile:* ${mobile}%0A*Qualification:* ${currentQualification}%0A*Completion Year:* ${yearOfCompletion}%0A*Preferred Country:* ${preferredCountry}%0A*Preferred Course:* ${preferredCourse}%0A*Additional Info:* ${additionalInfo || "N/A"}%0A*Consent:* ${consent === 'true' ? 'Yes' : 'No'}`;
    
//     // Fix WhatsApp number format - remove any spaces or special characters
//     const cleanWhatsappNumber = "919343369999"; // Remove + and spaces
//     const whatsappUrl = `https://wa.me/${cleanWhatsappNumber}?text=${message}`;
//     console.log("📱 WhatsApp message URL:", whatsappUrl);

//     // Send email notification for diploma application
//     try {
//       const diplomaEmailContent = `
// New Diploma Course Application from Xcel Global Services:

// Full Name: ${fullName}
// Email: ${email}
// Mobile: ${mobile}
// Current Qualification: ${currentQualification}
// Year of Completion: ${yearOfCompletion}
// Preferred Country: ${preferredCountry}
// Preferred Course: ${preferredCourse}
// Additional Information: ${additionalInfo || "N/A"}
// Document Uploaded: ${req.file ? 'Yes' : 'No'}
// Consent Given: ${consent === 'true' ? 'Yes' : 'No'}
// Page URL: ${pageUrl || "N/A"}
// Submission Date: ${new Date()}

// This is an automated message from the Xcel Global Services website.
//       `;

//       const diplomaMsg = {
//         to: 'sagiraju1770@gmail.com',
//         from: process.env.EMAIL_USER,
//         subject: 'New Diploma Course Application - Xcel Global Services',
//         text: diplomaEmailContent,
//       };

//       await sgMail.send(diplomaMsg);
//       console.log("✅ Diploma application email sent successfully!");
//     } catch (emailError) {
//       console.error("❌ Error sending diploma application email:", emailError);
//       // Don't fail the request if email fails
//     }

//     res.json({
//       message: "✅ Application submitted successfully",
//       id: savedApplication._id,
//       whatsappUrl: whatsappUrl
//     });
//   } catch (err) {
//     console.error("❌ Error submitting diploma application:", err);
//     res.status(500).json({ error: "❌ Server error" });
//   }
// });

// // 4️⃣ Health check endpoint
// app.get("/api/health", (req, res) => {
//   res.json({ 
//     status: 'OK', 
//     environment: process.env.NODE_ENV || 'development',
//     emailConfigured: !!(process.env.EMAIL_USER && process.env.SENDGRID_API_KEY),
//     timestamp: new Date().toISOString()
//   });
// });

// // 5️⃣ JSON Data API Routes
// const readJSONFile = (filePath) => {
//   try {
//     if (fs.existsSync(filePath)) {
//       const data = fs.readFileSync(filePath, 'utf8');
//       return JSON.parse(data);
//     }
//     return null;
//   } catch (error) {
//     console.error(`Error reading ${filePath}:`, error);
//     return null;
//   }
// };

// // Service categories
// app.get("/api/service-categories", (req, res) => {
//   const filePath = process.env.NODE_ENV === 'production'
//     ? path.join(__dirname, '../client/dist/data/service-categories.json')
//     : path.join(__dirname, '../client/public/data/service-categories.json');
  
//   const data = readJSONFile(filePath);
//   if (data) {
//     res.json(data);
//   } else {
//     res.status(500).json({ error: 'Failed to load service categories' });
//   }
// });

// // All services
// app.get("/api/services", (req, res) => {
//   const filePath = process.env.NODE_ENV === 'production'
//     ? path.join(__dirname, '../client/dist/data/services.json')
//     : path.join(__dirname, '../client/public/data/services.json');
  
//   const data = readJSONFile(filePath);
//   if (data) {
//     res.json(data);
//   } else {
//     res.status(500).json({ error: 'Failed to load services' });
//   }
// });

// // Service by slug
// app.get("/api/services/:slug", (req, res) => {
//   const filePath = process.env.NODE_ENV === 'production'
//     ? path.join(__dirname, '../client/dist/data/service-categories.json')
//     : path.join(__dirname, '../client/public/data/service-categories.json');
  
//   const data = readJSONFile(filePath);
//   if (data) {
//     const service = data.find(s => s.slug === req.params.slug);
//     if (service) {
//       res.json(service);
//     } else {
//       res.status(404).json({ error: 'Service not found' });
//     }
//   } else {
//     res.status(500).json({ error: 'Failed to load service data' });
//   }
// });

// // 6️⃣ Serve uploaded files
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // ================= START SERVER =================
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
//   console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
//   console.log(`🔧 API available at http://localhost:${PORT}/api`);
//   console.log(`📧 SendGrid configured: ${!!(process.env.EMAIL_USER && process.env.SENDGRID_API_KEY)}`);
//   console.log(`🎓 Diploma application endpoint: POST http://localhost:${PORT}/api/diploma-application`);
//   console.log(`📊 Excel files location: ${__dirname}`);
// });


const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");
const sgMail = require('@sendgrid/mail');
const multer = require('multer');
require("dotenv").config();

// ================= APP SETUP =================
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ================= MULTER SETUP FOR FILE UPLOADS =================
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, 'uploads/');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf|doc|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only PDF, DOC, DOCX, JPG, and PNG files are allowed'));
    }
  }
});

// ================= SENDGRID SETUP =================
console.log("📧 SendGrid configuration check:");
console.log("   Email User:", process.env.EMAIL_USER ? "✅ Set" : "❌ Not set");
console.log("   SendGrid API Key exists:", !!process.env.SENDGRID_API_KEY);

if (process.env.SENDGRID_API_KEY) {
  const cleanKey = process.env.SENDGRID_API_KEY.trim();
  sgMail.setApiKey(cleanKey);
  console.log("✅ SendGrid API Key set (trimmed)");
}

// ================= MONGODB CONNECTION =================
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://varsha:varsha@backend.rravwpl.mongodb.net/ausexcelDB";

console.log("🔧 Connecting to MongoDB...");
mongoose
  .connect(MONGODB_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// ================= MONGOOSE SCHEMAS =================
const submissionSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  email: String,
  lookingFor: String,
  country: String,
  comments: String,
  scheduleDate: String,
  scheduleTime: String,
  pageUrl: String,
  studentInsurance: { type: Boolean, default: false },
  studentAccommodation: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Submission = mongoose.model("Submission", submissionSchema);

const diplomaApplicationSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  mobile: String,
  currentQualification: String,
  yearOfCompletion: String,
  preferredCountry: String,
  preferredCourse: String,
  additionalInfo: String,
  documentPath: String,
  consent: Boolean,
  pageUrl: String,
  formType: String,
  createdAt: { type: Date, default: Date.now },
});

const DiplomaApplication = mongoose.model("DiplomaApplication", diplomaApplicationSchema);

// ================= EXCEL FILE SETUP =================
// Function to ensure Excel file exists and is properly formatted
const ensureExcelFile = (filePath, sheetName) => {
  try {
    if (!fs.existsSync(filePath)) {
      console.log(`📁 Creating new Excel file: ${filePath}`);
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet([]);
      XLSX.utils.book_append_sheet(wb, ws, sheetName);
      
      // Create directory if it doesn't exist
      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      XLSX.writeFile(wb, filePath);
      console.log(`✅ Excel file created: ${filePath}`);
    } else {
      console.log(`✅ Excel file exists: ${filePath}`);
      
      // Ensure the sheet exists in the file
      const wb = XLSX.readFile(filePath);
      if (!wb.SheetNames.includes(sheetName)) {
        console.log(`📊 Adding missing sheet '${sheetName}' to ${filePath}`);
        const newWs = XLSX.utils.json_to_sheet([]);
        XLSX.utils.book_append_sheet(wb, newWs, sheetName);
        XLSX.writeFile(wb, filePath);
        console.log(`✅ Sheet '${sheetName}' added to ${filePath}`);
      }
    }
  } catch (error) {
    console.error(`❌ Error ensuring Excel file ${filePath}:`, error);
    console.error(`❌ Error details:`, error.message);
  }
};

// Define Excel file paths
const excelFile = path.join(__dirname, "submissions.xlsx");
const diplomaExcelFile = path.join(__dirname, "diploma-applications.xlsx");

// Ensure Excel files exist
ensureExcelFile(excelFile, "Submissions");
ensureExcelFile(diplomaExcelFile, "DiplomaApplications");

// Test file permissions
console.log("📁 Current directory:", __dirname);
console.log("📁 Excel file path:", excelFile);
console.log("📁 Diploma Excel file path:", diplomaExcelFile);

try {
  fs.accessSync(excelFile, fs.constants.W_OK);
  console.log("✅ Write permission granted for Excel file");
} catch (err) {
  console.log("❌ No write permission for Excel file:", err.message);
}

// ================= API ROUTES =================

// 1️⃣ Save form submission (Home page form & Book for Free Demo) - FIXED EXCEL SAVING
app.post("/api/submit", async (req, res) => {
  const { 
    name, mobile, email, lookingFor, country, comments, 
    scheduleDate, scheduleTime, pageUrl, 
    studentInsurance, studentAccommodation 
  } = req.body;

  console.log("📝 Form submission received:", { 
    name, email, lookingFor, 
    studentInsurance, studentAccommodation 
  });

  // Enhanced validation for Other Services
  if (lookingFor === "Other Services") {
    if (!studentInsurance && !studentAccommodation && !comments) {
      return res.status(400).json({ error: "❌ Please select at least one service or provide comments for Other Services" });
    }
  } else {
    // Original validation for other types
    if (!name || !mobile || !email || !lookingFor || !country) {
      return res.status(400).json({ error: "❌ All required fields must be filled" });
    }
  }

  try {
    // Save in MongoDB
    const newSubmission = new Submission({
      name,
      mobile,
      email,
      lookingFor,
      country,
      comments,
      scheduleDate: scheduleDate || "",
      scheduleTime: scheduleTime || "",
      pageUrl,
      studentInsurance: studentInsurance || false,
      studentAccommodation: studentAccommodation || false,
    });
    const savedSubmission = await newSubmission.save();

    console.log("✅ Submission saved to MongoDB:", savedSubmission._id);

    // Save in Excel - FIXED VERSION
    try {
      let wb;
      let data = [];
      const filePath = excelFile;
      
      console.log("📊 Attempting to save to Excel file:", filePath);
      
      // Check if file exists and read it
      if (fs.existsSync(filePath)) {
        console.log("📁 Excel file exists, reading...");
        wb = XLSX.readFile(filePath);
        
        if (wb.SheetNames.includes("Submissions")) {
          const ws = wb.Sheets["Submissions"];
          data = XLSX.utils.sheet_to_json(ws);
          console.log(`📊 Read ${data.length} existing records from Excel`);
        } else {
          console.log("❌ Submissions sheet not found, creating it...");
          const newWs = XLSX.utils.json_to_sheet([]);
          XLSX.utils.book_append_sheet(wb, newWs, "Submissions");
        }
      } else {
        console.log("❌ Excel file not found, creating new workbook...");
        wb = XLSX.utils.book_new();
        const newWs = XLSX.utils.json_to_sheet([]);
        XLSX.utils.book_append_sheet(wb, newWs, "Submissions");
      }

      // Add new submission data
      const newRecord = {
        "Name": name || "",
        "Mobile": mobile || "",
        "Email": email || "",
        "Looking For": lookingFor || "",
        "Country": country || "",
        "Comments": comments || "",
        "Schedule Date": scheduleDate || "",
        "Schedule Time": scheduleTime || "",
        "Student Insurance": studentInsurance ? 'Yes' : 'No',
        "Student Accommodation": studentAccommodation ? 'Yes' : 'No',
        "Page URL": pageUrl || "",
        "Submission Date": new Date().toLocaleString(),
        "MongoDB ID": savedSubmission._id.toString()
      };

      console.log("📝 Adding new record to Excel:", newRecord);
      
      data.push(newRecord);

      // Update the worksheet
      const newWs = XLSX.utils.json_to_sheet(data);
      wb.Sheets["Submissions"] = newWs;
      
      // Write the file
      XLSX.writeFile(wb, filePath);
      console.log("✅ Successfully saved to Excel file");
      
      // Verify the write
      if (fs.existsSync(filePath)) {
        const verifyWb = XLSX.readFile(filePath);
        const verifyWs = verifyWb.Sheets["Submissions"];
        const verifyData = XLSX.utils.sheet_to_json(verifyWs);
        console.log(`✅ Verification: Excel file now has ${verifyData.length} records`);
      }
      
    } catch (excelError) {
      console.error("❌ Error saving to Excel:", excelError);
      console.error("❌ Excel error details:", excelError.message);
      // Don't fail the request if Excel fails
    }
    
    res.json({
      message: "✅ Submission saved successfully",
      id: savedSubmission._id,
    });
  } catch (err) {
    console.error("❌ Error submitting form:", err);
    res.status(500).json({ error: "❌ Server error" });
  }
});

// 2️⃣ Send email by submission ID
app.get("/api/send-email/:id", async (req, res) => {
  console.log("📧 Email endpoint called with ID:", req.params.id);

  try {
    const submission = await Submission.findById(req.params.id);
    if (!submission) {
      console.log("❌ Submission not found for ID:", req.params.id);
      return res.status(404).json({ error: "Submission not found" });
    }

    console.log("✅ Found submission:", submission.name, submission.email);

    const isDemoRequest = submission.lookingFor && submission.lookingFor.includes("Training Demo");

    let emailContent = '';

    if (isDemoRequest) {
      emailContent = `
New Training Demo Request from Xcel Global Services:

Name: ${submission.name}
Mobile: ${submission.mobile}
Email: ${submission.email}
Comments: ${submission.comments || "N/A"}
Schedule Date: ${submission.scheduleDate || "N/A"}
Schedule Time: ${submission.scheduleTime || "N/A"}
Page URL: ${submission.pageUrl || "N/A"}
Submission Date: ${submission.createdAt}

This is an automated message from the Xcel Global Services website.
      `;
    } else {
      emailContent = `
New Consultation Request from Xcel Global Services:

Name: ${submission.name}
Mobile: ${submission.mobile}
Email: ${submission.email}
Looking For: ${submission.lookingFor}
Country: ${submission.country}
${submission.lookingFor === "Other Services" ? 
  `Student Insurance: ${submission.studentInsurance ? 'Yes' : 'No'}
Student Accommodation: ${submission.studentAccommodation ? 'Yes' : 'No'}` : ''}
Comments: ${submission.comments || "N/A"}
Schedule Date: ${submission.scheduleDate || "N/A"}
Schedule Time: ${submission.scheduleTime || "N/A"}
Page URL: ${submission.pageUrl || "N/A"}
Submission Date: ${submission.createdAt}

This is an automated message from the Xcel Global Services website.
      `;
    }

    console.log("📤 Attempting to send email via SendGrid API...");

    const msg = {
      to: 'sagiraju1770@gmail.com',
      from: process.env.EMAIL_USER,
      subject: isDemoRequest ? 'New Training Demo Request - Xcel Global Services' : 'New Consultation Request - Xcel Global Services',
      text: emailContent,
    };

    await sgMail.send(msg);
    console.log("✅ Email sent successfully via SendGrid API!");
    
    res.json({ message: "📧 Email sent successfully" });
    
  } catch (err) {
    console.error("❌ Error sending email:", err);
    
    if (err.response) {
      console.error("❌ SendGrid API error details:", err.response.body);
    }
    
    res.status(500).json({ 
      error: "Failed to send email",
      details: err.message 
    });
  }
});

// 3️⃣ Diploma Application Endpoint
app.post("/api/diploma-application", upload.single('document'), async (req, res) => {
  const { 
    fullName, email, mobile, currentQualification, yearOfCompletion,
    preferredCountry, preferredCourse, additionalInfo, consent, pageUrl, formType
  } = req.body;

  console.log("🎓 Diploma application received:", { 
    fullName, email, preferredCountry, preferredCourse 
  });

  // Validation
  if (!fullName || !email || !mobile || !currentQualification || !yearOfCompletion || 
      !preferredCountry || !preferredCourse || !consent) {
    return res.status(400).json({ error: "❌ All required fields must be filled" });
  }

  try {
    // Save to MongoDB
    const newApplication = new DiplomaApplication({
      fullName,
      email,
      mobile,
      currentQualification,
      yearOfCompletion,
      preferredCountry,
      preferredCourse,
      additionalInfo: additionalInfo || "",
      documentPath: req.file ? req.file.path : "",
      consent: consent === 'true',
      pageUrl,
      formType
    });
    const savedApplication = await newApplication.save();

    console.log("✅ Diploma application saved to MongoDB:", savedApplication._id);

    // Save to Excel
    try {
      let wb;
      let data = [];
      const filePath = diplomaExcelFile;
      
      console.log("📊 Attempting to save diploma application to Excel:", filePath);
      
      if (fs.existsSync(filePath)) {
        wb = XLSX.readFile(filePath);
        if (wb.SheetNames.includes("DiplomaApplications")) {
          const ws = wb.Sheets["DiplomaApplications"];
          data = XLSX.utils.sheet_to_json(ws);
          console.log(`📊 Read ${data.length} existing records from diploma applications Excel`);
        } else {
          console.log("❌ DiplomaApplications sheet not found, creating it...");
          const newWs = XLSX.utils.json_to_sheet([]);
          XLSX.utils.book_append_sheet(wb, newWs, "DiplomaApplications");
        }
      } else {
        console.log("❌ Diploma applications Excel file not found, creating new...");
        wb = XLSX.utils.book_new();
        const newWs = XLSX.utils.json_to_sheet([]);
        XLSX.utils.book_append_sheet(wb, newWs, "DiplomaApplications");
      }

      // Add new diploma application data
      const newRecord = {
        "Full Name": fullName,
        "Email": email,
        "Mobile": mobile,
        "Current Qualification": currentQualification,
        "Year of Completion": yearOfCompletion,
        "Preferred Country": preferredCountry,
        "Preferred Course": preferredCourse,
        "Additional Info": additionalInfo || "",
        "Document Uploaded": req.file ? 'Yes' : 'No',
        "Consent Given": consent === 'true' ? 'Yes' : 'No',
        "Page URL": pageUrl || "",
        "Submission Date": new Date().toLocaleString(),
        "MongoDB ID": savedApplication._id.toString()
      };

      console.log("📝 Adding new diploma record to Excel:", newRecord);
      
      data.push(newRecord);

      const newWs = XLSX.utils.json_to_sheet(data);
      wb.Sheets["DiplomaApplications"] = newWs;
      XLSX.writeFile(wb, filePath);
      console.log("✅ Diploma application saved to Excel file: diploma-applications.xlsx");
      
      // Verify the write
      if (fs.existsSync(filePath)) {
        const verifyWb = XLSX.readFile(filePath);
        const verifyWs = verifyWb.Sheets["DiplomaApplications"];
        const verifyData = XLSX.utils.sheet_to_json(verifyWs);
        console.log(`✅ Verification: Diploma Excel file now has ${verifyData.length} records`);
      }
      
    } catch (excelError) {
      console.error("❌ Error saving diploma application to Excel:", excelError);
      console.error("❌ Excel error details:", excelError.message);
      // Don't fail the request if Excel fails
    }

    // Send WhatsApp message with proper number format
    const message = `New Diploma Course Application:%0A%0A*Name:* ${fullName}%0A*Email:* ${email}%0A*Mobile:* ${mobile}%0A*Qualification:* ${currentQualification}%0A*Completion Year:* ${yearOfCompletion}%0A*Preferred Country:* ${preferredCountry}%0A*Preferred Course:* ${preferredCourse}%0A*Additional Info:* ${additionalInfo || "N/A"}%0A*Consent:* ${consent === 'true' ? 'Yes' : 'No'}`;
    
    // Fix WhatsApp number format - remove any spaces or special characters
    const cleanWhatsappNumber = "919343369999"; // Remove + and spaces
    const whatsappUrl = `https://wa.me/${cleanWhatsappNumber}?text=${message}`;
    console.log("📱 WhatsApp message URL:", whatsappUrl);

    // Send email notification for diploma application
    try {
      const diplomaEmailContent = `
New Diploma Course Application from Xcel Global Services:

Full Name: ${fullName}
Email: ${email}
Mobile: ${mobile}
Current Qualification: ${currentQualification}
Year of Completion: ${yearOfCompletion}
Preferred Country: ${preferredCountry}
Preferred Course: ${preferredCourse}
Additional Information: ${additionalInfo || "N/A"}
Document Uploaded: ${req.file ? 'Yes' : 'No'}
Consent Given: ${consent === 'true' ? 'Yes' : 'No'}
Page URL: ${pageUrl || "N/A"}
Submission Date: ${new Date()}

This is an automated message from the Xcel Global Services website.
      `;

      const diplomaMsg = {
        to: 'sagiraju1770@gmail.com',
        from: process.env.EMAIL_USER,
        subject: 'New Diploma Course Application - Xcel Global Services',
        text: diplomaEmailContent,
      };

      await sgMail.send(diplomaMsg);
      console.log("✅ Diploma application email sent successfully!");
    } catch (emailError) {
      console.error("❌ Error sending diploma application email:", emailError);
      // Don't fail the request if email fails
    }

    res.json({
      message: "✅ Application submitted successfully",
      id: savedApplication._id,
      whatsappUrl: whatsappUrl
    });
  } catch (err) {
    console.error("❌ Error submitting diploma application:", err);
    res.status(500).json({ error: "❌ Server error" });
  }
});

// 4️⃣ Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ 
    status: 'OK', 
    environment: process.env.NODE_ENV || 'development',
    emailConfigured: !!(process.env.EMAIL_USER && process.env.SENDGRID_API_KEY),
    timestamp: new Date().toISOString()
  });
});

// 5️⃣ Test Excel functionality endpoint
app.get("/api/test-excel", (req, res) => {
  try {
    const filePath = excelFile;
    console.log("🧪 Testing Excel functionality...");
    
    if (fs.existsSync(filePath)) {
      const wb = XLSX.readFile(filePath);
      const ws = wb.Sheets["Submissions"];
      const data = XLSX.utils.sheet_to_json(ws);
      
      // Add a test record
      const testRecord = {
        "Name": "Test User",
        "Mobile": "1234567890",
        "Email": "test@test.com",
        "Looking For": "Test Service",
        "Country": "Test Country",
        "Comments": "Test comment",
        "Submission Date": new Date().toLocaleString(),
        "Test": "YES"
      };
      
      data.push(testRecord);
      const newWs = XLSX.utils.json_to_sheet(data);
      wb.Sheets["Submissions"] = newWs;
      XLSX.writeFile(wb, filePath);
      
      res.json({ 
        message: "✅ Excel test successful", 
        records: data.length,
        filePath: filePath
      });
    } else {
      res.status(500).json({ error: "Excel file not found" });
    }
  } catch (error) {
    console.error("❌ Excel test failed:", error);
    res.status(500).json({ error: "Excel test failed: " + error.message });
  }
});

// 6️⃣ JSON Data API Routes
const readJSONFile = (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    }
    return null;
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return null;
  }
};

// Service categories
app.get("/api/service-categories", (req, res) => {
  const filePath = process.env.NODE_ENV === 'production'
    ? path.join(__dirname, '../client/dist/data/service-categories.json')
    : path.join(__dirname, '../client/public/data/service-categories.json');
  
  const data = readJSONFile(filePath);
  if (data) {
    res.json(data);
  } else {
    res.status(500).json({ error: 'Failed to load service categories' });
  }
});

// All services
app.get("/api/services", (req, res) => {
  const filePath = process.env.NODE_ENV === 'production'
    ? path.join(__dirname, '../client/dist/data/services.json')
    : path.join(__dirname, '../client/public/data/services.json');
  
  const data = readJSONFile(filePath);
  if (data) {
    res.json(data);
  } else {
    res.status(500).json({ error: 'Failed to load services' });
  }
});

// Service by slug
app.get("/api/services/:slug", (req, res) => {
  const filePath = process.env.NODE_ENV === 'production'
    ? path.join(__dirname, '../client/dist/data/service-categories.json')
    : path.join(__dirname, '../client/public/data/service-categories.json');
  
  const data = readJSONFile(filePath);
  if (data) {
    const service = data.find(s => s.slug === req.params.slug);
    if (service) {
      res.json(service);
    } else {
      res.status(404).json({ error: 'Service not found' });
    }
  } else {
    res.status(500).json({ error: 'Failed to load service data' });
  }
});

// 7️⃣ Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ================= START SERVER =================
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔧 API available at http://localhost:${PORT}/api`);
  console.log(`📧 SendGrid configured: ${!!(process.env.EMAIL_USER && process.env.SENDGRID_API_KEY)}`);
  console.log(`🎓 Diploma application endpoint: POST http://localhost:${PORT}/api/diploma-application`);
  console.log(`📝 Home page form endpoint: POST http://localhost:${PORT}/api/submit`);
  console.log(`🧪 Excel test endpoint: GET http://localhost:${PORT}/api/test-excel`);
  console.log(`📊 Submissions Excel file: ${excelFile}`);
  console.log(`📊 Diploma Applications Excel file: ${diplomaExcelFile}`);
});
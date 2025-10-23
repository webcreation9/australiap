
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const XLSX = require("xlsx");
// const fs = require("fs");
// const path = require("path");
// const sgMail = require('@sendgrid/mail'); // ✅ Added SendGrid
// require("dotenv").config();

// // ================= APP SETUP =================
// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// // ================= SENDGRID SETUP =================
// // console.log("📧 SendGrid configuration check:");
// // console.log("   Email User:", process.env.EMAIL_USER ? "✅ Set" : "❌ Not set");
// // console.log("   SendGrid API Key:", process.env.SENDGRID_API_KEY ? "✅ Set" : "❌ Not set");

// // // Set SendGrid API key
// // sgMail.setApiKey(process.env.SENDGRID_API_KEY);


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
//   const { name, mobile, email, lookingFor, country, comments, scheduleDate, scheduleTime, pageUrl } = req.body;

//   console.log("📝 Form submission received:", { name, email, lookingFor });

//   if (!name || !mobile || !email || !lookingFor || !country) {
//     return res.status(400).json({ error: "❌ All required fields must be filled" });
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

// // 2️⃣ Send email by submission ID - UPDATED WITH SENDGRID API
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

//     const emailContent = `
// New Consultation Request from Xcel Global Services:

// Name: ${submission.name}
// Mobile: ${submission.mobile}
// Email: ${submission.email}
// Looking For: ${submission.lookingFor}
// Country: ${submission.country}
// Comments: ${submission.comments || "N/A"}
// Schedule Date: ${submission.scheduleDate || "N/A"}
// Schedule Time: ${submission.scheduleTime || "N/A"}
// Page URL: ${submission.pageUrl || "N/A"}
// Submission Date: ${submission.createdAt}

// This is an automated message from the Xcel Global Services website.
//     `;

//     console.log("📤 Attempting to send email via SendGrid API...");

//     const msg = {
//       to: 'sagiraju1770@gmail.com',
//       from: process.env.EMAIL_USER, // Your verified email in SendGrid
//       subject: 'New Consultation Request - Xcel Global Services',
//       text: emailContent,
//     };

//     await sgMail.send(msg);
//     console.log("✅ Email sent successfully via SendGrid API!");
    
//     res.json({ message: "📧 Email sent successfully" });
    
//   } catch (err) {
//     console.error("❌ Error sending email:", err);
    
//     // Detailed error information
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
//     ? path.join(__dirname, '../client/dist/data/services.json')
//     : path.join(__dirname, '../client/public/data/services.json');
  
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
//     ? path.join(__dirname, '../client/dist/data/services-categories.json')
//     : path.join(__dirname, '../client/public/data/services-categories.json');
  
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
//     ? path.join(__dirname, '../client/dist/data/services-categories.json')
//     : path.join(__dirname, '../client/public/data/services-categories.json');
  
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

// // ================= STATIC FILE SERVING (PRODUCTION) =================
// // if (process.env.NODE_ENV === 'production') {
// //   app.use(express.static(path.join(__dirname, '../client/dist')));
  
// //   app.get('*', (req, res) => {
// //     if (!req.path.startsWith('/api/')) {
// //       res.sendFile(path.join(__dirname, '../client/dist/index.html'));
// //     }
// //   });
// // }

// // ================= START SERVER =================
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
//   console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
//   console.log(`🔧 API available at http://localhost:${PORT}/api`);
//   console.log(`📧 SendGrid configured: ${!!(process.env.EMAIL_USER && process.env.SENDGRID_API_KEY)}`);
// });





const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");
const sgMail = require('@sendgrid/mail');
require("dotenv").config();

// ================= APP SETUP =================
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ================= SENDGRID SETUP =================
console.log("📧 SendGrid configuration check:");
console.log("   Email User:", process.env.EMAIL_USER ? "✅ Set" : "❌ Not set");
console.log("   SendGrid API Key exists:", !!process.env.SENDGRID_API_KEY);

// DEBUG: Check API key format
if (process.env.SENDGRID_API_KEY) {
  const key = process.env.SENDGRID_API_KEY;
  console.log("   API Key length:", key.length);
  console.log("   Starts with SG.:", key.startsWith('SG.'));
  console.log("   First 10 chars:", key.substring(0, 10));
  console.log("   Last 10 chars:", key.substring(key.length - 10));
  
  // Check for invisible characters
  for (let i = 0; i < key.length; i++) {
    const char = key[i];
    if (char < ' ' || char > '~') {
      console.log(`   ❌ INVALID CHAR at position ${i}:`, char.charCodeAt(0));
    }
  }
}

// Set API key with trim to remove spaces
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

// ================= MONGOOSE SCHEMA =================
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

// ================= EXCEL FILE SETUP =================
const excelFile = path.join(__dirname, "submissions.xlsx");
if (!fs.existsSync(excelFile)) {
  const ws = XLSX.utils.json_to_sheet([]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Submissions");
  XLSX.writeFile(wb, excelFile);
}

// ================= API ROUTES =================

// 1️⃣ Save form submission
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

    // Save in Excel
    const wb = XLSX.readFile(excelFile);
    const ws = wb.Sheets["Submissions"];
    const data = XLSX.utils.sheet_to_json(ws);

    data.push({
      Name: name,
      Mobile: mobile,
      Email: email,
      LookingFor: lookingFor,
      Country: country,
      Comments: comments || "",
      ScheduleDate: scheduleDate || "",
      ScheduleTime: scheduleTime || "",
      StudentInsurance: studentInsurance ? 'Yes' : 'No',
      StudentAccommodation: studentAccommodation ? 'Yes' : 'No',
      PageUrl: pageUrl || "",
      Date: new Date().toLocaleString(),
    });

    const newWs = XLSX.utils.json_to_sheet(data);
    wb.Sheets["Submissions"] = newWs;
    XLSX.writeFile(wb, excelFile);

    console.log("✅ Submission saved to Excel");
    
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
  console.log("📧 Environment check - NODE_ENV:", process.env.NODE_ENV);
  console.log("📧 Email user configured:", !!process.env.EMAIL_USER);
  console.log("📧 SendGrid API configured:", !!process.env.SENDGRID_API_KEY);

  try {
    const submission = await Submission.findById(req.params.id);
    if (!submission) {
      console.log("❌ Submission not found for ID:", req.params.id);
      return res.status(404).json({ error: "Submission not found" });
    }

    console.log("✅ Found submission:", submission.name, submission.email);

    const emailContent = `
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

    console.log("📤 Attempting to send email via SendGrid API...");

    const msg = {
      to: 'sagiraju1770@gmail.com',
      from: process.env.EMAIL_USER,
      subject: 'New Consultation Request - Xcel Global Services',
      text: emailContent,
    };

    await sgMail.send(msg);
    console.log("✅ Email sent successfully via SendGrid API!");
    
    res.json({ message: "📧 Email sent successfully" });
    
  } catch (err) {
    console.error("❌ Error sending email:", err);
    
    // Detailed error information
    if (err.response) {
      console.error("❌ SendGrid API error details:", err.response.body);
    }
    
    res.status(500).json({ 
      error: "Failed to send email",
      details: err.message 
    });
  }
});

// 3️⃣ Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ 
    status: 'OK', 
    environment: process.env.NODE_ENV || 'development',
    emailConfigured: !!(process.env.EMAIL_USER && process.env.SENDGRID_API_KEY),
    timestamp: new Date().toISOString()
  });
});

// 4️⃣ JSON Data API Routes
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



// ================= START SERVER =================
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔧 API available at http://localhost:${PORT}/api`);
  console.log(`📧 SendGrid configured: ${!!(process.env.EMAIL_USER && process.env.SENDGRID_API_KEY)}`);
});
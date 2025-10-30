import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import "./DemoPage.css";

const DemoPage = () => {
  const location = useLocation();
  
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const [loading, setLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    course: "",
    demoType: "",
    scheduleDate: "",
    scheduleTime: "",
    additionalComments: ""
  });

  // Get course from URL parameters if coming from training service pages
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const courseFromUrl = searchParams.get('course');
    if (courseFromUrl) {
      setFormData(prev => ({ ...prev, course: courseFromUrl }));
    }
  }, [location]);

  // Time slots for scheduling
  const timeSlots = [
    "10:00 AM (AEST)", "10:30 AM (AEST)", 
    "11:00 AM (AEST)", "11:30 AM (AEST)", "12:00 PM (AEST)", "12:30 PM (AEST)", 
    "01:00 PM (AEST)", "01:30 PM (AEST)", "02:00 PM (AEST)", "02:30 PM (AEST)",
    "03:00 PM (AEST)", "03:30 PM (AEST)", "04:00 PM (AEST)", "04:30 PM (AEST)",
    "05:00 PM (AEST)", "05:30 PM (AEST)", "06:00 PM (AEST)"
  ];

  // Get tomorrow's date for min date
  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  // Handle form submission
  const handleSend = async (type) => {
    if (!formData.name || !formData.mobile || !formData.email || !formData.course || !formData.demoType) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);

    try {
      // Prepare the data for the backend
      const submissionData = {
        name: formData.name,
        mobile: formData.mobile,
        email: formData.email,
        lookingFor: `Training Demo - ${formData.course}`,
        country: "Training Demo",
        comments: `Course: ${formData.course}\nDemo Type: ${formData.demoType}\nAdditional Comments: ${formData.additionalComments || "N/A"}\nSchedule Date: ${formData.scheduleDate || "N/A"}\nSchedule Time: ${formData.scheduleTime || "N/A"}`,
        scheduleDate: formData.scheduleDate,
        scheduleTime: formData.scheduleTime,
        pageUrl: window.location.href,
            isDemoRequest: true 
      };

      // Save to MongoDB and Excel
      const submitResponse = await fetch(`${API_URL}/api/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
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
        
        alert("✅ Demo request submitted and email sent successfully!");
      } else if (type === "whatsapp") {
        // Send WhatsApp message
        const message = `New Training Demo Request:%0A%0A*Name:* ${formData.name}%0A*Mobile:* ${formData.mobile}%0A*Email:* ${formData.email}%0A*Course:* ${formData.course}%0A*Demo Type:* ${formData.demoType}%0A*Schedule Date:* ${formData.scheduleDate || "Not specified"}%0A*Schedule Time:* ${formData.scheduleTime || "Not specified"}%0A*Additional Comments:* ${formData.additionalComments || "N/A"}`;
        
        const whatsappUrl = `https://wa.me/918247674438?text=${message}`;
        window.open(whatsappUrl, "_blank");
        
        alert("✅ Demo request submitted and WhatsApp message prepared!");
      }

      setFormSubmitted(true);
      setTimeout(() => {
        setFormData({
          name: "",
          mobile: "",
          email: "",
          course: "",
          demoType: "",
          scheduleDate: "",
          scheduleTime: "",
          additionalComments: ""
        });
        setFormSubmitted(false);
      }, 3000);

    } catch (error) {
      console.error("Error:", error);
      alert("❌ Error submitting demo request: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="demo-page">
      <header className="demo-header text-center">
        <h1 className="header-title">Book a Free Demo</h1>
        <div className="header-subtitle">Experience our training with a free demo session</div>
      </header>

      <Container className="demo-main">
        <Row className="gx-5 gy-5 justify-content-center">
          <Col lg={8}>
            <div className="demo-form-container">
              <Form>
                {/* Name */}
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label> Name *</Form.Label>
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
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </Form.Group>

                {/* Course */}
                <Form.Group className="mb-3" controlId="formCourse">
                  <Form.Label>Course *</Form.Label>
                  <Form.Select
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                    required
                  >
                    <option value="" disabled>Select a course</option>
                    <option value="IELTS">IELTS Coaching</option>
                    <option value="PTE">PTE Coaching</option>
                    <option value="SAT">SAT Coaching</option>
                    <option value="Language Certification">Language Cert</option>
                    <option value="Duolingo">Duolingo Coaching</option>
                    <option value="TOEFL">TOEFL Coaching</option>
                    <option value="GRE">GRE Coaching</option>
                    {/* <option value="GMAT">GMAT Coaching</option> */}
                  </Form.Select>
                </Form.Group>

                {/* Demo Type */}
                <Form.Group className="mb-3" controlId="formDemoType">
                  <Form.Label>Demo Type *</Form.Label>
                  <Form.Select
                    value={formData.demoType}
                    onChange={(e) => setFormData({ ...formData, demoType: e.target.value })}
                    required
                  >
                    <option value="" disabled>Select demo type</option>
                    <option value="Online Training">Online Training</option>
                    <option value="Offline Training">Offline Training</option>
                  </Form.Select>
                </Form.Group>

                {/* Schedule Date */}
                <Form.Group className="mb-3" controlId="formScheduleDate">
                  <Form.Label>Preferred Date for Demo</Form.Label>
                  <Form.Control
                    type="date"
                    min={getTomorrowDate()}
                    value={formData.scheduleDate}
                    onChange={(e) => setFormData({ ...formData, scheduleDate: e.target.value })}
                  />
                </Form.Group>

                {/* Schedule Time */}
                <Form.Group className="mb-3" controlId="formScheduleTime">
                  <Form.Label>Preferred Time for Demo</Form.Label>
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
                    ⏰ Please select the suitable time for the demo
                  </Form.Text>
                </Form.Group>

                {/* Additional Comments */}
                <Form.Group className="mb-3" controlId="formAdditionalComments">
                  <Form.Label>Additional Comments</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter any additional information or specific requirements..."
                    value={formData.additionalComments}
                    onChange={(e) => setFormData({ ...formData, additionalComments: e.target.value })}
                  />
                </Form.Group>

                {/* Success Message */}
                {formSubmitted && (
                  <div className="alert alert-success text-center mb-3">
                    ✅ Demo request submitted successfully! We'll contact you soon.
                  </div>
                )}

                {/* Buttons */}
                <div className="d-flex justify-content-center gap-3 mt-4">
                  <Button
                    variant="primary"
                    onClick={() => handleSend("email")}
                    disabled={loading}
                    className="d-flex align-items-center gap-2 px-4 py-2"
                  >
                    {loading ? "⏳" : "📧"} Submit via Email
                  </Button>

                  <Button
                    variant="success"
                    onClick={() => handleSend("whatsapp")}
                    disabled={loading}
                    className="d-flex align-items-center gap-2 px-4 py-2"
                  >
                    {loading ? "⏳" : "💬"} Submit via WhatsApp
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DemoPage;
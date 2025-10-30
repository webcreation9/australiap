import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert, Card } from "react-bootstrap";
import "./ApplyForDiplomaCourses.css";

const ApplyForDiplomaCourses = () => {
//   const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const API_URL = "http://localhost:5000";
  
  
  const [loading, setLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    currentQualification: "",
    yearOfCompletion: "",
    preferredCountry: "",
    preferredCourse: "",
    additionalInfo: "",
    document: null,
    consent: false
  });

  const qualifications = [
    "Intermediate",
    "Polytechnic", 
    "Graduate",
    "Postgraduate"
  ];

  const years = ["2025", "2024", "2023", "2022"];
  const countries = ["Australia", "UK", "Ireland", "Germany"];

  const handleFileChange = (e) => {
    setFormData({ ...formData, document: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.consent) {
      alert("Please agree to be contacted by Xcel Global Services");
      return;
    }

    if (!formData.fullName || !formData.email || !formData.mobile || !formData.currentQualification || 
        !formData.yearOfCompletion || !formData.preferredCountry || !formData.preferredCourse) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);

    try {
      // Prepare form data for submission
      const submissionData = new FormData();
      submissionData.append("fullName", formData.fullName);
      submissionData.append("email", formData.email);
      submissionData.append("mobile", formData.mobile);
      submissionData.append("currentQualification", formData.currentQualification);
      submissionData.append("yearOfCompletion", formData.yearOfCompletion);
      submissionData.append("preferredCountry", formData.preferredCountry);
      submissionData.append("preferredCourse", formData.preferredCourse);
      submissionData.append("additionalInfo", formData.additionalInfo);
      submissionData.append("consent", formData.consent);
      submissionData.append("pageUrl", window.location.href);
      submissionData.append("formType", "diploma-courses");
      
      if (formData.document) {
        submissionData.append("document", formData.document);
      }

      // Submit to backend
      const response = await fetch(`${API_URL}/api/diploma-application`, {
        method: "POST",
        body: submissionData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error);
      }

      setFormSubmitted(true);

      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          fullName: "",
          email: "",
          mobile: "",
          currentQualification: "",
          yearOfCompletion: "",
          preferredCountry: "",
          preferredCourse: "",
          additionalInfo: "",
          document: null,
          consent: false
        });
      }, 3000);

    } catch (error) {
      console.error("Error submitting form:", error);
      alert("❌ Error submitting application: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="diploma-application-page">
      <header className="diploma-header text-center">
        <h1 className="header-title">Apply For Diploma Courses</h1>
        <div className="header-subtitle">Start your international education journey with us</div>
      </header>

      <Container className="diploma-main">
        <Row className="justify-content-center">
          <Col lg={8}>
            <Card className="diploma-form-card shadow">
              <Card.Body>
                {formSubmitted ? (
                  <div className="text-center py-5">
                    <div className="success-icon">✅</div>
                    <h3 className="text-success mb-3">Thank You!</h3>
                    <p className="mb-3">
                      Thank you for contacting Xcel Global Services. Our team will reach out to you shortly.
                    </p>
                    <div className="whatsapp-contact mt-4">
                      <h5>Contact us on WhatsApp:</h5>
                       <a 
    href="https://wa.me/919343369999" 
    target="_blank" 
    rel="noopener noreferrer"
    className="whatsapp-link"
    style={{ 
      color: '#25D366', 
      textDecoration: 'none', 
      fontWeight: 'bold',
      fontSize: '1.1rem'
    }}
  >
    +91 93433 69999
  </a>
                      {/* <p className="whatsapp-number">+91 93433 69999</p> */}
                    </div>
                  </div>
                ) : (
                  <Form onSubmit={handleSubmit}>
                    {/* Full Name */}
                    <Form.Group className="mb-3" controlId="formFullName">
                      <Form.Label>Full Name *</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        required
                      />
                    </Form.Group>

                    {/* Email Address */}
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

                    {/* Mobile Number */}
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

                    {/* Current Qualification */}
                    <Form.Group className="mb-3" controlId="formQualification">
                      <Form.Label>Current Qualification *</Form.Label>
                      <Form.Select
                        value={formData.currentQualification}
                        onChange={(e) => setFormData({ ...formData, currentQualification: e.target.value })}
                        required
                      >
                        <option value="" disabled>Select your qualification</option>
                        {qualifications.map((qual, index) => (
                          <option key={index} value={qual}>{qual}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>

                    {/* Year of Completion */}
                    <Form.Group className="mb-3" controlId="formCompletionYear">
                      <Form.Label>Year of Completion *</Form.Label>
                      <Form.Select
                        value={formData.yearOfCompletion}
                        onChange={(e) => setFormData({ ...formData, yearOfCompletion: e.target.value })}
                        required
                      >
                        <option value="" disabled>Select year of completion</option>
                        {years.map((year, index) => (
                          <option key={index} value={year}>{year}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>

                    {/* Preferred Country */}
                    <Form.Group className="mb-3" controlId="formCountry">
                      <Form.Label>Preferred Country *</Form.Label>
                      <Form.Select
                        value={formData.preferredCountry}
                        onChange={(e) => setFormData({ ...formData, preferredCountry: e.target.value })}
                        required
                      >
                        <option value="" disabled>Select preferred country</option>
                        {countries.map((country, index) => (
                          <option key={index} value={country}>{country}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>

                    {/* Preferred Course */}
                    <Form.Group className="mb-3" controlId="formCourse">
                      <Form.Label>Preferred Course *</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter your preferred course"
                        value={formData.preferredCourse}
                        onChange={(e) => setFormData({ ...formData, preferredCourse: e.target.value })}
                        required
                      />
                    </Form.Group>

                    {/* Additional Information */}
                    <Form.Group className="mb-3" controlId="formAdditionalInfo">
                      <Form.Label>Additional Information</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Any additional information or queries..."
                        value={formData.additionalInfo}
                        onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                      />
                    </Form.Group>

                    {/* Upload Document */}
                    <Form.Group className="mb-3" controlId="formDocument">
                      <Form.Label>Upload Document (Optional)</Form.Label>
                      <Form.Control
                        type="file"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      />
                      <Form.Text className="text-muted">
                        Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 5MB)
                      </Form.Text>
                    </Form.Group>

                    {/* Consent Checkbox */}
                    <Form.Group className="mb-4" controlId="formConsent">
                      <Form.Check
                        type="checkbox"
                        label="I agree to be contacted by Xcel Global Services for study abroad guidance"
                        checked={formData.consent}
                        onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                        required
                      />
                    </Form.Group>

                    {/* Submit Button */}
                    <div className="text-center">
                      <Button
                        variant="primary"
                        type="submit"
                        disabled={loading}
                        className="submit-btn px-5 py-2"
                      >
                        {loading ? "Submitting..." : "Submit Application"}
                      </Button>
                    </div>
                  </Form>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ApplyForDiplomaCourses;




// import React, { useEffect, useState } from "react";
// import { Container, Row, Col, Image } from "react-bootstrap";
// import parse from "html-react-parser";
// import { useParams } from "react-router-dom";
// import "./ServicePage.css";

// const ServicePage = () => {
//   const { slug } = useParams();
//   const [service, setService] = useState(null);
//   const [loading, setLoading] = useState(true);

//   function capitalizeWords(str) {
//     if (!str) return "";
//     return str.replace(/\b\w/g, char => char.toUpperCase());
//   }

//   useEffect(() => {
//     const fetchServiceData = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch("/data/service-categories.json");
//         const data = await response.json();
        
//         let foundService = null;

//         // Simply find by slug for all routes
//         if (slug) {
//           foundService = data.find(item => item.slug === slug);
//         }

//         setService(foundService);
//       } catch (err) {
//         console.error("Error fetching service data:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchServiceData();
//   }, [slug]);

//   if (loading) {
//     return (
//       <div className="service-info-section">
//         <Container>
//           <div className="text-center py-5">
//             <h4>Loading...</h4>
//           </div>
//         </Container>
//       </div>
//     );
//   }

//   if (!service) {
//     return (
//       <div className="service-info-section">
//         <Container>
//           <div className="text-center py-5">
//             <h4>Service not found</h4>
//             <p>The requested service could not be loaded.</p>
//             <p>Slug: {slug}</p>
//           </div>
//         </Container>
//       </div>
//     );
//   }

//   return (
//     <div className="service-info-section">
//       <header className="contact-header text-center">
//         <h1 className="header-title">{capitalizeWords(service.title)}</h1>
//       </header>
//       <Container>
//         <Row className="align-items-start">
//           <Col md={3} className="mb-4 mb-md-0 text-center">
//             <Image
//               src={service.img}
//               alt={service.title}
//               className="service-image shadow rounded"
//               fluid
//               onError={(e) => {
//                 e.target.src = "https://via.placeholder.com/300x200?text=Image+Not+Found";
//               }}
//             />
//           </Col>

//           <Col md={9}>
//             <div className="service-content text-justify">
//               {parse(service.description)}
//             </div>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default ServicePage;
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image, Accordion, Button } from "react-bootstrap"; // Added Button
import parse from "html-react-parser";
import { useParams, useNavigate } from "react-router-dom";
import "./ServicePage.css";

const ServicePage = () => {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  function capitalizeWords(str) {
    if (!str) return "";
    return str.replace(/\b\w/g, char => char.toUpperCase());
  }

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/data/service-categories.json");
        const data = await response.json();
        
        let foundService = null;
        if (slug) {
          foundService = data.find(item => item.slug === slug);
        }

        setService(foundService);
      } catch (err) {
        console.error("Error fetching service data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceData();
  }, [slug]);

  if (loading) {
    return (
      <div className="service-info-section">
        <Container>
          <div className="text-center py-5">
            <h4>Loading...</h4>
          </div>
        </Container>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="service-info-section">
        <Container>
          <div className="text-center py-5">
            <h4>Service not found</h4>
            <p>The requested service could not be loaded.</p>
            <p>Slug: {slug}</p>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="service-info-section">
      <header className="contact-header text-center">
        <h1 className="header-title">{capitalizeWords(service.title)}</h1>
      </header>
      <Container>
        <Row className="align-items-start">
          <Col md={3} className="mb-4 mb-md-0 text-center">
            <Image
              src={service.img}
              alt={service.title}
              className="service-image shadow rounded"
              fluid
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/300x200?text=Image+Not+Found";
              }}
            />
          </Col>

          <Col md={9}>
            <div className="service-content text-justify">
              {parse(service.description)}
            </div>

             {/* ======== ADD CONSULTATION BUTTON FOR NON-TRAINING SERVICES ======== */}
            {service.type !== "training" && (
              <Row className="mt-5">
                <Col className="text-center">
                  <Button 
                    variant="primary" 
                    size="lg"
                    onClick={() => navigate("/contact")}
                    style={{
                      background: 'linear-gradient(45deg, #007bff 0%, #0056b3 100%)',
                      border: 'none',
                      borderRadius: '25px',
                      padding: '15px 30px',
                      marginBottom: '20px',
                      fontSize: '16px',
                      fontWeight: '600',
                      boxShadow: '0 4px 15px 0 rgba(0, 123, 255, 0.3)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 6px 20px 0 rgba(0, 123, 255, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 4px 15px 0 rgba(0, 123, 255, 0.3)';
                    }}
                  >
                    Book a Free Consultation
                  </Button>
                </Col>
              </Row>
            )}

            {/* ======== ADD DEMO BUTTON FOR TRAINING SERVICES ======== */}
            {service.type === "training" && (
              // <Row className="mt-5">
              //   <Col className="text-center">
              //     <Button 
              //       variant="primary" 
              //       size="lg"
              //       // onClick={() => navigate(`/demo`)}
              //       onClick={() => navigate(`/demo?course=${service.title.split(' - ')[1] || service.title}`)}
              //       className="px-5 py-3"
              //     >
              //       Book For Free Demo
              //     </Button>
              //   </Col>
              // </Row>
              <Row className="mt-5">
  <Col className="text-center">
    <Button 
      variant="primary" 
      size="lg"
      // onClick={() => navigate(`/demo`)}
      onClick={() => navigate(`/demo?course=${service.title.split(' - ')[1] || service.title}`)}
      style={{
        background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
        border: 'none',
        borderRadius: '25px',
        padding: '15px 30px',
        marginBottom:'-60px',
        marginLeft:'10px',
        fontSize: '16px',
        fontWeight: '600',
        boxShadow: '0 4px 15px 0 rgba(102, 126, 234, 0.3)',
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = 'translateY(-2px)';
        e.target.style.boxShadow = '0 6px 20px 0 rgba(102, 126, 234, 0.4)';
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = '0 4px 15px 0 rgba(102, 126, 234, 0.3)';
      }}
    >
      Book For Free Demo
    </Button>
  </Col>
</Row>

            )}
            {/* ======== END DEMO BUTTON ======== */}

          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ServicePage;
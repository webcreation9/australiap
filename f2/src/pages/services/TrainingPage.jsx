import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./TrainingPage.css";
// Import your trainer image from assets
import TrainerImg from "../../assets/trainerimg2.png";
// Import background image for left box
import BackgroundPattern from "../../assets/trainingbg3.jpg";
// Import images for the new gallery section
import GalleryImg1 from "../../assets/ets.png";
import GalleryImg2 from "../../assets/IELTS.png";
import GalleryImg3 from "../../assets/pearsonasso.jpg";
import GalleryImg4 from "../../assets/language.jpg";
// Import images for why choose us section
import WhyChoose1 from "../../assets/expert.jpg";
import WhyChoose2 from "../../assets/upadtedmaterial.jpg";
import WhyChoose3 from "../../assets/associated.jpg";
import WhyChoose4 from "../../assets/growth.jpeg";
import WhyChoose5 from "../../assets/worldstandard.jpg";
// Import student achievement images
import Student1 from "../../assets/test1.png";
import Student2 from "../../assets/test2.png";
import Student3 from "../../assets/test3.png";
import Student4 from "../../assets/test4.png";

// Import video files - replace these paths with your actual video files
import Video1 from "../../assets/videos/video1.mp4";
import Video2 from "../../assets/videos/video2.mp4";
import VerifiedIcon from "../../assets/verify.jpg";
import GlobalTrustImg from "../../assets/xgs.jpg";


const TrainingPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [direction, setDirection] = useState(0);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isSliderHovered, setIsSliderHovered] = useState(false);
  const [isTrainerFlipped, setIsTrainerFlipped] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRefs = useRef([]);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Updated coachingPrograms with navigation slugs
  const coachingPrograms = [
    { name: "IELTS", slug: "ielts-coaching" },
    // { name: "GMAT", slug: "gmat-coaching" },
    { name: "GRE", slug: "gre-coaching" },
    { name: "PTE", slug: "pte-coaching" },
    { name: "SAT", slug: "sat-coaching" },
    { name: "Language Cert", slug: "language-certification" },
    { name: "Duolingo", slug: "duolingo-coaching" },
    { name: "TOEFL", slug: "toefl-coaching" }
  ];

  // Handle program box click
  const handleProgramClick = (slug) => {
    if (slug === "contact") {
      navigate("/contact");
    } else {
      const trainingMethodologies = ["offline-training", "online-training", "one-to-one-session"];
      if (trainingMethodologies.includes(slug)) {
        navigate(`/services/training/${slug}`);
      } else {
        navigate(`/services/training/${slug}`);
      }
    }
  };

  const learningSolutions = [
    {
      icon: "fas fa-users",
      title: "Offline Training",
      slug: "offline-training"
    },
    {
      icon: "fas fa-laptop",
      title: "Online Training",
      slug: "online-training"
    },
    {
      icon: "fas fa-user",
      title: "1 to 1 Session",
      slug: "one-to-one-session"
    }
  ];

  // New tabs data for why choose us section
  const whyChooseTabs = [
    {
      title: "Expert Trainer",
      icon: "fas fa-user-tie",
      content: "Our certified trainers have many years of experience with proven track records of helping students achieve their dream scores and specialized in specific test formats and provides personalized attention.",
      features: ["Certified Professionals", "Years of Experience"],
      image: WhyChoose1
    },
    {
      title: "Updated Materials",
      icon: "fas fa-book",
      content: "Access the latest study materials, practice tests, and resources updated regularly to match current exam patterns. Our materials are accurated by subject matter experts.",
      features: ["Latest Exam Patterns", "Real Practice Tests", "Regular Updates"],
      image: WhyChoose2
    },
    {
      title: "Association with",
      icon: "fas fa-globe",
      content: "We are associated with leading educational bodies and testing organizations worldwide. Our certifications are recognized by universities and employers globally.",
      features: ["International Standards","Global Certification", "Industry Recognition"],
      image: WhyChoose3
    },
    {
      title: "Overall Growth",
      icon: "fas fa-chart-line",
      content: "Beyond test prep we focus on communication skills, confidence and real world language that benefit students beyond just exam preparation.",
      features: ["Skill Development", "Confidence Building", "Time Management", "Career Guidance"],
      image: WhyChoose4
    },
    {
      title: "World Standards",
      icon: "fas fa-earth-americas",
      content: "Our training aligns with global benchmarks, ensuring top scores in IELTS, PTE, TOEFL and other international examinations.",
      features: [ "Interactive Sessions", "Adaptive Methods", "Modern Technology"],
      image: WhyChoose5
    }
  ];

  const galleryImages = [
    {
      src: GalleryImg2,
      alt: "Training Session 1",
      title: ""
    },
    {
      src: GalleryImg4,
      alt: "Training Session 2", 
      title: ""
    },
    {
      src: GalleryImg3,
      alt: "Training Session 3",
      title: ""
    },
    {
      src: GalleryImg1,
      alt: "Training Session 3",
      title: ""
    }
  ];

  // Student achievements data with videos
  const studentAchievements = [
    {
      id: 1,
      video: Video1
    },
    {
      id: 2,
      video: Video2
    }
  ];

  // Sliding images data
  const slidingImages = [
    Student1,
    Student2,
    Student3,
    Student4
  ];

  // Auto slide change effect
  useEffect(() => {
    if (!isBookOpen) {
      const interval = setInterval(() => {
        setCurrentSlideIndex((prev) => (prev + 1) % slidingImages.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isBookOpen, slidingImages.length]);

  // Book navigation functions
  const nextPage = () => {
    setDirection(1);
    if (videoRefs.current[currentPage]) {
      videoRefs.current[currentPage].pause();
    }
    setCurrentPage((prev) => (prev + 1) % studentAchievements.length);
  };

  const prevPage = () => {
    setDirection(-1);
    if (videoRefs.current[currentPage]) {
      videoRefs.current[currentPage].pause();
    }
    setCurrentPage((prev) => (prev - 1 + studentAchievements.length) % studentAchievements.length);
  };

  const openBook = () => {
    setIsBookOpen(true);
    setCurrentPage(0);
    setDirection(0);
  };

  const closeBook = (e) => {
    if (e) {
      e.stopPropagation();
    }
    if (videoRefs.current[currentPage]) {
      videoRefs.current[currentPage].pause();
    }
    setIsBookOpen(false);
    setDirection(0);
  };

  // Handle page click for turning
  const handlePageClick = (e) => {
    if (e.target.closest('.close-book-btn') || e.target.closest('.video-controls')) return;
    
    const page = e.currentTarget;
    const rect = page.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    
    if (clickX > rect.width * 0.6) {
      nextPage();
    } else if (clickX < rect.width * 0.4) {
      prevPage();
    }
  };

  // Handle video play/pause
  const handleVideoPlay = (index) => {
    videoRefs.current.forEach((video, i) => {
      if (video && i !== index) {
        video.pause();
      }
    });
  };

  // Image popup functions
  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
  };

  const handleClosePopup = () => {
    setSelectedImage(null);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClosePopup();
    }
  };

  // Simplified book animation variants
  const bookAnimation = {
    open: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 300
      }
    },
    closed: {
      scale: 0.8,
      opacity: 0,
      transition: {
        duration: 0.4
      }
    }
  };

  // Page flip animation variants
  const pageFlipVariants = {
    enter: (direction) => ({
      rotateY: direction > 0 ? 90 : -90,
      opacity: 0,
      x: direction > 0 ? 50 : -50,
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      x: 0,
    },
    exit: (direction) => ({
      rotateY: direction < 0 ? 90 : -90,
      opacity: 0,
      x: direction < 0 ? 50 : -50,
    })
  };

  return (
    <div className="training-page">
      {/* First Section - Two Box Layout */}
      <div className="training-container">
        <div className="training-row">
          {/* Left Blue Box with Background Image */}
          <div className="left-box">
            <div 
              className="left-box-background"
              style={{ backgroundImage: `url(${BackgroundPattern})` }}
            ></div>
            <div className="coaching-content">
              <h1 className="coaching-heading">Training</h1>
              <p className="coaching-subtitle">Prepare for your English proficiency test
with proven, result-oriented score-building
methodologies</p>
              
              <div className="programs-grid">
                {coachingPrograms.map((program, index) => (
                  <div 
                    key={index} 
                    className="program-box"
                    onClick={() => handleProgramClick(program.slug)}
                    style={{ cursor: 'pointer' }}
                  >
                    {program.name}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Box - Trainer Flip Card */}
          <div className="right-box">
            <div className="trainer-section-wrapper">
              <div 
                className={`trainer-flip-card ${isTrainerFlipped ? 'flipped' : ''}`}
                onMouseEnter={() => !isMobile && setIsTrainerFlipped(true)}
                onMouseLeave={() => !isMobile && setIsTrainerFlipped(false)}
                onClick={() => isMobile && setIsTrainerFlipped(!isTrainerFlipped)}
              >
                <div className="trainer-flip-card-inner">
                  {/* Front Side - Trainer Image */}
                  <div className="trainer-flip-card-front">
                    <div className="trainer-image-wrapper">
                      <img 
                        src={TrainerImg} 
                        alt="Professional Trainer"
                        className="person-image"
                      />
                      <div className="flip-hint">
                        <i className="fas fa-sync-alt"></i>
                        <span>{isMobile ? 'Tap' : 'Hover'} to view details</span>
                      </div>
                    </div>
                  </div>

                  {/* Back Side - Trainer Details */}
                  <div className="trainer-flip-card-back">
                    <div className="trainer-details-content">
                      <h3>Jason Quigley</h3>
                      <p className="trainer-title">Professional Trainer</p>
                      
                      <div className="trainer-stats">
                        <div className="trainer-stat">
                          <i className="fas fa-award"></i>
                          <div>
                            <span className="stat-number">16+</span>
                            <span className="stat-label">Years Experience</span>
                          </div>
                        </div>
                        
                        <div className="trainer-stat">
                          <i className="fas fa-graduation-cap"></i>
                          <div>
                            <span className="stat-number">1000+</span>
                            <span className="stat-label">Students Trained</span>
                          </div>
                        </div>
                      </div>

                      <div className="trainer-description">
                        <p>With over 16 years of experience and has trained thousands of students in IELTS, PTE, SAT, GRE, TOEFL, and other language certifications and passionate about helping learners achieve their academic and professional goals.</p>
                      </div>

                      <div className="trainer-expertise">
                        <h4>Expertise</h4>
                        <div className="expertise-tags">
                          <span className="expertise-tag">IELTS</span>
                          <span className="expertise-tag">PTE</span>
                          <span className="expertise-tag">SAT</span>
                          <span className="expertise-tag">GRE</span>
                          <span className="expertise-tag">TOEFL</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rest of the sections remain the same */}
      {/* Second Section - Learning Solutions */}
      <div className="learning-solutions-section">
        <div className="solutions-container">
          <h2 className="solutions-heading">Training Methodologies</h2>
          <h3 className="solutions-subtitle">we offer both offline and  online training sessions tailored for aspiring candiatates </h3>
          
          <div className="solutions-grid">
            {learningSolutions.map((solution, index) => (
              <div 
                key={index} 
                className="solution-item"
                onClick={() => handleProgramClick(solution.slug)}
                style={{ cursor: 'pointer' }}
              >
                <div className="solution-box">
                  <i className={solution.icon}></i>
                  <h3 className="solution-title">{solution.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* New Section - Why Choose Our Training Program */}
      <div className="why-choose-section">
        <div className="why-choose-container">
          <h2 className="why-choose-heading">Reowned For Excellence In Training For Global Aspirants</h2>
          <p className="why-choose-subtitle">Discover what makes our training programs stand out from the rest</p>
          
          <div className="tabs-container">
            {/* Tab Headers */}
            <div className="tabs-header">
              {whyChooseTabs.map((tab, index) => (
                <button
                  key={index}
                  className={`tab-button ${activeTab === index ? 'active' : ''}`}
                  onClick={() => setActiveTab(index)}
                >
                  <i className={tab.icon}></i>
                  <span>{tab.title}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="tabs-content">
              <div className="tab-content-inner">
                <div className="tab-text-content">
                  <div className="text-header">
                    <i className={whyChooseTabs[activeTab].icon}></i>
                    <h3>{whyChooseTabs[activeTab].title}</h3>
                  </div>
                  <p>{whyChooseTabs[activeTab].content}</p>
                  <div className="features-grid">
                    {whyChooseTabs[activeTab].features.map((feature, index) => (
                      <div key={index} className="feature-item">
                        <i className="fas fa-check-circle"></i>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="tab-image-content">
                  <img 
                    src={whyChooseTabs[activeTab].image} 
                    alt={whyChooseTabs[activeTab].title}
                    className="static-feature-image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Third Section - Image Gallery */}
      <div className="gallery-section">
        <div className="gallery-container">
          <h2 className="gallery-heading">In Association With </h2>
          <h3 className="gallery-subtitle">Experience our modern facilities and interactive learning atmosphere</h3>
          
          <div className="gallery-grid">
            {galleryImages.map((image, index) => (
              <div key={index} className="gallery-item">
                <div className="image-container">
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    className={`gallery-image ${index === 2 ? 'cover-image' : 'contain-image'}`}
                  />
                  <div className="image-overlay">
                    <h4 className="image-title">{image.title}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Globally Trusted Section */}
{/* Globally Trusted Section */}
{/* Globally Trusted Section */}
<div className="globally-trusted-section">
  <div className="trusted-content">
    <h2 className="trusted-title">
      Globally Trusted
      <img 
        src={VerifiedIcon} 
        alt="Verified" 
        className="verified-icon"
      />
    </h2>

    {/* Image below the text */}
    <div className="trusted-extra-image">
      <img 
        src={GlobalTrustImg} 
        alt="Global Recognition" 
        className="extra-trust-image"
      />
    </div>
  </div>
</div>




      {/* Updated Student Achievements Section */}
      <div className="achievements-section">
        <div className="achievements-container">
          <div className="achievements-content">
            {/* Left Side - Text and Continuous Sliding Images */}
            <div className="achievements-left">
              <div className="achievements-header">
                <h2 className="achievements-heading">Our Students Have Achieved Outstanding Scores</h2>
                <p className="achievements-subtitle"></p>
              </div>
              
              {/* Continuous Sliding Images with Hover Pause */}
              <div 
                className="continuous-slider-container"
                onMouseEnter={() => setIsSliderHovered(true)}
                onMouseLeave={() => setIsSliderHovered(false)}
              >
                <div className="slider-track">
                  <div className="slide">
                    <div className="slide-content">
                      {[...slidingImages, ...slidingImages].map((image, index) => (
                        <div 
                          key={index} 
                          className="slider-item"
                          onClick={() => handleImageClick(image)}
                        >
                          <img 
                            src={image} 
                            alt={`Student achievement ${index % slidingImages.length + 1}`}
                            className="slider-image"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Gradient overlays for smooth edges */}
                <div className="slider-overlay left-overlay"></div>
                <div className="slider-overlay right-overlay"></div>
              </div>
            </div>

            {/* Right Side - Book */}
            <div className="achievements-right">
              <AnimatePresence mode="wait">
                {!isBookOpen ? (
                  // Book Cover - Closed State
                  <motion.div 
                    key="book-closed"
                    className="book-cover-closed"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    onClick={openBook}
                  >
                    <div className="cover-front">
                      <div className="cover-title">
                        <h3>Student Success Stories</h3>
                        <div className="cover-decoration">
                          <div className="decoration-line"></div>
                          <div className="decoration-circle"></div>
                          <div className="decoration-line"></div>
                        </div>
                        <p>Click to open</p>
                      </div>
                      <div className="cover-spine"></div>
                    </div>
                  </motion.div>
                ) : (
                  // Book Content - Open State
                  <motion.div 
                    key="book-open"
                    className="book-open"
                    variants={bookAnimation}
                    initial="closed"
                    animate="open"
                    exit="closed"
                  >
                    <div className="book-content-wrapper">
                      <div className="book-pages">
                        <div className="page-container">
                          <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                              key={currentPage}
                              custom={direction}
                              variants={pageFlipVariants}
                              initial="enter"
                              animate="center"
                              exit="exit"
                              transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 30,
                                duration: 0.5
                              }}
                              className="book-page"
                              onClick={handlePageClick}
                            >
                              {/* Close button */}
                              <button 
                                className="close-book-btn" 
                                onClick={closeBook}
                              >
                                <i className="fas fa-times" style={{ color: "white" }}></i>
                              </button>
                              
                              <div className="page-content">
                                <div className="student-video-section">
                                  <div className="video-frame">
                                    <video
                                      ref={el => videoRefs.current[currentPage] = el}
                                      src={studentAchievements[currentPage].video}
                                      className="student-video"
                                      controls
                                      onPlay={() => handleVideoPlay(currentPage)}
                                      poster={studentAchievements[currentPage].image}
                                    />
                                    <div className="video-controls-overlay">
                                      <p>Click play to watch the success story</p>
                                    </div>
                                  </div>
                                </div>
                                <div className="student-info-section">
                                  <h3 className="student-name">{studentAchievements[currentPage].name}</h3>
                                  <div className="achievement-badge">
                                    <i className="fas fa-trophy"></i>
                                    <span>Outstanding Achievement</span>
                                  </div>
                                  
                                  {/* Page turn instructions */}
                                  <div className="page-turn-hint">
                                    <div className="turn-left">
                                      <i className="fas fa-chevron-left"></i>
                                      <span>Click left to go back</span>
                                    </div>
                                    <div className="turn-right">
                                      <span>Click right for next</span>
                                      <i className="fas fa-chevron-right"></i>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Image Popup Modal */}
      {selectedImage && (
        <div 
          className="image-popup-overlay" 
          onClick={handleOverlayClick}
        >
          <div className="image-popup-content">
            <button 
              className="close-popup-btn" 
              onClick={handleClosePopup}
            >
              <i className="fas fa-times"></i>
            </button>
            <img 
              src={selectedImage} 
              alt="Enlarged view"
              className="popup-image"
            />
          </div>
        </div>
      )}

<div className="floating-demo-btn">
    <button 
      className="book-demo-btn floating"
      onClick={() => navigate("/demo")}
    >
      {/* <i className="fas fa-calendar-check me-2"></i> */}
      Book For Free Demo
    </button>
  </div>

    
    
    </div>



  );
};

export default TrainingPage;

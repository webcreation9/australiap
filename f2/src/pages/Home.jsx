// src/pages/Home.jsx
import React, { useEffect,useRef , useState } from "react";

import { Container, Row, Col, Button, Card, Image ,Carousel,Modal,Form} from "react-bootstrap";
import "./Home.css";
import Imm from "../assets/Imm.png";
import PearsonAsso from "../assets/pearsonasso.jpg";
import HeroBanner from "../assets/HeroBanner.svg";
import Countries from "../assets/Countries.png";
import XgsBanner3 from "../assets/XgsBanner3.png";
import XgsBanner4 from "../assets/XgsBanner4.png";
import GradImg from "../assets/GradImg.png";
import Books from "../assets/Books.png";
import Presentation from "../assets/Presentation.png";
import Family from "../assets/Family.png";
import YearsLogo from "../assets/YearsLogo.png";
import Uk from "../assets/UK.png";
import USA from "../assets/USA.png";
import Australia from "../assets/Australia.png";

import Canada from "../assets/Canada.png";
import Germany from "../assets/Germany.png";
import { useInView } from "react-intersection-observer"; 
import XgsLogo1 from "../assets/XgsLogo1.png";
import CountSideImg from "../assets/CountSideImg.png";
import TRA4 from "../assets/TRA4.png";
import Educ from "../assets/Educ.png";
import HASINDU from "../assets/HASINDU.png";
import { Link } from 'react-router-dom';

import { motion } from "framer-motion";
import IELTS from "../assets/IELTS.png";
import Pearson from "../assets/Pearson.png";
import sat from "../assets/sat.png";
import Arrow from "../assets/Arrow.png";

import { FaQuoteLeft } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import TestimonalImg from "../assets/TestimonalImg.png"


import { FaCalendarAlt, FaUser, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import RN1 from "../assets/RN1.png";
import RN2 from "../assets/RN2.png";
import RN3 from "../assets/RN3.png";
import language from "../assets/language.jpg";

import RBLOGS from "../assets/RBLOGS.png"
import worldImage from "../assets/worldImage.png"
import BannerImage from "../assets/BannerImage.png"
import parse from "html-react-parser";

const iconMap = {
  Educ,
  Imm,
  TRA4,
};



const teamMembers = [
  {
    name: "Pooja Rawal",
    role: "MARN - 2117645",
    region: "(Australia)",
    img: "https://web.archive.org/web/20241205055412im_/https://www.xcelgs.com.au/assets/images/team/1.jpg",
  },
  // {
  //   name: "Jasmine Saluja",
  //   role: "Relationship Associate - Admissions",
  //   region: "(Aus & Sri Lanka)",
  //   img: "https://web.archive.org/web/20241205055412im_/https://www.xcelgs.com.au/assets/images/team/4.jpg",
  // },
  // {
  //   name: "Deepthi",
  //   role: "Relationship Associate - Admissions",
  //   region: "(Aus & Sri Lanka)",
  //   img: "https://web.archive.org/web/20241205055412im_/https://www.xcelgs.com.au/assets/images/team/6.jpg",
  // },
   {
    name: "Prativa Rawal",
    role: "Admissions",
    region: "(Australia)",
    img: "https://web.archive.org/web/20241014191106im_/https://www.xcelgs.com.au/assets/images/team/7.jpg",
  },
   {
    name: "Sanketh",
    role: "Student Counselor",
    region: "(Aus & Sri Lanka)",
    img: "https://web.archive.org/web/20241205055412im_/https://www.xcelgs.com.au/assets/images/team/5.jpg",
  },
   {
    name: "Hasindu",
    role: "Student Counselor",
    region: "(Aus & Sri Lanka)",
    img: HASINDU,
  },
  // {
  //   name: "Sri Hitha",
  //   role: "Immigration Consultant",
  //   region: "(Aus & India)",
  //   img: HASINDU,
  // },
  // {
  //   name: "Younus",
  //   role: "Immigration Consultant",
  //   region: "(Aus & India)",
  //   img: HASINDU,
  // },
  //  {
  //   name: "Pooja Rawal",
  //   role: "Relationship Associate - Admissions",
  //   region: "(Aus & Sri Lanka)",
  //   img: "https://web.archive.org/web/20241205055412im_/https://www.xcelgs.com.au/assets/images/team/1.jpg",
  // },
  //  {
  //   name: "Pooja Rawal",
  //   role: "Relationship Associate - Admissions",
  //   region: "(Aus & Sri Lanka)",
  //   img: "https://web.archive.org/web/20241205055412im_/https://www.xcelgs.com.au/assets/images/team/1.jpg",
  // },
];
// -------------------------------------------

const banners = [
  {
    src: XgsBanner4,
    alt: "Banner 1",
  },
  // {
  //   src: Countries,
  //   alt: "Banner 2",
  // },
  {
    src: XgsBanner3,
    alt: "Banner 3",
  },
  // {
  //   src: Countries,
  //   alt: "Banner 4",
  // },

]


const Home = () => {







// ---------------------- SERVICES -------------------
const [services, setServices] = useState([]);

useEffect(() => {
  fetch("/data/services.json")
    .then((res) => res.json())
    .then((data) => setServices(data))
    .catch((err) => console.error("Error fetching JSON:", err));
}, []);
// const cardData = [
//   {
//     title: "Education",
//     icon: Educ,
//     description:
//       "we specialize in providing tailored education consulting services for international students who wish to study in Australia`s top universities and colleges. we ensure personolized support...",
      
//   },
//   {
//     title: "Immigration",
//     icon: Imm,
//     description:
//       "We offer complete and trusted Migration Services.through our licensed migration agent,to the aspirants who are planning to live,work,or settle permanently in Australia...",
//   },
//   {
//     title: "Training",
//     icon: TRA4,
  
//     description:
//       "To make you globally competitive,Xcel Global Services We offers specialized training programs that improve your chances of success-whether youare going for studies...",
//          className:"training-logo",
//   },
// ];


// -------------FLAGS BOX----------------------------------------------
const destinations = [
  {
    name: "USA",
    img: USA,
    flag: "https://flagcdn.com/us.svg",
  },
 {
    name: "UK",
    img: Uk, // ✅ matches the imported variable
    flag: "https://flagcdn.com/gb.svg",
  },
  {
    name: "AUSTRALIA",
    img: Australia,
    flag: "https://flagcdn.com/au.svg",
  },
  {
    name: "CANADA",
    img: Canada,
    flag: "https://flagcdn.com/ca.svg",
  },
  {
    name: "GERMANY",
    img: Germany,
    flag: "https://flagcdn.com/de.svg",
  },
   {
    name: "Ireland",
    img: "https://thumbs.dreamstime.com/b/ireland-visa-passport-usa-immigration-citizens-focusing-word-travel-national-identification-close-up-d-rendering-multi-204151489.jpg",
    flag: "https://cdn.britannica.com/33/1733-131-C0C3C1CF/FLAG-Ireland.jpg?w=200&h=200&c=crop",
  },
  //  {
  //   name: "Indonesia",
  //   img: "https://globalindiannetwork.com/wp-content/uploads/indonesian-business-visa-for-indian.webp",
  //   flag: "https://static.vecteezy.com/system/resources/previews/015/272/227/non_2x/indonesia-3d-rounded-flag-with-transparent-background-free-png.png",
  // },
];
 

// -------------------------- VISA CATEGORIES -------------------------------------

const [serviceCategories, setServiceCategories] = useState([]);
const [trainingServiceCategories, setTrainingServiceCategories] = useState([]);

useEffect(() => {
    fetch("/data/service-categories.json")
      .then((res) => res.json())
      .then((data) => {
        const trainingFiltered = data.filter((card) => card.type === "training");
        setTrainingServiceCategories(trainingFiltered);
        const excludeTrainingFiltered = data.filter((card) => card.type !== "training");
        setServiceCategories(excludeTrainingFiltered);
      })
      .catch((err) => console.error("Error fetching cards:", err));
  });

// const visaCards = [
//   {
//     title: "PR Visa",
//     img: "https://storage.googleapis.com/a1aa/image/f9e09e7a-858c-4849-dd13-60f5050235de.jpg",
//     description:
//       `At Xcel Global Services, we understand that permanent residency is more than just a visa
// it's a gateway to a new life. Whether you're aiming for Canada, Australia, Germany, or other PR-friendly countries, our expert team is here to simplify the process. From assessing your eligibility to helping you with points calculation, document preparation, and submission, we provide end-to-end support. We stay updated on the latest immigration rules so you don't miss out on critical opportunities. With tailored guidance and a transparent approach, we help skilled professionals, families, and entrepreneurs secure their future abroad. Your dream of settling overseas starts here`,
//   },
//   {
//     title: "Student Visa",
//     img: "https://storage.googleapis.com/a1aa/image/4cf427e8-2cce-4eb8-06e0-f1b6a92fa20f.jpg",
//     description:
//       `At Xcel Global Services, we make your global education journey smooth, affordable, and stress-free. With tie-ups across top universities in the UK, Australia, Canada, Ireland, and more, we help you pick the right course, the right country, and the right path forward. Our student visa experts guide you through every stage — from choosing a program aligned with your goals, preparing a strong SOP and processing will be taken care of ,making it easy for you to file your visa with confidence. We also assist with education loans, scholarships, pre-departure guidance, and more. Whether you're planning undergrad, postgrad, or research-based studies — we simplify it all.
// while you focus on preparing for the opportunity of a lifetime.`,
//   },
//   {
//     title: "Visit Visa",
//     img: "https://storage.googleapis.com/a1aa/image/c4adaf1b-fa79-4ed3-5cde-feea270f0090.jpg",
//     description:
//       `Planning to visit family, attend a personal event, or just explore a new country? Xcel Global Services ensures your visit visa experience is seamless and stress-free. We assist you in preparing your documents, travel history explanation, proof of funds, and cover letters — all tailored to the specific country's guidelines. Whether it's a holiday to the UK, a family visit to Canada, or a Europe tour, we make sure your application is strong and compliant.
// Our team also helps with visa interview prep, itinerary planning, and accommodation support to enhance your chances of approval.
// Let your travel dreams take flight — we'll handle the formalities so you can enjoy the journey.`,
//   },
//   {
//     title: "Business Visa",
//     img: "https://storage.googleapis.com/a1aa/image/e919ccc2-015a-4e8a-cb4a-09ad6988d73c.jpg",
//     description:
//     `Want to explore international business opportunities or attend global meetings, conferences, or trade events? With Xcel Global Services, your business visa process becomes faster, smoother, and smarter. Whether you're applying for short-term travel .we help you choose the right visa category, prepare a solid application, and present your case professionally. We understand the urgency and confidentiality that business travelers expect, which is why we work efficiently and keep you informed at every step. With insights into visa rules across countries like the USA, UK, Canada, and Schengen zones, we ensure no detail is missed.
// Your business deserves global reach — we'll help you get there with confidence and clarity.`,
//   },
// ];
// -------------countup-----------------------------
  const [displayed, setDisplayed] = useState({
    years: 0,
    visa: 0,
    success: 0,
  });

  const actual = {
    years: 15,
    visa: 8000,
    success: 96,
  };

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  useEffect(() => {
    if (!inView) return;

    let count = 0;
    const interval = setInterval(() => {
      count++;

      if (count >= 10) {
        clearInterval(interval);
        setDisplayed(actual);
      } else {
        setDisplayed({
          years: Math.floor(Math.random() * 50) + 1,
          visa: Math.floor(Math.random() * 1200) + 100,
          success: Math.floor(Math.random() * 100),
        });
      }
    }, 100);
    return () => clearInterval(interval);
  }, [inView]); 



const logos = [
  {
    alt: 'QEAC',
    src: 'https://xcelgs.com/assets/img/test/1.png',
    className:"accreditation-logo" ,
  },
  {
    alt: 'ETS',
    src: 'https://xcelgs.com/assets/img/test/2.png',
    className:"accreditation-logo" ,
  },
  {
    alt: 'MARA',
    src: 'https://xcelgs.com/assets/img/test/3.png',
    className:"accreditation-logo" ,
  },
  {
    alt: 'IELTS',
    src: 'https://xcelgs.com/assets/img/test/4.png',
    className:"accreditation-logo" ,
  },
  {
    alt: 'PTE Academic',
    src:PearsonAsso,
    // src: 'https://xcelgs.com/assets/img/test/5.png',
    // src:"../../assets/pearsonasso.jpg",
    className:"accreditation-logo" ,
  },
  {
    alt: 'language Cert',
    src:language,
    // src: 'https://xcelgs.com/assets/img/test/5.png',
    // src:"../../assets/pearsonasso.jpg",
    className:"accreditation-logo" ,
  },
];

// const trainings = [
//   {
//     title: 'IELTS Coaching',
//     desc: 'Achieve your dream band score with expert-led IELTS coaching tailored for your success.',
//     img: IELTS,
//   },
//   {
//     title: 'PTE Coaching',
//     desc: 'Master the PTE exam with personalized coaching and proven strategies for a high...',
//     img: Pearson
//   },
//   {
//     title: 'SAT Coaching',
//     desc: 'Boost your SAT score with expert coaching, personalized study plans, and test-taking...',
//     img: sat,
//   },
// ];

  useEffect(() => {
  const cards = document.querySelectorAll(".team-card");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = "running";
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  cards.forEach((card) => observer.observe(card));
}, []);
// -------------------------------------------

 const [visibleMembers, setVisibleMembers] = useState(teamMembers.slice(0, 3));

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisibleMembers(teamMembers);
    }, 1000);

    return () => clearTimeout(timeout);
  },[]);
  
// -----------------------------RECENT NEWS-------------------------------

const newsData = [
  {
    date: "May 28, 2025",
    img: RN1,
    title: "Strengthening ImmiAccount security through Multi-factor Authentication (MFA)",
    subtitle: "Multi-factor authentication is coming to ImmiAccount",
    highlight: "18 June"
  },
  {
    date: "May 23, 2025",
    img: RN2,
    title: "Strengthening ImmiAccount security through Multi-factor Authentication (MFA)",
    subtitle: "Multi-factor authentication is coming to ImmiAccount",
    highlight: "18 June"
  },
  {
    date: "May 19, 2025",
    img: RN3,
    title: "Strengthening ImmiAccount security through Multi-factor Authentication (MFA)",
    subtitle: "Multi-factor authentication is coming to ImmiAccount",
    highlight: "18 June"
  },
  {
    date: "May 19, 2025",
    img: RN3,
    title: "Strengthening ImmiAccount security through Multi-factor Authentication (MFA)",
    subtitle: "Multi-factor authentication is coming to ImmiAccount",
    highlight: "18 June"
  },
  {
    date: "May 19, 2025",
    img: RN3,
    title: "Strengthening ImmiAccount security through Multi-factor Authentication (MFA)",
    subtitle: "Multi-factor authentication is coming to ImmiAccount",
    highlight: "18 June"
  },
   
];
// ---------------------------------------------

const blogs = [
  {
    date: "May 27, 2025",
    author: "admin",
    title: "Guide to Become Permanent Resident in Australia in 2025",
    description:
      "Are you dreaming of settling in Australia? Have you thought about applying permanent residency (PR)? If not, then let us walk you ...",
    image:
      RBLOGS,
  },
  {
    date: "May 20, 2025",
    author: "admin",
    title: "Top Universities in Australia Offering PR Courses",
    description:
      "Here’s a list of top universities in Australia that offer courses aligned with PR. These courses can help you increase your PR chances...",
    image:
      RBLOGS,
  },
  {
    date: "May 13, 2025",
    author: "admin",
    title: "Skilled Occupation List for Australia PR 2025",
    description:
      "Australia has an updated Skilled Occupation List for 2025. Know what job roles are in demand and how they affect your PR eligibility...",
    image:
      RBLOGS,
  },
  {
    date: "May 20, 2025",
    author: "admin",
    title: "Top Universities in Australia Offering PR Courses",
    description:
      "Here’s a list of top universities in Australia that offer courses aligned with PR. These courses can help you increase your PR chances...",
    image:
      RBLOGS,
  },
  {
    date: "May 20, 2025",
    author: "admin",
    title: "Top Universities in Australia Offering PR Courses",
    description:
      "Here’s a list of top universities in Australia that offer courses aligned with PR. These courses can help you increase your PR chances...",
    image:
      RBLOGS,
  },
];

// -----------------worldimage---------------------------
const imageRef = useRef(null);
const [isImageInView, setIsImageInView] = useState(false);

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setIsImageInView(true);
      }
    },
    {
      threshold: 0.1,
    }
  );

  if (imageRef.current) {
    observer.observe(imageRef.current);
  }

  return () => {
    if (imageRef.current) {
      observer.unobserve(imageRef.current);
    }
  };
}, []);

// --------------recent news scroll-----------------------------
const scrollRef = useRef(null);

const scrollLeft = () => {
  if (scrollRef.current) {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  }
};

const scrollRight = () => {
  if (scrollRef.current) {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  }
};
// -------------recentblogs--------------------------
const blogScrollRef = useRef(null);
const blogScrollLeft = () => {
  if (blogScrollRef.current) {
    blogScrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  }
};

const blogScrollRight = () => {
  if (blogScrollRef.current) {
    blogScrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  }
};
// --------------------------------------------


const topDestScrollRef = useRef(null);

const handleScrollLeft = () => {
  if (topDestScrollRef.current) {
    topDestScrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  }
};

const handleScrollRight = () => {
  if (topDestScrollRef.current) {
    topDestScrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  }
};


useEffect(() => {
  const scrollContainer = topDestScrollRef.current;

  const scrollAmount = 300; // adjust as needed
  const scrollInterval = 2000; // 2 seconds

  const interval = setInterval(() => {
    if (scrollContainer) {
      // If we've reached the end, reset to start
      if (
        scrollContainer.scrollLeft + scrollContainer.offsetWidth >=
        scrollContainer.scrollWidth
      ) {
        scrollContainer.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  }, scrollInterval);

  return () => clearInterval(interval); // Clean up on unmount
}, []);



// -----------TESTIMONALS--------------------------
// top of your component file
const testimonials = [
  
  {
    image: TestimonalImg,
    author: "John Doe",
    subtitle: "Canada Work Visa",
    text: `Xcel Global had been amazing in helping me finally get my PR.
                  Pooja was incredibly supportive, and genuinely dedicated to
                  helping us. Her communication was excellent, and her
                  professionalism gave us so much confidence throughout the
                  process. We’re extremely happy with the service and highly
                  recommend Xcel Global for their services!`,
  },
  {
    image: "https://img.freepik.com/free-photo/brunette-business-woman-with-wavy-long-hair-blue-eyes-stands-holding-notebook-hands_197531-343.jpg?semt=ais_hybrid&w=740",
    author: "Jooly",
    subtitle: "UK Student Visa",
    text: `"Thanks to Xcel Global, I got my UK Student Visa hassle-free! Their step-by-step assistance with the SOP, financial proof, and interview prep made all the difference. I’m now studying at my dream university!"`,
  },
  {
    image: "https://www.shutterstock.com/image-photo/portrait-confident-young-indian-teenager-260nw-2157123233.jpg",
    author: "Mutale Makungu",
    subtitle: "Australia PR Visa",
    text: `"Getting my Australia PR was a life-changing experience, and Xcel Global made it seamless. Their expert guidance through the skill assessment, EOI submission, and visa documentation gave me the confidence and clarity I needed. Now I’m building a new life Down Under!"`,
  },
];
const [current, setCurrent] = useState(0);

const handleNext = () => {
  setCurrent((prev) => (prev + 1) % testimonials.length);
};

const handlePrev = () => {
  setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
};

const currentTestimonial = testimonials[current];

// --------------------------------------
  const headingRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

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
// ----------------ourteam------------------
// useEffect(() => {
//   const scrollContainer = document.getElementById("team-scroll");

//   const scrollStep = 1; // pixels per tick
//   const scrollInterval = 20; // ms between ticks

//   const autoScroll = setInterval(() => {
//     if (scrollContainer) {
//       // Scroll right
//       scrollContainer.scrollLeft += scrollStep;

//       // Reset to start when reaching the end
//       if (
//         scrollContainer.scrollLeft + scrollContainer.clientWidth >=
//         scrollContainer.scrollWidth
//       ) {
//         scrollContainer.scrollLeft = 0;
//       }
//     }
//   }, scrollInterval);

//   return () => clearInterval(autoScroll); // cleanup on unmount
// }, []);
useEffect(() => {
  const scrollContainer = document.getElementById("team-scroll");

  const scrollStep = 2; // pixels per tick
  const scrollInterval = 10; // ms between ticks

  const autoScroll = setInterval(() => {
    if (scrollContainer) {
      scrollContainer.scrollLeft += scrollStep;

      // Reset without flicker once halfway (i.e. end of first batch)
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0;
      }
    }
  }, scrollInterval);

  return () => clearInterval(autoScroll);
}, []);
// ----------------------------------------------------------
//  const [show, setShow] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setShow(true);
//     }, 5000);
//     return () => clearTimeout(timer);
//   }, []);

//   const handleClose = () => setShow(false);

// const [show, setShow] = useState(false);
//   const [formSubmitted, setFormSubmitted] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setShow(true);
//     }, 5000);
//     return () => clearTimeout(timer);
//   }, []);

//   const handleClose = () => setShow(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setFormSubmitted(true);
//     // You can also send the form data here via axios or fetch
//   };

// Top of your component
// const [flipped, setFlipped] = useState({});


// const API_URL = import.meta.env.VITE_API_URL || "https://australiap.onrender.com";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const [show, setShow] = useState(false);
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
  scheduleTime: "",
  studentInsurance: false,
  studentAccommodation: false
});

useEffect(() => {
  const timer = setTimeout(() => {
    setShow(true);
  }, 5000);
  return () => clearTimeout(timer);
}, []);

const handleClose = () => setShow(false);

// const handleSend = async (type) => {
//   if (!formData.name || !formData.mobile || !formData.email || !formData.lookingFor || !formData.country) {
//     alert("Please fill all required fields");
//     return;
//   }

//   setLoading(true);

//   try {
   
// const submitResponse = await fetch(`${API_URL}/api/submit`, {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({
//     ...formData,
//     pageUrl: window.location.href,
//   }),
// });

//     const submitResult = await submitResponse.json();

//     if (!submitResponse.ok) {
//       throw new Error(submitResult.error);
//     }

//     if (type === "email") {
      
// const emailResponse = await fetch(`${API_URL}/api/send-email/${submitResult.id}`);
//       // const emailResponse = await fetch(`/api/send-email/${submitResult.id}`);
//       const emailResult = await emailResponse.json();
      
//       if (!emailResponse.ok) {
//         throw new Error(emailResult.error);
//       }
      
//       alert("✅ Form submitted and email sent successfully!");
//     } else if (type === "whatsapp") {
   
//       const message = `New Consultation Request:%0A%0AName: ${formData.name}%0AMobile: ${formData.mobile}%0AEmail: ${formData.email}%0ALooking For: ${formData.lookingFor}%0ACountry: ${formData.country}%0AComments: ${formData.comments || "N/A"}%0ASchedule Date: ${formData.scheduleDate || "N/A"}%0ASchedule Time: ${formData.scheduleTime || "N/A"}`;
      
//       const whatsappUrl = `https://wa.me/919490677177?text=${message}`;
//       window.open(whatsappUrl, "_blank");
      
//       alert("✅ Form submitted and WhatsApp message prepared!");
//     }

//     setFormSubmitted(true);
//     setTimeout(() => {
//       handleClose();
//       setFormData({
//         name: "",
//         mobile: "",
//         email: "",
//         lookingFor: "",
//         country: "",
//         comments: "",
//         scheduleDate: "",
//         scheduleTime: ""
//       });
//       setFormSubmitted(false);
//     }, 2000);

//   } catch (error) {
//     console.error("Error:", error);
//     alert("❌ Error submitting form: " + error.message);
//   } finally {
//     setLoading(false);
//   }
// };

// Time slots for scheduling
const handleSend = async (type) => {
  // Validation for Other Services
  if (formData.lookingFor === "Other Services") {
    if (!formData.studentInsurance && !formData.studentAccommodation && !formData.comments) {
      alert("Please select at least one service or provide details in comments");
      return;
    }
  } else {
    // Original validation for other visa types
    if (!formData.name || !formData.mobile || !formData.email || !formData.lookingFor || !formData.country) {
      alert("Please fill all required fields");
      return;
    }
  }

  setLoading(true);

  try {
    // Prepare the data to send
    const submissionData = {
      ...formData,
      pageUrl: window.location.href,
      // Ensure boolean values are properly set
      studentInsurance: formData.studentInsurance || false,
      studentAccommodation: formData.studentAccommodation || false
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
      console.log(`${API_URL}/api/send-email/${submitResult.id}`);
      const emailResult = await emailResponse.json();
      
      if (!emailResponse.ok) {
        throw new Error(emailResult.error);
      }
      
      alert("✅ Form submitted and email sent successfully!");
    } else if (type === "whatsapp") {
      // Enhanced WhatsApp message with new fields
      let servicesText = "";
      if (formData.lookingFor === "Other Services") {
        const selectedServices = [];
        if (formData.studentInsurance) selectedServices.push("Student Insurance");
        if (formData.studentAccommodation) selectedServices.push("Student Accommodation");
        
        servicesText = selectedServices.length > 0 
          ? `Selected Services: ${selectedServices.join(", ")}%0A`
          : `Other Service Details: ${formData.comments || "N/A"}%0A`;
      }

      const message = `New Consultation Request:%0A%0A` +
        `Name: ${formData.name}%0A` +
        `Mobile: ${formData.mobile}%0A` +
        `Email: ${formData.email}%0A` +
        `Looking For: ${formData.lookingFor}%0A` +
        `${servicesText}` +
        `Country: ${formData.country}%0A` +
        `Comments: ${formData.comments || "N/A"}%0A` +
        `Schedule Date: ${formData.scheduleDate || "N/A"}%0A` +
        `Schedule Time: ${formData.scheduleTime || "N/A"}`;
      
      const whatsappUrl = `https://wa.me/917730936999?text=${message}`;
      window.open(whatsappUrl, "_blank");
      
      alert("✅ Form submitted and WhatsApp message prepared!");
    }

    setFormSubmitted(true);
    setTimeout(() => {
      handleClose();
      // Reset form data
      setFormData({
        name: "",
        mobile: "",
        email: "",
        lookingFor: "",
        country: "",
        comments: "",
        scheduleDate: "",
        scheduleTime: "",
        studentInsurance: false,
        studentAccommodation: false
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



 

// ----------------------------------------
  return (
    
    <>
    {/* ----------------------------------------------------- */}
     {/* <a href="#contact" className="consult-btn" title="Get Free Consultation">
      💬 Free Consultation
    </a> */}
        {/* <div className="consultation-button-container">
      <Button variant="primary" className="consultation-button">
       
        Free Consultation
      </Button>
    </div> */}
     <div className="consult-btn-container">
        <Link to="/contact">
    <Button className="consult-btns" variant="primary">
    Free Consultation
  </Button>
  </Link>
  </div>
    {/* ------------------------------------------ */}
  {/* <div className="scroll-container">
      {/* <p className="scroll-text">🚀Breaking News: Australia Work and Holiday visa (Subclass 462) ballot opened 2025–2026: 
Registration date: 24-June-2025 to 15-July-2025 🌍</p> *}
<p className="scroll-text">
  🚀Breaking News: <span className="highlight-blue">Australia Work and Holiday visa (Subclass 462) ballot opened 2025-2026:
  Registration date: 24-June-2025 to 15-July-2025 </span>🌍
</p>
    </div> */}


    {/* ------------------------------------------------ */}
 {/* <section className="responsive-image-section">
      <Container fluid className="p-0">
        <img src={BannerImage} alt="Responsive Banner" className="responsive-img" />
      </Container>
    </section>    */}
   
 {/* <section className="home-carousel-section">
      <Container fluid className="p-0">
        <Carousel fade interval={3000} controls={false} indicators>
          {banners.map((banner, index) => (
            <Carousel.Item key={index}>
              <img className="banner-img" src={banner.src} alt={banner.alt} />
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    </section> */}
    <section className="home-carousel-section">
  <Container fluid className="p-0 m-0">
    <Carousel fade interval={3000} controls={false} indicators className="w-100">
      {banners.map((banner, index) => (
        <Carousel.Item key={index} className="text-start">
          <div className="d-flex justify-content-start">
            <img 
              className="banner-img w-100" 
              src={banner.src} 
              alt={banner.alt} 
            />
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  </Container>
</section>


 <Container className="py-4">
      <Row className="justify-content-center text-center">
        <Col xs={12} md={10} lg={8}>
          <h2 className="fw-bold text-black fs-3 fs-md-2 fs-lg-1 m-0">
            Xcel Global Services Australia | Education & Migration Consultants in Melbourne, Adelaide, Geelong & Perth
          </h2>
        </Col>
      </Row>
    </Container>
 {/* ----------------------------SERVICES---------------------------- */}
 <section className="xgs-section">
        
      <Container>
        <Row className="g-4 mb-5">
          {services.map((card, idx) => (
  <Col key={idx} xs={12} sm={4} lg={4}>
    <Card className="xgs-card custom-card text-center">
      <Card.Body className="d-flex flex-column justify-content-between p-3">
        <div>
          <div className="icon-image mb-2">
            <Image src={iconMap[card.icon]} alt={card.title} width={48} height={48} />
          </div>
          <Card.Title className="xgs-title mb-2">{card.title}</Card.Title>
          <Card.Text className="xgs-text clamp-3 text-justify" align="left" style={{ fontWeight: 100 }}>
            {/* {card.description} */}
            {card.description.length > 250
    ? parse(card.description.substring(0, 250) + "...")
    : parse(card.description)}
            </Card.Text>
        </div>

        <div className="d-flex justify-content-end">
          <Link
            to={card.link}
            className="btn btn-outline-success read-more mt-3"
          >
            Read More
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="ms-2"
              width="12"
              height="12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h14m-6-6l6 6-6 6"
              />
            </svg>
          </Link>
        </div>
      </Card.Body>
    </Card>
  </Col>
))}
        </Row>
        </Container>
   </section>


 {/* ----------------------WHY CHOOSE US-------------------------------------------- */}
 <section className="why-choose-section">
      <Container className="py-5">
        <Row className="gx-5">
          {/* Left Image Column */}
         
<Col md={3} className="d-flex flex-column align-items-center gap-4 mb-4 mb-md-0">
  <Image
    src={Books}
    alt="Books with graduation cap"
    // className="rounded"
     className="rounded animated-img"
    fluid
   
  />
  <Image
    src={Presentation}
    alt="Business meeting"
    // className="rounded"
     className="rounded animated-img"
    fluid
   
  />
</Col>

{/* Middle Image */}
<Col md={3} className="d-flex justify-content-center mb-4 mb-md-0">
  <Image
    src={Family}
    alt="Family at airport"
    className="rounded animated-img h-100 w-100 object-fit-cover "
    fluid

  />
</Col>




          {/* Text Column */}
          <Col md={6}>
            <p className="text-dark fw-bold fs-4 mb-2" style={{ letterSpacing: "0.5px", textTransform: "uppercase" }}>
  Why Choose Us
</p>

          <h2 className="fw-bold mb-4 animated-heading">
  One-Stop Destination for <br /> All Abroad Needs
</h2>


            <p className="text-muted">
              {/* At XCEL GLOBAL SERVICES, we believe your dreams of going abroad should be exciting—not overwhelming. That’s why we’ve built a comprehensive platform for your journey—study, work, migrate, or travel. */}
              Xcel Global Services stands out for its trusted expertise in overseas education,
              immigration,and training.with certified counselors and licensed migration agents,we offer personalized guidance tailored to your academic or migration goals.our end-to-end support ensures a smooth journey -from application to visa-delivered with complete transparency and care.with a strong track record of success and satisfied clients across Australia and India,we are the reliable partner you can count on.
            </p>
            <p className="text-muted">
              Here’s why thousands trust us to turn their global aspirations into reality:
            </p>
            
            <Row className="align-items-center mt-4" align="left">
  {/* Left Column - List */}
  <Col md={8}>
    <ul className="list-unstyled mb-0">
      {[
        "End-to-End Abroad Solutions",
        "Trusted Experts, Proven Results",
        "Personalized Approach",
        "Strong Global Network",
        "Transparent Process",
        "Multilingual & Multicultural Support",
        "Fast, Reliable, and Stress-Free",
      ].map((item, idx) => (
        <li className="d-flex align-items-start gap-2 text-muted mb-2" key={idx}>
          <span className="text-success mt-1">
            <i className="fas fa-check-circle"></i>
          </span>
          {item}
        </li>
      ))}
    </ul>
  </Col>

  {/* Right Column - Badge Image */}
  <Col
    md={4}
    className="d-flex flex-column align-items-center align-items-md-start mt-4 mt-md-0"
  >
    <Image
      src={YearsLogo}
      alt="15 years badge"
      width={200}
      height={200}
    />
    {/* <p className="fw-bold mt-2 text-center text-md-start">
      EMPOWERING <br /> ABROAD DREAMS
    </p> */}
  </Col>
</Row>

          </Col>
        </Row>
      </Container>
    </section>
  {/* ----------------------FLAGS BOX------------------------------- */}

{/* ----------------------FLAGS BOX------------------------------- */}
<section className="top-dest-wrapper-grid">
  <Container className="py-5">
    <h1 className="text-black fw-bold mb-4 text-center">Top Destinations</h1>
    <Row className="g-4 justify-content-center">
      {destinations
        .sort((a, b) => (a.name === "AUSTRALIA" ? -1 : b.name === "AUSTRALIA" ? 1 : 0))
        .map((dest, index) => (
          <Col key={index} xs={12} sm={6} md={4}>
            <div className="destination-flip-card">
              <div className="flip-inner">
                {/* Front Side */}
                <div className="flip-front">
                  <div className="image-overlay-wrapper">
                    <Image
                      src={dest.img}
                      alt={dest.name}
                      className="img-fluid rounded-3 w-100 h-100 overlay-img"
                    />
                    <h3 className="country-name">{dest.name}</h3>
                  </div>
                </div>
                {/* Back Side */}
                <div className="flip-back">
                  {dest.name === "AUSTRALIA" ? (
                    <>
                      <p className="fw-bold text-center mb-2">{dest.name} Visa Options</p>
                      <ul className="list-unstyled text-center">
                        <li>
                          <Link to="/services/education/student-visa" onClick={(e) => e.stopPropagation()}>
                           Student Visa
                          </Link>
                        </li>
                        <li>
                          <Link to="/services/immigration/pr-visa" onClick={(e) => e.stopPropagation()}>
                            General Skilled Migration
                          </Link>
                        </li>
                        <li>
                          <Link to="/services/immigration/visit-visa" onClick={(e) => e.stopPropagation()}>
                            Visit Visa
                          </Link>
                        </li>
                        <li>
                          <Link to="/services/immigration/business-visa" onClick={(e) => e.stopPropagation()}>
                            Business Visa
                          </Link>
                        </li>
                        <li>
                          <Link to="/services/immigration/partner-visa" onClick={(e) => e.stopPropagation()}>
                            Partner Visa
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/services/immigration/employer-sponsored-visa"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Employer Sponsored Visa
                          </Link>
                        </li>
                      </ul>
                    </>
                  ) : dest.name === "USA" ? (
                    <>
                      <p className="fw-bold text-center mb-2">{dest.name} Visa Options</p>
                      <ul className="list-unstyled text-center">
                        <li>
                          <Link to="/services/education/student-visa" onClick={(e) => e.stopPropagation()}>
                            Student Visa
                          </Link>
                        </li>
                        <li>
                          <Link to="/services/immigration/visit-visa" onClick={(e) => e.stopPropagation()}>
                            Visit Visa
                          </Link>
                        </li>
                        <li>
                          <Link to="/services/immigration/partner-visa" onClick={(e) => e.stopPropagation()}>
                            Partner Visa
                          </Link>
                        </li>
                      </ul>
                    </>
                  ) : dest.name === "UK" ? (
                    <>
                      <p className="fw-bold text-center mb-2">{dest.name} Visa Options</p>
                      <ul className="list-unstyled text-center">
                        <li>
                          <Link to="/services/education/student-visa" onClick={(e) => e.stopPropagation()}>
                            Student Visa
                          </Link>
                        </li>
                        <li>
                          <Link to="/services/immigration/visit-visa" onClick={(e) => e.stopPropagation()}>
                            Visit Visa
                          </Link>
                        </li>
                      </ul>
                    </>
                  ) : dest.name === "CANADA" ? (
                    <>
                      <p className="fw-bold text-center mb-2">{dest.name} Visa Options</p>
                      <ul className="list-unstyled text-center">
                        <li>
                          <Link to="/services/education/student-visa" onClick={(e) => e.stopPropagation()}>
                            Student Visa
                          </Link>
                        </li>
                        <li>
                          <Link to="/services/immigration/partner-visa" onClick={(e) => e.stopPropagation()}>
                            Partner Visa
                          </Link>
                        </li>
                      </ul>
                    </>
                  ) : dest.name === "GERMANY" ? (
                    <>
                      <p className="fw-bold text-center mb-2">{dest.name} Visa Options</p>
                      <ul className="list-unstyled text-center">
                        <li>
                          <Link to="/services/immigration/visit-visa" onClick={(e) => e.stopPropagation()}>
                            Visit Visa
                          </Link>
                        </li>
                      </ul>
                    </>
                  ) : dest.name === "Ireland" ? (
                    <>
                      <p className="fw-bold text-center mb-2">{dest.name} Visa Options</p>
                      <ul className="list-unstyled text-center">
                        <li>
                          <Link to="/services/education/student-visa" onClick={(e) => e.stopPropagation()}>
                            Student Visa
                          </Link>
                        </li>
                        <li>
                          <Link to="/services/immigration/visit-visa" onClick={(e) => e.stopPropagation()}>
                            Visit Visa
                          </Link>
                        </li>
                      </ul>
                    </>
                  ) : (
                    <p className="text-center fw-bold">More info coming soon!</p>
                  )}
                </div>
              </div>
            </div>
          </Col>
        ))}
    </Row>
  </Container>
</section>



{/* 
------------------------------VISA CATEGORY--------------------------- */}
<div className="visa-section py-5">
  <Container>
    <h2 className="text-center fw-bold animated-heading mb-5">Visa Category</h2>

    <Row className="gy-4 justify-content-center">
      {serviceCategories
        .filter(visa => 
          visa.slug === "pr-visa" || 
          visa.slug === "visit-visa" || 
          visa.slug === "business-visa" || 
          visa.slug === "student-visa"
        )
        .map((visa, idx) => (
          <Col key={idx} xs={12} sm={10} md={7} lg={5} className="d-flex">
            <div className="d-flex justify-content-center">
              <Card className="visa-card p-4 border rounded h-100 w-100">
                <div className="d-flex flex-column flex-md-row align-items-center  h-100">
                  <Image
                    src={visa.img}
                    alt={visa.title}
                    className="animated-img me-md-4 mb-4 mb-md-0 flex-shrink-0"
                    width={200}
                    height={200}
                    rounded
                  />
                  <div className="d-flex flex-column justify-content-between h-100 flex-fill">
                    <div>
                      <h5 className="fw-bold text-dark mb-2">{visa.title}</h5>
                      <p className="text-muted small mb-3 text-justify">
                        {visa.description.length > 300
                          ? parse(visa.description.substring(0, 300) + "...")
                          : parse(visa.description)}
                      </p>
                    </div>
                   
                    <Link
                      to={`/services/${visa.type}/${visa.slug}`}
                      className="btn btn-outline-success read-more mt-3 align-self-start"
                    >
                      Read More
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="ms-2"
                        width="12"
                        height="12"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 12h14m-6-6l6 6-6 6"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </Card>
            </div>
          </Col>
        ))}
    </Row>
  </Container>
</div>
{/* --------------YOUR JOURNEY STARTS WITH US------------------------------- */}

   <main className="xgs-section py-0 my-0">
  <Container>
    
    <Row className="align-items-start gx-md-5 gy-0">
    
      <Col
  xs={12}
  md={4}
  className="d-flex flex-column align-items-center align-items-md-start pt-0 mt-0"
>
 
  {/* <Image src={XgsLogo1} alt="XGS Logo" className="logo-img" fluid /> */}
  <Image src={CountSideImg} alt="Globe Travel"  className="rounded-img" fluid />

</Col>




      
      <Col xs={12} md={8}>
        <h2 className="section-heading">Your journey starts with us!</h2>

        <p className="section-text">
          Xcel Global Services with offices in Melbourne, Adelaide, Geelong & Perth, Australia.
        </p>
        <p className="section-text">
          {/* We specialise in helping students achieve their dreams of studying abroad by
          offering expert guidance on university selection, admission procedures and visa
          assistance.
          We specialise in helping students achieve their dreams of studying abroad by
          offering expert guidance on university selection, admission procedures and visa
          assistance. */}
          Your journey to study or settle abroad begins with Xcel Global Services, where your goals become our mission. From the moment you decide to explore opportunities overseas, we offer professional, personalised guidance tailored to your aspirations. Whether it's securing university admissions, visa approvals, or planning your migration pathway, we stand by you at every step. With expert insights, trusted processes, and a welcoming approach, Xcel Global Services ensures your transition is smooth, successful, and stress-free. Let us help you turn your dreams into reality-your journey truly starts with us.

        </p>
        {/* <p className="section-text">
          For those seeking migration solutions, Xcel Global Services also ranks among
          the best migration consultants.
           For those seeking migration solutions, Xcel Global Services also ranks among
          the best migration consultants.
        </p> */}

       
        <div className="stats-container" ref={ref}>
          <div className="stat-box pink">
            <span className="stat-number">{displayed.years}</span>
            <span className="stat-label">Years Experience</span>
          </div>
          <div className="stat-box yellow">
            <span className="stat-number">{displayed.visa.toLocaleString() + "+"}</span>
            <span className="stat-label">VISA Approved</span>
          </div>
          
          <div className="stat-box red">
            <span className="stat-number">{displayed.success}%</span>
            <span className="stat-label">Admission Success</span>
          </div>
        </div>

        <br />
        {/* <div className="text-center mt-4">
          <Link to="/contact">
            <Button className="consult-btn" variant="primary">
              Get Free Consultation
            </Button>
          </Link>
</div> */}

      </Col>
    </Row>
  </Container>
</main>

{/* -----------------------ACCREDIATIONS------------------------------------ */}
 <div className="accreditations-wrapper">
      <Container className="text-center pt-5">
        <h2 className="section-title mb-5">ACCREDITATIONS</h2>
        <Row className="justify-content-center align-items-center flex-wrap gap-4">
          {logos.map((logo, index) => (
            <Col key={index} xs={6} sm={4} md="auto">
              <Image src={logo.src} alt={logo.alt} className="logo-img" />
            </Col>
          ))}
        </Row>
      </Container>



    {/* <Container className="mt-5 mb-5">
      <h3 className="training-heading mb-4">Online & Offline Training</h3>
      <Row className="justify-content-center">
        {trainingServiceCategories.map((item, index) => (
          <Col key={index} xs={12} sm={6} md={4} className="mb-4">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="training-card shadow-lg">
                <Card.Img variant="top" src={item.img} className="card-img" />
                <Card.Body className="d-flex justify-content-between align-items-start">
                  <div>
                    <Card.Title className="card-title">{item.title}</Card.Title>
                    <Card.Text className="card-text1 text-justify">
  {item.short_description.length > 40
    ? item.short_description.substring(0, 40) + "..."
    : item.short_description}
</Card.Text>

                  </div>
                 
                  <Link
                    to={`/services/${item.type}/${item.slug}`}
                    className="btn btn-outline-success read-more mt-3"
                  >
                    Read More
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="ms-2"
                      width="12"
                      height="12"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 12h14m-6-6l6 6-6 6"
                      />
                    </svg>
                  </Link>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>
    </Container> */}
        <Container className="mt-5 mb-5">
      <h3 className="training-heading mb-4">Online & Offline Training</h3>
      <Row className="justify-content-center">
        {trainingServiceCategories
          .filter(item => 
            item.slug === "ielts-coaching" || 
            item.slug === "pte-coaching" || 
            item.slug === "sat-coaching"
          )
          .map((item, index) => (
          <Col key={index} xs={12} sm={6} md={4} className="mb-4">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="training-card shadow-lg">
                <Card.Img variant="top" src={item.img} className="card-img" />
                <Card.Body className="d-flex justify-content-between align-items-start">
                  <div>
                    <Card.Title className="card-title">{item.title}</Card.Title>
                    <Card.Text className="card-text1 text-justify">
                      {item.short_description.length > 40
                        ? item.short_description.substring(0, 40) + "..."
                        : item.short_description}
                    </Card.Text>
                  </div>
                 
                  <Link
                    to={`/services/${item.type}/${item.slug}`}
                    className="btn btn-outline-success read-more mt-3"
                  >
                    Read More
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="ms-2"
                      width="12"
                      height="12"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 12h14m-6-6l6 6-6 6"
                      />
                    </svg>
                  </Link>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>
    </Container>

    </div>

{/* ---------------------------------------------------------- */}



 <section className="team-section  my-5">
  <Container>
    <h2 className="team-heading">Our Team</h2>
<div className="team-scroll-wrapper" id="team-scroll">
  {[...visibleMembers,...visibleMembers,...visibleMembers, ...visibleMembers].map((member, idx) => (
    <div key={idx} className="team-card" style={{ animationDelay: `${(idx % visibleMembers.length) * 0.2}s` }}>
      <div className="image-wrapper">
        <img src={member.img} alt={member.name} className="team-img" />
      </div>
      <h3 className="team-name">{member.name}</h3>
      <p className="team-role">
        {member.role}
        <br />
        {member.region}
      </p>
    </div>
  ))}
</div>
</Container>
</section>

    

{/* -------------TESTIMONAL SECTION------------------------------- */}

{/* <section className="testimonial-section">
      <Container>
        <Row className="justify-content-center align-items-center g-4">
          <Col md={5}>
            <img
              src={TestimonalImg}
              alt="Mutale Makungu"
              className="testimonial-img"
            />
          </Col>
          <Col md={7}>
            <div className="testimonial-content">
              <h2 className="testimonial-heading">Testimonial</h2>
              <p className="testimonial-author">By Mutale Makungu</p>
              <p className="testimonial-subtitle">Australia PR Visa</p>
              <div className="testimonial-quote">
                <FaQuoteLeft className="quote-icon" />
                <p>
                  Xcel Global had been amazing in helping me finally get my PR.
                  Pooja was incredibly supportive, and genuinely dedicated to
                  helping us. Her communication was excellent, and her
                  professionalism gave us so much confidence throughout the
                  process. We’re extremely happy with the service and highly
                  recommend Xcel Global for their services!
                </p>
              </div>
              <div className="testimonial-nav">
                <Button className="nav-btn" aria-label="Previous testimonial">
                  <FiChevronLeft />
                </Button>
                <Button className="nav-btn" aria-label="Next testimonial">
                  <FiChevronRight />
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>



       
    </section> */}

{/* <section className="testimonial-section">
  <Container>
    <Row className="justify-content-center align-items-center g-4">
      <Col md={5}>
        <img
          src={currentTestimonial.image}
          alt={currentTestimonial.author}
          className="testimonial-img"
        />
      </Col>
      <Col md={7}>
        <div className="testimonial-content">
          {/* <h2 className="testimonial-heading">Review
            <span>
                 <img
  src="https://img.freepik.com/free-photo/brunette-business-woman-with-wavy-long-hair-blue-eyes-stands-holding-notebook-hands_197531-343.jpg?semt=ais_hybrid&w=740"  // Replace with your actual image path or import
  alt="Reviewer"
  className="review-circle-img"
/>
            </span>
          </h2> *}
          <h2 className="testimonial-heading">
  Review
  <span className="inline-image">
    <img
      src="https://img.freepik.com/free-photo/brunette-business-woman-with-wavy-long-hair-blue-eyes-stands-holding-notebook-hands_197531-343.jpg?semt=ais_hybrid&w=740"
      alt="Reviewer"
      className="review-circle-img"
    />
  </span>
</h2>

    
          <p className="testimonial-author">By {currentTestimonial.author}</p>
          <p className="testimonial-subtitle">{currentTestimonial.subtitle}</p>
          <div className="testimonial-quote">
            <FaQuoteLeft className="quote-icon" />
            <p>{currentTestimonial.text}</p>
          </div>
          <div className="testimonial-nav">
            <Button className="nav-btn" onClick={handlePrev}>
              <FiChevronLeft />
            </Button>
            <Button className="nav-btn" onClick={handleNext}>
              <FiChevronRight />
            </Button>
          </div>
        </div>
      </Col>
    </Row>
  </Container>
</section> */}



{/* -------------------recent news------------------------------------------- */}
{/* <section className="recent-news-section">
      <Container>
        <h2 className="section-title">Recent News</h2>

<div className="scroll-container" ref={scrollRef}>
  <Row className="gy-4 flex-nowrap scroll-row">

        {/* <Row className="gy-4 justify-content-center"> *}


          {newsData.map((news, idx) => (
            <Col key={idx} xs={12} md={6} lg={4}>
              <article className="news-card">
                <div className="news-header">
                  <h3 className="news-subtitle">
                    {news.subtitle} <br />
                    <span className="highlight">{news.highlight}</span>
                  </h3>
                  <img src={news.img} alt="news" className="news-image" />
                  <div className="highlight-bar"></div>
                </div>
                <div className="news-body">
                  <div className="news-meta">
                    <span><FaCalendarAlt /> {news.date}</span>
                    <span><FaUser /> By admin</span>
                  </div>
                  <h4 className="news-title">{news.title}</h4>
                  <p className="news-desc">
                    The Department of Home Affairs is enhancing user security by introducing Multi-factor Authentication (MFA) for ImmiAccount…
                  </p>
                  <div className="read-more">
                    <Button variant="outline-success" className="read-more-btn">
                      Read More <FaArrowRight className="ms-1" />
                    </Button>
                  </div>
                </div>
              </article>
            </Col>
          ))}
        </Row>
        </div>
        
        <div className="news-navigation text-center mt-4">
  <Button className="nav-btn prev me-2" onClick={scrollLeft}><FaArrowLeft /></Button>
  <Button className="nav-btn next" onClick={scrollRight}><FaArrowRight /></Button>
</div>

      </Container>
    </section> */}
{/* -----------------RECENT BLOGS--------------------------------------- */}

 {/* <section className="blog-section">
      <Container>
        <h2 className="blog-title">Recent Blogs</h2>
<div className="blog-scroll-container" ref={blogScrollRef}>
  <Row className="g-4 flex-nowrap scroll-row">
        {/* <Row className="g-4"> *}
          {blogs.map((blog, index) => (
            <Col key={index} xs={12} md={6} lg={4}>
              <Card className="blog-card h-100">
                <Card.Img
                  variant="top"
                  src={blog.image}
                  alt={blog.title}
                  className="blog-img"
                />
                <Card.Body className="blog-card-body">
                  <div className="blog-meta">
                    <span>
                      <i className="fas fa-calendar-alt" /> {blog.date}
                    </span>
                    <span>
                      <i className="fas fa-user" /> {blog.author}
                    </span>
                  </div>
                  <Card.Title className="blog-card-title">
                    {blog.title}
                  </Card.Title>
                  <Card.Text className="blog-desc">{blog.description}</Card.Text>
                  <Button variant="outline-success" className="read-more-btn">
                    Read More <i className="fas fa-arrow-right" />
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
       
        <div className="blog-navigation text-center mt-4">
  <button className="nav-btn left me-2" onClick={blogScrollLeft} aria-label="Previous">
    <i className="fas fa-arrow-left"></i>
  </button>
  <button className="nav-btn right" onClick={blogScrollRight} aria-label="Next">
    <i className="fas fa-arrow-right"></i>
  </button>
</div>
 
      </Container>
    </section> */}
{/* ----------------------worldimage-------------------------------------- */}

 {/* <div className="text-center my-5">
      <h2
        ref={headingRef}
        className={`global-heading ${isVisible ? "animate" : ""}`}
      >
        Our Global Presence
      </h2>
    </div>

     <Container fluid className="p-0 m-0">
      <Image
        src={worldImage}
        alt="Responsive Image"
        fluid
       
          className={`full-width-image ${isImageInView ? "animate-up" : ""}`}
      />
    </Container> */}
    {/* <div className="text-center my-5">
         <h2
           ref={headingRef}
           className={`global-heading ${isVisible ? "animate" : ""}`}
         >
           Our Global Presence
         </h2>
       </div>
   
        <Container fluid className="p-0 m-0">
         <Image
           src={worldImage}
           alt="Responsive Image"
           fluid
           // className="full-width-image"
             // className={`full-width-image ${inView ? "animate-up" : ""}`}
             className={`full-width-image ${isImageInView ? "animate-up" : ""}`}
         />
       </Container> */}
   
{/* ---------------------------------------------------------- */}
{/* Left-Aligned Consultation Modal - 50% Width */}
{show && (
  <>
    {/* Custom Backdrop */}
    <div 
      className="custom-modal-backdrop"
      onClick={handleClose}
    />
    
    {/* Custom Left Side Modal - 50% Width */}
    <div className="custom-left-modal">
      <div className="custom-modal-header">
        <h5 className="text-white mb-0">
          {formSubmitted ? "🎉 Thank You!" : "✨ Get in Touch"}
        </h5>
        <button 
          type="button" 
          className="btn-close btn-close-white" 
          onClick={handleClose}
          aria-label="Close"
        ></button>
      </div>
      
      <div className="custom-modal-body">
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
          {/* <Form.Group className="mb-3" controlId="formLookingFor">
            <Form.Label>Looking For Visa*</Form.Label>
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
          </Form.Group> */}

          {/* Other Services Comment */}
          {/* {formData.lookingFor === "Other Services" && (
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
          )} */}
          {/* Looking For */}
<Form.Group className="mb-3" controlId="formLookingFor">
  <Form.Label>Looking For Visa*</Form.Label>
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

{/* Other Services Checkboxes */}
{formData.lookingFor === "Other Services" && (
  <Form.Group className="mb-3" controlId="formOtherServices">
    <Form.Label>Select Other Services *</Form.Label>
    <div>
      <Form.Check
        type="checkbox"
        label="Student Insurance"
        checked={formData.studentInsurance || false}
        onChange={(e) => setFormData({ 
          ...formData, 
          studentInsurance: e.target.checked 
        })}
        className="mb-2"
      />
      <Form.Check
        type="checkbox"
        label="Student Accommodation"
        checked={formData.studentAccommodation || false}
        onChange={(e) => setFormData({ 
          ...formData, 
          studentAccommodation: e.target.checked 
        })}
      />
    </div>
  </Form.Group>
)}

{/* Other Services Comment - Only show if no checkboxes selected */}
{formData.lookingFor === "Other Services" && 
 (!formData.studentInsurance && !formData.studentAccommodation) && (
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

          {/* General Comments */}
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

            {/* Additional Comments for Other Services when checkboxes ARE selected */}
  {formData.lookingFor === "Other Services" && 
   (formData.studentInsurance || formData.studentAccommodation) && (
    <Form.Group className="mb-3" controlId="formCommentOther">
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
    </div>
  </>
)}




   







{/* ------------------------------------------------------- */}
</>

  );
};

export default Home;

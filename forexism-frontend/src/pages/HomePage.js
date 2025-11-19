import React, { useState, useEffect, useRef } from 'react';
import { Star, CheckCircle, Video, BarChart3, Zap, ChevronDown, ChevronUp, Award, Shield, FileText, Download, ExternalLink, X, ArrowLeft, Play, Users, Target, Brain, TrendingUp, Rocket, Clock, BookOpen, Mail, Phone, Sparkles, Trophy, Heart, TrendingUp as TrendingUpIcon, Gem, Crown, Coins, Wallet, Globe, Smartphone, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const HomePage = ({ setCurrentPage, isAuthenticated, setShowAuthModal, setAuthMode }) => {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [openFAQ, setOpenFAQ] = useState(null);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [animatedText, setAnimatedText] = useState('');
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isVisible, setIsVisible] = useState({});
  const [isTyping, setIsTyping] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [sliderDirection, setSliderDirection] = useState(1);

  const lines = [
    "Learn the things no one ever taught before",
    "Unlock Your Trading Potential",
    "with Expert Guidance!"
  ];

  // Forex images for the slider
  const forexImages = [
    "/images/forex1.jpg",
    "/images/forex2.jpg", 
    "/images/forex3.jpg",
    "/images/forex4.jpg"
  ];

  // Image slider animation
  useEffect(() => {
    const interval = setInterval(() => {
      setSliderDirection(1);
      setCurrentImageIndex((prev) => (prev + 1) % forexImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const nextImage = () => {
    setSliderDirection(1);
    setCurrentImageIndex((prev) => (prev + 1) % forexImages.length);
  };

  const prevImage = () => {
    setSliderDirection(-1);
    setCurrentImageIndex((prev) => (prev - 1 + forexImages.length) % forexImages.length);
  };

  // Enhanced text animation with perfect timing
  useEffect(() => {
    setIsTyping(true);
    setAnimatedText('');
    let currentText = '';
    let currentIndex = 0;
    const currentLine = lines[currentLineIndex];
    
    const typeWriter = () => {
      if (currentIndex < currentLine.length) {
        currentText += currentLine.charAt(currentIndex);
        setAnimatedText(currentText);
        currentIndex++;
        setTimeout(typeWriter, 80);
      } else {
        setIsTyping(false);
        setTimeout(() => {
          setCurrentLineIndex((prev) => (prev + 1) % lines.length);
        }, 2000);
      }
    };

    const timer = setTimeout(typeWriter, 500);
    return () => clearTimeout(timer);
  }, [currentLineIndex]);

  // Cursor blink effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  // Mouse move effect for parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll progress and animations
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);

      // Section animations
      const sections = document.querySelectorAll('.animate-on-scroll');
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8;
        if (isVisible) {
          setIsVisible(prev => ({ ...prev, [section.id]: true }));
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Particle effect for hero section
  useEffect(() => {
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'absolute w-1 h-1 bg-[#0076FF] rounded-full animate-float-particle';
      particle.style.left = Math.random() * 100 + 'vw';
      particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
      particle.style.animationDelay = Math.random() * 5 + 's';
      particle.style.opacity = Math.random() * 0.6 + 0.2;
      document.getElementById('particle-container')?.appendChild(particle);

      setTimeout(() => {
        particle.remove();
      }, 15000);
    };

    const interval = setInterval(createParticle, 300);
    return () => clearInterval(interval);
  }, []);

  const pakistaniReviews = [
    {
      name: "Ahmed Raza",
      location: "Karachi",
      initial: "AR",
      color: "from-blue-500 to-cyan-500",
      rating: 5,
      review: "Forexism transformed my life! From struggling to consistent profits. Atif Bhai's guidance is priceless for Pakistani traders.",
      profit: "+$12,500",
      profession: "Former Bank Employee"
    },
    {
      name: "Sara Khan",
      location: "Lahore",
      initial: "SK",
      color: "from-purple-500 to-pink-500",
      rating: 5,
      review: "As a housewife, I never thought I could trade. Now I'm earning from home! Shukriya Forexism team!",
      profit: "+$8,200",
      profession: "Housewife"
    },
    {
      name: "Bilal Ahmed",
      location: "Islamabad",
      initial: "BA",
      color: "from-green-500 to-emerald-500",
      rating: 5,
      review: "Passed FTMO challenge in first attempt! The structure-based method really works. JazakAllah!",
      profit: "+$25,000",
      profession: "Software Engineer"
    },
    {
      name: "Usman Ali",
      location: "Rawalpindi",
      initial: "UA",
      color: "from-orange-500 to-red-500",
      rating: 5,
      review: "Left my 9-5 job after 6 months of learning. Now earning 3x more with time freedom!",
      profit: "+$15,000",
      profession: "Ex-Marketing Manager"
    }
  ];

  const features = [
    {
      icon: BarChart3,
      title: "Smart Money Concepts",
      description: "Learn institutional trading strategies that banks use",
      color: "from-blue-500 to-cyan-500",
      delay: "0ms"
    },
    {
      icon: Target,
      title: "High Accuracy Setups",
      description: "85%+ win rate strategies with clear entry/exit rules",
      color: "from-purple-500 to-pink-500",
      delay: "100ms"
    },
    {
      icon: Brain,
      title: "Trading Psychology",
      description: "Master your mindset for consistent profitability",
      color: "from-green-500 to-emerald-500",
      delay: "200ms"
    },
    {
      icon: Shield,
      title: "Risk Management",
      description: "Protect your capital while maximizing returns",
      color: "from-orange-500 to-red-500",
      delay: "300ms"
    },
    {
      icon: Zap,
      title: "Live Trading",
      description: "Real-time market analysis and trade executions",
      color: "from-yellow-500 to-amber-500",
      delay: "400ms"
    },
    {
      icon: Users,
      title: "Community Support",
      description: "24/7 access to mentors and successful traders",
      color: "from-indigo-500 to-blue-500",
      delay: "500ms"
    }
  ];

  const stats = [
    { number: "2,847", label: "Successful Traders", icon: Users, suffix: "+", color: "from-blue-500 to-cyan-500" },
    { number: "4.9", label: "Student Rating", icon: Star, suffix: "/5", color: "from-yellow-500 to-amber-500" },
    { number: "94", label: "Success Rate", icon: TrendingUp, suffix: "%", color: "from-green-500 to-emerald-500" },
    { number: "15", label: "Hours Content", icon: Clock, suffix: "+", color: "from-purple-500 to-pink-500" }
  ];

  const transformationStories = [
    {
      before: "Struggling 9-5 Job",
      after: "Financial Freedom",
      income: "$3,500/month",
      duration: "6 Months",
      image: "/stories/1.jpg"
    },
    {
      before: "College Student",
      after: "Full-Time Trader",
      income: "$2,800/month",
      duration: "4 Months",
      image: "/stories/2.jpg"
    },
    {
      before: "Housewife",
      after: "Home Trader",
      income: "$1,900/month",
      duration: "5 Months",
      image: "/stories/3.jpg"
    },
    {
      before: "Freelancer",
      after: "Prop Firm Trader",
      income: "$5,200/month",
      duration: "8 Months",
      image: "/stories/4.jpg"
    }
  ];

  // Complete certificates array with all 16 certificates
  const allCertificates = [
    {
      id: 1,
      image: "/certificates/c1.jpg",
      title: "PropFirm Account Verification Success",
      type: "Verification",
      description: "Successfully passed prop firm verification requirements"
    },
    {
      id: 2,
      image: "/certificates/c2.jpg",
      title: "FTMO Challenge Phase 1 Passed",
      type: "Challenge Success",
      description: "Successfully completed FTMO Challenge Phase 1"
    },
    {
      id: 3,
      image: "/certificates/c3.jpg",
      title: "Trading Profit Payout Certificate",
      type: "Payout Proof",
      description: "Verified profit withdrawal from trading account"
    },
    {
      id: 4,
      image: "/certificates/c4.jpg",
      title: "High-Value Profit Withdrawal",
      type: "Major Payout",
      description: "Substantial profit payout from funded account"
    },
    {
      id: 5,
      image: "/certificates/c5.jpg",
      title: "Premium Account Profit Distribution",
      type: "Major Payout",
      description: "Large-scale profit withdrawal achievement"
    },
    {
      id: 6,
      image: "/certificates/c6.jpg",
      title: "Trading Excellence Recognition",
      type: "Achievement",
      description: "Outstanding performance in trading activities"
    },
    {
      id: 7,
      image: "/certificates/c7.jpg",
      title: "Professional Trader Certification",
      type: "Achievement",
      description: "Certified professional trading status achieved"
    },
    {
      id: 8,
      image: "/certificates/c8.jpg",
      title: "Advanced Trading Milestone",
      type: "Achievement",
      description: "Reached advanced trading performance milestone"
    },
    {
      id: 9,
      image: "/certificates/c9.jpg",
      title: "Consistent Profitability Award",
      type: "Achievement",
      description: "Demonstrated consistent profitable trading"
    },
    {
      id: 10,
      image: "/certificates/c10.jpg",
      title: "Royal Trading Challenge Phase 2",
      type: "Challenge Success",
      description: "Successfully completed Royal Challenge Phase 2"
    },
    {
      id: 11,
      image: "/Images/F2.jpg",
      title: "Elite Trader Recognition",
      type: "Achievement",
      description: "Elite level trading performance recognition"
    },
    {
      id: 12,
      image: "/Images/F4.jpg",
      title: "Master Trader Achievement",
      type: "Achievement",
      description: "Master level trading expertise demonstrated"
    },
    {
      id: 13,
      image: "/Images/F5.jpg",
      title: "Trading Champion Award",
      type: "Achievement",
      description: "Champion performance in trading competition"
    },
    {
      id: 14,
      image: "/Images/F1.jpg",
      title: "Funded Account Leaderboard Top 10",
      type: "Leaderboard",
      description: "Ranked in top 10 funded traders leaderboard"
    },
    {
      id: 15,
      image: "/Images/F6.jpg",
      title: "Expert Trader Certification",
      type: "Achievement",
      description: "Expert level trading certification awarded"
    },
    {
      id: 16,
      image: "/Images/F7.jpg",
      title: "Distinguished Trading Performance",
      type: "Achievement",
      description: "Distinguished performance in trading excellence"
    }
  ];

  const faqs = [
    {
      question: "What is different in this course than courses of other mentors?",
      answer: "Our course offers a unique Structure-Based Trading methodology combined with live trading sessions and lifetime support. Unlike other courses, we provide practical, real-time market examples with hands-on practice. You'll learn from experienced traders who have been in the market for years, focusing on both technical and fundamental analysis. Plus, you get access to our exclusive community and PropFirm guidance to help you become a funded trader."
    },
    {
      question: "My English is not very good, can I learn trading?",
      answer: "Absolutely! Our course is designed to be beginner-friendly and easy to understand. We explain concepts in simple language with visual examples and charts. Many of our successful students started with basic English. The important thing is understanding the market concepts, which we teach through practical demonstrations and real trading examples. You can also ask questions in our community support, and our team is always ready to help clarify any doubts."
    },
    {
      question: "Which broker is best for trading?",
      answer: "We recommend regulated brokers with low spreads and reliable execution. Popular choices include IC Markets, XM, and Exness for international traders. For Pakistani traders, we also guide you on how to choose brokers that accept local payment methods. The best broker depends on your trading style, capital, and preferences. We provide detailed broker comparison and guidance in our course to help you make the right choice based on your needs."
    },
    {
      question: "Is crypto trading better or forex trading?",
      answer: "Both have their advantages! Forex markets are more stable and liquid with 24/5 trading, making them ideal for beginners. Crypto offers higher volatility and 24/7 trading but comes with more risk. Our course teaches you strategies that work in both markets - stocks, forex, and crypto. We recommend starting with forex to learn the fundamentals, then expanding to crypto once you're confident. The methodology we teach applies to all financial markets."
    },
    {
      question: "Is this course one time education only?",
      answer: "No! This is lifetime access education. Once you enroll, you get permanent access to all course materials, including future updates and new content. You'll also have lifetime access to our community support, live trading sessions, and market analysis. We continuously update our course with new strategies and market insights. Plus, you can revisit lessons anytime you want to refresh your knowledge or learn advanced concepts as you grow as a trader."
    }
  ];

  const displayedCertificates = showAllCertificates ? allCertificates : allCertificates.slice(0, 6);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReviewIndex((prev) => (prev + 1) % pakistaniReviews.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (selectedCertificate) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedCertificate]);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const handleCertificateClick = (certificate) => {
    setSelectedCertificate(certificate);
  };

  const closeCertificateModal = () => {
    setSelectedCertificate(null);
  };

  // Function to handle free masterclass click
  const handleFreeMasterclassClick = () => {
    setCurrentPage('courses');
    // This will trigger the free courses view in CoursesPage
    setTimeout(() => {
      const event = new CustomEvent('navigateToFreeCourses');
      window.dispatchEvent(event);
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#0a1628] text-white overflow-x-hidden">
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-particle {
          0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 0.5; }
          100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
        }
        @keyframes glow {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(0, 118, 255, 0.3),
                       0 0 40px rgba(0, 118, 255, 0.2),
                       0 0 60px rgba(0, 118, 255, 0.1);
          }
          50% { 
            box-shadow: 0 0 30px rgba(0, 118, 255, 0.6),
                       0 0 60px rgba(0, 118, 255, 0.4),
                       0 0 90px rgba(0, 118, 255, 0.2);
          }
        }
        @keyframes slideIn {
          from { 
            transform: translateX(-100px) scale(0.9); 
            opacity: 0; 
          }
          to { 
            transform: translateX(0) scale(1); 
            opacity: 1; 
          }
        }
        @keyframes bounceIn {
          0% { transform: scale(0.3) rotate(-10deg); opacity: 0; }
          50% { transform: scale(1.05) rotate(5deg); }
          70% { transform: scale(0.95); }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(50px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes pulse-glow {
          0%, 100% { 
            transform: scale(1);
            box-shadow: 0 0 20px rgba(0, 118, 255, 0.4);
          }
          50% { 
            transform: scale(1.05);
            box-shadow: 0 0 40px rgba(0, 118, 255, 0.8);
          }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        @keyframes star-twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes hologram {
          0% { 
            background-position: 0% 0%;
            opacity: 0.7;
          }
          50% { 
            background-position: 100% 100%;
            opacity: 1;
          }
          100% { 
            background-position: 0% 0%;
            opacity: 0.7;
          }
        }
        @keyframes matrix {
          0% { transform: translateY(-100px) rotateX(90deg); opacity: 0; }
          50% { opacity: 0.8; }
          100% { transform: translateY(100vh) rotateX(0deg); opacity: 0; }
        }
        @keyframes slideInFromRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideInFromLeft {
          from { transform: translateX(-100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutToLeft {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(-100%); opacity: 0; }
        }
        @keyframes slideOutToRight {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(100%); opacity: 0; }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-particle { animation: float-particle 15s linear infinite; }
        .animate-glow { animation: glow 3s ease-in-out infinite; }
        .animate-slide-in { animation: slideIn 1s ease-out; }
        .animate-bounce-in { animation: bounceIn 1s ease-out; }
        .animate-fade-in-up { animation: fadeInUp 0.8s ease-out; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        .animate-star-twinkle { animation: star-twinkle 3s ease-in-out infinite; }
        .animate-hologram { 
          animation: hologram 4s ease-in-out infinite;
          background: linear-gradient(45deg, 
            rgba(0, 118, 255, 0.1) 0%, 
            rgba(0, 198, 255, 0.2) 25%, 
            rgba(0, 118, 255, 0.1) 50%, 
            rgba(0, 198, 255, 0.2) 75%, 
            rgba(0, 118, 255, 0.1) 100%);
          background-size: 400% 400%;
        }
        .shimmer-text {
          background: linear-gradient(90deg, #0076FF, #00C6FF, #0076FF);
          background-size: 1000px 100%;
          animation: shimmer 3s infinite linear;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .matrix-rain {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: hidden;
        }
        .matrix-char {
          position: absolute;
          color: #00C6FF;
          font-family: 'Courier New', monospace;
          font-weight: bold;
          animation: matrix 3s linear infinite;
          text-shadow: 0 0 8px #00C6FF;
        }
        .parallax-bg {
          transform: translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px);
        }
        .parallax-content {
          transform: translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px);
        }
        .slider-container {
          position: relative;
          background: linear-gradient(145deg, #0a1628 0%, #0f1f3a 50%, #0a1628 100%);
          border-radius: 24px;
          overflow: hidden;
          transform-style: preserve-3d;
          perspective: 1000px;
        }
        .slider-frame {
          position: relative;
          border: 3px solid;
          border-image: linear-gradient(45deg, #0076FF, #00C6FF, #0076FF) 1;
          border-radius: 20px;
          background: rgba(0, 0, 0, 0.9);
          transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .slider-glow {
          position: absolute;
          top: -10px;
          left: -10px;
          right: -10px;
          bottom: -10px;
          background: linear-gradient(45deg, #0076FF, #00C6FF, #0076FF);
          border-radius: 24px;
          filter: blur(20px);
          opacity: 0.3;
          z-index: -1;
        }
        .slide-enter-right {
          animation: slideInFromRight 0.8s ease-out forwards;
        }
        .slide-enter-left {
          animation: slideInFromLeft 0.8s ease-out forwards;
        }
        .slide-exit-left {
          animation: slideOutToLeft 0.8s ease-out forwards;
        }
        .slide-exit-right {
          animation: slideOutToRight 0.8s ease-out forwards;
        }
      `}</style>

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-700 z-50">
        <div 
          className="h-full bg-gradient-to-r from-[#0076FF] to-[#00C6FF] transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* Supreme Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0a1628] via-[#0f1f3a] to-[#0a1628] pt-24">
        {/* Animated Stars Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(80)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-star-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            ></div>
          ))}
        </div>
        
        {/* Matrix Rain Effect */}
        <div className="matrix-rain">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="matrix-char"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
                fontSize: `${14 + Math.random() * 10}px`
              }}
            >
              {Math.random() > 0.5 ? '0' : '1'}
            </div>
          ))}
        </div>
        
        {/* Particle Container */}
        <div id="particle-container" className="absolute inset-0 pointer-events-none"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full filter blur-[100px] opacity-20 animate-float parallax-bg"
            style={{ transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)` }}
          ></div>
          <div 
            className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full filter blur-[100px] opacity-20 animate-float parallax-bg"
            style={{ animationDelay: '2s', transform: `translate(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px)` }}
          ></div>
          <div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#0076FF] to-[#0056CC] rounded-full filter blur-[120px] opacity-10 animate-pulse parallax-bg"
            style={{ transform: `translate(${mousePosition.x * 0.2}px, ${mousePosition.y * 0.2}px)` }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Hero Content */}
            <div className="space-y-8 animate-slide-in parallax-content">
              {/* Premium Badge - Fixed positioning with proper margin */}
              <div className="inline-flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-[#0076FF] to-[#0056CC] rounded-full backdrop-blur-sm border border-[#0076FF]/30 animate-glow mb-8 transform hover:scale-105 transition-transform duration-300">
                <Trophy className="h-5 w-5 text-yellow-400 animate-pulse" />
                <span className="text-white font-bold text-sm uppercase tracking-wider">#1 Trading Platform in Pakistan</span>
              </div>

              {/* Enhanced Animated Main Heading */}
              <div className="space-y-6">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight">
                  <span className="block text-white min-h-[84px] flex items-center">
                    {animatedText}
                    <span className={`inline-block w-2 h-16 bg-[#0076FF] ml-2 ${showCursor && isTyping ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 animate-pulse`}></span>
                  </span>
                  <span className="block shimmer-text mt-4 text-4xl sm:text-5xl">
                    Start Your Journey Today!
                  </span>
                </h1>
              </div>

              {/* Emotional Subheading */}
              <p className="text-2xl sm:text-3xl text-blue-100 leading-relaxed font-medium animate-fade-in-up">
                Join <span className="text-yellow-400 font-bold animate-pulse">2,847+</span> Pakistani Traders Who Found 
                <span className="text-green-400 font-bold"> Financial Freedom </span>
                Through Our Proven System!
              </p>

              {/* Emotional Benefits */}
              <div className="grid grid-cols-2 gap-6 py-6">
                {[
                  { text: "Quit Your 9-5 Job", icon: "💼", color: "from-red-500 to-pink-500" },
                  { text: "Work From Anywhere", icon: "🌍", color: "from-blue-500 to-cyan-500" },
                  { text: "Financial Independence", icon: "💰", color: "from-green-500 to-emerald-500" },
                  { text: "Time Freedom", icon: "⏰", color: "from-purple-500 to-pink-500" }
                ].map((item, index) => (
                  <div 
                    key={index} 
                    className="flex items-center space-x-3 group transform hover:scale-105 transition-all duration-300"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <span className="text-xl">{item.icon}</span>
                    </div>
                    <span className="text-white font-bold text-lg">{item.text}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 pt-8">
                <button
                  onClick={() => setCurrentPage('courses')}
                  className="group px-12 py-5 bg-gradient-to-r from-[#0076FF] to-[#0056CC] text-white rounded-2xl hover:from-[#0056CC] hover:to-[#0076FF] transition-all duration-500 font-black text-xl shadow-2xl hover:shadow-[#0076FF]/50 hover:scale-105 transform animate-pulse-glow relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  <span className="flex items-center space-x-3 relative z-10">
                    <Rocket className="h-6 w-6 group-hover:animate-bounce" />
                    <span>START YOUR JOURNEY →</span>
                  </span>
                </button>
                
                <button
                  onClick={handleFreeMasterclassClick}
                  className="px-12 py-5 bg-white/10 text-white rounded-2xl hover:bg-white/20 transition-all duration-500 font-bold text-xl backdrop-blur-sm border-2 border-white/20 hover:border-white/40 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0076FF]/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  <span className="flex items-center space-x-3 relative z-10">
                    <Play className="h-6 w-6 group-hover:scale-110 transition-transform" />
                    <span>Watch Free Masterclass</span>
                  </span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center justify-between pt-8">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-3">
                    <div className="flex -space-x-3">
                      {[1,2,3,4].map((i) => (
                        <div 
                          key={i} 
                          className="w-10 h-10 bg-gradient-to-r from-[#0076FF] to-[#0056CC] rounded-full border-2 border-[#0a1628] animate-bounce shadow-lg"
                          style={{animationDelay: `${i * 0.2}s`}}
                        ></div>
                      ))}
                    </div>
                    <div>
                      <div className="text-white font-black text-lg">2,847+</div>
                      <div className="text-blue-300 text-sm">Happy Traders</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 animate-pulse" style={{animationDelay: `${i * 0.1}s`}} />
                      ))}
                    </div>
                    <div className="text-blue-300 text-sm">4.9/5 Rating</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Image Slider */}
            <div className="relative animate-bounce-in parallax-content">
              <div className="slider-container">
                <div className="slider-glow"></div>
                <div className="slider-frame">
                  {/* Holographic Effect Overlay */}
                  <div className="absolute inset-0 animate-hologram rounded-[17px] pointer-events-none z-10"></div>
                  
                  {/* Main Slider Content */}
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[17px]">
                    {forexImages.map((image, index) => (
                      <div
                        key={index}
                        className={`absolute inset-0 transition-all duration-800 ease-in-out ${
                          index === currentImageIndex
                            ? sliderDirection > 0 
                              ? 'slide-enter-right' 
                              : 'slide-enter-left'
                            : index < currentImageIndex
                            ? 'slide-exit-left'
                            : 'slide-exit-right'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`Forex Trading Education ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%231e293b"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%2394a3b8" font-family="Arial" font-size="16"%3EForex Trading%3C/text%3E%3C/svg%3E';
                          }}
                        />
                        
                        {/* Image Overlay with Info */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 flex items-end">
                          <div className="p-6 text-white w-full">
                            <div className="flex items-center justify-between mb-2">
                              <span className="px-3 py-1 bg-[#0076FF] rounded-full text-sm font-bold">
                                Image {index + 1} of {forexImages.length}
                              </span>
                              <span className="px-3 py-1 bg-green-600 rounded-full text-sm font-bold animate-pulse">
                                LIVE TRADING
                              </span>
                            </div>
                            <h3 className="text-xl font-bold mb-1">Professional Trading Setup</h3>
                            <p className="text-blue-100 text-sm">Real market analysis & strategies</p>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {/* Navigation Arrows */}
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 z-20 backdrop-blur-sm border border-white/20 hover:scale-110"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 z-20 backdrop-blur-sm border border-white/20 hover:scale-110"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>

                    {/* Dots Indicator */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                      {forexImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setSliderDirection(index > currentImageIndex ? 1 : -1);
                            setCurrentImageIndex(index);
                          }}
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === currentImageIndex
                              ? 'bg-[#0076FF] scale-125'
                              : 'bg-white/50 hover:bg-white/70'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Slider Info Bar */}
                <div className="relative bg-gradient-to-r from-[#0076FF] to-[#0056CC] px-8 py-6 rounded-b-[20px] overflow-hidden">
                  {/* Animated Background Pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-20 h-20 bg-white/30 rounded-full filter blur-xl animate-float"></div>
                    <div className="absolute bottom-0 right-0 w-20 h-20 bg-white/30 rounded-full filter blur-xl animate-float" style={{animationDelay: '1s'}}></div>
                  </div>
                  
                  <div className="relative z-10 flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="flex items-center space-x-2 bg-red-600 px-4 py-2 rounded-xl animate-pulse">
                          <div className="w-3 h-3 bg-white rounded-full animate-ping"></div>
                          <span className="text-white font-bold text-sm">PROFESSIONAL SETUPS</span>
                        </div>
                        <span className="text-blue-100 text-lg font-medium">Real Trading Examples</span>
                      </div>
                      <div className="text-white font-black text-xl">
                        See Our Professional Trading Environment
                      </div>
                      <div className="text-blue-100 text-sm mt-1">
                        Advanced tools and strategies for successful trading
                      </div>
                    </div>
                    <div className="bg-white/20 p-3 rounded-xl group-hover:scale-110 transition-transform backdrop-blur-sm">
                      <TrendingUp className="h-8 w-8 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Success Elements */}
              <div className="absolute -top-6 -right-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-2xl font-black text-lg transform rotate-12 shadow-2xl animate-float group hover:scale-110 transition-transform cursor-pointer border-2 border-white/20">
                Success Stories
              </div>
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-yellow-500 to-amber-500 text-[#0a1628] px-6 py-3 rounded-2xl font-black text-lg transform -rotate-12 shadow-2xl animate-float group hover:scale-110 transition-transform cursor-pointer border-2 border-white/20" style={{animationDelay: '1s'}}>
                94% Success Rate
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="text-center">
            <div className="w-6 h-10 border-4 border-[#0076FF] rounded-full flex justify-center mb-2">
              <div className="w-2 h-3 bg-[#0076FF] rounded-full mt-2 animate-pulse"></div>
            </div>
            <div className="text-[#0076FF] font-bold text-sm">Scroll to Explore</div>
          </div>
        </div>
      </section>

      {/* Emotional Stats Section */}
      <section id="stats" className="animate-on-scroll relative py-20 bg-gradient-to-br from-[#0a1628] via-[#0f1f3a] to-[#0a1628]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className={`text-center transform transition-all duration-1000 ${
                  isVisible.stats ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="bg-gradient-to-br from-[#0f1f3a] to-[#0a1628] border-2 border-[#0076FF]/30 rounded-2xl p-8 hover:border-[#0076FF] hover:scale-105 transition-all duration-300 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0076FF] to-[#0056CC] opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                  <div className="bg-gradient-to-r from-[#0076FF] to-[#0056CC] p-4 rounded-2xl w-fit mx-auto mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg">
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-5xl font-black bg-gradient-to-r from-[#0076FF] to-[#00C6FF] bg-clip-text text-transparent mb-2">
                    {stat.number}<span className="text-3xl">{stat.suffix}</span>
                  </div>
                  <div className="text-gray-300 font-bold text-lg uppercase tracking-wide">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emotional Features Section */}
      <section id="features" className="animate-on-scroll relative py-20 bg-gradient-to-br from-[#0a1628] via-[#0f1f3a] to-[#0a1628]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl sm:text-6xl font-black text-white mb-6">
              Why <span className="shimmer-text">Forexism</span> Changes Lives?
            </h2>
            <p className="text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              We don't just teach trading - we provide a complete system for financial freedom tailored for Pakistanis
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`group relative bg-gradient-to-br from-[#0f1f3a] to-[#0a1628] backdrop-blur-sm border-2 border-[#0076FF]/30 rounded-2xl p-8 hover:border-[#0076FF] transition-all duration-500 hover:scale-105 transform ${
                  isVisible.features ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
                }`}
                style={{ animationDelay: feature.delay }}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#0076FF] to-[#0056CC] rounded-2xl opacity-0 group-hover:opacity-20 blur transition-all duration-500"></div>
                <div className="relative z-10">
                  <div className={`bg-gradient-to-r ${feature.color} p-4 rounded-2xl w-fit mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#0076FF] group-hover:to-[#00C6FF] group-hover:bg-clip-text transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Mentor Section */}
      <section id="mentor" className="animate-on-scroll relative py-20 bg-gradient-to-br from-[#0a1628] via-[#0f1f3a] to-[#0a1628]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl sm:text-6xl font-black text-white mb-6">
              Learn From <span className="shimmer-text">The Master Trader</span>
            </h2>
            <p className="text-2xl text-gray-400 max-w-2xl mx-auto">
              Get personally mentored by Atif Wali - The man who revolutionized trading education in Pakistan
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Mentor Image */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#0076FF] to-[#0056CC] rounded-3xl opacity-20 blur-xl group-hover:opacity-30 transition-all duration-500"></div>
              <div className="relative bg-gradient-to-br from-[#0f1f3a] to-[#0a1628] rounded-2xl p-2 border border-[#0076FF]/30 overflow-hidden">
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    src="/Images/Atif.png"
                    alt="Atif Wali - Head Trading Mentor"
                    className="w-full h-auto transform group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect width="400" height="400" fill="%231e293b"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%2394a3b8" font-family="Arial" font-size="16"%3EMentor Image%3C/text%3E%3C/svg%3E';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                {/* Floating Badges */}
                <div className="absolute top-4 left-4 bg-gradient-to-r from-[#0076FF] to-[#0056CC] text-white px-4 py-2 rounded-xl font-black text-sm shadow-2xl animate-float">
                  Founder
                </div>
                <div className="absolute bottom-4 right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-xl font-black text-sm shadow-2xl animate-float" style={{animationDelay: '1s'}}>
                  7+ Years
                </div>
              </div>
            </div>

            {/* Mentor Info */}
            <div className="space-y-6">
              <div>
                <h3 className="text-4xl font-black text-white mb-2 bg-gradient-to-r from-[#0076FF] to-[#00C6FF] bg-clip-text text-transparent">Atif Wali</h3>
                <div className="flex items-center space-x-4 mb-4">
                  <span className="px-4 py-2 bg-[#0076FF] text-white rounded-full text-sm font-bold animate-pulse-glow">
                    Head Trading Mentor
                  </span>
                  <span className="px-4 py-2 bg-green-600 text-white rounded-full text-sm font-bold">
                    7+ Years Experience
                  </span>
                </div>
                <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                  As the founder and lead mentor at Forexism, Atif Wali has dedicated his career to empowering Pakistani traders with professional trading education. With over 7 years of hands-on experience in forex markets, he has developed a unique structured approach that combines technical analysis with practical market psychology.
                </p>
              </div>

              {/* Specialty */}
              <div>
                <h4 className="text-xl font-bold text-white mb-4">Areas of Expertise</h4>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {[
                    { icon: Target, text: "Market Structure", color: "from-[#0076FF] to-[#0056CC]" },
                    { icon: TrendingUp, text: "Price Action", color: "from-purple-500 to-pink-500" },
                    { icon: Brain, text: "Trading Psychology", color: "from-green-500 to-emerald-500" },
                    { icon: Shield, text: "Risk Management", color: "from-yellow-500 to-amber-500" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-2 p-3 bg-white/5 rounded-lg border border-white/10 group hover:border-[#0076FF] transition-all duration-300">
                      <div className={`bg-gradient-to-r ${item.color} p-2 rounded-lg group-hover:scale-110 transition-transform`}>
                        <item.icon className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-white text-sm font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div>
                <h4 className="text-xl font-bold text-white mb-4">Notable Achievements</h4>
                <div className="space-y-3">
                  {[
                    { icon: Award, text: "Mentored 2,847+ successful traders across Pakistan", color: "text-yellow-400" },
                    { icon: Users, text: "Helped 500+ students pass prop firm challenges", color: "text-green-400" },
                    { icon: Star, text: "Maintained 4.9/5 rating with 94% student success rate", color: "text-blue-400" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg border border-white/10 group hover:border-[#0076FF] transition-all duration-300">
                      <item.icon className={`h-5 w-5 ${item.color} group-hover:scale-110 transition-transform`} />
                      <span className="text-gray-300">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Teaching Philosophy */}
              <div className="p-4 bg-[#0076FF]/10 rounded-lg border border-[#0076FF]/20 group hover:bg-[#0076FF]/20 transition-all duration-300">
                <h4 className="text-lg font-bold text-[#0076FF] mb-2">Teaching Philosophy</h4>
                <p className="text-gray-300 text-sm italic">
                  "I believe every Pakistani has the potential to achieve financial freedom through trading. My mission is to provide clear, practical education that works in real market conditions, not just in theory."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emotional Success Stories */}
      <section id="reviews" className="animate-on-scroll relative py-20 bg-gradient-to-br from-[#0a1628] via-[#0f1f3a] to-[#0a1628]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl sm:text-6xl font-black text-white mb-6">
              Real <span className="shimmer-text">Success Stories</span>
            </h2>
            <p className="text-2xl text-gray-400">
              From ordinary Pakistanis to extraordinary traders
            </p>
          </div>

          <div className={`relative transition-all duration-1000 ${
            isVisible.reviews ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
          }`}>
            <div className="absolute -inset-4 bg-gradient-to-r from-[#0076FF] via-[#0056CC] to-[#0076FF] rounded-3xl opacity-20 blur-2xl animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-[#0f1f3a] to-[#0a1628] backdrop-blur-xl border-2 border-[#0076FF]/50 rounded-3xl p-8 lg:p-12 shadow-2xl">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                {/* Avatar & Profit */}
                <div className="relative flex-shrink-0">
                  <div className="absolute -inset-4 bg-gradient-to-r from-[#0076FF] to-[#0056CC] rounded-full opacity-30 blur-xl"></div>
                  <div className={`relative w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-gradient-to-br ${pakistaniReviews[currentReviewIndex].color} flex items-center justify-center text-white text-3xl lg:text-4xl font-black shadow-2xl border-4 border-white/20 group hover:scale-110 transition-transform duration-300`}>
                    {pakistaniReviews[currentReviewIndex].initial}
                  </div>
                  {/* Profit Badge */}
                  <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-xl font-black text-sm shadow-2xl animate-pulse-glow">
                    {pakistaniReviews[currentReviewIndex].profit}
                  </div>
                  {/* Profession Badge */}
                  <div className="absolute -top-4 -left-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-xl font-bold text-xs">
                    {pakistaniReviews[currentReviewIndex].profession}
                  </div>
                </div>
                
                {/* Review Content */}
                <div className="flex-1 text-center lg:text-left">
                  {/* Rating */}
                  <div className="flex justify-center lg:justify-start items-center mb-6">
                    <div className="flex items-center text-yellow-400 space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-6 w-6 ${i < Math.floor(pakistaniReviews[currentReviewIndex].rating) ? 'fill-yellow-400 animate-pulse' : ''}`}
                          style={{animationDelay: `${i * 0.1}s`}}
                        />
                      ))}
                    </div>
                    <span className="text-2xl text-white ml-3 font-black">{pakistaniReviews[currentReviewIndex].rating}/5</span>
                  </div>

                  {/* Review Text */}
                  <p className="text-gray-100 text-xl lg:text-2xl italic mb-6 leading-relaxed font-medium">
                    "{pakistaniReviews[currentReviewIndex].review}"
                  </p>

                  {/* Reviewer Info */}
                  <div className="border-t border-[#0076FF]/30 pt-6">
                    <div className="font-black text-white text-2xl lg:text-3xl mb-2">{pakistaniReviews[currentReviewIndex].name}</div>
                    <div className="text-blue-300 text-lg flex items-center justify-center lg:justify-start">
                      <span>{pakistaniReviews[currentReviewIndex].location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Dots */}
              <div className="flex justify-center mt-8 space-x-3">
                {pakistaniReviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentReviewIndex(index)}
                    className={`transition-all rounded-full ${
                      index === currentReviewIndex 
                        ? 'w-10 h-3 bg-[#0076FF] shadow-lg animate-pulse' 
                        : 'w-3 h-3 bg-gray-600 hover:bg-gray-500'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transparency & Trust Section */}
      <section id="certificates" className="animate-on-scroll relative py-20 bg-gradient-to-br from-[#0a1628] via-[#0f1f3a] to-[#0a1628]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-[#0076FF]/30 backdrop-blur-sm border border-[#0076FF]/30 rounded-full text-blue-200 text-xs font-semibold mb-4 tracking-wide uppercase">
              Verified Credentials & Certifications
            </div>
            <h2 className="text-5xl sm:text-6xl font-black text-white mb-6">
              <span className="shimmer-text">Transparency & Trust</span>
            </h2>
            <p className="text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Explore our comprehensive credentials and certifications that demonstrate our expertise and success in trading education.
            </p>
          </div>

          {/* Credentials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {displayedCertificates.map((certificate, index) => (
              <div 
                key={certificate.id}
                className={`group relative cursor-pointer transform transition-all duration-1000 ${
                  isVisible.certificates ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => handleCertificateClick(certificate)}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#0076FF] via-[#0056CC] to-[#0076FF] rounded-2xl opacity-30 group-hover:opacity-50 blur transition-all duration-500"></div>
                
                <div className="relative bg-gradient-to-br from-[#0f1f3a] to-[#0a1628] border-2 border-[#0076FF]/30 rounded-2xl overflow-hidden shadow-2xl transform hover:-translate-y-2 hover:shadow-[#0076FF]/20 transition-all duration-500 h-full flex flex-col">
                  {/* Certificate Image */}
                  <div className="aspect-[4/3] overflow-hidden flex-shrink-0 relative">
                    <img 
                      src={certificate.image} 
                      alt={certificate.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%231e293b"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%2394a3b8" font-family="Arial" font-size="16"%3ECertificate%3C/text%3E%3C/svg%3E';
                      }}
                    />
                    
                    {/* Certificate Type Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1.5 bg-[#0076FF] text-white text-xs font-black rounded-full shadow-lg backdrop-blur-sm border border-white/20">
                        {certificate.type}
                      </span>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-center p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <Award className="h-12 w-12 text-[#0076FF] mx-auto mb-3 animate-pulse" />
                        <div className="text-white font-black text-lg mb-2">Click to View Full Size</div>
                        <div className="text-blue-300 text-sm">{certificate.type}</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Certificate Info */}
                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-white font-black text-xl mb-3 line-clamp-2 flex-grow group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#0076FF] group-hover:to-[#00C6FF] group-hover:bg-clip-text transition-all duration-300">
                      {certificate.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-6 line-clamp-2">
                      {certificate.description}
                    </p>
                    
                    {/* Action Button */}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCertificateClick(certificate);
                      }}
                      className="w-full bg-gradient-to-r from-[#0076FF] to-[#0056CC] hover:from-[#0056CC] hover:to-[#0076FF] text-white py-3 px-4 rounded-xl font-black text-sm transition-all transform group-hover:scale-105 shadow-lg group-hover:shadow-[#0076FF]/25 flex items-center justify-center space-x-2 relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                      <ExternalLink className="h-4 w-4 relative z-10" />
                      <span className="relative z-10">View Certificate</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Show More/Less Button */}
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAllCertificates(!showAllCertificates)}
              className="px-8 py-4 bg-gradient-to-r from-[#0076FF] to-[#0056CC] text-white rounded-2xl hover:from-[#0056CC] hover:to-[#0076FF] transition-all font-black text-lg shadow-2xl hover:shadow-[#0076FF]/50 transform hover:scale-105 flex items-center space-x-2 mx-auto relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-1000"></div>
              {showAllCertificates ? (
                <>
                  <ChevronUp className="h-5 w-5 relative z-10" />
                  <span className="relative z-10">Show Less Certificates</span>
                </>
              ) : (
                <>
                  <ChevronDown className="h-5 w-5 relative z-10" />
                  <span className="relative z-10">View All {allCertificates.length} Certificates</span>
                </>
              )}
            </button>
            <p className="text-gray-400 mt-4 text-lg">
              {showAllCertificates 
                ? `Showing all ${allCertificates.length} certificates`
                : `Showing ${displayedCertificates.length} of ${allCertificates.length} certificates`
              }
            </p>
          </div>
        </div>
      </section>

      {/* Certificate Full View Modal */}
      {selectedCertificate && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm overflow-y-auto"
          onClick={closeCertificateModal}
        >
          <div className="min-h-screen p-4 sm:p-6 lg:p-8 flex items-center justify-center">
            <div 
              className="relative w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header with Back Button */}
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <button
                  onClick={closeCertificateModal}
                  className="flex items-center space-x-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-[#0076FF] hover:bg-[#0056CC] text-white rounded-lg transition-all font-semibold shadow-lg text-sm sm:text-base hover:scale-105 transform"
                >
                  <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>Back to Home</span>
                </button>
                <button
                  onClick={closeCertificateModal}
                  className="p-2.5 sm:p-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all shadow-lg hover:scale-105 transform"
                >
                  <X className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
              </div>

              {/* Certificate Display Card */}
              <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black border-2 border-[#0076FF]/50 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
                {/* Certificate Image Container */}
                <div className="bg-gray-900 p-3 sm:p-6">
                  <div className="bg-white rounded-lg overflow-hidden">
                    <img
                      src={selectedCertificate.image}
                      alt={selectedCertificate.title}
                      className="w-full h-auto max-h-[70vh] object-contain"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect width="800" height="600" fill="%231e293b"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%2394a3b8" font-family="Arial" font-size="24"%3ECertificate Image%3C/text%3E%3C/svg%3E';
                      }}
                    />
                  </div>
                </div>

                {/* Certificate Info Footer */}
                <div className="bg-gradient-to-r from-[#0076FF] to-[#0056CC] px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="px-3 py-1 bg-[#0056CC] text-white text-xs font-bold rounded-full">
                          {selectedCertificate.type}
                        </span>
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                      <div className="text-white font-bold text-lg sm:text-xl lg:text-2xl mb-1">
                        {selectedCertificate.title}
                      </div>
                      <div className="text-blue-100 text-sm">
                        {selectedCertificate.description} • Forexism Trading Academy
                      </div>
                    </div>
                    <Award className="h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 text-white/80 flex-shrink-0" />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="bg-gray-900 px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={closeCertificateModal}
                    className="flex-1 px-6 py-3 bg-[#0076FF] hover:bg-[#0056CC] text-white rounded-lg font-semibold transition-all text-sm sm:text-base"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => window.open(selectedCertificate.image, '_blank')}
                    className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 text-sm sm:text-base"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Open in New Tab</span>
                  </button>
                </div>
              </div>

              {/* Close instruction text */}
              <p className="text-center text-gray-400 text-sm mt-4">
                Click anywhere outside or press ESC to close
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Emotional Learning Path */}
      <section id="pricing" className="animate-on-scroll relative py-20 bg-gradient-to-br from-[#0a1628] via-[#0f1f3a] to-[#0a1628]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#0f1f3a] to-[#0a1628] rounded-3xl p-8 md:p-12 border-2 border-[#0076FF]/30 shadow-2xl relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#0076FF] rounded-full filter blur-3xl animate-float"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#0056CC] rounded-full filter blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
            </div>

            <div className="relative z-10">
              <div className="text-center mb-12">
                <h2 className="text-5xl sm:text-6xl font-black text-white mb-6">
                  Your Path to <span className="shimmer-text">Financial Freedom</span>
                </h2>
                <p className="text-2xl text-gray-400 max-w-2xl mx-auto">
                  Choose your journey. We'll handle the rest.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                {/* Free Courses */}
                <div className={`group relative transform transition-all duration-1000 ${
                  isVisible.pricing ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
                }`}>
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-green-400 to-green-600 rounded-3xl opacity-30 group-hover:opacity-50 blur transition-all duration-500"></div>
                  <div className="relative bg-gradient-to-br from-[#0a1628] to-[#0f1f3a] rounded-2xl p-8 border border-green-500/30 group-hover:border-green-500 transition-all duration-500 h-full flex flex-col">
                    <div className="text-center mb-6">
                      <div className="bg-green-500/20 p-4 rounded-2xl w-fit mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <Video className="h-12 w-12 text-green-400" />
                      </div>
                      <h3 className="text-2xl font-black text-white mb-2">Start Your Journey</h3>
                      <div className="text-green-400 text-3xl font-black animate-pulse">FREE</div>
                      <div className="text-gray-400 text-sm">Perfect for beginners</div>
                    </div>
                    
                    <ul className="space-y-4 mb-8 flex-grow">
                      {[
                        "Basic Market Structure",
                        "Risk Management Foundation",
                        "Trading Psychology Intro",
                        "Community Access",
                        "Live Q&A Sessions",
                        "Beginner-friendly Content"
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-center space-x-3 group/item">
                          <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 group-hover/item:scale-110 transition-transform" />
                          <span className="text-gray-300 group-hover/item:text-white transition-colors">{item}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={handleFreeMasterclassClick}
                      className="w-full bg-green-500 hover:bg-green-600 text-white py-4 px-6 rounded-xl font-black text-lg transition-all transform group-hover:scale-105 shadow-2xl group-hover:shadow-green-500/25 relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                      <span className="relative z-10">Start Learning Free</span>
                    </button>
                  </div>
                </div>

                {/* Premium Courses - Featured */}
                <div className={`group relative scale-105 z-20 transform transition-all duration-1000 ${
                  isVisible.pricing ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
                }`} style={{animationDelay: '200ms'}}>
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-[#0076FF] to-[#0056CC] rounded-3xl opacity-40 group-hover:opacity-60 blur transition-all duration-500"></div>
                  <div className="relative bg-gradient-to-br from-[#0f1f3a] to-[#0a1628] rounded-2xl p-8 border-2 border-[#0076FF] group-hover:border-[#0076FF] transition-all duration-500 h-full flex flex-col">
                    {/* Popular Badge */}
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-[#0076FF] to-[#0056CC] text-white px-6 py-2 rounded-full font-black text-sm shadow-2xl animate-pulse-glow">
                        MOST POPULAR
                      </div>
                    </div>

                    <div className="text-center mb-6">
                      <div className="bg-[#0076FF]/20 p-4 rounded-2xl w-fit mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <Award className="h-12 w-12 text-[#0076FF]" />
                      </div>
                      <h3 className="text-2xl font-black text-white mb-2">Premium Mastery</h3>
                      <div className="text-[#0076FF] text-4xl font-black animate-pulse">$200</div>
                      <div className="text-gray-400 text-sm">One-Time Payment • Lifetime Access</div>
                    </div>
                    
                    <ul className="space-y-4 mb-8 flex-grow">
                      {[
                        "Everything in Free +",
                        "Advanced Market Structure",
                        "Live Trading Sessions",
                        "Prop Firm Challenges",
                        "1-on-1 Mentorship",
                        "Lifetime Course Updates",
                        "Private Community",
                        "Advanced Risk Management"
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-center space-x-3 group/item">
                          <CheckCircle className="h-5 w-5 text-[#0076FF] flex-shrink-0 group-hover/item:scale-110 transition-transform" />
                          <span className="text-gray-300 group-hover/item:text-white transition-colors">{item}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => {
                        if (!isAuthenticated) {
                          setShowAuthModal(true);
                          setAuthMode('signup');
                        } else {
                          setCurrentPage('courses');
                        }
                      }}
                      className="w-full bg-gradient-to-r from-[#0076FF] to-[#0056CC] hover:from-[#0056CC] hover:to-[#0076FF] text-white py-4 px-6 rounded-xl font-black text-lg transition-all transform group-hover:scale-105 shadow-2xl group-hover:shadow-[#0076FF]/25 relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                      <span className="relative z-10">{isAuthenticated ? 'Enroll Now' : 'Start Your Transformation'}</span>
                    </button>
                  </div>
                </div>

                {/* 1-on-1 Coaching */}
                <div className={`group relative transform transition-all duration-1000 ${
                  isVisible.pricing ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
                }`} style={{animationDelay: '400ms'}}>
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-purple-400 to-purple-600 rounded-3xl opacity-30 group-hover:opacity-50 blur transition-all duration-500"></div>
                  <div className="relative bg-gradient-to-br from-[#0a1628] to-[#0f1f3a] rounded-2xl p-8 border border-purple-500/30 group-hover:border-purple-500 transition-all duration-500 h-full flex flex-col">
                    <div className="text-center mb-6">
                      <div className="bg-purple-500/20 p-4 rounded-2xl w-fit mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <Users className="h-12 w-12 text-purple-400" />
                      </div>
                      <h3 className="text-2xl font-black text-white mb-2">Elite Coaching</h3>
                      <div className="text-purple-400 text-3xl font-black animate-pulse">$300</div>
                      <div className="text-gray-400 text-sm">Per Session • Personalized</div>
                    </div>
                    
                    <ul className="space-y-4 mb-8 flex-grow">
                      {[
                        "Personalized 1-on-1 Sessions",
                        "Custom Trading Plan",
                        "Portfolio Analysis",
                        "Advanced Strategy Development",
                        "Direct Mentor Access",
                        "Unlimited Q&A Support",
                        "Performance Tracking",
                        "Custom Risk Management"
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-center space-x-3 group/item">
                          <CheckCircle className="h-5 w-5 text-purple-400 flex-shrink-0 group-hover/item:scale-110 transition-transform" />
                          <span className="text-gray-300 group-hover/item:text-white transition-colors">{item}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => setCurrentPage('courses')}
                      className="w-full bg-purple-500 hover:bg-purple-600 text-white py-4 px-6 rounded-xl font-black text-lg transition-all transform group-hover:scale-105 shadow-2xl group-hover:shadow-purple-500/25 relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                      <span className="relative z-10">Book Elite Session</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Emotional CTA */}
      <section className="relative py-20 bg-gradient-to-br from-[#0a1628] via-[#0f1f3a] to-[#0a1628]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#0f1f3a] to-[#0a1628] border-2 border-[#0076FF]/50 rounded-3xl p-8 text-center relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 w-32 h-32 bg-[#0076FF] rounded-full filter blur-3xl opacity-20 animate-float"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#0056CC] rounded-full filter blur-3xl opacity-20 animate-float" style={{animationDelay: '1s'}}></div>
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center space-x-2 px-6 py-3 bg-[#0076FF]/30 rounded-2xl text-blue-300 text-lg font-black mb-6 border border-[#0076FF]/30 animate-pulse-glow">
                <Sparkles className="h-6 w-6" />
                <span>Your Financial Freedom Awaits!</span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">
                Ready to Transform Your 
                <span className="block shimmer-text">
                  Life Forever?
                </span>
              </h2>
              
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                Join <span className="text-yellow-400 font-black animate-pulse">2,847+</span> Pakistani traders who said goodbye to financial stress and hello to freedom.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
                <button
                  onClick={() => {
                    if (isAuthenticated) {
                      setCurrentPage('courses');
                    } else {
                      setShowAuthModal(true);
                      setAuthMode('signup');
                    }
                  }}
                  className="group px-12 py-5 bg-gradient-to-r from-[#0076FF] to-[#0056CC] text-white rounded-2xl hover:from-[#0056CC] hover:to-[#0076FF] transition-all duration-500 font-black text-xl shadow-2xl hover:shadow-[#0076FF]/50 hover:scale-105 transform animate-pulse-glow relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  <span className="flex items-center space-x-3 relative z-10">
                    <Rocket className="h-6 w-6 group-hover:animate-bounce" />
                    <span>START YOUR JOURNEY NOW</span>
                    <Heart className="h-6 w-6 text-red-400 group-hover:scale-110 transition-transform" />
                  </span>
                </button>
              </div>

              {/* Final Trust Elements */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
                <div className="flex items-center space-x-3 bg-white/5 rounded-2xl p-4 border border-white/10 group hover:border-[#0076FF] transition-all duration-300">
                  <TrendingUpIcon className="h-8 w-8 text-green-400 group-hover:scale-110 transition-transform" />
                  <div className="text-left">
                    <div className="text-white font-bold">Proven Results</div>
                    <div className="text-gray-400 text-sm">94% Success Rate</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 bg-white/5 rounded-2xl p-4 border border-white/10 group hover:border-[#0076FF] transition-all duration-300">
                  <Clock className="h-8 w-8 text-[#0076FF] group-hover:scale-110 transition-transform" />
                  <div className="text-left">
                    <div className="text-white font-bold">Lifetime Access</div>
                    <div className="text-gray-400 text-sm">Learn at Your Pace</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 bg-white/5 rounded-2xl p-4 border border-white/10 group hover:border-[#0076FF] transition-all duration-300">
                  <Users className="h-8 w-8 text-purple-400 group-hover:scale-110 transition-transform" />
                  <div className="text-left">
                    <div className="text-white font-bold">Community Support</div>
                    <div className="text-gray-400 text-sm">Always Here to Help</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <div className="bg-gradient-to-br from-[#0a1628] via-[#0f1f3a] to-[#0a1628] py-16 lg:py-20" id="faq-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Frequently Asked <span className="text-[#0076FF]">Questions</span>
            </h2>
            <p className="text-gray-400 text-base sm:text-lg">Get answers to common questions about our trading courses</p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gradient-to-br from-[#0f1f3a] to-[#0a1628] backdrop-blur-sm border border-[#0076FF]/30 rounded-xl overflow-hidden transition-all duration-300 hover:border-[#0076FF]/50">
                <button onClick={() => toggleFAQ(index)} className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[#0076FF]/10 transition-all">
                  <span className="text-white font-semibold text-base lg:text-lg pr-4">{faq.question}</span>
                  <div className="flex-shrink-0">
                    {openFAQ === index ? <ChevronUp className="h-5 w-5 text-[#0076FF]" /> : <ChevronDown className="h-5 w-5 text-[#0076FF]" />}
                  </div>
                </button>
                {openFAQ === index && (
                  <div className="px-6 pb-5 pt-2">
                    <div className="border-t border-[#0076FF]/30 pt-4">
                      <p className="text-gray-300 leading-relaxed text-sm">{faq.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

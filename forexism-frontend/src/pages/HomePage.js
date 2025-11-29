import React, { useState, useEffect, useRef } from 'react';
import { Star, CheckCircle, Video, BarChart3, Zap, ChevronDown, ChevronUp, Award, Shield, FileText, Download, ExternalLink, X, ArrowLeft, Play, Users, Target, Brain, TrendingUp, Rocket, Clock, BookOpen, Mail, Phone, Sparkles, Trophy, Heart, TrendingUp as TrendingUpIcon, Gem, Crown, Coins, Wallet, Globe, Smartphone, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const HomePage = ({ setCurrentPage, isAuthenticated, setShowAuthModal, setAuthMode }) => {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [openFAQ, setOpenFAQ] = useState(null);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [animatedText, setAnimatedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [isVisible, setIsVisible] = useState({});
  const [isTyping, setIsTyping] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [sliderDirection, setSliderDirection] = useState(1);

  const lines = [
    "Learn the things no one ever taught before"
  ];

  // Forex images for the slider
  const forexImages = [
    "/images/forex1.jpg",
    "/images/forex2.jpg", 
    "/images/forex3.jpg",
    "/images/forex4.jpg"
  ];

  // Professional globe animation ref
  const globeRef = useRef(null);

  // Professional image slider animation
  useEffect(() => {
    const interval = setInterval(() => {
      setSliderDirection(1);
      setCurrentImageIndex((prev) => (prev + 1) % forexImages.length);
    }, 5000);
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

  // Professional text animation - Static for single line
  useEffect(() => {
    setIsTyping(true);
    setAnimatedText('');
    let currentText = '';
    let currentIndex = 0;
    const currentLine = lines[0];
    
    const typeWriter = () => {
      if (currentIndex < currentLine.length) {
        currentText += currentLine.charAt(currentIndex);
        setAnimatedText(currentText);
        currentIndex++;
        setTimeout(typeWriter, 80);
      } else {
        setIsTyping(false);
      }
    };

    const timer = setTimeout(typeWriter, 500);
    return () => clearTimeout(timer);
  }, []);

  // Cursor blink effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  // Professional globe animation
  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) return;

    let animationFrame;
    let rotation = 0;

    const animateGlobe = () => {
      rotation += 0.2;
      if (rotation >= 360) rotation = 0;

      if (globe) {
        globe.style.transform = `rotate(${rotation}deg)`;
      }

      animationFrame = requestAnimationFrame(animateGlobe);
    };

    animateGlobe();

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  // Professional scroll animations
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);

      const sections = document.querySelectorAll('.animate-on-scroll');
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.85;
        if (isVisible) {
          setIsVisible(prev => ({ ...prev, [section.id]: true }));
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Professional particle effect
  useEffect(() => {
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'absolute w-1 h-1 bg-gradient-to-r from-[#0076FF] to-[#00C6FF] rounded-full animate-professional-float';
      particle.style.left = Math.random() * 100 + 'vw';
      particle.style.animationDuration = (Math.random() * 6 + 4) + 's';
      particle.style.animationDelay = Math.random() * 2 + 's';
      particle.style.opacity = Math.random() * 0.3 + 0.1;
      document.getElementById('particle-container')?.appendChild(particle);

      setTimeout(() => {
        particle.remove();
      }, 10000);
    };

    const interval = setInterval(createParticle, 500);
    return () => clearInterval(interval);
  }, []);

  // Advanced Sparkles Component with UI Layouts style
  const SparklesBackground = ({ 
    density = 800, 
    speed = 1.2, 
    size = 1.2, 
    direction = 'top', 
    opacitySpeed = 2, 
    color = '#32A7FF', 
    className = '' 
  }) => {
    const [sparkles, setSparkles] = useState([]);
    const containerRef = useRef(null);

    useEffect(() => {
      const generateSparkles = () => {
        const newSparkles = [];
        for (let i = 0; i < density; i++) {
          newSparkles.push({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * size + 0.5,
            opacity: Math.random() * 0.7 + 0.3,
            speed: Math.random() * speed + 0.5,
            delay: Math.random() * 20,
            blur: Math.random() * 5 + 2
          });
        }
        setSparkles(newSparkles);
      };

      generateSparkles();
    }, [density, speed, size]);

    return (
      <div ref={containerRef} className={`absolute inset-0 overflow-hidden ${className}`}>
        {sparkles.map((sparkle) => (
          <div
            key={sparkle.id}
            className="absolute rounded-full animate-sparkle-float"
            style={{
              left: `${sparkle.x}%`,
              top: `${sparkle.y}%`,
              width: `${sparkle.size}px`,
              height: `${sparkle.size}px`,
              backgroundColor: color,
              opacity: sparkle.opacity,
              animationDelay: `${sparkle.delay}s`,
              animationDuration: `${sparkle.speed * opacitySpeed}s`,
              filter: `blur(${sparkle.blur}px)`,
              transform: `scale(${0.5 + Math.random() * 1.5})`
            }}
          />
        ))}
      </div>
    );
  };

  // Advanced Revolving Globe Component
  const RevolvingGlobe = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main Revolving Globe */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative w-96 h-96 animate-globe-revolve">
            {/* Outer Ring */}
            <div className="absolute inset-0 border-2 border-[#3273ff]/30 rounded-full animate-spin-slow"></div>
            
            {/* Middle Ring */}
            <div className="absolute inset-8 border border-[#3273ff]/20 rounded-full animate-spin-medium"></div>
            
            {/* Inner Globe */}
            <div className="absolute inset-16 bg-gradient-to-br from-[#08132b] via-[#0f1c35] to-[#08132b] rounded-full shadow-2xl">
              {/* Globe Shine */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[#3273ff]/10 to-transparent rounded-full"></div>
              
              {/* Grid Lines */}
              <div className="absolute inset-0 opacity-20">
                <div className="w-full h-full bg-[linear-gradient(90deg,transparent_49%,#3273ff_50%,transparent_51%),linear-gradient(transparent_49%,#3273ff_50%,transparent_51%)] bg-[length:20px_20px]"></div>
              </div>
              
              {/* Pulsing Core */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-r from-[#3273ff] to-[#32A7FF] rounded-full animate-pulse-slow shadow-lg shadow-[#3273ff]/50"></div>
            </div>
            
            {/* Orbiting Particles */}
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-[#32A7FF] rounded-full animate-orbit"
                style={{
                  animationDelay: `${i * 0.5}s`,
                  top: '50%',
                  left: '50%',
                  transform: `rotate(${i * 30}deg) translateX(160px)`
                }}
              />
            ))}
          </div>
        </div>

        {/* Additional Background Elements */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#3273ff]/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-[#32A7FF]/10 rounded-full blur-xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-3/4 left-3/4 w-24 h-24 bg-[#3273ff]/5 rounded-full blur-lg animate-float" style={{animationDelay: '4s'}}></div>
      </div>
    );
  };

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
      title: "Daily Candle Strategy",
      description: "Allows you to grow small accounts more easily by focusing on high-quality, high-probability trades instead of overtrading.",
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
    { number: "6", label: "Years Experience", icon: Clock, suffix: "+", color: "from-purple-500 to-pink-500" }
  ];

  // Professional benefits grid data
  const professionalBenefits = [
    { text: "Lifetime Support & Continuous Mentorship", icon: Shield, color: "from-blue-500 to-cyan-500" },
    { text: "To-the-Point, Authentic & Refined Knowledge", icon: Award, color: "from-purple-500 to-pink-500" },
    { text: "Proven Track Record of Student Success", icon: TrendingUp, color: "from-green-500 to-emerald-500" },
    { text: "Practical, Real-Market Based Training", icon: Target, color: "from-orange-500 to-red-500" }
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
    }, 5000);
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

  const handleFreeMasterclassClick = () => {
    setCurrentPage('courses');
    setTimeout(() => {
      const event = new CustomEvent('navigateToFreeCourses');
      window.dispatchEvent(event);
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#0a1628] text-white overflow-x-hidden">
      <style jsx>{`
        /* Professional Animation Keyframes */
        @keyframes professional-float {
          0%, 100% { 
            transform: translateY(0px);
            opacity: 0.1;
          }
          50% { 
            transform: translateY(-20px);
            opacity: 0.3;
          }
        }

        @keyframes sparkle-float {
          0%, 100% { 
            transform: translateY(0px) scale(1);
            opacity: 0;
          }
          50% { 
            transform: translateY(-20px) scale(1.2);
            opacity: 1;
          }
        }

        @keyframes float {
          0%, 100% { 
            transform: translateY(0px);
          }
          50% { 
            transform: translateY(-10px);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spin-medium {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }

        @keyframes globe-revolve {
          0% {
            transform: rotate(0deg) scale(1);
          }
          50% {
            transform: rotate(180deg) scale(1.05);
          }
          100% {
            transform: rotate(360deg) scale(1);
          }
        }

        @keyframes orbit {
          0% {
            transform: rotate(0deg) translateX(160px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(160px) rotate(-360deg);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.7;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.1);
          }
        }

        @keyframes professional-glow {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(0, 118, 255, 0.1);
          }
          50% { 
            box-shadow: 0 0 30px rgba(0, 118, 255, 0.2);
          }
        }

        @keyframes professional-slide-up {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes professional-fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes professional-scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes professional-slide-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes professional-slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes professional-shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        @keyframes professional-pulse-subtle {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.02);
            opacity: 0.9;
          }
        }

        @keyframes globe-rotate {
          0% {
            transform: rotate(0deg) scale(1);
          }
          50% {
            transform: rotate(180deg) scale(1.05);
          }
          100% {
            transform: rotate(360deg) scale(1);
          }
        }

        /* Professional Animation Classes */
        .animate-professional-float {
          animation: professional-float 6s ease-in-out infinite;
        }

        .animate-sparkle-float {
          animation: sparkle-float 3s ease-in-out infinite;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .animate-spin-medium {
          animation: spin-medium 15s linear infinite;
        }

        .animate-globe-revolve {
          animation: globe-revolve 25s linear infinite;
        }

        .animate-orbit {
          animation: orbit 10s linear infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        .animate-professional-glow {
          animation: professional-glow 3s ease-in-out infinite;
        }

        .animate-professional-slide-up {
          animation: professional-slide-up 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .animate-professional-fade-in {
          animation: professional-fade-in 0.6s ease-out forwards;
        }

        .animate-professional-scale-in {
          animation: professional-scale-in 0.5s ease-out forwards;
        }

        .animate-professional-pulse {
          animation: professional-pulse-subtle 2s ease-in-out infinite;
        }

        .animate-globe-rotate {
          animation: globe-rotate 20s linear infinite;
        }

        .professional-shimmer {
          background: linear-gradient(90deg, #0076FF, #00C6FF, #0076FF);
          background-size: 1000px 100%;
          animation: professional-shimmer 3s infinite linear;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* Image Slider Fix */
        .slider-image-container {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .slider-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center;
        }

        /* Professional Globe Styles */
        .professional-globe {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 70vmin;
          height: 70vmin;
          z-index: 0;
          pointer-events: none;
          opacity: 0.15;
        }

        .globe-inner {
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(circle at 30% 30%, 
              rgba(0, 118, 255, 0.8) 0%,
              rgba(0, 86, 204, 0.6) 30%,
              rgba(0, 51, 153, 0.4) 60%,
              transparent 80%
            ),
            radial-gradient(circle at 70% 70%, 
              rgba(0, 198, 255, 0.6) 0%,
              rgba(0, 118, 255, 0.4) 40%,
              transparent 70%
            );
          border-radius: 50%;
          position: relative;
          overflow: hidden;
          box-shadow: 
            inset 0 0 50px rgba(0, 118, 255, 0.3),
            inset 0 0 100px rgba(0, 86, 204, 0.2),
            0 0 100px rgba(0, 118, 255, 0.2);
        }

        .globe-shine {
          position: absolute;
          top: 15%;
          left: 20%;
          width: 25%;
          height: 25%;
          background: radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 70%);
          border-radius: 50%;
          filter: blur(5px);
        }

        .globe-ring {
          position: absolute;
          top: 10%;
          left: 10%;
          width: 80%;
          height: 80%;
          border: 2px solid rgba(0, 118, 255, 0.4);
          border-radius: 50%;
          border-top-color: rgba(0, 198, 255, 0.6);
          border-right-color: rgba(0, 118, 255, 0.3);
          border-bottom-color: rgba(0, 86, 204, 0.5);
          border-left-color: rgba(0, 198, 255, 0.4);
        }

        .globe-ring-2 {
          position: absolute;
          top: 5%;
          left: 5%;
          width: 90%;
          height: 90%;
          border: 1px solid rgba(0, 198, 255, 0.3);
          border-radius: 50%;
          border-bottom-color: rgba(0, 118, 255, 0.4);
          border-left-color: rgba(0, 198, 255, 0.2);
        }

        .globe-grid {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            linear-gradient(rgba(0, 118, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 118, 255, 0.1) 1px, transparent 1px);
          background-size: 30px 30px;
          border-radius: 50%;
          opacity: 0.3;
        }

        /* Sparkles Container */
        .sparkles-container {
          position: absolute;
          inset: 0;
          overflow: hidden;
          mask: radial-gradient(50% 50%, white, transparent);
        }

        .sparkles-background {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at bottom center, #0076FF, transparent 70%);
          opacity: 0.3;
        }

        .sparkles-overlay {
          position: absolute;
          left: -50%;
          top: 50%;
          aspect-ratio: 1/0.7;
          width: 200%;
          border-radius: 10%;
          border-top: 1px solid #163474;
          background: #08132b;
        }

        /* Enhanced Mobile Responsiveness */
        @media (max-width: 640px) {
          .professional-globe {
            width: 100vmin;
            height: 100vmin;
            opacity: 0.1;
          }
          
          .hero-content {
            padding: 1rem;
          }
          
          .stat-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          
          .feature-grid {
            grid-template-columns: 1fr;
          }
          
          .certificate-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .slider-image {
            object-fit: cover;
          }
          
          .professional-globe {
            width: 90vmin;
            height: 90vmin;
          }
          
          .benefits-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 1024px) {
          .mentor-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (min-width: 1536px) {
          .professional-globe {
            width: 60vmin;
            height: 60vmin;
          }
        }

        /* Slide Transitions */
        .slide-enter-right {
          animation: professional-slide-in-right 0.6s ease-out forwards;
        }

        .slide-enter-left {
          animation: professional-slide-in-left 0.6s ease-out forwards;
        }
      `}</style>

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
        <div 
          className="h-full bg-gradient-to-r from-[#0076FF] to-[#00C6FF] transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* Professional Center Globe Animation */}
      <div ref={globeRef} className="professional-globe animate-globe-rotate">
        <div className="globe-inner">
          <div className="globe-grid"></div>
          <div className="globe-shine"></div>
          <div className="globe-ring"></div>
          <div className="globe-ring-2"></div>
        </div>
      </div>

      {/* Professional Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0a1628] via-[#0f1f3a] to-[#0a1628] pt-20">
        {/* Advanced Revolving Globe Background */}
        <RevolvingGlobe />

        {/* Sparkles Background Effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="sparkles-container">
            <div className="sparkles-background"></div>
            <div className="sparkles-overlay"></div>
            <SparklesBackground
              density={800}
              speed={1.2}
              size={1.2}
              direction='top'
              opacitySpeed={2}
              color='#32A7FF'
              className='absolute inset-x-0 bottom-0 h-full w-full'
            />
          </div>
        </div>

        {/* Professional Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Subtle Gradient Orbs */}
          <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-professional-float"></div>
          <div className="absolute bottom-20 right-10 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-professional-float" style={{animationDelay: '2s'}}></div>
          
          {/* Professional Particle Container */}
          <div id="particle-container" className="absolute inset-0 pointer-events-none"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Hero Content */}
            <div className="space-y-6 lg:space-y-8 animate-professional-slide-up hero-content">
              {/* Professional Badge */}
              <div className="inline-flex items-center space-x-2 px-4 py-2 lg:px-6 lg:py-3 bg-gradient-to-r from-[#0076FF]/20 to-[#0056CC]/20 backdrop-blur-sm border border-[#0076FF]/30 rounded-full text-blue-200 text-sm font-semibold mb-4">
                <Trophy className="h-4 w-4 lg:h-5 lg:w-5 text-yellow-400" />
                <span>#1 Trading Platform in Pakistan</span>
              </div>

              {/* Professional Animated Heading */}
              <div className="space-y-4 lg:space-y-6">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight">
                  <span className="block text-white min-h-[60px] sm:min-h-[72px] lg:min-h-[84px] flex items-center">
                    {animatedText}
                    <span className={`inline-block w-1 h-8 sm:h-12 lg:h-16 bg-gradient-to-b from-[#0076FF] to-[#00C6FF] ml-1 sm:ml-2 ${showCursor && isTyping ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}></span>
                  </span>
                  <span className="block professional-shimmer mt-2 lg:mt-4 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl">
                    Start Your Journey Today!
                  </span>
                </h1>
              </div>

              {/* Professional Subheading */}
              <p className="text-lg sm:text-xl lg:text-2xl text-blue-100 leading-relaxed font-medium">
                Join <span className="text-yellow-400 font-bold">2,847+</span> Pakistani Traders Who Found 
                <span className="text-green-400 font-bold"> Financial Freedom </span>
                Through Our Proven System!
              </p>

              {/* Professional Benefits Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 py-4 lg:py-6 benefits-grid">
                {professionalBenefits.map((item, index) => (
                  <div 
                    key={index} 
                    className="flex items-center space-x-3 group transform hover:scale-105 transition-all duration-300 animate-professional-fade-in"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className={`w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <item.icon className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
                    </div>
                    <span className="text-white font-bold text-sm lg:text-lg leading-tight">{item.text}</span>
                  </div>
                ))}
              </div>

              {/* Professional CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 pt-6 lg:pt-8">
                <button
                  onClick={() => setCurrentPage('courses')}
                  className="group px-6 py-4 lg:px-12 lg:py-5 bg-gradient-to-r from-[#0076FF] to-[#0056CC] text-white rounded-2xl hover:from-[#0056CC] hover:to-[#0076FF] transition-all duration-500 font-black text-lg shadow-2xl hover:shadow-[#0076FF]/50 hover:scale-105 transform relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  <span className="flex items-center space-x-2 lg:space-x-3 relative z-10">
                    <Rocket className="h-5 w-5 lg:h-6 lg:w-6" />
                    <span>START YOUR JOURNEY →</span>
                  </span>
                </button>
                
                <button
                  onClick={handleFreeMasterclassClick}
                  className="px-6 py-4 lg:px-12 lg:py-5 bg-white/10 text-white rounded-2xl hover:bg-white/20 transition-all duration-500 font-bold text-lg backdrop-blur-sm border-2 border-white/20 hover:border-white/40 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0076FF]/10 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  <span className="flex items-center space-x-2 lg:space-x-3 relative z-10">
                    <Play className="h-5 w-5 lg:h-6 lg:w-6" />
                    <span>Physical Classes $300</span>
                  </span>
                </button>
              </div>

              {/* Professional Trust Indicators */}
              <div className="flex items-center justify-between pt-6 lg:pt-8">
                <div className="flex items-center space-x-4 lg:space-x-6">
                  <div className="flex items-center space-x-3">
                    <div className="flex -space-x-2 lg:-space-x-3">
                      {[1,2,3,4].map((i) => (
                        <div 
                          key={i} 
                          className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-[#0076FF] to-[#0056CC] rounded-full border-2 border-[#0a1628] shadow-lg"
                        ></div>
                      ))}
                    </div>
                    <div>
                      <div className="text-white font-black text-sm lg:text-lg">2,847+</div>
                      <div className="text-blue-300 text-xs lg:text-sm">Happy Traders</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 lg:h-5 lg:w-5 fill-yellow-400" />
                      ))}
                    </div>
                    <div className="text-blue-300 text-xs lg:text-sm">4.9/5 Rating</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Image Slider */}
            <div className="relative animate-professional-scale-in mt-8 lg:mt-0">
              <div className="bg-gradient-to-br from-[#0f1f3a] to-[#0a1628] border-2 border-[#0076FF]/30 rounded-2xl overflow-hidden shadow-2xl">
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-900">
                  {forexImages.map((image, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                        index === currentImageIndex
                          ? sliderDirection > 0 
                            ? 'slide-enter-right' 
                            : 'slide-enter-left'
                          : 'opacity-0'
                      }`}
                    >
                      <div className="slider-image-container">
                        <img
                          src={image}
                          alt={`Forex Trading Education ${index + 1}`}
                          className="slider-image"
                          onError={(e) => {
                            e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect width="400" height="300" fill="%231e293b"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%2394a3b8" font-family="Arial" font-size="16"%3EForex Trading%3C/text%3E%3C/svg%3E';
                          }}
                        />
                      </div>
                      
                      {/* Professional Image Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 flex items-end">
                        <div className="p-4 lg:p-6 text-white w-full">
                          <div className="flex items-center justify-between mb-2">
                            <span className="px-2 py-1 lg:px-3 lg:py-1 bg-[#0076FF] rounded-full text-xs lg:text-sm font-bold">
                              Image {index + 1} of {forexImages.length}
                            </span>
                            <span className="px-2 py-1 lg:px-3 lg:py-1 bg-green-600 rounded-full text-xs lg:text-sm font-bold">
                              LIVE TRADING
                            </span>
                          </div>
                          <h3 className="text-lg lg:text-xl font-bold mb-1">Professional Trading Setup</h3>
                          <p className="text-blue-100 text-xs lg:text-sm">Real market analysis & strategies</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Professional Navigation Arrows */}
                  <button
                    onClick={prevImage}
                    className="absolute left-2 lg:left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 lg:p-3 rounded-full transition-all duration-300 z-20 backdrop-blur-sm border border-white/20 hover:scale-110"
                  >
                    <ChevronLeft className="h-4 w-4 lg:h-6 lg:w-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 lg:right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 lg:p-3 rounded-full transition-all duration-300 z-20 backdrop-blur-sm border border-white/20 hover:scale-110"
                  >
                    <ChevronRight className="h-4 w-4 lg:h-6 lg:w-6" />
                  </button>

                  {/* Professional Dots Indicator */}
                  <div className="absolute bottom-2 lg:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1 lg:space-x-2 z-20">
                    {forexImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setSliderDirection(index > currentImageIndex ? 1 : -1);
                          setCurrentImageIndex(index);
                        }}
                        className={`w-2 h-2 lg:w-3 lg:h-3 rounded-full transition-all duration-300 ${
                          index === currentImageIndex
                            ? 'bg-[#0076FF] scale-125 shadow-lg'
                            : 'bg-white/50 hover:bg-white/70'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Professional Slider Info */}
                <div className="bg-gradient-to-r from-[#0076FF] to-[#0056CC] px-4 lg:px-8 py-4 lg:py-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white font-black text-lg lg:text-xl mb-1 lg:mb-2">
                        Professional Trading Environment
                      </div>
                      <div className="text-blue-100 text-xs lg:text-sm">
                        Advanced tools and strategies for successful trading
                      </div>
                    </div>
                    <TrendingUp className="h-6 w-6 lg:h-8 lg:w-8 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Scroll Indicator */}
        <div className="absolute bottom-4 lg:bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="text-center">
            <div className="w-4 h-6 lg:w-6 lg:h-10 border-2 border-[#0076FF] rounded-full flex justify-center mb-1 lg:mb-2">
              <div className="w-1 h-2 lg:h-3 bg-[#0076FF] rounded-full mt-1 lg:mt-2"></div>
            </div>
            <div className="text-[#0076FF] font-bold text-xs lg:text-sm">Scroll to Explore</div>
          </div>
        </div>
      </section>

      {/* Emotional Stats Section */}
      <section id="stats" className="animate-on-scroll relative py-16 lg:py-20 bg-gradient-to-br from-[#0a1628] via-[#0f1f3a] to-[#0a1628]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 stat-grid">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className={`text-center transform transition-all duration-1000 ${
                  isVisible.stats ? 'animate-professional-slide-up' : 'opacity-0 translate-y-10'
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="bg-gradient-to-br from-[#0f1f3a] to-[#0a1628] border-2 border-[#0076FF]/30 rounded-2xl p-4 lg:p-8 hover:border-[#0076FF] hover:scale-105 transition-all duration-300 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0076FF] to-[#0056CC] opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                  <div className="bg-gradient-to-r from-[#0076FF] to-[#0056CC] p-3 lg:p-4 rounded-2xl w-fit mx-auto mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg">
                    <stat.icon className="h-6 w-6 lg:h-8 lg:w-8 text-white" />
                  </div>
                  <div className="text-2xl lg:text-5xl font-black bg-gradient-to-r from-[#0076FF] to-[#00C6FF] bg-clip-text text-transparent mb-1 lg:mb-2">
                    {stat.number}<span className="text-lg lg:text-3xl">{stat.suffix}</span>
                  </div>
                  <div className="text-gray-300 font-bold text-sm lg:text-lg uppercase tracking-wide">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emotional Features Section */}
      <section id="features" className="animate-on-scroll relative py-16 lg:py-20 bg-gradient-to-br from-[#0a1628] via-[#0f1f3a] to-[#0a1628]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-4 lg:mb-6">
              Why <span className="professional-shimmer">Forexism</span> Changes Lives?
            </h2>
            <p className="text-lg lg:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              We don't just teach trading - we provide a complete system for financial freedom tailored for Pakistanis
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 feature-grid">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`group relative bg-gradient-to-br from-[#0f1f3a] to-[#0a1628] backdrop-blur-sm border-2 border-[#0076FF]/30 rounded-2xl p-6 lg:p-8 hover:border-[#0076FF] transition-all duration-500 hover:scale-105 transform ${
                  isVisible.features ? 'animate-professional-slide-up' : 'opacity-0 translate-y-10'
                }`}
                style={{ animationDelay: feature.delay }}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#0076FF] to-[#0056CC] rounded-2xl opacity-0 group-hover:opacity-20 blur transition-all duration-500"></div>
                <div className="relative z-10">
                  <div className={`bg-gradient-to-r ${feature.color} p-3 lg:p-4 rounded-2xl w-fit mb-4 lg:mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                    <feature.icon className="h-6 w-6 lg:h-8 lg:w-8 text-white" />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-black text-white mb-3 lg:mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#0076FF] group-hover:to-[#00C6FF] group-hover:bg-clip-text transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed text-sm lg:text-lg">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Daily Candle Strategy Section */}
          <div className="mt-12 lg:mt-16 bg-gradient-to-br from-[#0f1f3a] to-[#0a1628] border-2 border-[#0076FF]/30 rounded-3xl p-6 lg:p-8 xl:p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#0076FF]/5 to-[#00C6FF]/5"></div>
            <div className="relative z-10">
              <div className="text-center mb-6 lg:mb-8">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-white mb-3 lg:mb-4">
                  <span className="professional-shimmer">Daily Candle Strategy</span>
                </h3>
                <p className="text-lg lg:text-2xl text-gray-300 max-w-4xl mx-auto">
                  The most powerful strategy no one has ever taught you—built on pure market logic, not indicators.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {[
                  "Gives you crystal-clear direction using just one candle, eliminating confusion and overanalysis.",
                  "Works in all market conditions—trending, ranging, or volatile—with high accuracy and consistency.",
                  "Perfect for both beginners and advanced traders who want a clean, fast, and effective trading approach.",
                  "One strong setup can be powerful enough to help you hit major trading goals—including prop firm targets.",
                  "Built on proper discipline and risk management principles for long-term success.",
                  "No complex indicators—just pure price action and market structure understanding."
                ].map((point, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 lg:p-4 bg-white/5 rounded-xl border border-white/10 hover:border-[#0076FF] transition-all duration-300">
                    <CheckCircle className="h-5 w-5 lg:h-6 lg:w-6 text-green-400 flex-shrink-0 mt-1" />
                    <p className="text-gray-300 text-sm lg:text-lg leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Mentor Section */}
      <section id="mentor" className="animate-on-scroll relative py-16 lg:py-20 bg-gradient-to-br from-[#0a1628] via-[#0f1f3a] to-[#0a1628]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-4 lg:mb-6">
              Learn From <span className="professional-shimmer">The Master Trader</span>
            </h2>
            <p className="text-lg lg:text-2xl text-gray-400 max-w-2xl mx-auto">
              Get personally mentored by Atif Wali - The man who revolutionized trading education in Pakistan
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mentor-grid">
            {/* Mentor Image */}
            <div className="relative group">
              <div className="absolute -inset-2 lg:-inset-4 bg-gradient-to-r from-[#0076FF] to-[#0056CC] rounded-3xl opacity-20 blur-xl group-hover:opacity-30 transition-all duration-500"></div>
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
                
                {/* Professional Badges */}
                <div className="absolute top-3 lg:top-4 left-3 lg:left-4 bg-gradient-to-r from-[#0076FF] to-[#0056CC] text-white px-3 lg:px-4 py-1 lg:py-2 rounded-xl font-black text-xs lg:text-sm shadow-2xl">
                  Founder
                </div>
                <div className="absolute bottom-3 lg:bottom-4 right-3 lg:right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 lg:px-4 py-1 lg:py-2 rounded-xl font-black text-xs lg:text-sm shadow-2xl">
                  6+ Years
                </div>
              </div>
            </div>

            {/* Mentor Info */}
            <div className="space-y-4 lg:space-y-6">
              <div>
                <h3 className="text-2xl lg:text-4xl font-black text-white mb-2 bg-gradient-to-r from-[#0076FF] to-[#00C6FF] bg-clip-text text-transparent">Atif Wali</h3>
                <div className="flex flex-wrap gap-2 lg:gap-4 mb-3 lg:mb-4">
                  <span className="px-3 lg:px-4 py-1 lg:py-2 bg-[#0076FF] text-white rounded-full text-xs lg:text-sm font-bold">
                    Head Trading Mentor
                  </span>
                  <span className="px-3 lg:px-4 py-1 lg:py-2 bg-green-600 text-white rounded-full text-xs lg:text-sm font-bold">
                    6+ Years Experience
                  </span>
                </div>
                <p className="text-sm lg:text-lg text-gray-300 mb-4 lg:mb-6 leading-relaxed">
                  As the founder and lead mentor at Forexism, Atif Wali has dedicated his career to empowering Pakistani traders with professional trading education. With over 6 years of hands-on experience in forex markets, he has developed a unique structured approach that combines technical analysis with practical market psychology.
                </p>
              </div>

              {/* Specialty */}
              <div>
                <h4 className="text-lg lg:text-xl font-bold text-white mb-3 lg:mb-4">Areas of Expertise</h4>
                <div className="grid grid-cols-2 gap-2 lg:gap-3 mb-4 lg:mb-6">
                  {[
                    { icon: Target, text: "Daily Candle Strategy", color: "from-[#0076FF] to-[#0056CC]" },
                    { icon: TrendingUp, text: "Market Structure", color: "from-purple-500 to-pink-500" },
                    { icon: Brain, text: "Trading Psychology", color: "from-green-500 to-emerald-500" },
                    { icon: Shield, text: "Risk Management", color: "from-yellow-500 to-amber-500" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 lg:p-3 bg-white/5 rounded-lg border border-white/10 group hover:border-[#0076FF] transition-all duration-300">
                      <div className={`bg-gradient-to-r ${item.color} p-1 lg:p-2 rounded-lg group-hover:scale-110 transition-transform`}>
                        <item.icon className="h-3 w-3 lg:h-4 lg:w-4 text-white" />
                      </div>
                      <span className="text-white text-xs lg:text-sm font-medium leading-tight">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div>
                <h4 className="text-lg lg:text-xl font-bold text-white mb-3 lg:mb-4">Notable Achievements</h4>
                <div className="space-y-2 lg:space-y-3">
                  {[
                    { icon: Award, text: "Mentored 2,847+ successful traders across Pakistan", color: "text-yellow-400" },
                    { icon: Users, text: "Helped 500+ students pass prop firm challenges", color: "text-green-400" },
                    { icon: Star, text: "Maintained 4.9/5 rating with 94% student success rate", color: "text-blue-400" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3 p-2 lg:p-3 bg-white/5 rounded-lg border border-white/10 group hover:border-[#0076FF] transition-all duration-300">
                      <item.icon className={`h-4 w-4 lg:h-5 lg:w-5 ${item.color}`} />
                      <span className="text-gray-300 text-sm lg:text-base">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Teaching Philosophy */}
              <div className="p-3 lg:p-4 bg-[#0076FF]/10 rounded-lg border border-[#0076FF]/20 group hover:bg-[#0076FF]/20 transition-all duration-300">
                <h4 className="text-base lg:text-lg font-bold text-[#0076FF] mb-1 lg:mb-2">Teaching Philosophy</h4>
                <p className="text-gray-300 text-xs lg:text-sm italic">
                  "I believe every Pakistani has the potential to achieve financial freedom through trading. My mission is to provide clear, practical education that works in real market conditions, not just in theory."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emotional Success Stories */}
      <section id="reviews" className="animate-on-scroll relative py-16 lg:py-20 bg-gradient-to-br from-[#0a1628] via-[#0f1f3a] to-[#0a1628]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-4 lg:mb-6">
              Real <span className="professional-shimmer">Success Stories</span>
            </h2>
            <p className="text-lg lg:text-2xl text-gray-400">
              From ordinary Pakistanis to extraordinary traders
            </p>
          </div>

          <div className={`relative transition-all duration-1000 ${
            isVisible.reviews ? 'animate-professional-slide-up' : 'opacity-0 translate-y-10'
          }`}>
            <div className="absolute -inset-2 lg:-inset-4 bg-gradient-to-r from-[#0076FF] via-[#0056CC] to-[#0076FF] rounded-3xl opacity-20 blur-2xl"></div>
            <div className="relative bg-gradient-to-br from-[#0f1f3a] to-[#0a1628] backdrop-blur-xl border-2 border-[#0076FF]/50 rounded-3xl p-6 lg:p-8 xl:p-12 shadow-2xl">
              <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8">
                {/* Avatar & Profit */}
                <div className="relative flex-shrink-0">
                  <div className="absolute -inset-2 lg:-inset-4 bg-gradient-to-r from-[#0076FF] to-[#0056CC] rounded-full opacity-30 blur-xl"></div>
                  <div className={`relative w-20 h-20 lg:w-24 lg:h-24 xl:w-32 xl:h-32 rounded-full bg-gradient-to-br ${pakistaniReviews[currentReviewIndex].color} flex items-center justify-center text-white text-xl lg:text-2xl xl:text-4xl font-black shadow-2xl border-4 border-white/20 group hover:scale-110 transition-transform duration-300`}>
                    {pakistaniReviews[currentReviewIndex].initial}
                  </div>
                  {/* Profit Badge */}
                  <div className="absolute -bottom-2 -right-2 lg:-bottom-4 lg:-right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 lg:px-4 py-1 lg:py-2 rounded-xl font-black text-xs lg:text-sm shadow-2xl">
                    {pakistaniReviews[currentReviewIndex].profit}
                  </div>
                  {/* Profession Badge */}
                  <div className="absolute -top-2 -left-2 lg:-top-4 lg:-left-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 lg:px-3 py-1 rounded-xl font-bold text-xs">
                    {pakistaniReviews[currentReviewIndex].profession}
                  </div>
                </div>
                
                {/* Review Content */}
                <div className="flex-1 text-center lg:text-left">
                  {/* Rating */}
                  <div className="flex justify-center lg:justify-start items-center mb-4 lg:mb-6">
                    <div className="flex items-center text-yellow-400 space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 lg:h-6 lg:w-6 ${i < Math.floor(pakistaniReviews[currentReviewIndex].rating) ? 'fill-yellow-400' : ''}`}
                        />
                      ))}
                    </div>
                    <span className="text-lg lg:text-2xl text-white ml-2 lg:ml-3 font-black">{pakistaniReviews[currentReviewIndex].rating}/5</span>
                  </div>

                  {/* Review Text */}
                  <p className="text-gray-100 text-base lg:text-xl xl:text-2xl italic mb-4 lg:mb-6 leading-relaxed font-medium">
                    "{pakistaniReviews[currentReviewIndex].review}"
                  </p>

                  {/* Reviewer Info */}
                  <div className="border-t border-[#0076FF]/30 pt-4 lg:pt-6">
                    <div className="font-black text-white text-xl lg:text-2xl xl:text-3xl mb-1 lg:mb-2">{pakistaniReviews[currentReviewIndex].name}</div>
                    <div className="text-blue-300 text-sm lg:text-lg flex items-center justify-center lg:justify-start">
                      <span>{pakistaniReviews[currentReviewIndex].location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Dots */}
              <div className="flex justify-center mt-6 lg:mt-8 space-x-2 lg:space-x-3">
                {pakistaniReviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentReviewIndex(index)}
                    className={`transition-all rounded-full ${
                      index === currentReviewIndex 
                        ? 'w-6 lg:w-10 h-2 lg:h-3 bg-[#0076FF] shadow-lg' 
                        : 'w-2 lg:w-3 h-2 lg:h-3 bg-gray-600 hover:bg-gray-500'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transparency & Trust Section */}
      <section id="certificates" className="animate-on-scroll relative py-16 lg:py-20 bg-gradient-to-br from-[#0a1628] via-[#0f1f3a] to-[#0a1628]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12 lg:mb-16">
            <div className="inline-block px-3 lg:px-4 py-1 lg:py-2 bg-[#0076FF]/30 backdrop-blur-sm border border-[#0076FF]/30 rounded-full text-blue-200 text-xs font-semibold mb-3 lg:mb-4 tracking-wide uppercase">
              Verified Credentials & Certifications
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-4 lg:mb-6">
              <span className="professional-shimmer">Transparency & Trust</span>
            </h2>
            <p className="text-lg lg:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Explore our comprehensive credentials and certifications that demonstrate our expertise and success in trading education.
            </p>
          </div>

          {/* Credentials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 mb-8 lg:mb-12 certificate-grid">
            {displayedCertificates.map((certificate, index) => (
              <div 
                key={certificate.id}
                className={`group relative cursor-pointer transform transition-all duration-1000 ${
                  isVisible.certificates ? 'animate-professional-slide-up' : 'opacity-0 translate-y-10'
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
                    <div className="absolute top-2 lg:top-4 right-2 lg:right-4">
                      <span className="px-2 lg:px-3 py-1 bg-[#0076FF] text-white text-xs font-black rounded-full shadow-lg backdrop-blur-sm border border-white/20">
                        {certificate.type}
                      </span>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-center p-4 lg:p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <Award className="h-8 w-8 lg:h-12 lg:w-12 text-[#0076FF] mx-auto mb-2 lg:mb-3" />
                        <div className="text-white font-black text-sm lg:text-lg mb-1 lg:mb-2">Click to View Full Size</div>
                        <div className="text-blue-300 text-xs lg:text-sm">{certificate.type}</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Certificate Info */}
                  <div className="p-4 lg:p-6 flex-grow flex flex-col">
                    <h3 className="text-white font-black text-lg lg:text-xl mb-2 lg:mb-3 line-clamp-2 flex-grow group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#0076FF] group-hover:to-[#00C6FF] group-hover:bg-clip-text transition-all duration-300">
                      {certificate.title}
                    </h3>
                    <p className="text-gray-400 text-xs lg:text-sm mb-4 lg:mb-6 line-clamp-2">
                      {certificate.description}
                    </p>
                    
                    {/* Action Button */}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCertificateClick(certificate);
                      }}
                      className="w-full bg-gradient-to-r from-[#0076FF] to-[#0056CC] hover:from-[#0056CC] hover:to-[#0076FF] text-white py-2 lg:py-3 px-3 lg:px-4 rounded-xl font-black text-xs lg:text-sm transition-all transform group-hover:scale-105 shadow-lg group-hover:shadow-[#0076FF]/25 flex items-center justify-center space-x-1 lg:space-x-2 relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                      <ExternalLink className="h-3 w-3 lg:h-4 lg:w-4 relative z-10" />
                      <span className="relative z-10">View Certificate</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Show More/Less Button */}
          <div className="text-center mt-6 lg:mt-8">
            <button
              onClick={() => setShowAllCertificates(!showAllCertificates)}
              className="px-6 lg:px-8 py-3 lg:py-4 bg-gradient-to-r from-[#0076FF] to-[#0056CC] text-white rounded-2xl hover:from-[#0056CC] hover:to-[#0076FF] transition-all font-black text-base lg:text-lg shadow-2xl hover:shadow-[#0076FF]/50 transform hover:scale-105 flex items-center space-x-2 mx-auto relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-1000"></div>
              {showAllCertificates ? (
                <>
                  <ChevronUp className="h-4 w-4 lg:h-5 lg:w-5 relative z-10" />
                  <span className="relative z-10">Show Less Certificates</span>
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 lg:h-5 lg:w-5 relative z-10" />
                  <span className="relative z-10">View All {allCertificates.length} Certificates</span>
                </>
              )}
            </button>
            <p className="text-gray-400 mt-3 lg:mt-4 text-sm lg:text-lg">
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
      <section id="pricing" className="animate-on-scroll relative py-16 lg:py-20 bg-gradient-to-br from-[#0a1628] via-[#0f1f3a] to-[#0a1628]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#0f1f3a] to-[#0a1628] rounded-3xl p-6 lg:p-8 xl:p-12 border-2 border-[#0076FF]/30 shadow-2xl relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 right-0 w-32 lg:w-64 h-32 lg:h-64 bg-[#0076FF] rounded-full filter blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-32 lg:w-64 h-32 lg:h-64 bg-[#0056CC] rounded-full filter blur-3xl"></div>
            </div>

            <div className="relative z-10">
              <div className="text-center mb-8 lg:mb-12">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-4 lg:mb-6">
                  Your Path to <span className="professional-shimmer">Financial Freedom</span>
                </h2>
                <p className="text-lg lg:text-2xl text-gray-400 max-w-2xl mx-auto">
                  Choose your journey. We'll handle the rest.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-8 lg:mb-12">
                {/* Physical Classes */}
                <div className={`group relative transform transition-all duration-1000 ${
                  isVisible.pricing ? 'animate-professional-slide-up' : 'opacity-0 translate-y-10'
                }`}>
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-green-400 to-green-600 rounded-3xl opacity-30 group-hover:opacity-50 blur transition-all duration-500"></div>
                  <div className="relative bg-gradient-to-br from-[#0a1628] to-[#0f1f3a] rounded-2xl p-6 lg:p-8 border border-green-500/30 group-hover:border-green-500 transition-all duration-500 h-full flex flex-col">
                    <div className="text-center mb-4 lg:mb-6">
                      <div className="bg-green-500/20 p-3 lg:p-4 rounded-2xl w-fit mx-auto mb-3 lg:mb-4 group-hover:scale-110 transition-transform">
                        <Video className="h-8 w-8 lg:h-12 lg:w-12 text-green-400" />
                      </div>
                      <h3 className="text-xl lg:text-2xl font-black text-white mb-1 lg:mb-2">Physical Classes</h3>
                      <div className="text-green-400 text-2xl lg:text-3xl font-black">$300</div>
                      <div className="text-gray-400 text-sm">Hands-on learning experience</div>
                    </div>
                    
                    <ul className="space-y-2 lg:space-y-4 mb-6 lg:mb-8 flex-grow">
                      {[
                        "In-person training sessions",
                        "Live market analysis",
                        "Hands-on practice",
                        "Direct mentor guidance",
                        "Real-time feedback",
                        "Networking opportunities"
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-center space-x-2 lg:space-x-3 group/item">
                          <CheckCircle className="h-4 w-4 lg:h-5 lg:w-5 text-green-400 flex-shrink-0" />
                          <span className="text-gray-300 text-sm lg:text-base group-hover/item:text-white transition-colors">{item}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={handleFreeMasterclassClick}
                      className="w-full bg-green-500 hover:bg-green-600 text-white py-3 lg:py-4 px-4 lg:px-6 rounded-xl font-black text-base lg:text-lg transition-all transform group-hover:scale-105 shadow-2xl group-hover:shadow-green-500/25 relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                      <span className="relative z-10">Enroll in Physical Classes</span>
                    </button>
                  </div>
                </div>

                {/* Premium Courses - Featured */}
                <div className={`group relative lg:scale-105 z-20 transform transition-all duration-1000 ${
                  isVisible.pricing ? 'animate-professional-slide-up' : 'opacity-0 translate-y-10'
                }`} style={{animationDelay: '200ms'}}>
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-[#0076FF] to-[#0056CC] rounded-3xl opacity-40 group-hover:opacity-60 blur transition-all duration-500"></div>
                  <div className="relative bg-gradient-to-br from-[#0f1f3a] to-[#0a1628] rounded-2xl p-6 lg:p-8 border-2 border-[#0076FF] group-hover:border-[#0076FF] transition-all duration-500 h-full flex flex-col">
                    {/* Popular Badge */}
                    <div className="absolute -top-3 lg:-top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-[#0076FF] to-[#0056CC] text-white px-4 lg:px-6 py-1 lg:py-2 rounded-full font-black text-xs lg:text-sm shadow-2xl">
                        MOST POPULAR
                      </div>
                    </div>

                    <div className="text-center mb-4 lg:mb-6">
                      <div className="bg-[#0076FF]/20 p-3 lg:p-4 rounded-2xl w-fit mx-auto mb-3 lg:mb-4 group-hover:scale-110 transition-transform">
                        <Award className="h-8 w-8 lg:h-12 lg:w-12 text-[#0076FF]" />
                      </div>
                      <h3 className="text-xl lg:text-2xl font-black text-white mb-1 lg:mb-2">Premium Mastery</h3>
                      <div className="text-[#0076FF] text-2xl lg:text-4xl font-black">$200</div>
                      <div className="text-gray-400 text-sm">One-Time Payment • Lifetime Access</div>
                    </div>
                    
                    <ul className="space-y-2 lg:space-y-4 mb-6 lg:mb-8 flex-grow">
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
                        <li key={idx} className="flex items-center space-x-2 lg:space-x-3 group/item">
                          <CheckCircle className="h-4 w-4 lg:h-5 lg:w-5 text-[#0076FF] flex-shrink-0" />
                          <span className="text-gray-300 text-sm lg:text-base group-hover/item:text-white transition-colors">{item}</span>
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
                      className="w-full bg-gradient-to-r from-[#0076FF] to-[#0056CC] hover:from-[#0056CC] hover:to-[#0076FF] text-white py-3 lg:py-4 px-4 lg:px-6 rounded-xl font-black text-base lg:text-lg transition-all transform group-hover:scale-105 shadow-2xl group-hover:shadow-[#0076FF]/25 relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                      <span className="relative z-10">{isAuthenticated ? 'Enroll Now' : 'Start Your Transformation'}</span>
                    </button>
                  </div>
                </div>

                {/* 1-on-1 Coaching */}
                <div className={`group relative transform transition-all duration-1000 ${
                  isVisible.pricing ? 'animate-professional-slide-up' : 'opacity-0 translate-y-10'
                }`} style={{animationDelay: '400ms'}}>
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-purple-400 to-purple-600 rounded-3xl opacity-30 group-hover:opacity-50 blur transition-all duration-500"></div>
                  <div className="relative bg-gradient-to-br from-[#0a1628] to-[#0f1f3a] rounded-2xl p-6 lg:p-8 border border-purple-500/30 group-hover:border-purple-500 transition-all duration-500 h-full flex flex-col">
                    <div className="text-center mb-4 lg:mb-6">
                      <div className="bg-purple-500/20 p-3 lg:p-4 rounded-2xl w-fit mx-auto mb-3 lg:mb-4 group-hover:scale-110 transition-transform">
                        <Users className="h-8 w-8 lg:h-12 lg:w-12 text-purple-400" />
                      </div>
                      <h3 className="text-xl lg:text-2xl font-black text-white mb-1 lg:mb-2">Elite Coaching</h3>
                      <div className="text-purple-400 text-2xl lg:text-3xl font-black">$300</div>
                      <div className="text-gray-400 text-sm">Per Session • Personalized</div>
                    </div>
                    
                    <ul className="space-y-2 lg:space-y-4 mb-6 lg:mb-8 flex-grow">
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
                        <li key={idx} className="flex items-center space-x-2 lg:space-x-3 group/item">
                          <CheckCircle className="h-4 w-4 lg:h-5 lg:w-5 text-purple-400 flex-shrink-0" />
                          <span className="text-gray-300 text-sm lg:text-base group-hover/item:text-white transition-colors">{item}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => setCurrentPage('courses')}
                      className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 lg:py-4 px-4 lg:px-6 rounded-xl font-black text-base lg:text-lg transition-all transform group-hover:scale-105 shadow-2xl group-hover:shadow-purple-500/25 relative overflow-hidden"
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
      <section className="relative py-16 lg:py-20 bg-gradient-to-br from-[#0a1628] via-[#0f1f3a] to-[#0a1628]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-[#0f1f3a] to-[#0a1628] border-2 border-[#0076FF]/50 rounded-3xl p-6 lg:p-8 text-center relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 w-16 lg:w-32 h-16 lg:h-32 bg-[#0076FF] rounded-full filter blur-3xl opacity-20"></div>
              <div className="absolute bottom-0 right-0 w-16 lg:w-32 h-16 lg:h-32 bg-[#0056CC] rounded-full filter blur-3xl opacity-20"></div>
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center space-x-2 px-4 lg:px-6 py-2 lg:py-3 bg-[#0076FF]/30 rounded-2xl text-blue-300 text-base lg:text-lg font-black mb-4 lg:mb-6 border border-[#0076FF]/30">
                <Sparkles className="h-4 w-4 lg:h-6 lg:w-6" />
                <span>Your Financial Freedom Awaits!</span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-white mb-4 lg:mb-6">
                Ready to Transform Your 
                <span className="block professional-shimmer">
                  Life Forever?
                </span>
              </h2>
              
              <p className="text-lg lg:text-xl text-gray-300 mb-6 lg:mb-8 max-w-2xl mx-auto leading-relaxed">
                Join <span className="text-yellow-400 font-black">2,847+</span> Pakistani traders who said goodbye to financial stress and hello to freedom.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center mb-6 lg:mb-8">
                <button
                  onClick={() => {
                    if (isAuthenticated) {
                      setCurrentPage('courses');
                    } else {
                      setShowAuthModal(true);
                      setAuthMode('signup');
                    }
                  }}
                  className="group px-8 lg:px-12 py-4 lg:py-5 bg-gradient-to-r from-[#0076FF] to-[#0056CC] text-white rounded-2xl hover:from-[#0056CC] hover:to-[#0076FF] transition-all duration-500 font-black text-lg shadow-2xl hover:shadow-[#0076FF]/50 hover:scale-105 transform relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  <span className="flex items-center space-x-2 lg:space-x-3 relative z-10">
                    <Rocket className="h-5 w-5 lg:h-6 lg:w-6" />
                    <span>START YOUR JOURNEY NOW</span>
                    <Heart className="h-5 w-5 lg:h-6 lg:w-6 text-red-400" />
                  </span>
                </button>
              </div>

              {/* Final Trust Elements */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 max-w-2xl mx-auto">
                <div className="flex items-center space-x-3 bg-white/5 rounded-2xl p-3 lg:p-4 border border-white/10 group hover:border-[#0076FF] transition-all duration-300">
                  <TrendingUpIcon className="h-6 w-6 lg:h-8 lg:w-8 text-green-400" />
                  <div className="text-left">
                    <div className="text-white font-bold text-sm lg:text-base">Proven Results</div>
                    <div className="text-gray-400 text-xs lg:text-sm">94% Success Rate</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 bg-white/5 rounded-2xl p-3 lg:p-4 border border-white/10 group hover:border-[#0076FF] transition-all duration-300">
                  <Clock className="h-6 w-6 lg:h-8 lg:w-8 text-[#0076FF]" />
                  <div className="text-left">
                    <div className="text-white font-bold text-sm lg:text-base">6+ Years Experience</div>
                    <div className="text-gray-400 text-xs lg:text-sm">Expert Guidance</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 bg-white/5 rounded-2xl p-3 lg:p-4 border border-white/10 group hover:border-[#0076FF] transition-all duration-300">
                  <Users className="h-6 w-6 lg:h-8 lg:w-8 text-purple-400" />
                  <div className="text-left">
                    <div className="text-white font-bold text-sm lg:text-base">Community Support</div>
                    <div className="text-gray-400 text-xs lg:text-sm">Always Here to Help</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <div className="bg-gradient-to-br from-[#0a1628] via-[#0f1f3a] to-[#0a1628] py-12 lg:py-16 xl:py-20" id="faq-section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-3 lg:mb-4">
              Frequently Asked <span className="text-[#0076FF]">Questions</span>
            </h2>
            <p className="text-gray-400 text-sm lg:text-base xl:text-lg">Get answers to common questions about our trading courses</p>
          </div>
          <div className="space-y-3 lg:space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gradient-to-br from-[#0f1f3a] to-[#0a1628] backdrop-blur-sm border border-[#0076FF]/30 rounded-xl overflow-hidden transition-all duration-300 hover:border-[#0076FF]/50">
                <button onClick={() => toggleFAQ(index)} className="w-full px-4 lg:px-6 py-3 lg:py-4 flex items-center justify-between text-left hover:bg-[#0076FF]/10 transition-all">
                  <span className="text-white font-semibold text-sm lg:text-base xl:text-lg pr-4">{faq.question}</span>
                  <div className="flex-shrink-0">
                    {openFAQ === index ? <ChevronUp className="h-4 w-4 lg:h-5 lg:w-5 text-[#0076FF]" /> : <ChevronDown className="h-4 w-4 lg:h-5 lg:w-5 text-[#0076FF]" />}
                  </div>
                </button>
                {openFAQ === index && (
                  <div className="px-4 lg:px-6 pb-4 lg:pb-5 pt-1 lg:pt-2">
                    <div className="border-t border-[#0076FF]/30 pt-3 lg:pt-4">
                      <p className="text-gray-300 leading-relaxed text-xs lg:text-sm">{faq.answer}</p>
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

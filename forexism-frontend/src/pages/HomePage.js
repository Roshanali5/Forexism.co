import React, { useState, useEffect } from 'react';
import { Star, CheckCircle, Video, BarChart3, Zap, ChevronDown, ChevronUp, Award, Shield, FileText, Download, ExternalLink, X, ArrowLeft, Play, Users, Target, Brain, TrendingUp } from 'lucide-react';

const HomePage = ({ setCurrentPage, isAuthenticated, setShowAuthModal, setAuthMode }) => {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [openFAQ, setOpenFAQ] = useState(null);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  const pakistaniReviews = [
    {
      name: "Ahmed Khan",
      location: "Karachi, Pakistan",
      initial: "AK",
      color: "from-blue-600 to-blue-500",
      rating: 5,
      review: "Outstanding course! The Structure-Based Trading strategy changed my trading completely. Mai ab consistently profit kar raha hun. Highly recommended for all Pakistani traders!"
    },
    {
      name: "Fatima Noor",
      location: "Lahore, Pakistan",
      initial: "FN",
      color: "from-purple-600 to-purple-500",
      rating: 4.9,
      review: "Best trading course in Pakistan! Simple Urdu me samjhaya gaya hai. Risk management techniques bohat helpful hain. The structured approach makes everything crystal clear!"
    },
    {
      name: "Muhammad Bilal",
      location: "Islamabad, Pakistan",
      initial: "MB",
      color: "from-green-600 to-green-500",
      rating: 5,
      review: "Excellent platform for learning. Live trading sessions se real market ki samajh ayi. Mentor support bhi amazing hai. The methodology is game-changing!"
    },
    {
      name: "Ayesha Malik",
      location: "Faisalabad, Pakistan",
      initial: "AM",
      color: "from-pink-600 to-pink-500",
      rating: 4.8,
      review: "As a beginner, is course ne mujhe confident trader bana diya. Chart reading aur technical analysis ab clear hai. Structure-based approach is perfect for beginners!"
    },
    {
      name: "Hassan Raza",
      location: "Multan, Pakistan",
      initial: "HR",
      color: "from-orange-600 to-orange-500",
      rating: 5,
      review: "Professional trading seekhne ka best platform! The structured methodology is incredibly powerful. Support team hamesha available rehti hai. Truly life-changing!"
    },
    {
      name: "Zainab Ahmed",
      location: "Peshawar, Pakistan",
      initial: "ZA",
      color: "from-teal-600 to-teal-500",
      rating: 4.9,
      review: "Zabardast course hai! PropFirm challenges pass karne me is course ne bohat help ki. Ab mai funded trader hun. The structured approach works perfectly!"
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

  // Professional Certificate Names
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

  // Show first 6 certificates, then all when expanded
  const displayedCertificates = showAllCertificates 
    ? allCertificates 
    : allCertificates.slice(0, 6);

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

  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
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

      {/* Hero Section - UPDATED with #0076FF color scheme matching CoursesPage */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#1a2332] via-[#1e2b3d] to-[#1a2332] py-16 lg:py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#0076FF] rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#0076FF] rounded-full filter blur-3xl animate-pulse delay-700"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 text-white">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-[#0076FF]/30 rounded-full text-sm font-medium backdrop-blur-sm border border-[#0076FF]/30">
                <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                <span>Welcome to Forexism</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                Master the Art of Trading,<br />
                <span className="text-[#0076FF] bg-transparent">Unlock Your Trading Potential</span><br />
                with Expert Guidance!
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-blue-100 leading-relaxed">
                <strong className="font-semibold">Trade Smarter, Grow Faster:</strong> Join Our Community for Growth, Guidance, and Celebration!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  onClick={() => {
                    if (isAuthenticated) {
                      setCurrentPage('courses');
                    } else {
                      setShowAuthModal(true);
                      setAuthMode('signup');
                    }
                  }}
                  className="px-8 py-3.5 bg-white text-[#0076FF] rounded-lg hover:bg-blue-50 transition-all font-bold text-base shadow-2xl hover:scale-105 transform"
                >
                  ENROLL NOW →
                </button>
                <button
                  onClick={() => setCurrentPage('courses')}
                  className="px-8 py-3.5 bg-[#0076FF]/30 text-white rounded-lg hover:bg-[#0076FF]/50 transition-all font-medium backdrop-blur-sm border border-white/20"
                >
                  View Courses
                </button>
              </div>
            </div>

            {/* Professional Video Frame - RESTORED */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#0076FF] to-[#0056CC] rounded-2xl opacity-20 blur-2xl"></div>
              
              <div className="relative bg-black rounded-2xl shadow-2xl overflow-hidden border-2 border-[#0076FF]/30">
                <div className="relative" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/cmSAr4o3F30?autoplay=1&mute=1&loop=1&playlist=cmSAr4o3F30&controls=1&rel=0&modestbranding=1"
                    title="Free Trading Class"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>

                <div className="bg-gradient-to-r from-[#0076FF] to-[#0056CC] px-4 sm:px-6 py-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <div className="flex items-center space-x-1.5 bg-red-600 px-2 py-0.5 rounded-md">
                          <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                          <span className="text-white text-xs font-bold">LIVE</span>
                        </div>
                        <span className="text-blue-100 text-xs font-medium">Now Playing</span>
                      </div>
                      <div className="text-white font-bold text-sm sm:text-base">FREE PAID CLASS - TRADING & SETUP</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gradient-to-br from-[#0a1628] via-[#0f1f3a] to-[#0a1628] py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Unlock Your Trading Potential,<br />
              <span className="text-[#0076FF]">Learn From Experts</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-400">
              Learn to Earn with Expert Guidance, Your Path to Financial Freedom!
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            <div className="bg-gradient-to-br from-[#0f1f3a] to-[#0a1628] backdrop-blur-sm border border-[#0076FF]/50 rounded-xl p-6 hover:transform hover:scale-105 transition-all shadow-xl">
              <div className="bg-[#0076FF] p-3 rounded-lg w-fit mb-4">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Advanced Methodology</h3>
              <p className="text-gray-300 leading-relaxed text-sm">
                A powerful structure-based approach for all markets: stocks, forex, and crypto, helping you identify trends, volume patterns, and profitable opportunities with precision.
              </p>
            </div>
            <div className="bg-gradient-to-br from-[#0f1f3a] to-[#0a1628] backdrop-blur-sm border border-[#0076FF]/50 rounded-xl p-6 hover:transform hover:scale-105 transition-all shadow-xl">
              <div className="bg-[#0076FF] p-3 rounded-lg w-fit mb-4">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Live Trading Sessions</h3>
              <p className="text-gray-300 leading-relaxed text-sm">
                Learn trading by doing! Our courses focus on hands-on practice with practical exercises and real-time market examples for effective learning and instant application.
              </p>
            </div>
            <div className="bg-gradient-to-br from-[#0f1f3a] to-[#0a1628] backdrop-blur-sm border border-[#0076FF]/50 rounded-xl p-6 hover:transform hover:scale-105 transition-all shadow-xl">
              <div className="bg-[#0076FF] p-3 rounded-lg w-fit mb-4">
                <Video className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">15+ Hours of Videos</h3>
              <p className="text-gray-300 leading-relaxed text-sm">
                Gain essential trade skills through 15+ hours of recorded and live video sessions, combining expert guidance with practical learning opportunities for mastery.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* What You'll Learn Section - Matching CoursesPage Design */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-br from-[#0f1f3a] to-[#0a1628] rounded-2xl p-8 md:p-12 border border-[#0076FF]/30 shadow-2xl">
          <div className="text-center mb-12">
            <Target className="w-16 h-16 mx-auto text-[#0076FF] mb-4" />
            <h2 className="text-4xl font-bold mb-4 text-white">ADVANCED FOREX TRADING COURSE</h2>
            <p className="text-xl text-gray-300">Take your trading to the next level with professional strategies that institutions use!</p>
          </div>

          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-8 text-center text-white flex items-center justify-center space-x-3">
              <Video className="w-8 h-8 text-[#0076FF]" />
              <span>What You'll Master:</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 1. Advanced Market Structure */}
              <div className="bg-[#0a1628] rounded-xl p-6 border border-gray-700/50 hover:border-[#0076FF]/50 transition-all">
                <div className="flex items-start space-x-4">
                  <TrendingUp className="w-8 h-8 text-[#0076FF] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-lg font-bold mb-3 text-white">1. Advanced Market Structure</h4>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Real CHoCH & BOS Analysis</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Live market examples and applications</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 2. Order Blocks & Fair Value Gaps */}
              <div className="bg-[#0a1628] rounded-xl p-6 border border-gray-700/50 hover:border-[#0076FF]/50 transition-all">
                <div className="flex items-start space-x-4">
                  <Target className="w-8 h-8 text-[#0076FF] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-lg font-bold mb-3 text-white">2. Order Blocks & FVGs</h4>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Spotting high-probability OBs & FVGs</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Professional trade setups</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 3. Liquidity Analysis */}
              <div className="bg-[#0a1628] rounded-xl p-6 border border-gray-700/50 hover:border-[#0076FF]/50 transition-all">
                <div className="flex items-start space-x-4">
                  <BarChart3 className="w-8 h-8 text-[#0076FF] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-lg font-bold mb-3 text-white">3. Liquidity Analysis</h4>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Liquidity sweep identification</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Profitable liquidity trading strategies</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 4. Trading Psychology */}
              <div className="bg-[#0a1628] rounded-xl p-6 border border-gray-700/50 hover:border-[#0076FF]/50 transition-all">
                <div className="flex items-start space-x-4">
                  <Brain className="w-8 h-8 text-[#0076FF] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-lg font-bold mb-3 text-white">4. Trading Psychology</h4>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Master patience & discipline</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Control fear, greed & FOMO</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Why Join Section */}
          <div className="bg-gradient-to-r from-[#0076FF]/20 to-[#0056CC]/20 rounded-xl p-8 border border-[#0076FF]/30">
            <h3 className="text-2xl font-bold mb-6 text-center text-white flex items-center justify-center space-x-3">
              <Star className="w-8 h-8 text-yellow-400" />
              <span>Why Join Forexism?</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-3" />
                <p className="text-white font-semibold">Go beyond basics – learn institutional-level trading</p>
              </div>
              <div>
                <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-3" />
                <p className="text-white font-semibold">Real-world examples & practical strategies</p>
              </div>
              <div>
                <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-3" />
                <p className="text-white font-semibold">Focus on both technical & psychological edge</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Student Reviews */}
      <div className="bg-[#0a1628] py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-[#0076FF]/30 backdrop-blur-sm border border-[#0076FF]/30 rounded-full text-blue-200 text-xs font-semibold mb-4 tracking-wide uppercase">
              Student Success Stories
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Hear from our <span className="bg-gradient-to-r from-[#0076FF] to-[#0056CC] bg-clip-text text-transparent">Champion Traders</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
              Real results from real students who transformed their trading journey with Forexism
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-12">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-[#0076FF] rounded-xl opacity-20 group-hover:opacity-30 blur transition-all"></div>
              <div className="relative bg-gradient-to-br from-[#0f1f3a] to-[#0a1628] backdrop-blur-sm border border-[#0076FF]/50 rounded-xl p-6 text-center transform hover:-translate-y-1 transition-all">
                <div className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-[#0076FF] to-[#0056CC] bg-clip-text text-transparent mb-2">2,300+</div>
                <div className="text-gray-300 font-medium text-sm">Active Students</div>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-[#0076FF] rounded-xl opacity-20 group-hover:opacity-30 blur transition-all"></div>
              <div className="relative bg-gradient-to-br from-[#0f1f3a] to-[#0a1628] backdrop-blur-sm border border-[#0076FF]/50 rounded-xl p-6 text-center transform hover:-translate-y-1 transition-all">
                <div className="flex items-center justify-center text-4xl lg:text-5xl font-black bg-gradient-to-r from-[#0076FF] to-[#0056CC] bg-clip-text text-transparent mb-2">
                  4.8
                  <Star className="h-6 w-6 fill-yellow-400 text-yellow-400 ml-1" />
                </div>
                <div className="text-gray-300 font-medium text-sm">Average Rating</div>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-[#0076FF] rounded-xl opacity-20 group-hover:opacity-30 blur transition-all"></div>
              <div className="relative bg-gradient-to-br from-[#0f1f3a] to-[#0a1628] backdrop-blur-sm border border-[#0076FF]/50 rounded-xl p-6 text-center transform hover:-translate-y-1 transition-all">
                <div className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-[#0076FF] to-[#0056CC] bg-clip-text text-transparent mb-2">95%</div>
                <div className="text-gray-300 font-medium text-sm">Success Rate</div>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-[#0076FF] rounded-xl opacity-20 group-hover:opacity-30 blur transition-all"></div>
              <div className="relative bg-gradient-to-br from-[#0f1f3a] to-[#0a1628] backdrop-blur-sm border border-[#0076FF]/50 rounded-xl p-6 text-center transform hover:-translate-y-1 transition-all">
                <div className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-[#0076FF] to-[#0056CC] bg-clip-text text-transparent mb-2">15+</div>
                <div className="text-gray-300 font-medium text-sm">Hours Content</div>
              </div>
            </div>
          </div>

          {/* Featured Review */}
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#0076FF] via-[#0056CC] to-[#0076FF] rounded-2xl opacity-20 blur-xl"></div>
            <div className="relative bg-gradient-to-br from-[#0f1f3a] to-[#0a1628] backdrop-blur-xl border-2 border-[#0076FF]/50 rounded-2xl p-6 lg:p-8 shadow-2xl">
              <div className="flex flex-col md:flex-row items-center gap-6">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#0076FF] to-[#0056CC] rounded-full opacity-50 blur-lg"></div>
                  <div className={`relative w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-br ${pakistaniReviews[currentReviewIndex].color} flex items-center justify-center text-white text-2xl lg:text-3xl font-black shadow-2xl border-4 border-white/30`}>
                    {pakistaniReviews[currentReviewIndex].initial}
                  </div>
                </div>
                
                {/* Review Content */}
                <div className="flex-1 text-center md:text-left">
                  {/* Rating */}
                  <div className="flex justify-center md:justify-start items-center mb-4">
                    <div className="flex items-center text-yellow-400 space-x-1">
                      {[...Array(Math.floor(pakistaniReviews[currentReviewIndex].rating))].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400" />
                      ))}
                      {pakistaniReviews[currentReviewIndex].rating % 1 !== 0 && (
                        <div className="relative">
                          <Star className="h-4 w-4 text-yellow-400" />
                          <Star className="h-4 w-4 fill-yellow-400 absolute top-0 left-0" style={{ clipPath: 'inset(0 50% 0 0)' }} />
                        </div>
                      )}
                    </div>
                    <span className="text-xl text-white ml-2 font-bold">{pakistaniReviews[currentReviewIndex].rating}</span>
                  </div>

                  {/* Review Text */}
                  <p className="text-gray-100 text-base lg:text-lg italic mb-4 leading-relaxed">
                    "{pakistaniReviews[currentReviewIndex].review}"
                  </p>

                  {/* Reviewer Info */}
                  <div className="border-t border-[#0076FF]/30 pt-4">
                    <div className="font-bold text-white text-lg lg:text-xl mb-1">{pakistaniReviews[currentReviewIndex].name}</div>
                    <div className="text-blue-300 text-sm flex items-center justify-center md:justify-start">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      {pakistaniReviews[currentReviewIndex].location}
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Dots */}
              <div className="flex justify-center mt-6 space-x-2">
                {pakistaniReviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentReviewIndex(index)}
                    className={`transition-all rounded-full ${
                      index === currentReviewIndex 
                        ? 'w-8 h-2 bg-[#0076FF]' 
                        : 'w-2 h-2 bg-gray-600 hover:bg-gray-500'
                    }`}
                    aria-label={`View review ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Path Selection - Matching CoursesPage */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-[#0f1f3a] rounded-2xl p-8 md:p-12 border border-gray-700/50">
          <h2 className="text-3xl font-bold mb-8 text-center text-white">Choose Your Learning Path</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Free Courses Card */}
            <div 
              onClick={() => setCurrentPage('courses')}
              className="bg-[#0a1628] rounded-xl p-6 text-center border border-gray-700/50 hover:border-green-500/50 hover:bg-[#0a1628]/80 transition-all cursor-pointer transform hover:scale-105 hover:shadow-xl hover:shadow-green-500/20 group"
            >
              <Video className="w-12 h-12 text-green-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-2 text-white">Free Courses</h3>
              <p className="text-gray-400 text-sm mb-4">Start with foundational trading concepts. No payment needed!</p>
              <div className="mt-4 text-green-500 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                Click to view courses
              </div>
            </div>
            
            {/* Premium Courses Card */}
            <div 
              onClick={() => setCurrentPage('courses')}
              className="bg-[#0a1628] rounded-xl p-6 text-center border border-gray-700/50 hover:border-[#0076FF]/50 hover:bg-[#0a1628]/80 transition-all cursor-pointer transform hover:scale-105 hover:shadow-xl hover:shadow-[#0076FF]/20 group"
            >
              <Award className="w-12 h-12 text-[#0076FF] mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-2 text-white">Premium Courses</h3>
              <p className="text-gray-400 text-sm mb-2">Pay once for ALL premium courses - current & future videos included!</p>
              <p className="text-[#0076FF] font-bold text-lg mb-4">$200 One-Time</p>
              <div className="mt-4 text-[#0076FF] text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                Click to view courses
              </div>
            </div>
            
            {/* 1-on-1 Coaching Card */}
            <div 
              onClick={() => setCurrentPage('courses')}
              className="bg-[#0a1628] rounded-xl p-6 text-center border border-gray-700/50 hover:border-purple-500/50 hover:bg-[#0a1628]/80 transition-all cursor-pointer transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20 group"
            >
              <Users className="w-12 h-12 text-purple-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-2 text-white">1-on-1 Coaching</h3>
              <p className="text-gray-400 text-sm mb-2">Personalized mentorship with expert traders for accelerated growth</p>
              <p className="text-purple-500 font-bold text-lg mb-4">$300/Session</p>
              <div className="mt-4 text-purple-500 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                Click to view sessions
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <button
              onClick={() => {
                if (!isAuthenticated) {
                  setShowAuthModal(true);
                  setAuthMode('signup');
                } else {
                  setCurrentPage('courses');
                }
              }}
              className="px-10 py-4 bg-gradient-to-r from-[#0076FF] to-[#0056CC] text-white rounded-xl hover:from-[#0056CC] hover:to-[#0076FF] transition-all font-bold text-lg shadow-2xl hover:shadow-[#0076FF]/50 hover:scale-105 transform"
            >
              {isAuthenticated ? 'Browse All Courses' : 'Start Learning Now!'}
            </button>
            <p className="text-gray-400 text-sm mt-4">
              {!isAuthenticated && 'Sign up to access all courses and track your progress'}
            </p>
          </div>
        </div>
      </div>

      {/* Transparency & Trust Section */}
      <div className="bg-gradient-to-br from-[#0a1628] via-[#0f1f3a] to-[#0a1628] py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-[#0076FF]/30 backdrop-blur-sm border border-[#0076FF]/30 rounded-full text-blue-200 text-xs font-semibold mb-4 tracking-wide uppercase">
              Verified Credentials & Certifications
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              <span className="text-[#0076FF]">Transparency & Trust</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto">
              Explore our comprehensive credentials and certifications that demonstrate our expertise and success in trading education.
            </p>
          </div>

          {/* Credentials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {displayedCertificates.map((certificate) => (
              <div 
                key={certificate.id}
                className="relative group cursor-pointer"
                onClick={() => handleCertificateClick(certificate)}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#0076FF] via-[#0056CC] to-[#0076FF] rounded-xl opacity-30 group-hover:opacity-50 blur transition-all duration-500"></div>
                
                <div className="relative bg-gradient-to-br from-[#0f1f3a] to-[#0a1628] border border-[#0076FF]/30 rounded-xl overflow-hidden shadow-2xl transform hover:-translate-y-2 hover:shadow-[#0076FF]/20 transition-all duration-500 h-full flex flex-col">
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
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 bg-[#0076FF] text-white text-xs font-bold rounded-full shadow-lg backdrop-blur-sm">
                        {certificate.type}
                      </span>
                    </div>
                  </div>
                  
                  {/* Certificate Info */}
                  <div className="p-5 flex-grow flex flex-col">
                    <h3 className="text-white font-bold text-base lg:text-lg mb-2 line-clamp-2 flex-grow">
                      {certificate.title}
                    </h3>
                    <p className="text-gray-400 text-xs mb-4 line-clamp-2">
                      {certificate.description}
                    </p>
                    
                    {/* Action Button */}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCertificateClick(certificate);
                      }}
                      className="w-full bg-[#0076FF] hover:bg-[#0056CC] text-white py-2.5 px-4 rounded-lg font-semibold text-sm transition-all flex items-center justify-center space-x-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>View Certificate</span>
                    </button>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center p-6">
                      <Award className="h-12 w-12 text-[#0076FF] mx-auto mb-3" />
                      <div className="text-white font-bold text-lg mb-2">Click to View Full Size</div>
                      <div className="text-blue-300 text-sm">{certificate.type}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Show More/Less Button */}
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAllCertificates(!showAllCertificates)}
              className="px-8 py-3 bg-gradient-to-r from-[#0076FF] to-[#0056CC] text-white rounded-lg hover:from-[#0056CC] hover:to-[#0076FF] transition-all font-semibold text-sm shadow-lg hover:shadow-[#0076FF]/50 transform hover:scale-105 flex items-center space-x-2 mx-auto"
            >
              {showAllCertificates ? (
                <>
                  <ChevronUp className="h-4 w-4" />
                  <span>Show Less</span>
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4" />
                  <span>View All {allCertificates.length} Certificates</span>
                </>
              )}
            </button>
            <p className="text-gray-400 mt-3 text-sm">
              {showAllCertificates 
                ? `Showing all ${allCertificates.length} certificates`
                : `Showing ${displayedCertificates.length} of ${allCertificates.length} certificates`
              }
            </p>
          </div>
        </div>
      </div>

      {/* Professional CTA Section */}
      <div className="relative bg-[#0a1628] py-16 lg:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0076FF]/20 via-[#0056CC]/10 to-[#0a1628]"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(0, 118, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(0, 86, 204, 0.1) 0%, transparent 50%)'
        }}></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-gradient-to-br from-[#0f1f3a] to-[#0a1628] backdrop-blur-xl border border-[#0076FF]/30 rounded-2xl p-8 lg:p-12 shadow-2xl text-center">
            <div className="inline-block px-4 py-2 bg-[#0076FF]/30 rounded-full text-blue-300 text-xs font-semibold mb-4 border border-[#0076FF]/30">
              <span className="flex items-center space-x-2">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>Limited Time Offer</span>
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Ready to Start Your <br />
              <span className="bg-gradient-to-r from-[#0076FF] to-[#0056CC] bg-clip-text text-transparent">Trading Journey?</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join thousands of successful traders who have transformed their lives with Forexism. Start learning today with expert guidance and lifetime support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button
                onClick={() => {
                  if (isAuthenticated) {
                    setCurrentPage('courses');
                  } else {
                    setShowAuthModal(true);
                    setAuthMode('signup');
                  }
                }}
                className="px-8 py-3.5 bg-gradient-to-r from-[#0076FF] to-[#0056CC] text-white rounded-lg hover:from-[#0056CC] hover:to-[#0076FF] transition-all font-bold text-base shadow-2xl hover:shadow-[#0076FF]/50 hover:scale-105 transform"
              >
                Get Started Now →
              </button>
              <button
                onClick={() => setCurrentPage('courses')}
                className="px-8 py-3.5 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all font-medium text-base backdrop-blur-sm border border-white/20 hover:border-white/40"
              >
                View All Courses
              </button>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-[#0076FF]" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-[#0076FF]" />
                <span>Lifetime Access</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-[#0076FF]" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>

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
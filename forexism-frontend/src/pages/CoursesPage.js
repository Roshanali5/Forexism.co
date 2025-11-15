import React, { useState, useEffect, useCallback } from 'react';
import { 
  Play, BookOpen, Clock, CheckCircle, Award, Lock, Unlock, Video, 
  RefreshCw, TrendingUp, Brain, Target, BarChart3, Shield, Zap, 
  Star, Users, DollarSign, X, CreditCard, ShieldCheck, ArrowLeft, 
  AlertCircle, FileText, ChevronRight, PlayCircle, CheckSquare
} from 'lucide-react';

const CoursesPage = ({ 
  handleCourseEnrollment, 
  handlePremiumCourseAccess, 
  handleCoursePayment, 
  userProfile, 
  isAuthenticated, 
  setShowAuthModal, 
  setAuthMode, 
  setCurrentPage 
}) => {
  // Main state management
  const [activeTab, setActiveTab] = useState('all');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);
  const [imageErrors, setImageErrors] = useState({});
  
  // View state - controls which screen to show
  const [currentView, setCurrentView] = useState('hero'); // 'hero', 'listing' or 'content'
  const [selectedCourse, setSelectedCourse] = useState(null);
  
  // Payment modal state
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentForm, setPaymentForm] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolder: '',
    saveCard: false
  });

  // Fetch courses from API
  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      setShowError(false);
      
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5002/api';
      console.log('Fetching courses from:', `${API_URL}/courses`);
      
      const response = await fetch(`${API_URL}/courses`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Courses API Response Status:', response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Server returned non-JSON response');
      }

      const data = await response.json();
      console.log('Courses API Response Data:', data);

      if (data.success && Array.isArray(data.data)) {
        console.log(`✅ Loaded ${data.data.length} courses from database`);
        setCourses(data.data);
        setError('');
        setShowError(false);
      } else if (Array.isArray(data)) {
        console.log(`✅ Loaded ${data.length} courses from database (direct array)`);
        setCourses(data);
        setError('');
        setShowError(false);
      } else {
        throw new Error(data.message || 'Invalid response format');
      }
    } catch (err) {
      console.error('Error fetching courses:', err);
      setError(`Failed to fetch courses: ${err.message}`);
      setShowError(true);
      setCourses([]);
      
      setTimeout(() => {
        setShowError(false);
      }, 10000);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  // Course categories
  const freeCourses = courses.filter(course => course.isFree && !course.isOneToOne);
  const paidCourses = courses.filter(course => course.isPaid && !course.isOneToOne);
  const oneToOneCourses = courses.filter(course => course.isOneToOne);

  const displayCourses = activeTab === 'free' ? freeCourses 
    : activeTab === 'paid' ? paidCourses 
    : activeTab === 'onetoone' ? oneToOneCourses 
    : courses;

  // Helper functions
  const getCourseId = (course) => {
    return course._id || course.id || Math.random().toString(36).substr(2, 9);
  };

  const isUserEnrolled = (course) => {
    if (!userProfile || !userProfile.enrolledCourses) return false;
    const courseId = getCourseId(course);
    return userProfile.enrolledCourses.includes(courseId);
  };

  // Check if user has paid for premium access (any premium course enrollment means full access)
  const hasPremiumAccess = () => {
    if (!userProfile || !userProfile.enrolledCourses) return false;
    // Check if user is enrolled in ANY premium course
    return paidCourses.some(course => {
      const courseId = getCourseId(course);
      return userProfile.enrolledCourses.includes(courseId);
    });
  };

  const hasPaymentPending = (course) => {
    if (!userProfile || !userProfile.pendingPayments) return false;
    const courseId = getCourseId(course);
    return userProfile.pendingPayments?.some(payment => 
      payment.courseId === courseId && payment.status === 'pending'
    );
  };

  const handleImageError = (courseId) => {
    setImageErrors(prev => ({ ...prev, [courseId]: true }));
  };

  const getImageSource = (course) => {
    const courseId = getCourseId(course);
    if (imageErrors[courseId] || !course.image || course.image === 'ssssss' || course.image === 's' || course.image === 'wdd') {
      return '/api/placeholder/400/225';
    }
    return course.image;
  };

  // Handle learning path selection
  const handleLearningPathClick = (pathType) => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      setAuthMode('login');
      return;
    }

    setActiveTab(pathType);
    setCurrentView('listing');
    
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle course card click - navigate to course content view
  const handleCourseClick = async (course) => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      setAuthMode('login');
      return;
    }

    const enrolled = isUserEnrolled(course);
    const pending = hasPaymentPending(course);
    const premiumAccess = hasPremiumAccess();

    // FREE COURSES - Direct enrollment and access
    if (course.isFree && !course.isOneToOne) {
      try {
        if (!enrolled) {
          await handleCourseEnrollment(course);
        }
        setSelectedCourse(course);
        setCurrentView('content');
      } catch (error) {
        console.error('Enrollment error:', error);
        alert('Failed to enroll in course. Please try again.');
      }
      return;
    }

    // PAID/PREMIUM COURSES - One-time payment for ALL premium courses
    if (course.isPaid && !course.isOneToOne) {
      if (premiumAccess) {
        // User has already paid for premium - give access to ALL premium courses
        setSelectedCourse(course);
        setCurrentView('content');
      } else if (pending) {
        // Payment pending - show waiting message
        alert('Your payment is pending admin verification. You will receive an email notification once approved and get access to ALL premium courses.');
      } else {
        // Need to pay - show payment modal (one-time payment for all premium courses)
        setSelectedCourse(course);
        setShowPaymentModal(true);
      }
      return;
    }

    // ONE-TO-ONE COURSES
    if (course.isOneToOne) {
      if (enrolled) {
        // Session booked and approved
        setSelectedCourse(course);
        setCurrentView('content');
      } else if (pending) {
        // Booking pending
        alert('Your booking is pending admin verification. You will receive an email with session details once approved.');
      } else {
        // Need to book - show payment modal
        setSelectedCourse(course);
        setShowPaymentModal(true);
      }
      return;
    }
  };

  // Handle back to course listing
  const handleBackToListing = () => {
    setCurrentView('listing');
    setSelectedCourse(null);
  };

  // Handle back to hero
  const handleBackToHero = () => {
    setCurrentView('hero');
    setActiveTab('all');
    setSelectedCourse(null);
  };

  // Payment form handlers
  const handlePaymentFormChange = (field, value) => {
    setPaymentForm(prev => ({ ...prev, [field]: value }));
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    return parts.length ? parts.join(' ') : value;
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + (v.length > 2 ? '/' + v.substring(2, 4) : '');
    }
    return v;
  };

  const validatePaymentForm = () => {
    if (!paymentForm.cardNumber || paymentForm.cardNumber.replace(/\s/g, '').length !== 16) {
      alert('Please enter a valid 16-digit card number');
      return false;
    }
    if (!paymentForm.expiryDate || !paymentForm.expiryDate.includes('/')) {
      alert('Please enter a valid expiry date (MM/YY)');
      return false;
    }
    if (!paymentForm.cvv || paymentForm.cvv.length !== 3) {
      alert('Please enter a valid 3-digit CVV');
      return false;
    }
    if (!paymentForm.cardHolder) {
      alert('Please enter card holder name');
      return false;
    }
    return true;
  };

  const handlePayment = async () => {
    if (!selectedCourse || !validatePaymentForm()) return;

    setPaymentLoading(true);

    try {
      const courseId = getCourseId(selectedCourse);
      
      // Fixed prices: Premium = $200 (for ALL premium courses), One-to-One = $300
      const fixedPrice = selectedCourse.isOneToOne ? 300 : 200;

      // Create payment record for admin verification
      const paymentData = {
        courseId: courseId,
        courseTitle: selectedCourse.isOneToOne ? selectedCourse.title : 'All Premium Courses - Lifetime Access',
        courseType: selectedCourse.isOneToOne ? 'one-to-one' : 'premium-all-access',
        amount: fixedPrice,
        userId: userProfile?.id,
        userName: userProfile?.name,
        userEmail: userProfile?.email,
        paymentId: 'pay_' + Math.random().toString(36).substr(2, 9),
        cardLast4: paymentForm.cardNumber.slice(-4),
        timestamp: new Date().toISOString(),
        status: 'pending'
      };

      console.log('Payment submitted for admin verification:', paymentData);

      // Call backend to save payment
      if (handleCoursePayment) {
        await handleCoursePayment(paymentData);
      }

      setPaymentSuccess(true);

      // Auto-close and show success message
      setTimeout(() => {
        setShowPaymentModal(false);
        setSelectedCourse(null);
        setPaymentSuccess(false);
        setPaymentForm({
          cardNumber: '',
          expiryDate: '',
          cvv: '',
          cardHolder: '',
          saveCard: false
        });
        
        if (selectedCourse.isOneToOne) {
          alert(`Payment of $${fixedPrice} submitted successfully! You will receive an email notification once admin approves your booking.`);
        } else {
          alert(`Payment of $${fixedPrice} submitted successfully! Once approved, you'll get lifetime access to ALL premium courses - current and future videos!`);
        }
      }, 3000);

    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setPaymentLoading(false);
    }
  };

  // RENDER: Course Content View (Videos Screen)
  if (currentView === 'content' && selectedCourse) {
    return (
      <div className="min-h-screen bg-[#0a1628] text-white">
        {/* Header */}
        <div className="bg-[#0f1f3a]/80 backdrop-blur-lg border-b border-gray-700 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={handleBackToListing}
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-semibold">Back to Courses</span>
              </button>
              
              <div className="flex items-center space-x-4">
                {selectedCourse.isFree && (
                  <span className="px-3 py-1 bg-green-600 text-white text-xs font-bold rounded-full">
                    FREE
                  </span>
                )}
                {selectedCourse.isPaid && !selectedCourse.isOneToOne && (
                  <span className="px-3 py-1 bg-[#0076FF] text-white text-xs font-bold rounded-full">
                    PREMIUM ACCESS
                  </span>
                )}
                {selectedCourse.isOneToOne && (
                  <span className="px-3 py-1 bg-purple-600 text-white text-xs font-bold rounded-full">
                    ONE-TO-ONE - $300
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Course Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Course Title & Description */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{selectedCourse.title}</h1>
            <p className="text-xl text-gray-300 mb-6">{selectedCourse.description}</p>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{selectedCourse.duration}</span>
              </div>
              <div className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4" />
                <span>{selectedCourse.totalLessons || selectedCourse.lessons} Lessons</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>Instructor: {selectedCourse.instructor}</span>
              </div>
            </div>
          </div>

          {/* Video Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Video Player */}
            <div className="lg:col-span-2">
              <div className="bg-[#0f1f3a] rounded-xl overflow-hidden shadow-2xl border border-gray-700/50">
                <div className="aspect-video bg-black flex items-center justify-center">
                  <div className="text-center">
                    <PlayCircle className="w-20 h-20 text-[#0076FF] mx-auto mb-4" />
                    <p className="text-gray-400">Video Player</p>
                    <p className="text-sm text-gray-500 mt-2">Course videos will be displayed here</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2">Lesson 1: Introduction</h2>
                  <p className="text-gray-400">Welcome to the course! In this lesson, we'll cover the fundamentals.</p>
                </div>
              </div>

              {/* Course Description Tab */}
              <div className="mt-6 bg-[#0f1f3a] rounded-xl p-6 border border-gray-700/50">
                <h3 className="text-xl font-bold mb-4">About This Course</h3>
                <div className="text-gray-300 space-y-4">
                  <p>{selectedCourse.description}</p>
                  
                  {selectedCourse.isPaid && !selectedCourse.isOneToOne && (
                    <div className="bg-[#0076FF]/20 border border-[#0076FF]/30 rounded-lg p-4 mt-4">
                      <h4 className="font-semibold text-[#0076FF] mb-2">Premium All-Access Benefits</h4>
                      <ul className="space-y-2 text-sm">
                        <li>✓ Access to ALL premium courses</li>
                        <li>✓ All current videos included</li>
                        <li>✓ All future videos & updates FREE</li>
                        <li>✓ Lifetime access - pay once, learn forever</li>
                        <li>✓ No recurring fees</li>
                      </ul>
                    </div>
                  )}
                  
                  {selectedCourse.isOneToOne && (
                    <div className="bg-purple-900/30 border border-purple-500/30 rounded-lg p-4 mt-4">
                      <h4 className="font-semibold text-purple-400 mb-2">One-to-One Session Details</h4>
                      <ul className="space-y-2 text-sm">
                        <li>✓ Personalized coaching session</li>
                        <li>✓ Custom learning roadmap</li>
                        <li>✓ Direct expert guidance</li>
                        <li>✓ Q&A and strategy review</li>
                        <li>✓ Private communication with trainer</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Lessons Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-[#0f1f3a] rounded-xl p-6 sticky top-24 border border-gray-700/50">
                <h3 className="text-xl font-bold mb-4 flex items-center justify-between">
                  <span>Course Content</span>
                  <span className="text-sm text-gray-400">{selectedCourse.totalLessons || selectedCourse.lessons} Lessons</span>
                </h3>
                
                <div className="space-y-2 max-h-[600px] overflow-y-auto">
                  {/* Sample lessons */}
                  {[...Array(parseInt(selectedCourse.totalLessons) || parseInt(selectedCourse.lessons) || 5)].map((_, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 bg-[#0a1628] hover:bg-[#1a2e4a] rounded-lg cursor-pointer transition-all group border border-gray-700/30"
                    >
                      <div className="flex-shrink-0">
                        {index === 0 ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <PlayCircle className="w-5 h-5 text-gray-400 group-hover:text-[#0076FF]" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          Lesson {index + 1}: Topic {index + 1}
                        </p>
                        <p className="text-xs text-gray-400">15:30</p>
                      </div>
                      {index === 0 && (
                        <CheckSquare className="w-4 h-4 text-green-500" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // RENDER: Course Listing View
  if (currentView === 'listing') {
    const premiumAccess = hasPremiumAccess();

    return (
      <div className="min-h-screen bg-[#0a1628] text-white">
        {/* Payment Modal */}
        {showPaymentModal && selectedCourse && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-[#0f1f3a] border border-[#0076FF]/30 rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="sticky top-0 bg-[#0f1f3a] border-b border-gray-700 p-6 flex items-center justify-between z-10">
                <h2 className="text-2xl font-bold">Complete Payment</h2>
                <button
                  onClick={() => {
                    setShowPaymentModal(false);
                    setSelectedCourse(null);
                    setPaymentSuccess(false);
                  }}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-all"
                  disabled={paymentLoading}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                {paymentSuccess ? (
                  <div className="text-center py-8">
                    <div className="w-20 h-20 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-12 h-12 text-green-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-green-500 mb-2">Payment Submitted!</h3>
                    <p className="text-gray-300 mb-4">
                      Your payment has been submitted successfully.
                    </p>
                    <div className="bg-yellow-900/30 border border-yellow-500/30 rounded-lg p-4">
                      <AlertCircle className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                      <p className="text-sm text-yellow-200 font-semibold">Awaiting Admin Verification</p>
                      <p className="text-xs text-gray-400 mt-2">
                        {selectedCourse.isOneToOne 
                          ? "We'll notify you via email once admin approves your booking."
                          : "Once approved, you'll get lifetime access to ALL premium courses - current and future videos!"}
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Course Summary */}
                    <div className="bg-[#0a1628] rounded-lg p-4 mb-6 border border-gray-700/50">
                      <h3 className="font-bold text-lg mb-2">
                        {selectedCourse.isOneToOne ? selectedCourse.title : 'All Premium Courses - Lifetime Access'}
                      </h3>
                      <p className="text-sm text-gray-400 mb-3">
                        {selectedCourse.isOneToOne 
                          ? selectedCourse.description 
                          : 'One-time payment for unlimited access to all premium courses - current and future!'}
                      </p>
                      
                      <div className="space-y-2 text-sm">
                        {selectedCourse.isOneToOne ? (
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400">One-to-One Coaching Session</span>
                            <Users className="w-4 h-4 text-purple-500" />
                          </div>
                        ) : (
                          <>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-400">All Premium Courses Access</span>
                              <Award className="w-4 h-4 text-[#0076FF]" />
                            </div>
                            <div className="bg-[#0076FF]/10 rounded p-2 mt-2">
                              <p className="text-xs text-[#0076FF]">✓ All current premium videos</p>
                              <p className="text-xs text-[#0076FF]">✓ All future updates FREE</p>
                              <p className="text-xs text-[#0076FF]">✓ Lifetime access</p>
                            </div>
                          </>
                        )}
                        
                        <div className="flex items-center justify-between pt-2 border-t border-gray-700 mt-3">
                          <span className="text-gray-400">Total Amount:</span>
                          <span className="text-2xl font-bold text-[#0076FF]">
                            ${selectedCourse.isOneToOne ? '300' : '200'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Payment Form */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">Card Number</label>
                        <div className="relative">
                          <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            value={paymentForm.cardNumber}
                            onChange={(e) => handlePaymentFormChange('cardNumber', formatCardNumber(e.target.value))}
                            className="w-full pl-10 pr-4 py-3 bg-[#0a1628] border border-[#0076FF]/30 rounded-lg text-white focus:outline-none focus:border-[#0076FF]"
                            maxLength={19}
                            disabled={paymentLoading}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold mb-2">Expiry Date</label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            value={paymentForm.expiryDate}
                            onChange={(e) => handlePaymentFormChange('expiryDate', formatExpiryDate(e.target.value))}
                            className="w-full px-4 py-3 bg-[#0a1628] border border-[#0076FF]/30 rounded-lg text-white focus:outline-none focus:border-[#0076FF]"
                            maxLength={5}
                            disabled={paymentLoading}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2">CVV</label>
                          <input
                            type="password"
                            placeholder="123"
                            value={paymentForm.cvv}
                            onChange={(e) => handlePaymentFormChange('cvv', e.target.value.replace(/\D/g, '').slice(0, 3))}
                            className="w-full px-4 py-3 bg-[#0a1628] border border-[#0076FF]/30 rounded-lg text-white focus:outline-none focus:border-[#0076FF]"
                            maxLength={3}
                            disabled={paymentLoading}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">Card Holder Name</label>
                        <input
                          type="text"
                          placeholder="John Doe"
                          value={paymentForm.cardHolder}
                          onChange={(e) => handlePaymentFormChange('cardHolder', e.target.value)}
                          className="w-full px-4 py-3 bg-[#0a1628] border border-[#0076FF]/30 rounded-lg text-white focus:outline-none focus:border-[#0076FF]"
                          disabled={paymentLoading}
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="saveCard"
                          checked={paymentForm.saveCard}
                          onChange={(e) => handlePaymentFormChange('saveCard', e.target.checked)}
                          className="rounded border-gray-600 bg-gray-700"
                          disabled={paymentLoading}
                        />
                        <label htmlFor="saveCard" className="text-sm text-gray-400">
                          Save card for future payments
                        </label>
                      </div>

                      {/* Security Notice */}
                      <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-3 flex items-center space-x-2">
                        <ShieldCheck className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <p className="text-xs text-green-200">Your payment is secure and encrypted</p>
                      </div>

                      {/* Payment Button */}
                      <button
                        onClick={handlePayment}
                        disabled={paymentLoading}
                        className="w-full py-4 bg-gradient-to-r from-[#0076FF] to-[#0056CC] hover:from-[#0056CC] hover:to-[#0076FF] text-white font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                      >
                        {paymentLoading ? (
                          <RefreshCw className="w-5 h-5 animate-spin" />
                        ) : (
                          <DollarSign className="w-5 h-5" />
                        )}
                        <span>
                          {paymentLoading ? 'Processing...' : `Pay $${selectedCourse.isOneToOne ? '300' : '200'}`}
                        </span>
                      </button>

                      <p className="text-xs text-center text-gray-500">
                        By completing this payment, you agree to our Terms of Service
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Error Notification */}
        {showError && (
          <div className="fixed top-4 right-4 bg-[#0076FF]/90 backdrop-blur-lg border border-[#0076FF]/50 rounded-lg p-4 max-w-md z-50 shadow-2xl">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="font-semibold text-white mb-1">Using Sample Data</h4>
                <p className="text-sm text-blue-100">Database courses will load automatically when connected</p>
              </div>
              <button
                onClick={() => setShowError(false)}
                className="ml-2 text-xs bg-[#0056CC] px-2 py-1 rounded hover:bg-[#003D99] transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Loading Overlay */}
        {loading && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="text-center">
              <RefreshCw className="w-16 h-16 text-[#0076FF] animate-spin mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Loading Courses...</h3>
              <p className="text-gray-400">Please wait while we load the courses</p>
            </div>
          </div>
        )}

        {/* Header with Back Button */}
        <div className="bg-[#0f1f3a]/80 backdrop-blur-lg border-b border-gray-700 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <button
              onClick={handleBackToHero}
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-semibold">Back to Course Selection</span>
            </button>
          </div>
        </div>

        {/* Premium Access Notice */}
        {premiumAccess && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
            <div className="bg-gradient-to-r from-green-900/30 to-green-700/30 rounded-xl p-6 border border-green-500/30 mb-8">
              <div className="flex items-center space-x-4">
                <CheckCircle className="w-12 h-12 text-green-500 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Premium All-Access Active!</h3>
                  <p className="text-green-200">You have lifetime access to ALL premium courses - current and future videos included!</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Category Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all text-sm sm:text-base ${
                activeTab === 'all'
                  ? 'bg-[#0076FF] text-white shadow-lg shadow-[#0076FF]/30'
                  : 'bg-[#0f1f3a] text-gray-300 hover:bg-[#1a2e4a] border border-gray-700/50'
              }`}
            >
              All Courses
            </button>
            
            <button
              onClick={() => setActiveTab('free')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center space-x-2 text-sm sm:text-base ${
                activeTab === 'free'
                  ? 'bg-green-600 text-white shadow-lg shadow-green-600/30'
                  : 'bg-[#0f1f3a] text-gray-300 hover:bg-[#1a2e4a] border border-gray-700/50'
              }`}
            >
              <Unlock className="w-4 h-4" />
              <span>Free ({freeCourses.length})</span>
            </button>
            
            <button
              onClick={() => setActiveTab('paid')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center space-x-2 text-sm sm:text-base ${
                activeTab === 'paid'
                  ? 'bg-[#0076FF] text-white shadow-lg shadow-[#0076FF]/30'
                  : 'bg-[#0f1f3a] text-gray-300 hover:bg-[#1a2e4a] border border-gray-700/50'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Premium ({paidCourses.length})</span>
            </button>
            
            <button
              onClick={() => setActiveTab('onetoone')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center space-x-2 text-sm sm:text-base ${
                activeTab === 'onetoone'
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                  : 'bg-[#0f1f3a] text-gray-300 hover:bg-[#1a2e4a] border border-gray-700/50'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>1-on-1 ({oneToOneCourses.length})</span>
            </button>
          </div>

          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              {activeTab === 'free' ? 'FREE BASIC COURSES'
                : activeTab === 'paid' ? 'PREMIUM COURSES - $200 ONE-TIME'
                : activeTab === 'onetoone' ? 'PERSONALIZED ONE-TO-ONE TRAINING - $300'
                : 'ALL TRADING COURSES'}
            </h2>
            
            <p className="text-2xl text-gray-300 mb-2">
              {activeTab === 'free' ? 'Start Learning for Free'
                : activeTab === 'paid' ? 'All Premium Courses - Lifetime Access'
                : activeTab === 'onetoone' ? 'Personal Expert Mentorship'
                : 'Choose Your Learning Path'}
            </p>
            
            <p className="text-gray-400">
              {activeTab === 'free' ? 'Begin your trading journey with our foundational courses - no payment required!'
                : activeTab === 'paid' ? 'Pay once ($200) and get lifetime access to ALL premium courses - current videos and all future updates included!'
                : activeTab === 'onetoone' ? 'Book personalized coaching sessions at $300 per session with expert traders for direct mentorship'
                : 'From beginner basics to professional strategies - choose what fits your goals'}
            </p>
          </div>

          {/* Courses Grid */}
          {displayCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayCourses.map((course) => {
                const courseId = getCourseId(course);
                const enrolled = isUserEnrolled(course);
                const pending = hasPaymentPending(course);

                return (
                  <div
                    key={courseId}
                    className="bg-[#0f1f3a] backdrop-blur-lg border border-gray-700/50 rounded-xl overflow-hidden hover:border-[#0076FF]/50 transition-all hover:scale-[1.02] transform cursor-pointer hover:shadow-xl hover:shadow-[#0076FF]/20"
                    onClick={() => handleCourseClick(course)}
                  >
                    {/* Course Image */}
                    <div className="relative h-48 bg-[#0a1628] overflow-hidden group">
                      <img
                        src={getImageSource(course)}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={() => handleImageError(courseId)}
                      />
                      
                      {/* Play Icon Overlay */}
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Play className="w-16 h-16 text-white" />
                      </div>

                      {/* Price Badge */}
                      <div className="absolute top-4 right-4">
                        {course.isOneToOne ? (
                          <div className="px-3 py-1 bg-purple-600 text-white text-sm font-bold rounded-full shadow-lg">
                            $300/Session
                          </div>
                        ) : course.isPaid ? (
                          premiumAccess ? (
                            <div className="px-3 py-1 bg-green-600 text-white text-sm font-bold rounded-full shadow-lg">
                              INCLUDED
                            </div>
                          ) : (
                            <div className="px-3 py-1 bg-[#0076FF] text-white text-sm font-bold rounded-full shadow-lg">
                              $200 ALL ACCESS
                            </div>
                          )
                        ) : (
                          <div className="px-3 py-1 bg-green-600 text-white text-sm font-bold rounded-full shadow-lg">
                            FREE
                          </div>
                        )}
                      </div>

                      {/* Level Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-gray-900/80 text-white text-xs font-semibold rounded-full">
                          {course.level}
                        </span>
                      </div>

                      {/* Status Badges */}
                      {(enrolled || (course.isPaid && premiumAccess)) && (
                        <div className="absolute bottom-4 left-4">
                          <span className="px-3 py-1 bg-green-600 text-white text-xs font-bold rounded-full flex items-center space-x-1">
                            <CheckCircle className="w-3 h-3" />
                            <span>ACCESS GRANTED</span>
                          </span>
                        </div>
                      )}
                      
                      {pending && !enrolled && !premiumAccess && (
                        <div className="absolute bottom-4 left-4">
                          <span className="px-3 py-1 bg-yellow-600 text-white text-xs font-bold rounded-full flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>PENDING</span>
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Course Info */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 line-clamp-2">{course.title}</h3>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{course.description}</p>

                      {/* Meta Info */}
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <BookOpen className="w-4 h-4" />
                          <span>{course.totalLessons || course.lessons} lessons</span>
                        </div>
                      </div>

                      {/* Instructor */}
                      <div className="text-sm text-gray-500 mb-4">
                        Instructor: <span className="text-[#0076FF]">{course.instructor}</span>
                      </div>

                      {/* Course Type Info */}
                      {course.isPaid && !course.isOneToOne && (
                        <div className="bg-[#0076FF]/20 border border-[#0076FF]/30 rounded-lg p-3 mb-4">
                          <p className="text-xs text-blue-200">
                            {premiumAccess 
                              ? 'You have full access | All videos unlocked'
                              : 'Pay once $200 | All courses | All future videos FREE'}
                          </p>
                        </div>
                      )}

                      {course.isOneToOne && (
                        <div className="bg-purple-900/30 border border-purple-500/30 rounded-lg p-3 mb-4">
                          <p className="text-xs text-purple-200">
                            Personal session | Expert guidance | Custom roadmap
                          </p>
                        </div>
                      )}

                      {/* CTA Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCourseClick(course);
                        }}
                        disabled={pending && !premiumAccess}
                        className={`w-full py-3 rounded-lg font-semibold transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center space-x-2 ${
                          enrolled || (course.isPaid && !course.isOneToOne && premiumAccess)
                            ? 'bg-green-600 text-white hover:bg-green-700'
                            : pending
                            ? 'bg-yellow-600 text-white cursor-wait'
                            : course.isOneToOne
                            ? 'bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white hover:scale-105 transform'
                            : course.isPaid
                            ? 'bg-gradient-to-r from-[#0076FF] to-[#0056CC] hover:from-[#0056CC] hover:to-[#0076FF] text-white hover:scale-105 transform'
                            : 'bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white hover:scale-105 transform'
                        }`}
                      >
                        {enrolled || (course.isPaid && !course.isOneToOne && premiumAccess) ? (
                          <>
                            <CheckCircle className="w-5 h-5" />
                            <span>View Course</span>
                          </>
                        ) : pending ? (
                          <>
                            <Clock className="w-5 h-5" />
                            <span>Payment Pending</span>
                          </>
                        ) : course.isOneToOne ? (
                          <>
                            <Users className="w-5 h-5" />
                            <span>Book Session - $300</span>
                          </>
                        ) : course.isPaid ? (
                          <>
                            <Lock className="w-5 h-5" />
                            <span>Unlock All Premium - $200</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-5 h-5" />
                            <span>Start Learning Free</span>
                          </>
                        )}
                      </button>

                      {pending && !premiumAccess && (
                        <p className="text-xs text-yellow-400 text-center mt-2">
                          Awaiting admin verification
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-16">
              <BookOpen className="w-20 h-20 text-gray-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-400 mb-2">No courses found</h3>
              <p className="text-gray-500 mb-6">
                {loading ? 'Loading courses...' : 'No courses available in this category. Check back later!'}
              </p>
              {!loading && (
                <button
                  onClick={fetchCourses}
                  className="px-6 py-3 bg-[#0076FF] hover:bg-[#0056CC] text-white rounded-lg font-semibold transition-all flex items-center space-x-2 mx-auto"
                >
                  <RefreshCw className="w-5 h-5" />
                  <span>Refresh Courses</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Refresh Button */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <button
            onClick={fetchCourses}
            disabled={loading}
            className="px-8 py-3 bg-[#0f1f3a] hover:bg-[#1a2e4a] text-white rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 mx-auto border border-gray-700/50"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh Courses</span>
          </button>
        </div>
      </div>
    );
  }

  // RENDER: Hero View (Initial Landing Page)
  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      {/* Error Notification */}
      {showError && (
        <div className="fixed top-4 right-4 bg-[#0076FF]/90 backdrop-blur-lg border border-[#0076FF]/50 rounded-lg p-4 max-w-md z-50 shadow-2xl">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-semibold text-white mb-1">Using Sample Data</h4>
              <p className="text-sm text-blue-100">Database courses will load automatically when connected</p>
            </div>
            <button
              onClick={() => setShowError(false)}
              className="ml-2 text-xs bg-[#0056CC] px-2 py-1 rounded hover:bg-[#003D99] transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="text-center">
            <RefreshCw className="w-16 h-16 text-[#0076FF] animate-spin mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Loading Courses...</h3>
            <p className="text-gray-400">Please wait while we load the courses</p>
          </div>
        </div>
      )}

      {/* Hero Section - UPDATED with #0076FF color scheme */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#1a2332] via-[#1e2b3d] to-[#1a2332] py-16 lg:py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#0076FF] rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#0076FF] rounded-full filter blur-3xl animate-pulse delay-700"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-[#0076FF]/30 backdrop-blur-sm border border-[#0076FF]/30 rounded-3xl p-12 text-center">
            <div className="inline-block px-4 py-2 bg-[#0076FF] rounded-full text-sm font-medium mb-6">
              <span className="text-white">Trading Education</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
              Advanced Forex Trading Courses
            </h1>
            <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto">
              Choose from free beginner courses, premium advanced training, or personalized one-to-one coaching
            </p>
          </div>
        </div>
      </div>

      {/* What You'll Learn Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-br from-[#0f1f3a] to-[#0a1628] rounded-2xl p-8 md:p-12 border border-[#0076FF]/30 shadow-2xl">
          <div className="text-center mb-12">
            <Target className="w-16 h-16 mx-auto text-[#0076FF] mb-4" />
            <h2 className="text-4xl font-bold mb-4 text-white">ADVANCED FOREX TRADING COURSE</h2>
            <p className="text-xl text-gray-300">Take your trading to the next level with professional strategies that institutions use!</p>
          </div>

          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-8 text-center text-white flex items-center justify-center space-x-3">
              <BookOpen className="w-8 h-8 text-[#0076FF]" />
              <span>What You'll Learn:</span>
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
                        <span>Real CHoCH (Change of Character) & BOS (Break of Structure)</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Live market examples</span>
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
                    <h4 className="text-lg font-bold mb-3 text-white">2. Order Blocks & Fair Value Gaps (FVGs)</h4>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Spotting OBs & FVGs that truly work</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>High-probability trade setups</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 3. Liquidity Sweeps & Manipulation */}
              <div className="bg-[#0a1628] rounded-xl p-6 border border-gray-700/50 hover:border-[#0076FF]/50 transition-all">
                <div className="flex items-start space-x-4">
                  <BarChart3 className="w-8 h-8 text-[#0076FF] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-lg font-bold mb-3 text-white">3. Liquidity Sweeps & Manipulation</h4>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Different types of liquidity grabs</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>How to trade liquidity sweeps profitably</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 4. Daily Candle Theory */}
              <div className="bg-[#0a1628] rounded-xl p-6 border border-gray-700/50 hover:border-[#0076FF]/50 transition-all">
                <div className="flex items-start space-x-4">
                  <Zap className="w-8 h-8 text-[#0076FF] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-lg font-bold mb-3 text-white">4. Daily Candle Theory</h4>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Decode smart money footprints</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 5. Trading Psychology */}
              <div className="bg-[#0a1628] rounded-xl p-6 border border-gray-700/50 hover:border-[#0076FF]/50 transition-all">
                <div className="flex items-start space-x-4">
                  <Brain className="w-8 h-8 text-[#0076FF] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-lg font-bold mb-3 text-white">5. Trading Psychology</h4>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Master patience & discipline</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Control fear, greed & FOMO</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Develop a winning mindset</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Build emotional resilience after losses</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Learn consistency & focus under pressure</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 6. How to Pass Funded Accounts */}
              <div className="bg-[#0a1628] rounded-xl p-6 border border-gray-700/50 hover:border-[#0076FF]/50 transition-all">
                <div className="flex items-start space-x-4">
                  <Shield className="w-8 h-8 text-[#0076FF] flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-lg font-bold mb-3 text-white">6. How to Pass Funded Accounts</h4>
                    <ul className="space-y-2 text-gray-300 text-sm">
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Step-by-step guide to pass prop firm challenges</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Risk management rules for funding success</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Smart strategies to grow and secure funded accounts</span>
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
              <span>Why Join?</span>
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

      {/* Learning Path Selection */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-[#0f1f3a] rounded-2xl p-8 md:p-12 border border-gray-700/50">
          <h2 className="text-3xl font-bold mb-8 text-center text-white">Choose Your Learning Path</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Free Courses Card */}
            <div 
              onClick={() => handleLearningPathClick('free')}
              className="bg-[#0a1628] rounded-xl p-6 text-center border border-gray-700/50 hover:border-green-500/50 hover:bg-[#0a1628]/80 transition-all cursor-pointer transform hover:scale-105 hover:shadow-xl hover:shadow-green-500/20 group"
            >
              <Unlock className="w-12 h-12 text-green-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-2 text-white">Free Courses</h3>
              <p className="text-gray-400 text-sm mb-4">Start with foundational trading concepts. No payment needed!</p>
              <div className="mt-4 text-green-500 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                Click to view courses
              </div>
            </div>
            
            {/* Premium Courses Card */}
            <div 
              onClick={() => handleLearningPathClick('paid')}
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
              onClick={() => handleLearningPathClick('onetoone')}
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
                  setCurrentView('listing');
                  setActiveTab('all');
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

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Our Training Platform?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#0f1f3a] rounded-xl p-6 border border-gray-700/50 text-center hover:border-[#0076FF]/50 transition-all">
            <Video className="w-12 h-12 text-[#0076FF] mx-auto mb-4" />
            <h3 className="text-lg font-bold mb-2">HD Video Lessons</h3>
            <p className="text-gray-400 text-sm">High-quality video content with real trading examples</p>
          </div>
          
          <div className="bg-[#0f1f3a] rounded-xl p-6 border border-gray-700/50 text-center hover:border-[#0076FF]/50 transition-all">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-bold mb-2">Lifetime Access</h3>
            <p className="text-gray-400 text-sm">One-time payment for permanent course access</p>
          </div>
          
          <div className="bg-[#0f1f3a] rounded-xl p-6 border border-gray-700/50 text-center hover:border-[#0076FF]/50 transition-all">
            <Brain className="w-12 h-12 text-purple-500 mx-auto mb-4" />
            <h3 className="text-lg font-bold mb-2">Expert Instructors</h3>
            <p className="text-gray-400 text-sm">Learn from professional forex traders</p>
          </div>
          
          <div className="bg-[#0f1f3a] rounded-xl p-6 border border-gray-700/50 text-center hover:border-[#0076FF]/50 transition-all">
            <Shield className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-lg font-bold mb-2">Proven Strategies</h3>
            <p className="text-gray-400 text-sm">Battle-tested trading methods that work</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
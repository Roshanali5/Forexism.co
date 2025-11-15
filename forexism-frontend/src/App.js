import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Import Components
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Notification from './components/Notification';
import AuthModal from './components/AuthModal';
import PaymentModal from './components/PaymentModal';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';

// Import Pages
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import CoursesPage from './pages/CoursesPage';
import PremiumCoursePage from './pages/PremiumCoursePage'; // NEW
import PropFirmPage from './pages/PropFirmPage';
import EventsPage from './pages/EventsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';

// Import Auth Context
import { AuthProvider, useAuth } from './context/AuthContext';

// Main App Component with Auth Context
const AppContent = () => {
  const { user, isAuthenticated, login, register, logout, loading: authLoading, checkAuthStatus } = useAuth();
  
  // Navigation & UI State
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Authentication Modal State
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  
  // ADMIN AUTHENTICATION STATE - FIXED
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  
  // Payment State
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  
  // NEW: Premium Course State
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  
  // Notification State
  const [notification, setNotification] = useState({ 
    show: false, 
    message: '', 
    type: ''
  });

  // Form States
  const [authForm, setAuthForm] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });

  const [authErrors, setAuthErrors] = useState({});

  const [paymentForm, setPaymentForm] = useState({
    amount: '',
    transactionId: '',
    paymentMethod: 'bank',
    screenshot: null,
    screenshotPreview: null
  });

  const [paymentErrors, setPaymentErrors] = useState({});

  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [contactErrors, setContactErrors] = useState({});

  // Courses State
  const [courses, setCourses] = useState([]);
  const [blogs, setBlogs] = useState([]);

  // API Base URL
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5002/api';
  const WHATSAPP_NUMBER = process.env.REACT_APP_WHATSAPP_NUMBER || '923001479350';

  // Check admin authentication on mount
  useEffect(() => {
    console.log('🔍 Checking admin authentication on mount...');
    const adminAuth = localStorage.getItem('adminAuth');
    const adminAuthTime = localStorage.getItem('adminAuthTime');
    
    if (adminAuth === 'true' && adminAuthTime) {
      const currentTime = Date.now();
      const authTime = parseInt(adminAuthTime);
      const hoursPassed = (currentTime - authTime) / (1000 * 60 * 60);
      
      if (hoursPassed < 24) {
        setIsAdminAuthenticated(true);
        console.log('✅ Admin session restored');
      } else {
        localStorage.removeItem('adminAuth');
        localStorage.removeItem('adminAuthTime');
        localStorage.removeItem('adminUser');
        setIsAdminAuthenticated(false);
        console.log('❌ Admin session expired');
      }
    } else {
      setIsAdminAuthenticated(false);
    }
  }, []);

  // Handle Admin Access
  const handleAdminAccess = () => {
    console.log('🛡️ ADMIN ACCESS CLICKED');
    
    if (isAdminAuthenticated) {
      console.log('✅ Already admin authenticated, redirecting to admin dashboard');
      setCurrentPage('admin');
    } else {
      console.log('🔐 Not admin authenticated, showing login modal');
      setShowAdminLogin(true);
    }
  };

  // Handle successful admin login
  const handleAdminLoginSuccess = () => {
    console.log('🎉 ADMIN LOGIN SUCCESS');
    
    setIsAdminAuthenticated(true);
    localStorage.setItem('adminAuth', 'true');
    localStorage.setItem('adminAuthTime', Date.now().toString());
    
    setShowAdminLogin(false);
    setCurrentPage('admin');
    
    showNotification('Admin access granted! Redirecting to dashboard...', 'success');
  };

  // NEW: Handle Premium Course Access
  const handlePremiumCourseAccess = (courseId) => {
    console.log('🎯 Premium course access requested:', courseId);
    setSelectedCourseId(courseId);
    setCurrentPage('premium-course');
  };

  // NEW: Handle Course Payment
  const handleCoursePayment = (course) => {
    console.log('💳 Course payment requested:', course.title);
    setSelectedCourse(course);
    setShowPaymentModal(true);
  };

  // Show Notification
  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 5000);
  };

  // Validate Email
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Validate Auth Form
  const validateAuthForm = () => {
    const errors = {};
    
    if (!authForm.email) {
      errors.email = 'Email is required';
    } else if (!validateEmail(authForm.email)) {
      errors.email = 'Invalid email format';
    }

    if (!authForm.password) {
      errors.password = 'Password is required';
    } else if (authForm.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (authMode === 'signup') {
      if (!authForm.name) {
        errors.name = 'Name is required';
      }
      if (authForm.password !== authForm.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
    }

    setAuthErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle Authentication
  const handleAuth = async (e) => {
    e.preventDefault();
    
    if (!validateAuthForm()) {
      return;
    }

    setLoading(true);

    try {
      let result;
      
      if (authMode === 'login') {
        result = await login(authForm.email, authForm.password);
      } else if (authMode === 'signup') {
        result = await register(authForm.name, authForm.email, authForm.password);
      }
      
      if (result.success) {
        showNotification(
          authMode === 'login' ? 'Login successful!' : 'Account created successfully!',
          'success'
        );
        setShowAuthModal(false);
        setAuthForm({ email: '', password: '', name: '', confirmPassword: '' });
        setAuthErrors({});
      } else {
        showNotification(result.message, 'error');
      }
      
    } catch (error) {
      console.error('Authentication error:', error);
      showNotification(
        error.response?.data?.message || 'An error occurred. Please try again.',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    console.log('🚪 Logout triggered');
    
    if (isAdminAuthenticated) {
      localStorage.removeItem('adminAuth');
      localStorage.removeItem('adminAuthTime');
      localStorage.removeItem('adminUser');
      setIsAdminAuthenticated(false);
    }
    
    logout();
    showNotification('Logged out successfully', 'success');
    setCurrentPage('home');
  };

  // Handle Payment Submission
  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    
    const errors = {};
    if (!paymentForm.amount) errors.amount = 'Amount is required';
    if (!paymentForm.transactionId) errors.transactionId = 'Transaction ID is required';
    if (!paymentForm.screenshot) errors.screenshot = 'Screenshot is required';

    if (Object.keys(errors).length > 0) {
      setPaymentErrors(errors);
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      const courseId = selectedCourse._id || selectedCourse.id;
      formData.append('courseId', courseId);
      formData.append('amount', paymentForm.amount);
      formData.append('transactionId', paymentForm.transactionId);
      formData.append('paymentMethod', paymentForm.paymentMethod);
      formData.append('screenshot', paymentForm.screenshot);

      const token = localStorage.getItem('token');
      await axios.post(
        `${API_URL}/payments/submit`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      showNotification('Payment submitted successfully! Admin will verify within 24 hours.', 'success');
      setShowPaymentModal(false);
      setPaymentForm({
        amount: '',
        transactionId: '',
        paymentMethod: 'bank',
        screenshot: null,
        screenshotPreview: null
      });
      setPaymentErrors({});
      
    } catch (error) {
      console.error('Payment submission error:', error);
      showNotification(
        error.response?.data?.message || 'Failed to submit payment. Please try again.',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle File Upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setPaymentErrors({ 
          ...paymentErrors, 
          screenshot: 'File size must be less than 5MB' 
        });
        return;
      }

      if (!file.type.startsWith('image/')) {
        setPaymentErrors({ 
          ...paymentErrors, 
          screenshot: 'Please upload an image file' 
        });
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPaymentForm({
          ...paymentForm,
          screenshot: file,
          screenshotPreview: reader.result
        });
        setPaymentErrors({ ...paymentErrors, screenshot: '' });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Contact Form Submission
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    
    const errors = {};
    if (!contactForm.name) errors.name = 'Name is required';
    if (!contactForm.email) errors.email = 'Email is required';
    else if (!validateEmail(contactForm.email)) errors.email = 'Invalid email format';
    if (!contactForm.subject) errors.subject = 'Subject is required';
    if (!contactForm.message) errors.message = 'Message is required';

    if (Object.keys(errors).length > 0) {
      setContactErrors(errors);
      return;
    }

    setLoading(true);

    try {
      await axios.post(`${API_URL}/contact`, contactForm);
      
      showNotification('Message sent successfully! We will get back to you soon.', 'success');
      setContactForm({ name: '', email: '', subject: '', message: '' });
      setContactErrors({});
      
    } catch (error) {
      console.error('Contact form error:', error);
      showNotification(
        error.response?.data?.message || 'Failed to send message. Please try again.',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  // NEW: Enhanced Course Enrollment
  const handleCourseEnrollment = async (course) => {
    if (!isAuthenticated) {
      showNotification('Please login to enroll in courses', 'info');
      setShowAuthModal(true);
      setAuthMode('login');
      return;
    }

    const courseId = course._id || course.id;
    const isEnrolled = user?.enrolledCourses?.some(id => 
      id.toString() === courseId.toString()
    );
    
    if (isEnrolled) {
      showNotification('You are already enrolled in this course!', 'info');
      // Redirect to course page if already enrolled
      setSelectedCourseId(courseId);
      setCurrentPage('premium-course');
      return;
    }

    if (course.isFree) {
      // Free course - enroll directly and redirect
      await enrollInFreeCourse(course);
      setSelectedCourseId(courseId);
      setCurrentPage('premium-course');
    } else if (course.isPaid && !course.isOneToOne) {
      // Premium course - show payment option
      handleCoursePayment(course);
    } else if (course.isOneToOne) {
      // One-to-one course - show payment modal
      setSelectedCourse(course);
      setShowPaymentModal(true);
    }
  };

  // Enroll in Free Course
  const enrollInFreeCourse = async (course) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const courseId = course._id || course.id;
      await axios.post(
        `${API_URL}/courses/enroll`,
        { courseId: courseId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      showNotification('Successfully enrolled in course!', 'success');
      // Refresh user data
      if (checkAuthStatus) {
        checkAuthStatus();
      }
    } catch (error) {
      console.error('Enrollment error:', error);
      showNotification(
        error.response?.data?.message || 'Failed to enroll. Please try again.',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle WhatsApp Support
  const handleWhatsAppSupport = () => {
    const message = encodeURIComponent('Hi, I need support with Forexism.');
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  // Events Data
  const events = [
    {
      id: 1,
      title: 'Live Trading Webinar: Market Analysis',
      date: 'Jan 20, 2025',
      time: '18:00 UTC',
      type: 'Online',
      description: 'Join our expert traders for a live market analysis session covering major currency pairs and current market trends.'
    }
  ];

  // PropFirms Data
  const propFirms = [
    {
      id: 1,
      name: 'FTMO',
      description: 'Leading proprietary trading firm offering funded accounts up to $200,000',
      minDeposit: 'No deposit required',
      profitSplit: '80/20',
      features: ['Free trial', 'No time limit', 'Bi-weekly payouts']
    }
  ];

  // Testimonials Data
  const testimonials = [
    {
      id: 1,
      name: 'David Miller',
      role: 'Professional Trader',
      content: 'Forexism transformed my trading journey. The courses are comprehensive and the VIP signals have been incredibly accurate.',
      rating: 5
    }
  ];

  // Render Current Page
  const renderPage = () => {
    console.log('🔄 Rendering page:', currentPage);

    // Admin dashboard
    if (currentPage === 'admin' && isAdminAuthenticated) {
      return (
        <AdminDashboard 
          courses={courses} 
          blogs={blogs} 
          setCourses={setCourses} 
          setBlogs={setBlogs} 
          setCurrentPage={setCurrentPage}
          setIsAdminAuthenticated={setIsAdminAuthenticated}
          userProfile={user}
        />
      );
    }

    // Admin access denied
    if (currentPage === 'admin' && !isAdminAuthenticated) {
      setCurrentPage('home');
      showNotification('Admin access required. Please login as admin.', 'error');
      return null;
    }

    // Regular pages
    switch (currentPage) {
      case 'home':
        return (
          <HomePage 
            setCurrentPage={setCurrentPage} 
            isAuthenticated={isAuthenticated} 
            setShowAuthModal={setShowAuthModal} 
            setAuthMode={setAuthMode} 
          />
        );
      case 'blog':
        return <BlogPage isAuthenticated={isAuthenticated} />;
      case 'courses':
        return (
          <CoursesPage 
            handleCourseEnrollment={handleCourseEnrollment} 
            handlePremiumCourseAccess={handlePremiumCourseAccess} // NEW PROP
            handleCoursePayment={handleCoursePayment} // NEW PROP
            userProfile={user} 
            isAuthenticated={isAuthenticated} 
            setShowAuthModal={setShowAuthModal} 
            setAuthMode={setAuthMode}
            setCurrentPage={setCurrentPage}
          />
        );
      case 'premium-course': // NEW ROUTE
        return (
          <PremiumCoursePage 
            courseId={selectedCourseId}
            userProfile={user}
            isAuthenticated={isAuthenticated}
            setCurrentPage={setCurrentPage}
            setShowAuthModal={setShowAuthModal}
            setAuthMode={setAuthMode}
          />
        );
      case 'propfirm':
        return <PropFirmPage propFirms={propFirms} />;
      case 'events':
        return <EventsPage events={events} />;
      case 'about':
        return <AboutPage testimonials={testimonials} />;
      case 'contact':
        return (
          <ContactPage 
            contactForm={contactForm} 
            setContactForm={setContactForm} 
            contactErrors={contactErrors} 
            handleContactSubmit={handleContactSubmit} 
            loading={loading} 
            handleWhatsAppSupport={handleWhatsAppSupport} 
          />
        );
      case 'privacy':
        return <PrivacyPage />;
      default:
        return (
          <HomePage 
            setCurrentPage={setCurrentPage} 
            isAuthenticated={isAuthenticated} 
            setShowAuthModal={setShowAuthModal} 
            setAuthMode={setAuthMode} 
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hide Navigation and Footer on Admin pages */}
      {currentPage !== 'admin' && currentPage !== 'premium-course' && (
        <Navigation 
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          setShowAuthModal={setShowAuthModal}
          setAuthMode={setAuthMode}
          isAuthenticated={isAuthenticated}
          userProfile={user}
          handleLogout={handleLogout}
          handleAdminAccess={handleAdminAccess}
          isAdminAuthenticated={isAdminAuthenticated}
        />
      )}

      <Notification 
        notification={notification}
        setNotification={setNotification}
      />

      {/* Show Admin Login Modal when needed */}
      {showAdminLogin && (
        <AdminLogin 
          setIsAdminAuthenticated={setIsAdminAuthenticated}
          setCurrentPage={setCurrentPage}
          setShowAdminLogin={setShowAdminLogin}
          userProfile={user}
          onLoginSuccess={handleAdminLoginSuccess}
        />
      )}

      {/* Only show auth modal on non-admin pages */}
      {currentPage !== 'admin' && !showAdminLogin && (
        <>
          <AuthModal 
            showAuthModal={showAuthModal}
            setShowAuthModal={setShowAuthModal}
            authMode={authMode}
            setAuthMode={setAuthMode}
            authForm={authForm}
            setAuthForm={setAuthForm}
            authErrors={authErrors}
            setAuthErrors={setAuthErrors}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            handleAuth={handleAuth}
            loading={loading || authLoading}
          />

          <PaymentModal 
            showPaymentModal={showPaymentModal}
            setShowPaymentModal={setShowPaymentModal}
            selectedCourse={selectedCourse}
            paymentForm={paymentForm}
            setPaymentForm={setPaymentForm}
            paymentErrors={paymentErrors}
            handlePaymentSubmit={handlePaymentSubmit}
            handleFileChange={handleFileChange}
            loading={loading}
          />
        </>
      )}

      <main>
        {renderPage()}
      </main>

      {currentPage !== 'admin' && currentPage !== 'premium-course' && (
        <Footer 
          setCurrentPage={setCurrentPage}
          handleWhatsAppSupport={handleWhatsAppSupport}
        />
      )}
    </div>
  );
};

// Main App Component with AuthProvider
const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
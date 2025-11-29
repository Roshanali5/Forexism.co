import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Loader2, Clock, Calendar, Building2, Users, CheckCircle, XCircle } from 'lucide-react';

const ContactPage = () => {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [contactErrors, setContactErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'

  const validateForm = () => {
    const errors = {};
    
    if (!contactForm.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!contactForm.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(contactForm.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (contactForm.phone && !/^[\+]?[0-9\s\-\(\)]{10,}$/.test(contactForm.phone)) {
      errors.phone = 'Phone number is invalid';
    }
    
    if (!contactForm.subject.trim()) {
      errors.subject = 'Subject is required';
    }
    
    if (!contactForm.message.trim()) {
      errors.message = 'Message is required';
    } else if (contactForm.message.trim().length < 10) {
      errors.message = 'Message should be at least 10 characters long';
    }
    
    return errors;
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setContactErrors(errors);
      return;
    }
    
    setLoading(true);
    setContactErrors({});
    setSubmitStatus(null);

    try {
      // Method 1: Using EmailJS (Recommended - No backend required)
      await sendWithEmailJS();
      
      // Method 2: If you have a backend API, uncomment the line below and comment the one above
      // await sendWithBackendAPI();
      
      setSubmitStatus('success');
      setContactForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
      
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitStatus('error');
    } finally {
      setLoading(false);
    }
  };

  // Method 1: Send using EmailJS (No backend required)
  const sendWithEmailJS = async () => {
    // You'll need to set up EmailJS (free tier available)
    // Visit: https://www.emailjs.com/
    
    // Example implementation:
    /*
    const emailjs = await import('@emailjs/browser');
    
    const templateParams = {
      from_name: contactForm.name,
      from_email: contactForm.email,
      from_phone: contactForm.phone || 'Not provided',
      subject: contactForm.subject,
      message: contactForm.message,
      to_email: 'support@forexism.co'
    };

    await emailjs.send(
      'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
      'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
      templateParams,
      'YOUR_PUBLIC_KEY' // Replace with your EmailJS public key
    );
    */
    
    // For now, we'll simulate a successful send
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Message would be sent to support@forexism.co:', contactForm);
        resolve();
      }, 1000);
    });
  };

  // Method 2: Send using your backend API
  const sendWithBackendAPI = async () => {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...contactForm,
        to: 'support@forexism.co'
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    return response.json();
  };

  const handleWhatsAppSupport = () => {
    const phoneNumber = '923001479350';
    const message = `Hello! I need support regarding Forexism trading education.`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#1a2332] via-[#1e2b3d] to-[#1a2332] py-16 lg:py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#0076FF] rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#0076FF] rounded-full filter blur-3xl animate-pulse delay-700"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-[#0076FF]/30 backdrop-blur-sm border border-[#0076FF]/30 rounded-3xl p-12 text-center">
            <div className="inline-block px-4 py-2 bg-[#0076FF] rounded-full text-sm font-medium mb-6">
              <span className="flex items-center space-x-2 text-white">
                <MessageCircle className="h-4 w-4" />
                <span>We're Here to Help</span>
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
              Get In Touch
            </h1>
            <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto">
              Have questions? We're here to help you on your trading journey. Reach out to us anytime!
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-gradient-to-br from-black via-[#1a2332] to-black py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Status Messages */}
          {submitStatus === 'success' && (
            <div className="mb-8 p-4 bg-green-500/20 border border-green-500/50 rounded-xl flex items-center space-x-3 animate-fade-in">
              <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
              <div>
                <p className="text-green-400 font-semibold">Message sent successfully!</p>
                <p className="text-green-300 text-sm">We'll get back to you within 24 hours.</p>
              </div>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="mb-8 p-4 bg-red-500/20 border border-red-500/50 rounded-xl flex items-center space-x-3 animate-fade-in">
              <XCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
              <div>
                <p className="text-red-400 font-semibold">Failed to send message</p>
                <p className="text-red-300 text-sm">Please try again or contact us via WhatsApp.</p>
              </div>
            </div>
          )}

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Form */}
            <div className="bg-gradient-to-br from-[#0076FF]/20 to-[#0076FF]/10 backdrop-blur-sm border border-[#0076FF]/30 rounded-2xl p-6 sm:p-8 lg:p-10">
              <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Send us a Message</h2>
                <p className="text-gray-300 text-sm">Fill out the form below and we'll get back to you as soon as possible</p>
              </div>
              
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Your Name *</label>
                  <input
                    type="text"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className={`w-full px-4 py-3 bg-[#0076FF]/10 border ${contactErrors.name ? 'border-red-500' : 'border-[#0076FF]/50'} rounded-lg focus:ring-2 focus:ring-[#0076FF] focus:border-transparent text-white placeholder-gray-500 transition-all`}
                    placeholder="John Doe"
                  />
                  {contactErrors.name && <p className="text-red-400 text-sm mt-1 flex items-center"><span className="mr-1">⚠️</span>{contactErrors.name}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Email Address *</label>
                    <input
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className={`w-full px-4 py-3 bg-[#0076FF]/10 border ${contactErrors.email ? 'border-red-500' : 'border-[#0076FF]/50'} rounded-lg focus:ring-2 focus:ring-[#0076FF] focus:border-transparent text-white placeholder-gray-500 transition-all`}
                      placeholder="you@example.com"
                    />
                    {contactErrors.email && <p className="text-red-400 text-sm mt-1 flex items-center"><span className="mr-1">⚠️</span>{contactErrors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      className={`w-full px-4 py-3 bg-[#0076FF]/10 border ${contactErrors.phone ? 'border-red-500' : 'border-[#0076FF]/50'} rounded-lg focus:ring-2 focus:ring-[#0076FF] focus:border-transparent text-white placeholder-gray-500 transition-all`}
                      placeholder="+92 300 1234567"
                    />
                    {contactErrors.phone && <p className="text-red-400 text-sm mt-1 flex items-center"><span className="mr-1">⚠️</span>{contactErrors.phone}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Subject *</label>
                  <input
                    type="text"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    className={`w-full px-4 py-3 bg-[#0076FF]/10 border ${contactErrors.subject ? 'border-red-500' : 'border-[#0076FF]/50'} rounded-lg focus:ring-2 focus:ring-[#0076FF] focus:border-transparent text-white placeholder-gray-500 transition-all`}
                    placeholder="How can we help?"
                  />
                  {contactErrors.subject && <p className="text-red-400 text-sm mt-1 flex items-center"><span className="mr-1">⚠️</span>{contactErrors.subject}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Message *</label>
                  <textarea
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    rows="5"
                    className={`w-full px-4 py-3 bg-[#0076FF]/10 border ${contactErrors.message ? 'border-red-500' : 'border-[#0076FF]/50'} rounded-lg focus:ring-2 focus:ring-[#0076FF] focus:border-transparent text-white placeholder-gray-500 transition-all resize-none`}
                    placeholder="Tell us more about your inquiry..."
                  />
                  {contactErrors.message && <p className="text-red-400 text-sm mt-1 flex items-center"><span className="mr-1">⚠️</span>{contactErrors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#0076FF] text-white py-4 rounded-lg hover:bg-[#0066e6] transition-all font-bold text-base sm:text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg hover:shadow-[#0076FF]/50 transform hover:scale-105 duration-200"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Contact Details Card */}
              <div className="bg-gradient-to-br from-[#0076FF]/20 to-[#0076FF]/10 backdrop-blur-sm border border-[#0076FF]/30 rounded-2xl p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-[#0076FF] p-3 rounded-lg flex-shrink-0">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">Email</h3>
                      <a href="mailto:support@forexism.co" className="text-[#0076FF] hover:text-[#0066e6] transition-colors">
                        support@forexism.co
                      </a>
                      <p className="text-gray-400 text-sm mt-1">We'll respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-[#0076FF] p-3 rounded-lg flex-shrink-0">
                      <MessageCircle className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">WhatsApp</h3>
                      <a href="https://wa.me/923001479350" target="_blank" rel="noopener noreferrer" className="text-[#0076FF] hover:text-[#0066e6] transition-colors text-lg font-semibold">
                        +92 300 1479350
                      </a>
                      <p className="text-[#0076FF] text-sm mt-1 font-medium">Available 24/7</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-[#0076FF] p-3 rounded-lg flex-shrink-0">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">Phone</h3>
                      <a href="tel:+923001479350" className="text-[#0076FF] hover:text-[#0066e6] transition-colors text-lg font-semibold">
                        +92 300 1479350
                      </a>
                      <p className="text-gray-400 text-sm mt-1">Call during office hours</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-[#0076FF] p-3 rounded-lg flex-shrink-0">
                      <Building2 className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-2">Office Location</h3>
                      <p className="text-gray-300 leading-relaxed">
                        <span className="font-medium">Interlace Plaza, 3rd Floor</span><br />
                        I-8 Markaz, Islamabad<br />
                        Pakistan
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* WhatsApp Support Card */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-[#0076FF] rounded-2xl opacity-20 group-hover:opacity-30 blur transition-all duration-300"></div>
                <div className="relative bg-gradient-to-br from-[#0076FF]/20 to-[#0076FF]/10 backdrop-blur-sm border border-[#0076FF]/50 rounded-2xl p-6 sm:p-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="bg-[#0076FF] p-2 rounded-lg">
                      <MessageCircle className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">Need Instant Help?</h3>
                  </div>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    Chat with our support team on WhatsApp for immediate assistance with your trading questions.
                  </p>
                  <button
                    onClick={handleWhatsAppSupport}
                    className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white py-4 rounded-lg hover:from-green-700 hover:to-green-600 transition-all font-bold text-base flex items-center justify-center space-x-2 shadow-lg hover:shadow-green-500/50 transform hover:scale-105 duration-200"
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span>Chat on WhatsApp</span>
                  </button>
                </div>
              </div>

              {/* Office Hours & Classes Card */}
              <div className="bg-gradient-to-br from-[#0076FF]/20 to-[#0076FF]/10 backdrop-blur-sm border border-[#0076FF]/30 rounded-2xl p-6 sm:p-8">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-[#0076FF]" />
                  Office Hours & Schedule
                </h3>
                
                {/* Office Timing */}
                <div className="mb-6 pb-6 border-b border-[#0076FF]/30">
                  <div className="flex items-center space-x-2 mb-3">
                    <Building2 className="h-5 w-5 text-[#0076FF]" />
                    <h4 className="text-white font-semibold">Office Timing</h4>
                  </div>
                  <div className="space-y-2 ml-7">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Every Day</span>
                      <span className="text-white font-semibold">11:00 AM - 9:00 PM</span>
                    </div>
                    <p className="text-[#0076FF] text-sm font-medium">
                      📍 Walk-ins Welcome
                    </p>
                  </div>
                </div>

                {/* Classes Schedule */}
                <div className="mb-6 pb-6 border-b border-[#0076FF]/30">
                  <div className="flex items-center space-x-2 mb-3">
                    <Users className="h-5 w-5 text-[#0076FF]" />
                    <h4 className="text-white font-semibold">Classes Schedule</h4>
                  </div>
                  <div className="space-y-2 ml-7">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Weekend Only</span>
                      <span className="text-[#0076FF] font-semibold">Saturday & Sunday</span>
                    </div>
                    <p className="text-gray-400 text-sm">
                      Special weekend batches for working professionals
                    </p>
                  </div>
                </div>

                {/* 24/7 Support */}
                <div className="bg-[#0076FF]/10 border border-[#0076FF]/30 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <MessageCircle className="h-5 w-5 text-[#0076FF] mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-[#0076FF] font-semibold mb-1">24/7 WhatsApp Support</p>
                      <p className="text-gray-400 text-sm">
                        Get instant answers to your queries anytime, anywhere
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Location Section */}
      <div className="bg-gradient-to-br from-[#1a2332] via-black to-[#1a2332] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-block px-5 py-2 bg-[#0076FF]/30 backdrop-blur-sm border border-[#0076FF]/30 rounded-full text-[#0076FF] text-sm font-semibold mb-6 tracking-wide">
              VISIT OUR OFFICE
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
              Find Us at <span className="text-[#0076FF]">Interlace Plaza</span>
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              Located in the heart of Islamabad's business district, our office is easily accessible and equipped with modern facilities
            </p>
          </div>

          {/* Quick Actions */}
          <div className="text-center">
            <div className="bg-[#0076FF]/10 border border-[#0076FF]/30 rounded-2xl p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">Need Immediate Assistance?</h3>
              <p className="text-gray-300 mb-6">
                For the fastest response, contact us via WhatsApp. We're always here to help with your trading journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleWhatsAppSupport}
                  className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all font-semibold flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>Chat on WhatsApp</span>
                </button>
                <a
                  href="tel:+923001479350"
                  className="px-6 py-3 bg-[#0076FF] text-white rounded-xl hover:bg-[#0066e6] transition-all font-semibold flex items-center justify-center space-x-2"
                >
                  <Phone className="h-5 w-5" />
                  <span>Call Now</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ContactPage;

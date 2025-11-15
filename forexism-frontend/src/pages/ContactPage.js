import React from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, Loader2, Globe, Clock, Calendar, Building2, Users } from 'lucide-react';

const ContactPage = ({ 
  contactForm, 
  setContactForm, 
  contactErrors, 
  handleContactSubmit, 
  loading,
  handleWhatsAppSupport 
}) => {
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

      {/* Location Section - Moved to End */}
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

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Location Details */}
            <div className="space-y-6">
              {/* Address Card */}
              <div className="bg-gradient-to-br from-[#0076FF]/20 to-[#0076FF]/10 backdrop-blur-sm border border-[#0076FF]/30 rounded-2xl p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-[#0076FF] p-3 rounded-xl">
                    <MapPin className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Our Address</h3>
                </div>
                <div className="space-y-4">
                  <div className="bg-[#0076FF]/10 border border-[#0076FF]/20 rounded-xl p-4">
                    <p className="text-white text-lg font-semibold mb-2">Interlace Plaza</p>
                    <p className="text-gray-300">3rd Floor, I-8 Markaz</p>
                    <p className="text-gray-400 text-sm">Islamabad, Pakistan</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#0076FF]/10 border border-[#0076FF]/20 rounded-lg p-3 text-center">
                      <Clock className="h-5 w-5 text-[#0076FF] mx-auto mb-2" />
                      <div className="text-white font-semibold text-sm">Office Hours</div>
                      <div className="text-gray-300 text-xs">11AM - 9PM</div>
                    </div>
                    <div className="bg-[#0076FF]/10 border border-[#0076FF]/20 rounded-lg p-3 text-center">
                      <Calendar className="h-5 w-5 text-[#0076FF] mx-auto mb-2" />
                      <div className="text-white font-semibold text-sm">Classes</div>
                      <div className="text-gray-300 text-xs">Weekends</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features Card */}
              <div className="bg-gradient-to-br from-[#0076FF]/20 to-[#0076FF]/10 backdrop-blur-sm border border-[#0076FF]/30 rounded-2xl p-8">
                <h3 className="text-xl font-bold text-white mb-6">Office Features</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-[#0076FF] w-2 h-2 rounded-full"></div>
                    <span className="text-gray-300">Modern Trading Setup</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-[#0076FF] w-2 h-2 rounded-full"></div>
                    <span className="text-gray-300">High-Speed Internet</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-[#0076FF] w-2 h-2 rounded-full"></div>
                    <span className="text-gray-300">Comfortable Learning Environment</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-[#0076FF] w-2 h-2 rounded-full"></div>
                    <span className="text-gray-300">One-on-One Mentorship</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-[#0076FF] w-2 h-2 rounded-full"></div>
                    <span className="text-gray-300">Parking Available</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Map */}
            <div className="lg:col-span-2">
              <div className="relative group">
                <div className="absolute -inset-1 bg-[#0076FF] rounded-3xl opacity-20 group-hover:opacity-30 blur-xl transition-all duration-500"></div>
                <div className="relative bg-gradient-to-br from-[#0076FF]/20 to-[#0076FF]/10 backdrop-blur-sm border border-[#0076FF]/30 rounded-3xl p-1 overflow-hidden">
                  <div className="relative h-96 lg:h-[500px] w-full rounded-2xl overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3321.415110954287!2d73.08931457535213!3d33.64242473932215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38df95b0e7454c2d%3A0x1dc5b4c8b0c3e2a!2sInterlace%20Plaza%2C%20I-8%20Markaz%2C%20Islamabad%2C%20Islamabad%20Capital%20Territory%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                      width="100%"
                      height="100%"
                      style={{ border: 0, filter: 'contrast(1.1) saturate(1.2)' }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Forexism Office Location - Interlace Plaza Islamabad"
                      className="rounded-2xl"
                    />
                    <div className="absolute top-6 left-6 bg-black/90 backdrop-blur-sm text-white px-4 py-3 rounded-xl border border-[#0076FF]/30 shadow-2xl">
                      <div className="flex items-center space-x-3">
                        <div className="bg-[#0076FF] p-2 rounded-lg">
                          <MapPin className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <div className="text-white font-bold text-sm">Forexism Office</div>
                          <div className="text-gray-300 text-xs">Interlace Plaza, I-8 Markaz</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Map Controls Overlay */}
                    <div className="absolute bottom-6 right-6 flex space-x-3">
                      <div className="bg-black/80 backdrop-blur-sm text-white px-3 py-2 rounded-lg border border-[#0076FF]/30 text-sm">
                        🗺️ View Larger Map
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <a
                  href="https://maps.google.com/?q=Interlace+Plaza+I-8+Markaz+Islamabad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#0076FF] text-white py-3 rounded-xl hover:bg-[#0066e6] transition-all font-semibold text-center flex items-center justify-center space-x-2"
                >
                  <MapPin className="h-4 w-4" />
                  <span>Open in Maps</span>
                </a>
                <button
                  onClick={handleWhatsAppSupport}
                  className="bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition-all font-semibold text-center flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Get Directions</span>
                </button>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="text-center">
            <div className="bg-[#0076FF]/10 border border-[#0076FF]/30 rounded-2xl p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">Planning to Visit?</h3>
              <p className="text-gray-300 mb-6">
                We recommend scheduling an appointment before visiting to ensure we can give you our undivided attention. 
                Use WhatsApp to coordinate your visit timing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleWhatsAppSupport}
                  className="px-6 py-3 bg-[#0076FF] text-white rounded-xl hover:bg-[#0066e6] transition-all font-semibold flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>Schedule via WhatsApp</span>
                </button>
                <a
                  href="tel:+923001479350"
                  className="px-6 py-3 bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition-all font-semibold flex items-center justify-center space-x-2"
                >
                  <Phone className="h-5 w-5" />
                  <span>Call for Directions</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
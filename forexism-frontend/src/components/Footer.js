import React from 'react';
import { TrendingUp, Facebook, Linkedin, Instagram, MessageCircle, Mail, Youtube, Twitter } from 'lucide-react';

const Footer = ({ setCurrentPage, handleWhatsAppSupport }) => {
  const socialLinks = {
    linkedin: 'https://www.linkedin.com/company/forexism/about/',
    youtube: 'https://youtu.be/cmSAr4o3F30?si=kAPOKKpUzqCWPyqj',
    twitter: 'https://x.com/ForexismCo?t=rAl2lmeWE5ab7e4bxSYoMg&s=09',
    facebook: 'https://www.facebook.com/profile.php?id=61579749771738&mibextid=ZbWKwL',
    tiktok: 'https://www.tiktok.com/@forexism786?_t=ZS-90XXXSKDjkX&_r=1',
    instagram: 'https://www.instagram.com/for.exism?igsh=MWZiZzM3aWZvZnl3eQ==',
    whatsapp: 'https://wa.me/923001479350',
    discord: 'https://discord.gg/bykPBVjVu'
  };

  const handleFAQClick = () => {
    setCurrentPage('home');
    setTimeout(() => {
      const faqSection = document.getElementById('faq-section');
      if (faqSection) {
        faqSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);
  };

  return (
    <footer className="bg-gradient-to-r from-[#1a2332] via-[#1e2b3d] to-[#1a2332] text-white border-t border-[#0076FF]/30">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-4 mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-[#0076FF]/20 rounded-2xl blur-xl"></div>
                <img 
                  src="/Images/forexism-icon.ico" 
                  alt="Forexism Logo" 
                  className="h-16 w-16 object-contain relative z-10"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className="bg-gradient-to-br from-[#0076FF] to-[#0056CC] p-2 rounded-lg" style={{ display: 'none' }}>
                  <TrendingUp className="h-6 w-6" />
                </div>
              </div>
              <span className="text-3xl font-black bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent tracking-tight">Forexism</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Master forex trading with expert guidance, comprehensive courses, and real-time signals.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-[#0076FF]">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => setCurrentPage('home')} 
                  className="text-white hover:text-[#0076FF] transition-colors duration-300"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('courses')} 
                  className="text-white hover:text-[#0076FF] transition-colors duration-300"
                >
                  Courses
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('blog')} 
                  className="text-white hover:text-[#0076FF] transition-colors duration-300"
                >
                  Blog
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('propfirm')} 
                  className="text-white hover:text-[#0076FF] transition-colors duration-300"
                >
                  PropFirm
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('about')} 
                  className="text-white hover:text-[#0076FF] transition-colors duration-300"
                >
                  About Us
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-[#0076FF]">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => setCurrentPage('contact')} 
                  className="text-white hover:text-[#0076FF] transition-colors duration-300"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button 
                  onClick={handleWhatsAppSupport}
                  className="text-white hover:text-[#0076FF] transition-colors duration-300 flex items-center space-x-1"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>WhatsApp Support</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={handleFAQClick}
                  className="text-white hover:text-[#0076FF] transition-colors duration-300"
                >
                  FAQ
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('privacy')}
                  className="text-white hover:text-[#0076FF] transition-colors duration-300"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setCurrentPage('privacy')}
                  className="text-white hover:text-[#0076FF] transition-colors duration-300"
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-[#0076FF]">Connect With Us</h3>
            <div className="grid grid-cols-4 gap-3 mb-4">
              <a 
                href={socialLinks.facebook}
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#0076FF]/10 p-3 rounded-lg hover:bg-blue-600 transition-all duration-300 flex items-center justify-center border border-[#0076FF]/20 hover:scale-105 transform"
                title="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href={socialLinks.instagram}
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#0076FF]/10 p-3 rounded-lg hover:bg-pink-600 transition-all duration-300 flex items-center justify-center border border-[#0076FF]/20 hover:scale-105 transform"
                title="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href={socialLinks.linkedin}
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#0076FF]/10 p-3 rounded-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center border border-[#0076FF]/20 hover:scale-105 transform"
                title="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href={socialLinks.youtube}
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#0076FF]/10 p-3 rounded-lg hover:bg-red-600 transition-all duration-300 flex items-center justify-center border border-[#0076FF]/20 hover:scale-105 transform"
                title="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a 
                href={socialLinks.twitter}
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#0076FF]/10 p-3 rounded-lg hover:bg-blue-500 transition-all duration-300 flex items-center justify-center border border-[#0076FF]/20 hover:scale-105 transform"
                title="X (Twitter)"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href={socialLinks.tiktok}
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#0076FF]/10 p-3 rounded-lg hover:bg-black transition-all duration-300 flex items-center justify-center border border-[#0076FF]/20 hover:scale-105 transform"
                title="TikTok"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
              <a 
                href={socialLinks.discord}
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#0076FF]/10 p-3 rounded-lg hover:bg-purple-600 transition-all duration-300 flex items-center justify-center border border-[#0076FF]/20 hover:scale-105 transform"
                title="Discord"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02C2.44 8.78 1.57 12.23 2.04 15.64c0 .02.01.04.03.05c1.57 1.15 3.09 1.84 4.57 2.31c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.48-.47 2.99-1.15 4.56-2.32c.02-.01.03-.03.03-.05c.54-3.73-.73-7.14-3.3-10.3c-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12z"/>
                </svg>
              </a>
              <a 
                href={socialLinks.whatsapp}
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#0076FF]/10 p-3 rounded-lg hover:bg-green-600 transition-all duration-300 flex items-center justify-center border border-[#0076FF]/20 hover:scale-105 transform"
                title="WhatsApp"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
            <p className="text-white text-sm flex items-center mb-2">
              <Mail className="h-4 w-4 mr-2 text-[#0076FF]" />
              <a href="mailto:support@forexism.com" className="text-white hover:text-[#0076FF] transition-colors duration-300">
                support@forexism.co
              </a>
            </p>
            <p className="text-white text-sm flex items-center">
              <MessageCircle className="h-4 w-4 mr-2 text-[#0076FF]" />
              <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#0076FF] transition-colors duration-300">
                +92 300 1479350
              </a>
            </p>
          </div>
        </div>

        <div className="border-t border-[#0076FF]/30 mt-8 pt-8 text-center text-white text-sm">
          <p>&copy; 2025 Forexism. All rights reserved. Made with passion for traders worldwide.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import React from 'react';
import { Menu, X, LogOut, User, Shield, Crown, Star } from 'lucide-react';

const Navigation = ({ 
  currentPage, 
  setCurrentPage, 
  mobileMenuOpen, 
  setMobileMenuOpen,
  isAuthenticated,
  userProfile,
  setShowAuthModal,
  setAuthMode,
  handleLogout,
  handleAdminAccess,
  isAdminAuthenticated
}) => {
  
  const NavLink = ({ page, label, mobile = false }) => (
    <button
      onClick={() => {
        setCurrentPage(page);
        setMobileMenuOpen(false);
      }}
      className={`
        ${mobile 
          ? 'block w-full text-left px-6 py-3.5 hover:bg-gradient-to-r hover:from-[#0076FF]/20 hover:to-[#0056CC]/20 rounded-xl transition-all duration-300' 
          : 'relative px-4 py-2 group'
        }
        font-medium text-[15px] tracking-wide transition-all duration-300
        ${currentPage === page 
          ? mobile 
            ? 'text-[#0076FF] bg-[#0076FF]/10' 
            : 'text-[#0076FF]' 
          : 'text-white hover:text-[#0076FF]'
        }
      `}
    >
      <span className="relative">
        {label}
        {!mobile && (
          <span className={`absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-[#0076FF] to-[#0056CC] transition-all duration-300 ${
            currentPage === page ? 'w-full' : 'w-0 group-hover:w-full'
          }`}></span>
        )}
      </span>
    </button>
  );

  const getUserStatus = () => {
    if (!userProfile?.membership) return 'Member';
    return userProfile.membership === 'premium' ? 'Premium' : 'Member';
  };

  const getStatusIcon = () => {
    if (!userProfile?.membership) return <Star className="h-3 w-3" />;
    return userProfile.membership === 'premium' ? 
      <Crown className="h-3 w-3 fill-amber-400 text-amber-400" /> : 
      <Star className="h-3 w-3" />;
  };

  const getStatusStyle = () => {
    if (!userProfile?.membership) return 'from-gray-600 to-gray-700 text-gray-300';
    return userProfile.membership === 'premium' ? 
      'from-amber-500 to-amber-600 text-white' : 
      'from-[#0076FF] to-[#0056CC] text-white';
  };

  // STRICT Admin Detection Logic - Only show for authenticated admin users
  const isAdmin = isAuthenticated && (
    userProfile?.role === 'admin' || 
    userProfile?.isAdmin === true || 
    userProfile?.email?.includes('admin') ||
    isAdminAuthenticated === true
  );

  return (
    <nav className="bg-gradient-to-r from-[#1a2332] via-[#1e2b3d] to-[#1a2332] backdrop-blur-xl text-white sticky top-0 z-50 shadow-2xl border-b border-[#0076FF]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <div 
            className="flex items-center space-x-4 cursor-pointer group flex-shrink-0"
            onClick={() => setCurrentPage('home')}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-[#0076FF]/20 rounded-2xl blur-2xl group-hover:bg-[#0076FF]/30 transition-all duration-300"></div>
              <img 
                src="/Images/forexism-icon.ico" 
                alt="Forexism Logo" 
                className="h-20 w-20 object-contain relative z-10 group-hover:scale-110 transition-transform duration-300 drop-shadow-2xl"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='%230076FF'/%3E%3Ctext x='50' y='60' font-size='40' fill='white' text-anchor='middle' font-weight='bold'%3EF%3C/text%3E%3C/svg%3E";
                }}
              />
            </div>
            <span className="text-3xl font-black bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent tracking-tight">
              Forexism
            </span>
          </div>
          
          {/* Desktop Navigation - Centered */}
          <div className="hidden lg:flex items-center justify-center flex-1 space-x-1">
            <NavLink page="home" label="Home" />
            <NavLink page="blog" label="Blog" />
            <NavLink page="courses" label="Courses" />
            <NavLink page="propfirm" label="PropFirm" />
            <NavLink page="about" label="About" />
            <NavLink page="contact" label="Contact" />
          </div>

          {/* Right Section - Auth + Admin */}
          <div className="hidden lg:flex items-center space-x-3 flex-shrink-0">
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                {/* ADMIN BUTTON - Only show when user is authenticated AND admin */}
                {isAdmin && (
                  <button
                    onClick={handleAdminAccess}
                    className="relative px-4 py-2 bg-gradient-to-r from-[#0076FF]/20 to-[#0056CC]/20 hover:from-[#0076FF]/30 hover:to-[#0056CC]/30 border border-[#0076FF]/30 hover:border-[#0076FF]/50 rounded-lg transition-all duration-300 group"
                    title="Admin Panel"
                  >
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-[#0076FF] group-hover:text-[#0076FF] transition-colors" />
                      <span className="text-sm font-semibold text-[#0076FF] group-hover:text-[#0076FF] transition-colors">
                        Admin
                      </span>
                    </div>
                  </button>
                )}
                
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-3 bg-gradient-to-r from-[#0f1f3a] to-[#0a1628] px-4 py-1.5 rounded-xl border border-[#0076FF]/20 backdrop-blur-sm shadow-lg hover:shadow-[#0076FF]/20 transition-all duration-300 min-w-[140px]">
                    <div className="relative">
                      <div className="w-7 h-7 bg-gradient-to-br from-[#0076FF] to-[#0056CC] rounded-full flex items-center justify-center shadow-lg ring-1 ring-[#0076FF]/30">
                        <User className="h-3 w-3 text-white" />
                      </div>
                      <div className="absolute -bottom-0.5 -right-0.5">
                        <div className={`bg-gradient-to-r ${getStatusStyle()} rounded-full p-0.5 shadow-lg border border-white/20`}>
                          {getStatusIcon()}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="text-xs font-semibold text-white truncate max-w-20">
                        {userProfile?.name || 'User'}
                      </span>
                      <div className={`text-[10px] font-medium bg-gradient-to-r ${getStatusStyle()} bg-clip-text text-transparent`}>
                        {getUserStatus()}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center p-2 bg-gradient-to-r from-[#0f1f3a] to-[#0a1628] hover:from-red-600 hover:to-red-700 border border-[#0076FF]/20 hover:border-red-500/70 rounded-xl transition-all duration-300 hover:scale-105 group shadow-lg"
                    title="Sign Out"
                  >
                    <LogOut className="h-3.5 w-3.5 text-gray-300 group-hover:text-white transition-colors" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                {/* REMOVED Admin button for non-authenticated users */}
                <button
                  onClick={() => { setShowAuthModal(true); setAuthMode('login'); }}
                  className="px-5 py-2 text-white hover:text-[#0076FF] transition-all duration-300 text-sm font-semibold border border-white/10 rounded-lg hover:border-[#0076FF]/50 hover:bg-[#0076FF]/10"
                >
                  Login
                </button>
                <button
                  onClick={() => { setShowAuthModal(true); setAuthMode('signup'); }}
                  className="px-5 py-2 bg-gradient-to-r from-[#0076FF] to-[#0056CC] hover:from-[#0056CC] hover:to-[#0076FF] rounded-lg transition-all duration-300 text-sm font-semibold shadow-lg shadow-[#0076FF]/30 hover:shadow-[#0076FF]/50 hover:scale-105 border border-[#0076FF]/30"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2.5 hover:bg-[#0076FF]/20 rounded-xl transition-all duration-300 border border-white/5"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-4 space-y-1 border-t border-white/10 mt-2 pt-4 animate-fade-in">
            <NavLink page="home" label="Home" mobile />
            <NavLink page="blog" label="Blog" mobile />
            <NavLink page="courses" label="Courses" mobile />
            <NavLink page="propfirm" label="PropFirm" mobile />
            <NavLink page="about" label="About" mobile />
            <NavLink page="contact" label="Contact" mobile />
            
            {/* ADMIN BUTTON - Only show for admin users */}
            {isAdmin && (
              <button
                onClick={() => {
                  handleAdminAccess();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center space-x-3 px-6 py-3.5 bg-gradient-to-r from-[#0076FF]/20 to-[#0056CC]/20 hover:from-[#0076FF]/30 hover:to-[#0056CC]/30 border border-[#0076FF]/30 rounded-xl transition-all duration-300"
              >
                <Shield className="h-5 w-5 text-[#0076FF]" />
                <span className="font-medium text-[15px] text-[#0076FF]">Admin Panel</span>
              </button>
            )}
            
            <div className="px-4 pt-4 space-y-3 border-t border-white/10 mt-4">
              {isAuthenticated ? (
                <>
                  <div className="bg-gradient-to-r from-[#0f1f3a] to-[#0a1628] px-4 py-2.5 rounded-xl border border-[#0076FF]/20 backdrop-blur-sm shadow-lg">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="w-8 h-8 bg-gradient-to-br from-[#0076FF] to-[#0056CC] rounded-full flex items-center justify-center shadow-lg ring-1 ring-[#0076FF]/30">
                          <User className="h-3.5 w-3.5 text-white" />
                        </div>
                        <div className="absolute -bottom-0.5 -right-0.5">
                          <div className={`bg-gradient-to-r ${getStatusStyle()} rounded-full p-0.5 shadow-lg border border-white/20`}>
                            {getStatusIcon()}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col min-w-0 flex-1">
                        <span className="text-sm font-semibold text-white truncate">
                          {userProfile?.name || 'User'}
                        </span>
                        <div className={`text-xs font-medium bg-gradient-to-r ${getStatusStyle()} bg-clip-text text-transparent`}>
                          {getUserStatus()}
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-[#0f1f3a] to-[#0a1628] hover:from-red-600 hover:to-red-700 border border-[#0076FF]/20 rounded-xl transition-all text-sm font-semibold group"
                  >
                    <LogOut className="h-4 w-4 text-gray-300 group-hover:text-white transition-colors" />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => { 
                      setShowAuthModal(true); 
                      setAuthMode('login');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full px-6 py-3.5 border border-[#0076FF]/50 text-white hover:bg-[#0076FF]/10 rounded-xl transition-all text-sm font-semibold"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => { 
                      setShowAuthModal(true); 
                      setAuthMode('signup');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full px-6 py-3.5 bg-gradient-to-r from-[#0076FF] to-[#0056CC] hover:from-[#0056CC] hover:to-[#0076FF] rounded-xl transition-all text-sm font-semibold shadow-lg shadow-[#0076FF]/30"
                  >
                    Get Started
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
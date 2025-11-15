import React, { useState, useEffect } from 'react';
import { 
  X, AlertCircle, Lock, Mail, Eye, EyeOff, Shield, 
  CheckCircle, Clock, User, Key, Loader2 
} from 'lucide-react';

const AdminLogin = ({
  setIsAdminAuthenticated,
  setCurrentPage,
  setShowAdminLogin,
  userProfile,
  onLoginSuccess
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [forgotPasswordMode, setForgotPasswordMode] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [lockoutTime, setLockoutTime] = useState(null);
  const [loginSuccess, setLoginSuccess] = useState(false);

  // Check for existing lockout on component mount
  useEffect(() => {
    const savedLockout = localStorage.getItem('adminLockoutTime');
    const savedAttempts = localStorage.getItem('adminAttempts');

    if (savedLockout) {
      const lockoutEnd = parseInt(savedLockout);
      if (Date.now() < lockoutEnd) {
        setLockoutTime(lockoutEnd);
      } else {
        localStorage.removeItem('adminLockoutTime');
        localStorage.removeItem('adminAttempts');
      }
    }

    if (savedAttempts) {
      setAttempts(parseInt(savedAttempts));
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Check if account is locked
    if (lockoutTime && Date.now() < lockoutTime) {
      const remainingTime = Math.ceil((lockoutTime - Date.now()) / 1000 / 60);
      setError(`Account temporarily locked. Try again in ${remainingTime} minutes.`);
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      // Use real backend API for authentication
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim(), password: password.trim() }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Check if user is actually an admin
        if (data.user && data.user.isAdmin) {
          // Reset attempts on successful login
          setAttempts(0);
          localStorage.removeItem('adminAttempts');
          localStorage.removeItem('adminLockoutTime');

          // Store token and admin info
          localStorage.setItem('token', data.token);
          localStorage.setItem('adminAuth', 'true');
          localStorage.setItem('adminAuthTime', Date.now().toString());
          localStorage.setItem('adminUser', JSON.stringify(data.user));
          
          setIsAdminAuthenticated(true);
          setLoginSuccess(true);

          // Show success for 1.5 seconds then redirect to admin dashboard
          setTimeout(() => {
            if (onLoginSuccess) {
              onLoginSuccess();
            } else {
              setCurrentPage('admin');
              setShowAdminLogin(false);
            }
          }, 1500);
        } else {
          // User is authenticated but not admin
          setError('Access denied. Administrator privileges required.');
          const newAttempts = attempts + 1;
          setAttempts(newAttempts);
          localStorage.setItem('adminAttempts', newAttempts.toString());
        }
      } else {
        // Authentication failed
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);
        localStorage.setItem('adminAttempts', newAttempts.toString());

        if (newAttempts >= 5) {
          // Lock account for 30 minutes
          const lockoutDuration = 30 * 60 * 1000;
          const lockoutEndTime = Date.now() + lockoutDuration;
          setLockoutTime(lockoutEndTime);
          localStorage.setItem('adminLockoutTime', lockoutEndTime.toString());
          setError('Too many failed attempts. Account locked for 30 minutes.');
        } else {
          setError(data.message || `Invalid credentials. ${5 - newAttempts} attempts remaining.`);
        }
      }
    } catch (error) {
      console.error('Admin login error:', error);
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      if (email && email.includes('@')) {
        setResetEmailSent(true);
        setError('');
      } else {
        setError('Please enter a valid email address');
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleClose = () => {
    setShowAdminLogin(false);
    setError('');
    setEmail('');
    setPassword('');
    setForgotPasswordMode(false);
    setResetEmailSent(false);
  };

  const resetToLogin = () => {
    setForgotPasswordMode(false);
    setResetEmailSent(false);
    setError('');
    setEmail('');
  };

  // Calculate remaining lockout time
  const getRemainingLockoutTime = () => {
    if (!lockoutTime) return 0;
    return Math.ceil((lockoutTime - Date.now()) / 1000 / 60);
  };

  const remainingTime = getRemainingLockoutTime();

  // Format email for display
  const formatEmail = (email) => {
    const [name, domain] = email.split('@');
    return `${name.substring(0, 3)}***@${domain}`;
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4" style={{
      background: 'linear-gradient(135deg, #1a2332 0%, #1e2b3d 50%, #0f172a 100%)',
      overflowY: 'auto'
    }}>
      {/* Main Container */}
      <div className="w-full max-w-[440px] my-auto relative z-[100000]">
        {/* Error Message */}
        {error && (
          <div className={`mb-4 rounded-xl p-4 animate-shake shadow-2xl ${
            error.includes('locked') ? 'bg-amber-500' : 'bg-red-500'
          }`}>
            <div className="flex items-center space-x-3">
              {error.includes('locked') ? (
                <Clock className="h-5 w-5 text-white flex-shrink-0" />
              ) : (
                <AlertCircle className="h-5 w-5 text-white flex-shrink-0" />
              )}
              <p className="text-white font-semibold text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Success Message */}
        {resetEmailSent && (
          <div className="mb-4 bg-green-500 rounded-xl p-4 shadow-2xl">
            <div className="flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-white flex-shrink-0" />
              <p className="text-white font-semibold text-sm">Password reset link sent to admin email!</p>
            </div>
          </div>
        )}

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden relative">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-50 text-white/80 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full p-2 backdrop-blur-sm"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Header */}
          <div className="px-6 pt-8 pb-6 text-center relative" style={{
            background: 'linear-gradient(135deg, #1a2332 0%, #2563eb 100%)'
          }}>
            {/* Shield Icon */}
            <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-white/20">
              <Shield className="h-8 w-8 text-white" />
            </div>

            <h1 className="text-2xl font-black text-white mb-2">
              {loginSuccess ? 'Access Granted!' :
               forgotPasswordMode ? 'Reset Password' :
               'Admin Portal'}
            </h1>
            <p className="text-blue-100 text-sm">
              {loginSuccess ? 'Redirecting to dashboard...' :
               forgotPasswordMode ? 'Enter your admin email to reset password' :
               'Secure Admin Dashboard Access'}
            </p>
          </div>

          {/* Security Warning */}
          {!forgotPasswordMode && !resetEmailSent && !loginSuccess && (
            <div className="bg-amber-50 border-b border-amber-200 px-4 py-3">
              <div className="flex items-center space-x-2">
                <Key className="h-4 w-4 text-amber-600" />
                <p className="text-amber-800 text-xs font-semibold">Restricted Access Area</p>
              </div>
              <p className="text-amber-700 text-[10px] mt-1">
                Authorized personnel only. All activities are logged.
              </p>
            </div>
          )}

          {/* Form Section */}
          <div className="p-6">
            {loginSuccess ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Welcome Back!</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Admin access granted. Redirecting to dashboard...
                </p>
                <div className="flex justify-center">
                  <Loader2 className="h-6 w-6 text-blue-600 animate-spin" />
                </div>
              </div>
            ) : !resetEmailSent ? (
              <form onSubmit={forgotPasswordMode ? handleForgotPassword : handleLogin} className="space-y-5">
                {/* Email Field */}
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    {forgotPasswordMode ? 'Admin Email' : 'Admin Email Address'}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError('');
                      }}
                      className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="admin@forexism.com"
                      autoComplete="email"
                      disabled={!!lockoutTime && Date.now() < lockoutTime}
                    />
                  </div>
                </div>

                {/* Password Field */}
                {!forgotPasswordMode && (
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Admin Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          setError('');
                        }}
                        className="w-full pl-11 pr-11 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Enter admin password"
                        autoComplete="current-password"
                        disabled={!!lockoutTime && Date.now() < lockoutTime}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
                        disabled={!!lockoutTime && Date.now() < lockoutTime}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                )}

                {/* Security Indicators */}
                {!forgotPasswordMode && attempts > 0 && (
                  <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
                    <div className="flex justify-between items-center text-sm mb-2">
                      <span className="text-gray-700 font-semibold">Security Level:</span>
                      <span className={`font-bold ${
                        attempts >= 4 ? 'text-red-600' :
                        attempts >= 2 ? 'text-amber-600' : 'text-green-600'
                      }`}>
                        {attempts >= 4 ? 'High Alert' : attempts >= 2 ? 'Warning' : 'Secure'}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          attempts >= 4 ? 'bg-red-500 w-full' :
                          attempts >= 2 ? 'bg-amber-500 w-2/3' : 'bg-green-500 w-1/3'
                        }`}
                      ></div>
                    </div>
                    <p className="text-gray-600 text-xs mt-2">
                      {5 - attempts} attempts remaining before lockout
                    </p>
                  </div>
                )}

                {/* Forgot Password Link */}
                {!forgotPasswordMode && (
                  <div className="text-right pt-2">
                    <button
                      type="button"
                      onClick={() => setForgotPasswordMode(true)}
                      className="text-blue-600 hover:text-blue-700 text-sm font-semibold transition-colors flex items-center space-x-1 ml-auto w-fit"
                      disabled={!!lockoutTime && Date.now() < lockoutTime}
                    >
                      <Key className="h-3 w-3" />
                      <span>Forgot Password?</span>
                    </button>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading || (!!lockoutTime && Date.now() < lockoutTime)}
                  className="w-full text-white font-bold py-4 rounded-xl text-sm transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group"   
                  style={{
                    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)'
                  }}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <Loader2 className="h-4 w-4 text-white animate-spin" />
                      <span>{forgotPasswordMode ? 'Sending...' : 'Authenticating...'}</span>
                    </div>
                  ) : lockoutTime && Date.now() < lockoutTime ? (
                    <div className="flex items-center justify-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>Locked ({remainingTime}m)</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <Shield className="h-4 w-4" />
                      <span>{forgotPasswordMode ? 'Send Reset Link' : 'Access Dashboard'}</span>
                    </div>
                  )}

                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                </button>

                {/* Back to Login */}
                {forgotPasswordMode && (
                  <div className="text-center pt-4">
                    <button
                      type="button"
                      onClick={resetToLogin}
                      className="text-gray-600 hover:text-gray-800 text-sm font-semibold transition-colors flex items-center space-x-1 justify-center"
                    >
                      <X className="h-3 w-3" />
                      <span>Back to Login</span>
                    </button>
                  </div>
                )}

                {/* Contact Support */}
                {!forgotPasswordMode && (
                  <div className="text-center pt-4 border-t border-gray-200">
                    <button
                      type="button"
                      className="text-gray-500 hover:text-gray-700 text-xs transition-colors"
                      onClick={() => alert('Admin Support:\n\nEmail: admin-support@forexism.com\nPhone: +1-555-ADMIN-HELP\n\nAvailable 24/7 for critical issues')}
                    >
                      Need admin support?
                    </button>
                  </div>
                )}
              </form>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Check Admin Email</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Password reset instructions sent to: <br />
                  <strong>{formatEmail(email)}</strong>
                </p>
                <p className="text-gray-500 text-xs mb-6">
                  This email contains sensitive admin access information.
                </p>
                <button
                  onClick={resetToLogin}
                  className="w-full text-white font-bold py-3 rounded-xl text-sm transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                  style={{
                    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)'
                  }}
                >
                  Back to Admin Login
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Demo Credentials & Security Info */}
        {!forgotPasswordMode && !resetEmailSent && !loginSuccess && (
          <div className="mt-4 bg-white/5 backdrop-blur-md rounded-xl p-4 text-center border border-white/10">
            <p className="text-white/80 text-xs font-semibold mb-2">🔐 Auto-lock after 5 failed attempts • 30-minute timeout</p>
            <p className="text-white/60 text-xs">Use admin credentials with isAdmin privileges</p>
          </div>
        )}

        {/* Lockout Warning */}
        {lockoutTime && Date.now() < lockoutTime && (
          <div className="mt-4 bg-amber-500/20 backdrop-blur-md rounded-xl p-4 text-center border border-amber-500/30">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Clock className="h-4 w-4 text-amber-300" />
              <p className="text-amber-300 text-sm font-semibold">Temporary Security Lock</p>
            </div>
            <p className="text-amber-200 text-xs">
              Admin account locked for security. Try again in {remainingTime} minutes.
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-8px); }
          20%, 40%, 60%, 80% { transform: translateX(8px); }
        }
        .animate-shake {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
      `}</style>
    </div>
  );
};

export default AdminLogin;

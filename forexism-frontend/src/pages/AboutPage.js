import React from 'react';
import { Target, Users, Award, TrendingUp, BarChart3, Shield, Lightbulb, Brain, Zap, Lock } from 'lucide-react';

const AboutPage = () => {
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
              <span className="text-white">About Us</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
              About Forexism
            </h1>
            <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto">
              Empowering traders worldwide with expert strategies and cutting-edge education
            </p>
          </div>
        </div>
      </div>

      {/* Rest of the component remains exactly the same */}
      {/* Expert Section - Atif Wali */}
      <div className="relative bg-black py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0076FF]/10 to-black"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block px-5 py-2 bg-[#0076FF]/30 backdrop-blur-sm border border-[#0076FF]/30 rounded-full text-[#0076FF] text-sm font-semibold mb-4 tracking-wide">
              MEET THE VISIONARY
            </div>
            <h2 className="text-5xl lg:text-6xl font-black text-white mb-4">
              <span className="text-[#0076FF]">Atif Wali</span>
            </h2>
            <p className="text-2xl text-[#0076FF] font-semibold tracking-wide">Forex Strategist & Mentor</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            {/* Premium Profile Card */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-[#0076FF] rounded-3xl opacity-75 group-hover:opacity-100 blur-xl transition-all duration-500"></div>
              
              <div className="relative bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 border border-[#0076FF]/20 shadow-2xl">
                <div className="flex justify-center mb-8">
                  <div className="relative">
                    <div className="absolute -inset-6 bg-[#0076FF] rounded-full opacity-30 blur-2xl animate-pulse"></div>
                    <div className="relative w-80 h-80 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center shadow-2xl border-4 border-[#0076FF]/30 transform hover:scale-105 transition-transform duration-500 overflow-hidden">
                      <img 
                        src="/Images/Atif.png"
                        alt="Atif Wali - Forex Strategist" 
                        className="w-full h-full object-cover"
                        style={{ objectPosition: 'center 15%' }}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-[#0076FF] mb-4">
                    <div className="h-px bg-[#0076FF] flex-1"></div>
                    <Award className="h-6 w-6" />
                    <div className="h-px bg-[#0076FF] flex-1"></div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-[#0076FF]/20 rounded-xl p-4 border border-[#0076FF]/20">
                      <div className="text-2xl font-bold text-white mb-1">10+</div>
                      <div className="text-xs text-[#0076FF] uppercase tracking-wider">Years</div>
                    </div>
                    <div className="bg-[#0076FF]/20 rounded-xl p-4 border border-[#0076FF]/20">
                      <div className="text-2xl font-bold text-white mb-1">2.3K+</div>
                      <div className="text-xs text-[#0076FF] uppercase tracking-wider">Students</div>
                    </div>
                    <div className="bg-[#0076FF]/20 rounded-xl p-4 border border-[#0076FF]/20">
                      <div className="text-2xl font-bold text-white mb-1">95%</div>
                      <div className="text-xs text-[#0076FF] uppercase tracking-wider">Success</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Expert Bio */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="relative pl-6 border-l-4 border-[#0076FF]">
                  <p className="text-lg text-gray-300 leading-relaxed">
                    Atif Wali is a <span className="text-[#0076FF] font-semibold">professional forex trader and educator</span> with deep expertise in global markets. With a passion for educating traders on disciplined trading strategies and risk control, he has guided <span className="text-white font-semibold">hundreds towards mastering</span> the complexities of forex trading.
                  </p>
                </div>
                
                <div className="relative pl-6 border-l-4 border-[#0076FF]">
                  <p className="text-lg text-gray-300 leading-relaxed">
                    With over <span className="text-[#0076FF] font-semibold">years of trading experience</span>, Atif Wali is known for his <span className="text-white font-semibold">disciplined trading psychology, technical analysis skills</span>, and real-time mentorship programs. His insights have been featured in <span className="text-[#0076FF] font-semibold">global trading communities</span>, and he regularly conducts webinars and workshops for aspiring traders.
                  </p>
                </div>
                
                <div className="relative pl-6 border-l-4 border-[#0076FF]">
                  <p className="text-lg text-gray-300 leading-relaxed">
                    From <span className="text-white font-semibold">scalping to swing trading</span>, Atif Wali has developed systems that adapt to dynamic market conditions. His mission is to <span className="text-[#0076FF] font-semibold">empower individuals to achieve financial independence</span> through the forex market.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-6">
                <div className="bg-[#0076FF]/20 backdrop-blur-sm border border-[#0076FF]/20 rounded-xl p-5">
                  <Brain className="h-8 w-8 text-[#0076FF] mb-3" />
                  <div className="text-sm font-semibold text-white mb-1">Expert Analysis</div>
                  <div className="text-xs text-gray-400">Technical & Fundamental</div>
                </div>
                <div className="bg-[#0076FF]/20 backdrop-blur-sm border border-[#0076FF]/20 rounded-xl p-5">
                  <Zap className="h-8 w-8 text-[#0076FF] mb-3" />
                  <div className="text-sm font-semibold text-white mb-1">Real-Time Trading</div>
                  <div className="text-xs text-gray-400">Live Market Sessions</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <div className="bg-gradient-to-br from-[#1a2332] via-black to-[#1a2332] py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-block px-5 py-2 bg-[#0076FF]/30 backdrop-blur-sm border border-[#0076FF]/30 rounded-full text-[#0076FF] text-sm font-semibold mb-6 tracking-wide">
              WHO WE ARE
            </div>
            <h2 className="text-5xl lg:text-6xl font-black text-white mb-8 leading-tight">
              Your Shield Against<br />
              <span className="text-[#0076FF]">Financial Challenges</span>
            </h2>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto font-light leading-relaxed">
              Expert Strategies for Success
            </p>
          </div>

          <div className="max-w-5xl mx-auto mb-20">
            <div className="relative group">
              <div className="absolute -inset-1 bg-[#0076FF] rounded-3xl opacity-20 group-hover:opacity-30 blur-xl transition-all duration-500"></div>
              <div className="relative bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl border border-[#0076FF]/20 rounded-3xl p-12 shadow-2xl">
                <p className="text-xl text-gray-300 leading-relaxed text-center mb-8">
                  We help clients tackle financial challenges with <span className="text-[#0076FF] font-semibold">personalized strategies</span> and <span className="text-white font-semibold">expert guidance</span>, turning obstacles into opportunities for <span className="text-[#0076FF] font-semibold">sustainable growth and success</span>.
                </p>
                
                <div className="border-t border-[#0076FF]/20 pt-8">
                  <h3 className="text-2xl font-bold text-white text-center mb-4">Proven Working Process</h3>
                  <p className="text-lg text-gray-400 text-center">
                    We take the time to listen, understand, and develop a personalized plan that fits your goals.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="grid lg:grid-cols-2 gap-8 mb-20">
            <div className="relative group">
              <div className="absolute -inset-1 bg-[#0076FF] rounded-3xl opacity-20 group-hover:opacity-30 blur-xl transition-all duration-500"></div>
              <div className="relative bg-gradient-to-br from-gray-900 to-black border border-[#0076FF]/20 rounded-3xl p-10 h-full shadow-2xl transform hover:-translate-y-2 transition-all duration-500">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="bg-[#0076FF] p-4 rounded-2xl shadow-lg">
                    <Target className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-black text-white">Our Mission</h3>
                </div>
                <p className="text-gray-300 leading-relaxed text-lg">
                  To democratize forex trading education by providing world-class courses, real-time signals, and a supportive community that empowers traders of all levels to achieve consistent profitability and financial independence.
                </p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-[#0076FF] rounded-3xl opacity-20 group-hover:opacity-30 blur-xl transition-all duration-500"></div>
              <div className="relative bg-gradient-to-br from-gray-900 to-black border border-[#0076FF]/20 rounded-3xl p-10 h-full shadow-2xl transform hover:-translate-y-2 transition-all duration-500">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="bg-[#0076FF] p-4 rounded-2xl shadow-lg">
                    <TrendingUp className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-black text-white">Our Vision</h3>
                </div>
                <p className="text-gray-300 leading-relaxed text-lg">
                  To become the world's most trusted and comprehensive forex trading education platform, where every trader, regardless of their background, can learn, grow, and succeed in the global financial markets.
                </p>
              </div>
            </div>
          </div>

          {/* Premium Stats */}
          <div className="relative mb-20">
            <div className="absolute -inset-1 bg-[#0076FF] rounded-3xl opacity-30 blur-2xl"></div>
            <div className="relative bg-[#0076FF] rounded-3xl p-16 shadow-2xl">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                <div className="group">
                  <div className="text-6xl lg:text-7xl font-black text-white mb-3 group-hover:scale-110 transition-transform">2.3K+</div>
                  <div className="text-white/90 font-semibold text-lg tracking-wide">Active Students</div>
                </div>
                <div className="group">
                  <div className="text-6xl lg:text-7xl font-black text-white mb-3 group-hover:scale-110 transition-transform">15+</div>
                  <div className="text-white/90 font-semibold text-lg tracking-wide">Expert Courses</div>
                </div>
                <div className="group">
                  <div className="text-6xl lg:text-7xl font-black text-white mb-3 group-hover:scale-110 transition-transform">95%</div>
                  <div className="text-white/90 font-semibold text-lg tracking-wide">Success Rate</div>
                </div>
                <div className="group">
                  <div className="text-6xl lg:text-7xl font-black text-white mb-3 group-hover:scale-110 transition-transform">5+</div>
                  <div className="text-white/90 font-semibold text-lg tracking-wide">Years Experience</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="bg-black py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block px-5 py-2 bg-[#0076FF]/30 backdrop-blur-sm border border-[#0076FF]/30 rounded-full text-[#0076FF] text-sm font-semibold mb-6 tracking-wide">
              WHAT DRIVES US
            </div>
            <h2 className="text-5xl lg:text-6xl font-black text-white mb-6">
              Our Core <span className="text-[#0076FF]">Values</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <div className="relative group">
              <div className="absolute -inset-1 bg-[#0076FF] rounded-3xl opacity-20 group-hover:opacity-30 blur-xl transition-all duration-500"></div>
              <div className="relative bg-gradient-to-br from-gray-900 to-black border border-[#0076FF]/20 rounded-3xl p-10 h-full shadow-xl transform hover:-translate-y-2 transition-all duration-500">
                <div className="bg-[#0076FF] p-5 rounded-2xl w-fit mx-auto mb-6 shadow-lg">
                  <Users className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 text-center">Community First</h3>
                <p className="text-gray-300 leading-relaxed text-center">
                  We believe in building a strong, supportive community where traders help each other grow and succeed together.
                </p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-[#0076FF] rounded-3xl opacity-20 group-hover:opacity-30 blur-xl transition-all duration-500"></div>
              <div className="relative bg-gradient-to-br from-gray-900 to-black border border-[#0076FF]/20 rounded-3xl p-10 h-full shadow-xl transform hover:-translate-y-2 transition-all duration-500">
                <div className="bg-[#0076FF] p-5 rounded-2xl w-fit mx-auto mb-6 shadow-lg">
                  <Award className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 text-center">Excellence</h3>
                <p className="text-gray-300 leading-relaxed text-center">
                  We strive for excellence in everything we do, from course content to customer support and trading signals.
                </p>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-[#0076FF] rounded-3xl opacity-20 group-hover:opacity-30 blur-xl transition-all duration-500"></div>
              <div className="relative bg-gradient-to-br from-gray-900 to-black border border-[#0076FF]/20 rounded-3xl p-10 h-full shadow-xl transform hover:-translate-y-2 transition-all duration-500">
                <div className="bg-[#0076FF] p-5 rounded-2xl w-fit mx-auto mb-6 shadow-lg">
                  <Shield className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 text-center">Integrity</h3>
                <p className="text-gray-300 leading-relaxed text-center">
                  We operate with complete transparency and honesty, ensuring our students always get accurate and reliable information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Competitive Advantages */}
      <div className="bg-gradient-to-br from-[#1a2332] via-black to-[#1a2332] py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block px-5 py-2 bg-[#0076FF]/30 backdrop-blur-sm border border-[#0076FF]/30 rounded-full text-[#0076FF] text-sm font-semibold mb-6 tracking-wide">
              COMPETITIVE EDGE
            </div>
            <h2 className="text-5xl lg:text-6xl font-black text-white mb-6">
              What Makes Us <span className="text-[#0076FF]">Different</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-[#0076FF] rounded-2xl opacity-20 group-hover:opacity-30 blur transition-all duration-300"></div>
              <div className="relative bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-[#0076FF]/20 rounded-2xl p-8 h-full transform hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#0076FF] p-3 rounded-xl flex-shrink-0 shadow-lg">
                    <BarChart3 className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">Real-Time Market Analysis</h4>
                    <p className="text-gray-400 leading-relaxed">Live trading sessions with practical market examples</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-0.5 bg-[#0076FF] rounded-2xl opacity-20 group-hover:opacity-30 blur transition-all duration-300"></div>
              <div className="relative bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-[#0076FF]/20 rounded-2xl p-8 h-full transform hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#0076FF] p-3 rounded-xl flex-shrink-0 shadow-lg">
                    <Lightbulb className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">Proven Strategies</h4>
                    <p className="text-gray-400 leading-relaxed">VSA methodology that works across all markets</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-0.5 bg-[#0076FF] rounded-2xl opacity-20 group-hover:opacity-30 blur transition-all duration-300"></div>
              <div className="relative bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-[#0076FF]/20 rounded-2xl p-8 h-full transform hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#0076FF] p-3 rounded-xl flex-shrink-0 shadow-lg">
                    <Users className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">Lifetime Support</h4>
                    <p className="text-gray-400 leading-relaxed">24/7 community access and expert guidance</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-0.5 bg-[#0076FF] rounded-2xl opacity-20 group-hover:opacity-30 blur transition-all duration-300"></div>
              <div className="relative bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-[#0076FF]/20 rounded-2xl p-8 h-full transform hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#0076FF] p-3 rounded-xl flex-shrink-0 shadow-lg">
                    <Award className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">Comprehensive Education</h4>
                    <p className="text-gray-400 leading-relaxed">From basics to advanced PropFirm challenges</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-0.5 bg-[#0076FF] rounded-2xl opacity-20 group-hover:opacity-30 blur transition-all duration-300"></div>
              <div className="relative bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-[#0076FF]/20 rounded-2xl p-8 h-full transform hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#0076FF] p-3 rounded-xl flex-shrink-0 shadow-lg">
                    <TrendingUp className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">Continuous Updates</h4>
                    <p className="text-gray-400 leading-relaxed">Regular content updates with market changes</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-0.5 bg-[#0076FF] rounded-2xl opacity-20 group-hover:opacity-30 blur transition-all duration-300"></div>
              <div className="relative bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-sm border border-[#0076FF]/20 rounded-2xl p-8 h-full transform hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#0076FF] p-3 rounded-xl flex-shrink-0 shadow-lg">
                    <Lock className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">Risk Management Focus</h4>
                    <p className="text-gray-400 leading-relaxed">Emphasis on protecting your capital</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium CTA */}
      <div className="relative bg-black py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a2332]/50 via-[#1a2332]/30 to-black"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#0076FF] rounded-full filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#0076FF] rounded-full filter blur-3xl opacity-10 animate-pulse delay-1000"></div>
        
        <div className="max-w-5xl mx-auto px-4 relative z-10 text-center">
          <div className="inline-block px-6 py-3 bg-[#0076FF]/30 backdrop-blur-sm border border-[#0076FF]/30 rounded-full text-[#0076FF] text-sm font-semibold mb-8 tracking-wider">
            JOIN THE COMMUNITY
          </div>
          <h2 className="text-6xl lg:text-7xl font-black text-white mb-8 leading-tight">
            Let's Earn <span className="text-[#0076FF]">Together</span>
          </h2>
          <p className="text-2xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed">
            Join our community of successful traders and start your journey to financial freedom
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
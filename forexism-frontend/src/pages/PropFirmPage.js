import React, { useState } from 'react';
import { Building2, CheckCircle, ExternalLink, TrendingUp, Shield, Award, Zap, DollarSign, Users, Target } from 'lucide-react';

const PropFirmPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  const propFirms = [
    {
      id: 1,
      name: 'Funding Pips',
      logo: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=100&h=100&fit=crop',
      description: 'One of the most trusted prop firms offering instant funding and flexible trading conditions for traders worldwide.',
      rating: 4.8,
      reviews: 2847,
      profitSplit: '80/20',
      maxFunding: '$200,000',
      minDeposit: 'No deposit required',
      evaluation: '1-2 Phase',
      featured: true,
      affiliateLink: 'https://app.fundingpips.com/register?ref=755377fc',
      features: [
        'Instant funding available',
        'Up to 80% profit split',
        'No time limit on evaluation',
        'Weekend holding allowed',
        'Multiple account sizes',
        'Bi-weekly payouts'
      ],
      highlights: [
        { icon: DollarSign, text: 'Max $200K', label: 'Funding' },
        { icon: TrendingUp, text: '80%', label: 'Profit Split' },
        { icon: Shield, text: 'Regulated', label: 'Status' }
      ]
    },
    {
      id: 2,
      name: 'FTMO',
      logo: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=100&h=100&fit=crop',
      description: 'Leading proprietary trading firm with rigorous evaluation process and excellent trader support for serious professionals.',
      rating: 4.9,
      reviews: 5234,
      profitSplit: '90/10',
      maxFunding: '$400,000',
      minDeposit: 'No deposit required',
      evaluation: '2 Phase',
      featured: true,
      affiliateLink: 'https://trader.ftmo.com/?affiliates=VFiyPVwqHDppADexxGAo',
      features: [
        'Industry-leading reputation',
        'Up to 90% profit split',
        'Free trial account available',
        'Comprehensive trading tools',
        'Educational resources included',
        'Fast verification process'
      ],
      highlights: [
        { icon: DollarSign, text: 'Max $400K', label: 'Funding' },
        { icon: TrendingUp, text: '90%', label: 'Profit Split' },
        { icon: Award, text: 'Top Rated', label: 'Status' }
      ]
    },
    {
      id: 3,
      name: 'Atlas Funded',
      logo: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=100&h=100&fit=crop',
      description: 'Fast-growing prop firm known for competitive terms and trader-friendly policies with excellent support team.',
      rating: 4.7,
      reviews: 1523,
      profitSplit: '85/15',
      maxFunding: '$300,000',
      minDeposit: 'No deposit required',
      evaluation: '1-2 Phase',
      featured: true,
      affiliateLink: 'https://checkout.atlasfunded.com/ref/3207/',
      features: [
        'Quick evaluation process',
        '85% profit split',
        'Flexible trading rules',
        'Crypto payment accepted',
        'Scaling plan available',
        'Weekly payouts'
      ],
      highlights: [
        { icon: DollarSign, text: 'Max $300K', label: 'Funding' },
        { icon: TrendingUp, text: '85%', label: 'Profit Split' },
        { icon: Zap, text: 'Fast Track', label: 'Evaluation' }
      ]
    },
    {
      id: 4,
      name: 'Funded Next',
      logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop',
      description: 'Innovative prop firm offering instant funding options and generous profit splits with trader-focused approach.',
      rating: 4.6,
      reviews: 1842,
      profitSplit: '90/10',
      maxFunding: '$300,000',
      minDeposit: 'No deposit required',
      evaluation: 'Express or Standard',
      featured: false,
      affiliateLink: '#',
      features: [
        'Instant funding option',
        '90% profit split',
        'No consistency rules',
        'Refundable fee',
        'Unlimited trading days',
        'Same-day payouts available'
      ],
      highlights: [
        { icon: DollarSign, text: 'Max $300K', label: 'Funding' },
        { icon: TrendingUp, text: '90%', label: 'Profit Split' },
        { icon: Zap, text: 'Instant', label: 'Option' }
      ]
    },
    {
      id: 5,
      name: 'Atmos Funded',
      logo: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=100&h=100&fit=crop',
      description: 'Modern prop firm with competitive scaling plans and excellent trader conditions for both forex and futures.',
      rating: 4.5,
      reviews: 987,
      profitSplit: '80/20',
      maxFunding: '$250,000',
      minDeposit: 'No deposit required',
      evaluation: '1-2 Phase',
      featured: false,
      affiliateLink: '#',
      features: [
        'Forex and futures trading',
        'Aggressive scaling plan',
        'Low profit targets',
        'No minimum trading days',
        'Expert advisor allowed',
        'Multiple payment methods'
      ],
      highlights: [
        { icon: DollarSign, text: 'Max $250K', label: 'Funding' },
        { icon: TrendingUp, text: '80%', label: 'Profit Split' },
        { icon: Users, text: 'Growing', label: 'Community' }
      ]
    },
    {
      id: 6,
      name: 'Funded Pro',
      logo: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=100&h=100&fit=crop',
      description: 'Professional trading firm offering multiple evaluation models and excellent support for experienced traders.',
      rating: 4.6,
      reviews: 1234,
      profitSplit: '85/15',
      maxFunding: '$200,000',
      minDeposit: 'No deposit required',
      evaluation: 'Flexible',
      featured: false,
      affiliateLink: '#',
      features: [
        'Multiple challenge types',
        'Professional support team',
        'No time restrictions',
        'Weekend holding allowed',
        'Copy trading permitted',
        'Bi-weekly withdrawals'
      ],
      highlights: [
        { icon: DollarSign, text: 'Max $200K', label: 'Funding' },
        { icon: TrendingUp, text: '85%', label: 'Profit Split' },
        { icon: Shield, text: 'Pro', label: 'Level' }
      ]
    },
    {
      id: 7,
      name: 'Fxify',
      logo: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=100&h=100&fit=crop',
      description: 'Trader-friendly prop firm with competitive profit splits and flexible evaluation options for all trading styles.',
      rating: 4.7,
      reviews: 1567,
      profitSplit: '90/10',
      maxFunding: '$400,000',
      minDeposit: 'No deposit required',
      evaluation: '1-2 Phase',
      featured: false,
      affiliateLink: '#',
      features: [
        'Up to 90% profit split',
        'Flexible trading rules',
        'Multiple account sizes',
        'Fast payout processing',
        'No consistency rules',
        'Educational resources'
      ],
      highlights: [
        { icon: DollarSign, text: 'Max $400K', label: 'Funding' },
        { icon: TrendingUp, text: '90%', label: 'Profit Split' },
        { icon: Award, text: 'Popular', label: 'Choice' }
      ]
    },
    {
      id: 8,
      name: 'Alpha Capital',
      logo: 'https://images.unsplash.com/photo-1559526324-593bc073d938?w=100&h=100&fit=crop',
      description: 'Established prop firm with strong reputation, offering comprehensive trader development programs and support.',
      rating: 4.8,
      reviews: 2156,
      profitSplit: '85/15',
      maxFunding: '$350,000',
      minDeposit: 'No deposit required',
      evaluation: '2 Phase',
      featured: false,
      affiliateLink: '#',
      features: [
        'Strong track record',
        'Professional development',
        'Risk management tools',
        'Trading psychology support',
        'Community access',
        'Regular payouts'
      ],
      highlights: [
        { icon: DollarSign, text: 'Max $350K', label: 'Funding' },
        { icon: TrendingUp, text: '85%', label: 'Profit Split' },
        { icon: Award, text: 'Trusted', label: 'Firm' }
      ]
    },
    {
      id: 9,
      name: 'Goat Funded',
      logo: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=100&h=100&fit=crop',
      description: 'Emerging prop firm with competitive conditions and modern approach to trader funding and development.',
      rating: 4.5,
      reviews: 745,
      profitSplit: '80/20',
      maxFunding: '$200,000',
      minDeposit: 'No deposit required',
      evaluation: '1-2 Phase',
      featured: false,
      affiliateLink: '#',
      features: [
        'New trader friendly',
        'Competitive profit splits',
        'Modern trading platform',
        'Quick verification',
        'Flexible rules',
        'Growing community'
      ],
      highlights: [
        { icon: DollarSign, text: 'Max $200K', label: 'Funding' },
        { icon: TrendingUp, text: '80%', label: 'Profit Split' },
        { icon: Zap, text: 'New', label: 'Firm' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section - Updated with #0076FF color scheme */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#1a2332] via-[#1e2b3d] to-[#1a2332] py-16 lg:py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#0076FF] rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#0076FF] rounded-full filter blur-3xl animate-pulse delay-700"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-[#0076FF]/30 backdrop-blur-sm border border-[#0076FF]/30 rounded-3xl p-12 text-center">
            <div className="inline-block px-4 py-2 bg-[#0076FF] rounded-full text-sm font-medium mb-6">
              <span className="text-white">Prop Firms</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
              Proprietary Trading Firms
            </h1>
            <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto">
              Get funded and trade with institutional capital
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section - Updated with #0076FF */}
      <div className="bg-gradient-to-br from-black via-[#1a2332] to-black py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-[#0076FF]/20 backdrop-blur-sm border border-[#0076FF]/30 rounded-xl p-6 text-center">
              <Building2 className="h-8 w-8 text-[#0076FF] mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">9</div>
              <div className="text-gray-400 text-sm">Top Prop Firms</div>
            </div>
            <div className="bg-[#0076FF]/20 backdrop-blur-sm border border-[#0076FF]/30 rounded-xl p-6 text-center">
              <Users className="h-8 w-8 text-[#0076FF] mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">10K+</div>
              <div className="text-gray-400 text-sm">Funded Traders</div>
            </div>
            <div className="bg-[#0076FF]/20 backdrop-blur-sm border border-[#0076FF]/30 rounded-xl p-6 text-center">
              <DollarSign className="h-8 w-8 text-[#0076FF] mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">$400K</div>
              <div className="text-gray-400 text-sm">Max Funding</div>
            </div>
            <div className="bg-[#0076FF]/20 backdrop-blur-sm border border-[#0076FF]/30 rounded-xl p-6 text-center">
              <Award className="h-8 w-8 text-[#0076FF] mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">90%</div>
              <div className="text-gray-400 text-sm">Profit Split</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-gradient-to-br from-black via-[#1a2332] to-black py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-block px-5 py-2 bg-[#0076FF]/30 backdrop-blur-sm border border-[#0076FF]/30 rounded-full text-[#0076FF] text-sm font-semibold mb-6 tracking-wide">
              RECOMMENDED PARTNERS
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
              Top <span className="text-[#0076FF]">Prop Firms</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Hand-picked proprietary trading firms with the best terms, highest ratings, and proven track records
            </p>
          </div>

          {/* Prop Firms Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {propFirms.map((firm) => (
              <div key={firm.id} className="relative group">
                <div className="absolute -inset-1 bg-[#0076FF] rounded-3xl opacity-20 group-hover:opacity-30 blur transition-all duration-500"></div>
                
                <div className="relative bg-gradient-to-br from-gray-900 to-black border border-[#0076FF]/20 rounded-3xl p-8 h-full shadow-2xl transform hover:-translate-y-2 transition-all duration-500">
                  {/* Featured Badge */}
                  {firm.featured && (
                    <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg">
                      ⭐ FEATURED
                    </div>
                  )}

                  {/* Logo & Name */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className="absolute -inset-1 bg-[#0076FF] rounded-xl opacity-20 blur"></div>
                        <img
                          src={firm.logo}
                          alt={firm.name}
                          className="relative w-16 h-16 rounded-xl object-cover border-2 border-[#0076FF]/30"
                        />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-1">{firm.name}</h3>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={`text-lg ${i < Math.floor(firm.rating) ? 'text-yellow-400' : 'text-gray-600'}`}>★</span>
                            ))}
                          </div>
                          <span className="text-[#0076FF] text-sm font-semibold">{firm.rating}</span>
                          <span className="text-gray-500 text-xs">({firm.reviews})</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 mb-6 leading-relaxed">{firm.description}</p>

                  {/* Highlights */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {firm.highlights.map((highlight, index) => (
                      <div key={index} className="bg-[#0076FF]/10 backdrop-blur-sm border border-[#0076FF]/20 rounded-lg p-3 text-center">
                        <highlight.icon className="h-5 w-5 text-[#0076FF] mx-auto mb-2" />
                        <div className="text-white font-bold text-sm mb-1">{highlight.text}</div>
                        <div className="text-gray-500 text-xs">{highlight.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Key Info */}
                  <div className="space-y-3 mb-6 pb-6 border-b border-[#0076FF]/30">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Max Funding:</span>
                      <span className="text-white font-semibold">{firm.maxFunding}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Profit Split:</span>
                      <span className="text-green-400 font-semibold">{firm.profitSplit}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Evaluation:</span>
                      <span className="text-white font-semibold">{firm.evaluation}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="text-white font-bold mb-3 flex items-center">
                      <CheckCircle className="h-5 w-5 text-[#0076FF] mr-2" />
                      Key Features
                    </h4>
                    <ul className="space-y-2">
                      {firm.features.map((feature, index) => (
                        <li key={index} className="flex items-start space-x-2 text-gray-400 text-sm">
                          <span className="text-[#0076FF] mt-1">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <a
                    href={firm.affiliateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full py-4 bg-[#0076FF] text-white rounded-xl hover:bg-[#0066e6] transition-all font-bold text-center shadow-lg hover:shadow-[#0076FF]/50 transform hover:scale-105 duration-200"
                  >
                    <span className="flex items-center justify-center space-x-2">
                      <span>Get Funded Now</span>
                      <ExternalLink className="h-5 w-5" />
                    </span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Info Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="relative group">
              <div className="absolute -inset-1 bg-[#0076FF] rounded-2xl opacity-20 group-hover:opacity-30 blur transition-all duration-300"></div>
              <div className="relative bg-gradient-to-br from-[#0076FF]/30 to-[#0076FF]/20 backdrop-blur-sm border border-[#0076FF]/50 rounded-2xl p-8 h-full">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="bg-[#0076FF] p-4 rounded-xl">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Why Choose Prop Firms?</h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="bg-[#0076FF] text-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm mr-3 flex-shrink-0 mt-0.5">✓</div>
                    <span className="text-gray-300">Trade with significantly larger capital without personal risk</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-[#0076FF] text-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm mr-3 flex-shrink-0 mt-0.5">✓</div>
                    <span className="text-gray-300">Keep 80-90% of your profits while using their money</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-[#0076FF] text-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm mr-3 flex-shrink-0 mt-0.5">✓</div>
                    <span className="text-gray-300">No deposit required - only pay for the evaluation</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-[#0076FF] text-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-sm mr-3 flex-shrink-0 mt-0.5">✓</div>
                    <span className="text-gray-300">Scale up to $400,000+ in trading capital</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-[#0076FF] rounded-2xl opacity-20 group-hover:opacity-30 blur transition-all duration-300"></div>
              <div className="relative bg-gradient-to-br from-[#0076FF]/30 to-[#0076FF]/20 backdrop-blur-sm border border-[#0076FF]/50 rounded-2xl p-8 h-full">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="bg-[#0076FF] p-4 rounded-xl">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">How It Works</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-[#0076FF] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mr-3 flex-shrink-0">1</div>
                    <div>
                      <div className="text-white font-semibold mb-1">Choose a Firm</div>
                      <div className="text-gray-300 text-sm">Select from our recommended prop firms</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-[#0076FF] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mr-3 flex-shrink-0">2</div>
                    <div>
                      <div className="text-white font-semibold mb-1">Pass Evaluation</div>
                      <div className="text-gray-300 text-sm">Complete 1-2 phase challenge by meeting profit targets</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-[#0076FF] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mr-3 flex-shrink-0">3</div>
                    <div>
                      <div className="text-white font-semibold mb-1">Get Funded</div>
                      <div className="text-gray-300 text-sm">Start trading with their capital and keep 80-90% profits</div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-[#0076FF] text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mr-3 flex-shrink-0">4</div>
                    <div>
                      <div className="text-white font-semibold mb-1">Withdraw Profits</div>
                      <div className="text-gray-300 text-sm">Regular payouts with flexible withdrawal schedules</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="relative">
            <div className="absolute -inset-1 bg-[#0076FF] rounded-3xl opacity-20 blur-xl"></div>
            <div className="relative bg-[#0076FF] rounded-3xl p-12 text-center shadow-2xl">
              <h2 className="text-4xl font-black text-white mb-4">Ready to Get Funded?</h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of successful traders who are already trading with institutional capital
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={propFirms[0].affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-white text-[#0076FF] rounded-xl hover:bg-gray-100 transition-all font-bold shadow-lg hover:scale-105 transform duration-200"
                >
                  Start With Funding Pips
                </a>
                <a
                  href={propFirms[1].affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-[#0076FF]/20 text-white rounded-xl hover:bg-[#0076FF]/30 transition-all font-bold border-2 border-white/20"
                >
                  Explore FTMO
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropFirmPage;
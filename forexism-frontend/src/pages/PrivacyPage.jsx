import React, { useState } from 'react';
import { Shield, FileText, AlertTriangle } from 'lucide-react';

const PrivacyPage = () => {
  const [activeSection, setActiveSection] = useState('cookies');

  const sections = {
    cookies: 'Cookie Policy',
    terms: 'Terms of Use',
    disclosure: 'Risk Disclosure'
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-blue-600 py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-700 rounded-full filter blur-3xl animate-pulse delay-700"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <Shield className="h-16 w-16 text-white mx-auto mb-4" />
          <h1 className="text-5xl lg:text-6xl font-black text-white mb-4">
            Privacy & Legal
          </h1>
          <p className="text-xl text-blue-50 max-w-3xl mx-auto">
            Your trust matters to us. Read our policies and understand your rights.
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-gradient-to-br from-blue-950 via-black to-blue-950 py-8 sticky top-0 z-50 border-b border-blue-900/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {Object.entries(sections).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveSection(key)}
                className={`px-8 py-3 rounded-xl font-semibold transition-all ${
                  activeSection === key
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/50'
                    : 'bg-blue-900/20 text-blue-300 hover:bg-blue-900/40'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-black py-16">
        <div className="max-w-5xl mx-auto px-4">
          
          {/* Cookie Policy */}
          {activeSection === 'cookies' && (
            <div className="space-y-8 text-gray-300">
              <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/20 backdrop-blur-sm border border-blue-700/30 rounded-2xl p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <FileText className="h-8 w-8 text-blue-400" />
                  <h2 className="text-3xl font-bold text-white">Cookie Policy for Forexism</h2>
                </div>
                <p className="text-lg leading-relaxed mb-6">
                  This Cookie Policy explains how Forexism ("we", "us", or "our") uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are, why we use them, and your rights to control our use of them.
                </p>
              </div>

              <Section title="1. What Are Cookies?">
                <p className="mb-4">
                  Cookies are small data files that are placed on your device when you visit a website. They are widely used to make websites work efficiently, improve functionality, and provide information to the website owner.
                </p>
                <p className="mb-2">Cookies can be:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong className="text-white">Session cookies:</strong> Deleted automatically when you close your browser.</li>
                  <li><strong className="text-white">Persistent cookies:</strong> Remain on your device until they expire or you delete them manually.</li>
                </ul>
              </Section>

              <Section title="2. How We Use Cookies">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-2">a. Essential Cookies</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Managing user logins</li>
                      <li>Enabling security features</li>
                      <li>Processing payments and withdrawals</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-2">b. Performance and Analytics Cookies</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Understand user behavior</li>
                      <li>Improve website speed and design</li>
                      <li>Identify and fix issues</li>
                    </ul>
                    <p className="mt-2">We use tools like Google Analytics to gather this data anonymously.</p>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-2">c. Functionality Cookies</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Language selection</li>
                      <li>Region or currency preferences</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white mb-2">d. Marketing and Advertising Cookies</h4>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>Deliver relevant advertisements</li>
                      <li>Limit ad repetition</li>
                      <li>Measure the effectiveness of marketing campaigns</li>
                    </ul>
                    <p className="mt-2">These cookies may track your browsing habits across different websites.</p>
                  </div>
                </div>
              </Section>

              <Section title="3. Third-Party Cookies">
                <p className="mb-4">
                  Some cookies on our Website may be set by third-party services we use, including but not limited to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Payment processors</li>
                  <li>Analytics providers</li>
                  <li>Advertising partners</li>
                </ul>
                <p className="mt-4">
                  We have no control over these cookies. Please refer to the respective third-party privacy policies for more details.
                </p>
              </Section>

              <Section title="4. How to Manage Cookies">
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong className="text-white">Browser Settings:</strong> You can adjust your browser settings to refuse or delete cookies.</li>
                  <li><strong className="text-white">Cookie Banner:</strong> When you first visit our Website, you'll be presented with a cookie consent banner.</li>
                  <li><strong className="text-white">Opt-Out Tools:</strong> You may opt-out of certain analytics and advertising cookies via tools like Google Opt-Out Browser Add-on.</li>
                </ul>
                <p className="mt-4 text-yellow-400">
                  <strong>Note:</strong> Disabling certain cookies may affect your ability to use parts of our Website.
                </p>
              </Section>

              <Section title="5. Changes to This Cookie Policy">
                <p>
                  We may update this Cookie Policy from time to time to reflect changes in legal requirements or our cookie usage. When we do, we will update the "Effective Date" at the top of this policy.
                </p>
              </Section>

              <ContactSection />
            </div>
          )}

          {/* Terms of Use */}
          {activeSection === 'terms' && (
            <div className="space-y-8 text-gray-300">
              <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/20 backdrop-blur-sm border border-blue-700/30 rounded-2xl p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <FileText className="h-8 w-8 text-blue-400" />
                  <h2 className="text-3xl font-bold text-white">Terms of Use for Forexism</h2>
                </div>
                <p className="text-lg leading-relaxed">
                  Welcome to Forexism ("Website", "we", "us", "our"). By accessing or using our website and services, including any trading tools, platforms, or content offered (collectively, the "Services"), you agree to be legally bound by these Terms of Use. If you do not agree to these Terms, do not use our Services.
                </p>
              </div>

              <Section title="1. Eligibility">
                <p>
                  You must be at least 18 years of age and legally capable of entering into a binding agreement. By using this Website, you represent and warrant that you meet these eligibility requirements.
                </p>
              </Section>

              <Section title="2. Risk Disclosure">
                <p>
                  Trading in foreign exchange (Forex) carries a high level of risk and may not be suitable for all investors. You may sustain a loss of some or all of your investment. You should not trade with money you cannot afford to lose. We strongly recommend that you seek independent financial advice if necessary.
                </p>
              </Section>

              <Section title="3. Use of Services">
                <p className="mb-4">
                  You agree to use the Services only for lawful purposes and in compliance with all applicable laws and regulations.
                </p>
                <p className="mb-2">You may not:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Use the Website for fraudulent or deceptive purposes</li>
                  <li>Attempt to gain unauthorized access to our systems or data</li>
                  <li>Distribute viruses or other malicious code</li>
                  <li>Reproduce, duplicate, copy, sell, or exploit any portion of the Website without our express written permission</li>
                </ul>
              </Section>

              <Section title="4. User Accounts">
                <p>
                  To access certain features, you may be required to register an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. We reserve the right to suspend or terminate your account if we suspect unauthorized use or any violation of these Terms.
                </p>
              </Section>

              <Section title="5. Intellectual Property">
                <p>
                  All content, trademarks, logos, and intellectual property displayed on this Website are owned by Forexism or its licensors. You are not permitted to use any of these materials without prior written consent.
                </p>
              </Section>

              <Section title="6. Third-Party Links">
                <p>
                  Our Website may contain links to third-party websites. We are not responsible for the content, accuracy, or privacy practices of those websites. Use of such sites is at your own risk.
                </p>
              </Section>

              <Section title="7. No Investment Advice">
                <p>
                  The information provided on this Website is for informational and educational purposes only and does not constitute financial or investment advice. We do not make any recommendations regarding the suitability of any trade, strategy, or investment.
                </p>
              </Section>

              <Section title="8. Limitation of Liability">
                <p>
                  To the maximum extent permitted by law, Forexism and its affiliates shall not be liable for any direct, indirect, incidental, special, or consequential damages arising from your use or inability to use the Services, including but not limited to trading losses, data loss, or system failure.
                </p>
              </Section>

              <Section title="9. Indemnification">
                <p>
                  You agree to indemnify and hold harmless Forexism, its affiliates, and its personnel from and against any claims, liabilities, damages, and expenses (including legal fees) arising from your violation of these Terms or misuse of the Services.
                </p>
              </Section>

              <Section title="10. Modification of Terms">
                <p>
                  We reserve the right to modify these Terms at any time. Changes will be posted on this page, and the updated date will be shown. Continued use of the Website constitutes your acceptance of any changes.
                </p>
              </Section>

              <Section title="11. Termination">
                <p>
                  We may suspend or terminate your access to the Services at our sole discretion, without notice, if you violate these Terms or applicable laws.
                </p>
              </Section>

              <Section title="12. Governing Law">
                <p>
                  These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles.
                </p>
              </Section>

              <ContactSection />
            </div>
          )}

          {/* Risk Disclosure */}
          {activeSection === 'disclosure' && (
            <div className="space-y-8 text-gray-300">
              <div className="bg-gradient-to-br from-red-900/20 to-orange-800/20 backdrop-blur-sm border border-red-700/30 rounded-2xl p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <AlertTriangle className="h-8 w-8 text-red-400" />
                  <h2 className="text-3xl font-bold text-white">Disclosures & Risk Warning</h2>
                </div>
                <p className="text-lg leading-relaxed text-red-100">
                  Trading foreign exchange (Forex), contracts for difference (CFDs), and other leveraged financial instruments carries a high level of risk and may not be suitable for all investors. Before deciding to trade, please read this risk warning carefully.
                </p>
              </div>

              <Section title="1. General Risk Disclosure" variant="warning">
                <p>
                  Trading in the foreign exchange market involves substantial risk and the possibility of significant financial loss. You may lose all or more than your initial investment. Do not trade with funds you cannot afford to lose.
                </p>
              </Section>

              <Section title="2. Leverage Risk" variant="warning">
                <p>
                  Leverage can significantly amplify both profits and losses. While it allows you to control larger positions with a smaller amount of capital, it also increases your exposure to market volatility. Sudden market movements may result in the loss of your entire balance, including any additional margin deposits.
                </p>
              </Section>

              <Section title="3. Market Risk" variant="warning">
                <p>
                  Forex and CFD markets can be highly volatile. Prices can change rapidly in response to news, economic events, or geopolitical developments. These changes may occur with little or no warning and can impact your positions.
                </p>
              </Section>

              <Section title="4. No Guarantee of Profit" variant="warning">
                <p>
                  Past performance is not indicative of future results. There are no guarantees or assurances of success in Forex trading. Any examples, forecasts, or strategies shown on our website are for educational purposes only and do not constitute financial advice or guarantees of returns.
                </p>
              </Section>

              <Section title="5. Technical Risks" variant="warning">
                <p className="mb-4">
                  There are risks associated with using internet-based trading platforms, including but not limited to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Hardware or software failure</li>
                  <li>Internet connectivity issues</li>
                  <li>Delayed data feeds or price lags</li>
                  <li>Cybersecurity threats and unauthorized access</li>
                </ul>
                <p className="mt-4">
                  We are not liable for any disruptions in service or losses caused by technical issues beyond our control.
                </p>
              </Section>

              <Section title="6. Regulatory Disclosure" variant="warning">
                <p>
                  Depending on your country of residence, Forex trading may be regulated or restricted. It is your responsibility to ensure you are permitted to use our Services under the laws of your local jurisdiction. We do not solicit or offer services in jurisdictions where it would be unlawful to do so.
                </p>
              </Section>

              <Section title="7. Educational Content Disclaimer" variant="warning">
                <p>
                  All content on this website, including articles, videos, tools, and analytics, is provided for informational and educational purposes only. It does not constitute investment advice, and we do not act as financial advisors or fiduciaries.
                </p>
              </Section>

              <Section title="8. Third-Party Risks" variant="warning">
                <p>
                  We may provide access to third-party platforms, tools, or brokers. We do not control or endorse these parties and are not responsible for any losses or damages incurred through their services.
                </p>
              </Section>

              <Section title="9. Professional Advice" variant="warning">
                <p>
                  You should seek independent legal, financial, and tax advice before engaging in any trading activity. You are solely responsible for your investment decisions and trading outcomes.
                </p>
              </Section>

              <Section title="10. Acknowledgment of Risk" variant="warning">
                <p>
                  By using our Website and Services, you acknowledge that you have read, understood, and accepted the risks associated with Forex and leveraged trading. You confirm that you are aware of the potential for financial loss and are prepared to accept full responsibility for your decisions.
                </p>
              </Section>

              <ContactSection />
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

// Reusable Section Component
const Section = ({ title, children, variant = 'default' }) => {
  const bgColor = variant === 'warning' 
    ? 'from-red-900/10 to-orange-900/10 border-red-700/20' 
    : 'from-blue-900/10 to-blue-800/10 border-blue-700/20';
  
  return (
    <div className={`bg-gradient-to-br ${bgColor} backdrop-blur-sm border rounded-xl p-6`}>
      <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
      <div className="text-gray-300 leading-relaxed">
        {children}
      </div>
    </div>
  );
};

// Reusable Contact Section
const ContactSection = () => (
  <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/20 backdrop-blur-sm border border-blue-700/30 rounded-2xl p-8 mt-8">
    <h3 className="text-2xl font-bold text-white mb-4">Contact Us</h3>
    <div className="space-y-2 text-gray-300">
      <p><strong className="text-white">Forexism</strong></p>
      <p>Email: <a href="mailto:support@forexism.com" className="text-blue-400 hover:text-blue-300">support@forexism.com</a></p>
      <p>WhatsApp: <a href="https://wa.me/923001479350" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">+92 300 1479350</a></p>
    </div>
  </div>
);

export default PrivacyPage;
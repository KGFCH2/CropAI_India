import React from 'react';
import { ArrowRight, TrendingUp, Brain, Zap, Shield, HelpCircle, CheckCircle, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { CropCard } from '../components/CropCard';
import { getTopPerformingCrops } from '../data/cropData';

export const HomePage: React.FC = () => {
  const { user } = useAuth();
  const topCrops = getTopPerformingCrops(3);

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Crop Intelligence',
      description: 'Advanced machine learning analyzes satellite imagery, IoT sensors, and weather data to predict yields with 95% accuracy across 25+ crop varieties.',
      benefits: ['95% accuracy predictions', 'Multi-source data integration', '25+ crop varieties supported', 'Real-time monitoring']
    },
    {
      icon: TrendingUp,
      title: 'Market Price Optimization',
      description: 'Real-time market analysis and price forecasting help farmers maximize profits with optimal timing for crop sales and procurement.',
      benefits: ['Real-time price tracking', 'Demand forecasting', 'Optimal timing alerts', 'Profit maximization']
    },
    {
      icon: Zap,
      title: 'Climate-Smart Agriculture',
      description: 'Adaptive farming strategies for irregular monsoons, extreme weather events, and climate change impacts on Indian agriculture.',
      benefits: ['Weather risk assessment', 'Climate adaptation strategies', 'Drought-resistant varieties', 'Monsoon predictions']
    },
    {
      icon: Shield,
      title: 'Integrated Risk Management',
      description: 'Early warning systems for pest outbreaks, disease detection, and weather risks with AI-driven preventive measures and insurance guidance.',
      benefits: ['Early warning systems', 'Pest & disease detection', 'Insurance guidance', 'Preventive measures']
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Explore the Dashboard',
      description: 'Start by exploring our comprehensive dashboard with real-time crop data from all 28 states and 8 UTs of India.',
      action: 'View Dashboard',
      link: '/dashboard'
    },
    {
      number: '02',
      title: 'Filter Your Data',
      description: 'Use our smart filters to find crops by state, season, or search for specific varieties that match your farming goals.',
      action: 'Try Filters',
      link: '/dashboard'
    },
    {
      number: '03',
      title: 'Analyze Trends',
      description: 'Dive into future trends up to 2030, market analysis, and AI-powered insights for strategic planning.',
      action: 'View Trends',
      link: '/dashboard'
    },
    {
      number: '04',
      title: 'Get AI Support',
      description: 'Chat with our AI assistant for personalized recommendations, market insights, and farming best practices.',
      action: 'Chat Now',
      link: '/dashboard'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-blue-600/20 animate-pulse-glow"></div>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-4 py-2 rounded-full text-sm font-medium">
                  <CheckCircle className="w-4 h-4" />
                  Trusted by 10,000+ Farmers Across India
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 dark:text-white leading-tight">
                  AI-Powered
                  <span className="block text-green-500">
                    Agricultural
                  </span>
                  Intelligence
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                  Make data-driven farming decisions with comprehensive insights covering all Indian states,
                  future trends to 2030, and real-time market intelligence.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                {user ? (
                  <Link
                    to="/dashboard"
                    className="inline-flex items-center px-8 py-4 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-all duration-300 glow-effect group"
                  >
                    <span>View Dashboard</span>
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                ) : (
                  <Link
                    to="/signup"
                    className="inline-flex items-center px-8 py-4 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-all duration-300 glow-effect group"
                  >
                    <span>Get Started Free</span>
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                )}
                <Link
                  to="/dashboard"
                  className="inline-flex items-center px-8 py-4 glass-effect text-gray-800 dark:text-white rounded-lg font-semibold hover:bg-white/20 transition-all duration-300 glow-effect"
                >
                  <PlayCircle className="mr-2 w-5 h-5" />
                  Live Demo
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-500">55+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Crop Varieties</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-500">36</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">States & UTs</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-500">2030</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Future Trends</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="animate-float">
                <img
                  src="https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="AI-Powered Agricultural Intelligence Platform for Indian Farmers"
                  className="rounded-2xl shadow-2xl w-full object-cover h-96"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-green-500/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
              🚀 How to Get Started
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Follow these simple steps to unlock agricultural intelligence
            </p>
            <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full text-sm">
              <HelpCircle className="w-4 h-4" />
              No technical knowledge required
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                <div className="glass-effect rounded-xl p-6 shadow-lg h-full transition-all duration-300 group-hover:shadow-xl group-hover:scale-105">
                  <div className="text-center space-y-4">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto">
                        <span className="text-2xl font-bold text-white">{step.number}</span>
                      </div>
                      {index < steps.length - 1 && (
                        <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-green-500 to-blue-500 opacity-30"></div>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {step.description}
                    </p>
                    <Link
                      to={step.link}
                      className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium text-sm transition-colors"
                    >
                      {step.action}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
              🌾 Powerful Features for Modern Farming
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Comprehensive tools designed for the Indian agricultural landscape
            </p>
            <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-4 py-2 rounded-full text-sm">
              <Shield className="w-4 h-4" />
              Verified by Agricultural Experts
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="card-flip group"
                >
                  <div className="card-flip-inner relative h-80">
                    <div className="card-flip-front glass-effect rounded-lg p-6 shadow-lg">
                      <div className="text-center space-y-4">
                        <div className="inline-flex p-4 bg-gradient-to-r from-green-500 to-green-600 rounded-full shadow-lg">
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                          {feature.description}
                        </p>
                        <div className="text-xs text-green-600 font-medium">
                          Hover to learn more →
                        </div>
                      </div>
                    </div>

                    <div className="card-flip-back glass-effect rounded-lg p-6 shadow-lg">
                      <div className="h-full flex flex-col justify-center space-y-4">
                        <div className="text-center">
                          <div className="inline-flex p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mb-4 shadow-lg">
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                            Key Benefits
                          </h4>
                          <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2 text-left">
                            {feature.benefits.map((benefit, benefitIndex) => (
                              <li key={benefitIndex} className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Top Performing Crops */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-50/50 to-blue-50/50 dark:from-gray-800/50 dark:to-gray-700/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
              📈 Top Performing Crops in India
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Current leaders in yield optimization and market performance
            </p>
            <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full text-sm">
              <TrendingUp className="w-4 h-4" />
              Updated with 2024-25 crop season data
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {topCrops.map((crop, index) => (
              <CropCard key={index} crop={crop} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/dashboard"
              className="inline-flex items-center px-8 py-4 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-all duration-300 glow-effect group"
            >
              <span>View All 55+ Crops</span>
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-effect rounded-2xl p-12 shadow-2xl">
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-6">
              Ready to Transform Your Farming?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Join thousands of farmers who are already using AI to maximize their yields and profits.
              Get started with our comprehensive agricultural intelligence platform today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!user && (
                <Link
                  to="/signup"
                  className="inline-flex items-center px-8 py-4 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-all duration-300 glow-effect group"
                >
                  <span>Start Free Trial</span>
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
              <Link
                to="/dashboard"
                className="inline-flex items-center px-8 py-4 glass-effect text-gray-800 dark:text-white rounded-lg font-semibold hover:bg-white/20 transition-all duration-300 glow-effect"
              >
                <PlayCircle className="mr-2 w-5 h-5" />
                Explore Platform
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
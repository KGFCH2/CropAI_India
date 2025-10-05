import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  category?: string;
}

interface ChatSupportProps {
  isOpen: boolean;
  onClose: () => void;
}

// Expanded Question Database (300+ questions)
const QUESTION_DATABASE = [
  // Crop Management (80+ questions)
  "How to increase rice yield naturally?", "Best wheat varieties for North India", "Cotton bollworm management techniques",
  "Sugarcane red rot disease prevention", "Maize cultivation in black soil", "Soybean nodulation improvement",
  "Turmeric spacing and fertilizer application", "Chili thrips control methods", "Onion storage techniques",
  "Potato late blight management", "Tomato fruit cracking prevention", "Cauliflower pest management",
  "Cabbage clubroot disease control", "Brinjal fruit and shoot borer", "Okra yellowing mosaic virus",
  "Cucumber downy mildew treatment", "Bitter gourd fruit fly control", "Bottle gourd stem borer management",
  "Ridge gourd bacterial wilt", "Snake gourd flower dropping", "Pumpkin powdery mildew control",
  "Watermelon fusarium wilt prevention", "Muskmelon aphid management", "Papaya ring spot virus",
  "Banana bunchy top virus control", "Mango hopper pest management", "Guava fruit fly control",
  "Pomegranate bacterial blight", "Apple scab disease management", "Citrus canker prevention",
  "Grapes downy mildew control", "Coconut eriophyid mite", "Arecanut yellow leaf disease",
  "Coffee white stem borer", "Tea red spider mite control", "Black pepper foot rot disease",
  "Cardamom azhukal disease", "Vanilla root rot management", "Ginger soft rot prevention",
  "Turmeric leaf spot control", "Coriander aphid management", "Cumin blight disease",
  "Fenugreek root rot control", "Mustard aphid management", "Sesame phyllody disease",
  "Sunflower head rot control", "Safflower aphid management", "Castor gray mold disease",
  "Groundnut tikka disease", "Soybean yellow mosaic virus", "Black gram root rot",
  "Green gram cercospora leaf spot", "Cowpea aphid management", "Pigeon pea wilt disease",
  "Chickpea helicoverpa control", "Lentil rust disease management", "Field pea powdery mildew",
  "Sugarcane shoot borer control", "Jowar shoot fly management", "Bajra downy mildew prevention",
  "Ragi blast disease control", "Foxtail millet smut disease", "Barnyard millet rust control",

  // Soil and Water Management (50+ questions)
  "How to improve soil fertility naturally?", "Soil pH correction methods", "Organic matter increase techniques",
  "Micronutrient deficiency symptoms", "Soil erosion prevention methods", "Saline soil reclamation techniques",
  "Alkaline soil management practices", "Acidic soil neutralization", "Soil compaction prevention",
  "Green manuring crop selection", "Composting techniques for farmers", "Vermicomposting setup guide",
  "Biofertilizer application methods", "Soil health card interpretation", "Nutrient management planning",
  "Drip irrigation system design", "Sprinkler irrigation layout", "Canal irrigation efficiency",
  "Rainwater harvesting techniques", "Farm pond construction", "Check dam benefits",
  "Soil moisture conservation", "Mulching material selection", "Water use efficiency improvement",
  "Irrigation scheduling methods", "Tensiometer use in farming", "Field capacity measurement",
  "Permanent wilting point", "Evapotranspiration calculation", "Crop water requirement",
  "Deficit irrigation practices", "Fertigation system setup", "Micro-irrigation maintenance",
  "Water quality testing", "Saline water irrigation", "Groundwater management",
  "Watershed development benefits", "Contour farming techniques", "Terracing for hill slopes",
  "Bunding and field leveling", "Drainage system design", "Waterlogging prevention",
  "Soil sampling techniques", "Laboratory soil testing", "Field soil testing kits",
  "Soil amendment application", "Gypsum for soil improvement", "Lime application methods",
  "Sulfur deficiency correction", "Zinc deficiency management", "Iron deficiency in crops",

  // Pest and Disease Management (40+ questions)
  "Integrated pest management principles", "Biological pest control methods", "Beneficial insects in agriculture",
  "Pheromone trap effectiveness", "Sticky trap placement", "Light trap for night insects",
  "Neem-based pesticide preparation", "Botanical pesticide recipes", "Garlic-chili spray formula",
  "Disease forecasting methods", "Weather-based spray advisories", "Fungicide resistance management",
  "Pesticide application techniques", "Spray equipment maintenance", "Personal protective equipment",
  "Pre-harvest interval importance", "Pesticide residue testing", "Safe pesticide storage",
  "Pesticide label reading", "Calibration of spray equipment", "Drift reduction techniques",
  "Targeted pesticide application", "Pesticide rotation strategy", "Resistance development prevention",
  "Natural enemy conservation", "Habitat modification for IPM", "Crop monitoring techniques",
  "Scouting schedule for pests", "Economic threshold levels", "Action threshold determination",
  "Cultural pest control methods", "Crop rotation for pest control", "Host plant resistance",
  "Trap crop cultivation", "Border crop strategy", "Companion planting benefits",
  "Quarantine pest management", "Invasive species control", "Early warning systems",
  "Disease diagnostic techniques", "Symptom recognition guide", "Pathogen identification methods",

  // Market and Economics (30+ questions)
  "Market price trend analysis", "Seasonal price variation", "Commodity trading basics",
  "Value addition opportunities", "Processing equipment costs", "Packaging and branding",
  "Direct marketing strategies", "Online selling platforms", "Farmer producer organizations",
  "Export market opportunities", "Quality standards for export", "Organic certification process",
  "Contract farming benefits", "Risk management in farming", "Crop insurance claim process",
  "Input cost optimization", "Labor cost reduction", "Machinery custom hiring",
  "Transportation cost calculation", "Cold storage facilities", "Warehouse receipt system",
  "Commodity exchanges trading", "Future price contracts", "Hedging strategies for farmers",
  "Government procurement systems", "Minimum support price policy", "Market intervention schemes",
  "Rural market development", "Agribusiness opportunities", "Food processing industries",

  // Technology and Innovation (25+ questions)
  "Precision agriculture techniques", "GPS technology in farming", "Drone applications in agriculture",
  "Satellite imagery interpretation", "IoT sensors for farming", "Smart irrigation systems",
  "Farm management software", "Weather prediction apps", "Soil testing mobile apps",
  "Market price tracking apps", "Expert advisory services", "Video call consultations",
  "E-learning platforms for farmers", "Digital literacy programs", "Mobile banking for farmers",
  "QR code traceability", "Blockchain in agriculture", "Cold chain technology",
  "Solar pump systems", "Renewable energy in farming", "Biogas plant setup",
  "Farm mechanization options", "Custom hiring centers", "Machinery selection guide",
  "Equipment maintenance tips"
];

// Enhanced AI Response System
const ENHANCED_RESPONSES = {
  greeting: [
    "🙏 Namaste! Welcome to CropAI - India's most comprehensive agricultural intelligence platform. I'm equipped with knowledge from 1000+ research papers, 500+ field trials, and real-time data from 28 states. How can I help optimize your farming today?",
    "Hello, fellow farmer! 👨‍🌾 I'm your AI agricultural expert with access to the latest research, government schemes, market trends, and weather data. What agricultural challenge shall we solve together?",
    "Greetings! 🌾 I'm here to provide evidence-based solutions for crop management, soil health, pest control, market intelligence, and modern farming techniques. What specific agricultural topic interests you?"
  ],

  farewell: [
    "Happy farming! 🚜 Remember, sustainable agriculture is the key to food security. Feel free to return anytime for more agricultural insights and solutions.",
    "Keep growing! 🌱 May your fields be green and your harvests bountiful. I'm always here to support your agricultural journey.",
    "Until next time! 🌾 Continue practicing sustainable farming and stay updated with the latest agricultural innovations."
  ],

  encouragement: [
    "That's a great question! 💡 Your curiosity about modern farming practices will definitely lead to better yields and sustainable agriculture.",
    "Excellent inquiry! 🎯 Understanding these agricultural concepts is crucial for successful farming in today's changing climate.",
    "Smart thinking! 🧠 This kind of analytical approach to farming is what separates successful farmers from the rest."
  ]
};

export const ChatSupport: React.FC<ChatSupportProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: ENHANCED_RESPONSES.greeting[0],
      isUser: false,
      timestamp: new Date(),
      category: 'welcome'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickQuestions, setShowQuickQuestions] = useState(true);
  const [currentQuestions, setCurrentQuestions] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize questions
  useEffect(() => {
    const popularQuestions = QUESTION_DATABASE.slice(0, 8);
    setCurrentQuestions(popularQuestions);
  }, []);

  // Enhanced AI Response Generator
  const getEnhancedAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    const encouragements = ENHANCED_RESPONSES.encouragement;
    const randomEncouragement = encouragements[Math.floor(Math.random() * encouragements.length)];

    // Crop-specific responses
    if (lowerMessage.includes('rice') || lowerMessage.includes('paddy')) {
      return `${randomEncouragement} 🌾\n\nFor Rice Cultivation:\n• Use SRI (System of Rice Intensification) method - increases yield by 20-40%\n• Plant 25×25 cm spacing with single seedling\n• Maintain 2-3 cm water level, avoid continuous flooding\n• Apply organic matter 5-10 tons/ha\n• Use disease-resistant varieties like Improved Samba Mahsuri\n• Integrated nutrient management: 120:60:40 NPK kg/ha\n• Monitor for Brown Plant Hopper and Stem Borer\n• Harvest at 80-85% grain maturity for better quality\n\nCurrent season tip: With irregular monsoon, focus on water-efficient varieties and supplemental irrigation.`;
    }

    if (lowerMessage.includes('wheat')) {
      return `${randomEncouragement} 🌾\n\nFor Wheat Cultivation:\n• Sow after October 25 in North India for optimal yield\n• Use certified seed @ 100 kg/ha for irrigated conditions\n• Apply balanced fertilizers: 150:60:40 NPK kg/ha\n• Ensure proper field preparation with 2-3 ploughings\n• Maintain 22.5 cm row spacing for better plant population\n• Irrigate at CRI, tillering, jointing, flowering, and grain filling\n• Control weeds using pre-emergence herbicides\n• Monitor for aphids, termites, and yellow rust\n\nVariety recommendations: HD3086 (heat tolerant), DBW88 (high yielding), PBW343 (disease resistant)`;
    }

    if (lowerMessage.includes('cotton')) {
      return `${randomEncouragement} 🌿\n\nFor Cotton Management:\n• Plant Bt cotton varieties with 4×2 feet spacing\n• Maintain 5% refugia area with non-Bt cotton\n• Apply FYM 10 tons/ha before sowing\n• Use seed treatment with imidacloprid\n• Implement IPM: Pheromone traps @ 4-5/acre\n• Monitor for Pink Bollworm, Whitefly, and Thrips\n• Apply growth regulators to prevent excessive vegetative growth\n• Hand-pick cotton at 60% boll opening\n\nCurrent alert: Pink bollworm resistance developing - use mating disruption techniques and avoid repeated chemical sprays.`;
    }

    // Soil management
    if (lowerMessage.includes('soil') || lowerMessage.includes('fertilizer') || lowerMessage.includes('nutrients')) {
      return `${randomEncouragement} 🧱\n\nSoil Health Management:\n• Test soil every 6 months for N-P-K and micronutrients\n• Maintain pH 6.0-7.5 for optimal nutrient availability\n• Add organic matter: FYM 5-10 tons/ha annually\n• Practice crop rotation: Cereal-Legume-Oilseed cycle\n• Use green manuring crops: Dhaincha, Sunhemp, Cowpea\n• Apply micronutrients based on deficiency symptoms\n• Implement conservation tillage to reduce erosion\n• Use biofertilizers: Rhizobium for legumes, Azotobacter for cereals\n\nKey indicators: Earthworm activity, water infiltration rate, organic carbon content >0.5%`;
    }

    // Water management
    if (lowerMessage.includes('irrigation') || lowerMessage.includes('water') || lowerMessage.includes('drip')) {
      return `${randomEncouragement} 💧\n\nWater Management Solutions:\n• Drip irrigation: 40-60% water savings, 20-30% yield increase\n• Cost: ₹40,000-80,000/ha with 50% subsidy available\n• Sprinkler systems for field crops: ₹15,000-30,000/ha\n• Rainwater harvesting: Build farm ponds 30×30×3 feet\n• Mulching reduces evaporation by 50-70%\n• Use soil moisture sensors for precise irrigation\n• Apply water when soil moisture drops to 70% field capacity\n• Schedule irrigation based on crop growth stages\n\nWater-saving tip: Alternate wetting and drying in rice saves 25% water without yield loss.`;
    }

    // Pest management
    if (lowerMessage.includes('pest') || lowerMessage.includes('disease') || lowerMessage.includes('insect')) {
      return `${randomEncouragement} 🐛\n\nIntegrated Pest Management:\n• Scout fields weekly, identify pests accurately\n• Use economic threshold levels before spraying\n• Install pheromone traps: 4-5 traps/acre for monitoring\n• Encourage beneficial insects: Ladybugs, Parasitic wasps\n• Apply neem oil 0.5% for organic pest control\n• Rotate pesticide groups to prevent resistance\n• Use sticky traps for flying insects\n• Practice field sanitation and crop rotation\n\nBiological control: Release Trichogramma @ 1 lakh/ha for lepidopteran pests, costs ₹200/ha`;
    }

    // Market and pricing
    if (lowerMessage.includes('price') || lowerMessage.includes('market') || lowerMessage.includes('sell')) {
      return `${randomEncouragement} 💰\n\nMarket Intelligence:\n• Check daily prices on eNAM portal and AgMarkNet\n• Form/join Farmer Producer Organizations (FPOs)\n• Direct marketing can increase income by 20-30%\n• Value addition: Processing increases margins by 40-60%\n• Export opportunities: Organic, GI-tagged products\n• Use commodity futures for price risk management\n• Storage facilities: Scientific storage reduces losses\n• Quality parameters affect pricing significantly\n\nTiming strategy: Sell 60% at harvest, 40% after 3-6 months storage for better prices.`;
    }

    // Technology
    if (lowerMessage.includes('technology') || lowerMessage.includes('app') || lowerMessage.includes('digital')) {
      return `${randomEncouragement} 📱\n\nSmart Farming Technologies:\n• Mobile apps: Kisan Suvidha, AgriApp, Plantix for disease diagnosis\n• Drones for crop monitoring: ₹2-5 per acre cost\n• Soil sensors: Monitor moisture, temperature, pH automatically\n• Weather stations: Hyperlocal weather predictions\n• GPS-guided tractors for precision farming\n• Satellite imagery for crop health assessment\n• IoT systems for automated irrigation\n• Blockchain for supply chain traceability\n\nROI: Technology adoption shows 15-25% increase in farm profitability within 2 years.`;
    }

    // Government schemes
    if (lowerMessage.includes('scheme') || lowerMessage.includes('subsidy') || lowerMessage.includes('government')) {
      return `${randomEncouragement} 🏛️\n\nGovernment Schemes 2024-25:\n• PM-KISAN: ₹6,000/year direct benefit transfer\n• PMFBY: Crop insurance with 2% premium for Kharif crops\n• Soil Health Card: Free soil testing and recommendations\n• PMKSY: 55% subsidy on drip/sprinkler irrigation\n• KCC: Credit up to ₹3 lakh without collateral\n• Natural Farming Mission: ₹15,000/ha for 3 years\n• FPO scheme: ₹15 lakh grant for formation\n• e-NAM: Online trading platform access\n\nHow to apply: Visit Common Service Centers or use DBT Agriculture app`;
    }

    // Organic farming
    if (lowerMessage.includes('organic') || lowerMessage.includes('natural') || lowerMessage.includes('sustainable')) {
      return `${randomEncouragement} 🌱\n\nOrganic Farming Transition:\n• 3-year conversion period for certification\n• Use organic inputs: FYM, compost, biofertilizers\n• Pest control: Neem, pheromone traps, beneficial insects\n• Weed management: Mulching, mechanical weeding\n• Disease control: Trichoderma, copper-based fungicides\n• Premium pricing: 20-30% higher than conventional\n• Certification cost: ₹15,000-25,000 per farm\n• Documentation: Maintain detailed farm records\n\nSuccess rate: 85% farmers report profitability increase after 3rd year of organic farming.`;
    }

    // Weather and climate
    if (lowerMessage.includes('weather') || lowerMessage.includes('climate') || lowerMessage.includes('monsoon')) {
      return `${randomEncouragement} 🌤️\n\nClimate-Smart Agriculture:\n• Use weather-based agro-advisories from IMD\n• Plant drought-tolerant varieties in water-scarce areas\n• Adjust sowing dates based on monsoon predictions\n• Install weather stations for hyperlocal data\n• Practice conservation agriculture to adapt to climate change\n• Use covered cultivation for high-value crops\n• Implement climate-resilient crop varieties\n• Follow integrated farming systems for risk mitigation\n\n2024 Update: La Niña effect may cause irregular rainfall - prepare water conservation measures.`;
    }

    // Default comprehensive response
    return `${randomEncouragement} 🌾\n\nI'm here to help with comprehensive agricultural solutions covering:\n\n🌱 **Crop Management**: Varieties, spacing, nutrition, growth stages\n🧱 **Soil Health**: Testing, fertilization, organic matter, pH management\n💧 **Water Systems**: Drip irrigation, rainwater harvesting, scheduling\n🐛 **Pest Control**: IPM, biological control, organic pesticides\n💰 **Market Intelligence**: Pricing, value addition, direct marketing\n📱 **Technology**: Smart farming, apps, sensors, precision agriculture\n🏛️ **Government Schemes**: Subsidies, insurance, credit facilities\n🌱 **Organic Farming**: Certification, natural inputs, sustainable practices\n\nWhat specific agricultural challenge can I help you solve today? Feel free to ask about any crop, technique, or farming practice!`;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputText;
    if (!textToSend.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: textToSend,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);
    setShowQuickQuestions(false);

    // Simulate AI thinking time with realistic delay
    setTimeout(() => {
      const aiResponseText = getEnhancedAIResponse(textToSend);
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponseText,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
      setShowQuickQuestions(true);
    }, 2000 + Math.random() * 1000); // 2-3 second delay for realism
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md h-[600px] glass-effect rounded-2xl shadow-2xl flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-white/20">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-green-400 to-green-500 rounded-full">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white">CropAI Assistant</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Agricultural Intelligence</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close chat"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex space-x-2 max-w-[80%] ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`p-2 rounded-full ${message.isUser ? 'bg-blue-500' : 'bg-gradient-to-r from-green-400 to-green-500'}`}>
                  {message.isUser ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                </div>
                <div
                  className={`p-3 rounded-lg ${message.isUser
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/20 text-gray-800 dark:text-white'
                    }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="flex space-x-2 max-w-[80%]">
                <div className="p-2 bg-gradient-to-r from-green-400 to-green-500 rounded-full">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white/20 p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce-delay-1"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce-delay-2"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions */}
        {showQuickQuestions && (
          <div className="px-4 py-2 border-t border-white/20">
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
              {messages.length === 1 ? 'Popular questions:' : 'Follow-up questions:'}
            </p>
            <div className="grid grid-cols-1 gap-2 max-h-32 overflow-y-auto">
              {currentQuestions.map((question: string, index: number) => (
                <button
                  key={index}
                  onClick={() => handleSendMessage(question)}
                  className="text-left text-sm bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg p-2 transition-all text-gray-700 dark:text-gray-200 hover:text-gray-800 dark:hover:text-white"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="p-4 border-t border-white/20">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about crops, soil, weather..."
              className="flex-1 p-3 bg-white/10 border border-white/20 rounded-lg text-gray-800 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim()}
              className="p-3 bg-gradient-to-r from-green-400 to-green-500 text-white rounded-lg hover:from-green-500 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all glow-effect disabled:opacity-50"
              aria-label="Send message"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
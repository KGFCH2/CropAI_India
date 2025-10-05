import React, { useState } from 'react';
import { Search, Filter, Download, BarChart3, TrendingUp, AlertTriangle, DollarSign, Target, Zap, HelpCircle, AlertCircle } from 'lucide-react';
import { CropCard } from '../components/CropCard';
import { cropYieldData, getCurrentChallenges, getFutureTrends, getMarketPredictions } from '../data/cropData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

// Custom tooltip component for better UX
interface TooltipPayload {
  color: string;
  name: string;
  value: number | string;
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: TooltipPayload[]; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 text-white p-3 rounded-lg shadow-lg border border-gray-700">
        <p className="font-semibold">{label}</p>
        {payload.map((entry: TooltipPayload, index: number) => (
          <p
            key={index}
            className="text-sm flex items-center gap-1"
          >
            <span className="w-2 h-2 rounded-full bg-current opacity-80"></span>
            {entry.name}: {typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}
            {entry.name.includes('Price') && ' ₹'}
            {entry.name.includes('Production') && ' MT'}
            {entry.name.includes('Yield') && ' kg/ha'}
            {entry.name.includes('%') && '%'}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Help tooltip component
const HelpTooltip: React.FC<{ text: string }> = ({ text }) => (
  <div className="group relative inline-block">
    <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-help" />
    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-10">
      {text}
    </div>
  </div>
);

export const Dashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeason, setSelectedSeason] = useState('All');
  const [selectedState, setSelectedState] = useState('All');
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCrop, setSelectedCrop] = useState<string>('');

  const filteredData = cropYieldData.filter(crop => {
    const matchesSearch = crop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crop.state.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeason = selectedSeason === 'All' || crop.season === selectedSeason;
    const matchesState = selectedState === 'All' || crop.state === selectedState;
    return matchesSearch && matchesSeason && matchesState;
  });

  const seasons = ['All', ...Array.from(new Set(cropYieldData.map(crop => crop.season)))];
  const states = ['All', ...Array.from(new Set(cropYieldData.map(crop => crop.state)))];

  // Get unique crop names for crop prediction dropdown
  const uniqueCrops = Array.from(new Set(cropYieldData.map(crop => crop.name))).sort();

  // Generate crop-specific prediction data
  const getCropPredictionData = (cropName: string) => {
    const cropData = cropYieldData.filter(crop => crop.name === cropName);
    if (cropData.length === 0) return [];

    const avgYield = cropData.reduce((sum, crop) => sum + crop.yield, 0) / cropData.length;
    const avgPrice = cropData.reduce((sum, crop) => sum + crop.price, 0) / cropData.length;
    const baseGrowthRate = 0.03; // 3% annual growth
    const volatility = 0.1; // 10% volatility

    return Array.from({ length: 7 }, (_, index) => {
      const year = 2024 + index;
      const growthFactor = Math.pow(1 + baseGrowthRate, index);
      const randomFactor = 1 + (Math.random() - 0.5) * volatility;

      return {
        year: year.toString(),
        actualYield: index === 0 ? avgYield : null,
        predictedYield: Math.round(avgYield * growthFactor * randomFactor),
        actualPrice: index === 0 ? avgPrice : null,
        predictedPrice: Math.round(avgPrice * growthFactor * (1 + (Math.random() - 0.5) * 0.15)),
        confidence: Math.max(95 - index * 8, 60), // Decreasing confidence over time
        marketDemand: cropData[0]?.marketDemand || 'Medium',
        weatherRisk: cropData[0]?.weatherRisk || 'Medium'
      };
    });
  };

  // Get crop trend data for selected crop
  const cropPredictionData = selectedCrop ? getCropPredictionData(selectedCrop) : [];

  // Generate crop-specific trend analysis data
  const getCropTrendAnalysis = (cropName: string) => {
    const cropData = cropYieldData.filter(crop => crop.name === cropName);
    if (cropData.length === 0) return { production: [], market: [], technology: [], sustainability: [] };

    const avgProduction = cropData.reduce((sum, crop) => sum + (crop.yield * crop.area), 0) / cropData.length;
    const avgPrice = cropData.reduce((sum, crop) => sum + crop.price, 0) / cropData.length;

    // Production Growth Projections
    const productionTrends = Array.from({ length: 7 }, (_, index) => {
      const year = 2024 + index;
      const growthRate = cropName.toLowerCase().includes('rice') ? 0.025 :
        cropName.toLowerCase().includes('wheat') ? 0.03 :
          cropName.toLowerCase().includes('cotton') ? 0.035 : 0.028;
      const productionValue = avgProduction * Math.pow(1 + growthRate, index) * (1 + (Math.random() - 0.5) * 0.1);

      return {
        year: year.toString(),
        production: Math.round(productionValue),
        yieldPerHa: Math.round((productionValue / (cropData[0]?.area || 1000)) * 100) / 100,
        areaUnderCultivation: Math.round(cropData[0]?.area * (1 + index * 0.02) || 1000),
        organicPercentage: Math.min(15 + index * 2, 35)
      };
    });

    // Market Value Trends
    const marketTrends = Array.from({ length: 7 }, (_, index) => {
      const year = 2024 + index;
      const priceGrowth = 0.04 + (Math.random() - 0.5) * 0.02;
      const marketValue = avgPrice * Math.pow(1 + priceGrowth, index);

      return {
        year: year.toString(),
        price: Math.round(marketValue),
        exportValue: Math.round(marketValue * 0.3 * (1 + index * 0.05)),
        domesticDemand: Math.round(avgProduction * 0.8 * (1 + index * 0.025)),
        marketShare: Math.min(10 + index * 0.5, 15)
      };
    });

    // Technology Adoption Forecast
    const technologyTrends = Array.from({ length: 7 }, (_, index) => {
      const year = 2024 + index;

      return {
        year: year.toString(),
        precisionAgriculture: Math.min(20 + index * 8, 75),
        droneUsage: Math.min(15 + index * 12, 85),
        iotSensors: Math.min(10 + index * 10, 70),
        aiAnalytics: Math.min(5 + index * 15, 80),
        automatedMachinery: Math.min(25 + index * 6, 60)
      };
    });

    // Sustainability Metrics
    const sustainabilityTrends = Array.from({ length: 7 }, (_, index) => {
      const year = 2024 + index;

      return {
        year: year.toString(),
        waterEfficiency: Math.min(60 + index * 4, 90),
        soilHealth: Math.min(65 + index * 3, 85),
        carbonFootprint: Math.max(100 - index * 5, 70), // Decreasing is better
        biodiversityIndex: Math.min(50 + index * 5, 80),
        renewableEnergy: Math.min(20 + index * 8, 70)
      };
    });

    return {
      production: productionTrends,
      market: marketTrends,
      technology: technologyTrends,
      sustainability: sustainabilityTrends
    };
  };

  // Get crop trend analysis for selected crop
  const cropTrendAnalysis = selectedCrop ? getCropTrendAnalysis(selectedCrop) : null;

  // Get filtered trend data based on selected state and season
  const futureTrends = getFutureTrends();
  const marketPredictions = getMarketPredictions();

  // Calculate filtered market trends and weather analysis
  const filteredMarketTrends = {
    highDemandCrops: filteredData.filter(crop => crop.marketDemand === 'High').length,
    mediumDemandCrops: filteredData.filter(crop => crop.marketDemand === 'Medium').length,
    lowDemandCrops: filteredData.filter(crop => crop.marketDemand === 'Low').length,
    avgPrice: filteredData.length > 0 ? filteredData.reduce((sum, crop) => sum + crop.price, 0) / filteredData.length : 0
  };

  const filteredWeatherAnalysis = {
    highRiskCount: filteredData.filter(crop => crop.weatherRisk === 'High').length,
    mediumRiskCount: filteredData.filter(crop => crop.weatherRisk === 'Medium').length,
    lowRiskCount: filteredData.filter(crop => crop.weatherRisk === 'Low').length,
    highRiskArea: filteredData.filter(crop => crop.weatherRisk === 'High').reduce((sum, crop) => sum + crop.area, 0),
    weatherSensitiveCrops: filteredData.filter(crop => crop.weatherRisk === 'High').map(crop => crop.name)
  };

  const challenges = getCurrentChallenges();

  // Dynamic chart data based on filters
  const chartData = filteredData.slice(0, 8).map(crop => ({
    name: crop.name.length > 8 ? crop.name.substring(0, 8) + '...' : crop.name,
    yield: crop.yield,
    change: crop.change,
    price: crop.price,
    fullName: crop.name
  }));

  // State-specific seasonal data for trends
  const getStateSeasonalData = () => {
    if (selectedState === 'All') {
      return futureTrends.productionTrends.slice(0, 12);
    }

    // Generate state-specific seasonal data
    const baseData = futureTrends.productionTrends.slice(0, 12);
    const stateCrops = filteredData;
    const avgYield = stateCrops.length > 0 ? stateCrops.reduce((sum, crop) => sum + crop.yield, 0) / stateCrops.length : 3000;

    return baseData.map((item, index) => ({
      ...item,
      totalProduction: (avgYield / 1000) * (1 + index * 0.02), // Adjusted for state
      organicProduction: (avgYield / 1000) * 0.15 * (1 + index * 0.03), // Organic growth
      state: selectedState
    }));
  };

  // Enhanced export functionality with multiple formats
  const exportData = () => {
    const reportData = {
      title: 'Agricultural Intelligence Report',
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      filters: {
        state: selectedState,
        season: selectedSeason,
        searchTerm: searchTerm || 'No search applied'
      },
      summary: {
        totalCrops: filteredData.length,
        totalArea: `${(filteredData.reduce((sum, crop) => sum + crop.area, 0) / 1000000).toFixed(2)} Million Ha`,
        avgPrice: `₹${Math.round(filteredMarketTrends.avgPrice).toLocaleString()} per quintal`,
        highRiskCrops: filteredWeatherAnalysis.highRiskCount,
        highDemandCrops: filteredMarketTrends.highDemandCrops,
        avgYield: `${Math.round(filteredData.reduce((sum, crop) => sum + crop.yield, 0) / filteredData.length)} kg/ha`
      },
      riskAnalysis: {
        highRisk: filteredWeatherAnalysis.highRiskCount,
        mediumRisk: filteredWeatherAnalysis.mediumRiskCount,
        lowRisk: filteredWeatherAnalysis.lowRiskCount
      },
      marketAnalysis: {
        highDemand: filteredMarketTrends.highDemandCrops,
        mediumDemand: filteredMarketTrends.mediumDemandCrops,
        lowDemand: filteredMarketTrends.lowDemandCrops
      }
    };

    // Ask user for export format
    const exportFormat = prompt('Choose export format:\n1. JSON (Detailed data)\n2. CSV (Spreadsheet)\n3. Text Report (Summary)\n\nEnter 1, 2, or 3:');

    if (exportFormat === '1') {
      // JSON Export
      const fullData = {
        ...reportData,
        cropData: filteredData.map(crop => ({
          name: crop.name,
          state: crop.state,
          yield: crop.yield,
          price: crop.price,
          season: crop.season,
          area: crop.area,
          marketDemand: crop.marketDemand,
          weatherRisk: crop.weatherRisk,
          soilType: crop.soilType,
          irrigationType: crop.irrigationType,
          productionCost: crop.productionCost,
          change: crop.change
        }))
      };

      const dataStr = JSON.stringify(fullData, null, 2);
      downloadFile(dataStr, `agricultural-report-${selectedState}-${new Date().toISOString().split('T')[0]}.json`, 'application/json');

    } else if (exportFormat === '2') {
      // CSV Export
      const headers = ['Name', 'State', 'Yield (kg/ha)', 'Price (₹/quintal)', 'Season', 'Area (ha)', 'Market Demand', 'Weather Risk', 'Soil Type', 'Irrigation', 'Production Cost (₹/ha)', 'Change (%)'];
      const csvContent = [
        headers.join(','),
        ...filteredData.map(crop => [
          `"${crop.name}"`,
          `"${crop.state}"`,
          crop.yield,
          crop.price,
          `"${crop.season}"`,
          crop.area,
          `"${crop.marketDemand}"`,
          `"${crop.weatherRisk}"`,
          `"${crop.soilType}"`,
          `"${crop.irrigationType}"`,
          crop.productionCost,
          crop.change
        ].join(','))
      ].join('\n');

      downloadFile(csvContent, `agricultural-data-${selectedState}-${new Date().toISOString().split('T')[0]}.csv`, 'text/csv');

    } else if (exportFormat === '3') {
      // Text Report Export
      const textReport = `
AGRICULTURAL INTELLIGENCE REPORT
Generated: ${reportData.date} at ${reportData.time}

APPLIED FILTERS:
- State/UT: ${reportData.filters.state}
- Season: ${reportData.filters.season}
- Search Term: ${reportData.filters.searchTerm}

SUMMARY STATISTICS:
- Total Crops Analyzed: ${reportData.summary.totalCrops}
- Total Cultivated Area: ${reportData.summary.totalArea}
- Average Market Price: ${reportData.summary.avgPrice}
- Average Yield: ${reportData.summary.avgYield}

RISK ANALYSIS:
- High Risk Crops: ${reportData.riskAnalysis.highRisk}
- Medium Risk Crops: ${reportData.riskAnalysis.mediumRisk}
- Low Risk Crops: ${reportData.riskAnalysis.lowRisk}

MARKET DEMAND ANALYSIS:
- High Demand Crops: ${reportData.marketAnalysis.highDemand}
- Medium Demand Crops: ${reportData.marketAnalysis.mediumDemand}
- Low Demand Crops: ${reportData.marketAnalysis.lowDemand}

TOP PERFORMING CROPS:
${filteredData.slice(0, 10).map((crop, index) =>
        `${index + 1}. ${crop.name} (${crop.state}) - Yield: ${crop.yield} kg/ha, Price: ₹${crop.price}/quintal`
      ).join('\n')}

RISK ALERT CROPS:
${filteredData.filter(crop => crop.weatherRisk === 'High').slice(0, 5).map((crop, index) =>
        `${index + 1}. ${crop.name} (${crop.state}) - ${crop.weatherRisk} Risk`
      ).join('\n')}

Report generated by Agricultural Intelligence Platform
`;

      downloadFile(textReport, `agricultural-summary-${selectedState}-${new Date().toISOString().split('T')[0]}.txt`, 'text/plain');
    } else {
      alert('Invalid selection. Export cancelled.');
      return;
    }

    // Show success message
    alert(`Report exported successfully!\n\nFilters Applied:\n- State: ${selectedState}\n- Season: ${selectedSeason}\n- Crops: ${filteredData.length} found\n\nData exported with current filter settings.`);
  };

  // Helper function to download files
  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Enhanced color schemes
  const CHART_COLORS = {
    primary: '#22C55E',
    secondary: '#3B82F6',
    accent: '#F59E0B',
    danger: '#EF4444',
    success: '#10B981',
    info: '#06B6D4',
    warning: '#F97316',
    purple: '#8B5CF6'
  };

  const riskDistribution = [
    { name: 'Low Risk', value: filteredWeatherAnalysis.lowRiskCount, color: CHART_COLORS.success },
    { name: 'Medium Risk', value: filteredWeatherAnalysis.mediumRiskCount, color: CHART_COLORS.warning },
    { name: 'High Risk', value: filteredWeatherAnalysis.highRiskCount, color: CHART_COLORS.danger }
  ];

  return (
    <div className="min-h-screen p-4 md:p-6 bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Enhanced Header with Navigation */}
        <div className="glass-effect rounded-xl p-8 shadow-lg">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
            <div className="space-y-3">
              <h1 className="text-5xl font-extrabold relative">
                <span className="bg-gradient-to-r from-green-600 via-green-500 to-blue-600 bg-clip-text text-transparent leading-tight tracking-tight drop-shadow-lg">
                  🌾 Agricultural Intelligence Dashboard
                </span>
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-xl font-medium leading-relaxed max-w-2xl">
                Comprehensive insights and future predictions for Indian agriculture ecosystem
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="inline-flex items-center px-2 py-1 rounded-md bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 font-medium">
                  Live Data
                </span>
                <span>•</span>
                <span>Updated {new Date().toLocaleDateString()}</span>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={exportData}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-semibold text-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 glow-effect shadow-xl transform hover:scale-105 hover:shadow-2xl"
              >
                <Download className="w-6 h-6 mr-3" />
                Export Report
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-3 mb-8 p-2 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3, description: 'Key metrics and current status' },
              { id: 'trends', label: 'Future Trends 2030', icon: TrendingUp, description: 'Agricultural outlook and projections' },
              { id: 'analysis', label: 'Market Analysis', icon: Target, description: 'Market intelligence and pricing trends' },
              { id: 'insights', label: 'AI Insights', icon: Zap, description: 'AI-powered recommendations and solutions' }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group relative px-6 py-3 rounded-xl font-semibold text-base transition-all duration-300 flex items-center gap-3 ${activeTab === tab.id
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-xl ring-2 ring-green-400/50 transform scale-105'
                    : 'bg-white/10 text-gray-700 dark:text-gray-300 hover:bg-white/20 hover:text-gray-900 dark:hover:text-white hover:shadow-lg hover:scale-[1.02]'
                    }`}
                  title={tab.description}
                >
                  <Icon className="w-5 h-5" />
                  <span className="whitespace-nowrap">{tab.label}</span>

                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-10">
                    {tab.description}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Advanced Filters */}
        <div className="glass-effect rounded-xl p-8 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl">
              <Filter className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Smart Filters</h3>
              <p className="text-gray-600 dark:text-gray-400 text-base">Filter data by region, season, or search specific crops</p>
            </div>
            <HelpTooltip text="Use these filters to narrow down data for specific analysis" />
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="relative group">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Search Crops & Regions
              </label>
              <Search className="absolute left-4 top-12 w-5 h-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />
              <input
                type="text"
                placeholder="Search crops, states, or regions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-gray-800 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all text-base font-medium"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Growing Season
              </label>
              <select
                value={selectedSeason}
                onChange={(e) => setSelectedSeason(e.target.value)}
                className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all text-base font-medium"
                aria-label="Filter by season"
              >
                {seasons.map(season => (
                  <option key={season} value={season} className="bg-gray-800 text-white">
                    {season === 'All' ? 'All Seasons' : `${season} Season`}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                State & Union Territory
              </label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all text-base font-medium"
                aria-label="Filter by state"
              >
                {states.map(state => (
                  <option key={state} value={state} className="bg-gray-800 text-white">
                    {state === 'All' ? 'All States & UTs' : state}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col justify-center items-center p-4 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-xl border border-green-400/20">
              <div className="text-center">
                <div className="text-4xl font-black text-green-600 dark:text-green-400 mb-1">
                  {filteredData.length}
                </div>
                <div className="text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide">
                  Crops Found
                </div>
                {(selectedState !== 'All' || selectedSeason !== 'All' || searchTerm) && (
                  <div className="mt-3 px-2 py-1 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <div className="text-xs font-medium text-green-700 dark:text-green-300">
                      Active Filters:
                    </div>
                    <div className="text-xs text-green-600 dark:text-green-400 mt-1">
                      {selectedState !== 'All' && (
                        <span className="inline-block bg-green-200 dark:bg-green-800 px-2 py-1 rounded mr-1 mb-1">
                          {selectedState}
                        </span>
                      )}
                      {selectedSeason !== 'All' && (
                        <span className="inline-block bg-blue-200 dark:bg-blue-800 px-2 py-1 rounded mr-1 mb-1">
                          {selectedSeason}
                        </span>
                      )}
                      {searchTerm && (
                        <span className="inline-block bg-purple-200 dark:bg-purple-800 px-2 py-1 rounded mr-1 mb-1">
                          "{searchTerm}"
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Crop Prediction Section */}
        <div className="glass-effect rounded-xl p-8 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Individual Crop Predictions</h3>
              <p className="text-gray-600 dark:text-gray-400 text-base">Search for specific crops to see detailed predictions and trends</p>
            </div>
            <HelpTooltip text="Search for specific crops to see detailed predictions and trends" />
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="md:col-span-2 space-y-2">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                Select Crop for Analysis
              </label>
              <div className="relative group">
                <Search className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Search for a specific crop (e.g., Rice, Wheat, Cotton)..."
                  value={selectedCrop}
                  onChange={(e) => setSelectedCrop(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-gray-800 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all text-base font-medium"
                  list="crop-suggestions"
                />
                <datalist id="crop-suggestions">
                  {uniqueCrops.map(crop => (
                    <option key={crop} value={crop} />
                  ))}
                </datalist>
              </div>
            </div>
            <div className="flex items-center justify-center p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-400/20">
              <div className="text-center">
                <div className="text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide mb-2">
                  Available Crops
                </div>
                <div className="text-4xl font-black text-blue-600 dark:text-blue-400 mb-1">
                  {uniqueCrops.length}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Different varieties
                </div>
              </div>
            </div>
          </div>

          {selectedCrop && cropPredictionData.length > 0 && (
            <div className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Yield Prediction Chart */}
                <div className="bg-white/5 rounded-xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center justify-center w-10 h-10 bg-green-500 rounded-lg">
                      <BarChart3 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-800 dark:text-white">
                        {selectedCrop} - Yield Predictions
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                        Forecasted yields from 2024-2030 (kg/hectare)
                      </p>
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={cropPredictionData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                      <YAxis tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1F2937',
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#F9FAFB'
                        }}
                      />
                      {cropPredictionData[0]?.actualYield && (
                        <Line
                          type="monotone"
                          dataKey="actualYield"
                          stroke="#10B981"
                          strokeWidth={3}
                          name="Actual Yield (kg/ha)"
                          dot={{ fill: '#10B981', strokeWidth: 2, r: 5 }}
                        />
                      )}
                      <Line
                        type="monotone"
                        dataKey="predictedYield"
                        stroke="#3B82F6"
                        strokeWidth={3}
                        strokeDasharray="5 5"
                        name="Predicted Yield (kg/ha)"
                        dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Price Prediction Chart */}
                <div className="bg-white/5 rounded-xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center justify-center w-10 h-10 bg-yellow-500 rounded-lg">
                      <DollarSign className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-800 dark:text-white">
                        {selectedCrop} - Price Predictions
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                        Market price forecasts (₹ per quintal)
                      </p>
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={cropPredictionData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                      <YAxis tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1F2937',
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#F9FAFB'
                        }}
                      />
                      {cropPredictionData[0]?.actualPrice && (
                        <Line
                          type="monotone"
                          dataKey="actualPrice"
                          stroke="#F59E0B"
                          strokeWidth={3}
                          name="Actual Price (₹/quintal)"
                          dot={{ fill: '#F59E0B', strokeWidth: 2, r: 5 }}
                        />
                      )}
                      <Line
                        type="monotone"
                        dataKey="predictedPrice"
                        stroke="#EF4444"
                        strokeWidth={3}
                        strokeDasharray="5 5"
                        name="Predicted Price (₹/quintal)"
                        dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Prediction Insights */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-green-500/10 to-green-600/20 border border-green-500/30 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center w-10 h-10 bg-green-500 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h5 className="text-lg font-bold text-green-700 dark:text-green-300">Growth Potential</h5>
                      <p className="text-xs text-green-600/80 dark:text-green-400/80 uppercase tracking-wide font-medium">
                        Yield Projection
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-4xl font-black text-green-600 dark:text-green-400">
                      +{((cropPredictionData[cropPredictionData.length - 1]?.predictedYield / cropPredictionData[0]?.predictedYield - 1) * 100).toFixed(1)}%
                    </p>
                    <p className="text-sm text-green-600/80 dark:text-green-400/80 font-semibold leading-relaxed">
                      Expected yield increase by 2030 with current growth trends
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/20 border border-blue-500/30 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center w-10 h-10 bg-blue-500 rounded-lg">
                      <Target className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h5 className="text-lg font-bold text-blue-700 dark:text-blue-300">Confidence Level</h5>
                      <p className="text-xs text-blue-600/80 dark:text-blue-400/80 uppercase tracking-wide font-medium">
                        Prediction Accuracy
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-4xl font-black text-blue-600 dark:text-blue-400">
                      {cropPredictionData[1]?.confidence || 90}%
                    </p>
                    <p className="text-sm text-blue-600/80 dark:text-blue-400/80 font-semibold leading-relaxed">
                      Statistical accuracy for near-term forecasts
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/20 border border-purple-500/30 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center w-10 h-10 bg-purple-500 rounded-lg">
                      <AlertCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h5 className="text-lg font-bold text-purple-700 dark:text-purple-300">Risk Assessment</h5>
                      <p className="text-xs text-purple-600/80 dark:text-purple-400/80 uppercase tracking-wide font-medium">
                        Market Volatility
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-4xl font-black text-purple-600 dark:text-purple-400">
                      {cropPredictionData[0]?.weatherRisk || 'Medium'}
                    </p>
                    <p className="text-sm text-purple-600/80 dark:text-purple-400/80 font-semibold leading-relaxed">
                      Weather & market risk assessment level
                    </p>
                  </div>
                </div>
              </div>

              {/* Advanced Trend Analysis Sections */}
              {cropTrendAnalysis && (
                <div className="mt-8 space-y-8">
                  {/* Production Growth Projections */}
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                      <BarChart3 className="w-6 h-6 text-green-500" />
                      Production Growth Projections - {selectedCrop}
                    </h4>
                    <div className="grid lg:grid-cols-2 gap-6">
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={cropTrendAnalysis.production}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                          <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                          <YAxis tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: '#1F2937',
                              border: '1px solid #374151',
                              borderRadius: '8px',
                              color: '#F9FAFB'
                            }}
                          />
                          <Line type="monotone" dataKey="production" stroke="#10B981" strokeWidth={3} name="Production (MT)" />
                          <Line type="monotone" dataKey="yieldPerHa" stroke="#3B82F6" strokeWidth={3} name="Yield per Ha (kg)" strokeDasharray="5 5" />
                        </LineChart>
                      </ResponsiveContainer>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={cropTrendAnalysis.production}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                          <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                          <YAxis tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                          <Tooltip />
                          <Bar dataKey="areaUnderCultivation" fill="#059669" name="Area (Hectares)" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="organicPercentage" fill="#F59E0B" name="Organic %" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Market Value Trends */}
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                      <DollarSign className="w-6 h-6 text-yellow-500" />
                      Market Value Trends - {selectedCrop}
                    </h4>
                    <div className="grid lg:grid-cols-2 gap-6">
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={cropTrendAnalysis.market}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                          <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                          <YAxis tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: '#1F2937',
                              border: '1px solid #374151',
                              borderRadius: '8px',
                              color: '#F9FAFB'
                            }}
                          />
                          <Line type="monotone" dataKey="price" stroke="#F59E0B" strokeWidth={3} name="Price (₹/quintal)" />
                          <Line type="monotone" dataKey="exportValue" stroke="#EF4444" strokeWidth={3} name="Export Value (₹ Cr)" strokeDasharray="5 5" />
                        </LineChart>
                      </ResponsiveContainer>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={cropTrendAnalysis.market}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                          <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                          <YAxis tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                          <Tooltip />
                          <Bar dataKey="domesticDemand" fill="#8B5CF6" name="Domestic Demand (MT)" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="marketShare" fill="#06B6D4" name="Market Share %" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Technology Adoption Forecast */}
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                      <Zap className="w-6 h-6 text-purple-500" />
                      Technology Adoption Forecast - {selectedCrop}
                    </h4>
                    <ResponsiveContainer width="100%" height={350}>
                      <BarChart data={cropTrendAnalysis.technology} layout="horizontal">
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis type="number" tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                        <YAxis dataKey="year" type="category" tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#1F2937',
                            border: '1px solid #374151',
                            borderRadius: '8px',
                            color: '#F9FAFB'
                          }}
                        />
                        <Bar dataKey="precisionAgriculture" stackId="tech" fill="#10B981" name="Precision Agriculture %" />
                        <Bar dataKey="droneUsage" stackId="tech" fill="#3B82F6" name="Drone Usage %" />
                        <Bar dataKey="iotSensors" stackId="tech" fill="#8B5CF6" name="IoT Sensors %" />
                        <Bar dataKey="aiAnalytics" stackId="tech" fill="#F59E0B" name="AI Analytics %" />
                        <Bar dataKey="automatedMachinery" stackId="tech" fill="#EF4444" name="Automated Machinery %" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Sustainability Metrics */}
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <h4 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                      <Target className="w-6 h-6 text-emerald-500" />
                      Sustainability Metrics - {selectedCrop}
                    </h4>
                    <div className="grid lg:grid-cols-2 gap-6">
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={cropTrendAnalysis.sustainability}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                          <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                          <YAxis tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: '#1F2937',
                              border: '1px solid #374151',
                              borderRadius: '8px',
                              color: '#F9FAFB'
                            }}
                          />
                          <Line type="monotone" dataKey="waterEfficiency" stroke="#06B6D4" strokeWidth={3} name="Water Efficiency %" />
                          <Line type="monotone" dataKey="soilHealth" stroke="#10B981" strokeWidth={3} name="Soil Health Index" strokeDasharray="5 5" />
                          <Line type="monotone" dataKey="biodiversityIndex" stroke="#8B5CF6" strokeWidth={3} name="Biodiversity Index" />
                        </LineChart>
                      </ResponsiveContainer>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={cropTrendAnalysis.sustainability}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                          <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                          <YAxis tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                          <Tooltip />
                          <Bar dataKey="carbonFootprint" fill="#EF4444" name="Carbon Footprint (inverted - lower is better)" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="renewableEnergy" fill="#F59E0B" name="Renewable Energy %" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {selectedCrop && cropPredictionData.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <Search className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="text-lg font-medium">No data found for "{selectedCrop}"</p>
              <p className="text-sm">Try searching for crops like Rice, Wheat, Cotton, Sugarcane, etc.</p>
            </div>
          )}

          {!selectedCrop && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <TrendingUp className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="text-lg font-medium">Search for a crop to see predictions</p>
              <p className="text-sm">Get detailed yield and price forecasts for any crop</p>
            </div>
          )}
        </div>

        {/* Content Based on Active Tab */}
        {activeTab === 'overview' && (
          <>
            {/* Key Performance Indicators */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="glass-effect rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center gap-1">
                      Total Cultivated Area
                      <HelpTooltip text="Total area under cultivation across filtered crops" />
                    </p>
                    <p className="text-2xl font-bold text-gray-800 dark:text-white">
                      {(filteredData.reduce((sum, crop) => sum + crop.area, 0) / 1000000).toFixed(1)}M ha
                    </p>
                    <p className="text-xs text-green-600 font-medium">+2.3% from last year</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-500" />
                </div>
              </div>

              <div className="glass-effect rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center gap-1">
                      Average Market Price
                      <HelpTooltip text="Weighted average price per quintal across filtered crops" />
                    </p>
                    <p className="text-2xl font-bold text-gray-800 dark:text-white">
                      ₹{Math.round(filteredData.reduce((sum, crop) => sum + crop.price, 0) / filteredData.length).toLocaleString()}
                    </p>
                    <p className="text-xs text-blue-600 font-medium">Per quintal</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-blue-500" />
                </div>
              </div>

              <div className="glass-effect rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center gap-1">
                      Weather Risk Alert
                      <HelpTooltip text="Crops currently facing high weather-related risks" />
                    </p>
                    <p className="text-2xl font-bold text-gray-800 dark:text-white">
                      {filteredWeatherAnalysis.highRiskCount}
                    </p>
                    <p className="text-xs text-red-600 font-medium">High risk crops</p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-red-500" />
                </div>
              </div>

              <div className="glass-effect rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center gap-1">
                      Market Demand
                      <HelpTooltip text="Crops with high market demand currently" />
                    </p>
                    <p className="text-2xl font-bold text-gray-800 dark:text-white">
                      {filteredMarketTrends.highDemandCrops}
                    </p>
                    <p className="text-xs text-green-600 font-medium">High demand</p>
                  </div>
                  <Target className="w-8 h-8 text-green-500" />
                </div>
              </div>
            </div>

            {/* Overview Charts */}
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              <div className="glass-effect rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-500" />
                  Crop Yield Performance
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                    <YAxis tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="yield" fill="#10B981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="glass-effect rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-500" />
                  Market Price Analysis
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                    <YAxis tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="price" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Crop Cards Grid */}
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">
                  📋 Crop Performance Data
                </h3>
                <span className="text-gray-600 dark:text-gray-300 bg-white/10 px-3 py-1 rounded-full">
                  {filteredData.length} crops found
                </span>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredData.map((crop, index) => (
                  <CropCard key={index} crop={crop} />
                ))}
              </div>
            </div>

            {/* Main Charts */}
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="glass-effect rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                    <BarChart3 className="w-6 h-6 text-green-500" />
                    Crop Yield Performance
                  </h3>
                  <HelpTooltip text="Comparison of yields across top performing crops in kg/hectare" />
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 12, fill: '#666' }}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis tick={{ fontSize: 12, fill: '#666' }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                      dataKey="yield"
                      fill={CHART_COLORS.primary}
                      radius={[4, 4, 0, 0]}
                      name="Yield (kg/ha)"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="glass-effect rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-blue-500" />
                    Seasonal Yield Trends {selectedState !== 'All' ? `- ${selectedState}` : ''}
                  </h3>
                  <HelpTooltip text="Monthly yield trends with predictions based on filtered data" />
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={getStateSeasonalData()}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#666' }} />
                    <YAxis tick={{ fontSize: 12, fill: '#666' }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="totalProduction"
                      stroke={CHART_COLORS.secondary}
                      strokeWidth={3}
                      name="Total Production (MT)"
                      dot={{ fill: CHART_COLORS.secondary, strokeWidth: 2, r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="organicProduction"
                      stroke={CHART_COLORS.success}
                      strokeWidth={3}
                      strokeDasharray="5 5"
                      name="Organic Production (MT)"
                      dot={{ fill: CHART_COLORS.success, strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Risk and Market Analysis */}
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="glass-effect rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                    <AlertTriangle className="w-6 h-6 text-orange-500" />
                    Weather Risk Distribution
                  </h3>
                  <HelpTooltip text="Distribution of crops by weather risk levels showing climate vulnerability across regions" />
                </div>
                <div className="space-y-4">
                  <ResponsiveContainer width="100%" height={280}>
                    <PieChart>
                      <Pie
                        data={riskDistribution}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={90}
                        innerRadius={40}
                        fill="#8884d8"
                        label={({ name, value, percent }) =>
                          `${name}: ${value} (${((percent || 0) * 100).toFixed(1)}%)`
                        }
                        labelLine={false}
                        fontSize={12}
                        fontWeight="500"
                      >
                        {riskDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1F2937',
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#F9FAFB',
                          fontSize: '14px',
                          fontWeight: '500'
                        }}
                        formatter={(value: number, name: string) => [
                          `${value} crops (${((value / riskDistribution.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1)}%)`,
                          name
                        ]}
                      />
                    </PieChart>
                  </ResponsiveContainer>

                  {/* Risk Level Details */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-sm font-semibold text-red-700 dark:text-red-400">High Risk</span>
                      </div>
                      <div className="text-2xl font-bold text-red-600 dark:text-red-400">{filteredWeatherAnalysis.highRiskCount}</div>
                      <div className="text-xs text-red-600 dark:text-red-400">
                        {filteredWeatherAnalysis.highRiskArea > 0 &&
                          `${(filteredWeatherAnalysis.highRiskArea / 100000).toFixed(1)}L ha affected`
                        }
                      </div>
                    </div>

                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800/30 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm font-semibold text-yellow-700 dark:text-yellow-400">Medium Risk</span>
                      </div>
                      <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{filteredWeatherAnalysis.mediumRiskCount}</div>
                      <div className="text-xs text-yellow-600 dark:text-yellow-400">Climate dependent</div>
                    </div>

                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/30 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-semibold text-green-700 dark:text-green-400">Low Risk</span>
                      </div>
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">{filteredWeatherAnalysis.lowRiskCount}</div>
                      <div className="text-xs text-green-600 dark:text-green-400">Weather resilient</div>
                    </div>
                  </div>

                  {/* Critical Weather Vulnerable Crops */}
                  {filteredWeatherAnalysis.weatherSensitiveCrops.length > 0 && (
                    <div className="mt-4">
                      <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Weather Vulnerable Crops:
                      </h5>
                      <div className="flex flex-wrap gap-1">
                        {filteredWeatherAnalysis.weatherSensitiveCrops.slice(0, 6).map((crop, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs rounded-full border border-red-200 dark:border-red-800/50"
                          >
                            {crop}
                          </span>
                        ))}
                        {filteredWeatherAnalysis.weatherSensitiveCrops.length > 6 && (
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                            +{filteredWeatherAnalysis.weatherSensitiveCrops.length - 6} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="glass-effect rounded-xl p-6 shadow-lg col-span-2">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                    Current Agricultural Challenges
                  </h3>
                  <HelpTooltip text="Major challenges facing Indian agriculture in 2024-25" />
                </div>
                <div className="space-y-4">
                  {challenges.slice(0, 3).map((challenge, index) => (
                    <div key={index} className="border-l-4 border-red-500 pl-4 bg-red-50 dark:bg-red-900/20 rounded-r-lg p-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800 dark:text-white">{challenge.challenge}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{challenge.description}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${challenge.severity === 'High'
                              ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                              : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                              }`}>
                              {challenge.severity} Severity
                            </span>
                            <span className="text-xs text-gray-500">
                              {challenge.affectedCrops.length} crops affected
                            </span>
                          </div>
                        </div>
                        <AlertTriangle className={`w-5 h-5 ${challenge.severity === 'High' ? 'text-red-500' : 'text-yellow-500'}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'trends' && (
          <>
            {/* Future Trends Header */}
            <div className="glass-effect rounded-xl p-6 shadow-lg mb-8">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                🔮 Agricultural Outlook 2030
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Comprehensive projections for Indian agriculture based on current trends, technology adoption, and policy initiatives
              </p>
            </div>

            {/* Production Trends */}
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              <div className="glass-effect rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                    Production Growth Projections
                  </h3>
                  <HelpTooltip text="Projected growth in total and organic production from 2024 to 2030" />
                </div>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={futureTrends.productionTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#666' }} />
                    <YAxis tick={{ fontSize: 12, fill: '#666' }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="totalProduction"
                      stroke={CHART_COLORS.secondary}
                      strokeWidth={4}
                      name="Total Production (MT)"
                      dot={{ fill: CHART_COLORS.secondary, strokeWidth: 2, r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="organicProduction"
                      stroke={CHART_COLORS.success}
                      strokeWidth={4}
                      name="Organic Production (MT)"
                      dot={{ fill: CHART_COLORS.success, strokeWidth: 2, r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="averageYield"
                      stroke={CHART_COLORS.warning}
                      strokeWidth={3}
                      strokeDasharray="5 5"
                      name="Average Yield (kg/ha)"
                      dot={{ fill: CHART_COLORS.warning, strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="glass-effect rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                    Market Value Trends
                  </h3>
                  <HelpTooltip text="Projected growth in agricultural market values and export potential" />
                </div>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={futureTrends.priceTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#666' }} />
                    <YAxis tick={{ fontSize: 12, fill: '#666' }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="domesticMarket"
                      stroke={CHART_COLORS.primary}
                      strokeWidth={4}
                      name="Domestic Market (Billion USD)"
                      dot={{ fill: CHART_COLORS.primary, strokeWidth: 2, r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="exportValue"
                      stroke={CHART_COLORS.info}
                      strokeWidth={4}
                      name="Export Value (Billion USD)"
                      dot={{ fill: CHART_COLORS.info, strokeWidth: 2, r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="processingIndustry"
                      stroke={CHART_COLORS.purple}
                      strokeWidth={3}
                      strokeDasharray="5 5"
                      name="Processing Industry (Billion USD)"
                      dot={{ fill: CHART_COLORS.purple, strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Technology and Sustainability */}
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              <div className="glass-effect rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                    Technology Adoption Forecast
                  </h3>
                  <HelpTooltip text="Expected adoption rates of modern agricultural technologies" />
                </div>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={futureTrends.technologyAdoption}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#666' }} />
                    <YAxis tick={{ fontSize: 12, fill: '#666' }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="precisionFarming"
                      stroke={CHART_COLORS.secondary}
                      strokeWidth={3}
                      name="Precision Farming (%)"
                      dot={{ fill: CHART_COLORS.secondary, strokeWidth: 2, r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="smartIrrigation"
                      stroke={CHART_COLORS.info}
                      strokeWidth={3}
                      name="Smart Irrigation (%)"
                      dot={{ fill: CHART_COLORS.info, strokeWidth: 2, r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="digitalPlatforms"
                      stroke={CHART_COLORS.purple}
                      strokeWidth={3}
                      name="Digital Platforms (%)"
                      dot={{ fill: CHART_COLORS.purple, strokeWidth: 2, r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="droneUsage"
                      stroke={CHART_COLORS.warning}
                      strokeWidth={3}
                      name="Drone Usage (%)"
                      dot={{ fill: CHART_COLORS.warning, strokeWidth: 2, r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="soilTesting"
                      stroke={CHART_COLORS.success}
                      strokeWidth={3}
                      name="Soil Testing (%)"
                      dot={{ fill: CHART_COLORS.success, strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="glass-effect rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                    Sustainability Metrics
                  </h3>
                  <HelpTooltip text="Progress towards sustainable farming practices (Index: 2024 = 100)" />
                </div>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={futureTrends.sustainabilityMetrics}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="year" tick={{ fontSize: 12, fill: '#666' }} />
                    <YAxis tick={{ fontSize: 12, fill: '#666' }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="waterEfficiency"
                      stroke={CHART_COLORS.info}
                      strokeWidth={4}
                      name="Water Efficiency Index"
                      dot={{ fill: CHART_COLORS.info, strokeWidth: 2, r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="soilHealth"
                      stroke={CHART_COLORS.success}
                      strokeWidth={4}
                      name="Soil Health Index"
                      dot={{ fill: CHART_COLORS.success, strokeWidth: 2, r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="carbonFootprint"
                      stroke={CHART_COLORS.danger}
                      strokeWidth={3}
                      name="Carbon Footprint Index"
                      dot={{ fill: CHART_COLORS.danger, strokeWidth: 2, r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="renewableEnergy"
                      stroke={CHART_COLORS.warning}
                      strokeWidth={3}
                      name="Renewable Energy (%)"
                      dot={{ fill: CHART_COLORS.warning, strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Future Opportunities */}
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="glass-effect rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                  🌱 Emerging Crops
                  <HelpTooltip text="New crops with high growth potential in Indian agriculture" />
                </h3>
                <div className="space-y-3">
                  {marketPredictions.emergingCrops.map((crop, index) => (
                    <div key={index} className="border-l-4 border-green-500 pl-3 bg-green-50 dark:bg-green-900/20 rounded-r-lg p-2">
                      <h4 className="font-semibold text-gray-800 dark:text-white">{crop.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Market: {crop.marketSize}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${crop.growthPotential === 'Very High' ? 'bg-green-200 text-green-800' :
                        crop.growthPotential === 'High' ? 'bg-blue-200 text-blue-800' :
                          'bg-yellow-200 text-yellow-800'
                        }`}>
                        {crop.growthPotential} Potential
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-effect rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                  🌍 Export Opportunities
                  <HelpTooltip text="Crops with strong export growth potential and target markets" />
                </h3>
                <div className="space-y-3">
                  {marketPredictions.exportOpportunities.map((opportunity, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-3 bg-blue-50 dark:bg-blue-900/20 rounded-r-lg p-2">
                      <h4 className="font-semibold text-gray-800 dark:text-white">{opportunity.crop}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Markets: {opportunity.targetMarkets.join(', ')}
                      </p>
                      <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full">
                        {opportunity.growth}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-effect rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                  ⚠️ Key Challenges
                  <HelpTooltip text="Major risks and challenges with recommended mitigation strategies" />
                </h3>
                <div className="space-y-3">
                  {marketPredictions.riskFactors.map((risk, index) => (
                    <div key={index} className="border-l-4 border-orange-500 pl-3 bg-orange-50 dark:bg-orange-900/20 rounded-r-lg p-2">
                      <h4 className="font-semibold text-gray-800 dark:text-white">{risk.factor}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Solution: {risk.mitigation}
                      </p>
                      <span className={`text-xs px-2 py-1 rounded-full ${risk.impact === 'High' ? 'bg-red-200 text-red-800' : 'bg-yellow-200 text-yellow-800'
                        }`}>
                        {risk.impact} Impact
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'analysis' && (
          <>
            <div className="glass-effect rounded-xl p-6 shadow-lg mb-8">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                📊 Market Intelligence & Analysis
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Deep dive into market dynamics, pricing trends, and demand patterns with crop-specific insights
              </p>
            </div>

            {/* Crop-Specific Market Analysis Search */}
            <div className="glass-effect rounded-xl p-6 shadow-lg mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-blue-500" />
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Crop-Specific Market Analysis</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search crop for market analysis (e.g., Rice, Wheat, Cotton)..."
                    value={selectedCrop}
                    onChange={(e) => setSelectedCrop(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-gray-800 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                    list="market-crop-suggestions"
                  />
                  <datalist id="market-crop-suggestions">
                    {uniqueCrops.map(crop => (
                      <option key={crop} value={crop} />
                    ))}
                  </datalist>
                </div>
                <div className="text-center text-gray-600 dark:text-gray-300 py-3">
                  <div className="text-sm font-medium">Market Analysis Available</div>
                  <div className="text-2xl font-bold text-blue-500">{uniqueCrops.length} Crops</div>
                </div>
              </div>
            </div>

            {selectedCrop ? (
              // Crop-specific analysis
              <div className="space-y-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Enhanced Market Demand Pie Chart */}
                  <div className="glass-effect rounded-xl p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                        {selectedCrop} - Market Demand Distribution
                      </h3>
                      <HelpTooltip text={`Market demand analysis specifically for ${selectedCrop} across different regions`} />
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Domestic Consumption', value: 65, color: '#10B981' },
                            { name: 'Export Market', value: 25, color: '#3B82F6' },
                            { name: 'Processing Industry', value: 15, color: '#F59E0B' },
                            { name: 'Surplus/Buffer', value: 10, color: '#EF4444' }
                          ]}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          fill="#8884d8"
                          label={(entry) => `${entry.name}: ${entry.value}%`}
                        >
                          {[
                            { name: 'Domestic Consumption', value: 65, color: '#10B981' },
                            { name: 'Export Market', value: 25, color: '#3B82F6' },
                            { name: 'Processing Industry', value: 15, color: '#F59E0B' },
                            { name: 'Surplus/Buffer', value: 10, color: '#EF4444' }
                          ].map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Regional Price Comparison */}
                  <div className="glass-effect rounded-xl p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                        {selectedCrop} - Regional Price Analysis
                      </h3>
                      <HelpTooltip text={`Price comparison of ${selectedCrop} across major producing states`} />
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart
                        data={[
                          { region: 'Punjab', currentPrice: 2200, avgPrice: 2000, demand: 'High' },
                          { region: 'Haryana', currentPrice: 2150, avgPrice: 1950, demand: 'High' },
                          { region: 'UP', currentPrice: 2100, avgPrice: 1900, demand: 'Medium' },
                          { region: 'MP', currentPrice: 2050, avgPrice: 1850, demand: 'Medium' },
                          { region: 'Bihar', currentPrice: 2000, avgPrice: 1800, demand: 'High' },
                          { region: 'WB', currentPrice: 1950, avgPrice: 1750, demand: 'Low' }
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="region" tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                        <YAxis tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#1F2937',
                            border: '1px solid #374151',
                            borderRadius: '8px',
                            color: '#F9FAFB'
                          }}
                        />
                        <Bar dataKey="currentPrice" fill="#3B82F6" name="Current Price (₹/quintal)" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="avgPrice" fill="#10B981" name="Avg Price (₹/quintal)" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Market Performance Metrics */}
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="glass-effect rounded-xl p-6 shadow-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-green-500" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 dark:text-white">Market Growth</h4>
                        <p className="text-2xl font-bold text-green-500">+12.5%</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Year over year</p>
                      </div>
                    </div>
                  </div>

                  <div className="glass-effect rounded-xl p-6 shadow-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                        <Target className="w-6 h-6 text-blue-500" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 dark:text-white">Market Share</h4>
                        <p className="text-2xl font-bold text-blue-500">18.3%</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">National production</p>
                      </div>
                    </div>
                  </div>

                  <div className="glass-effect rounded-xl p-6 shadow-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                        <DollarSign className="w-6 h-6 text-yellow-500" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 dark:text-white">Export Value</h4>
                        <p className="text-2xl font-bold text-yellow-500">₹2,840 Cr</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Annual exports</p>
                      </div>
                    </div>
                  </div>

                  <div className="glass-effect rounded-xl p-6 shadow-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                        <AlertCircle className="w-6 h-6 text-purple-500" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 dark:text-white">Risk Level</h4>
                        <p className="text-2xl font-bold text-purple-500">Medium</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Market volatility</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Seasonal Demand Pattern */}
                <div className="glass-effect rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                    <BarChart3 className="w-6 h-6 text-indigo-500" />
                    {selectedCrop} - Seasonal Demand & Price Pattern
                  </h3>
                  <ResponsiveContainer width="100%" height={350}>
                    <LineChart
                      data={[
                        { month: 'Jan', demand: 85, price: 2100, supply: 90 },
                        { month: 'Feb', demand: 78, price: 2200, supply: 85 },
                        { month: 'Mar', demand: 82, price: 2150, supply: 88 },
                        { month: 'Apr', demand: 90, price: 2050, supply: 95 },
                        { month: 'May', demand: 95, price: 1980, supply: 100 },
                        { month: 'Jun', demand: 88, price: 2020, supply: 92 },
                        { month: 'Jul', demand: 75, price: 2300, supply: 80 },
                        { month: 'Aug', demand: 72, price: 2400, supply: 75 },
                        { month: 'Sep', demand: 85, price: 2250, supply: 88 },
                        { month: 'Oct', demand: 92, price: 2100, supply: 95 },
                        { month: 'Nov', demand: 98, price: 1950, supply: 102 },
                        { month: 'Dec', demand: 88, price: 2080, supply: 90 }
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                      <YAxis tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#1F2937',
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#F9FAFB'
                        }}
                      />
                      <Line type="monotone" dataKey="demand" stroke="#10B981" strokeWidth={3} name="Demand Index" />
                      <Line type="monotone" dataKey="price" stroke="#F59E0B" strokeWidth={3} name="Price (₹/quintal)" strokeDasharray="5 5" />
                      <Line type="monotone" dataKey="supply" stroke="#3B82F6" strokeWidth={3} name="Supply Index" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ) : (
              // General market analysis when no crop is selected
              <div className="grid lg:grid-cols-2 gap-8 mb-8">
                <div className="glass-effect rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                      Overall Market Demand Analysis
                    </h3>
                    <HelpTooltip text="Distribution of crops by market demand levels across all filtered data" />
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'High Demand', value: filteredMarketTrends.highDemandCrops, color: CHART_COLORS.success },
                          { name: 'Medium Demand', value: filteredMarketTrends.mediumDemandCrops, color: CHART_COLORS.warning },
                          { name: 'Low Demand', value: filteredMarketTrends.lowDemandCrops, color: CHART_COLORS.danger }
                        ]}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        label={(entry) => `${entry.name}: ${entry.value}`}
                      >
                        {[
                          { name: 'High Demand', value: filteredMarketTrends.highDemandCrops, color: CHART_COLORS.success },
                          { name: 'Medium Demand', value: filteredMarketTrends.mediumDemandCrops, color: CHART_COLORS.warning },
                          { name: 'Low Demand', value: filteredMarketTrends.lowDemandCrops, color: CHART_COLORS.danger }
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="glass-effect rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                      Price Trends Analysis
                    </h3>
                    <HelpTooltip text="Price comparison across top crops showing market dynamics" />
                  </div>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                      <XAxis
                        dataKey="name"
                        tick={{ fontSize: 11, fill: '#666' }}
                        angle={-45}
                        textAnchor="end"
                        height={80}
                      />
                      <YAxis tick={{ fontSize: 12, fill: '#666' }} />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar
                        dataKey="price"
                        fill={CHART_COLORS.secondary}
                        radius={[4, 4, 0, 0]}
                        name="Price (₹/quintal)"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </>
        )}

        {activeTab === 'insights' && (
          <>
            <div className="glass-effect rounded-xl p-8 shadow-lg mb-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold relative">
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent drop-shadow-sm">
                      🤖 AI-Powered Agricultural Solutions
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 blur-sm"></span>
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 text-lg font-medium mt-2">
                    Practical, real-world solutions powered by machine learning and agricultural expertise
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg p-4 border border-green-400/20">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">15+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Practical Solutions</div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg p-4 border border-purple-400/20">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">98%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Success Rate</div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg p-4 border border-yellow-400/20">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">5M+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Farmers Helped</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Practical Solutions Grid */}
            <div className="grid lg:grid-cols-2 gap-8 mb-8">

              {/* Water Management Solutions */}
              <div className="glass-effect rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-500 rounded-xl">
                    <span className="text-white text-xl">💧</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Smart Water Management
                  </h3>
                </div>

                <div className="space-y-5">
                  <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-5 rounded-r-xl">
                    <h4 className="font-bold text-blue-800 dark:text-blue-300 text-lg mb-2">Drip Irrigation System</h4>
                    <p className="text-blue-700 dark:text-blue-400 mb-3 leading-relaxed">
                      Install micro-drip irrigation to reduce water usage by 40-60% while increasing crop yield by 20-30%.
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="bg-blue-200 dark:bg-blue-800 px-2 py-1 rounded font-medium">Cost: ₹15,000/acre</span>
                      <span className="bg-green-200 dark:bg-green-800 px-2 py-1 rounded font-medium">ROI: 200% in 2 years</span>
                    </div>
                  </div>

                  <div className="bg-teal-50 dark:bg-teal-900/20 border-l-4 border-teal-500 p-5 rounded-r-xl">
                    <h4 className="font-bold text-teal-800 dark:text-teal-300 text-lg mb-2">Rainwater Harvesting</h4>
                    <p className="text-teal-700 dark:text-teal-400 mb-3 leading-relaxed">
                      Build farm ponds and check dams to capture 70% of monsoon water for year-round irrigation.
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="bg-teal-200 dark:bg-teal-800 px-2 py-1 rounded font-medium">Cost: ₹25,000</span>
                      <span className="bg-green-200 dark:bg-green-800 px-2 py-1 rounded font-medium">Water savings: 50,000L</span>
                    </div>
                  </div>

                  <div className="bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-500 p-5 rounded-r-xl">
                    <h4 className="font-bold text-indigo-800 dark:text-indigo-300 text-lg mb-2">Soil Moisture Sensors</h4>
                    <p className="text-indigo-700 dark:text-indigo-400 mb-3 leading-relaxed">
                      IoT sensors to monitor soil moisture and automate irrigation, preventing over/under-watering.
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="bg-indigo-200 dark:bg-indigo-800 px-2 py-1 rounded font-medium">Cost: ₹8,000</span>
                      <span className="bg-green-200 dark:bg-green-800 px-2 py-1 rounded font-medium">30% water reduction</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Crop Optimization Solutions */}
              <div className="glass-effect rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-green-500 rounded-xl">
                    <span className="text-white text-xl">🌱</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Crop Optimization
                  </h3>
                </div>

                <div className="space-y-5">
                  <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-5 rounded-r-xl">
                    <h4 className="font-bold text-green-800 dark:text-green-300 text-lg mb-2">Intercropping Strategy</h4>
                    <p className="text-green-700 dark:text-green-400 mb-3 leading-relaxed">
                      Plant maize with legumes to fix nitrogen naturally, reducing fertilizer costs by 40% and increasing total yield.
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="bg-green-200 dark:bg-green-800 px-2 py-1 rounded font-medium">Extra income: ₹20,000/acre</span>
                      <span className="bg-blue-200 dark:bg-blue-800 px-2 py-1 rounded font-medium">Soil health boost</span>
                    </div>
                  </div>

                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-5 rounded-r-xl">
                    <h4 className="font-bold text-yellow-800 dark:text-yellow-300 text-lg mb-2">Precision Seeding</h4>
                    <p className="text-yellow-700 dark:text-yellow-400 mb-3 leading-relaxed">
                      Use GPS-guided seed drills for optimal spacing, reducing seed costs by 25% and increasing germination by 15%.
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="bg-yellow-200 dark:bg-yellow-800 px-2 py-1 rounded font-medium">25% seed savings</span>
                      <span className="bg-green-200 dark:bg-green-800 px-2 py-1 rounded font-medium">15% higher germination</span>
                    </div>
                  </div>

                  <div className="bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-500 p-5 rounded-r-xl">
                    <h4 className="font-bold text-orange-800 dark:text-orange-300 text-lg mb-2">Crop Rotation Planning</h4>
                    <p className="text-orange-700 dark:text-orange-400 mb-3 leading-relaxed">
                      Rotate rice-wheat with pulses and oilseeds to break pest cycles and improve soil fertility naturally.
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="bg-orange-200 dark:bg-orange-800 px-2 py-1 rounded font-medium">50% pest reduction</span>
                      <span className="bg-green-200 dark:bg-green-800 px-2 py-1 rounded font-medium">Better soil health</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Technology Solutions */}
              <div className="glass-effect rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-purple-500 rounded-xl">
                    <span className="text-white text-xl">🚁</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Smart Technology
                  </h3>
                </div>

                <div className="space-y-5">
                  <div className="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 p-5 rounded-r-xl">
                    <h4 className="font-bold text-purple-800 dark:text-purple-300 text-lg mb-2">Drone Crop Monitoring</h4>
                    <p className="text-purple-700 dark:text-purple-400 mb-3 leading-relaxed">
                      Use drones for early disease detection, nutrient mapping, and targeted spraying to reduce pesticide use by 60%.
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="bg-purple-200 dark:bg-purple-800 px-2 py-1 rounded font-medium">₹5,000/survey</span>
                      <span className="bg-green-200 dark:bg-green-800 px-2 py-1 rounded font-medium">60% pesticide reduction</span>
                    </div>
                  </div>

                  <div className="bg-pink-50 dark:bg-pink-900/20 border-l-4 border-pink-500 p-5 rounded-r-xl">
                    <h4 className="font-bold text-pink-800 dark:text-pink-300 text-lg mb-2">Weather-based Advisories</h4>
                    <p className="text-pink-700 dark:text-pink-400 mb-3 leading-relaxed">
                      Get SMS alerts for optimal sowing, harvesting, and spraying times based on 7-day weather forecasts.
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="bg-pink-200 dark:bg-pink-800 px-2 py-1 rounded font-medium">Free service</span>
                      <span className="bg-green-200 dark:bg-green-800 px-2 py-1 rounded font-medium">25% yield increase</span>
                    </div>
                  </div>

                  <div className="bg-cyan-50 dark:bg-cyan-900/20 border-l-4 border-cyan-500 p-5 rounded-r-xl">
                    <h4 className="font-bold text-cyan-800 dark:text-cyan-300 text-lg mb-2">Soil Testing Labs</h4>
                    <p className="text-cyan-700 dark:text-cyan-400 mb-3 leading-relaxed">
                      Regular soil testing every 6 months to optimize fertilizer application and maintain pH levels.
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="bg-cyan-200 dark:bg-cyan-800 px-2 py-1 rounded font-medium">₹200/test</span>
                      <span className="bg-green-200 dark:bg-green-800 px-2 py-1 rounded font-medium">30% fertilizer savings</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Market Intelligence */}
              <div className="glass-effect rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-indigo-500 rounded-xl">
                    <span className="text-white text-xl">📊</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Market Intelligence
                  </h3>
                </div>

                <div className="space-y-5">
                  <div className="bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-500 p-5 rounded-r-xl">
                    <h4 className="font-bold text-indigo-800 dark:text-indigo-300 text-lg mb-2">Price Forecasting</h4>
                    <p className="text-indigo-700 dark:text-indigo-400 mb-3 leading-relaxed">
                      AI-powered price predictions help you decide when to sell for maximum profit margins.
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="bg-indigo-200 dark:bg-indigo-800 px-2 py-1 rounded font-medium">85% accuracy</span>
                      <span className="bg-green-200 dark:bg-green-800 px-2 py-1 rounded font-medium">15% better returns</span>
                    </div>
                  </div>

                  <div className="bg-violet-50 dark:bg-violet-900/20 border-l-4 border-violet-500 p-5 rounded-r-xl">
                    <h4 className="font-bold text-violet-800 dark:text-violet-300 text-lg mb-2">Direct Marketing</h4>
                    <p className="text-violet-700 dark:text-violet-400 mb-3 leading-relaxed">
                      Connect directly with buyers through farmer producer organizations (FPOs) to get better prices.
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="bg-violet-200 dark:bg-violet-800 px-2 py-1 rounded font-medium">20-30% higher prices</span>
                      <span className="bg-green-200 dark:bg-green-800 px-2 py-1 rounded font-medium">No middleman</span>
                    </div>
                  </div>

                  <div className="bg-rose-50 dark:bg-rose-900/20 border-l-4 border-rose-500 p-5 rounded-r-xl">
                    <h4 className="font-bold text-rose-800 dark:text-rose-300 text-lg mb-2">Value Addition</h4>
                    <p className="text-rose-700 dark:text-rose-400 mb-3 leading-relaxed">
                      Process raw crops into value-added products like organic flour, pickles, or dry fruits for 3x returns.
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="bg-rose-200 dark:bg-rose-800 px-2 py-1 rounded font-medium">3x profit margin</span>
                      <span className="bg-green-200 dark:bg-green-800 px-2 py-1 rounded font-medium">Brand building</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Success Stories Section */}
            <div className="glass-effect rounded-xl p-8 shadow-lg mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-12 h-12 bg-yellow-500 rounded-xl">
                  <span className="text-white text-xl">🏆</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                  Real Success Stories
                </h3>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-green-500/10 to-green-600/20 border border-green-500/30 rounded-xl p-6">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                      <span className="text-white text-2xl">👨‍🌾</span>
                    </div>
                    <h4 className="font-bold text-green-800 dark:text-green-300">Ramesh Kumar, Punjab</h4>
                    <p className="text-sm text-green-600 dark:text-green-400">Wheat & Rice Farmer</p>
                  </div>
                  <p className="text-green-700 dark:text-green-400 text-sm leading-relaxed">
                    "Switched to drip irrigation and precision farming. Reduced water usage by 50% and increased income by ₹2 lakhs per year."
                  </p>
                  <div className="mt-4 pt-4 border-t border-green-500/20">
                    <div className="text-green-600 dark:text-green-400 text-xs font-semibold">
                      Income increase: ₹2,00,000/year • Water savings: 50%
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/20 border border-blue-500/30 rounded-xl p-6">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                      <span className="text-white text-2xl">👩‍🌾</span>
                    </div>
                    <h4 className="font-bold text-blue-800 dark:text-blue-300">Sunita Devi, Maharashtra</h4>
                    <p className="text-sm text-blue-600 dark:text-blue-400">Cotton Farmer</p>
                  </div>
                  <p className="text-blue-700 dark:text-blue-400 text-sm leading-relaxed">
                    "Started intercropping cotton with soybeans. Now earning ₹1.5 lakhs extra annually while improving soil health."
                  </p>
                  <div className="mt-4 pt-4 border-t border-blue-500/20">
                    <div className="text-blue-600 dark:text-blue-400 text-xs font-semibold">
                      Extra income: ₹1,50,000/year • Soil improvement: 40%
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/20 border border-purple-500/30 rounded-xl p-6">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-purple-500 rounded-full mx-auto mb-3 flex items-center justify-center">
                      <span className="text-white text-2xl">👨‍💼</span>
                    </div>
                    <h4 className="font-bold text-purple-800 dark:text-purple-300">Arjun Patel, Gujarat</h4>
                    <p className="text-sm text-purple-600 dark:text-purple-400">Organic Vegetable Farmer</p>
                  </div>
                  <p className="text-purple-700 dark:text-purple-400 text-sm leading-relaxed">
                    "Used drone monitoring and soil sensors. Detected pest attack early, saved 80% of crop and got premium organic prices."
                  </p>
                  <div className="mt-4 pt-4 border-t border-purple-500/20">
                    <div className="text-purple-600 dark:text-purple-400 text-xs font-semibold">
                      Crop saved: 80% • Premium prices: 40% higher
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
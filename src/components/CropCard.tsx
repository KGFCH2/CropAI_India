import React from 'react';
import { TrendingUp, TrendingDown, MapPin, DollarSign, Droplets, AlertTriangle } from 'lucide-react';

interface CropCardProps {
  crop: {
    name: string;
    state: string;
    yield: number;
    change: number;
    season: string;
    area: number;
    price: number;
    productionCost: number;
    marketDemand: 'High' | 'Medium' | 'Low';
    weatherRisk: 'High' | 'Medium' | 'Low';
    soilType: string;
    irrigationType: string;
  };
}

export const CropCard: React.FC<CropCardProps> = ({ crop }) => {
  const isPositive = crop.change >= 0;
  const revenue = (crop.yield * crop.price) / 100; // Price per quintal, yield in kg/ha
  const profit = revenue - crop.productionCost;
  const profitMargin = ((profit / revenue) * 100);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'High': return 'text-red-500';
      case 'Medium': return 'text-yellow-500';
      case 'Low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'High': return 'text-green-600';
      case 'Medium': return 'text-yellow-600';
      case 'Low': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="card-flip group">
      <div className="card-flip-inner relative h-52">
        <div className="card-flip-front glass-effect rounded-lg p-4 shadow-lg overflow-hidden">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-base font-semibold text-gray-800 dark:text-white leading-tight flex-1 pr-2 truncate">
              {crop.name}
            </h3>
            <div className={`flex items-center space-x-1 flex-shrink-0 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              <span className="text-xs font-medium whitespace-nowrap">{crop.change > 0 ? '+' : ''}{crop.change}%</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-300">
              <MapPin className="w-3 h-3 flex-shrink-0" />
              <span className="text-xs truncate">{crop.state}</span>
            </div>
            <div className="text-lg font-bold text-gray-800 dark:text-white">
              {crop.yield.toLocaleString()} kg/ha
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 dark:text-gray-400 truncate flex-1">{crop.season} Season</span>
              <div className="flex items-center space-x-1 flex-shrink-0 ml-2">
                <DollarSign className="w-3 h-3 text-green-500" />
                <span className="text-xs font-medium text-gray-800 dark:text-white whitespace-nowrap">₹{crop.price}/q</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card-flip-back glass-effect rounded-lg p-4 shadow-lg overflow-hidden">
          <h4 className="text-base font-semibold text-gray-800 dark:text-white mb-3 truncate">
            Economics & Risk
          </h4>
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300 truncate flex-1">Revenue/ha:</span>
              <span className="font-medium text-gray-800 dark:text-white ml-2 whitespace-nowrap">₹{revenue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300 truncate flex-1">Cost/ha:</span>
              <span className="font-medium text-gray-800 dark:text-white ml-2 whitespace-nowrap">₹{crop.productionCost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300 truncate flex-1">Profit Margin:</span>
              <span className={`font-medium ml-2 whitespace-nowrap ${profit > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {profitMargin.toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300 truncate flex-1">Market Demand:</span>
              <span className={`font-medium ml-2 ${getDemandColor(crop.marketDemand)}`}>{crop.marketDemand}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300 flex items-center flex-1 min-w-0">
                <AlertTriangle className="w-3 h-3 mr-1 flex-shrink-0" />
                <span className="truncate">Weather Risk:</span>
              </span>
              <span className={`font-medium ml-2 ${getRiskColor(crop.weatherRisk)}`}>{crop.weatherRisk}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300 flex items-center flex-1 min-w-0">
                <Droplets className="w-3 h-3 mr-1 flex-shrink-0" />
                <span className="truncate">Irrigation:</span>
              </span>
              <span className="font-medium text-blue-600 text-xs ml-2 truncate max-w-20">{crop.irrigationType}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
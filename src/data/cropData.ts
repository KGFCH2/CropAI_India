export interface CropData {
  name: string;
  state: string;
  yield: number;
  change: number;
  season: string;
  area: number;
  price: number; // ₹ per quintal
  productionCost: number; // ₹ per hectare
  marketDemand: 'High' | 'Medium' | 'Low';
  weatherRisk: 'High' | 'Medium' | 'Low';
  soilType: string;
  irrigationType: string;
}

export const cropYieldData: CropData[] = [
  // North India - Punjab, Haryana, Himachal Pradesh, Jammu & Kashmir, Uttarakhand, Delhi, Chandigarh
  {
    name: 'Rice (Basmati)',
    state: 'Punjab',
    yield: 4850,
    change: 3.2,
    season: 'Kharif',
    area: 1200000,
    price: 2400,
    productionCost: 42000,
    marketDemand: 'High',
    weatherRisk: 'Medium',
    soilType: 'Alluvial',
    irrigationType: 'Canal + Tube well'
  },
  {
    name: 'Wheat',
    state: 'Punjab',
    yield: 5100,
    change: 4.2,
    season: 'Rabi',
    area: 3500000,
    price: 2125,
    productionCost: 45000,
    marketDemand: 'High',
    weatherRisk: 'Low',
    soilType: 'Alluvial',
    irrigationType: 'Canal + Tube well'
  },
  {
    name: 'Cotton',
    state: 'Haryana',
    yield: 680,
    change: 6.8,
    season: 'Kharif',
    area: 650000,
    price: 6200,
    productionCost: 52000,
    marketDemand: 'High',
    weatherRisk: 'Medium',
    soilType: 'Alluvial',
    irrigationType: 'Tube well'
  },
  {
    name: 'Apple',
    state: 'Himachal Pradesh',
    yield: 16800,
    change: -1.2,
    season: 'Annual',
    area: 125000,
    price: 8500,
    productionCost: 150000,
    marketDemand: 'High',
    weatherRisk: 'High',
    soilType: 'Mountain',
    irrigationType: 'Sprinkler'
  },
  {
    name: 'Saffron',
    state: 'Jammu & Kashmir',
    yield: 8,
    change: 15.2,
    season: 'Annual',
    area: 4500,
    price: 350000,
    productionCost: 280000,
    marketDemand: 'High',
    weatherRisk: 'High',
    soilType: 'Karewa',
    irrigationType: 'Rain fed'
  },
  {
    name: 'Medicinal Plants',
    state: 'Uttarakhand',
    yield: 850,
    change: 8.9,
    season: 'Annual',
    area: 95000,
    price: 25000,
    productionCost: 65000,
    marketDemand: 'High',
    weatherRisk: 'Medium',
    soilType: 'Hill',
    irrigationType: 'Rain fed'
  },

  // Central India - Uttar Pradesh, Madhya Pradesh, Chhattisgarh
  {
    name: 'Wheat',
    state: 'Uttar Pradesh',
    yield: 3650,
    change: -1.8,
    season: 'Rabi',
    area: 9500000,
    price: 2125,
    productionCost: 38000,
    marketDemand: 'High',
    weatherRisk: 'Low',
    soilType: 'Alluvial',
    irrigationType: 'Tube well'
  },
  {
    name: 'Sugarcane',
    state: 'Uttar Pradesh',
    yield: 78500,
    change: -3.4,
    season: 'Annual',
    area: 2100000,
    price: 380,
    productionCost: 95000,
    marketDemand: 'Medium',
    weatherRisk: 'Medium',
    soilType: 'Alluvial',
    irrigationType: 'Drip + Sprinkler'
  },
  {
    name: 'Soybean',
    state: 'Madhya Pradesh',
    yield: 1450,
    change: 4.3,
    season: 'Kharif',
    area: 5200000,
    price: 4200,
    productionCost: 28000,
    marketDemand: 'Medium',
    weatherRisk: 'High',
    soilType: 'Black',
    irrigationType: 'Rain fed'
  },
  {
    name: 'Wheat',
    state: 'Madhya Pradesh',
    yield: 3450,
    change: 2.1,
    season: 'Rabi',
    area: 5600000,
    price: 2125,
    productionCost: 35000,
    marketDemand: 'High',
    weatherRisk: 'Low',
    soilType: 'Black',
    irrigationType: 'Well + Canal'
  },
  {
    name: 'Rice',
    state: 'Chhattisgarh',
    yield: 3850,
    change: 6.2,
    season: 'Kharif',
    area: 3200000,
    price: 1950,
    productionCost: 32000,
    marketDemand: 'High',
    weatherRisk: 'Medium',
    soilType: 'Red',
    irrigationType: 'Rain fed + Canal'
  },

  // West India - Rajasthan, Gujarat, Maharashtra, Goa
  {
    name: 'Pulses (Chana)',
    state: 'Rajasthan',
    yield: 1650,
    change: 7.8,
    season: 'Rabi',
    area: 2800000,
    price: 5800,
    productionCost: 25000,
    marketDemand: 'High',
    weatherRisk: 'Medium',
    soilType: 'Sandy Loam',
    irrigationType: 'Rain fed + Well'
  },
  {
    name: 'Mustard',
    state: 'Rajasthan',
    yield: 1950,
    change: 2.1,
    season: 'Rabi',
    area: 4800000,
    price: 5200,
    productionCost: 22000,
    marketDemand: 'Medium',
    weatherRisk: 'Low',
    soilType: 'Sandy Loam',
    irrigationType: 'Rain fed'
  },
  {
    name: 'Cotton',
    state: 'Gujarat',
    yield: 720,
    change: 8.7,
    season: 'Kharif',
    area: 2400000,
    price: 6200,
    productionCost: 55000,
    marketDemand: 'High',
    weatherRisk: 'High',
    soilType: 'Black Cotton',
    irrigationType: 'Drip'
  },
  {
    name: 'Groundnut',
    state: 'Gujarat',
    yield: 2450,
    change: 6.2,
    season: 'Kharif',
    area: 1600000,
    price: 5500,
    productionCost: 35000,
    marketDemand: 'High',
    weatherRisk: 'Medium',
    soilType: 'Sandy',
    irrigationType: 'Drip + Rain'
  },
  {
    name: 'Sugarcane',
    state: 'Maharashtra',
    yield: 85000,
    change: -1.8,
    season: 'Annual',
    area: 1100000,
    price: 380,
    productionCost: 105000,
    marketDemand: 'Medium',
    weatherRisk: 'High',
    soilType: 'Black',
    irrigationType: 'Drip'
  },
  {
    name: 'Onion',
    state: 'Maharashtra',
    yield: 22500,
    change: -8.4,
    season: 'Rabi',
    area: 1450000,
    price: 2200,
    productionCost: 75000,
    marketDemand: 'High',
    weatherRisk: 'High',
    soilType: 'Black',
    irrigationType: 'Drip + Sprinkler'
  },
  {
    name: 'Grapes',
    state: 'Maharashtra',
    yield: 22500,
    change: 7.3,
    season: 'Annual',
    area: 165000,
    price: 6500,
    productionCost: 180000,
    marketDemand: 'High',
    weatherRisk: 'Medium',
    soilType: 'Black',
    irrigationType: 'Drip'
  },
  {
    name: 'Cashew',
    state: 'Goa',
    yield: 1200,
    change: 5.4,
    season: 'Annual',
    area: 58000,
    price: 18000,
    productionCost: 45000,
    marketDemand: 'High',
    weatherRisk: 'Medium',
    soilType: 'Laterite',
    irrigationType: 'Rain fed'
  },

  // East India - West Bengal, Bihar, Jharkhand, Odisha
  {
    name: 'Rice (Non-Basmati)',
    state: 'West Bengal',
    yield: 4200,
    change: 5.1,
    season: 'Kharif',
    area: 3800000,
    price: 1950,
    productionCost: 35000,
    marketDemand: 'High',
    weatherRisk: 'High',
    soilType: 'Alluvial',
    irrigationType: 'Canal + Rain'
  },
  {
    name: 'Potato',
    state: 'West Bengal',
    yield: 26800,
    change: 6.8,
    season: 'Rabi',
    area: 2200000,
    price: 1250,
    productionCost: 65000,
    marketDemand: 'High',
    weatherRisk: 'Medium',
    soilType: 'Alluvial',
    irrigationType: 'Tube well'
  },
  {
    name: 'Jute',
    state: 'West Bengal',
    yield: 2850,
    change: 3.2,
    season: 'Kharif',
    area: 650000,
    price: 4500,
    productionCost: 35000,
    marketDemand: 'Medium',
    weatherRisk: 'High',
    soilType: 'Alluvial',
    irrigationType: 'Rain fed'
  },
  {
    name: 'Maize',
    state: 'Bihar',
    yield: 3800,
    change: 12.4,
    season: 'Kharif',
    area: 2200000,
    price: 1850,
    productionCost: 32000,
    marketDemand: 'High',
    weatherRisk: 'Medium',
    soilType: 'Alluvial',
    irrigationType: 'Rain + Tube well'
  },
  {
    name: 'Wheat',
    state: 'Bihar',
    yield: 3200,
    change: 1.8,
    season: 'Rabi',
    area: 2100000,
    price: 2125,
    productionCost: 36000,
    marketDemand: 'High',
    weatherRisk: 'Low',
    soilType: 'Alluvial',
    irrigationType: 'Tube well'
  },
  {
    name: 'Lac',
    state: 'Jharkhand',
    yield: 650,
    change: 18.5,
    season: 'Annual',
    area: 85000,
    price: 45000,
    productionCost: 25000,
    marketDemand: 'High',
    weatherRisk: 'Medium',
    soilType: 'Red',
    irrigationType: 'Rain fed'
  },
  {
    name: 'Rice',
    state: 'Odisha',
    yield: 3650,
    change: 4.5,
    season: 'Kharif',
    area: 4200000,
    price: 1950,
    productionCost: 32000,
    marketDemand: 'High',
    weatherRisk: 'High',
    soilType: 'Red + Alluvial',
    irrigationType: 'Canal + Rain'
  },

  // South India - Karnataka, Tamil Nadu, Andhra Pradesh, Telangana, Kerala
  {
    name: 'Coffee (Arabica)',
    state: 'Karnataka',
    yield: 1350,
    change: 3.7,
    season: 'Annual',
    area: 185000,
    price: 45000,
    productionCost: 95000,
    marketDemand: 'High',
    weatherRisk: 'High',
    soilType: 'Red Laterite',
    irrigationType: 'Sprinkler'
  },
  {
    name: 'Tomato',
    state: 'Karnataka',
    yield: 28500,
    change: 9.6,
    season: 'Annual',
    area: 950000,
    price: 1800,
    productionCost: 85000,
    marketDemand: 'High',
    weatherRisk: 'High',
    soilType: 'Red',
    irrigationType: 'Drip'
  },
  {
    name: 'Ragi (Finger Millet)',
    state: 'Karnataka',
    yield: 2850,
    change: 11.2,
    season: 'Kharif',
    area: 850000,
    price: 3500,
    productionCost: 25000,
    marketDemand: 'High',
    weatherRisk: 'Low',
    soilType: 'Red',
    irrigationType: 'Rain fed'
  },
  {
    name: 'Banana',
    state: 'Tamil Nadu',
    yield: 65000,
    change: 4.5,
    season: 'Annual',
    area: 580000,
    price: 1500,
    productionCost: 120000,
    marketDemand: 'High',
    weatherRisk: 'Medium',
    soilType: 'Alluvial',
    irrigationType: 'Drip'
  },
  {
    name: 'Cotton',
    state: 'Tamil Nadu',
    yield: 580,
    change: 3.8,
    season: 'Kharif',
    area: 450000,
    price: 6200,
    productionCost: 48000,
    marketDemand: 'High',
    weatherRisk: 'High',
    soilType: 'Black',
    irrigationType: 'Well + Rain'
  },
  {
    name: 'Chili',
    state: 'Andhra Pradesh',
    yield: 4200,
    change: 15.2,
    season: 'Kharif',
    area: 850000,
    price: 8500,
    productionCost: 65000,
    marketDemand: 'High',
    weatherRisk: 'Medium',
    soilType: 'Red Sandy',
    irrigationType: 'Drip'
  },
  {
    name: 'Mango',
    state: 'Andhra Pradesh',
    yield: 18500,
    change: 2.8,
    season: 'Annual',
    area: 1800000,
    price: 4500,
    productionCost: 85000,
    marketDemand: 'High',
    weatherRisk: 'Medium',
    soilType: 'Red',
    irrigationType: 'Drip + Well'
  },
  {
    name: 'Turmeric',
    state: 'Telangana',
    yield: 9200,
    change: 11.3,
    season: 'Annual',
    area: 280000,
    price: 12500,
    productionCost: 85000,
    marketDemand: 'High',
    weatherRisk: 'Medium',
    soilType: 'Red',
    irrigationType: 'Drip'
  },
  {
    name: 'Cotton',
    state: 'Telangana',
    yield: 650,
    change: 7.5,
    season: 'Kharif',
    area: 1800000,
    price: 6200,
    productionCost: 52000,
    marketDemand: 'High',
    weatherRisk: 'High',
    soilType: 'Black',
    irrigationType: 'Drip + Bore well'
  },
  {
    name: 'Coconut',
    state: 'Kerala',
    yield: 8500,
    change: 1.9,
    season: 'Annual',
    area: 850000,
    price: 2800,
    productionCost: 45000,
    marketDemand: 'High',
    weatherRisk: 'Medium',
    soilType: 'Coastal Sandy',
    irrigationType: 'Rain fed'
  },
  {
    name: 'Cardamom',
    state: 'Kerala',
    yield: 450,
    change: 18.5,
    season: 'Annual',
    area: 85000,
    price: 125000,
    productionCost: 280000,
    marketDemand: 'High',
    weatherRisk: 'High',
    soilType: 'Forest',
    irrigationType: 'Sprinkler'
  },
  {
    name: 'Black Pepper',
    state: 'Kerala',
    yield: 680,
    change: 12.1,
    season: 'Annual',
    area: 185000,
    price: 65000,
    productionCost: 95000,
    marketDemand: 'High',
    weatherRisk: 'High',
    soilType: 'Laterite',
    irrigationType: 'Rain fed'
  },
  {
    name: 'Tea',
    state: 'Kerala',
    yield: 2650,
    change: 1.8,
    season: 'Annual',
    area: 65000,
    price: 28000,
    productionCost: 115000,
    marketDemand: 'High',
    weatherRisk: 'High',
    soilType: 'Acidic Hill',
    irrigationType: 'Rain fed'
  },

  // Northeast India - Assam, Arunachal Pradesh, Manipur, Meghalaya, Mizoram, Nagaland, Tripura, Sikkim
  {
    name: 'Tea',
    state: 'Assam',
    yield: 2850,
    change: -2.3,
    season: 'Annual',
    area: 320000,
    price: 28000,
    productionCost: 120000,
    marketDemand: 'High',
    weatherRisk: 'High',
    soilType: 'Acidic',
    irrigationType: 'Rain fed'
  },
  {
    name: 'Rice',
    state: 'Assam',
    yield: 2850,
    change: 2.1,
    season: 'Kharif',
    area: 2400000,
    price: 1950,
    productionCost: 28000,
    marketDemand: 'High',
    weatherRisk: 'High',
    soilType: 'Alluvial',
    irrigationType: 'Rain fed'
  },
  {
    name: 'Large Cardamom',
    state: 'Sikkim',
    yield: 380,
    change: 12.8,
    season: 'Annual',
    area: 25000,
    price: 85000,
    productionCost: 180000,
    marketDemand: 'High',
    weatherRisk: 'High',
    soilType: 'Mountain',
    irrigationType: 'Rain fed'
  },
  {
    name: 'Orange',
    state: 'Nagaland',
    yield: 12500,
    change: 8.5,
    season: 'Annual',
    area: 45000,
    price: 3500,
    productionCost: 65000,
    marketDemand: 'High',
    weatherRisk: 'Medium',
    soilType: 'Hill',
    irrigationType: 'Rain fed'
  },
  {
    name: 'Pineapple',
    state: 'Tripura',
    yield: 18500,
    change: 6.8,
    season: 'Annual',
    area: 85000,
    price: 2200,
    productionCost: 55000,
    marketDemand: 'High',
    weatherRisk: 'Medium',
    soilType: 'Red Hill',
    irrigationType: 'Rain fed'
  },
  {
    name: 'Ginger',
    state: 'Meghalaya',
    yield: 8500,
    change: 15.2,
    season: 'Annual',
    area: 15000,
    price: 12000,
    productionCost: 45000,
    marketDemand: 'High',
    weatherRisk: 'Medium',
    soilType: 'Hill',
    irrigationType: 'Rain fed'
  },
  {
    name: 'Bamboo',
    state: 'Mizoram',
    yield: 12000,
    change: 9.5,
    season: 'Annual',
    area: 95000,
    price: 1800,
    productionCost: 25000,
    marketDemand: 'Medium',
    weatherRisk: 'Low',
    soilType: 'Hill',
    irrigationType: 'Rain fed'
  },
  {
    name: 'Kiwi',
    state: 'Arunachal Pradesh',
    yield: 8500,
    change: 18.2,
    season: 'Annual',
    area: 8500,
    price: 15000,
    productionCost: 95000,
    marketDemand: 'High',
    weatherRisk: 'Medium',
    soilType: 'Mountain',
    irrigationType: 'Sprinkler'
  },
  {
    name: 'Black Sesame',
    state: 'Manipur',
    yield: 850,
    change: 7.2,
    season: 'Kharif',
    area: 45000,
    price: 8500,
    productionCost: 35000,
    marketDemand: 'High',
    weatherRisk: 'Medium',
    soilType: 'Hill',
    irrigationType: 'Rain fed'
  },

  // Union Territories
  {
    name: 'Vegetables',
    state: 'Delhi',
    yield: 25000,
    change: 5.2,
    season: 'Annual',
    area: 15000,
    price: 2500,
    productionCost: 95000,
    marketDemand: 'High',
    weatherRisk: 'Medium',
    soilType: 'Alluvial',
    irrigationType: 'Drip + Sprinkler'
  },
  {
    name: 'Flowers',
    state: 'Chandigarh',
    yield: 45000,
    change: 8.5,
    season: 'Annual',
    area: 2500,
    price: 5500,
    productionCost: 125000,
    marketDemand: 'High',
    weatherRisk: 'Low',
    soilType: 'Alluvial',
    irrigationType: 'Drip'
  },
  {
    name: 'Coconut',
    state: 'Lakshadweep',
    yield: 12500,
    change: 3.8,
    season: 'Annual',
    area: 2500,
    price: 2800,
    productionCost: 55000,
    marketDemand: 'High',
    weatherRisk: 'High',
    soilType: 'Coral Sand',
    irrigationType: 'Rain fed'
  },
  {
    name: 'Rice',
    state: 'Puducherry',
    yield: 4200,
    change: 4.2,
    season: 'Kharif',
    area: 25000,
    price: 1950,
    productionCost: 42000,
    marketDemand: 'High',
    weatherRisk: 'Medium',
    soilType: 'Alluvial',
    irrigationType: 'Canal + Well'
  },
  {
    name: 'Coconut',
    state: 'Andaman & Nicobar',
    yield: 9500,
    change: 2.5,
    season: 'Annual',
    area: 45000,
    price: 2800,
    productionCost: 48000,
    marketDemand: 'High',
    weatherRisk: 'Medium',
    soilType: 'Coastal',
    irrigationType: 'Rain fed'
  },
  {
    name: 'Arecanut',
    state: 'Dadra & Nagar Haveli',
    yield: 2850,
    change: 6.5,
    season: 'Annual',
    area: 8500,
    price: 18000,
    productionCost: 85000,
    marketDemand: 'High',
    weatherRisk: 'Medium',
    soilType: 'Red',
    irrigationType: 'Well'
  },
  {
    name: 'Mango',
    state: 'Daman & Diu',
    yield: 15500,
    change: 4.8,
    season: 'Annual',
    area: 3500,
    price: 4500,
    productionCost: 75000,
    marketDemand: 'High',
    weatherRisk: 'Medium',
    soilType: 'Coastal',
    irrigationType: 'Drip'
  },
  {
    name: 'Barley',
    state: 'Ladakh',
    yield: 1850,
    change: 12.5,
    season: 'Kharif',
    area: 15000,
    price: 1680,
    productionCost: 25000,
    marketDemand: 'Low',
    weatherRisk: 'High',
    soilType: 'Mountain Desert',
    irrigationType: 'Glacier water'
  }
];

export const getTopPerformingCrops = (limit: number = 5): CropData[] => {
  return cropYieldData
    .sort((a, b) => b.change - a.change)
    .slice(0, limit);
};

export const getCropsByState = (state: string): CropData[] => {
  return cropYieldData.filter(crop => crop.state === state);
};

export const getAverageYield = (): number => {
  return cropYieldData.reduce((sum, crop) => sum + crop.yield, 0) / cropYieldData.length;
};

export const getCropsBySeason = (season: string): CropData[] => {
  return cropYieldData.filter(crop => crop.season === season);
};

export const getHighValueCrops = (): CropData[] => {
  return cropYieldData.filter(crop => crop.price > 10000).sort((a, b) => b.price - a.price);
};

export const getCropsWithHighRisk = (): CropData[] => {
  return cropYieldData.filter(crop => crop.weatherRisk === 'High');
};

export const getProfitAnalysis = (crop: CropData) => {
  const revenue = (crop.yield * crop.price) / 100; // Price per quintal, yield in kg/ha
  const profit = revenue - crop.productionCost;
  const profitMargin = (profit / revenue) * 100;

  return {
    revenue,
    profit,
    profitMargin,
    status: profit > 0 ? 'Profitable' : 'Loss-making'
  };
};

export const getMarketTrends = () => {
  return {
    highDemandCrops: cropYieldData.filter(crop => crop.marketDemand === 'High').length,
    mediumDemandCrops: cropYieldData.filter(crop => crop.marketDemand === 'Medium').length,
    lowDemandCrops: cropYieldData.filter(crop => crop.marketDemand === 'Low').length,
    avgPrice: cropYieldData.reduce((sum, crop) => sum + crop.price, 0) / cropYieldData.length
  };
};

export const getWeatherImpactAnalysis = () => {
  const highRisk = cropYieldData.filter(crop => crop.weatherRisk === 'High');
  const mediumRisk = cropYieldData.filter(crop => crop.weatherRisk === 'Medium');
  const lowRisk = cropYieldData.filter(crop => crop.weatherRisk === 'Low');

  return {
    highRiskCount: highRisk.length,
    mediumRiskCount: mediumRisk.length,
    lowRiskCount: lowRisk.length,
    highRiskArea: highRisk.reduce((sum, crop) => sum + crop.area, 0),
    weatherSensitiveCrops: highRisk.map(crop => crop.name)
  };
};

// Current agricultural challenges and insights for 2024-25
export const getCurrentChallenges = () => {
  return [
    {
      challenge: "Climate Change Impact",
      description: "Irregular monsoons affecting Kharif crops, especially rice and cotton",
      affectedCrops: ["Rice (Non-Basmati)", "Cotton", "Soybean"],
      severity: "High"
    },
    {
      challenge: "Water Scarcity",
      description: "Declining groundwater levels affecting irrigation-dependent crops",
      affectedCrops: ["Sugarcane", "Rice (Basmati)", "Wheat"],
      severity: "Medium"
    },
    {
      challenge: "Pest Management",
      description: "Increased pest attacks due to changing weather patterns",
      affectedCrops: ["Cotton", "Chili", "Tomato"],
      severity: "Medium"
    },
    {
      challenge: "Market Volatility",
      description: "Price fluctuations affecting farmer income",
      affectedCrops: ["Onion", "Potato", "Tomato"],
      severity: "High"
    }
  ];
};

// Regional specialization data
export const getRegionalSpecialization = () => {
  return {
    // North India
    "Punjab": ["Rice (Basmati)", "Wheat"],
    "Haryana": ["Cotton", "Wheat", "Rice"],
    "Himachal Pradesh": ["Apple", "Stone fruits", "Vegetables"],
    "Jammu & Kashmir": ["Saffron", "Apple", "Walnuts"],
    "Uttarakhand": ["Medicinal Plants", "Basmati Rice", "Wheat"],
    "Delhi": ["Vegetables", "Flowers"],
    "Chandigarh": ["Flowers", "Vegetables"],

    // Central India
    "Uttar Pradesh": ["Wheat", "Sugarcane", "Rice"],
    "Madhya Pradesh": ["Soybean", "Wheat", "Pulses"],
    "Chhattisgarh": ["Rice", "Pulses", "Oilseeds"],

    // West India
    "Rajasthan": ["Pulses (Chana)", "Mustard", "Barley"],
    "Gujarat": ["Cotton", "Groundnut", "Cumin"],
    "Maharashtra": ["Sugarcane", "Onion", "Grapes", "Cotton"],
    "Goa": ["Cashew", "Rice", "Coconut"],

    // East India
    "West Bengal": ["Rice (Non-Basmati)", "Potato", "Jute"],
    "Bihar": ["Maize", "Wheat", "Rice"],
    "Jharkhand": ["Lac", "Rice", "Pulses"],
    "Odisha": ["Rice", "Pulses", "Oilseeds"],

    // South India
    "Karnataka": ["Coffee (Arabica)", "Tomato", "Ragi (Finger Millet)"],
    "Tamil Nadu": ["Banana", "Cotton", "Rice"],
    "Andhra Pradesh": ["Chili", "Mango", "Cotton"],
    "Telangana": ["Turmeric", "Cotton", "Rice"],
    "Kerala": ["Coconut", "Cardamom", "Black Pepper", "Tea"],

    // Northeast India
    "Assam": ["Tea", "Rice"],
    "Arunachal Pradesh": ["Kiwi", "Orange", "Rice"],
    "Manipur": ["Black Sesame", "Rice", "Vegetables"],
    "Meghalaya": ["Ginger", "Turmeric", "Orange"],
    "Mizoram": ["Bamboo", "Rice", "Vegetables"],
    "Nagaland": ["Orange", "Rice", "Vegetables"],
    "Tripura": ["Pineapple", "Rice", "Tea"],
    "Sikkim": ["Large Cardamom", "Ginger", "Orange"],

    // Union Territories
    "Lakshadweep": ["Coconut", "Fish"],
    "Puducherry": ["Rice", "Sugarcane", "Cotton"],
    "Andaman & Nicobar": ["Coconut", "Rice", "Spices"],
    "Dadra & Nagar Haveli": ["Arecanut", "Rice", "Mango"],
    "Daman & Diu": ["Mango", "Coconut", "Rice"],
    "Ladakh": ["Barley", "Apricot", "Vegetables"]
  };
};

// Future trend projections (2024-2030)
export const getFutureTrends = () => {
  const years = ['2024', '2025', '2026', '2027', '2028', '2029', '2030'];

  return {
    productionTrends: years.map((year, index) => ({
      year,
      totalProduction: 315 + (index * 8.5), // Million tonnes, 2.7% annual growth
      organicProduction: 12 + (index * 2.1), // Million tonnes, 17.5% annual growth
      averageYield: 2850 + (index * 45), // kg/hectare, 1.6% annual growth
      irrigatedArea: 68.4 + (index * 1.2), // Million hectares, 1.8% annual growth
    })),

    priceTrends: years.map((year, index) => ({
      year,
      averagePrice: 2500 + (index * 125), // INR per quintal, 5% annual inflation
      exportValue: 42.5 + (index * 3.2), // Billion USD, 7.5% annual growth
      domesticMarket: 385 + (index * 18.5), // Billion USD, 4.8% annual growth
      processingIndustry: 89 + (index * 6.8), // Billion USD, 7.6% annual growth
    })),

    technologyAdoption: years.map((year, index) => ({
      year,
      precisionFarming: 8 + (index * 4.5), // Percentage adoption
      droneUsage: 3 + (index * 2.8), // Percentage adoption
      smartIrrigation: 15 + (index * 6.2), // Percentage adoption
      soilTesting: 35 + (index * 4.1), // Percentage adoption
      digitalPlatforms: 22 + (index * 7.3), // Percentage adoption
    })),

    sustainabilityMetrics: years.map((year, index) => ({
      year,
      carbonFootprint: 100 - (index * 3.5), // Index (2024 = 100)
      waterEfficiency: 100 + (index * 4.2), // Index (2024 = 100)
      soilHealth: 100 + (index * 2.8), // Index (2024 = 100)
      biodiversity: 100 + (index * 1.9), // Index (2024 = 100)
      renewableEnergy: 12 + (index * 8.5), // Percentage adoption
    }))
  };
};

// Market intelligence and predictions
export const getMarketPredictions = () => {
  return {
    emergingCrops: [
      { name: 'Quinoa', growthPotential: 'Very High', marketSize: '₹450 Cr by 2030' },
      { name: 'Millets', growthPotential: 'High', marketSize: '₹2,100 Cr by 2030' },
      { name: 'Chia Seeds', growthPotential: 'High', marketSize: '₹280 Cr by 2030' },
      { name: 'Dragon Fruit', growthPotential: 'Medium', marketSize: '₹180 Cr by 2030' },
    ],

    exportOpportunities: [
      { crop: 'Basmati Rice', targetMarkets: ['UAE', 'Saudi Arabia', 'Iran'], growth: '+12% annually' },
      { crop: 'Tea', targetMarkets: ['Russia', 'USA', 'Germany'], growth: '+8% annually' },
      { crop: 'Spices', targetMarkets: ['USA', 'China', 'Germany'], growth: '+15% annually' },
      { crop: 'Cashew', targetMarkets: ['USA', 'Germany', 'Japan'], growth: '+10% annually' },
    ],

    riskFactors: [
      { factor: 'Climate Change', impact: 'High', mitigation: 'Drought-resistant varieties' },
      { factor: 'Water Scarcity', impact: 'High', mitigation: 'Efficient irrigation systems' },
      { factor: 'Market Volatility', impact: 'Medium', mitigation: 'Contract farming' },
      { factor: 'Labor Shortage', impact: 'Medium', mitigation: 'Mechanization' },
    ]
  };
};

// Utility functions for analysis
export const getTopPerformingStates = () => {
  const statePerformance = cropYieldData.reduce((acc, crop) => {
    if (!acc[crop.state]) {
      acc[crop.state] = { totalYield: 0, count: 0 };
    }
    acc[crop.state].totalYield += crop.yield;
    acc[crop.state].count += 1;
    return acc;
  }, {} as Record<string, { totalYield: number; count: number }>);

  return Object.entries(statePerformance)
    .map(([state, data]) => ({
      state,
      avgYield: data.totalYield / data.count
    }))
    .sort((a, b) => b.avgYield - a.avgYield)
    .slice(0, 10);
};

// Get all unique states
export const getStates = (): string[] => {
  const states = Array.from(new Set(cropYieldData.map(crop => crop.state)));
  return states.sort();
};
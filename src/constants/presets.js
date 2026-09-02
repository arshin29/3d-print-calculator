// Bambu Lab official and popular filament presets in India (INR ₹ per 1kg spool)
export const FILAMENT_PRESETS = [
  {
    id: 'bambu-pla-basic',
    name: 'Bambu PLA Basic / Matte',
    spoolPrice: 1599, // ₹1,599 per 1000g spool
    spoolWeight: 1000,
    density: 1.24,
    color: '#00AE42',
    category: 'Standard',
    description: 'General purpose, decorative models & prototyping'
  },
  {
    id: 'bambu-petg-hf',
    name: 'Bambu PETG-HF / Basic',
    spoolPrice: 1799,
    spoolWeight: 1000,
    density: 1.27,
    color: '#0ea5e9',
    category: 'Durable',
    description: 'High impact, UV & moisture resistant parts'
  },
  {
    id: 'bambu-abs-asa',
    name: 'Bambu ABS / ASA',
    spoolPrice: 2199,
    spoolWeight: 1000,
    density: 1.05,
    color: '#f59e0b',
    category: 'Engineering',
    description: 'Outdoor, heat resistant enclosures up to 95°C'
  },
  {
    id: 'bambu-tpu-95a',
    name: 'Bambu TPU 95A Flexible',
    spoolPrice: 2899,
    spoolWeight: 1000,
    density: 1.21,
    color: '#8b5cf6',
    category: 'Flexible',
    description: 'Rubbery, impact-absorbing gaskets & dampeners'
  },
  {
    id: 'bambu-pa-cf',
    name: 'Bambu PA-CF (Carbon Fiber)',
    spoolPrice: 4899,
    spoolWeight: 1000,
    density: 1.20,
    color: '#ec4899',
    category: 'High-Performance',
    description: 'Ultra-stiff structural & mechanical components'
  },
  {
    id: 'custom',
    name: 'Custom Filament',
    spoolPrice: 1600,
    spoolWeight: 1000,
    density: 1.24,
    color: '#14b8a6',
    category: 'Custom',
    description: 'Enter your custom spool cost and weight'
  }
];

export const DEFAULT_MACHINE_CONFIG = {
  printerModel: 'Bambu Lab P2S',
  averageWattage: 130, // Average sustained power draw in Watts during active printing
  electricityRatePerKwh: 8.50, // Average commercial/residential rate in India (₹/kWh)
  machineWearPerHour: 18.00, // Machine depreciation & maintenance (nozzle, belt, rods) in ₹/hr
  operatorLaborRatePerHour: 150.00, // Operator setup, slicing, support removal & QC in ₹/hr
  prepAndPostTimeMinutes: 15, // Default operator time per job in minutes
  failureRiskPercent: 8, // Risk buffer for failed prints or slicer waste
  hardwareCostPerUnit: 0, // Heat inserts, screws, magnets, bearings (₹)
  packagingCostPerUnit: 25 // Bubble wrap, shipping box, sticker, desiccant (₹)
};

export const DEFAULT_PRICE_TIERS = [
  {
    id: 'economy',
    name: 'Competitive / Bulk',
    subtitle: 'Friends, Makers & Bulk Orders',
    targetMargin: 28, // 28% Profit Margin
    color: '#06b6d4',
    glowColor: 'rgba(6, 182, 212, 0.25)',
    badge: 'High Volume',
    description: 'Low-friction quote for repeat clients, friends, or large quantity runs.'
  },
  {
    id: 'commercial',
    name: 'Standard Commercial',
    subtitle: 'Market Benchmark',
    targetMargin: 52, // 52% Profit Margin
    color: '#00AE42', // Bambu signature green
    glowColor: 'rgba(0, 174, 66, 0.3)',
    badge: 'Recommended',
    recommended: true,
    description: 'Healthy, sustainable profit margin ideal for Etsy, Instagram & custom client jobs.'
  },
  {
    id: 'premium',
    name: 'Rush / Premium',
    subtitle: 'Express 24h & Engineering',
    targetMargin: 72, // 72% Profit Margin
    color: '#a855f7',
    glowColor: 'rgba(168, 85, 247, 0.25)',
    badge: 'High Value',
    description: 'For urgent turnaround, high-tolerance engineering prints, or complex materials.'
  }
];

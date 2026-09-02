/**
 * 3D Printing Cost & Pricing Calculation Engine
 * Dedicated for Bambu Lab P2S & INR (₹)
 */

export function calculateProductionCost(inputs, config) {
  const filamentGrams = Math.max(0, Number(inputs.filamentGrams) || 0);
  const printHours = Math.max(0, Number(inputs.printHours) || 0);
  const printMinutes = Math.max(0, Number(inputs.printMinutes) || 0);
  const batchQuantity = Math.max(1, parseInt(inputs.batchQuantity, 10) || 1);

  // Total print time in fractional hours
  const totalPrintHours = printHours + (printMinutes / 60);

  // Spool values
  const spoolPrice = Math.max(0, Number(inputs.spoolPrice) || 0);
  const spoolWeight = Math.max(1, Number(inputs.spoolWeight) || 1000);

  // 1. Material Cost
  const materialCost = (filamentGrams / spoolWeight) * spoolPrice;

  // 2. Electricity Cost: kWh = (Watts * Hours) / 1000
  const kwhUsed = (config.averageWattage * totalPrintHours) / 1000;
  const electricityCost = kwhUsed * (Number(config.electricityRatePerKwh) || 0);

  // 3. Machine Wear & Maintenance (Depreciation, nozzle, belts)
  const machineWearCost = totalPrintHours * (Number(config.machineWearPerHour) || 0);

  // 4. Operator / Labor Cost (Job setup, slicing, support removal, packaging)
  const laborHours = (Number(config.prepAndPostTimeMinutes) || 0) / 60;
  const laborCost = laborHours * (Number(config.operatorLaborRatePerHour) || 0);

  // 5. Failure / Scrap Risk Buffer (applies to machine, material and electricity)
  const directPrintCost = materialCost + electricityCost + machineWearCost;
  const failureRiskPercent = Number(config.failureRiskPercent) || 0;
  const failureRiskCost = directPrintCost * (failureRiskPercent / 100);

  // 6. Additional hardware (screws, inserts) & Packaging (box, bubble wrap)
  const hardwareCost = Number(config.hardwareCostPerUnit) || 0;
  const packagingCost = Number(config.packagingCostPerUnit) || 0;
  const extraConsumablesCost = hardwareCost + packagingCost;

  // Total Unit Production Cost
  const unitTotalCost = materialCost + electricityCost + machineWearCost + laborCost + failureRiskCost + extraConsumablesCost;

  // Total Batch Cost
  const batchTotalCost = unitTotalCost * batchQuantity;

  // Hourly run rate (₹/hr for the machine printing this job)
  const costPerHour = totalPrintHours > 0 ? unitTotalCost / totalPrintHours : unitTotalCost;

  return {
    filamentGrams,
    totalPrintHours,
    batchQuantity,
    costPerHour: Math.round(costPerHour * 100) / 100,
    unit: {
      materialCost,
      electricityCost,
      kwhUsed,
      machineWearCost,
      laborCost,
      failureRiskCost,
      hardwareCost,
      packagingCost,
      extraConsumablesCost,
      costPerHour: Math.round(costPerHour * 100) / 100,
      totalCost: unitTotalCost
    },
    batch: {
      materialCost: materialCost * batchQuantity,
      electricityCost: electricityCost * batchQuantity,
      machineWearCost: machineWearCost * batchQuantity,
      laborCost: laborCost * batchQuantity,
      failureRiskCost: failureRiskCost * batchQuantity,
      extraConsumablesCost: extraConsumablesCost * batchQuantity,
      totalCost: batchTotalCost
    }
  };
}

/**
 * Calculates Selling Price based on Unit Base Cost and Target Profit Margin
 * Formula: Price = Cost / (1 - (margin% / 100))
 */
export function calculateSellingPriceByMargin(unitCost, marginPercent, batchQuantity = 1, printHours = 1) {
  const safeCost = Math.max(0, Number(unitCost) || 0);
  const marginFrac = Math.min(0.95, Math.max(0, (Number(marginPercent) || 0) / 100)); // Cap between 0% and 95%
  
  // Selling price per unit
  const unitPrice = marginFrac >= 1 ? safeCost * 2 : safeCost / (1 - marginFrac);
  const unitProfit = Math.max(0, unitPrice - safeCost);
  
  const batchPrice = unitPrice * batchQuantity;
  const batchProfit = unitProfit * batchQuantity;

  const effectiveMargin = unitPrice > 0 ? (unitProfit / unitPrice) * 100 : 0;
  const effectiveMarkup = safeCost > 0 ? (unitProfit / safeCost) * 100 : 0;

  // Hourly profit yield (how much ₹ you make per hour printer is running)
  const hourlyProfitRate = printHours > 0 ? unitProfit / printHours : unitProfit;

  return {
    unitPrice: Math.round(unitPrice * 100) / 100,
    unitProfit: Math.round(unitProfit * 100) / 100,
    batchPrice: Math.round(batchPrice * 100) / 100,
    batchProfit: Math.round(batchProfit * 100) / 100,
    effectiveMargin: Math.round(effectiveMargin * 10) / 10,
    effectiveMarkup: Math.round(effectiveMarkup * 10) / 10,
    markupPercentage: Math.round(effectiveMarkup * 10) / 10,
    hourlyProfitRate: Math.round(hourlyProfitRate * 10) / 10,
    hourlyRate: Math.round(hourlyProfitRate * 10) / 10
  };
}

/**
 * Calculates Selling Price based on Unit Base Cost and Target Markup
 * Formula: Price = Cost * (1 + (markup% / 100))
 */
export function calculateSellingPriceByMarkup(unitCost, markupPercent, batchQuantity = 1, printHours = 1) {
  const safeCost = Math.max(0, Number(unitCost) || 0);
  const markupFrac = Math.max(0, (Number(markupPercent) || 0) / 100);
  
  const unitPrice = safeCost * (1 + markupFrac);
  const unitProfit = Math.max(0, unitPrice - safeCost);
  
  const batchPrice = unitPrice * batchQuantity;
  const batchProfit = unitProfit * batchQuantity;

  const effectiveMargin = unitPrice > 0 ? (unitProfit / unitPrice) * 100 : 0;
  const effectiveMarkup = safeCost > 0 ? (unitProfit / safeCost) * 100 : 0;

  const hourlyProfitRate = printHours > 0 ? unitProfit / printHours : unitProfit;

  return {
    unitPrice: Math.round(unitPrice * 100) / 100,
    unitProfit: Math.round(unitProfit * 100) / 100,
    batchPrice: Math.round(batchPrice * 100) / 100,
    batchProfit: Math.round(batchProfit * 100) / 100,
    effectiveMargin: Math.round(effectiveMargin * 10) / 10,
    effectiveMarkup: Math.round(effectiveMarkup * 10) / 10,
    markupPercentage: Math.round(effectiveMarkup * 10) / 10,
    hourlyProfitRate: Math.round(hourlyProfitRate * 10) / 10,
    hourlyRate: Math.round(hourlyProfitRate * 10) / 10
  };
}

/**
 * Format INR currency with Indian numbering system (e.g. ₹1,250.00)
 */
export function formatINR(amount, includeDecimals = true) {
  if (isNaN(amount) || amount === null || amount === undefined) return '₹0';
  const num = Number(amount);
  
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: includeDecimals ? 2 : 0,
    maximumFractionDigits: includeDecimals ? 2 : 0
  }).format(num);
}

/**
 * Format hours and minutes to readable string
 */
export function formatTimeDisplay(hours, minutes) {
  const h = parseInt(hours, 10) || 0;
  const m = parseInt(minutes, 10) || 0;
  if (h === 0 && m === 0) return '0m';
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

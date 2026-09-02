import React, { useState } from 'react';
import { formatINR } from '../utils/calculator';

export default function CostBreakdown({ calculationData, config }) {
  const [viewMode, setViewMode] = useState('unit'); // 'unit' or 'batch'
  const isBatch = viewMode === 'batch' && calculationData.batchQuantity > 1;

  const activeCosts = isBatch ? calculationData.batch : calculationData.unit;
  const total = activeCosts.totalCost || 0.001; // Avoid divide by zero

  // Refined Apple-harmonized breakdown items
  const items = [
    {
      id: 'material',
      name: 'Filament Material',
      amount: activeCosts.materialCost,
      color: '#0066cc', // Action Blue
      detail: `${calculationData.filamentGrams * (isBatch ? calculationData.batchQuantity : 1)}g total`
    },
    {
      id: 'electricity',
      name: 'Electricity (P2S ~130W)',
      amount: activeCosts.electricityCost,
      color: '#0071e3', // Focus Blue
      detail: `${((activeCosts.kwhUsed || 0) * (isBatch ? calculationData.batchQuantity : 1)).toFixed(2)} kWh @ ₹${config.electricityRatePerKwh}/unit`
    },
    {
      id: 'machine',
      name: 'Machine Depreciation & Wear',
      amount: activeCosts.machineWearCost,
      color: '#333336', // Dark ink
      detail: `₹${config.machineWearPerHour}/hr maintenance reserve`
    },
    {
      id: 'labor',
      name: 'Prep, Slicing & Post-Process',
      amount: activeCosts.laborCost,
      color: '#86868b', // Muted ink
      detail: `${config.prepAndPostTimeMinutes} mins @ ₹${config.operatorLaborRatePerHour}/hr`
    },
    {
      id: 'failure',
      name: 'Failure / Scrap Contingency',
      amount: activeCosts.failureRiskCost,
      color: '#ff3b30', // Apple System Red
      detail: `${config.failureRiskPercent}% risk contingency`
    },
    {
      id: 'packaging',
      name: 'Hardware & Protective Packaging',
      amount: activeCosts.extraConsumablesCost,
      color: '#34c759', // Apple System Green
      detail: `₹${config.packagingCostPerUnit + config.hardwareCostPerUnit} per part`
    }
  ];

  // Calculate SVG donut segments
  const size = 180;
  const strokeWidth = 20;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let accumulatedPercent = 0;
  const segments = items.map((item) => {
    const percent = Math.max(0, (item.amount / total) * 100);
    const strokeDasharray = `${(percent / 100) * circumference} ${circumference}`;
    const strokeDashoffset = -((accumulatedPercent / 100) * circumference);
    accumulatedPercent += percent;

    return {
      ...item,
      percent: Math.round(percent * 10) / 10,
      strokeDasharray,
      strokeDashoffset
    };
  });

  return (
    <div className="store-utility-card cost-summary-box">
      <div className="card-header">
        <h2 className="card-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0066cc" strokeWidth="2">
            <line x1="12" y1="1" x2="12" y2="23"></line>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
          </svg>
          True Production Cost
        </h2>

        {calculationData.batchQuantity > 1 && (
          <div className="segmented-control">
            <button
              type="button"
              className={`segmented-option ${viewMode === 'unit' ? 'active' : ''}`}
              onClick={() => setViewMode('unit')}
            >
              Per Part
            </button>
            <button
              type="button"
              className={`segmented-option ${viewMode === 'batch' ? 'active' : ''}`}
              onClick={() => setViewMode('batch')}
            >
              Batch ({calculationData.batchQuantity})
            </button>
          </div>
        )}
      </div>

      {/* Hero Figure */}
      <div className="cost-hero-figure">
        <div className="cost-hero-value">
          {formatINR(activeCosts.totalCost)}
        </div>
        <div className="cost-hero-label">
          {isBatch ? `Total production cost for ${calculationData.batchQuantity} units` : 'Base manufacturing cost per unit'}
        </div>
      </div>

      {/* Donut Chart Visualization */}
      <div className="donut-chart-container">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#e5e5ea"
            strokeWidth={strokeWidth}
          />

          {/* Slices */}
          {segments.map((seg) => (
            <circle
              key={seg.id}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={seg.color}
              strokeWidth={strokeWidth}
              strokeDasharray={seg.strokeDasharray}
              strokeDashoffset={seg.strokeDashoffset}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
              strokeLinecap="butt"
              style={{ transition: 'stroke-dashoffset 0.4s ease, stroke-dasharray 0.4s ease' }}
            />
          ))}
        </svg>

        <div className="donut-inner-stats">
          <span className="donut-inner-rate">
            ₹{(calculationData?.costPerHour ?? (calculationData?.totalPrintHours > 0 ? (calculationData?.unit?.totalCost || 0) / calculationData.totalPrintHours : 0)).toFixed(1)}/hr
          </span>
          <span className="donut-inner-sub">Total Run Rate</span>
        </div>
      </div>

      {/* Itemized Cost List */}
      <div className="cost-items-list">
        {segments.map((item) => (
          <div key={item.id} className="cost-item-row">
            <div className="cost-item-left">
              <span 
                className="cost-item-indicator" 
                style={{ backgroundColor: item.color }} 
              />
              <div>
                <div className="cost-item-name">{item.name}</div>
                <div className="cost-item-detail">{item.detail}</div>
              </div>
            </div>

            <div className="cost-item-right">
              <div className="cost-item-amount">{formatINR(item.amount)}</div>
              <div className="cost-item-percent">{item.percent}% of total</div>
            </div>
          </div>
        ))}
      </div>

      {/* Machine Footnote */}
      <div className="machine-footnote">
        <span>Bambu Lab P2S (~130W Power Profile)</span>
        <span>Includes 8% Scrap Risk</span>
      </div>
    </div>
  );
}

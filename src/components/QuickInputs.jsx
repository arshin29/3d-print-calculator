import React from 'react';
import { FILAMENT_PRESETS } from '../constants/presets';

export default function QuickInputs({ 
  inputs, 
  onChangeInput, 
  onSelectFilamentPreset, 
  selectedFilamentId 
}) {
  const handleFilamentWeightQuickAdd = (amount) => {
    const current = Number(inputs.filamentGrams) || 0;
    onChangeInput('filamentGrams', Math.max(0, current + amount));
  };

  const handleSetTimeQuick = (hours, minutes) => {
    onChangeInput('printHours', hours);
    onChangeInput('printMinutes', minutes);
  };

  const handleQuantityDelta = (delta) => {
    const current = Math.max(1, parseInt(inputs.batchQuantity, 10) || 1);
    onChangeInput('batchQuantity', Math.max(1, current + delta));
  };

  return (
    <div className="store-utility-card">
      <div className="card-header">
        <h2 className="card-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0066cc" strokeWidth="2">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
          </svg>
          Slicer Parameters
        </h2>
        <span className="card-step-badge">Step 1 of 2</span>
      </div>

      <div className="input-section">
        {/* Filament Used (g) */}
        <div className="input-group">
          <div className="input-label-row">
            <label className="input-label" htmlFor="filamentGrams">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
                <path d="M2 12h20"/>
              </svg>
              Filament Weight Used
            </label>
            <span className="input-hint">From Bambu Studio sliced stats</span>
          </div>

          <div className="input-wrapper">
            <input
              id="filamentGrams"
              type="number"
              min="0"
              step="0.5"
              className="custom-input"
              value={inputs.filamentGrams}
              onChange={(e) => onChangeInput('filamentGrams', e.target.value)}
              placeholder="e.g. 75"
            />
            <span className="input-adornment">grams (g)</span>
          </div>

          <div className="chips-row">
            <button type="button" className="configurator-option-chip" onClick={() => handleFilamentWeightQuickAdd(10)}>+10g</button>
            <button type="button" className="configurator-option-chip" onClick={() => handleFilamentWeightQuickAdd(25)}>+25g</button>
            <button type="button" className="configurator-option-chip" onClick={() => handleFilamentWeightQuickAdd(50)}>+50g</button>
            <button type="button" className="configurator-option-chip" onClick={() => handleFilamentWeightQuickAdd(100)}>+100g</button>
            <button type="button" className="configurator-option-chip" onClick={() => onChangeInput('filamentGrams', 0)}>Clear</button>
          </div>
        </div>

        {/* Print Time (Hours & Minutes) */}
        <div className="input-group">
          <div className="input-label-row">
            <label className="input-label">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              Print Time Duration
            </label>
            <span className="input-hint">Estimated print duration</span>
          </div>

          <div className="dual-time-grid">
            <div className="input-wrapper">
              <input
                type="number"
                min="0"
                className="custom-input"
                value={inputs.printHours}
                onChange={(e) => onChangeInput('printHours', e.target.value)}
                placeholder="0"
              />
              <span className="input-adornment">Hours</span>
            </div>

            <div className="input-wrapper">
              <input
                type="number"
                min="0"
                max="59"
                className="custom-input"
                value={inputs.printMinutes}
                onChange={(e) => onChangeInput('printMinutes', e.target.value)}
                placeholder="0"
              />
              <span className="input-adornment">Mins</span>
            </div>
          </div>

          <div className="chips-row">
            <button type="button" className="configurator-option-chip" onClick={() => handleSetTimeQuick(0, 45)}>45m</button>
            <button type="button" className="configurator-option-chip" onClick={() => handleSetTimeQuick(1, 30)}>1h 30m</button>
            <button type="button" className="configurator-option-chip" onClick={() => handleSetTimeQuick(2, 45)}>2h 45m</button>
            <button type="button" className="configurator-option-chip" onClick={() => handleSetTimeQuick(5, 0)}>5h</button>
            <button type="button" className="configurator-option-chip" onClick={() => handleSetTimeQuick(8, 0)}>8h</button>
          </div>
        </div>

        {/* Material Selection */}
        <div className="input-group">
          <div className="input-label-row">
            <label className="input-label">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              Filament Material
            </label>
            <span className="input-hint">India market presets</span>
          </div>

          <div className="filament-selector-grid">
            {FILAMENT_PRESETS.map((preset) => {
              const isSelected = preset.id === selectedFilamentId;
              return (
                <div
                  key={preset.id}
                  className={`filament-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => onSelectFilamentPreset(preset)}
                >
                  <div className="filament-header-row">
                    <span className="filament-name">{preset.name}</span>
                    <span 
                      className="filament-swatch"
                      style={{ backgroundColor: preset.color }}
                    />
                  </div>
                  <div className="filament-price-tag">
                    {preset.id === 'custom' ? 'User Custom' : `₹${preset.spoolPrice} / 1kg`}
                  </div>
                  <span className="filament-desc">{preset.description}</span>
                </div>
              );
            })}
          </div>

          {/* Custom Filament Pricing fields */}
          {selectedFilamentId === 'custom' && (
            <div className="custom-spool-pricing-grid">
              <div>
                <label className="input-label" style={{ fontSize: '12px' }}>Custom Spool Price (₹)</label>
                <div className="input-wrapper" style={{ marginTop: '4px' }}>
                  <input
                    type="number"
                    min="0"
                    className="custom-input"
                    value={inputs.spoolPrice}
                    onChange={(e) => onChangeInput('spoolPrice', e.target.value)}
                    placeholder="1600"
                  />
                  <span className="input-adornment">₹</span>
                </div>
              </div>
              <div>
                <label className="input-label" style={{ fontSize: '12px' }}>Spool Weight (g)</label>
                <div className="input-wrapper" style={{ marginTop: '4px' }}>
                  <input
                    type="number"
                    min="1"
                    className="custom-input"
                    value={inputs.spoolWeight}
                    onChange={(e) => onChangeInput('spoolWeight', e.target.value)}
                    placeholder="1000"
                  />
                  <span className="input-adornment">g</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Batch Quantity Stepper */}
        <div className="input-group">
          <div className="input-label-row">
            <label className="input-label" htmlFor="batchQuantity">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
              Batch Order Quantity
            </label>
            <span className="input-hint">For bulk production runs</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', flexWrap: 'wrap' }}>
            <div className="quantity-stepper">
              <button 
                type="button" 
                className="stepper-btn" 
                onClick={() => handleQuantityDelta(-1)}
                title="Decrease quantity"
              >
                −
              </button>
              <input
                id="batchQuantity"
                type="number"
                min="1"
                className="stepper-input"
                value={inputs.batchQuantity}
                onChange={(e) => onChangeInput('batchQuantity', Math.max(1, parseInt(e.target.value, 10) || 1))}
              />
              <button 
                type="button" 
                className="stepper-btn" 
                onClick={() => handleQuantityDelta(1)}
                title="Increase quantity"
              >
                +
              </button>
            </div>

            <div className="chips-row">
              <button type="button" className="configurator-option-chip" onClick={() => onChangeInput('batchQuantity', 1)}>1 pc</button>
              <button type="button" className="configurator-option-chip" onClick={() => onChangeInput('batchQuantity', 5)}>5 pcs</button>
              <button type="button" className="configurator-option-chip" onClick={() => onChangeInput('batchQuantity', 10)}>10 pcs</button>
              <button type="button" className="configurator-option-chip" onClick={() => onChangeInput('batchQuantity', 25)}>25 pcs</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

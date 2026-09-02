import React from 'react';

export default function ConfigModal({ isOpen, onClose, config, onChangeConfig, onResetDefaults }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-row">
          <h3 className="modal-sheet-title">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0066cc" strokeWidth="2">
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            Machine & Commercial Rates
          </h3>
          <button className="modal-close-chip" onClick={onClose} title="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <p style={{ fontSize: '14px', color: '#6e6e73', lineHeight: 1.4 }}>
          Adjust local power tariffs, Bambu Lab P2S machine maintenance reserve, and labor rates in Indian Rupees (₹).
        </p>

        <div className="config-grid">
          {/* Electricity Tariff */}
          <div className="input-group">
            <label className="input-label">Electricity Tariff (₹ / kWh)</label>
            <div className="input-wrapper">
              <input
                type="number"
                step="0.1"
                min="0"
                className="custom-input"
                value={config.electricityRatePerKwh}
                onChange={(e) => onChangeConfig('electricityRatePerKwh', e.target.value)}
              />
              <span className="input-adornment">₹/kWh</span>
            </div>
            <span className="input-hint">National avg ~₹8.50/unit</span>
          </div>

          {/* Average Power Draw */}
          <div className="input-group">
            <label className="input-label">P2S Power Draw (Watts)</label>
            <div className="input-wrapper">
              <input
                type="number"
                min="50"
                max="500"
                className="custom-input"
                value={config.averageWattage}
                onChange={(e) => onChangeConfig('averageWattage', e.target.value)}
              />
              <span className="input-adornment">Watts</span>
            </div>
            <span className="input-hint">~130W average active draw</span>
          </div>

          {/* Machine Depreciation & Wear Rate */}
          <div className="input-group">
            <label className="input-label">Machine Wear & Service (₹/hr)</label>
            <div className="input-wrapper">
              <input
                type="number"
                step="1"
                min="0"
                className="custom-input"
                value={config.machineWearPerHour}
                onChange={(e) => onChangeConfig('machineWearPerHour', e.target.value)}
              />
              <span className="input-adornment">₹/hr</span>
            </div>
            <span className="input-hint">Nozzles, belts & rods reserve</span>
          </div>

          {/* Operator Labor Rate */}
          <div className="input-group">
            <label className="input-label">Operator Labor Rate (₹/hr)</label>
            <div className="input-wrapper">
              <input
                type="number"
                step="10"
                min="0"
                className="custom-input"
                value={config.operatorLaborRatePerHour}
                onChange={(e) => onChangeConfig('operatorLaborRatePerHour', e.target.value)}
              />
              <span className="input-adornment">₹/hr</span>
            </div>
            <span className="input-hint">Slicing, bed prep & support cleanup</span>
          </div>

          {/* Prep & Post Processing Time (Minutes) */}
          <div className="input-group">
            <label className="input-label">Labor Time per Job (Minutes)</label>
            <div className="input-wrapper">
              <input
                type="number"
                step="5"
                min="0"
                className="custom-input"
                value={config.prepAndPostTimeMinutes}
                onChange={(e) => onChangeConfig('prepAndPostTimeMinutes', e.target.value)}
              />
              <span className="input-adornment">mins</span>
            </div>
            <span className="input-hint">Handling time per print job</span>
          </div>

          {/* Failure Risk Allowance */}
          <div className="input-group">
            <label className="input-label">Failure / Scrap Buffer (%)</label>
            <div className="input-wrapper">
              <input
                type="number"
                step="1"
                min="0"
                max="30"
                className="custom-input"
                value={config.failureRiskPercent}
                onChange={(e) => onChangeConfig('failureRiskPercent', e.target.value)}
              />
              <span className="input-adornment">%</span>
            </div>
            <span className="input-hint">Spaghetti, warping & purge reserve</span>
          </div>

          {/* Additional Hardware */}
          <div className="input-group">
            <label className="input-label">Hardware per Part (₹)</label>
            <div className="input-wrapper">
              <input
                type="number"
                step="5"
                min="0"
                className="custom-input"
                value={config.hardwareCostPerUnit}
                onChange={(e) => onChangeConfig('hardwareCostPerUnit', e.target.value)}
              />
              <span className="input-adornment">₹</span>
            </div>
            <span className="input-hint">Screws, heat-inserts, magnets</span>
          </div>

          {/* Packaging Box / Bubble Wrap */}
          <div className="input-group">
            <label className="input-label">Packaging & Box (₹)</label>
            <div className="input-wrapper">
              <input
                type="number"
                step="5"
                min="0"
                className="custom-input"
                value={config.packagingCostPerUnit}
                onChange={(e) => onChangeConfig('packagingCostPerUnit', e.target.value)}
              />
              <span className="input-adornment">₹</span>
            </div>
            <span className="input-hint">Boxes, bubble wrap, pouch</span>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 'var(--spacing-sm)', borderTop: '1px solid var(--color-divider-soft)' }}>
          <button 
            type="button" 
            className="button-pearl-capsule" 
            onClick={onResetDefaults}
          >
            Reset Defaults
          </button>
          <button 
            type="button" 
            className="button-primary" 
            onClick={onClose}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { calculateSellingPriceByMargin, calculateSellingPriceByMarkup, formatINR } from '../utils/calculator';

export default function PricingRecommendations({ 
  unitBaseCost, 
  batchQuantity, 
  printHours, 
  tiers, 
  onUpdateTierMargin, 
  onCopyQuote,
  onOpenInvoiceModal,
  pricingModel,
  onTogglePricingModel
}) {
  const isMarkup = pricingModel === 'markup';

  return (
    <div className="pricing-section-container">
      <div className="section-header-row">
        <div className="section-title-group">
          <h2>Selling Price Intelligence</h2>
          <p className="section-subtitle">
            Three commercial pricing strategies tailored for customer profiles and order volumes
          </p>
        </div>

        <div className="segmented-control">
          <button
            type="button"
            className={`segmented-option ${pricingModel === 'margin' ? 'active' : ''}`}
            onClick={() => onTogglePricingModel('margin')}
            title="Profit Margin: Profit as % of final Selling Price"
          >
            Profit Margin %
          </button>
          <button
            type="button"
            className={`segmented-option ${pricingModel === 'markup' ? 'active' : ''}`}
            onClick={() => onTogglePricingModel('markup')}
            title="Markup: Profit added on top of Base Cost"
          >
            Markup %
          </button>
        </div>
      </div>

      <div className="pricing-tiles-grid">
        {tiers.map((tier) => {
          const pricing = isMarkup
            ? calculateSellingPriceByMarkup(
                unitBaseCost, 
                tier.targetMargin, 
                batchQuantity, 
                printHours
              )
            : calculateSellingPriceByMargin(
                unitBaseCost, 
                tier.targetMargin, 
                batchQuantity, 
                printHours
              );

          const isRecommended = tier.recommended;

          return (
            <div 
              key={tier.id} 
              className={`pricing-tile ${isRecommended ? 'commercial-featured' : ''}`}
            >
              <div>
                <div className="tile-top-row">
                  <span className={`tier-badge ${isRecommended ? 'tier-badge-recommended' : ''}`}>
                    {tier.badge}
                  </span>

                  <span style={{ fontSize: '13px', fontFamily: 'var(--font-mono)' }}>
                    {tier.targetMargin}% {isMarkup ? 'Markup' : 'Margin'}
                  </span>
                </div>

                <h3 className="tier-name">{tier.name}</h3>
                <p className="tier-subtitle">{tier.subtitle}</p>

                {/* Main Recommended Price */}
                <div className="tier-price-hero">
                  <div className="tier-price-main">
                    {formatINR(pricing.unitPrice)}
                  </div>
                  <div className="tier-price-unit">per printed part</div>

                  {batchQuantity > 1 && (
                    <div className="tier-batch-note">
                      {formatINR(pricing.batchPrice)} total for {batchQuantity} pcs
                    </div>
                  )}
                </div>

                {/* Margin / Markup Adjustment Slider */}
                <div className="margin-control-block">
                  <div className="margin-header-row">
                    <span style={{ fontSize: '12px', color: isRecommended ? '#cccccc' : '#86868b' }}>
                      Target {isMarkup ? 'Markup' : 'Margin'}
                    </span>
                    <span style={{ fontWeight: 600, fontFamily: 'var(--font-mono)' }}>
                      {tier.targetMargin}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min={isMarkup ? "10" : "10"}
                    max={isMarkup ? "200" : "90"}
                    step="1"
                    className="slider-input"
                    value={tier.targetMargin}
                    onChange={(e) => onUpdateTierMargin(tier.id, Number(e.target.value))}
                  />
                </div>

                {/* Profit Metrics List */}
                <div className="tier-metrics-list">
                  <div className="tier-metric-row">
                    <span className="metric-label">Net Profit / Part:</span>
                    <span className="metric-value" style={{ color: isRecommended ? '#30d158' : '#34c759' }}>
                      +{formatINR(pricing.unitProfit)}
                    </span>
                  </div>

                  {batchQuantity > 1 && (
                    <div className="tier-metric-row">
                      <span className="metric-label">Total Batch Profit:</span>
                      <span className="metric-value" style={{ color: isRecommended ? '#30d158' : '#34c759' }}>
                        +{formatINR(pricing.batchProfit)}
                      </span>
                    </div>
                  )}

                  <div className="tier-metric-row">
                    <span className="metric-label">Hourly Return:</span>
                    <span className="metric-value">
                      ₹{(pricing.hourlyRate ?? pricing.hourlyProfitRate ?? 0).toFixed(1)}/hr
                    </span>
                  </div>

                  <div className="tier-metric-row">
                    <span className="metric-label">{isMarkup ? 'Effective Margin:' : 'Markup on Cost:'}</span>
                    <span className="metric-value">
                      {isMarkup 
                        ? `${(pricing.effectiveMargin ?? 0).toFixed(1)}%` 
                        : `+${(pricing.markupPercentage ?? pricing.effectiveMarkup ?? 0).toFixed(1)}%`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="tier-action-group">
                <button
                  type="button"
                  className="button-primary"
                  onClick={() => onCopyQuote(tier, pricing)}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                  <span>Copy Quote</span>
                </button>

                <button
                  type="button"
                  className="button-secondary-pill"
                  onClick={() => onOpenInvoiceModal(tier, pricing)}
                  style={isRecommended ? { borderColor: '#2997ff', color: '#2997ff' } : {}}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                  <span>View Job Sheet</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

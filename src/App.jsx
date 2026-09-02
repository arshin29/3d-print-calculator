import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import QuickInputs from './components/QuickInputs';
import CostBreakdown from './components/CostBreakdown';
import PricingRecommendations from './components/PricingRecommendations';
import ConfigModal from './components/ConfigModal';
import QuoteSheetModal from './components/QuoteSheetModal';
import SlicerGuideModal from './components/SlicerGuideModal';
import { 
  DEFAULT_MACHINE_CONFIG, 
  DEFAULT_PRICE_TIERS, 
  FILAMENT_PRESETS 
} from './constants/presets';
import { 
  calculateProductionCost, 
  calculateSellingPriceByMargin,
  calculateSellingPriceByMarkup,
  formatINR, 
  formatTimeDisplay 
} from './utils/calculator';

const STORAGE_KEY_CONFIG = 'bambu_p2s_config_v1';
const STORAGE_KEY_TIERS = 'bambu_p2s_tiers_v1';

export default function App() {
  // Slicer input parameters
  const [inputs, setInputs] = useState({
    filamentGrams: 85,
    printHours: 2,
    printMinutes: 45,
    batchQuantity: 1,
    spoolPrice: 1599,
    spoolWeight: 1000
  });

  const [selectedFilamentId, setSelectedFilamentId] = useState('bambu-pla-basic');

  // Machine and rate configurations (persisted in LocalStorage)
  const [config, setConfig] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CONFIG);
      return saved ? JSON.parse(saved) : DEFAULT_MACHINE_CONFIG;
    } catch {
      return DEFAULT_MACHINE_CONFIG;
    }
  });

  // 3 Pricing Tiers (persisted in LocalStorage)
  const [tiers, setTiers] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_TIERS);
      return saved ? JSON.parse(saved) : DEFAULT_PRICE_TIERS;
    } catch {
      return DEFAULT_PRICE_TIERS;
    }
  });

  // Profit Margin vs Markup toggle
  const [pricingModel, setPricingModel] = useState('margin');

  // Modals & Drawers
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isSlicerGuideOpen, setIsSlicerGuideOpen] = useState(false);
  const [invoiceModal, setInvoiceModal] = useState({ isOpen: false, tier: null, pricing: null });

  // Toast alert feedback
  const [toastMessage, setToastMessage] = useState(null);

  // Sync config changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(config));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }, [config]);

  // Sync tiers changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_TIERS, JSON.stringify(tiers));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }, [tiers]);

  // Calculation Engine
  const calculationData = useMemo(() => {
    return calculateProductionCost(inputs, config);
  }, [inputs, config]);

  const selectedFilament = useMemo(() => {
    return FILAMENT_PRESETS.find(f => f.id === selectedFilamentId) || FILAMENT_PRESETS[0];
  }, [selectedFilamentId]);

  // Recommended tier calculation for floating bottom bar
  const recommendedTier = useMemo(() => {
    return (tiers && tiers.find(t => t.recommended)) || tiers?.[1] || tiers?.[0] || DEFAULT_PRICE_TIERS[1];
  }, [tiers]);

  const recommendedPricing = useMemo(() => {
    const margin = recommendedTier?.targetMargin ?? 50;
    const calcFn = pricingModel === 'markup' ? calculateSellingPriceByMarkup : calculateSellingPriceByMargin;
    return calcFn(
      calculationData.unit.totalCost,
      margin,
      inputs.batchQuantity,
      calculationData.totalPrintHours
    );
  }, [calculationData.unit.totalCost, recommendedTier, pricingModel, inputs.batchQuantity, calculationData.totalPrintHours]);

  // Handler: Change input
  const handleInputChange = (key, value) => {
    setInputs((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  // Handler: Select filament preset
  const handleSelectFilament = (preset) => {
    setSelectedFilamentId(preset.id);
    setInputs((prev) => ({
      ...prev,
      spoolPrice: preset.spoolPrice,
      spoolWeight: preset.spoolWeight
    }));
  };

  // Handler: Update machine config
  const handleConfigChange = (key, value) => {
    setConfig((prev) => ({
      ...prev,
      [key]: Number(value)
    }));
  };

  // Handler: Reset to factory defaults
  const handleResetDefaults = () => {
    setConfig(DEFAULT_MACHINE_CONFIG);
    setTiers(DEFAULT_PRICE_TIERS);
    showToast('Reset Bambu Lab P2S settings to factory defaults');
  };

  // Handler: Update tier profit margin
  const handleUpdateTierMargin = (tierId, newMargin) => {
    setTiers((prev) =>
      prev.map((t) => (t.id === tierId ? { ...t, targetMargin: newMargin } : t))
    );
  };

  // Helper: Show transient toast alert
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((curr) => (curr === message ? null : curr));
    }, 3200);
  };

  // Handler: Copy formatted quote to clipboard
  const handleCopyQuote = (tier, pricing) => {
    const formattedText = 
`🏷️ *3D PRINTING QUOTE - BAMBU LAB P2S*
══════════════════════════════
📦 *Part Specs:*
• Filament: ${selectedFilament.name} (${inputs.filamentGrams}g)
• Print Time: ${formatTimeDisplay(inputs.printHours, inputs.printMinutes)}
• Quantity: ${inputs.batchQuantity} unit(s)

💰 *Pricing Tier: ${tier.name}*
• Unit Price: ${formatINR(pricing.unitPrice)}
• Total Amount: ${formatINR(pricing.batchPrice)}

✨ Precision printed on high-speed Bambu Lab P2S CoreXY.
Includes cleaning, support removal & protective packaging.`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(formattedText)
        .then(() => showToast(`Copied ${tier.name} quote to clipboard`))
        .catch(() => {
          fallbackCopyText(formattedText);
          showToast(`Copied ${tier.name} quote to clipboard`);
        });
    } else {
      fallbackCopyText(formattedText);
      showToast(`Copied ${tier.name} quote to clipboard`);
    }
  };

  const fallbackCopyText = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
    } catch (err) {
      console.error('Fallback copy failed', err);
    }
    document.body.removeChild(textArea);
  };

  const handleOpenInvoiceModal = (tier, pricing) => {
    setInvoiceModal({
      isOpen: true,
      tier,
      pricing
    });
  };

  const handleCloseInvoiceModal = () => {
    setInvoiceModal({ isOpen: false, tier: null, pricing: null });
  };

  return (
    <>
      {/* 1. Apple 2-Tier Navigation (Global Nav + Frosted Sub-Nav) */}
      <Header
        onOpenConfig={() => setIsConfigOpen(true)}
        onOpenSlicerGuide={() => setIsSlicerGuideOpen(true)}
        onResetDefaults={handleResetDefaults}
      />

      {/* 2. Main Content Canvas */}
      <div className="app-wrapper">
        {/* Apple Store Hero Section */}
        <section className="hero-tile">
          <h2 className="hero-headline">Commercial 3D Print Pricing</h2>
          <p className="hero-subcopy">
            Accurate per-gram material costing, machine wear amortization, and 3 intelligent selling price strategies for the Bambu Lab P2S CoreXY.
          </p>
        </section>

        {/* Dashboard Grid: Parameters (Left) and True Production Cost Breakdown (Right) */}
        <main className="dashboard-grid">
          <QuickInputs
            inputs={inputs}
            onChangeInput={handleInputChange}
            onSelectFilamentPreset={handleSelectFilament}
            selectedFilamentId={selectedFilamentId}
          />

          <CostBreakdown
            calculationData={calculationData}
            config={config}
          />
        </main>

        {/* 3 Selling Price Recommendation Comparison Tiles */}
        <section>
          <PricingRecommendations
            unitBaseCost={calculationData.unit.totalCost}
            batchQuantity={inputs.batchQuantity}
            printHours={calculationData.totalPrintHours}
            tiers={tiers}
            onUpdateTierMargin={handleUpdateTierMargin}
            onCopyQuote={handleCopyQuote}
            onOpenInvoiceModal={handleOpenInvoiceModal}
            pricingModel={pricingModel}
            onTogglePricingModel={setPricingModel}
          />
        </section>
      </div>

      {/* 3. Apple Floating Sticky Bar (Persistent at bottom) */}
      <div className="floating-sticky-bar">
        <div className="sticky-bar-container">
          <div className="sticky-bar-left">
            <span className="sticky-bar-label">Recommended ({recommendedTier.name}):</span>
            <span className="sticky-bar-price">{formatINR(recommendedPricing.unitPrice)}</span>
            <span className="sticky-bar-subtext">
              / part {inputs.batchQuantity > 1 ? `· ${formatINR(recommendedPricing.batchPrice)} total (${inputs.batchQuantity} pcs)` : ''}
            </span>
          </div>

          <div className="sticky-bar-actions">
            <button 
              type="button" 
              className="button-secondary-pill"
              onClick={() => handleOpenInvoiceModal(recommendedTier, recommendedPricing)}
            >
              Job Sheet
            </button>
            <button 
              type="button" 
              className="button-primary"
              onClick={() => handleCopyQuote(recommendedTier, recommendedPricing)}
            >
              Copy Quote
            </button>
          </div>
        </div>
      </div>

      {/* 4. Modals */}
      <ConfigModal
        isOpen={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
        config={config}
        onChangeConfig={handleConfigChange}
        onResetDefaults={handleResetDefaults}
      />

      <SlicerGuideModal
        isOpen={isSlicerGuideOpen}
        onClose={() => setIsSlicerGuideOpen(false)}
      />

      <QuoteSheetModal
        isOpen={invoiceModal.isOpen}
        onClose={handleCloseInvoiceModal}
        tier={invoiceModal.tier}
        pricing={invoiceModal.pricing}
        inputs={inputs}
        selectedFilament={selectedFilament}
        onCopyQuote={handleCopyQuote}
      />

      {/* 5. Apple Capsule Toast Notification Alert */}
      {toastMessage && (
        <div className="toast-notification">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#30d158" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>{toastMessage}</span>
        </div>
      )}
    </>
  );
}

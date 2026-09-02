import React from 'react';
import { formatINR, formatTimeDisplay } from '../utils/calculator';

export default function QuoteSheetModal({ 
  isOpen, 
  onClose, 
  tier, 
  pricing, 
  inputs, 
  selectedFilament, 
  onCopyQuote 
}) {
  if (!isOpen || !tier || !pricing) return null;

  const handlePrint = () => {
    window.print();
  };

  const whatsappMessage = encodeURIComponent(
    `*3D PRINTING QUOTATION - BAMBU LAB P2S*\n\n` +
    `*Tier:* ${tier.name} (${tier.targetMargin}% Margin)\n` +
    `*Material:* ${selectedFilament?.name || 'Standard Filament'}\n` +
    `*Part Weight:* ${inputs.filamentGrams}g\n` +
    `*Print Time:* ${formatTimeDisplay(inputs.printHours, inputs.printMinutes)}\n` +
    `*Quantity:* ${inputs.batchQuantity} unit(s)\n\n` +
    `*Price per Unit:* ${formatINR(pricing.unitPrice)}\n` +
    `*Total Quote Amount:* ${formatINR(pricing.batchPrice)}\n\n` +
    `_Precision manufactured on Bambu Lab P2S CoreXY._`
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" style={{ maxWidth: '680px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-row">
          <h3 className="modal-sheet-title">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0066cc" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            Job Sheet & Quotation
          </h3>
          <button className="modal-close-chip" onClick={onClose} title="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Printable quotation sheet */}
        <div className="quote-sheet-content" style={{
          backgroundColor: '#ffffff',
          border: '1px solid rgba(0, 0, 0, 0.12)',
          borderRadius: 'var(--radius-md)',
          padding: 'var(--spacing-lg)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-md)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #f0f0f0', paddingBottom: 'var(--spacing-md)' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 600, color: '#1d1d1f' }}>
                3D Manufacturing Work Order
              </div>
              <div style={{ fontSize: '13px', color: '#6e6e73', marginTop: '2px' }}>
                Hardware: Bambu Lab P2S CoreXY (500mm/s)
              </div>
              <div style={{ fontSize: '12px', color: '#86868b', marginTop: '4px' }}>
                Date: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <span className="tier-badge" style={{ backgroundColor: '#f0f7ff', color: '#0066cc', border: '1px solid rgba(0, 102, 204, 0.2)' }}>
                {tier.name}
              </span>
              <div style={{ fontSize: '12px', color: '#86868b', marginTop: '4px' }}>
                {tier.targetMargin}% Commercial Margin
              </div>
            </div>
          </div>

          <div className="quote-table-wrap">
            <table className="quote-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #f0f0f0', textAlign: 'left', color: '#86868b', fontSize: '12px' }}>
                <th style={{ padding: '8px 0', fontWeight: 600 }}>Item Description</th>
                <th style={{ padding: '8px', textAlign: 'center', fontWeight: 600 }}>Filament</th>
                <th style={{ padding: '8px', textAlign: 'right', fontWeight: 600 }}>Rate</th>
                <th style={{ padding: '8px 0', textAlign: 'right', fontWeight: 600 }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                <td data-label="Item" style={{ padding: '12px 0' }}>
                  <strong style={{ color: '#1d1d1f' }}>Custom 3D Printed Component</strong>
                  <div style={{ fontSize: '12px', color: '#86868b' }}>
                    Weight: {inputs.filamentGrams}g | Slicer Time: {formatTimeDisplay(inputs.printHours, inputs.printMinutes)}
                  </div>
                </td>
                <td data-label="Filament" style={{ padding: '12px 8px', textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '13px' }}>
                  {selectedFilament?.name || 'Standard PLA'}
                </td>
                <td data-label="Rate" style={{ padding: '12px 8px', textAlign: 'right', fontFamily: 'var(--font-mono)' }}>
                  {formatINR(pricing.unitPrice)}
                </td>
                <td data-label="Amount" style={{ padding: '12px 0', textAlign: 'right', fontFamily: 'var(--font-mono)', fontWeight: 600, color: '#1d1d1f' }}>
                  {formatINR(pricing.batchPrice)}
                </td>
              </tr>
              <tr>
                <td data-label="Includes" colSpan="2" style={{ padding: '12px 0', fontSize: '12px', color: '#86868b' }}>
                  Includes: Bambu Lab P2S CoreXY printing, support removal, post-cure & protective packaging.
                </td>
                <td data-label="Quantity" style={{ padding: '12px 8px', textAlign: 'right', color: '#86868b', fontSize: '13px' }}>
                  Qty: {inputs.batchQuantity}
                </td>
                <td data-label="Units" style={{ padding: '12px 0', textAlign: 'right', fontFamily: 'var(--font-mono)' }}>
                  {inputs.batchQuantity} pcs
                </td>
              </tr>
            </tbody>
            </table>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 'var(--spacing-sm)', borderTop: '2px solid #1d1d1f' }}>
            <span style={{ fontSize: '16px', fontWeight: 600, color: '#1d1d1f' }}>Total Payable (INR):</span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 600, color: '#0066cc' }}>
              {formatINR(pricing.batchPrice)}
            </span>
          </div>
        </div>

        {/* Modal footer actions */}
        <div className="quote-modal-actions" style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-sm)', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="quote-modal-action-group" style={{ display: 'flex', gap: 'var(--spacing-xs)' }}>
            <button 
              type="button" 
              className="button-pearl-capsule" 
              onClick={handlePrint}
              title="Print or export as PDF"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 6 2 18 2 18 9"></polyline>
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                <rect x="6" y="14" width="12" height="8"></rect>
              </svg>
              Print / Save PDF
            </button>

            <a 
              href={`https://wa.me/?text=${whatsappMessage}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="button-pearl-capsule"
              style={{ textDecoration: 'none' }}
              title="Share quotation directly via WhatsApp"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="2">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
              </svg>
              Share WhatsApp
            </a>
          </div>

          <button 
            type="button" 
            className="button-primary" 
            onClick={() => onCopyQuote(tier, pricing)}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            Copy Text Summary
          </button>
        </div>
      </div>
    </div>
  );
}

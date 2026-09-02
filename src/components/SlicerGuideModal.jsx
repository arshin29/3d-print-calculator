import React from 'react';

export default function SlicerGuideModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-sheet" style={{ maxWidth: '640px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-row">
          <h3 className="modal-sheet-title">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0066cc" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            Bambu Studio Slicer Guide
          </h3>
          <button className="modal-close-chip" onClick={onClose} title="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <p style={{ fontSize: '15px', color: '#6e6e73', lineHeight: 1.4 }}>
          After slicing your 3D model in <strong>Bambu Studio</strong>, check the top-right Sliced Information window for these two key values:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
          <div style={{ padding: 'var(--spacing-md)', background: 'var(--color-surface-pearl)', border: '1px solid var(--color-hairline)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#0066cc' }}></span>
              <strong style={{ color: 'var(--color-ink)', fontSize: '15px' }}>1. Filament Weight</strong>
            </div>
            <p style={{ fontSize: '13px', color: '#6e6e73', lineHeight: 1.4 }}>
              Look for <strong>Weight</strong> (e.g. <code>85.42g</code>). For multi-color AMS prints, this automatically includes the purge tower and flush volume!
            </p>
          </div>

          <div style={{ padding: 'var(--spacing-md)', background: 'var(--color-surface-pearl)', border: '1px solid var(--color-hairline)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#0066cc' }}></span>
              <strong style={{ color: 'var(--color-ink)', fontSize: '15px' }}>2. Print Duration</strong>
            </div>
            <p style={{ fontSize: '13px', color: '#6e6e73', lineHeight: 1.4 }}>
              Look for <strong>Estimated Time</strong> (e.g. <code>2h 45m</code>). Enter the exact hours and minutes into the calculator duration fields.
            </p>
          </div>
        </div>

        <div style={{ padding: 'var(--spacing-md)', background: 'var(--color-canvas-parchment)', border: '1px solid var(--color-hairline)', borderRadius: 'var(--radius-md)' }}>
          <strong style={{ fontSize: '14px', color: 'var(--color-ink)', display: 'block', marginBottom: '6px' }}>
            Production Insights for Bambu Lab P2S:
          </strong>
          <ul style={{ fontSize: '13px', color: '#6e6e73', paddingLeft: '1.25rem', lineHeight: '1.6' }}>
            <li>Bambu Lab P2S prints up to 500mm/s with 20000mm/s² acceleration, reducing hourly machine wear and electric tariff per printed part.</li>
            <li>Maintain the <strong>8% failure/scrap buffer</strong> to absorb nozzle cleaning, filament purges, and bed adhesive prep.</li>
            <li>For complex engineering materials like PA-CF, utilize the <strong>Rush / Premium</strong> tier to account for chamber preheating and hardened nozzle wear.</li>
          </ul>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 'var(--spacing-sm)', borderTop: '1px solid var(--color-divider-soft)' }}>
          <button type="button" className="button-primary" onClick={onClose}>
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}

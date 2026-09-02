import React from 'react';

export default function Header({ onOpenConfig, onOpenSlicerGuide, onResetDefaults }) {
  return (
    <>
      {/* 1. Apple Global Nav (44px, True Black #000000) */}
      <nav className="global-nav">
        <div className="global-nav-container">
          <div className="global-nav-brand">
            <span className="global-nav-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path 
                  d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" 
                  stroke="#ffffff" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="global-nav-title">Bambu Lab P2S</span>
          </div>

          <div className="global-nav-meta">
            <span className="global-nav-telemetry">
              <span className="global-nav-telemetry-dot"></span>
              CoreXY High-Speed Engine (130W)
            </span>
            <span>500 mm/s Max</span>
            <span>INR (₹) Commercial Workspace</span>
          </div>
        </div>
      </nav>

      {/* 2. Apple Sub-Nav Frosted (Sticky 52px, Parchment with Backdrop Blur) */}
      <div className="sub-nav-frosted">
        <div className="sub-nav-container">
          <div className="sub-nav-left">
            <h1 className="sub-nav-tagline">3D Print Price Intelligence</h1>
            <span className="sub-nav-badge">INR Edition</span>
          </div>

          <div className="sub-nav-actions">
            <button 
              type="button"
              className="button-pearl-capsule" 
              onClick={onOpenSlicerGuide}
              title="Where to find weight & time in Bambu Studio"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <span>Slicer Guide</span>
            </button>

            <button 
              type="button"
              className="button-pearl-capsule" 
              onClick={onOpenConfig}
              title="Configure electricity, wear and labor rates"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <span>Machine Rates</span>
            </button>

            <button 
              type="button"
              className="button-pearl-capsule" 
              onClick={onResetDefaults}
              title="Reset parameters to Bambu Lab factory defaults"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="1 4 1 10 7 10"></polyline>
                <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
              </svg>
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

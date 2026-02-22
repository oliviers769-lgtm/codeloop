import React from 'react';
import LogoAnimated from './LogoAnimated';
import NavMenu from './NavMenu';

export default function AppHeader({ onNavigate, onBack, backLabel, isAuthenticated, onShowAuth, onSignOut, supabaseEnabled }) {
  return (
    <header style={{
      background: 'rgba(26,26,78,0.92)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      padding: '0 1.5rem', height: 64,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      position: 'sticky', top: 0, zIndex: 100,
    }}>
      {/* GAUCHE : retour ou logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {onBack && (
          <button onClick={onBack} style={{
            background: 'rgba(255,255,255,0.15)',
            border: '1px solid rgba(255,255,255,0.25)',
            color: '#fff', fontSize: 13, fontWeight: 600,
            padding: '6px 14px', borderRadius: 10, cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            ← {backLabel || 'Retour'}
          </button>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
          onClick={() => onNavigate('home')}>
          <LogoAnimated height={52} />
          <span style={{ fontFamily: 'Fraunces, serif', fontSize: 18, fontWeight: 700, color: '#fff' }}>
            Expance<span style={{ color: '#F97316' }}>Loop</span>
          </span>
        </div>
      </div>

      {/* DROITE : burger */}
      <NavMenu
        onNavigate={onNavigate}
        onShowAuth={onShowAuth}
        isAuthenticated={isAuthenticated}
        onSignOut={onSignOut}
        supabaseEnabled={supabaseEnabled}
      />
    </header>
  );
}

import React from 'react';
import AppHeader from '../components/AppHeader';
import InfinityLogo from '../components/InfinityLogo';

const BG = {
  minHeight: '100vh',
  backgroundImage: "url('/bg.jpg')",
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
};

export default function SessionEnd({ sessionData, onNavigate }) {
  const { completedExercises = [], newMarkers = [], moduleId } = sessionData || {};

  const s = {
    wrap: { ...BG, display: 'flex', flexDirection: 'column' },
    main: { maxWidth: 600, margin: '0 auto', padding: '2rem 1.5rem 4rem', flex: 1 },
    card: {
      background: 'rgba(255,255,255,0.93)', backdropFilter: 'blur(16px)',
      borderRadius: 24, padding: '2.5rem', marginBottom: '1.5rem',
      boxShadow: '0 8px 40px rgba(26,26,78,0.18)',
      animation: 'fadeUp 0.5s ease both', textAlign: 'center',
    },
    title: { fontFamily: 'Fraunces, serif', fontSize: 28, fontWeight: 700, color: '#1A1A4E', marginBottom: 8, marginTop: 20 },
    sub: { color: '#6B7280', fontSize: 15, lineHeight: 1.6, marginBottom: 28 },
    statsRow: { display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 28 },
    stat: (color) => ({
      background: color + '12', border: `2px solid ${color}30`,
      borderRadius: 16, padding: '1rem 1.5rem', minWidth: 100,
    }),
    statNum: (color) => ({ fontFamily: 'Fraunces, serif', fontSize: 32, fontWeight: 700, color }),
    statLabel: { fontSize: 12, color: '#6B7280', marginTop: 4, fontWeight: 500 },
    markersCard: {
      background: 'rgba(255,255,255,0.93)', backdropFilter: 'blur(16px)',
      borderRadius: 20, padding: '1.8rem', marginBottom: '1.5rem',
      boxShadow: '0 4px 20px rgba(26,26,78,0.1)',
      animation: 'fadeUp 0.5s 0.1s ease both',
    },
    markersTitle: {
      fontSize: 12, fontWeight: 700, color: '#9CA3AF',
      letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16,
    },
    markerItem: {
      display: 'flex', alignItems: 'flex-start', gap: 12,
      padding: '10px 0', borderBottom: '1px solid #F3F4F6',
    },
    markerCheck: {
      width: 24, height: 24, borderRadius: '50%',
      background: '#F0FDF4', color: '#10B981',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 12, fontWeight: 700, flexShrink: 0, marginTop: 1,
    },
    markerText: { fontSize: 14, color: '#374151', lineHeight: 1.5 },
    btnRow: { display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' },
    primaryBtn: {
      padding: '14px 28px', borderRadius: 14,
      background: 'linear-gradient(135deg, #F97316, #FB923C)',
      color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer',
      boxShadow: '0 4px 20px rgba(249,115,22,0.4)', border: 'none',
    },
    secondaryBtn: {
      padding: '14px 28px', borderRadius: 14,
      background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(8px)',
      color: '#1A1A4E', fontSize: 15, fontWeight: 700, cursor: 'pointer',
      border: '2px solid rgba(26,26,78,0.15)',
    },
  };

  const messages = [
    "Chaque compréhension acquise est permanente.",
    "Le raisonnement que tu viens de construire ne s'oublie pas.",
    "Tu avances. Pour de vrai.",
  ];
  const randomMsg = messages[Math.floor(Math.random() * messages.length)];

  return (
    <div style={s.wrap}>
      <AppHeader onNavigate={onNavigate} onBack={() => onNavigate('home')} backLabel="Accueil" supabaseEnabled={false} />
      <main style={s.main}>

        <div style={s.card}>
          <InfinityLogo size={72} showCheck />
          <h1 style={s.title}>? → ✓</h1>
          <p style={s.sub}>{randomMsg}</p>

          <div style={s.statsRow}>
            <div style={s.stat('#F97316')}>
              <div style={s.statNum('#F97316')}>{completedExercises.length}</div>
              <div style={s.statLabel}>Exercice{completedExercises.length > 1 ? 's' : ''}</div>
            </div>
            <div style={s.stat('#10B981')}>
              <div style={s.statNum('#10B981')}>{newMarkers.length}</div>
              <div style={s.statLabel}>Compréhension{newMarkers.length > 1 ? 's' : ''}</div>
            </div>
          </div>

          <div style={s.btnRow}>
            <button style={s.primaryBtn} onClick={() => onNavigate('module', moduleId || 'logique')}>
              Continuer →
            </button>
            <button style={s.secondaryBtn} onClick={() => onNavigate('home')}>
              Accueil
            </button>
          </div>
        </div>

        {newMarkers.length > 0 && (
          <div style={s.markersCard}>
            <div style={s.markersTitle}>Ce que tu as compris aujourd'hui</div>
            {newMarkers.map((m, i) => (
              <div key={i} style={{ ...s.markerItem, borderBottom: i === newMarkers.length - 1 ? 'none' : '1px solid #F3F4F6' }}>
                <div style={s.markerCheck}>✓</div>
                <div style={s.markerText}>{typeof m === 'string' ? m : m.text}</div>
              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
}

import React from 'react';
import InfinityLogo from '../components/InfinityLogo';
import LogoAnimated from '../components/LogoAnimated';
import { MODULES } from '../data/content';
import { isSupabaseEnabled } from '../lib/supabase';

export default function Home({ progress, onNavigate, isAuthenticated, onShowAuth, onSignOut, supabaseEnabled }) {
  const completedCount = progress.completedExercises?.length || 0;
  const markers = progress.comprehensionMarkers || [];
  const hasStarted = completedCount > 0;

  const s = {
    wrap: { minHeight: '100vh' },
    header: {
      background: 'rgba(26,26,78,0.92)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      padding: '0 1.5rem', height: 64,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      position: 'sticky', top: 0, zIndex: 100,
    },
    headerLeft: { display: 'flex', alignItems: 'center', gap: 10 },
    logo: { fontFamily: 'Fraunces, serif', fontSize: 20, fontWeight: 700, color: '#fff' },
    logoSpan: { color: '#F97316' },
    syncBtn: {
      background: isAuthenticated ? 'rgba(16,185,129,0.2)' : 'rgba(249,115,22,0.2)',
      color: isAuthenticated ? '#10B981' : '#F97316',
      border: `1px solid ${isAuthenticated ? '#10B981' : '#F97316'}`,
      borderRadius: 20, fontSize: 12, fontWeight: 700,
      padding: '5px 14px', cursor: 'pointer',
    },
    main: { maxWidth: 740, margin: '0 auto', padding: '2rem 1.5rem 4rem' },

    // PITCH SECTION
    pitchCard: {
      background: 'rgba(255,255,255,0.92)',
      backdropFilter: 'blur(16px)',
      borderRadius: 24, padding: '2.5rem',
      marginBottom: '1.5rem',
      boxShadow: '0 8px 40px rgba(26,26,78,0.18)',
      animation: 'fadeUp 0.5s ease both',
      display: 'flex', gap: '2rem', alignItems: 'center',
    },
    pitchText: { flex: 1 },
    pitchTag: {
      display: 'inline-block',
      background: '#FFF7ED', color: '#F97316',
      fontSize: 11, fontWeight: 700, letterSpacing: 2,
      padding: '4px 12px', borderRadius: 20,
      textTransform: 'uppercase', marginBottom: 12,
    },
    pitchTitle: {
      fontFamily: 'Fraunces, serif', fontSize: 28, fontWeight: 700,
      color: '#1A1A4E', lineHeight: 1.25, marginBottom: 16,
    },
    pitchBody: { color: '#374151', fontSize: 15, lineHeight: 1.7, marginBottom: 20 },
    pitchFeatures: { display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 },
    pitchFeature: {
      display: 'flex', alignItems: 'flex-start', gap: 10,
      fontSize: 14, color: '#374151',
    },
    pitchCheck: {
      width: 20, height: 20, borderRadius: '50%',
      background: '#F0FDF4', color: '#10B981',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 11, fontWeight: 700, flexShrink: 0, marginTop: 2,
    },
    pitchImg: {
      width: 200, flexShrink: 0,
      borderRadius: 16,
      overflow: 'hidden',
    },
    startBtn: {
      display: 'inline-flex', alignItems: 'center', gap: 8,
      padding: '14px 28px', borderRadius: 14,
      background: 'linear-gradient(135deg, #F97316, #FB923C)',
      color: '#fff', fontSize: 16, fontWeight: 700, cursor: 'pointer',
      boxShadow: '0 4px 20px rgba(249,115,22,0.4)', border: 'none',
    },

    // HERO (si déjà commencé)
    hero: {
      background: 'rgba(255,255,255,0.92)',
      backdropFilter: 'blur(16px)',
      borderRadius: 24, padding: '2rem',
      marginBottom: '1.5rem',
      boxShadow: '0 4px 20px rgba(26,26,78,0.12)',
      display: 'flex', alignItems: 'center', gap: '2rem',
      animation: 'fadeUp 0.5s ease both',
    },
    heroText: { flex: 1 },
    heroTitle: { fontFamily: 'Fraunces, serif', fontSize: 22, fontWeight: 700, color: '#1A1A4E', marginBottom: 6 },
    heroSub: { color: '#6B7280', fontSize: 14, marginBottom: 16 },
    continueBtn: {
      display: 'inline-flex', alignItems: 'center', gap: 8,
      padding: '12px 22px', borderRadius: 14,
      background: 'linear-gradient(135deg, #F97316, #FB923C)',
      color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer',
      boxShadow: '0 4px 16px rgba(249,115,22,0.3)', border: 'none',
    },

    sectionTitle: {
      fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.7)',
      letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12, marginTop: 28,
    },
    statsRow: { display: 'flex', gap: 12, marginBottom: 8 },
    statCard: (color) => ({
      flex: 1,
      background: 'rgba(255,255,255,0.88)',
      backdropFilter: 'blur(12px)',
      borderRadius: 16, padding: '1.2rem',
      boxShadow: '0 2px 12px rgba(26,26,78,0.1)',
      borderTop: `3px solid ${color}`,
    }),
    statNum: (color) => ({ fontFamily: 'Fraunces, serif', fontSize: 32, fontWeight: 700, color, lineHeight: 1 }),
    statLabel: { fontSize: 12, color: '#6B7280', marginTop: 4, fontWeight: 500 },
    moduleCard: (i) => ({
      background: 'rgba(255,255,255,0.88)',
      backdropFilter: 'blur(12px)',
      borderRadius: 18, padding: '1.4rem 1.6rem',
      marginBottom: 10, boxShadow: '0 2px 12px rgba(26,26,78,0.08)',
      display: 'flex', alignItems: 'center', gap: 16, cursor: 'pointer',
      border: '2px solid transparent', transition: 'all 0.2s ease',
      animation: `fadeUp 0.5s ${0.1 + i * 0.07}s ease both`,
    }),
    moduleIcon: (color) => ({
      width: 48, height: 48, borderRadius: 14, background: color + '22',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 22, flexShrink: 0,
    }),
    moduleInfo: { flex: 1 },
    moduleTitle: { fontWeight: 700, color: '#1A1A4E', fontSize: 15, marginBottom: 2 },
    moduleSub: { color: '#6B7280', fontSize: 13 },
    moduleBadge: { fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 10, background: '#F0FDF4', color: '#10B981', flexShrink: 0 },
    markerList: {
      background: 'rgba(255,255,255,0.88)',
      backdropFilter: 'blur(12px)',
      borderRadius: 18, padding: '1.5rem',
      boxShadow: '0 2px 12px rgba(26,26,78,0.08)',
    },
    markerItem: (last) => ({
      display: 'flex', alignItems: 'flex-start', gap: 10,
      padding: '10px 0', borderBottom: last ? 'none' : '1px solid #F3F4F6',
    }),
    markerCheck: {
      width: 22, height: 22, borderRadius: '50%',
      background: '#F0FDF4', color: '#10B981',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 11, fontWeight: 700, flexShrink: 0, marginTop: 1,
    },
    markerText: { fontSize: 14, color: '#374151', lineHeight: 1.4 },
  };

  return (
    <div style={s.wrap}>
      <header style={s.header}>
        <div style={s.headerLeft}>
          <LogoAnimated height={42} />
          <div style={s.logo}>Expance<span style={s.logoSpan}>Loop</span></div>
        </div>
        {supabaseEnabled && (
          <button style={s.syncBtn} onClick={isAuthenticated ? onSignOut : onShowAuth}>
            {isAuthenticated ? '✓ Synchronisé' : '☁ Sauvegarder'}
          </button>
        )}
      </header>

      <main style={s.main}>

        {/* PITCH — affiché seulement si pas encore commencé */}
        {!hasStarted && (
          <div style={s.pitchCard}>
            <div style={s.pitchText}>
              <div style={s.pitchTag}>ExpanceLoop</div>
              <h1 style={s.pitchTitle}>Tu n'es pas nul.<br/>On t'a juste mal expliqué.</h1>
              <p style={s.pitchBody}>
                ExpanceLoop t'apprend à <strong>comprendre</strong> le code — pas à le réciter.
                Chaque session de 5 à 10 minutes est construite autour d'une question :
                <em> « Pourquoi est-ce que ça fonctionne — ou pas ? »</em>
              </p>
              <div style={s.pitchFeatures}>
                {[
                  "Logique, Python, HTML/CSS, JavaScript, SQL",
                  "Le Mode Compréhension : on corrige ton raisonnement, pas juste ta réponse",
                  "Sans abonnement, sans pub, sans pression",
                  "5 à 10 minutes par session — à ton rythme",
                ].map((f, i) => (
                  <div key={i} style={s.pitchFeature}>
                    <div style={s.pitchCheck}>✓</div>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
              <button style={s.startBtn} onClick={() => onNavigate('module', 'logique')}>
                Commencer gratuitement →
              </button>
            </div>
            <div style={s.pitchImg}>
              <img src="/hero.png" alt="Apprendre à coder" style={{ width: '100%', display: 'block' }} />
            </div>
          </div>
        )}

        {/* HERO — affiché si déjà commencé */}
        {hasStarted && (
          <div style={s.hero}>
            <div style={s.heroText}>
              <h1 style={s.heroTitle}>Continue ta boucle</h1>
              <p style={s.heroSub}>{completedCount} exercice{completedCount > 1 ? 's' : ''} complété{completedCount > 1 ? 's' : ''}. Tu progresses.</p>
              <button style={s.continueBtn} onClick={() => onNavigate('module', 'logique')}>Continuer →</button>
            </div>
            <InfinityLogo size={56} showCheck />
          </div>
        )}

        {/* STATS */}
        {hasStarted && (
          <>
            <div style={s.sectionTitle}>Ta progression</div>
            <div style={s.statsRow}>
              {[
                { num: completedCount, label: 'Exercices', color: '#F97316' },
                { num: markers.length, label: 'Compréhensions', color: '#10B981' },
                { num: progress.sessions || 0, label: 'Sessions', color: '#1A1A4E' },
              ].map(({ num, label, color }) => (
                <div key={label} style={s.statCard(color)}>
                  <div style={s.statNum(color)}>{num}</div>
                  <div style={s.statLabel}>{label}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* MODULES */}
        <div style={s.sectionTitle}>Modules</div>
        {MODULES.map((mod, i) => (
          <div key={mod.id} style={s.moduleCard(i)}
            onClick={() => onNavigate('module', mod.id)}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#F97316'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'transparent'; }}>
            <div style={s.moduleIcon(mod.color)}>{mod.icon}</div>
            <div style={s.moduleInfo}>
              <div style={s.moduleTitle}>{mod.title}</div>
              <div style={s.moduleSub}>{mod.subtitle} · {mod.lessons} leçons</div>
            </div>
            <div style={s.moduleBadge}>Gratuit</div>
          </div>
        ))}

        {/* JOURNAL */}
        {markers.length > 0 && (
          <>
            <div style={s.sectionTitle}>Journal des compréhensions</div>
            <div style={s.markerList}>
              {markers.slice().reverse().map((m, i) => (
                <div key={i} style={s.markerItem(i === markers.length - 1)}>
                  <div style={s.markerCheck}>✓</div>
                  <div style={s.markerText}>{m.text}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

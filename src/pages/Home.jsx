import React from 'react';
import InfinityLogo from '../components/InfinityLogo';
import AppHeader from '../components/AppHeader';
import { MODULES } from '../data/content';

const BG = {
  minHeight: '100vh',
  backgroundImage: "url('/bg.jpg')",
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
};

export default function Home({ progress, onNavigate, isAuthenticated, onShowAuth, onSignOut, supabaseEnabled }) {
  const completedCount = progress.completedExercises?.length || 0;
  const markers = progress.comprehensionMarkers || [];
  const hasStarted = completedCount > 0;

  const s = {
    main: { maxWidth: 740, margin: '0 auto', padding: '2rem 1.5rem 4rem' },
    card: (delay = 0) => ({
      background: 'rgba(255,255,255,0.93)', backdropFilter: 'blur(16px)',
      borderRadius: 24, padding: '2.5rem', marginBottom: '1.5rem',
      boxShadow: '0 8px 40px rgba(26,26,78,0.18)',
      animation: `fadeUp 0.5s ${delay}s ease both`,
    }),
    pitchTag: {
      display: 'inline-block', background: '#FFF7ED', color: '#F97316',
      fontSize: 11, fontWeight: 700, letterSpacing: 2, padding: '4px 12px',
      borderRadius: 20, textTransform: 'uppercase', marginBottom: 12,
    },
    pitchTitle: { fontFamily: 'Fraunces, serif', fontSize: 28, fontWeight: 700, color: '#1A1A4E', lineHeight: 1.25, marginBottom: 16 },
    pitchBody: { color: '#374151', fontSize: 15, lineHeight: 1.7, marginBottom: 20 },
    pitchRow: { display: 'flex', gap: '2rem', alignItems: 'center' },
    pitchText: { flex: 1 },
    pitchImg: { width: 180, flexShrink: 0, borderRadius: 16, overflow: 'hidden' },
    features: { display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 },
    feature: { display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: '#374151' },
    check: {
      width: 20, height: 20, borderRadius: '50%', background: '#F0FDF4', color: '#10B981',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 11, fontWeight: 700, flexShrink: 0, marginTop: 2,
    },
    primaryBtn: {
      display: 'inline-flex', alignItems: 'center', gap: 8,
      padding: '14px 28px', borderRadius: 14,
      background: 'linear-gradient(135deg, #F97316, #FB923C)',
      color: '#fff', fontSize: 16, fontWeight: 700, cursor: 'pointer',
      boxShadow: '0 4px 20px rgba(249,115,22,0.4)', border: 'none',
    },
    heroRow: { display: 'flex', alignItems: 'center', gap: '2rem' },
    heroTitle: { fontFamily: 'Fraunces, serif', fontSize: 22, fontWeight: 700, color: '#1A1A4E', marginBottom: 6 },
    heroSub: { color: '#6B7280', fontSize: 14, marginBottom: 16 },
    sectionTitle: {
      fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.9)',
      letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12, marginTop: 28,
      textShadow: '0 1px 4px rgba(0,0,0,0.4)',
    },
    statsRow: { display: 'flex', gap: 12, marginBottom: 8 },
    statCard: (color) => ({
      flex: 1, background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(12px)',
      borderRadius: 16, padding: '1.2rem', boxShadow: '0 2px 12px rgba(26,26,78,0.1)',
      borderTop: `3px solid ${color}`,
    }),
    statNum: (color) => ({ fontFamily: 'Fraunces, serif', fontSize: 32, fontWeight: 700, color, lineHeight: 1 }),
    statLabel: { fontSize: 12, color: '#6B7280', marginTop: 4, fontWeight: 500 },
    moduleCard: (i) => ({
      background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(12px)',
      borderRadius: 18, padding: '1.4rem 1.6rem', marginBottom: 10,
      boxShadow: '0 2px 12px rgba(26,26,78,0.08)',
      display: 'flex', alignItems: 'center', gap: 16, cursor: 'pointer',
      border: '2px solid transparent', transition: 'all 0.2s ease',
      animation: `fadeUp 0.5s ${0.1 + i * 0.07}s ease both`,
    }),
    moduleIcon: (color) => ({
      width: 48, height: 48, borderRadius: 14, background: color + '22',
      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0,
    }),
    moduleInfo: { flex: 1 },
    moduleTitle: { fontWeight: 700, color: '#1A1A4E', fontSize: 15, marginBottom: 2 },
    moduleSub: { color: '#6B7280', fontSize: 13 },
    badge: { fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 10, background: '#F0FDF4', color: '#10B981', flexShrink: 0 },
    markerList: {
      background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(12px)',
      borderRadius: 18, padding: '1.5rem', boxShadow: '0 2px 12px rgba(26,26,78,0.08)',
    },
    markerItem: (last) => ({
      display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 0',
      borderBottom: last ? 'none' : '1px solid #F3F4F6',
    }),
    markerCheck: {
      width: 22, height: 22, borderRadius: '50%', background: '#F0FDF4', color: '#10B981',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 11, fontWeight: 700, flexShrink: 0, marginTop: 1,
    },
  };

  return (
    <div style={BG}>
      <AppHeader
        onNavigate={onNavigate}
        isAuthenticated={isAuthenticated}
        onShowAuth={onShowAuth}
        onSignOut={onSignOut}
        supabaseEnabled={supabaseEnabled}
      />
      <main style={s.main}>

        {/* PITCH — nouveaux visiteurs */}
        {!hasStarted && (
          <div style={s.card(0)}>
            <div style={s.pitchRow}>
              <div style={s.pitchText}>
                <div style={s.pitchTag}>ExpanceLoop</div>
                <h1 style={s.pitchTitle}>Tu n'es pas nul.<br/>On t'a juste mal expliqué.</h1>
                <p style={s.pitchBody}>
                  ExpanceLoop t'apprend à <strong>comprendre</strong> le code — pas à le réciter.
                  Chaque session de 5 à 10 minutes tourne autour d'une question :
                  <em> « Pourquoi est-ce que ça fonctionne — ou pas ? »</em>
                </p>
                <div style={s.features}>
                  {[
                    "Logique, Python, HTML/CSS, JavaScript, SQL",
                    "Mode Compréhension : on corrige ton raisonnement, pas juste ta réponse",
                    "Sans abonnement, sans pub, sans pression",
                    "5 à 10 min par session — à ton rythme",
                  ].map((f, i) => (
                    <div key={i} style={s.feature}>
                      <div style={s.check}>✓</div>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
                <button style={s.primaryBtn} onClick={() => onNavigate('module', 'logique')}>
                  Commencer gratuitement →
                </button>
              </div>
              <div style={s.pitchImg}>
                <img src="/hero.png" alt="ExpanceLoop" style={{ width: '100%', display: 'block' }} />
              </div>
            </div>
          </div>
        )}

        {/* HERO — visiteurs qui ont commencé */}
        {hasStarted && (
          <div style={s.card(0)}>
            <div style={s.heroRow}>
              <div style={{ flex: 1 }}>
                <h1 style={s.heroTitle}>Continue ta boucle</h1>
                <p style={s.heroSub}>{completedCount} exercice{completedCount > 1 ? 's' : ''} complété{completedCount > 1 ? 's' : ''}. Tu progresses.</p>
                <button style={s.primaryBtn} onClick={() => onNavigate('module', 'logique')}>Continuer →</button>
              </div>
              <InfinityLogo size={56} showCheck />
            </div>
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
            <div style={s.badge}>Gratuit</div>
          </div>
        ))}

        {/* BONUS — LE TABLEUR APPRIVOISÉ */}
        <div style={{ ...s.sectionTitle, marginTop: 28 }}>Et aussi...</div>
        <div
          onClick={() => onNavigate('tableur')}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#10B981'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(16,185,129,0.2)'; }}
          style={{
            background: 'linear-gradient(135deg, rgba(236,253,245,0.92), rgba(209,250,229,0.85))',
            backdropFilter: 'blur(12px)', borderRadius: 18, padding: '1.4rem 1.6rem',
            marginBottom: 10, cursor: 'pointer',
            border: '2px solid rgba(16,185,129,0.2)',
            display: 'flex', alignItems: 'center', gap: 16,
            boxShadow: '0 2px 12px rgba(16,185,129,0.08)',
            transition: 'border-color 0.2s ease',
          }}>
          <div style={{
            width: 46, height: 46, borderRadius: 12,
            background: 'rgba(16,185,129,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 26, flexShrink: 0,
          }}>🦊</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, color: '#065F46', fontSize: 15, marginBottom: 2 }}>
              Le Tableur Apprivoisé
            </div>
            <div style={{ color: '#6B7280', fontSize: 13 }}>
              Excel & Google Sheets sans la prise de tête · 6 leçons
            </div>
          </div>
          <div style={{
            background: 'rgba(16,185,129,0.15)', color: '#065F46',
            fontSize: 11, fontWeight: 700, padding: '4px 10px',
            borderRadius: 8, letterSpacing: 0.5,
          }}>Bonus</div>
        </div>

        {/* JOURNAL */}
        {markers.length > 0 && (
          <>
            <div style={s.sectionTitle}>Journal des compréhensions</div>
            <div style={s.markerList}>
              {markers.slice().reverse().map((m, i) => (
                <div key={i} style={s.markerItem(i === markers.length - 1)}>
                  <div style={s.markerCheck}>✓</div>
                  <div style={{ fontSize: 14, color: '#374151', lineHeight: 1.4 }}>{m.text}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* COMPTEUR DE PAYS */}
        <div style={{
          background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)',
          borderRadius: 16, padding: '1rem 1.5rem', marginTop: 8,
          display: 'flex', alignItems: 'center', gap: 10,
          border: '1px solid rgba(255,255,255,0.2)',
        }}>
          <span style={{ fontSize: 20 }}>🌍</span>
          <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: 13, fontWeight: 500 }}>
            Déjà utilisé en <strong>France</strong>, en <strong>Italie</strong> et au <strong>Liban</strong>
          </span>
        </div>

        {/* CONTACT & RETOURS */}
        <div style={{
          background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(16px)',
          borderRadius: 20, padding: '1.5rem', marginTop: 10,
          boxShadow: '0 4px 20px rgba(26,26,78,0.08)',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: 22, marginBottom: 8 }}>💬</div>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: 16, fontWeight: 700, color: '#1A1A4E', marginBottom: 6 }}>
            Un avis, une idée, un bug ?
          </div>
          <div style={{ color: '#6B7280', fontSize: 13, marginBottom: 14, lineHeight: 1.5 }}>
            ExpanceLoop est en phase de lancement — vos retours sont précieux.
          </div>
          <a href="mailto:expanceloop.team@outlook.fr?subject=Retour ExpanceLoop&body=Bonjour,%0A%0AVoici mon retour sur ExpanceLoop :%0A%0A"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '12px 24px', borderRadius: 12,
              background: 'linear-gradient(135deg, #F97316, #FB923C)',
              color: '#fff', fontSize: 14, fontWeight: 700,
              textDecoration: 'none', boxShadow: '0 4px 16px rgba(249,115,22,0.3)',
            }}>
            ✉️ Écrire à l'équipe
          </a>
          <div style={{ marginTop: 12, color: '#9CA3AF', fontSize: 12 }}>
            expanceloop.team@outlook.fr
          </div>
        </div>

      </main>
    </div>
  );
}

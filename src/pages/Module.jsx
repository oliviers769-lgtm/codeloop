import React from 'react';
import { MODULES } from '../data/content';
import { LOGIQUE_EXERCISES } from '../data/logique_exercises';
import { PYTHON_EXERCISES_FULL } from '../data/python_exercises';
import { HTML_EXERCISES_FULL } from '../data/html_exercises';
import { JS_EXERCISES_FULL } from '../data/javascript_exercises';
import { SQL_EXERCISES_FULL } from '../data/sql_exercises';
import AppHeader from '../components/AppHeader';

const BG = {
  minHeight: '100vh',
  backgroundImage: "url('/bg.jpg')",
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
};

const ALL_EXERCISES = {
  logique: LOGIQUE_EXERCISES || [],
  python: PYTHON_EXERCISES_FULL || [],
  'html-css': HTML_EXERCISES_FULL || [],
  javascript: JS_EXERCISES_FULL || [],
  sql: SQL_EXERCISES_FULL || [],
};

export default function Module({ moduleId, progress, onNavigate, onBack }) {
  const mod = MODULES.find(m => m.id === moduleId);
  const exercises = ALL_EXERCISES[moduleId] || [];
  const completed = progress.completedExercises || [];
  const doneCount = exercises.filter(e => completed.includes(e.id)).length;
  const pct = exercises.length > 0 ? Math.round((doneCount / exercises.length) * 100) : 0;
  const isLive = (ex) => ex.type === 'code' || ex.type === 'html';

  const typeLabels = {
    predict: '🔮 Prévoir la sortie',
    findError: "🔍 Trouver l'erreur",
    complete: '✏️ Compléter',
    code: '▶ Code interactif',
    html: '👁 HTML/CSS live',
  };

  const s = {
    main: { maxWidth: 700, margin: '0 auto', padding: '2rem 1.5rem 4rem' },
    headerCard: {
      background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(16px)',
      borderRadius: 20, padding: '2rem', marginBottom: 16,
      boxShadow: '0 4px 20px rgba(26,26,78,0.08)',
      animation: 'fadeUp 0.4s ease both',
    },
    sectionTitle: {
      fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.9)',
      letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12, marginTop: 8,
      textShadow: '0 1px 4px rgba(0,0,0,0.4)',
    },
    exCard: (done, i) => ({
      background: done ? 'rgba(240,253,244,0.92)' : 'rgba(255,255,255,0.88)',
      backdropFilter: 'blur(12px)', borderRadius: 18, padding: '1.4rem 1.6rem',
      marginBottom: 10, boxShadow: '0 2px 12px rgba(26,26,78,0.06)',
      display: 'flex', alignItems: 'center', gap: 16, cursor: 'pointer',
      border: `2px solid ${done ? '#10B981' : 'transparent'}`, transition: 'all 0.2s ease',
      animation: `fadeUp 0.4s ${0.05 + i * 0.06}s ease both`,
    }),
    exNum: (done) => ({
      width: 42, height: 42, borderRadius: 12,
      background: done ? '#D1FAE5' : '#EEF2FF',
      color: done ? '#10B981' : '#1A1A4E',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: done ? 18 : 15, fontWeight: 700, flexShrink: 0,
    }),
    liveBadge: {
      display: 'inline-flex', alignItems: 'center', gap: 4,
      background: '#EFF6FF', color: '#3B82F6',
      fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 8, marginLeft: 8,
    },
  };

  return (
    <div style={BG}>
      <AppHeader
        onNavigate={onNavigate}
        onBack={onBack}
        backLabel="Accueil"
        supabaseEnabled={false}
      />
      <main style={s.main}>
        <div style={s.headerCard}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>{mod?.icon}</div>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: 26, fontWeight: 700, color: '#1A1A4E', marginBottom: 6 }}>{mod?.title}</div>
          <div style={{ color: '#6B7280', fontSize: 14, marginBottom: 16 }}>{mod?.description}</div>
          <div style={{ background: '#F3F4F6', borderRadius: 8, height: 6, overflow: 'hidden' }}>
            <div style={{ height: '100%', borderRadius: 8, background: 'linear-gradient(90deg, #F97316, #FB923C)', width: `${pct}%`, transition: 'width 0.6s ease' }} />
          </div>
          <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 6 }}>{doneCount} / {exercises.length} exercices complétés</div>
        </div>

        <div style={s.sectionTitle}>Exercices</div>

        {exercises.map((ex, i) => {
          const done = completed.includes(ex.id);
          const live = isLive(ex);
          return (
            <div key={ex.id} style={s.exCard(done, i)}
              onClick={() => onNavigate(live ? 'exerciseLive' : 'exercise', ex)}
              onMouseEnter={e => { if (!done) e.currentTarget.style.borderColor = '#F97316'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = done ? '#10B981' : 'transparent'; }}>
              <div style={s.exNum(done)}>{done ? '✓' : i + 1}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: '#1A1A4E', fontSize: 15, marginBottom: 3 }}>
                  {ex.title}
                  {live && <span style={s.liveBadge}>▶ Live</span>}
                </div>
                <div style={{ color: '#9CA3AF', fontSize: 12 }}>{typeLabels[ex.type] || ex.type}</div>
              </div>
              <div style={{ color: '#D1D5DB', fontSize: 18 }}>›</div>
            </div>
          );
        })}
      </main>
    </div>
  );
}

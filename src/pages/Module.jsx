import React from 'react';
import { MODULES, EXERCISES, PYTHON_EXERCISES, HTML_EXERCISES } from '../data/content';

const JS_EXERCISES = EXERCISES.javascript || [];
const SQL_EXERCISES = EXERCISES.sql || [];

const ALL_EXERCISES = {
  logique: EXERCISES.logique || [],
  python: PYTHON_EXERCISES || [],
  'html-css': HTML_EXERCISES || [],
  javascript: JS_EXERCISES,
  sql: SQL_EXERCISES,
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
    complete: '✏️ Compléter le code',
    code: '▶ Code interactif',
    html: '👁 HTML/CSS live',
  };

  const s = {
    wrap: { minHeight: '100vh', background: 'linear-gradient(160deg, #F3F4F6 0%, #EEF2FF 100%)', padding: '1.5rem' },
    backBtn: {
      background: 'none', border: 'none', color: '#6B7280',
      fontSize: 14, fontWeight: 600, cursor: 'pointer',
      display: 'flex', alignItems: 'center', gap: 6, marginBottom: 20, padding: 0,
    },
    header: {
      background: '#fff', borderRadius: 20, padding: '2rem',
      marginBottom: 16, boxShadow: '0 4px 20px rgba(26,26,78,0.08)',
      animation: 'fadeUp 0.4s ease both',
    },
    moduleIconBig: { fontSize: 40, marginBottom: 12 },
    moduleTitle: { fontFamily: 'Fraunces, serif', fontSize: 26, fontWeight: 700, color: '#1A1A4E', marginBottom: 6 },
    moduleSub: { color: '#6B7280', fontSize: 14 },
    progressBar: { marginTop: 16, background: '#F3F4F6', borderRadius: 8, height: 6, overflow: 'hidden' },
    progressFill: { height: '100%', borderRadius: 8, background: 'linear-gradient(90deg, #F97316, #FB923C)', transition: 'width 0.6s ease' },
    progressLabel: { fontSize: 12, color: '#9CA3AF', marginTop: 6 },
    sectionTitle: { fontSize: 12, fontWeight: 700, color: '#9CA3AF', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12, marginTop: 8 },
    exCard: (done, i) => ({
      background: '#fff', borderRadius: 18, padding: '1.4rem 1.6rem',
      marginBottom: 10, boxShadow: '0 2px 12px rgba(26,26,78,0.06)',
      display: 'flex', alignItems: 'center', gap: 16, cursor: 'pointer',
      border: `2px solid ${done ? '#10B981' : 'transparent'}`,
      transition: 'all 0.2s ease',
      animation: `fadeUp 0.4s ${0.05 + i * 0.08}s ease both`,
    }),
    exNum: (done) => ({
      width: 42, height: 42, borderRadius: 12,
      background: done ? '#F0FDF4' : '#EEF2FF',
      color: done ? '#10B981' : '#1A1A4E',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: done ? 18 : 15, fontWeight: 700, flexShrink: 0,
    }),
    exInfo: { flex: 1 },
    exTitle: { fontWeight: 700, color: '#1A1A4E', fontSize: 15, marginBottom: 3 },
    exType: { color: '#9CA3AF', fontSize: 12, fontWeight: 500 },
    exArrow: { color: '#D1D5DB', fontSize: 18 },
    liveBadge: {
      display: 'inline-flex', alignItems: 'center', gap: 4,
      background: '#EFF6FF', color: '#3B82F6',
      fontSize: 10, fontWeight: 700, padding: '2px 8px',
      borderRadius: 8, marginLeft: 8,
    },
    emptyState: {
      background: '#fff', borderRadius: 18, padding: '2.5rem',
      textAlign: 'center', boxShadow: '0 2px 12px rgba(26,26,78,0.06)',
    }
  };

  return (
    <div style={s.wrap}>
      <button style={s.backBtn} onClick={onBack}>← Accueil</button>
      <div style={s.header}>
        <div style={s.moduleIconBig}>{mod?.icon}</div>
        <div style={s.moduleTitle}>{mod?.title}</div>
        <div style={s.moduleSub}>{mod?.description}</div>
        <div style={s.progressBar}>
          <div style={{ ...s.progressFill, width: `${pct}%` }} />
        </div>
        <div style={s.progressLabel}>{doneCount} / {exercises.length} exercices complétés</div>
      </div>

      <div style={s.sectionTitle}>Exercices</div>

      {exercises.length === 0 ? (
        <div style={s.emptyState}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🚧</div>
          <div style={{ color: '#6B7280', fontSize: 14 }}>Les exercices arrivent bientôt.</div>
        </div>
      ) : exercises.map((ex, i) => {
        const done = completed.includes(ex.id);
        const live = isLive(ex);
        return (
          <div key={ex.id}
            style={s.exCard(done, i)}
            onClick={() => onNavigate(live ? 'exerciseLive' : 'exercise', ex)}
            onMouseEnter={e => { if (!done) e.currentTarget.style.borderColor = '#F97316'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = done ? '#10B981' : 'transparent'; }}>
            <div style={s.exNum(done)}>{done ? '✓' : i + 1}</div>
            <div style={s.exInfo}>
              <div style={s.exTitle}>
                {ex.title}
                {live && <span style={s.liveBadge}>▶ Live</span>}
              </div>
              <div style={s.exType}>{typeLabels[ex.type] || ex.type}</div>
            </div>
            <div style={s.exArrow}>›</div>
          </div>
        );
      })}
    </div>
  );
}

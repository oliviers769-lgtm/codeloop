import React, { useState } from 'react';
import InfinityLogo from '../components/InfinityLogo';
import CodeEditor from '../components/CodeEditor';
import HtmlPreview from '../components/HtmlPreview';
import { COMPREHENSION_MARKERS_PYTHON, COMPREHENSION_MARKERS_HTML } from '../data/content';

const ALL_MARKERS = { ...COMPREHENSION_MARKERS_PYTHON, ...COMPREHENSION_MARKERS_HTML };

export default function ExerciseLive({ exercise, onComplete, onBack }) {
  const [phase, setPhase] = useState('exercise'); // exercise | comprehension | result
  const [codeSuccess, setCodeSuccess] = useState(false);
  const [compSelected, setCompSelected] = useState(null);
  const [showCompExplanation, setShowCompExplanation] = useState(false);

  const handleCodeSuccess = () => setCodeSuccess(true);

  const goToComprehension = () => {
    setPhase('comprehension');
    setCompSelected(null);
    setShowCompExplanation(false);
  };

  const handleComprehension = (opt) => {
    if (compSelected) return;
    setCompSelected(opt.id);
    setTimeout(() => setShowCompExplanation(true), 400);
  };

  const handleFinish = () => {
    const marker = ALL_MARKERS[exercise.id];
    onComplete(exercise.id, marker);
    setPhase('result');
  };

  const s = {
    wrap: {
      minHeight: '100vh',
      background: 'rgba(240,244,255,0.55)',
      padding: '1.5rem',
    },
    backBtn: {
      background: 'none',
      border: 'none',
      color: '#6B7280',
      fontSize: 14,
      fontWeight: 600,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      marginBottom: 20,
      padding: 0,
    },
    card: {
      background: '#fff',
      borderRadius: 24,
      padding: '2rem',
      maxWidth: 660,
      margin: '0 auto',
      boxShadow: '0 8px 40px rgba(26,26,78,0.10)',
      animation: 'fadeUp 0.4s ease both',
    },
    typeTag: (lang) => ({
      display: 'inline-block',
      background: lang === 'python' ? '#EFF6FF' : lang === 'html' ? '#FDF2F8' : '#EEF2FF',
      color: lang === 'python' ? '#3B82F6' : lang === 'html' ? '#EC4899' : '#1A1A4E',
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: 1.5,
      padding: '4px 12px',
      borderRadius: 20,
      textTransform: 'uppercase',
      marginBottom: 16,
    }),
    title: {
      fontFamily: 'Fraunces, serif',
      fontSize: 22,
      fontWeight: 700,
      color: '#1A1A4E',
      marginBottom: 12,
      lineHeight: 1.3,
    },
    explanation: {
      background: '#F8FAFF',
      border: '1px solid #E0E7FF',
      borderRadius: 14,
      padding: '14px 16px',
      fontSize: 14,
      color: '#374151',
      lineHeight: 1.6,
      marginBottom: 16,
    },
    taskBox: {
      background: '#FFF7ED',
      border: '1px solid #FED7AA',
      borderRadius: 14,
      padding: '14px 16px',
      fontSize: 14,
      color: '#92400E',
      lineHeight: 1.6,
      marginBottom: 4,
    },
    taskLabel: {
      fontWeight: 700,
      color: '#F97316',
      fontSize: 12,
      letterSpacing: 1.5,
      textTransform: 'uppercase',
      marginBottom: 4,
    },
    continueBtn: {
      width: '100%',
      padding: '15px',
      borderRadius: 14,
      background: 'linear-gradient(135deg, #F97316, #FB923C)',
      color: '#fff',
      fontSize: 15,
      fontWeight: 700,
      marginTop: 16,
      cursor: 'pointer',
      border: 'none',
      boxShadow: '0 4px 16px rgba(249,115,22,0.3)',
    },
    option: (id, correct, selectedId) => {
      let bg = '#FAFAFA', border = '#E5E7EB', color = '#1F2937';
      if (selectedId) {
        if (id === selectedId) {
          bg = correct ? '#F0FDF4' : '#FEF2F2';
          border = correct ? '#10B981' : '#EF4444';
          color = correct ? '#065F46' : '#7F1D1D';
        } else if (correct) {
          bg = '#F0FDF4'; border = '#10B981'; color = '#065F46';
        }
      }
      return {
        width: '100%', padding: '14px 18px', borderRadius: 14,
        border: `2px solid ${border}`, background: bg, color,
        fontSize: 14, fontWeight: 500, marginBottom: 8,
        cursor: selectedId ? 'default' : 'pointer',
        textAlign: 'left', transition: 'all 0.25s ease',
        display: 'flex', alignItems: 'center', gap: 10,
      };
    },
    optionLetter: (id, correct, selectedId) => {
      let bg = '#E5E7EB', color = '#6B7280';
      if (selectedId) {
        if (id === selectedId || correct) { bg = correct ? '#10B981' : id === selectedId ? '#EF4444' : '#E5E7EB'; color = correct || id === selectedId ? '#fff' : '#6B7280'; }
      }
      return {
        width: 28, height: 28, borderRadius: 8, background: bg, color,
        fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center',
        justifyContent: 'center', flexShrink: 0, transition: 'all 0.25s ease',
      };
    },
    feedbackBox: (correct) => ({
      borderRadius: 14, padding: '16px',
      background: correct ? '#F0FDF4' : '#FFF7ED',
      border: `1px solid ${correct ? '#10B981' : '#F97316'}`,
      marginTop: 16, fontSize: 14, color: '#374151', lineHeight: 1.6,
      animation: 'fadeUp 0.3s ease both',
    }),
    feedbackTitle: (correct) => ({
      fontWeight: 700, color: correct ? '#065F46' : '#C2410C',
      marginBottom: 6, fontSize: 15,
    }),
    resultWrap: { textAlign: 'center', padding: '1rem 0' },
    resultTitle: {
      fontFamily: 'Fraunces, serif', fontSize: 28, fontWeight: 700,
      color: '#1A1A4E', marginBottom: 12,
    },
    resultMarker: {
      background: '#F0FDF4', border: '1px solid #10B981', borderRadius: 14,
      padding: '14px 18px', margin: '20px 0', fontSize: 14, color: '#065F46',
      fontWeight: 500, textAlign: 'left', display: 'flex', alignItems: 'flex-start', gap: 10,
    },
  };

  const letters = ['A', 'B', 'C'];
  const langLabel = exercise.lang === 'python' ? 'Python' : 'HTML & CSS';

  // RESULT
  if (phase === 'result') return (
    <div style={s.wrap}>
      <div style={{ maxWidth: 660, margin: '0 auto' }}>
        <button style={s.backBtn} onClick={onBack}>← Retour</button>
        <div style={s.card}>
          <div style={s.resultWrap}>
            <InfinityLogo size={64} showCheck />
            <div style={{ marginTop: 24 }}>
              <div style={s.resultTitle}>? → ✓</div>
              <p style={{ color: '#6B7280', fontSize: 15 }}>
                Tu viens d'acquérir une nouvelle compréhension.
              </p>
              <div style={s.resultMarker}>
                <span style={{ color: '#10B981', fontWeight: 700, fontSize: 16 }}>✓</span>
                <span>{ALL_MARKERS[exercise.id]}</span>
              </div>
              <button style={s.continueBtn} onClick={onBack}>
                Exercice suivant →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // COMPREHENSION
  if (phase === 'comprehension') return (
    <div style={s.wrap}>
      <div style={{ maxWidth: 660, margin: '0 auto' }}>
        <button style={s.backBtn} onClick={onBack}>← Retour</button>
        <div style={s.card}>
          <div style={{ ...s.typeTag(''), background: '#FFF7ED', color: '#F97316' }}>
            Mode Compréhension
          </div>
          <h2 style={s.title}>{exercise.comprehension.question}</h2>
          <div style={{
            background: '#EEF2FF', border: '1px solid #C7D2FE',
            borderRadius: 14, padding: '14px 16px', marginBottom: 20,
            fontSize: 14, color: '#374151',
          }}>
            Ne devine pas — choisis l'explication qui te semble <strong>vraiment juste</strong>.
          </div>
          {exercise.comprehension.options.map((opt, i) => (
            <button key={opt.id}
              style={s.option(opt.id, opt.correct, compSelected)}
              onClick={() => handleComprehension(opt)}>
              <span style={s.optionLetter(opt.id, opt.correct, compSelected)}>
                {letters[i]}
              </span>
              {opt.text}
            </button>
          ))}
          {showCompExplanation && compSelected && (
            <div style={s.feedbackBox(exercise.comprehension.options.find(o => o.id === compSelected)?.correct)}>
              <div style={s.feedbackTitle(exercise.comprehension.options.find(o => o.id === compSelected)?.correct)}>
                {exercise.comprehension.options.find(o => o.id === compSelected)?.correct
                  ? '✓ Exactement !'
                  : '→ Pas tout à fait — voici pourquoi :'}
              </div>
              {exercise.comprehension.explanation}
              <button style={s.continueBtn} onClick={handleFinish}>
                J'ai compris — continuer ✓
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // EXERCISE
  return (
    <div style={s.wrap}>
      <div style={{ maxWidth: 660, margin: '0 auto' }}>
        <button style={s.backBtn} onClick={onBack}>← Retour aux modules</button>
        <div style={s.card}>
          <div style={s.typeTag(exercise.lang)}>{langLabel} — Exercice interactif</div>
          <h2 style={s.title}>{exercise.title}</h2>
          <div style={s.explanation}>{exercise.explanation}</div>
          <div style={s.taskBox}>
            <div style={s.taskLabel}>Ton défi</div>
            {exercise.task}
          </div>

          {exercise.lang === 'python' && (
            <CodeEditor
              initialCode={exercise.initialCode}
              expectedOutput={exercise.expectedOutput}
              onSuccess={handleCodeSuccess}
            />
          )}

          {exercise.lang === 'html' && (
            <HtmlPreview
              initialHtml={exercise.initialHtml}
              initialCss={exercise.initialCss}
              expectedCheck={exercise.expectedCheck}
              onSuccess={handleCodeSuccess}
            />
          )}

          {codeSuccess && (
            <button style={{ ...s.continueBtn, marginTop: 20 }} onClick={goToComprehension}>
              Aller plus loin → Mode Compréhension
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

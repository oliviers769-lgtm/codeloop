import React, { useState } from 'react';
import AppHeader from '../components/AppHeader';
import InfinityLogo from '../components/InfinityLogo';
import CodeEditor from '../components/CodeEditor';
import HtmlPreview from '../components/HtmlPreview';
import { COMPREHENSION_MARKERS_PYTHON, COMPREHENSION_MARKERS_HTML } from '../data/content';

const ALL_MARKERS = { 
  ...(COMPREHENSION_MARKERS_PYTHON || {}), 
  ...(COMPREHENSION_MARKERS_HTML || {}) 
};

const BG = {
  minHeight: '100vh',
  backgroundImage: "url('/bg.jpg')",
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
};

export default function ExerciseLive({ exercise, onComplete, onBack, onNavigate }) {
  const [phase, setPhase] = useState('exercise');
  const [codeSuccess, setCodeSuccess] = useState(false);
  const [compSelected, setCompSelected] = useState(null);
  const [showCompExplanation, setShowCompExplanation] = useState(false);

  if (!exercise) return (
    <div style={BG}>
      <AppHeader onNavigate={onNavigate || (() => {})} onBack={onBack} backLabel="Module" supabaseEnabled={false} />
      <div style={{ textAlign: 'center', padding: '4rem', color: '#fff' }}>Exercice introuvable.</div>
    </div>
  );

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

  const comp = exercise.comprehension;

  const s = {
    main: { maxWidth: 680, margin: '0 auto', padding: '1.5rem 1.5rem 4rem' },
    card: {
      background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(16px)',
      borderRadius: 24, padding: '2rem',
      boxShadow: '0 8px 40px rgba(26,26,78,0.12)',
      animation: 'fadeUp 0.4s ease both',
    },
    tag: {
      display: 'inline-block', background: '#FFF7ED', color: '#F97316',
      fontSize: 11, fontWeight: 700, letterSpacing: 2, padding: '4px 12px',
      borderRadius: 20, textTransform: 'uppercase', marginBottom: 16,
    },
    title: { fontFamily: 'Fraunces, serif', fontSize: 22, fontWeight: 700, color: '#1A1A4E', marginBottom: 8 },
    explanation: {
      background: '#F8FAFC', borderLeft: '3px solid #F97316',
      borderRadius: '0 12px 12px 0', padding: '12px 16px',
      color: '#374151', fontSize: 14, lineHeight: 1.6, marginBottom: 20,
    },
    task: {
      background: '#EEF2FF', borderRadius: 14, padding: '14px 18px',
      color: '#1A1A4E', fontSize: 15, fontWeight: 600, marginBottom: 20,
      lineHeight: 1.5,
    },
    continueBtn: {
      width: '100%', padding: '14px', borderRadius: 14,
      background: codeSuccess
        ? 'linear-gradient(135deg, #10B981, #34D399)'
        : '#E5E7EB',
      color: codeSuccess ? '#fff' : '#9CA3AF',
      fontSize: 15, fontWeight: 700, border: 'none',
      cursor: codeSuccess ? 'pointer' : 'not-allowed',
      marginTop: 16, transition: 'all 0.3s ease',
    },
    optionBtn: (state) => ({
      width: '100%', padding: '14px 18px', borderRadius: 14, marginBottom: 10,
      border: `2px solid ${state === 'correct' ? '#10B981' : state === 'wrong' ? '#EF4444' : state === 'selected' ? '#F97316' : '#E5E7EB'}`,
      background: state === 'correct' ? '#F0FDF4' : state === 'wrong' ? '#FEF2F2' : state === 'selected' ? '#FFF7ED' : '#FAFAFA',
      color: '#1F2937', fontSize: 14, fontWeight: 500,
      cursor: compSelected ? 'default' : 'pointer',
      textAlign: 'left', transition: 'all 0.2s ease',
    }),
    explanation2: {
      background: '#F0FDF4', border: '1px solid #10B981',
      borderRadius: 14, padding: '16px',
      color: '#065F46', fontSize: 14, lineHeight: 1.6,
      marginTop: 16, animation: 'fadeUp 0.3s ease both',
    },
    primaryBtn: {
      width: '100%', padding: '14px', borderRadius: 14,
      background: 'linear-gradient(135deg, #F97316, #FB923C)',
      color: '#fff', fontSize: 15, fontWeight: 700, border: 'none',
      cursor: 'pointer', marginTop: 16, boxShadow: '0 4px 16px rgba(249,115,22,0.3)',
    },
    resultCenter: { textAlign: 'center', padding: '1rem 0' },
  };

  const getOptionState = (opt) => {
    if (!compSelected) return 'default';
    if (opt.correct) return 'correct';
    if (opt.id === compSelected && !opt.correct) return 'wrong';
    return 'default';
  };

  // Phase EXERCISE
  if (phase === 'exercise') return (
    <div style={BG}>
      <AppHeader onNavigate={onNavigate || (() => {})} onBack={onBack} backLabel="Module" supabaseEnabled={false} />
      <div style={s.main}>
        <div style={s.card}>
          <div style={s.tag}>{exercise.type === 'html' ? 'HTML & CSS' : 'Python'}</div>
          <h1 style={s.title}>{exercise.title}</h1>
          <div style={s.explanation}>{exercise.explanation}</div>
          <div style={s.task}>🎯 {exercise.task}</div>

          {exercise.type === 'code' && (
            <CodeEditor
              initialCode={exercise.initialCode || ''}
              expectedOutput={exercise.expectedOutput}
              onSuccess={handleCodeSuccess}
            />
          )}

          {exercise.type === 'html' && (
            <HtmlPreview
              initialHtml={exercise.initialHtml || ''}
              initialCss={exercise.initialCss || ''}
              expectedCheck={exercise.expectedCheck}
              onSuccess={handleCodeSuccess}
            />
          )}

          <button style={s.continueBtn} onClick={goToComprehension} disabled={!codeSuccess}>
            {codeSuccess ? 'Continuer → Mode Compréhension' : '⏳ Complète l\'exercice pour continuer'}
          </button>
        </div>
      </div>
    </div>
  );

  // Phase COMPREHENSION
  if (phase === 'comprehension') return (
    <div style={BG}>
      <AppHeader onNavigate={onNavigate || (() => {})} onBack={onBack} backLabel="Module" supabaseEnabled={false} />
      <div style={s.main}>
        <div style={s.card}>
          <div style={s.tag}>Mode Compréhension</div>
          <h1 style={s.title}>{comp?.question || 'Pourquoi ça fonctionne ?'}</h1>

          {(comp?.options || []).map(opt => (
            <button key={opt.id} style={s.optionBtn(getOptionState(opt))}
              onClick={() => handleComprehension(opt)}>
              {opt.text}
            </button>
          ))}

          {showCompExplanation && comp?.explanation && (
            <div style={s.explanation2}>
              💡 {comp.explanation}
            </div>
          )}

          {showCompExplanation && (
            <button style={s.primaryBtn} onClick={handleFinish}>
              Terminer l'exercice ✓
            </button>
          )}
        </div>
      </div>
    </div>
  );

  // Phase RESULT
  return (
    <div style={BG}>
      <AppHeader onNavigate={onNavigate || (() => {})} onBack={onBack} backLabel="Module" supabaseEnabled={false} />
      <div style={s.main}>
        <div style={s.card}>
          <div style={s.resultCenter}>
            <InfinityLogo size={72} showCheck />
            <h1 style={{ ...s.title, textAlign: 'center', marginTop: 20 }}>? → ✓</h1>
            <p style={{ color: '#6B7280', fontSize: 15, marginBottom: 24 }}>
              Tu viens d'acquérir une nouvelle compréhension.
            </p>
            <button style={s.primaryBtn} onClick={onBack}>
              ← Retour au module
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

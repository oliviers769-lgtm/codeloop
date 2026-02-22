import React, { useState } from 'react';
import InfinityLogo from '../components/InfinityLogo';
import AppHeader from '../components/AppHeader';

const COMPREHENSION_MARKERS = {
  'logique-1': "J'ai compris pourquoi Python affiche le contenu d'une variable et non son nom",
  'logique-2': "J'ai compris pourquoi le ':' est indispensable après une condition if",
  'logique-3': "J'ai compris pourquoi range() commence à 0 et pas à 1",
};

export default function Exercise({ exercise, onComplete, onBack }) {
  const [phase, setPhase] = useState('exercise'); // exercise | comprehension | result
  const [selected, setSelected] = useState(null);
  const [compSelected, setCompSelected] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleAnswer = (opt) => {
    if (selected) return;
    setSelected(opt.id);
    setIsCorrect(opt.correct);
    setShowExplanation(false);
    setTimeout(() => setShowExplanation(true), 400);
  };

  const goToComprehension = () => {
    setPhase('comprehension');
    setCompSelected(null);
    setShowExplanation(false);
  };

  const handleComprehension = (opt) => {
    if (compSelected) return;
    setCompSelected(opt.id);
    setTimeout(() => setShowExplanation(true), 400);
  };

  const handleFinish = () => {
    const marker = COMPREHENSION_MARKERS[exercise.id];
    onComplete(exercise.id, marker);
    setPhase('result');
  };

  const typeLabels = {
    predict: 'Prévoir la sortie',
    findError: "Trouver l'erreur",
    complete: 'Compléter le code',
  };

  const s = {
    wrap: {
      minHeight: '100vh',
      backgroundImage: "url('/bg.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed',
    },
    backBtn: {
      display: 'none',
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
      maxWidth: 620,
      margin: '0 auto',
      boxShadow: '0 8px 40px rgba(26,26,78,0.10)',
      animation: 'fadeUp 0.4s ease both',
    },
    typeTag: {
      display: 'inline-block',
      background: '#EEF2FF',
      color: '#1A1A4E',
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: 1.5,
      padding: '4px 12px',
      borderRadius: 20,
      textTransform: 'uppercase',
      marginBottom: 16,
    },
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
      marginBottom: 20,
    },
    codeBlock: {
      background: '#1A1A4E',
      borderRadius: 14,
      padding: '16px 20px',
      fontFamily: "'Courier New', monospace",
      fontSize: 14,
      color: '#E2E8F0',
      lineHeight: 1.7,
      marginBottom: 20,
      whiteSpace: 'pre-wrap',
      overflowX: 'auto',
    },
    question: {
      fontWeight: 700,
      color: '#1A1A4E',
      fontSize: 16,
      marginBottom: 14,
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
        width: '100%',
        padding: '14px 18px',
        borderRadius: 14,
        border: `2px solid ${border}`,
        background: bg,
        color,
        fontSize: 14,
        fontWeight: 500,
        marginBottom: 8,
        cursor: selectedId ? 'default' : 'pointer',
        textAlign: 'left',
        transition: 'all 0.25s ease',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      };
    },
    optionLetter: (id, correct, selectedId) => {
      let bg = '#E5E7EB', color = '#6B7280';
      if (selectedId) {
        if (id === selectedId) {
          bg = correct ? '#10B981' : '#EF4444';
          color = '#fff';
        } else if (correct) {
          bg = '#10B981'; color = '#fff';
        }
      }
      return {
        width: 28, height: 28, borderRadius: 8,
        background: bg, color, fontSize: 12, fontWeight: 700,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0, transition: 'all 0.25s ease',
      };
    },
    feedbackBox: (correct) => ({
      borderRadius: 14,
      padding: '16px',
      background: correct ? '#F0FDF4' : '#FFF7ED',
      border: `1px solid ${correct ? '#10B981' : '#F97316'}`,
      marginTop: 16,
      fontSize: 14,
      color: '#374151',
      lineHeight: 1.6,
      animation: 'fadeUp 0.3s ease both',
    }),
    feedbackTitle: (correct) => ({
      fontWeight: 700,
      color: correct ? '#065F46' : '#C2410C',
      marginBottom: 6,
      fontSize: 15,
    }),
    nextBtn: {
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
    comprehensionBanner: {
      background: 'linear-gradient(135deg, #EEF2FF, #FFF7ED)',
      border: '1px solid #C7D2FE',
      borderRadius: 14,
      padding: '14px 16px',
      marginBottom: 20,
      fontSize: 14,
      color: '#374151',
      lineHeight: 1.5,
    },
    resultWrap: {
      textAlign: 'center',
      padding: '1rem 0',
    },
    resultTitle: {
      fontFamily: 'Fraunces, serif',
      fontSize: 28,
      fontWeight: 700,
      color: '#1A1A4E',
      marginBottom: 12,
    },
    resultMarker: {
      background: '#F0FDF4',
      border: '1px solid #10B981',
      borderRadius: 14,
      padding: '14px 18px',
      margin: '20px 0',
      fontSize: 14,
      color: '#065F46',
      fontWeight: 500,
      textAlign: 'left',
      display: 'flex',
      alignItems: 'flex-start',
      gap: 10,
    },
  };

  const letters = ['A', 'B', 'C'];

  // Phase Result
  if (phase === 'result') return (
    <div style={s.wrap}>
      <AppHeader onNavigate={() => onBack()} onBack={onBack} backLabel="Module" supabaseEnabled={false} />
      <div style={{ maxWidth: 620, margin: '0 auto', padding: '2rem 1.5rem' }}>
        <div style={{ ...s.card, animation: 'fadeUp 0.4s ease both' }}>
          <div style={s.resultWrap}>
            <InfinityLogo size={64} showCheck />
            <div style={{ marginTop: 24 }}>
              <div style={s.resultTitle}>? → ✓</div>
              <p style={{ color: '#6B7280', fontSize: 15 }}>
                Tu viens d'acquérir une nouvelle compréhension.
              </p>
              <div style={s.resultMarker}>
                <span style={{ color: '#10B981', fontWeight: 700, fontSize: 16 }}>✓</span>
                <span>{COMPREHENSION_MARKERS[exercise.id]}</span>
              </div>
              <button style={s.nextBtn} onClick={onBack}>
                Exercice suivant →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Phase Comprehension
  if (phase === 'comprehension') return (
    <div style={s.wrap}>
      <AppHeader onNavigate={() => onBack()} onBack={onBack} backLabel="Module" supabaseEnabled={false} />
      <div style={{ maxWidth: 620, margin: '0 auto', padding: '2rem 1.5rem' }}>
        <div style={s.card}>
          <div style={{ ...s.typeTag, background: '#FFF7ED', color: '#F97316' }}>
            Mode Compréhension
          </div>
          <h2 style={s.title}>{exercise.comprehension.question}</h2>
          <div style={s.comprehensionBanner}>
            Ne devine pas — choisis l'explication qui te semble <strong>vraiment juste</strong>.
            C'est là que la compréhension se construit.
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
          {showExplanation && compSelected && (
            <div style={s.feedbackBox(exercise.comprehension.options.find(o => o.id === compSelected)?.correct)}>
              <div style={s.feedbackTitle(exercise.comprehension.options.find(o => o.id === compSelected)?.correct)}>
                {exercise.comprehension.options.find(o => o.id === compSelected)?.correct
                  ? '✓ Exactement !'
                  : '→ Pas tout à fait — voici pourquoi :'}
              </div>
              {exercise.comprehension.explanation}
              <button style={s.nextBtn} onClick={handleFinish}>
                J'ai compris — continuer ✓
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Phase Exercise
  return (
    <div style={s.wrap}>
      <div style={{ maxWidth: 620, margin: '0 auto' }}>
        <div style={s.card}>
          <div style={s.typeTag}>{typeLabels[exercise.type] || exercise.type}</div>
          <h2 style={s.title}>{exercise.title}</h2>
          <div style={s.explanation}>{exercise.explanation}</div>
          {exercise.code && (
            <div style={s.codeBlock}>{exercise.code}</div>
          )}
          <div style={s.question}>{exercise.question}</div>
          {exercise.options.map((opt, i) => (
            <button key={opt.id}
              style={s.option(opt.id, opt.correct, selected)}
              onClick={() => handleAnswer(opt)}>
              <span style={s.optionLetter(opt.id, opt.correct, selected)}>
                {letters[i]}
              </span>
              {opt.text}
            </button>
          ))}
          {showExplanation && selected && (
            <div style={s.feedbackBox(isCorrect)}>
              <div style={s.feedbackTitle(isCorrect)}>
                {isCorrect ? '✓ Bonne réponse !' : '→ Pas tout à fait'}
              </div>
              {isCorrect
                ? "Bien joué. Maintenant, est-ce que tu sais vraiment pourquoi ?"
                : `La bonne réponse était : "${exercise.options.find(o => o.correct)?.text}"`
              }
              <button style={s.nextBtn} onClick={goToComprehension}>
                {isCorrect ? 'Aller plus loin →' : 'Comprendre pourquoi →'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

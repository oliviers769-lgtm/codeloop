import React, { useState } from 'react';
import LogoAnimated from '../components/LogoAnimated';

const steps = [
  { id: 0 }, // méthode
  { id: 1 }, // objectif
  { id: 2 }, // niveau
];

export default function Onboarding({ onComplete, update }) {
  const [step, setStep] = useState(0);
  const [objective, setObjective] = useState(null);
  const [level, setLevel] = useState(null);
  const [showCheck, setShowCheck] = useState(false);

  const handleObjective = (val) => {
    setObjective(val);
    update({ objective: val });
    setStep(2);
  };

  const handleLevel = (val) => {
    setLevel(val);
    update({ level: val });
    setShowCheck(true);
    setTimeout(() => {
      update({ onboardingDone: true, currentModule: 'logique' });
      onComplete();
    }, 1400);
  };

  const s = {
    wrap: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      background: 'rgba(240,244,255,0.55)', backdropFilter: 'blur(2px)',
    },
    card: {
      background: '#fff',
      borderRadius: 24,
      padding: '3rem 2.5rem',
      maxWidth: 480,
      width: '100%',
      boxShadow: '0 8px 40px rgba(26,26,78,0.12)',
      textAlign: 'center',
      animation: 'fadeUp 0.5s ease both',
    },
    tag: {
      display: 'inline-block',
      background: '#FFF7ED',
      color: '#F97316',
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: 2,
      padding: '4px 14px',
      borderRadius: 20,
      marginBottom: 24,
      textTransform: 'uppercase',
    },
    h1: {
      fontFamily: 'Fraunces, serif',
      fontSize: 28,
      fontWeight: 700,
      color: '#1A1A4E',
      lineHeight: 1.3,
      marginBottom: 12,
    },
    sub: {
      color: '#6B7280',
      fontSize: 15,
      marginBottom: 36,
      lineHeight: 1.6,
    },
    optionBtn: (selected) => ({
      width: '100%',
      padding: '16px 20px',
      borderRadius: 14,
      border: `2px solid ${selected ? '#F97316' : '#E5E7EB'}`,
      background: selected ? '#FFF7ED' : '#FAFAFA',
      color: '#1F2937',
      fontSize: 15,
      fontWeight: 500,
      marginBottom: 10,
      cursor: 'pointer',
      textAlign: 'left',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      gap: 12,
    }),
    primaryBtn: {
      width: '100%',
      padding: '16px',
      borderRadius: 14,
      background: 'linear-gradient(135deg, #F97316, #FB923C)',
      color: '#fff',
      fontSize: 16,
      fontWeight: 700,
      marginTop: 8,
      cursor: 'pointer',
      boxShadow: '0 4px 20px rgba(249,115,22,0.35)',
      transition: 'transform 0.15s ease',
    },
    dots: {
      display: 'flex',
      gap: 8,
      justifyContent: 'center',
      marginTop: 28,
    },
    dot: (active) => ({
      width: active ? 24 : 8,
      height: 8,
      borderRadius: 4,
      background: active ? '#F97316' : '#E5E7EB',
      transition: 'all 0.3s ease',
    })
  };

  // Étape 0 — La méthode
  if (step === 0) return (
    <div style={s.wrap}>
      <div style={s.card}>
        <LogoAnimated height={70} />
        <div style={{ marginTop: 28 }}>
          <div style={s.tag}>La méthode ExpanceLoop</div>
          <h1 style={s.h1}>Tu n'es pas nul.<br/>On t'a juste mal expliqué.</h1>
          <p style={s.sub}>
            ExpanceLoop t'apprend à <strong>raisonner</strong> — du <span style={{ color: '#F97316', fontWeight: 700 }}>?</span> au <span style={{ color: '#10B981', fontWeight: 700 }}>✓</span>.
          </p>
          <button style={s.primaryBtn} onClick={() => setStep(1)}>
            Je veux comprendre →
          </button>
        </div>
        <div style={s.dots}>
          {[0,1,2].map(i => <div key={i} style={s.dot(i === 0)} />)}
        </div>
      </div>
    </div>
  );

  // Étape 1 — Objectif
  if (step === 1) return (
    <div style={s.wrap}>
      <div style={s.card}>
        <div style={s.tag}>Étape 1 sur 2</div>
        <h1 style={s.h1}>Qu'est-ce qui t'attire dans le code ?</h1>
        <p style={s.sub}>On adaptera ton parcours à ton objectif.</p>
        {[
          { val: 'comprendre', emoji: '🧠', label: 'Comprendre comment ça marche' },
          { val: 'automatiser', emoji: '⚡', label: 'Automatiser des tâches répétitives' },
          { val: 'web', emoji: '🎨', label: 'Créer des pages web' },
          { val: 'reconversion', emoji: '🚀', label: 'Me reconvertir dans le numérique' },
        ].map(o => (
          <button key={o.val}
            style={s.optionBtn(objective === o.val)}
            onClick={() => handleObjective(o.val)}>
            <span style={{ fontSize: 22 }}>{o.emoji}</span>
            {o.label}
          </button>
        ))}
        <div style={s.dots}>
          {[0,1,2].map(i => <div key={i} style={s.dot(i === 1)} />)}
        </div>
      </div>
    </div>
  );

  // Étape 2 — Niveau
  if (step === 2) return (
    <div style={s.wrap}>
      <div style={s.card}>
        <div style={s.tag}>Étape 2 sur 2</div>
        <h1 style={s.h1}>Tu en es où avec le code ?</h1>
        <p style={s.sub}>Pas de jugement — juste pour bien adapter le départ.</p>
        {[
          { val: 'zero', emoji: '🌱', label: 'Débutant total — jamais touché au code' },
          { val: 'essaye', emoji: '🌿', label: "J'ai déjà essayé mais j'ai bloqué" },
          { val: 'bases', emoji: '🌳', label: "J'ai quelques bases, je veux vraiment comprendre" },
        ].map(o => (
          <button key={o.val}
            style={s.optionBtn(level === o.val)}
            onClick={() => handleLevel(o.val)}>
            <span style={{ fontSize: 22 }}>{o.emoji}</span>
            {o.label}
          </button>
        ))}
        <div style={s.dots}>
          {[0,1,2].map(i => <div key={i} style={s.dot(i === 2)} />)}
        </div>
      </div>
    </div>
  );
}

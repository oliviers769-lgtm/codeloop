import React from 'react';
import AppHeader from '../components/AppHeader';

const BG = {
  minHeight: '100vh',
  backgroundImage: "url('/bg.jpg')",
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
};

export default function About({ onNavigate }) {
  const s = {
    main: { maxWidth: 700, margin: '0 auto', padding: '2rem 1.5rem 4rem' },
    card: (delay = 0) => ({
      background: 'rgba(255,255,255,0.93)', backdropFilter: 'blur(16px)',
      borderRadius: 24, padding: '2.5rem', marginBottom: '1.5rem',
      boxShadow: '0 8px 40px rgba(26,26,78,0.18)',
      animation: `fadeUp 0.5s ${delay}s ease both`,
    }),
    tag: {
      display: 'inline-block', background: '#FFF7ED', color: '#F97316',
      fontSize: 11, fontWeight: 700, letterSpacing: 2, padding: '4px 12px',
      borderRadius: 20, textTransform: 'uppercase', marginBottom: 16,
    },
    h1: { fontFamily: 'Fraunces, serif', fontSize: 28, fontWeight: 700, color: '#1A1A4E', lineHeight: 1.3, marginBottom: 16 },
    h2: { fontFamily: 'Fraunces, serif', fontSize: 20, fontWeight: 700, color: '#1A1A4E', marginBottom: 12 },
    p: { color: '#374151', fontSize: 15, lineHeight: 1.75, marginBottom: 14 },
    blockquote: {
      borderLeft: '4px solid #F97316', paddingLeft: 20, margin: '20px 0',
      color: '#6B7280', fontSize: 16, fontStyle: 'italic', lineHeight: 1.6,
    },
    featureGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 20 },
    featureCard: (color) => ({
      background: color + '10', border: `1px solid ${color}30`,
      borderRadius: 16, padding: '1.2rem',
    }),
    featureIcon: { fontSize: 28, marginBottom: 8 },
    featureTitle: { fontWeight: 700, color: '#1A1A4E', fontSize: 14, marginBottom: 4 },
    featureText: { color: '#6B7280', fontSize: 13, lineHeight: 1.5 },
    compareTable: { width: '100%', borderCollapse: 'collapse', marginTop: 16 },
    th: { padding: '10px 16px', textAlign: 'left', fontSize: 12, fontWeight: 700, color: '#6B7280', letterSpacing: 1, textTransform: 'uppercase', borderBottom: '2px solid #F3F4F6' },
    td: { padding: '12px 16px', fontSize: 14, color: '#374151', borderBottom: '1px solid #F3F4F6' },
    tdGood: { padding: '12px 16px', fontSize: 14, color: '#10B981', fontWeight: 600, borderBottom: '1px solid #F3F4F6' },
    tdBad: { padding: '12px 16px', fontSize: 14, color: '#EF4444', borderBottom: '1px solid #F3F4F6' },
    startBtn: {
      display: 'inline-flex', alignItems: 'center', gap: 8,
      padding: '14px 28px', borderRadius: 14,
      background: 'linear-gradient(135deg, #F97316, #FB923C)',
      color: '#fff', fontSize: 16, fontWeight: 700, cursor: 'pointer',
      boxShadow: '0 4px 20px rgba(249,115,22,0.4)', border: 'none', marginTop: 8,
    },
  };

  return (
    <div style={BG}>
      <AppHeader onNavigate={onNavigate} onBack={() => onNavigate('home')} backLabel="Accueil" supabaseEnabled={false} />
      <main style={s.main}>

        {/* INTRO */}
        <div style={s.card(0)}>
          <div style={s.tag}>Notre pédagogie</div>
          <h1 style={s.h1}>Pourquoi ExpanceLoop<br/>apprend différemment</h1>
          <div style={s.blockquote}>
            « La plupart des outils t'apprennent à reproduire du code.<br/>
            ExpanceLoop t'apprend à le comprendre. »
          </div>
          <p style={s.p}>
            Il existe une différence fondamentale entre <strong>mémoriser une syntaxe</strong> et <strong>comprendre un raisonnement</strong>. La première s'oublie. La seconde reste.
          </p>
          <p style={s.p}>
            ExpanceLoop est construit autour d'une conviction : quand on comprend <em>pourquoi</em> quelque chose fonctionne, on n'a plus besoin de le mémoriser. On peut le retrouver, l'adapter, l'appliquer dans des contextes nouveaux.
          </p>
        </div>

        {/* LE PROBLÈME */}
        <div style={s.card(0.1)}>
          <h2 style={s.h2}>Le problème des formations classiques</h2>
          <p style={s.p}>
            La grande majorité des formations en ligne suivent le même schéma : on te montre du code, tu le reproduis, tu passes à la suite. C'est efficace à court terme — et décourageant dès qu'on sort des exemples vus en cours.
          </p>
          <table style={s.compareTable}>
            <thead>
              <tr>
                <th style={s.th}>Approche classique</th>
                <th style={s.th}>Approche ExpanceLoop</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Reproduire du code", "Comprendre le raisonnement"],
                ["Corriger la réponse", "Corriger le raisonnement"],
                ["Avancer vite", "Avancer en comprenant vraiment"],
                ["Mémoriser la syntaxe", "Construire des réflexes durables"],
                ["Frustration à la première erreur", "L'erreur devient un point d'apprentissage"],
              ].map(([left, right], i) => (
                <tr key={i}>
                  <td style={s.tdBad}>✗ {left}</td>
                  <td style={s.tdGood}>✓ {right}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* LE MODE COMPRÉHENSION */}
        <div style={s.card(0.2)}>
          <h2 style={s.h2}>Le Mode Compréhension</h2>
          <p style={s.p}>
            L'innovation centrale d'ExpanceLoop. Après chaque exercice, on ne te dit pas juste "correct" ou "incorrect". On te pose une question :
          </p>
          <div style={s.blockquote}>
            « Selon toi, pourquoi est-ce que ça fonctionne — ou pas ? »
          </div>
          <p style={s.p}>
            Tu choisis une explication parmi trois propositions. L'une est correcte. L'autre est plausible mais fausse. La troisième est manifestement incorrecte. ExpanceLoop corrige ton <em>raisonnement</em>, pas juste ta réponse.
          </p>
          <p style={s.p}>
            À la fin, tu reçois un <strong>marqueur de compréhension</strong> — une phrase à la première personne que tu peux vraiment t'approprier : <em>"J'ai compris pourquoi..."</em>
          </p>
        </div>

        {/* POUR QUI */}
        <div style={s.card(0.3)}>
          <h2 style={s.h2}>Idéal pour les équipes soignantes</h2>
          <p style={s.p}>
            ExpanceLoop est particulièrement adapté aux professionnels de santé qui souhaitent comprendre les outils numériques qu'ils utilisent au quotidien — sans devenir développeurs.
          </p>
          <div style={s.featureGrid}>
            {[
              { icon: '⏱', color: '#F97316', title: '5 à 10 min par session', text: 'Conçu pour s\'intégrer dans un emploi du temps chargé.' },
              { icon: '🧠', color: '#1A1A4E', title: 'Zéro jargon technique', text: 'Les exemples sont concrets et tirés du quotidien.' },
              { icon: '📱', color: '#3B82F6', title: 'Sur tous les appareils', text: 'Mobile, tablette, ordinateur — sans installation.' },
              { icon: '🎯', color: '#10B981', title: 'Progression visible', text: 'Chaque compréhension acquise est tracée et valorisée.' },
            ].map((f, i) => (
              <div key={i} style={s.featureCard(f.color)}>
                <div style={s.featureIcon}>{f.icon}</div>
                <div style={s.featureTitle}>{f.title}</div>
                <div style={s.featureText}>{f.text}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ ...s.card(0.4), textAlign: 'center' }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>🚀</div>
          <h2 style={{ ...s.h2, textAlign: 'center' }}>Prêt à essayer ?</h2>
          <p style={{ ...s.p, textAlign: 'center' }}>
            Gratuit, sans inscription obligatoire, sans engagement.
          </p>
          <button style={s.startBtn} onClick={() => onNavigate('module', 'logique')}>
            Commencer maintenant →
          </button>
        </div>

      </main>
    </div>
  );
}

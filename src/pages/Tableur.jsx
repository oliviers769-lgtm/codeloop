import React, { useState } from 'react';
import AppHeader from '../components/AppHeader';

const BG = {
  minHeight: '100vh',
  backgroundImage: "url('/bg.jpg')",
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
};

const LECONS = [
  {
    id: 1,
    titre: "Saisir et organiser une liste",
    sousTitre: "Les bases du tableur",
    contexte: "Tu dois noter rapidement une liste de noms ou de tâches pour ton service.",
    explication: [
      "Un tableur c'est un tableau de cases appelées **cellules**. Chaque case a une adresse : A1, B2, C3...",
      "Les **colonnes** sont verticales (A, B, C...), les **lignes** sont horizontales (1, 2, 3...).",
      "Pour saisir : clique sur une cellule, tape, appuie sur Entrée pour descendre ou Tab pour aller à droite.",
      "Pour élargir une colonne : double-clique sur le bord de l'en-tête de colonne. Pratique quand le texte est coupé !",
      "**Gel des volets** : si ta liste est longue, tu peux figer la première ligne (les titres) pour qu'elle reste visible quand tu fais défiler. Menu Affichage > Figer les volets."
    ],
    question: "Dans un tableur, que contient la cellule B3 ?",
    options: [
      { id: "a", text: "La valeur à la 2e colonne, 3e ligne", correct: true },
      { id: "b", text: "La valeur à la 3e colonne, 2e ligne", correct: false },
      { id: "c", text: "La 3e cellule de la feuille", correct: false }
    ],
    explication_reponse: "B = 2e colonne, 3 = 3e ligne. C'est comme les coordonnées GPS du tableur — colonne d'abord (lettre), ligne ensuite (chiffre)."
  },
  {
    id: 2,
    titre: "Calculs simples — Somme et Moyenne",
    sousTitre: "Automatiser les calculs",
    contexte: "Tu veux connaître le total ou la moyenne d'une colonne de chiffres (heures, quantités...).",
    explication: [
      "Une formule commence toujours par **=**. C'est le signal que tu veux calculer quelque chose.",
      "**=SOMME(A1:A10)** additionne toutes les cellules de A1 à A10. Le ':' signifie 'de... à...'.",
      "**=MOYENNE(A1:A10)** calcule la moyenne de la même plage.",
      "**=MAX(A1:A10)** et **=MIN(A1:A10)** trouvent le plus grand et le plus petit.",
      "Astuce : tape =SOMME( puis sélectionne tes cellules à la souris — plus rapide que de tout taper !"
    ],
    question: "=SOMME(B2:B6) calcule...",
    options: [
      { id: "a", text: "La somme des cellules B2, B3, B4, B5 et B6", correct: true },
      { id: "b", text: "La somme de B2 et B6 uniquement", correct: false },
      { id: "c", text: "La moyenne entre B2 et B6", correct: false }
    ],
    explication_reponse: "Le ':' dans une formule signifie 'toute la plage de... à...'. B2:B6 inclut B2, B3, B4, B5 et B6 — 5 cellules au total."
  },
  {
    id: 3,
    titre: "Mise en forme — Rendre le tableau lisible",
    sousTitre: "Clarté et lisibilité",
    contexte: "Tu veux que ton tableau soit clair pour le partager avec l'équipe.",
    explication: [
      "**Gras** (Ctrl+G) : pour les titres et informations importantes.",
      "**Couleur de cellule** : sélectionne les cellules, clique sur le pot de peinture dans la barre d'outils. Utile pour distinguer les catégories.",
      "**Bordures** : Menu Format > Cellules > Bordures. Donne une structure visuelle au tableau.",
      "**Alignement** : centre tes titres pour un rendu professionnel. Icône d'alignement dans la barre.",
      "Règle d'or : **moins c'est plus**. 2-3 couleurs maximum, pas de mélanges de polices. Un tableau sobre est toujours plus lisible qu'un tableau chargé."
    ],
    question: "Quelle est la bonne pratique pour un tableau professionnel ?",
    options: [
      { id: "a", text: "2-3 couleurs maximum, titres en gras, structure claire", correct: true },
      { id: "b", text: "Chaque ligne dans une couleur différente pour mieux distinguer", correct: false },
      { id: "c", text: "Tout en majuscules pour que ce soit lisible", correct: false }
    ],
    explication_reponse: "La sobriété est une vertu en présentation. Trop de couleurs fatigue l'œil et brouille le message. Un fond coloré pour les en-têtes, une alternance discrète pour les lignes — c'est suffisant."
  },
  {
    id: 4,
    titre: "Tri et Filtres — Trouver rapidement",
    sousTitre: "Naviguer dans les données",
    contexte: "Dans une liste de 50 agents ou patients, tu veux voir seulement ceux d'un service ou trier par nom/date.",
    explication: [
      "**Trier** : sélectionne ta liste, menu Données > Trier. Tu choisis la colonne et l'ordre (A→Z ou Z→A).",
      "**Filtrer** : menu Données > Filtre automatique. Des flèches apparaissent sur chaque colonne — clique dessus pour choisir ce que tu veux voir.",
      "Exemple : sur une liste d'agents, filtre la colonne 'Service' sur 'Urgences' → tu ne vois plus que les agents des Urgences.",
      "**Effacer le filtre** : reclique sur la flèche > Tout sélectionner. Tes données ne sont pas supprimées — juste masquées.",
      "Le filtre est non-destructif : il ne modifie pas tes données, il les cache temporairement."
    ],
    question: "Après avoir appliqué un filtre, les autres lignes sont...",
    options: [
      { id: "a", text: "Masquées temporairement — elles réapparaissent quand on supprime le filtre", correct: true },
      { id: "b", text: "Supprimées définitivement", correct: false },
      { id: "c", text: "Déplacées dans une autre feuille", correct: false }
    ],
    explication_reponse: "Le filtre ne supprime rien ! C'est une vue temporaire de tes données. Tu peux filtrer, analyser, puis tout réafficher en un clic. C'est l'une des fonctions les plus utiles du tableur."
  },
  {
    id: 5,
    titre: "Planning simple — Calendrier d'équipe",
    sousTitre: "Organiser les plannings",
    contexte: "Tu dois faire un planning rapide pour les gardes ou les shifts d'une petite équipe.",
    explication: [
      "Structure de base : **colonne A** = noms, **ligne 1** = jours de la semaine. Les cases = type de shift (M=Matin, S=Soir, N=Nuit).",
      "**Couleurs par shift** : colorie les cellules 'N' en bleu, 'M' en jaune, 'S' en orange. Sélectionne toutes les N, applique la couleur — rapide !",
      "**=NB.SI(plage, critère)** compte les cellules selon un critère. Ex : =NB.SI(B2:H2, \"N\") compte les nuits de la ligne 2.",
      "Place les NB.SI en colonne I pour avoir le total de chaque type de shift par personne automatiquement.",
      "Conseil : créer une feuille 'Légende' avec les codes et couleurs utilisés. Indispensable quand d'autres consultent le fichier !"
    ],
    question: "=NB.SI(B2:H2, \"N\") compte...",
    options: [
      { id: "a", text: "Le nombre de cellules contenant 'N' dans la plage B2 à H2", correct: true },
      { id: "b", text: "La somme des valeurs N de B2 à H2", correct: false },
      { id: "c", text: "Le numéro de la cellule N dans la ligne 2", correct: false }
    ],
    explication_reponse: "NB.SI = Nombre Si condition. Il compte (pas additionne) les cellules qui correspondent au critère. Parfait pour compter des occurrences dans un planning : nuits, matins, absences..."
  },
  {
    id: 6,
    titre: "Mise en forme conditionnelle",
    sousTitre: "Alertes visuelles automatiques",
    contexte: "Dans un tableau de suivi, colorer automatiquement les valeurs anormales — lits trop occupés, température élevée, stock bas.",
    explication: [
      "**Mise en forme conditionnelle** : le tableur change automatiquement la couleur d'une cellule selon sa valeur.",
      "Accès : sélectionne les cellules > Menu Format > Mise en forme conditionnelle.",
      "Exemple : 'Si la valeur est supérieure à 38 → fond rouge'. La cellule deviendra rouge dès que la valeur dépasse 38.",
      "Tu peux empiler plusieurs règles : >38 en rouge, entre 37.5 et 38 en orange, <37.5 en vert.",
      "**Utilisation hospitalière typique** : suivi des lits (vert=OK, orange=bientôt plein, rouge=plein), températures patients, stocks de matériel."
    ],
    question: "Avec une règle 'Si valeur > 90 → rouge' sur la colonne 'Lits occupés', que se passe-t-il quand on saisit 95 ?",
    options: [
      { id: "a", text: "La cellule devient rouge automatiquement", correct: true },
      { id: "b", text: "Un message d'erreur apparaît", correct: false },
      { id: "c", text: "La valeur est remplacée par 90", correct: false }
    ],
    explication_reponse: "La mise en forme conditionnelle réagit en temps réel. Dès que tu saisis 95, le tableur évalue la règle, trouve que 95 > 90, et applique le fond rouge instantanément. C'est un système d'alerte visuelle automatique."
  }
];

export default function Tableur({ onNavigate }) {
  const [selectedLecon, setSelectedLecon] = useState(null);
  const [answered, setAnswered] = useState(null);
  const [showExplication, setShowExplication] = useState(false);
  const [completed, setCompleted] = useState([]);

  const handleAnswer = (opt) => {
    if (answered) return;
    setAnswered(opt.id);
    setTimeout(() => setShowExplication(true), 400);
  };

  const handleNext = () => {
    if (!completed.includes(selectedLecon.id)) {
      setCompleted([...completed, selectedLecon.id]);
    }
    setSelectedLecon(null);
    setAnswered(null);
    setShowExplication(false);
  };

  const s = {
    main: { maxWidth: 680, margin: '0 auto', padding: '1.5rem 1.5rem 4rem' },
    headerCard: {
      background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(16px)',
      borderRadius: 20, padding: '2rem', marginBottom: 16,
      boxShadow: '0 4px 20px rgba(16,185,129,0.1)',
      animation: 'fadeUp 0.4s ease both',
    },
    leconCard: (done, i) => ({
      background: done ? 'rgba(240,253,244,0.92)' : 'rgba(255,255,255,0.88)',
      backdropFilter: 'blur(12px)', borderRadius: 18, padding: '1.4rem 1.6rem',
      marginBottom: 10, cursor: 'pointer',
      border: `2px solid ${done ? '#10B981' : 'transparent'}`,
      display: 'flex', alignItems: 'center', gap: 16,
      boxShadow: '0 2px 12px rgba(16,185,129,0.06)',
      transition: 'all 0.2s ease',
      animation: `fadeUp 0.4s ${0.05 + i * 0.06}s ease both`,
    }),
    leconNum: (done) => ({
      width: 42, height: 42, borderRadius: 12,
      background: done ? '#D1FAE5' : 'rgba(16,185,129,0.1)',
      color: done ? '#10B981' : '#065F46',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: done ? 18 : 15, fontWeight: 700, flexShrink: 0,
    }),
    // Page leçon
    leconWrap: {
      background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(16px)',
      borderRadius: 24, padding: '2rem', marginBottom: 16,
      boxShadow: '0 8px 40px rgba(16,185,129,0.1)',
      animation: 'fadeUp 0.4s ease both',
    },
    tag: {
      display: 'inline-block', background: '#F0FDF4', color: '#10B981',
      fontSize: 11, fontWeight: 700, letterSpacing: 2, padding: '4px 12px',
      borderRadius: 20, textTransform: 'uppercase', marginBottom: 16,
    },
    title: { fontFamily: 'Fraunces, serif', fontSize: 22, fontWeight: 700, color: '#065F46', marginBottom: 8 },
    contexte: {
      background: '#F0FDF4', borderLeft: '3px solid #10B981',
      borderRadius: '0 12px 12px 0', padding: '12px 16px',
      color: '#374151', fontSize: 14, lineHeight: 1.6, marginBottom: 20,
      fontStyle: 'italic',
    },
    explItem: {
      display: 'flex', gap: 10, marginBottom: 12, alignItems: 'flex-start',
    },
    bullet: {
      width: 20, height: 20, borderRadius: '50%',
      background: 'rgba(16,185,129,0.15)', color: '#10B981',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 10, fontWeight: 700, flexShrink: 0, marginTop: 2,
    },
    explText: { fontSize: 14, color: '#374151', lineHeight: 1.6 },
    question: {
      fontFamily: 'Fraunces, serif', fontSize: 18, fontWeight: 700,
      color: '#1A1A4E', marginBottom: 16, marginTop: 24,
    },
    optBtn: (state) => ({
      width: '100%', padding: '14px 18px', borderRadius: 14, marginBottom: 10,
      border: `2px solid ${state === 'correct' ? '#10B981' : state === 'wrong' ? '#EF4444' : '#E5E7EB'}`,
      background: state === 'correct' ? '#F0FDF4' : state === 'wrong' ? '#FEF2F2' : '#FAFAFA',
      color: '#1F2937', fontSize: 14, fontWeight: 500,
      cursor: answered ? 'default' : 'pointer',
      textAlign: 'left', transition: 'all 0.2s ease',
    }),
    explicationBox: {
      background: '#F0FDF4', border: '1px solid #10B981',
      borderRadius: 14, padding: '16px',
      color: '#065F46', fontSize: 14, lineHeight: 1.6,
      marginTop: 16, animation: 'fadeUp 0.3s ease both',
    },
    nextBtn: {
      width: '100%', padding: '14px', borderRadius: 14,
      background: 'linear-gradient(135deg, #10B981, #34D399)',
      color: '#fff', fontSize: 15, fontWeight: 700, border: 'none',
      cursor: 'pointer', marginTop: 16, boxShadow: '0 4px 16px rgba(16,185,129,0.3)',
    },
  };

  const getState = (opt) => {
    if (!answered) return 'default';
    if (opt.correct) return 'correct';
    if (opt.id === answered && !opt.correct) return 'wrong';
    return 'default';
  };

  const renderExplication = (text) => {
    return text.split('**').map((part, i) =>
      i % 2 === 1 ? <strong key={i}>{part}</strong> : part
    );
  };

  // Vue liste des leçons
  if (!selectedLecon) return (
    <div style={BG}>
      <AppHeader onNavigate={onNavigate} onBack={() => onNavigate('home')} backLabel="Accueil" supabaseEnabled={false} />
      <main style={s.main}>
        <div style={s.headerCard}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🦊</div>
          <div style={{ fontFamily: 'Fraunces, serif', fontSize: 26, fontWeight: 700, color: '#065F46', marginBottom: 6 }}>
            Le Tableur Apprivoisé
          </div>
          <div style={{ color: '#6B7280', fontSize: 14, marginBottom: 16 }}>
            Excel & Google Sheets sans la prise de tête — avec des exemples du quotidien hospitalier.
          </div>
          <div style={{ background: '#F3F4F6', borderRadius: 8, height: 6, overflow: 'hidden' }}>
            <div style={{ height: '100%', borderRadius: 8, background: 'linear-gradient(90deg, #10B981, #34D399)', width: `${Math.round((completed.length / LECONS.length) * 100)}%`, transition: 'width 0.6s ease' }} />
          </div>
          <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 6 }}>{completed.length} / {LECONS.length} leçons complétées</div>
        </div>

        <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,0.9)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12, textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}>
          Leçons
        </div>

        {LECONS.map((lecon, i) => {
          const done = completed.includes(lecon.id);
          return (
            <div key={lecon.id} style={s.leconCard(done, i)}
              onClick={() => { setSelectedLecon(lecon); setAnswered(null); setShowExplication(false); }}
              onMouseEnter={e => { if (!done) e.currentTarget.style.borderColor = '#10B981'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = done ? '#10B981' : 'transparent'; }}>
              <div style={s.leconNum(done)}>{done ? '✓' : i + 1}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: '#065F46', fontSize: 15, marginBottom: 2 }}>{lecon.titre}</div>
                <div style={{ color: '#9CA3AF', fontSize: 12 }}>{lecon.sousTitre}</div>
              </div>
              <div style={{ color: '#D1D5DB', fontSize: 18 }}>›</div>
            </div>
          );
        })}
      </main>
    </div>
  );

  // Vue leçon détaillée
  return (
    <div style={BG}>
      <AppHeader onNavigate={onNavigate} onBack={() => { setSelectedLecon(null); setAnswered(null); setShowExplication(false); }} backLabel="Leçons" supabaseEnabled={false} />
      <main style={s.main}>
        <div style={s.leconWrap}>
          <div style={s.tag}>Leçon {selectedLecon.id} sur {LECONS.length}</div>
          <h1 style={s.title}>{selectedLecon.titre}</h1>
          <div style={s.contexte}>💼 {selectedLecon.contexte}</div>

          <div style={{ marginBottom: 8 }}>
            {selectedLecon.explication.map((item, i) => (
              <div key={i} style={s.explItem}>
                <div style={s.bullet}>{i + 1}</div>
                <div style={s.explText}>{renderExplication(item)}</div>
              </div>
            ))}
          </div>

          <div style={s.question}>{selectedLecon.question}</div>

          {selectedLecon.options.map(opt => (
            <button key={opt.id} style={s.optBtn(getState(opt))} onClick={() => handleAnswer(opt)}>
              {opt.text}
            </button>
          ))}

          {showExplication && (
            <>
              <div style={s.explicationBox}>
                💡 {selectedLecon.explication_reponse}
              </div>
              <button style={s.nextBtn} onClick={handleNext}>
                {selectedLecon.id === LECONS.length ? '✓ Terminer le module' : 'Leçon suivante →'}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

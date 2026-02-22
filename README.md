# CodeLoop — MVP Web

> Comprends le code. Pour de vrai.

## Structure du projet

```
src/
  App.jsx                  → Routeur principal
  index.js                 → Point d'entrée React
  styles/
    global.css             → Variables CSS, animations, typographie
  components/
    InfinityLogo.jsx       → Logo SVG animé ? → ✓
  pages/
    Onboarding.jsx         → 3 écrans d'onboarding
    Home.jsx               → Accueil + modules + progression
    Module.jsx             → Liste des exercices d'un module
    Exercise.jsx           → Exercice + Mode Compréhension + Résultat
  data/
    content.js             → Modules et exercices (à enrichir)
  hooks/
    useProgress.js         → Progression locale (localStorage)
```

## Démarrer en local

```bash
npm install
npm start
```

## Déployer sur Vercel

1. Push ce dossier sur GitHub
2. Connecte Vercel à ton repo
3. Vercel détecte React automatiquement
4. Deploy ✓

## Prochaines étapes (Étape 2)

- Ajouter Pyodide pour exécuter du vrai Python dans le navigateur
- Enrichir les exercices (modules Python, HTML/CSS)
- Connecter Supabase pour la progression multi-appareils

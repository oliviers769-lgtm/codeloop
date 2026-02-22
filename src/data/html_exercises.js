export const HTML_EXERCISES_FULL = [
  {
    id: "html-1",
    type: "predict",
    title: "HTML — la structure d'une page",
    explanation: `HTML c'est le squelette d'une page web. Chaque élément est entouré de balises.

Balises essentielles :
  <h1>Titre principal</h1>    → titre en grand
  <h2>Sous-titre</h2>        → titre plus petit
  <p>Un paragraphe</p>       → texte normal
  <strong>Important</strong> → texte en gras

La balise ouvrante <h1> dit "ici commence un titre". La balise fermante </h1> dit "ici il se termine".`,
    code: `<h1>Service des Urgences</h1>\n<p>Ouvert 24h/24, 7j/7</p>\n<p>Capacité : <strong>45 lits</strong></p>`,
    question: "Quel élément sera affiché en gras ?",
    options: [
      { id: "a", text: "45 lits", correct: true },
      { id: "b", text: "Service des Urgences", correct: false },
      { id: "c", text: "Ouvert 24h/24, 7j/7", correct: false }
    ],
    comprehension: {
      question: "Pourquoi les balises fonctionnent-elles par paires ?",
      options: [
        { id: "a", text: "Pour délimiter exactement où commence et où finit l'effet de mise en forme", correct: true },
        { id: "b", text: "La balise fermante est optionnelle — c'est juste une convention", correct: false },
        { id: "c", text: "Pour que le navigateur sache que c'est du HTML", correct: false }
      ],
      explanation: "Les balises fonctionnent comme des parenthèses : elles encadrent le contenu à mettre en forme. Sans balise fermante, le navigateur ne saurait pas où s'arrête l'effet."
    }
  },
  {
    id: "html-2",
    type: "findError",
    title: "HTML — trouver l'erreur de structure",
    explanation: `Les balises doivent être correctement imbriquées — comme des poupées russes. On ferme toujours la dernière ouverte en premier.

Correct :   <p><strong>texte</strong></p>
Incorrect : <p><strong>texte</p></strong>

Un titre h1 doit être unique par page. Les sous-titres utilisent h2, h3, etc.`,
    code: `<h1>ExpanceLoop<h1>\n<p>Comprends le code. Pour de vrai.</p>`,
    question: "Ce code contient une erreur. Laquelle ?",
    options: [
      { id: "a", text: "La balise fermante devrait être </h1> avec un slash, pas <h1>", correct: true },
      { id: "b", text: "Le titre est trop court", correct: false },
      { id: "c", text: "Il manque une balise <body>", correct: false }
    ],
    comprehension: {
      question: "Que se passe-t-il si on oublie le slash dans une balise fermante ?",
      options: [
        { id: "a", text: "Le navigateur pense que c'est une deuxième balise ouvrante et la mise en forme devient imprévisible", correct: true },
        { id: "b", text: "Le navigateur corrige automatiquement l'erreur", correct: false },
        { id: "c", text: "La page ne s'affiche pas du tout", correct: false }
      ],
      explanation: "Les navigateurs essaient de 'corriger' les erreurs HTML mais avec des résultats imprévisibles. Mieux vaut écrire du HTML propre — le slash dans </h1> dit explicitement 'je ferme cette balise'."
    }
  },
  {
    id: "html-3",
    type: "predict",
    title: "CSS — habiller le HTML",
    explanation: `CSS ajoute le style au HTML. Il s'écrit séparément et cible les éléments HTML par leur balise, classe ou ID.

Syntaxe :
  balise {
    propriété: valeur;
  }

Propriétés courantes :
  color: red;           → couleur du texte
  background: blue;     → couleur de fond
  font-size: 20px;      → taille du texte
  text-align: center;   → alignement`,
    code: `/* CSS */\nh1 {\n  color: #1A1A4E;\n  text-align: center;\n}\np {\n  color: gray;\n  font-size: 14px;\n}`,
    question: "Ce CSS va rendre les titres h1...",
    options: [
      { id: "a", text: "Bleu foncé et centrés", correct: true },
      { id: "b", text: "Gris et en petit", correct: false },
      { id: "c", text: "Orange et à gauche", correct: false }
    ],
    comprehension: {
      question: "Pourquoi CSS et HTML sont-ils dans des fichiers séparés ?",
      options: [
        { id: "a", text: "Pour séparer le contenu (ce qu'il y a) de la présentation (comment ça apparaît)", correct: true },
        { id: "b", text: "Parce que les navigateurs ne peuvent pas lire les deux en même temps", correct: false },
        { id: "c", text: "C'est une convention sans raison technique", correct: false }
      ],
      explanation: "Cette séparation est fondamentale. Elle permet de changer tout le look d'un site sans toucher au contenu, et vice versa. Un même HTML peut avoir 10 CSS différents — c'est le principe des thèmes."
    }
  },
  {
    id: "html-4",
    type: "html",
    title: "Crée ta première page",
    explanation: "À toi de jouer ! Crée une mini-page avec un titre et un paragraphe.",
    task: "Écris un titre principal 'Mon service' et un paragraphe 'Bienvenue dans mon service hospitalier.'",
    initialHtml: "<!-- Écris ton HTML ici -->\n",
    initialCss: "h1 { color: #1A1A4E; }\np { color: #374151; }",
    expectedCheck: (html) => html.toLowerCase().includes('<h1') && html.toLowerCase().includes('<p'),
    comprehension: {
      question: "Quelle balise utilise-t-on pour le titre le plus important d'une page ?",
      options: [
        { id: "a", text: "<h1> — il ne doit y en avoir qu'un seul par page idéalement", correct: true },
        { id: "b", text: "<title> — c'est la balise des titres visibles", correct: false },
        { id: "c", text: "<header> — pour tout ce qui est en tête de page", correct: false }
      ],
      explanation: "<h1> est le titre principal visible. <title> est le titre de l'onglet navigateur. <header> est une section structurelle. Chacun a son rôle précis."
    }
  },
  {
    id: "html-5",
    type: "html",
    title: "Les listes et les couleurs",
    explanation: "Les listes sont partout sur le web. <ul> pour des puces, <ol> pour une liste numérotée. Chaque élément est dans un <li>.",
    task: "Crée une liste à puces avec 3 services : 'Urgences', 'Cardiologie', 'Pédiatrie'. Colorie-les en bleu marine avec CSS.",
    initialHtml: "<!-- Ta liste ici -->\n",
    initialCss: "/* Colorie les éléments de liste */\n",
    expectedCheck: (html) => html.toLowerCase().includes('<ul') && html.toLowerCase().includes('urgences'),
    comprehension: {
      question: "Quand utiliser <ol> plutôt que <ul> ?",
      options: [
        { id: "a", text: "Quand l'ordre des éléments compte — protocole à suivre, étapes, classement", correct: true },
        { id: "b", text: "<ol> est plus moderne que <ul>", correct: false },
        { id: "c", text: "Pour les listes de plus de 5 éléments", correct: false }
      ],
      explanation: "ul = unordered (sans ordre). ol = ordered (avec ordre). Pour une liste de services, ul suffit. Pour un protocole médical à suivre étape par étape, ol est plus adapté."
    }
  },
  {
    id: "html-6",
    type: "html",
    title: "Cas pratique — carte de service",
    explanation: "Combine HTML et CSS pour créer une vraie carte de présentation d'un service hospitalier. Comme ce qu'on voit sur les sites d'hôpitaux.",
    task: "Crée une carte avec : un titre h2 'Cardiologie', un paragraphe de description, et une liste de 2 spécialités. Donne-lui un fond blanc avec une bordure grise arrondie.",
    initialHtml: "<div class=\"carte\">\n  <!-- Ton contenu ici -->\n</div>",
    initialCss: ".carte {\n  /* Ajoute ton style ici */\n  padding: 20px;\n}\n",
    expectedCheck: (html) => html.toLowerCase().includes('<h2') && html.toLowerCase().includes('<ul'),
    comprehension: {
      question: "Pourquoi utilise-t-on class='carte' plutôt que de styliser directement div ?",
      options: [
        { id: "a", text: "Pour cibler uniquement cette div sans affecter toutes les div de la page", correct: true },
        { id: "b", text: "Les classes sont obligatoires en CSS moderne", correct: false },
        { id: "c", text: "Pour que la carte soit visible sur mobile", correct: false }
      ],
      explanation: "Une classe permet de styliser un groupe précis d'éléments. Si tu as 10 div sur ta page, styliser 'div' les affecte toutes. La classe '.carte' ne cible que celles qui ont class='carte'."
    }
  }
];

// ── MODULES ──────────────────────────────────────────────────────────────────
export const MODULES = [
  {
    id: "logique",
    title: "Logique de programmation",
    subtitle: "Le socle de tout",
    icon: "🧠",
    color: "#1A1A4E",
    free: true,
    lessons: 8,
    description: "Comprends comment raisonne un ordinateur avant d'apprendre la syntaxe."
  },
  {
    id: "python",
    title: "Python",
    subtitle: "Automatise et comprends",
    icon: "🐍",
    color: "#3B82F6",
    free: true,
    lessons: 12,
    description: "Le langage le plus lisible pour débuter vraiment."
  },
  {
    id: "html-css",
    title: "HTML & CSS",
    subtitle: "Crée des pages web",
    icon: "🎨",
    color: "#EC4899",
    free: true,
    lessons: 10,
    description: "Structure et habille tes premières pages."
  },
  {
    id: "javascript",
    title: "JavaScript",
    subtitle: "Rends-les interactives",
    icon: "⚡",
    color: "#F59E0B",
    free: true,
    lessons: 14,
    description: "Donne vie à tes pages avec de la logique côté navigateur."
  },
  {
    id: "sql",
    title: "SQL",
    subtitle: "Parle aux données",
    icon: "🗄️",
    color: "#10B981",
    free: true,
    lessons: 8,
    description: "Interroge et manipule des bases de données."
  }
];

// ── EXERCICES LOGIQUE ────────────────────────────────────────────────────────
export const EXERCISES = {
  logique: [
    {
      id: "logique-1",
      type: "predict",
      title: "Qu'est-ce qu'une variable ?",
      explanation: "Une variable, c'est une boîte avec une étiquette. Tu mets quelque chose dedans, et tu peux y accéder plus tard en lisant l'étiquette.",
      code: `age = 25\nprenom = "Alice"\nprint(prenom, "a", age, "ans")`,
      question: "Que va afficher ce code ?",
      options: [
        { id: "a", text: "Alice a 25 ans", correct: true },
        { id: "b", text: "prenom a age ans", correct: false },
        { id: "c", text: "25 Alice", correct: false }
      ],
      comprehension: {
        question: "Pourquoi affiche-t-il 'Alice' et pas 'prenom' ?",
        options: [
          { id: "a", text: "Parce que print remplace les variables par leur contenu", correct: true },
          { id: "b", text: "Parce que les guillemets disparaissent à l'exécution", correct: false },
          { id: "c", text: "Parce que Alice est un mot-clé Python", correct: false }
        ],
        explanation: "Quand Python lit 'prenom', il cherche dans sa mémoire ce que contient cette variable. Il trouve 'Alice' et l'affiche. C'est la différence entre le nom de la boîte et ce qu'elle contient."
      }
    },
    {
      id: "logique-2",
      type: "findError",
      title: "Les conditions",
      explanation: "Une condition, c'est une question à laquelle Python répond oui ou non. Selon la réponse, il fait une chose ou une autre.",
      code: `temperature = 35\nif temperature > 30\n    print("Il fait chaud !")`,
      question: "Ce code contient une erreur. Laquelle ?",
      options: [
        { id: "a", text: "Il manque le signe ':' après la condition", correct: true },
        { id: "b", text: "Le nombre 30 devrait être entre guillemets", correct: false },
        { id: "c", text: "Le mot 'if' est mal orthographié", correct: false }
      ],
      comprehension: {
        question: "Pourquoi Python a-t-il besoin de ':' après la condition ?",
        options: [
          { id: "a", text: "C'est son signal pour dire 'ce qui suit est le bloc à exécuter si vrai'", correct: true },
          { id: "b", text: "C'est une règle arbitraire sans raison logique", correct: false },
          { id: "c", text: "Pour séparer la condition de la variable", correct: false }
        ],
        explanation: "Le ':' est la façon dont Python dit 'j'ai fini de lire la question, ce qui suit est ce que je dois faire si la réponse est oui'. C'est une ponctuation de structure, comme le point d'interrogation en français."
      }
    },
    {
      id: "logique-3",
      type: "complete",
      title: "Les boucles",
      explanation: "Une boucle permet de répéter une action sans réécrire le code. Python compte pour toi et recommence automatiquement.",
      code: `for i in range(_____):\n    print("Tour numéro", i)`,
      question: "Pour afficher 'Tour numéro 0' jusqu'à 'Tour numéro 4', que faut-il mettre dans le blanc ?",
      options: [
        { id: "a", text: "5", correct: true },
        { id: "b", text: "4", correct: false },
        { id: "c", text: "0, 4", correct: false }
      ],
      comprehension: {
        question: "Pourquoi range(5) commence à 0 et pas à 1 ?",
        options: [
          { id: "a", text: "En programmation, on compte souvent à partir de 0 — c'est une convention universelle", correct: true },
          { id: "b", text: "C'est un bug connu de Python", correct: false },
          { id: "c", text: "Parce que 0 est le premier chiffre de l'alphabet numérique", correct: false }
        ],
        explanation: "Compter à partir de 0 est une convention héritée des débuts de l'informatique. range(5) donne 0,1,2,3,4 — cinq nombres à partir de zéro."
      }
    }
  ],
  javascript: [
    {
      id: "js-1",
      type: "predict",
      title: "Ton premier console.log",
      explanation: "En JavaScript, console.log() affiche un message. C'est l'équivalent de print() en Python.",
      code: `let prenom = "Olivier";\nconsole.log("Bonjour", prenom);`,
      question: "Que va afficher ce code ?",
      options: [
        { id: "a", text: "Bonjour Olivier", correct: true },
        { id: "b", text: "Bonjour prenom", correct: false },
        { id: "c", text: "let prenom Olivier", correct: false }
      ],
      comprehension: {
        question: "Pourquoi écrit-on 'let' avant la variable ?",
        options: [
          { id: "a", text: "Pour dire à JavaScript qu'on crée une nouvelle variable", correct: true },
          { id: "b", text: "C'est obligatoire uniquement avec les textes", correct: false },
          { id: "c", text: "Pour que la variable soit visible partout", correct: false }
        ],
        explanation: "'let' est le mot-clé de déclaration en JavaScript moderne. Il dit au moteur JS : 'je crée une nouvelle variable ici'. Sans lui, JS ne sait pas si tu crées une variable ou si tu en utilises une existante."
      }
    },
    {
      id: "js-2",
      type: "findError",
      title: "Les fonctions",
      explanation: "Une fonction est un bloc de code réutilisable. Tu lui donnes un nom, et tu l'appelles quand tu en as besoin.",
      code: `function direBonjour(nom) {\n  console.log("Bonjour " + nom);\n}\ndireBonjour("Alice")\ndireBonjour("Bob")`,
      question: "Ce code fonctionne-t-il correctement ?",
      options: [
        { id: "a", text: "Oui, il affiche 'Bonjour Alice' puis 'Bonjour Bob'", correct: true },
        { id: "b", text: "Non, il manque un point-virgule après la fonction", correct: false },
        { id: "c", text: "Non, on ne peut pas appeler une fonction deux fois", correct: false }
      ],
      comprehension: {
        question: "Quel est l'avantage d'utiliser une fonction ici ?",
        options: [
          { id: "a", text: "Éviter de réécrire console.log à chaque fois — une seule définition, plusieurs usages", correct: true },
          { id: "b", text: "Les fonctions sont obligatoires en JavaScript", correct: false },
          { id: "c", text: "Pour que le code s'exécute plus vite", correct: false }
        ],
        explanation: "Une fonction c'est comme une recette : tu l'écris une fois, tu l'utilises autant de fois que tu veux avec des ingrédients différents. Ici 'nom' est l'ingrédient — 'Alice' la première fois, 'Bob' la deuxième."
      }
    }
  ],
  sql: [
    {
      id: "sql-1",
      type: "predict",
      title: "Ta première requête",
      explanation: "SQL permet d'interroger une base de données. SELECT * FROM table dit : 'donne-moi tout ce qui est dans cette table'.",
      code: `SELECT * FROM utilisateurs;`,
      question: "Que fait cette requête ?",
      options: [
        { id: "a", text: "Elle récupère toutes les lignes et colonnes de la table 'utilisateurs'", correct: true },
        { id: "b", text: "Elle supprime la table 'utilisateurs'", correct: false },
        { id: "c", text: "Elle crée une nouvelle table vide", correct: false }
      ],
      comprehension: {
        question: "Que signifie le '*' dans SELECT * ?",
        options: [
          { id: "a", text: "Toutes les colonnes — c'est un raccourci pour 'je veux tout'", correct: true },
          { id: "b", text: "La première colonne uniquement", correct: false },
          { id: "c", text: "C'est une multiplication", correct: false }
        ],
        explanation: "L'étoile * est un joker universel en SQL : elle signifie 'toutes les colonnes'. Si tu veux seulement le nom et l'email, tu écrirais SELECT nom, email FROM utilisateurs. L'étoile c'est le raccourci quand tu veux tout."
      }
    },
    {
      id: "sql-2",
      type: "complete",
      title: "Filtrer avec WHERE",
      explanation: "WHERE permet de filtrer les résultats. Comme un if en programmation — on ne récupère que les lignes qui correspondent à une condition.",
      code: `SELECT * FROM produits\n_____ prix < 20;`,
      question: "Quel mot-clé faut-il mettre dans le blanc pour filtrer les produits qui coûtent moins de 20€ ?",
      options: [
        { id: "a", text: "WHERE", correct: true },
        { id: "b", text: "IF", correct: false },
        { id: "c", text: "FILTER", correct: false }
      ],
      comprehension: {
        question: "Pourquoi SQL utilise WHERE et pas IF comme Python ?",
        options: [
          { id: "a", text: "SQL est un langage de requête, pas un langage de programmation — ses mots-clés décrivent des données, pas des actions", correct: true },
          { id: "b", text: "C'est un choix arbitraire des créateurs de SQL", correct: false },
          { id: "c", text: "IF existe aussi en SQL, WHERE est juste plus court", correct: false }
        ],
        explanation: "SQL se lit comme une phrase en anglais : 'SELECT tout FROM produits WHERE prix est inférieur à 20'. C'est intentionnel — SQL a été conçu pour être lisible par des non-programmeurs. WHERE = 'là où la condition est vraie'."
      }
    }
  ]
};

// ── EXERCICES PYTHON ─────────────────────────────────────────────────────────
export const PYTHON_EXERCISES = [
  {
    id: "python-1",
    type: "code",
    lang: "python",
    title: "Ton premier print",
    explanation: "print() est la commande qui dit à Python d'afficher quelque chose.",
    task: "Écris un code qui affiche exactement : Bonjour ExpanceLoop",
    initialCode: "# Écris ton code ici\n",
    expectedOutput: "Bonjour ExpanceLoop",
    comprehension: {
      question: "Pourquoi faut-il des guillemets autour du texte ?",
      options: [
        { id: "a", text: "Pour signaler à Python que c'est du texte, pas une variable ou une commande", correct: true },
        { id: "b", text: "Pour que le texte s'affiche en gras", correct: false },
        { id: "c", text: "C'est obligatoire uniquement avec print()", correct: false },
      ],
      explanation: "En Python, tout ce qui est entre guillemets est une chaîne de caractères — du texte brut. Sans guillemets, Python chercherait une variable avec ce nom et déclencherait une erreur."
    }
  },
  {
    id: "python-2",
    type: "code",
    lang: "python",
    title: "Calcul avec des variables",
    explanation: "Une variable stocke une valeur. Tu peux ensuite faire des calculs avec elle.",
    task: "Crée deux variables : prix = 15 et quantite = 4. Affiche le total (prix multiplié par quantite).",
    initialCode: "prix = 15\nquantite = 4\n# Affiche le total ici\n",
    expectedOutput: "60",
    comprehension: {
      question: "Si tu avais écrit print('prix * quantite'), qu'aurait affiché Python ?",
      options: [
        { id: "a", text: "prix * quantite  (le texte tel quel, sans calculer)", correct: true },
        { id: "b", text: "60  (Python aurait quand même calculé)", correct: false },
        { id: "c", text: "Une erreur", correct: false },
      ],
      explanation: "Les guillemets figent le contenu en texte pur. Python n'interprète rien à l'intérieur."
    }
  },
  {
    id: "python-3",
    type: "code",
    lang: "python",
    title: "Condition if / else",
    explanation: "if / else permet à ton programme de prendre des décisions.",
    task: "La variable age vaut 17. Affiche 'Majeur' si age >= 18, sinon affiche 'Mineur'.",
    initialCode: "age = 17\n# Complète la condition\n",
    expectedOutput: "Mineur",
    comprehension: {
      question: "Que se passe-t-il si tu mets age = 18 ?",
      options: [
        { id: "a", text: "Python affichera 'Majeur' car la condition age >= 18 devient vraie", correct: true },
        { id: "b", text: "Python affichera quand même 'Mineur'", correct: false },
        { id: "c", text: "Python affichera les deux lignes", correct: false },
      ],
      explanation: "Python évalue la condition au moment de l'exécution. Si age vaut 18, la condition est vraie et le bloc if s'exécute. Le bloc else est ignoré."
    }
  }
];

export const COMPREHENSION_MARKERS_PYTHON = {
  'python-1': "J'ai compris pourquoi le texte doit être entre guillemets dans print()",
  'python-2': "J'ai compris la différence entre une variable et du texte entre guillemets",
  'python-3': "J'ai compris comment if/else prend des décisions selon une condition",
};

// ── EXERCICES HTML/CSS ────────────────────────────────────────────────────────
export const HTML_EXERCISES = [
  {
    id: "html-1",
    type: "html",
    title: "Ta première balise",
    explanation: "HTML structure le contenu d'une page. Chaque élément est entouré de balises ouvrante et fermante.",
    task: "Écris un titre principal qui dit : Bienvenue sur ma page",
    initialHtml: "<!-- Écris ton HTML ici -->\n",
    initialCss: "",
    expectedCheck: (code) => code.toLowerCase().includes('<h1') && code.toLowerCase().includes('bienvenue'),
    comprehension: {
      question: "Pourquoi y a-t-il une balise ouvrante ET une balise fermante ?",
      options: [
        { id: "a", text: "Pour délimiter le début et la fin du contenu à mettre en forme", correct: true },
        { id: "b", text: "La balise fermante est optionnelle en HTML moderne", correct: false },
        { id: "c", text: "Pour que le navigateur sache que c'est du HTML", correct: false },
      ],
      explanation: "Les balises fonctionnent comme des parenthèses : elles définissent exactement où commence et où finit un élément."
    }
  },
  {
    id: "html-2",
    type: "html",
    title: "Ajouter du style",
    explanation: "CSS habille le HTML. Il change les couleurs, les tailles, les polices.",
    task: "Écris un paragraphe <p> avec le texte 'Hello', puis colorie-le en orange avec CSS.",
    initialHtml: "<p>Hello</p>\n",
    initialCss: "/* Ajoute ton CSS ici */\n",
    expectedCheck: (code) => code.toLowerCase().includes('<p') && code.toLowerCase().includes('color'),
    comprehension: {
      question: "Pourquoi CSS et HTML sont-ils séparés ?",
      options: [
        { id: "a", text: "Pour séparer la structure (ce qu'il y a) du style (comment ça apparaît)", correct: true },
        { id: "b", text: "Parce que le navigateur ne peut pas lire les deux en même temps", correct: false },
        { id: "c", text: "C'est une convention sans raison technique", correct: false },
      ],
      explanation: "HTML dit 'ici il y a un paragraphe'. CSS dit 'ce paragraphe est orange'. Séparer les deux permet de changer tout l'habillage sans toucher au contenu."
    }
  },
  {
    id: "html-3",
    type: "html",
    title: "Une liste",
    explanation: "Les listes <ul><li> sont parmi les éléments les plus utilisés du web.",
    task: "Crée une liste de 2 éléments : 'Python' et 'JavaScript'.",
    initialHtml: "<!-- Crée ta liste ici -->\n",
    initialCss: "li { margin: 6px 0; color: #1A1A4E; font-weight: bold; }\n",
    expectedCheck: (code) => code.toLowerCase().includes('<ul') && code.toLowerCase().includes('python'),
    comprehension: {
      question: "Quelle est la différence entre <ul> et <ol> ?",
      options: [
        { id: "a", text: "<ul> fait une liste à puces, <ol> numérote les éléments", correct: true },
        { id: "b", text: "<ul> est pour HTML, <ol> est pour CSS", correct: false },
        { id: "c", text: "Aucune différence visuelle", correct: false },
      ],
      explanation: "ul = unordered list (puces). ol = ordered list (1, 2, 3). On utilise ul quand l'ordre n'a pas d'importance, ol quand il en a."
    }
  }
];

export const COMPREHENSION_MARKERS_HTML = {
  'html-1': "J'ai compris pourquoi les balises HTML fonctionnent par paires",
  'html-2': "J'ai compris la séparation entre structure HTML et style CSS",
  'html-3': "J'ai compris la différence entre liste ordonnée et non ordonnée",
};

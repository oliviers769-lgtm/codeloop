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

// ── EXERCICES LOGIQUE ─────────────────────────────────────────────────────────
export const EXERCISES = {
  logique: [
    {
      id: "logique-1",
      type: "predict",
      title: "Qu'est-ce qu'une variable ?",
      explanation: "Une variable, c'est une boîte avec une étiquette. Tu mets quelque chose dedans, et tu peux y accéder plus tard en lisant l'étiquette.",
      code: `service = "Cardiologie"\nnombre_patients = 12\nprint(service, ":", nombre_patients, "patients")`,
      question: "Que va afficher ce code ?",
      options: [
        { id: "a", text: "Cardiologie : 12 patients", correct: true },
        { id: "b", text: "service : nombre_patients patients", correct: false },
        { id: "c", text: "12 Cardiologie", correct: false }
      ],
      comprehension: {
        question: "Pourquoi affiche-t-il 'Cardiologie' et pas 'service' ?",
        options: [
          { id: "a", text: "Parce que Python remplace les variables par leur contenu", correct: true },
          { id: "b", text: "Parce que les guillemets disparaissent à l'exécution", correct: false },
          { id: "c", text: "Parce que Cardiologie est un mot-clé Python", correct: false }
        ],
        explanation: "Quand Python lit 'service', il cherche dans sa mémoire ce que contient cette variable. Il trouve 'Cardiologie' et l'affiche. C'est la différence entre le nom de la boîte et ce qu'elle contient."
      }
    },
    {
      id: "logique-2",
      type: "findError",
      title: "Les conditions",
      explanation: "Une condition, c'est une question à laquelle Python répond oui ou non. Selon la réponse, il fait une chose ou une autre.",
      code: `temperature = 38.5\nif temperature > 37.5\n    print("Fièvre détectée — alerter l'infirmière")`,
      question: "Ce code contient une erreur. Laquelle ?",
      options: [
        { id: "a", text: "Il manque le signe ':' après la condition", correct: true },
        { id: "b", text: "Le nombre 37.5 devrait être entre guillemets", correct: false },
        { id: "c", text: "Le mot 'if' est mal orthographié", correct: false }
      ],
      comprehension: {
        question: "Pourquoi Python a-t-il besoin de ':' après la condition ?",
        options: [
          { id: "a", text: "C'est son signal pour dire 'ce qui suit est le bloc à exécuter si vrai'", correct: true },
          { id: "b", text: "C'est une règle arbitraire sans raison logique", correct: false },
          { id: "c", text: "Pour séparer la condition de la variable", correct: false }
        ],
        explanation: "Le ':' est la façon dont Python dit 'j'ai fini de lire la question, ce qui suit est ce que je dois faire si la réponse est oui'. Comme le point d'interrogation en français, c'est une ponctuation de structure."
      }
    },
    {
      id: "logique-3",
      type: "complete",
      title: "Les boucles",
      explanation: "Une boucle permet de répéter une action sans réécrire le code. Très utile pour traiter des listes de patients, de médicaments, de services...",
      code: `services = ["Urgences", "Cardiologie", "Pédiatrie"]\nfor service in services:\n    print("Vérification du service :", service)`,
      question: "Combien de fois va s'exécuter le print() ?",
      options: [
        { id: "a", text: "3 fois — une fois par service dans la liste", correct: true },
        { id: "b", text: "1 fois — Python s'arrête au premier élément", correct: false },
        { id: "c", text: "À l'infini", correct: false }
      ],
      comprehension: {
        question: "Quel est l'avantage d'une boucle sur 3 print() séparés ?",
        options: [
          { id: "a", text: "Si on ajoute un 4e service à la liste, la boucle le traite automatiquement sans modifier le code", correct: true },
          { id: "b", text: "La boucle est plus rapide à exécuter", correct: false },
          { id: "c", text: "Il n'y a aucun avantage, c'est juste une convention", correct: false }
        ],
        explanation: "La boucle s'adapte automatiquement à la taille de la liste. Si demain tu as 50 services, tu n'as pas à écrire 50 lignes de code — la boucle les parcourt tous."
      }
    }
  ],
  javascript: [
    {
      id: "js-1",
      type: "predict",
      title: "Ton premier console.log",
      explanation: "En JavaScript, console.log() affiche un message. C'est l'équivalent de print() en Python.",
      code: `let service = "Urgences";\nlet patients = 8;\nconsole.log(service, ":", patients, "patients en attente");`,
      question: "Que va afficher ce code ?",
      options: [
        { id: "a", text: "Urgences : 8 patients en attente", correct: true },
        { id: "b", text: "service : patients patients en attente", correct: false },
        { id: "c", text: "Une erreur", correct: false }
      ],
      comprehension: {
        question: "Pourquoi écrit-on 'let' avant la variable ?",
        options: [
          { id: "a", text: "Pour dire à JavaScript qu'on crée une nouvelle variable", correct: true },
          { id: "b", text: "C'est obligatoire uniquement avec les textes", correct: false },
          { id: "c", text: "Pour que la variable soit visible partout", correct: false }
        ],
        explanation: "'let' est le mot-clé de déclaration en JavaScript moderne. Il dit au moteur JS : 'je crée une nouvelle variable ici'."
      }
    },
    {
      id: "js-2",
      type: "findError",
      title: "Les fonctions",
      explanation: "Une fonction est un bloc de code réutilisable. Tu lui donnes un nom, et tu l'appelles quand tu en as besoin.",
      code: `function alerterService(service, niveau) {\n  console.log("ALERTE", niveau, "pour", service);\n}\nalterterService("Cardiologie", "CRITIQUE");\nalterterService("Pédiatrie", "NORMAL");`,
      question: "Ce code contient une erreur. Laquelle ?",
      options: [
        { id: "a", text: "La fonction s'appelle 'alerterService' mais on l'appelle 'alterterService' (faute de frappe)", correct: true },
        { id: "b", text: "Il manque un point-virgule après la fonction", correct: false },
        { id: "c", text: "On ne peut pas passer deux paramètres à une fonction", correct: false }
      ],
      comprehension: {
        question: "Quel est l'avantage d'une fonction ici ?",
        options: [
          { id: "a", text: "Écrire la logique d'alerte une seule fois et l'utiliser pour n'importe quel service", correct: true },
          { id: "b", text: "Les fonctions sont obligatoires en JavaScript", correct: false },
          { id: "c", text: "Pour que le code s'exécute plus vite", correct: false }
        ],
        explanation: "Une fonction c'est comme un protocole médical : tu l'écris une fois, tu l'appliques autant de fois que nécessaire avec des paramètres différents."
      }
    }
  ],
  sql: [
    {
      id: "sql-1",
      type: "predict",
      title: "Ta première requête",
      explanation: "SQL permet d'interroger une base de données. SELECT * FROM table dit : 'donne-moi tout ce qui est dans cette table'.",
      code: `SELECT * FROM patients;`,
      question: "Que fait cette requête ?",
      options: [
        { id: "a", text: "Elle récupère toutes les lignes et colonnes de la table 'patients'", correct: true },
        { id: "b", text: "Elle supprime la table 'patients'", correct: false },
        { id: "c", text: "Elle crée une nouvelle table vide", correct: false }
      ],
      comprehension: {
        question: "Que signifie le '*' dans SELECT * ?",
        options: [
          { id: "a", text: "Toutes les colonnes — c'est un raccourci pour 'je veux tout'", correct: true },
          { id: "b", text: "La première colonne uniquement", correct: false },
          { id: "c", text: "C'est une multiplication", correct: false }
        ],
        explanation: "L'étoile * est un joker universel en SQL. Si tu veux seulement le nom et le service, tu écrirais SELECT nom, service FROM patients."
      }
    },
    {
      id: "sql-2",
      type: "complete",
      title: "Filtrer avec WHERE",
      explanation: "WHERE permet de filtrer les résultats. Comme un if en programmation — on ne récupère que les lignes qui correspondent à une condition.",
      code: `SELECT * FROM patients\n_____ service = 'Urgences';`,
      question: "Quel mot-clé faut-il mettre dans le blanc pour ne récupérer que les patients des Urgences ?",
      options: [
        { id: "a", text: "WHERE", correct: true },
        { id: "b", text: "IF", correct: false },
        { id: "c", text: "FILTER", correct: false }
      ],
      comprehension: {
        question: "Pourquoi SQL utilise WHERE et pas IF comme Python ?",
        options: [
          { id: "a", text: "SQL se lit comme une phrase : 'SELECT tout FROM patients WHERE service est Urgences'", correct: true },
          { id: "b", text: "C'est un choix arbitraire", correct: false },
          { id: "c", text: "IF existe aussi en SQL, WHERE est juste plus court", correct: false }
        ],
        explanation: "SQL a été conçu pour être lisible comme une phrase en anglais. WHERE = 'là où la condition est vraie'. C'est intentionnel pour que même les non-développeurs puissent lire les requêtes."
      }
    }
  ]
};

// ── EXERCICES PYTHON ──────────────────────────────────────────────────────────
export const PYTHON_EXERCISES = [
  {
    id: "python-1",
    type: "code",
    lang: "python",
    title: "Ton premier print",
    explanation: "print() est la commande qui dit à Python d'afficher quelque chose. Dans un hôpital, ça pourrait afficher le nom d'un patient, un résultat d'analyse...",
    task: "Écris un code qui affiche exactement : Bienvenue à l'hôpital",
    initialCode: "# Écris ton code ici\n",
    expectedOutput: "Bienvenue à l'hôpital",
    comprehension: {
      question: "Pourquoi faut-il des guillemets autour du texte ?",
      options: [
        { id: "a", text: "Pour signaler à Python que c'est du texte, pas une variable ou une commande", correct: true },
        { id: "b", text: "Pour que le texte s'affiche en gras", correct: false },
        { id: "c", text: "C'est obligatoire uniquement avec print()", correct: false },
      ],
      explanation: "En Python, tout ce qui est entre guillemets est une chaîne de caractères — du texte brut. Sans guillemets, Python chercherait une variable avec ce nom."
    }
  },
  {
    id: "python-2",
    type: "code",
    lang: "python",
    title: "Calcul de dose",
    explanation: "Les variables permettent de stocker des valeurs et de faire des calculs. Utile pour calculer des doses, des durées de traitement...",
    task: "Un patient pèse 70 kg. La dose est de 5 mg par kg. Calcule et affiche la dose totale.",
    initialCode: "poids = 70\ndose_par_kg = 5\n# Calcule et affiche la dose totale\n",
    expectedOutput: "350",
    comprehension: {
      question: "Si le patient pesait 80 kg, que faudrait-il changer dans le code ?",
      options: [
        { id: "a", text: "Seulement la valeur de 'poids' — le calcul se ferait automatiquement", correct: true },
        { id: "b", text: "Il faudrait tout réécrire", correct: false },
        { id: "c", text: "Il faudrait changer dose_par_kg aussi", correct: false },
      ],
      explanation: "C'est tout l'intérêt des variables : changer une seule valeur met à jour tout le calcul automatiquement. Le code s'adapte sans être réécrit."
    }
  },
  {
    id: "python-3",
    type: "code",
    lang: "python",
    title: "Alerte de fièvre",
    explanation: "if / else permet à ton programme de prendre des décisions automatiquement — comme un protocole médical.",
    task: "La variable temperature vaut 38.8. Affiche 'Fièvre : alerter' si temperature > 37.5, sinon affiche 'Température normale'.",
    initialCode: "temperature = 38.8\n# Écris la condition\n",
    expectedOutput: "Fièvre : alerter",
    comprehension: {
      question: "Que se passe-t-il si on met temperature = 36.5 ?",
      options: [
        { id: "a", text: "Python affiche 'Température normale' car 36.5 n'est pas supérieur à 37.5", correct: true },
        { id: "b", text: "Python affiche quand même 'Fièvre : alerter'", correct: false },
        { id: "c", text: "Python affiche les deux messages", correct: false },
      ],
      explanation: "Python évalue la condition à chaque exécution. Si temperature vaut 36.5, la condition est fausse et c'est le bloc else qui s'exécute."
    }
  }
];

export const COMPREHENSION_MARKERS_PYTHON = {
  'python-1': "J'ai compris pourquoi le texte doit être entre guillemets dans print()",
  'python-2': "J'ai compris comment les variables permettent d'automatiser des calculs",
  'python-3': "J'ai compris comment if/else automatise des décisions comme un protocole",
};

// ── EXERCICES HTML/CSS ────────────────────────────────────────────────────────
export const HTML_EXERCISES = [
  {
    id: "html-1",
    type: "html",
    title: "Ta première balise",
    explanation: "HTML structure le contenu d'une page. Chaque élément est entouré de balises ouvrante et fermante.",
    task: "Écris un titre principal qui dit : Service des Urgences",
    initialHtml: "<!-- Écris ton HTML ici -->\n",
    initialCss: "",
    expectedCheck: (code) => code.toLowerCase().includes('<h1') && code.toLowerCase().includes('urgences'),
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
    task: "Écris un paragraphe avec 'Patient stable', puis colorie-le en vert avec CSS.",
    initialHtml: "<p>Patient stable</p>\n",
    initialCss: "/* Ajoute ton CSS ici */\n",
    expectedCheck: (code) => code.toLowerCase().includes('<p') && code.toLowerCase().includes('color'),
    comprehension: {
      question: "Pourquoi CSS et HTML sont-ils séparés ?",
      options: [
        { id: "a", text: "Pour séparer la structure (ce qu'il y a) du style (comment ça apparaît)", correct: true },
        { id: "b", text: "Parce que le navigateur ne peut pas lire les deux en même temps", correct: false },
        { id: "c", text: "C'est une convention sans raison technique", correct: false },
      ],
      explanation: "HTML dit 'ici il y a un paragraphe'. CSS dit 'ce paragraphe est vert'. Séparer les deux permet de changer tout l'habillage sans toucher au contenu."
    }
  },
  {
    id: "html-3",
    type: "html",
    title: "Liste de services",
    explanation: "Les listes <ul><li> sont parmi les éléments les plus utilisés du web.",
    task: "Crée une liste des services : 'Urgences', 'Cardiologie', 'Pédiatrie'.",
    initialHtml: "<!-- Crée ta liste ici -->\n",
    initialCss: "li { margin: 6px 0; color: #1A1A4E; font-weight: bold; }\n",
    expectedCheck: (code) => code.toLowerCase().includes('<ul') && code.toLowerCase().includes('urgences'),
    comprehension: {
      question: "Quelle est la différence entre <ul> et <ol> ?",
      options: [
        { id: "a", text: "<ul> fait une liste à puces, <ol> numérote les éléments", correct: true },
        { id: "b", text: "<ul> est pour HTML, <ol> est pour CSS", correct: false },
        { id: "c", text: "Aucune différence visuelle", correct: false },
      ],
      explanation: "ul = unordered list (puces). ol = ordered list (1, 2, 3). Pour une liste de services, ul suffit. Pour un protocole à suivre dans l'ordre, ol serait plus adapté."
    }
  }
];

export const COMPREHENSION_MARKERS_HTML = {
  'html-1': "J'ai compris pourquoi les balises HTML fonctionnent par paires",
  'html-2': "J'ai compris la séparation entre structure HTML et style CSS",
  'html-3': "J'ai compris la différence entre liste ordonnée et non ordonnée",
};

// ── EXERCICES LOGIQUE SUPPLÉMENTAIRES ─────────────────────────────────────────
export const EXTRA_LOGIQUE = [
  {
    id: "logique-4",
    type: "predict",
    title: "Les fonctions — cuisiner du code",
    explanation: "Une fonction c'est comme une recette : tu lui donnes des ingrédients, elle te rend un résultat.",
    code: `def saluer(prenom):\n    return "Bonjour " + prenom + " !"\n\nprint(saluer("Marie"))\nprint(saluer("Thomas"))`,
    question: "Que va afficher ce code ?",
    options: [
      { id: "a", text: "Bonjour Marie !\nBonjour Thomas !", correct: true },
      { id: "b", text: "Bonjour prenom !\nBonjour prenom !", correct: false },
      { id: "c", text: "saluer Marie\nsaluer Thomas", correct: false }
    ],
    comprehension: {
      question: "Pourquoi écrire une fonction plutôt que deux print() séparés ?",
      options: [
        { id: "a", text: "Pour réutiliser la même logique avec des valeurs différentes sans répéter le code", correct: true },
        { id: "b", text: "Les fonctions sont obligatoires en Python", correct: false },
        { id: "c", text: "Pour que le code s'exécute deux fois plus vite", correct: false }
      ],
      explanation: "Une fonction c'est de la logique mise en boîte. Tu l'écris une fois, tu l'appelles autant de fois que tu veux avec des paramètres différents."
    }
  },
  {
    id: "logique-5",
    type: "findError",
    title: "Les listes — ranger ses affaires",
    explanation: "Une liste permet de stocker plusieurs valeurs dans une seule variable. Comme un tiroir avec des compartiments numérotés.",
    code: `courses = ["pain", "lait", "café"]\nprint("Premier article :", courses[1])`,
    question: "Ce code veut afficher le premier article. Où est l'erreur ?",
    options: [
      { id: "a", text: "En Python, les listes commencent à 0 — le premier article est courses[0]", correct: true },
      { id: "b", text: "Le mot 'courses' est mal orthographié", correct: false },
      { id: "c", text: "Il manque des guillemets autour des articles", correct: false }
    ],
    comprehension: {
      question: "Pourquoi Python commence-t-il à compter à 0 et pas à 1 ?",
      options: [
        { id: "a", text: "Pour des raisons techniques héritées de l'histoire de l'informatique — c'est universel dans la plupart des langages", correct: true },
        { id: "b", text: "C'est un choix arbitraire de Python uniquement", correct: false },
        { id: "c", text: "Pour éviter les confusions avec les nombres négatifs", correct: false }
      ],
      explanation: "L'indexation à 0 vient de la façon dont les ordinateurs stockent les données en mémoire. C'est une convention universelle que tu retrouveras dans presque tous les langages."
    }
  },
  {
    id: "logique-6",
    type: "complete",
    title: "Vrai ou Faux — les booléens",
    explanation: "Un booléen c'est simplement Vrai (True) ou Faux (False). C'est la base de toute décision en programmation.",
    code: `connecte = True\nif connecte:\n    print("Bienvenue !")\nelse:\n    print("Accès refusé")`,
    question: "Que va afficher ce code ?",
    options: [
      { id: "a", text: "Bienvenue !", correct: true },
      { id: "b", text: "Accès refusé", correct: false },
      { id: "c", text: "True", correct: false }
    ],
    comprehension: {
      question: "Que se passe-t-il si on change connecte = False ?",
      options: [
        { id: "a", text: "Python affiche 'Accès refusé' car la condition est maintenant fausse", correct: true },
        { id: "b", text: "Python affiche les deux messages", correct: false },
        { id: "c", text: "Python génère une erreur", correct: false }
      ],
      explanation: "Le if évalue la valeur du booléen. True → bloc if. False → bloc else. C'est la logique binaire à la base de tout ordinateur."
    }
  }
];

// ── EXERCICES JS SUPPLÉMENTAIRES ──────────────────────────────────────────────
export const EXTRA_JS = [
  {
    id: "js-3",
    type: "predict",
    title: "Les conditions",
    explanation: "if/else en JavaScript fonctionne comme en Python — avec une syntaxe légèrement différente.",
    code: `let heure = 14;\nif (heure < 12) {\n  console.log("Bonjour !");\n} else {\n  console.log("Bon après-midi !");\n}`,
    question: "Que va afficher ce code ?",
    options: [
      { id: "a", text: "Bon après-midi !", correct: true },
      { id: "b", text: "Bonjour !", correct: false },
      { id: "c", text: "14", correct: false }
    ],
    comprehension: {
      question: "Quelle est la différence de syntaxe entre Python et JavaScript pour les conditions ?",
      options: [
        { id: "a", text: "JS utilise des parenthèses () et des accolades {} là où Python utilise : et l'indentation", correct: true },
        { id: "b", text: "Il n'y a aucune différence", correct: false },
        { id: "c", text: "JS n'a pas de else", correct: false }
      ],
      explanation: "Même logique, syntaxe différente. C'est comme deux langues humaines : 'si' en français, 'if' en anglais — même concept, mots différents."
    }
  }
];

// ── EXERCICES SQL SUPPLÉMENTAIRES ─────────────────────────────────────────────
export const EXTRA_SQL = [
  {
    id: "sql-3",
    type: "predict",
    title: "Trier les résultats",
    explanation: "ORDER BY permet de trier les résultats. ASC = croissant, DESC = décroissant.",
    code: `SELECT nom, age FROM employes\nORDER BY age DESC;`,
    question: "Que fait cette requête ?",
    options: [
      { id: "a", text: "Elle récupère nom et age, triés du plus vieux au plus jeune", correct: true },
      { id: "b", text: "Elle supprime les employés les plus âgés", correct: false },
      { id: "c", text: "Elle récupère tous les employés dans l'ordre alphabétique", correct: false }
    ],
    comprehension: {
      question: "Comment afficher du plus jeune au plus vieux ?",
      options: [
        { id: "a", text: "Remplacer DESC par ASC", correct: true },
        { id: "b", text: "Écrire ORDER BY age REVERSE", correct: false },
        { id: "c", text: "Ce n'est pas possible en SQL", correct: false }
      ],
      explanation: "ASC (ascending) = ordre croissant — du plus petit au plus grand. DESC (descending) = ordre décroissant. Simple à retenir : DESC comme 'descendre'."
    }
  }
];

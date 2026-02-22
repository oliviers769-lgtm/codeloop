export const LOGIQUE_EXERCISES = [
  // ── LEÇON 1 — Les variables ───────────────────────────────────────────────
  {
    id: "logique-1",
    type: "predict",
    title: "Les variables — des boîtes avec des étiquettes",
    explanation: `Une variable, c'est une boîte dans laquelle tu ranges une valeur. Tu lui donnes un nom (l'étiquette), et tu peux retrouver son contenu à tout moment.

Exemple du quotidien : imagine un casier avec ton nom dessus. Tu y mets ta veste. Quand quelqu'un dit "va chercher la veste de Marie", il lit l'étiquette "Marie" et récupère ce qu'il y a dedans.

En code c'est pareil :
  prenom = "Marie"    → tu crées un casier "prenom" avec "Marie" dedans
  print(prenom)       → Python lit le casier et affiche "Marie"`,
    code: `ville = "Lyon"\nhabitants = 500000\nprint(ville, ":", habitants, "habitants")`,
    question: "Que va afficher ce code ?",
    options: [
      { id: "a", text: "Lyon : 500000 habitants", correct: true },
      { id: "b", text: "ville : habitants habitants", correct: false },
      { id: "c", text: "Lyon habitants 500000", correct: false }
    ],
    comprehension: {
      question: "Pourquoi affiche-t-il 'Lyon' et pas 'ville' ?",
      options: [
        { id: "a", text: "Python remplace le nom de la variable par ce qu'elle contient", correct: true },
        { id: "b", text: "Parce que Lyon est un mot-clé Python", correct: false },
        { id: "c", text: "Parce que les guillemets disparaissent à l'exécution", correct: false }
      ],
      explanation: "Quand Python rencontre 'ville', il ouvre le casier correspondant et en sort le contenu — 'Lyon'. C'est la différence fondamentale entre le nom de la boîte et ce qu'elle contient."
    }
  },

  // ── LEÇON 2 — Piège classique des variables ───────────────────────────────
  {
    id: "logique-2",
    type: "findError",
    title: "Les variables — l'erreur du débutant",
    explanation: `Attention : Python est sensible à la casse et à l'orthographe. Si tu crées une variable "score" et que tu appelles "Score", Python ne reconnaît pas — ce sont deux choses différentes pour lui.

C'est comme si tu rangeais ta clé sous l'étiquette "clé de voiture" et que tu cherchais "Clé De Voiture" — le casier introuvable !`,
    code: `temperature = 37.5\nprint("Température du patient :", Temperature)`,
    question: "Ce code va afficher une erreur. Laquelle ?",
    options: [
      { id: "a", text: "Python ne trouve pas 'Temperature' car la variable s'appelle 'temperature' (minuscule)", correct: true },
      { id: "b", text: "Python ne peut pas afficher des nombres décimaux", correct: false },
      { id: "c", text: "Il manque des guillemets autour de 37.5", correct: false }
    ],
    comprehension: {
      question: "Pourquoi Python distingue-t-il majuscules et minuscules ?",
      options: [
        { id: "a", text: "Pour permettre d'avoir 'temperature', 'Temperature' et 'TEMPERATURE' comme trois variables distinctes si besoin", correct: true },
        { id: "b", text: "C'est un bug historique jamais corrigé", correct: false },
        { id: "c", text: "Pour obliger les développeurs à être précis", correct: false }
      ],
      explanation: "La sensibilité à la casse est intentionnelle. Elle donne de la flexibilité mais exige de la rigueur. La convention en Python : tout en minuscules avec des underscores — 'ma_variable'."
    }
  },

  // ── LEÇON 3 — Les conditions ──────────────────────────────────────────────
  {
    id: "logique-3",
    type: "predict",
    title: "Les conditions — si... alors... sinon...",
    explanation: `Une condition, c'est une question à laquelle Python répond oui (True) ou non (False). Selon la réponse, il fait une chose ou une autre.

Structure :
  if condition:       → si c'est vrai...
      action A        →   faire A
  else:               → sinon...
      action B        →   faire B

C'est exactement comme dans la vie : "S'il pleut, je prends un parapluie. Sinon, je n'en prends pas."`,
    code: `age = 20\nif age >= 18:\n    print("Accès autorisé")\nelse:\n    print("Accès refusé")`,
    question: "Que va afficher ce code ?",
    options: [
      { id: "a", text: "Accès autorisé", correct: true },
      { id: "b", text: "Accès refusé", correct: false },
      { id: "c", text: "Les deux messages", correct: false }
    ],
    comprehension: {
      question: "Que se passe-t-il si on change age = 15 ?",
      options: [
        { id: "a", text: "Python affiche 'Accès refusé' car 15 >= 18 est faux", correct: true },
        { id: "b", text: "Python affiche toujours 'Accès autorisé'", correct: false },
        { id: "c", text: "Python génère une erreur car 15 < 18", correct: false }
      ],
      explanation: "Python évalue la condition à chaque exécution. Si age vaut 15, alors 15 >= 18 est False, et c'est le bloc else qui s'exécute. Le code s'adapte automatiquement à la valeur de la variable."
    }
  },

  // ── LEÇON 4 — Les boucles ─────────────────────────────────────────────────
  {
    id: "logique-4",
    type: "complete",
    title: "Les boucles — ne jamais répéter deux fois la même chose",
    explanation: `Une boucle permet de répéter une action automatiquement sur chaque élément d'une liste.

Sans boucle :
  print("Bonjour Alice")
  print("Bonjour Bob")
  print("Bonjour Claire")

Avec boucle :
  for prenom in ["Alice", "Bob", "Claire"]:
      print("Bonjour", prenom)

Même résultat, code plus court, et si tu ajoutes 10 prénoms à la liste, tu ne changes rien d'autre.`,
    code: `jours = ["Lundi", "Mardi", "Mercredi"]\nfor jour in jours:\n    print("Réunion le", jour)`,
    question: "Combien de lignes va afficher ce code ?",
    options: [
      { id: "a", text: "3 lignes — une par jour dans la liste", correct: true },
      { id: "b", text: "1 ligne — Python s'arrête au premier élément", correct: false },
      { id: "c", text: "4 lignes — il inclut une ligne vide à la fin", correct: false }
    ],
    comprehension: {
      question: "Si on ajoute 'Jeudi' à la liste, que se passe-t-il ?",
      options: [
        { id: "a", text: "La boucle affiche automatiquement 4 lignes sans modifier le reste du code", correct: true },
        { id: "b", text: "Il faut ajouter un print() supplémentaire", correct: false },
        { id: "c", text: "La boucle ignore le nouvel élément", correct: false }
      ],
      explanation: "C'est tout l'intérêt d'une boucle : elle s'adapte à la taille de la liste. Peu importe si la liste a 3 ou 300 éléments, le code reste identique."
    }
  },

  // ── LEÇON 5 — Les fonctions (exemple hospitalier) ─────────────────────────
  {
    id: "logique-5",
    type: "predict",
    title: "Les fonctions — un protocole réutilisable",
    explanation: `Une fonction c'est un bloc de code qu'on nomme pour pouvoir le réutiliser.

Dans un hôpital, un protocole médical c'est pareil : on écrit la procédure une fois, et tous les soignants l'appliquent avec des paramètres différents (patient différent, dosage différent...).

def nom_fonction(paramètre):
    # ce qu'elle fait
    return résultat`,
    code: `def evaluer_douleur(score):\n    if score <= 3:\n        return "Douleur légère"\n    elif score <= 6:\n        return "Douleur modérée"\n    else:\n        return "Douleur intense — intervention requise"\n\nprint(evaluer_douleur(2))\nprint(evaluer_douleur(7))`,
    question: "Que va afficher ce code ?",
    options: [
      { id: "a", text: "Douleur légère\nDouleur intense — intervention requise", correct: true },
      { id: "b", text: "Douleur modérée\nDouleur légère", correct: false },
      { id: "c", text: "2\n7", correct: false }
    ],
    comprehension: {
      question: "Quel est l'avantage d'une fonction ici plutôt que des if/else répétés ?",
      options: [
        { id: "a", text: "La logique d'évaluation est écrite une seule fois et applicable à n'importe quel score", correct: true },
        { id: "b", text: "La fonction s'exécute plus rapidement", correct: false },
        { id: "c", text: "On ne peut pas utiliser elif sans fonction", correct: false }
      ],
      explanation: "Une fonction centralise la logique. Si le protocole change (ex: seuil à 4 au lieu de 3), tu modifies un seul endroit — pas toutes les occurrences du code. C'est le principe DRY : Don't Repeat Yourself."
    }
  },

  // ── LEÇON 6 — Cas pratique combiné ───────────────────────────────────────
  {
    id: "logique-6",
    type: "findError",
    title: "Cas pratique — tout ensemble",
    explanation: `Dans la vraie vie, on combine variables, conditions, boucles et fonctions. Voici un exemple complet qui vérifie une liste de températures de patients.

Lis bien le code avant de répondre — l'erreur est subtile.`,
    code: `patients = [\n    {"nom": "Dupont", "temp": 38.2},\n    {"nom": "Martin", "temp": 36.8},\n    {"nom": "Durand", "temp": 39.1}\n]\n\nfor patient in patients:\n    if patient["temp"] > 38.0:\n        print(patient["nom"], ": fièvre détectée")\n    else\n        print(patient["nom"], ": température normale")`,
    question: "Où est l'erreur dans ce code ?",
    options: [
      { id: "a", text: "Il manque le ':' après le else", correct: true },
      { id: "b", text: "La liste patients est mal formatée", correct: false },
      { id: "c", text: "On ne peut pas comparer des décimaux avec >", correct: false }
    ],
    comprehension: {
      question: "Ce code corrigé afficherait combien de 'fièvre détectée' ?",
      options: [
        { id: "a", text: "2 — Dupont (38.2) et Durand (39.1) dépassent 38.0", correct: true },
        { id: "b", text: "1 — seulement Durand car 39.1 est le plus élevé", correct: false },
        { id: "c", text: "3 — tous les patients", correct: false }
      ],
      explanation: "La boucle parcourt les 3 patients. Pour chacun, elle vérifie si temp > 38.0. Dupont avec 38.2 et Durand avec 39.1 passent le seuil. Martin avec 36.8 non. Résultat : 2 alertes."
    }
  }
];

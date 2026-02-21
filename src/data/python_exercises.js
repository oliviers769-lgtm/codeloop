export const PYTHON_EXERCISES_FULL = [
  {
    id: "python-1",
    type: "predict",
    title: "print() — donner la parole à ton programme",
    explanation: `print() est la commande de base pour afficher quelque chose. C'est ton programme qui "parle".

Tu peux afficher :
  - Du texte entre guillemets : print("Bonjour")
  - Des nombres : print(42)
  - Plusieurs choses à la fois : print("J'ai", 25, "ans")

Python ajoute automatiquement un espace entre les éléments séparés par des virgules.`,
    code: `print("Session du", 15, "mars")\nprint("Durée :", 45, "minutes")`,
    question: "Que va afficher ce code ?",
    options: [
      { id: "a", text: "Session du 15 mars\nDurée : 45 minutes", correct: true },
      { id: "b", text: "Session du15mars\nDurée:45minutes", correct: false },
      { id: "c", text: "\"Session du\" 15 \"mars\"", correct: false }
    ],
    comprehension: {
      question: "Pourquoi le texte doit-il être entre guillemets mais pas les nombres ?",
      options: [
        { id: "a", text: "Les guillemets signalent à Python que c'est du texte brut, pas une variable ou un calcul", correct: true },
        { id: "b", text: "C'est obligatoire uniquement avec print()", correct: false },
        { id: "c", text: "Pour que le texte s'affiche en couleur", correct: false }
      ],
      explanation: "Sans guillemets, Python essaie d'interpréter ce qu'il lit : il cherche une variable, fait un calcul... Avec guillemets, il comprend que c'est du texte à afficher tel quel."
    }
  },
  {
    id: "python-2",
    type: "findError",
    title: "Les variables — stocker pour réutiliser",
    explanation: `Une variable Python se crée en écrivant son nom, le signe = et sa valeur.

Règles importantes :
  - Pas d'espaces dans le nom : "nb patients" ✗ → "nb_patients" ✓
  - Pas de chiffre au début : "1er" ✗ → "premier" ✓
  - Sensible à la casse : "Age" ≠ "age"

Le signe = en Python ne signifie pas "égal" comme en maths — il signifie "je mets cette valeur dans cette boîte".`,
    code: `nb patients = 12\nservice = "Urgences"\nprint(service, ":", nb_patients, "patients")`,
    question: "Ce code contient une erreur. Laquelle ?",
    options: [
      { id: "a", text: "Le nom de variable 'nb patients' contient un espace — illégal en Python", correct: true },
      { id: "b", text: "Il manque des guillemets autour de 12", correct: false },
      { id: "c", text: "On ne peut pas mélanger texte et nombre dans print()", correct: false }
    ],
    comprehension: {
      question: "Pourquoi Python interdit les espaces dans les noms de variables ?",
      options: [
        { id: "a", text: "Un espace indique la fin d'un mot — Python lirait 'nb' et 'patients' comme deux choses séparées", correct: true },
        { id: "b", text: "C'est une convention sans raison technique", correct: false },
        { id: "c", text: "Pour économiser de la mémoire", correct: false }
      ],
      explanation: "Python analyse le code mot par mot. Un espace = séparateur. 'nb patients' serait lu comme 'nb' suivi de 'patients' — deux éléments sans lien. D'où la convention d'utiliser l'underscore : 'nb_patients'."
    }
  },
  {
    id: "python-3",
    type: "predict",
    title: "Les calculs — Python comme calculatrice",
    explanation: `Python fait des calculs comme une calculatrice :
  +  addition
  -  soustraction
  *  multiplication
  /  division
  ** puissance

Exemples :
  prix = 15.50
  quantite = 3
  total = prix * quantite    → 46.5

Les calculs sur des variables se font automatiquement avec leurs valeurs actuelles.`,
    code: `poids_kg = 70\ndose_par_kg = 5\ndose_totale = poids_kg * dose_par_kg\nprint("Dose à administrer :", dose_totale, "mg")`,
    question: "Que va afficher ce code ?",
    options: [
      { id: "a", text: "Dose à administrer : 350 mg", correct: true },
      { id: "b", text: "Dose à administrer : poids_kg * dose_par_kg mg", correct: false },
      { id: "c", text: "Dose à administrer : 70 5 mg", correct: false }
    ],
    comprehension: {
      question: "Si le patient pèse 80 kg, que faut-il changer dans le code ?",
      options: [
        { id: "a", text: "Seulement 'poids_kg = 80' — le calcul et l'affichage s'adaptent automatiquement", correct: true },
        { id: "b", text: "Il faut tout réécrire avec la nouvelle valeur partout", correct: false },
        { id: "c", text: "Il faut changer dose_par_kg aussi", correct: false }
      ],
      explanation: "C'est la puissance des variables : tu changes une valeur en haut, tout le code s'adapte. Pas besoin de chercher et remplacer partout. C'est ça qui rend le code maintenable."
    }
  },
  {
    id: "python-4",
    type: "code",
    lang: "python",
    title: "Écris ton premier programme",
    explanation: "Maintenant c'est ton tour. Tu vas écrire un programme complet qui stocke des informations dans des variables et les affiche.",
    task: "Crée une variable 'service' avec la valeur 'Cardiologie' et une variable 'lits' avec la valeur 24. Affiche exactement : Cardiologie : 24 lits disponibles",
    initialCode: "# Crée tes variables ici\n\n# Affiche le résultat\n",
    expectedOutput: "Cardiologie : 24 lits disponibles",
    comprehension: {
      question: "Pourquoi sépare-t-on les données (variables) de l'affichage (print) ?",
      options: [
        { id: "a", text: "Pour pouvoir changer les données sans toucher à la logique d'affichage", correct: true },
        { id: "b", text: "C'est obligatoire en Python", correct: false },
        { id: "c", text: "Pour que le code s'exécute plus vite", correct: false }
      ],
      explanation: "Séparer données et présentation est un principe fondamental. Si demain le service change, tu modifies une ligne. Si le format d'affichage change, tu modifies l'autre. Les deux évoluent indépendamment."
    }
  },
  {
    id: "python-5",
    type: "predict",
    title: "if/else — prendre des décisions automatiquement",
    explanation: `Une condition if/else permet à ton programme de prendre des décisions seul.

Structure complète :
  if condition:
      # si vrai
  elif autre_condition:
      # si la première est fausse mais celle-ci vraie
  else:
      # dans tous les autres cas

elif = "sinon si" — tu peux en mettre autant que tu veux entre if et else.`,
    code: `imc = 27.3\n\nif imc < 18.5:\n    print("Insuffisance pondérale")\nelif imc < 25:\n    print("Poids normal")\nelif imc < 30:\n    print("Surpoids")\nelse:\n    print("Obésité")`,
    question: "Que va afficher ce code avec imc = 27.3 ?",
    options: [
      { id: "a", text: "Surpoids", correct: true },
      { id: "b", text: "Poids normal", correct: false },
      { id: "c", text: "Obésité", correct: false }
    ],
    comprehension: {
      question: "Python teste-t-il toutes les conditions même quand il en trouve une vraie ?",
      options: [
        { id: "a", text: "Non — dès qu'une condition est vraie, Python exécute son bloc et ignore le reste", correct: true },
        { id: "b", text: "Oui — Python teste toujours toutes les conditions", correct: false },
        { id: "c", text: "Ça dépend du nombre de elif", correct: false }
      ],
      explanation: "Python s'arrête à la première condition vraie. C'est important pour l'ordre : si tu mets 'imc < 30' avant 'imc < 25', un IMC de 22 tomberait dans 'Surpoids' — erreur logique. L'ordre des conditions compte."
    }
  },
  {
    id: "python-6",
    type: "code",
    lang: "python",
    title: "Cas pratique — alerte automatique",
    explanation: "Combine ce que tu as appris : variables, calcul et condition. Tu vas créer un programme qui alerte automatiquement si une dose dépasse un seuil.",
    task: "La dose maximale est 500 mg. Le patient pèse 80 kg, la dose est de 5 mg/kg. Calcule la dose totale et affiche 'Dose OK' si elle est inférieure à 500, sinon affiche 'ALERTE : dose trop élevée'.",
    initialCode: "dose_max = 500\npoids = 80\ndose_par_kg = 5\n\n# Calcule la dose totale\n\n# Vérifie et affiche le résultat\n",
    expectedOutput: "Dose OK",
    comprehension: {
      question: "Si poids = 110 kg, que devrait afficher le programme ?",
      options: [
        { id: "a", text: "ALERTE : dose trop élevée — car 110 × 5 = 550 > 500", correct: true },
        { id: "b", text: "Dose OK — car la dose_par_kg ne change pas", correct: false },
        { id: "c", text: "Une erreur Python", correct: false }
      ],
      explanation: "110 × 5 = 550 mg, qui dépasse la dose maximale de 500 mg. La condition 'dose_totale < dose_max' serait fausse, et Python afficherait l'alerte. C'est exactement ce genre de vérification automatique que Python peut faire à ta place."
    }
  }
];

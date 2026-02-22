export const JS_EXERCISES_FULL = [
  {
    id: "js-1",
    type: "predict",
    title: "JavaScript — le langage du navigateur",
    explanation: `JavaScript (JS) est le seul langage qui s'exécute directement dans le navigateur. Il rend les pages web interactives.

console.log() est l'équivalent de print() en Python.

Différences clés avec Python :
  - Les instructions se terminent par ; (point-virgule)
  - On déclare les variables avec let ou const
  - Les blocs de code sont entre accolades { }`,
    code: `let prenom = "Sophie";\nlet age = 32;\nconsole.log("Bonjour", prenom, "! Tu as", age, "ans.");`,
    question: "Que va afficher ce code ?",
    options: [
      { id: "a", text: "Bonjour Sophie ! Tu as 32 ans.", correct: true },
      { id: "b", text: "Bonjour prenom ! Tu as age ans.", correct: false },
      { id: "c", text: "Sophie 32", correct: false }
    ],
    comprehension: {
      question: "Quelle est la différence entre let et const ?",
      options: [
        { id: "a", text: "let peut être modifié, const est une constante qui ne change jamais", correct: true },
        { id: "b", text: "let est pour les textes, const pour les nombres", correct: false },
        { id: "c", text: "Il n'y a aucune différence pratique", correct: false }
      ],
      explanation: "let = variable modifiable. const = valeur fixe. Exemple : const PI = 3.14 (ne changera jamais). let score = 0 (peut évoluer). Bonne pratique : utiliser const par défaut, let seulement si besoin de modifier."
    }
  },
  {
    id: "js-2",
    type: "findError",
    title: "Les conditions en JavaScript",
    explanation: `La syntaxe des conditions JS est différente de Python :

Python :          JavaScript :
if x > 5:         if (x > 5) {
    print("ok")       console.log("ok");
                  }

Les parenthèses () autour de la condition et les accolades {} autour du bloc sont obligatoires en JS.`,
    code: `let heure = 9;\nif heure < 12 {\n  console.log("Matin");\n} else {\n  console.log("Après-midi");\n}`,
    question: "Ce code contient une erreur. Laquelle ?",
    options: [
      { id: "a", text: "Il manque les parenthèses autour de la condition : if (heure < 12)", correct: true },
      { id: "b", text: "Il manque un point-virgule après 'Matin'", correct: false },
      { id: "c", text: "Le mot 'else' n'existe pas en JavaScript", correct: false }
    ],
    comprehension: {
      question: "Pourquoi JS exige-t-il des parenthèses autour des conditions ?",
      options: [
        { id: "a", text: "C'est la syntaxe héritée du langage C — une convention que JS a conservée", correct: true },
        { id: "b", text: "Pour que le code s'exécute plus vite", correct: false },
        { id: "c", text: "Pour distinguer une condition d'un appel de fonction", correct: false }
      ],
      explanation: "JS est issu de la famille C/Java qui imposait cette syntaxe. Python a fait le choix inverse — plus lisible, sans parenthèses. Même logique, conventions différentes. L'important est de comprendre le principe."
    }
  },
  {
    id: "js-3",
    type: "predict",
    title: "Les fonctions en JavaScript",
    explanation: `Une fonction JS se déclare avec le mot-clé function :

function nomFonction(parametre) {
    return résultat;
}

Ou en version moderne (arrow function) :
const nomFonction = (parametre) => résultat;

Les deux font la même chose — la version moderne est plus concise.`,
    code: `function calculerRemise(prix, pourcentage) {\n  return prix - (prix * pourcentage / 100);\n}\n\nconsole.log(calculerRemise(100, 20));\nconsole.log(calculerRemise(50, 10));`,
    question: "Que va afficher ce code ?",
    options: [
      { id: "a", text: "80\n45", correct: true },
      { id: "b", text: "20\n10", correct: false },
      { id: "c", text: "100\n50", correct: false }
    ],
    comprehension: {
      question: "Que fait le mot-clé return ?",
      options: [
        { id: "a", text: "Il renvoie une valeur depuis la fonction — sans return, la fonction ne produit rien d'utilisable", correct: true },
        { id: "b", text: "Il affiche la valeur dans la console", correct: false },
        { id: "c", text: "Il termine le programme", correct: false }
      ],
      explanation: "return envoie une valeur à celui qui a appelé la fonction. Sans return, la fonction fait son travail mais ne partage pas le résultat. C'est comme calculer mentalement sans écrire la réponse."
    }
  },
  {
    id: "js-4",
    type: "predict",
    title: "Les tableaux — listes en JavaScript",
    explanation: `En JS, une liste s'appelle un tableau (Array) :

let fruits = ["pomme", "banane", "orange"];

Opérations courantes :
  fruits.length      → nombre d'éléments (3)
  fruits[0]          → premier élément ("pomme")
  fruits.push("kiwi")→ ajouter à la fin
  fruits.includes("banane") → vérifier si présent (true/false)`,
    code: `let services = ["Urgences", "Cardiologie", "Pédiatrie"];\nconsole.log("Nombre de services :", services.length);\nconsole.log("Premier service :", services[0]);`,
    question: "Que va afficher ce code ?",
    options: [
      { id: "a", text: "Nombre de services : 3\nPremier service : Urgences", correct: true },
      { id: "b", text: "Nombre de services : 3\nPremier service : Pédiatrie", correct: false },
      { id: "c", text: "Nombre de services : 1\nPremier service : Urgences", correct: false }
    ],
    comprehension: {
      question: "Pourquoi services[0] donne 'Urgences' et pas services[1] ?",
      options: [
        { id: "a", text: "En JS (comme Python), les tableaux commencent à l'index 0 — le premier élément est toujours [0]", correct: true },
        { id: "b", text: "Parce que Urgences est le plus important", correct: false },
        { id: "c", text: "C'est spécifique à JavaScript", correct: false }
      ],
      explanation: "L'indexation à 0 est universelle en informatique. C'est une convention héritée de l'architecture des ordinateurs. Tous les langages modernes (Python, JS, Java, C...) commencent à 0."
    }
  },
  {
    id: "js-5",
    type: "findError",
    title: "Manipuler le DOM — rendre la page interactive",
    explanation: `Le vrai pouvoir de JS : modifier une page HTML en direct.

document.getElementById("monId")  → sélectionne un élément HTML
element.textContent = "nouveau"   → change son texte
element.style.color = "red"       → change son style

Le DOM (Document Object Model) c'est la représentation de la page HTML que JS peut lire et modifier.`,
    code: `let bouton = document.getElementById("monBouton");\nbouton.textContent = "Cliquez ici";\nbouton.style.backgroundColor = "orange";\nconsole.log("Bouton configuré !")`,
    question: "Ce code manque quelque chose à la fin. Quoi ?",
    options: [
      { id: "a", text: "Un point-virgule après console.log(\"Bouton configuré !\")", correct: true },
      { id: "b", text: "Des guillemets autour de orange", correct: false },
      { id: "c", text: "Le mot-clé let devant bouton.textContent", correct: false }
    ],
    comprehension: {
      question: "JS est-il obligatoire pour avoir un site web ?",
      options: [
        { id: "a", text: "Non — HTML et CSS suffisent pour un site statique. JS ajoute l'interactivité.", correct: true },
        { id: "b", text: "Oui — sans JS, un navigateur ne peut rien afficher", correct: false },
        { id: "c", text: "Ça dépend du navigateur utilisé", correct: false }
      ],
      explanation: "HTML = structure. CSS = style. JS = comportement. Tu peux avoir les deux premiers sans JS. Mais dès que tu veux un menu qui s'ouvre, un formulaire qui valide, une carte interactive — tu as besoin de JS."
    }
  },
  {
    id: "js-6",
    type: "predict",
    title: "Cas pratique — traiter une liste de données",
    explanation: `La méthode forEach() permet de parcourir un tableau et faire une action pour chaque élément — l'équivalent de for...in en Python.

tableau.forEach(element => {
    // action pour chaque element
});

C'est la façon moderne et concise d'écrire une boucle en JS.`,
    code: `let temperatures = [36.5, 38.2, 37.1, 39.0];\nlet alertes = 0;\n\ntemperatures.forEach(temp => {\n  if (temp > 37.5) alertes++;\n});\n\nconsole.log("Alertes fièvre :", alertes);`,
    question: "Que va afficher ce code ?",
    options: [
      { id: "a", text: "Alertes fièvre : 2", correct: true },
      { id: "b", text: "Alertes fièvre : 4", correct: false },
      { id: "c", text: "Alertes fièvre : 1", correct: false }
    ],
    comprehension: {
      question: "Que signifie alertes++ ?",
      options: [
        { id: "a", text: "C'est un raccourci pour alertes = alertes + 1 — on incrémente de 1", correct: true },
        { id: "b", text: "C'est une comparaison — alertes est-il positif ?", correct: false },
        { id: "c", text: "C'est spécifique à forEach", correct: false }
      ],
      explanation: "++ est l'opérateur d'incrémentation. alertes++ ajoute 1 à alertes. C'est exactement comme alertes = alertes + 1 mais plus court. Très utilisé dans les boucles pour compter."
    }
  }
];

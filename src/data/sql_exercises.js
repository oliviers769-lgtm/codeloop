export const SQL_EXERCISES_FULL = [
  {
    id: "sql-1",
    type: "predict",
    title: "SQL — parler aux bases de données",
    explanation: `SQL (Structured Query Language) est le langage pour interroger des bases de données.

Une base de données c'est comme un classeur Excel avec plusieurs feuilles (tables). Chaque ligne est un enregistrement, chaque colonne est un champ.

La requête de base :
  SELECT quoi FROM quelle_table;

SELECT * = "donne-moi toutes les colonnes"
SELECT nom, age = "donne-moi seulement ces colonnes"`,
    code: `SELECT * FROM employes;`,
    question: "Que fait cette requête ?",
    options: [
      { id: "a", text: "Elle récupère toutes les lignes et colonnes de la table employes", correct: true },
      { id: "b", text: "Elle crée une nouvelle table employes", correct: false },
      { id: "c", text: "Elle supprime tous les employés", correct: false }
    ],
    comprehension: {
      question: "Que signifie le * dans SELECT * ?",
      options: [
        { id: "a", text: "Toutes les colonnes — c'est un joker universel pour 'je veux tout'", correct: true },
        { id: "b", text: "La première colonne uniquement", correct: false },
        { id: "c", text: "Une multiplication", correct: false }
      ],
      explanation: "L'étoile * est le joker SQL. Elle évite de lister toutes les colonnes une par une. Pratique pour explorer, mais en production on préfère lister explicitement les colonnes pour la clarté et la performance."
    }
  },
  {
    id: "sql-2",
    type: "predict",
    title: "SELECT — choisir ses colonnes",
    explanation: `On peut sélectionner uniquement certaines colonnes :

SELECT nom, prenom, service FROM personnel;

Cela retourne une table avec seulement ces 3 colonnes — même si la table en contient 20.

C'est utile pour :
  - Ne pas afficher des infos confidentielles
  - Alléger les résultats
  - Clarifier ce qu'on cherche`,
    code: `SELECT nom, service, telephone\nFROM personnel\nWHERE service = 'Cardiologie';`,
    question: "Combien de colonnes va retourner cette requête ?",
    options: [
      { id: "a", text: "3 colonnes — nom, service, telephone", correct: true },
      { id: "b", text: "Toutes les colonnes de la table personnel", correct: false },
      { id: "c", text: "1 colonne — seulement ceux en Cardiologie", correct: false }
    ],
    comprehension: {
      question: "Pourquoi ne pas toujours utiliser SELECT * ?",
      options: [
        { id: "a", text: "Récupérer des colonnes inutiles ralentit la requête et peut exposer des données sensibles", correct: true },
        { id: "b", text: "SELECT * est interdit dans les bases modernes", correct: false },
        { id: "c", text: "* ne fonctionne qu'avec des petites tables", correct: false }
      ],
      explanation: "Sélectionner uniquement les colonnes nécessaires est une bonne pratique — plus rapide, plus sécurisé. Si une table a un champ 'mot_de_passe', un SELECT * l'exposerait inutilement."
    }
  },
  {
    id: "sql-3",
    type: "findError",
    title: "WHERE — filtrer les résultats",
    explanation: `WHERE permet de filtrer — comme un if en Python.

SELECT * FROM patients WHERE age > 65;
→ seulement les patients de plus de 65 ans

Opérateurs de comparaison :
  =    égal à
  >    supérieur à
  <    inférieur à
  >=   supérieur ou égal
  !=   différent de
  LIKE 'Dur%'   → commence par "Dur"`,
    code: `SELECT nom, age FROM patients\nWHERE age > 65\nORDER age DESC;`,
    question: "Ce code contient une erreur. Laquelle ?",
    options: [
      { id: "a", text: "Il manque le mot-clé BY : ORDER BY age DESC", correct: true },
      { id: "b", text: "On ne peut pas combiner WHERE et ORDER", correct: false },
      { id: "c", text: "DESC devrait être ASC", correct: false }
    ],
    comprehension: {
      question: "Que fait ORDER BY age DESC ?",
      options: [
        { id: "a", text: "Trie les résultats du plus âgé au plus jeune", correct: true },
        { id: "b", text: "Supprime les patients dans l'ordre décroissant", correct: false },
        { id: "c", text: "Filtre seulement les patients décédés", correct: false }
      ],
      explanation: "ORDER BY trie les résultats. ASC = ascending (croissant, du plus petit). DESC = descending (décroissant, du plus grand). ORDER BY age DESC affiche les patients les plus âgés en premier."
    }
  },
  {
    id: "sql-4",
    type: "predict",
    title: "COUNT et GROUP BY — compter et regrouper",
    explanation: `SQL peut faire des calculs sur les données :

COUNT(*) → compte le nombre de lignes
SUM(colonne) → additionne
AVG(colonne) → fait la moyenne
MAX/MIN → valeur max ou min

GROUP BY regroupe les résultats par une valeur :

SELECT service, COUNT(*) FROM patients GROUP BY service;
→ nombre de patients par service`,
    code: `SELECT service, COUNT(*) as nb_patients\nFROM patients\nGROUP BY service\nORDER BY nb_patients DESC;`,
    question: "Que retourne cette requête ?",
    options: [
      { id: "a", text: "Le nombre de patients dans chaque service, du plus chargé au moins chargé", correct: true },
      { id: "b", text: "La liste de tous les patients triés par service", correct: false },
      { id: "c", text: "Le service avec le plus de patients uniquement", correct: false }
    ],
    comprehension: {
      question: "À quoi sert le mot 'as nb_patients' ?",
      options: [
        { id: "a", text: "Il renomme la colonne COUNT(*) pour l'afficher avec un nom lisible", correct: true },
        { id: "b", text: "Il crée une nouvelle variable dans la base", correct: false },
        { id: "c", text: "Il filtre seulement les patients nommés nb_patients", correct: false }
      ],
      explanation: "AS est un alias — un surnom pour la colonne. Sans alias, la colonne s'afficherait 'COUNT(*)' ce qui n'est pas lisible. Avec AS nb_patients, c'est clair pour n'importe qui qui lit les résultats."
    }
  },
  {
    id: "sql-5",
    type: "predict",
    title: "JOIN — croiser plusieurs tables",
    explanation: `Les JOIN permettent de croiser des données de plusieurs tables.

Table patients : id, nom, medecin_id
Table medecins : id, nom, specialite

JOIN relie les deux via l'identifiant commun :

SELECT patients.nom, medecins.nom
FROM patients
JOIN medecins ON patients.medecin_id = medecins.id;`,
    code: `SELECT p.nom as patient, m.nom as medecin\nFROM patients p\nJOIN medecins m ON p.medecin_id = m.id\nWHERE m.specialite = 'Cardiologie';`,
    question: "Que retourne cette requête ?",
    options: [
      { id: "a", text: "Le nom des patients et de leur médecin, pour les patients en Cardiologie", correct: true },
      { id: "b", text: "Tous les médecins cardiologues", correct: false },
      { id: "c", text: "Les patients sans médecin assigné", correct: false }
    ],
    comprehension: {
      question: "Pourquoi les données sont-elles séparées en plusieurs tables ?",
      options: [
        { id: "a", text: "Pour éviter les répétitions — le nom du médecin est écrit une fois, pas pour chaque patient", correct: true },
        { id: "b", text: "Pour compliquer l'accès aux données sensibles", correct: false },
        { id: "c", text: "Les bases de données ne peuvent stocker qu'un type de données par table", correct: false }
      ],
      explanation: "C'est le principe de normalisation. Si un médecin change de nom, on le modifie une seule fois dans la table medecins — et tous les patients voient automatiquement le changement. Sans séparation, il faudrait mettre à jour chaque ligne patient."
    }
  },
  {
    id: "sql-6",
    type: "findError",
    title: "Cas pratique — requête hospitalière complète",
    explanation: `Une requête SQL complète peut combiner plusieurs clauses :

SELECT colonnes
FROM table
JOIN autre_table ON condition
WHERE filtre
GROUP BY regroupement
ORDER BY tri
LIMIT nombre_max;

L'ordre des clauses est fixe en SQL — on ne peut pas les inverser.`,
    code: `SELECT service, AVG(age) as age_moyen\nFROM patients\nWHERE statut = 'hospitalise'\nGROUP BY service\nHAVING age_moyen > 60\nORDER BY age_moyen;`,
    question: "Cette requête est correcte. Que fait-elle ?",
    options: [
      { id: "a", text: "Elle affiche l'âge moyen par service, seulement pour les services dont la moyenne dépasse 60 ans, parmi les patients hospitalisés", correct: true },
      { id: "b", text: "Elle liste tous les patients de plus de 60 ans hospitalisés", correct: false },
      { id: "c", text: "Elle supprime les services dont l'âge moyen est inférieur à 60", correct: false }
    ],
    comprehension: {
      question: "Quelle est la différence entre WHERE et HAVING ?",
      options: [
        { id: "a", text: "WHERE filtre les lignes individuelles AVANT le groupement. HAVING filtre les groupes APRÈS le GROUP BY", correct: true },
        { id: "b", text: "HAVING est une version plus moderne de WHERE", correct: false },
        { id: "c", text: "WHERE filtre les colonnes, HAVING filtre les lignes", correct: false }
      ],
      explanation: "WHERE s'applique sur les données brutes avant regroupement. HAVING s'applique sur les résultats agrégés après GROUP BY. On ne peut pas utiliser WHERE pour filtrer sur AVG() — c'est pour ça que HAVING existe."
    }
  }
];

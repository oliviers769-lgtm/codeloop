# Guide de déploiement CodeLoop
## De zéro à en ligne — étape par étape

---

## PARTIE 1 — Mettre le projet sur GitHub

### Étape 1.1 — Installer Git (si pas déjà fait)
Télécharge Git sur https://git-scm.com/downloads et installe-le.

### Étape 1.2 — Créer un nouveau repository GitHub
1. Va sur https://github.com
2. Clique sur le bouton vert **"New"** (ou le "+" en haut à droite)
3. Nom du repo : **codeloop**
4. Laisse tout le reste par défaut
5. Clique **"Create repository"**
6. GitHub affiche une page avec des instructions — **garde cette page ouverte**

### Étape 1.3 — Envoyer le code sur GitHub
Ouvre un terminal (CMD sur Windows, Terminal sur Mac) dans le dossier `codeloop`, puis tape ces commandes une par une :

```bash
git init
git add .
git commit -m "CodeLoop MVP v1 - Étapes 1+2+3"
git branch -M main
git remote add origin https://github.com/TON_USERNAME/codeloop.git
git push -u origin main
```

⚠️ Remplace **TON_USERNAME** par ton vrai nom d'utilisateur GitHub.

---

## PARTIE 2 — Créer la base de données Supabase

### Étape 2.1 — Créer un compte Supabase
1. Va sur https://supabase.com
2. Clique **"Start your project"**
3. Connecte-toi avec GitHub (plus simple)

### Étape 2.2 — Créer un nouveau projet
1. Clique **"New project"**
2. Nom : **codeloop**
3. Mot de passe base de données : génère-en un fort et **note-le quelque part**
4. Région : **West EU (Ireland)** (ou la plus proche de toi)
5. Clique **"Create new project"** — attends ~2 minutes

### Étape 2.3 — Créer les tables
Une fois le projet créé :
1. Dans le menu gauche, clique sur **"SQL Editor"**
2. Clique **"New query"**
3. Copie-colle tout le code SQL ci-dessous, puis clique **"Run"** :

```sql
-- Table utilisateurs
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table progression principale
CREATE TABLE user_progress (
  user_id TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  completed_exercises TEXT[] DEFAULT '{}',
  comprehension_markers JSONB DEFAULT '[]',
  sessions INTEGER DEFAULT 0,
  objective TEXT,
  level TEXT,
  current_module TEXT,
  onboarding_done BOOLEAN DEFAULT FALSE,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table exercices complétés (détail)
CREATE TABLE user_exercises (
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  exercise_id TEXT NOT NULL,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  comprehension_marker TEXT,
  PRIMARY KEY (user_id, exercise_id)
);

-- Table sessions
CREATE TABLE user_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT REFERENCES users(id) ON DELETE CASCADE,
  module_id TEXT,
  started_at TIMESTAMPTZ DEFAULT NOW()
);

-- Permissions (accès anonyme sécurisé)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_own_data" ON users
  FOR ALL USING (auth.uid()::text = id OR id LIKE 'local_%');

CREATE POLICY "progress_own_data" ON user_progress
  FOR ALL USING (auth.uid()::text = user_id OR user_id LIKE 'local_%');

CREATE POLICY "exercises_own_data" ON user_exercises
  FOR ALL USING (auth.uid()::text = user_id OR user_id LIKE 'local_%');

CREATE POLICY "sessions_own_data" ON user_sessions
  FOR ALL USING (auth.uid()::text = user_id OR user_id LIKE 'local_%');
```

### Étape 2.4 — Récupérer tes clés API Supabase
1. Dans le menu gauche, clique **"Project Settings"** (icône engrenage)
2. Clique **"API"**
3. Note ces deux valeurs :
   - **Project URL** → ressemble à `https://xxxxxxxxxxxxxx.supabase.co`
   - **anon / public key** → longue chaîne commençant par `eyJ...`

---

## PARTIE 3 — Déployer sur Vercel

### Étape 3.1 — Créer un compte Vercel
1. Va sur https://vercel.com
2. Clique **"Sign Up"**
3. Choisis **"Continue with GitHub"** — c'est le plus simple

### Étape 3.2 — Importer le projet
1. Sur le dashboard Vercel, clique **"Add New… → Project"**
2. Tu vois la liste de tes repos GitHub — clique **"Import"** à côté de **codeloop**
3. Framework Preset : Vercel détecte **Create React App** automatiquement
4. **Ne clique pas encore sur Deploy**

### Étape 3.3 — Ajouter les variables d'environnement
Avant de déployer, clique sur **"Environment Variables"** et ajoute ces deux variables :

| Name | Value |
|------|-------|
| `REACT_APP_SUPABASE_URL` | Ton Project URL Supabase |
| `REACT_APP_SUPABASE_ANON_KEY` | Ta anon key Supabase |

### Étape 3.4 — Déployer
1. Clique **"Deploy"**
2. Attends ~2 minutes
3. Vercel te donne une URL du type **codeloop-xxx.vercel.app**

🎉 **CodeLoop est en ligne.**

---

## PARTIE 4 — Configurer l'auth Supabase (magic link)

### Étape 4.1 — Ajouter ton domaine Vercel à Supabase
1. Dans Supabase → **Authentication → URL Configuration**
2. **Site URL** : mets ton URL Vercel (`https://codeloop-xxx.vercel.app`)
3. **Redirect URLs** : ajoute la même URL
4. Clique **Save**

### Étape 4.2 — Tester le magic link
1. Va sur ton site Vercel
2. Complète un exercice
3. Clique "Sauvegarder" dans le header
4. Entre ton email
5. Vérifie ta boîte mail — tu dois recevoir un lien
6. Clique le lien → tu es connecté, progression sauvegardée

---

## PARTIE 5 — Domaine personnalisé (optionnel)

Si tu achètes un domaine (ex: codeloop.fr) :
1. Dans Vercel → ton projet → **Settings → Domains**
2. Ajoute ton domaine
3. Vercel te donne les DNS à configurer chez ton registrar
4. Mets à jour le Site URL dans Supabase avec le nouveau domaine

---

## Résumé des coûts

| Service | Plan | Coût |
|---------|------|------|
| Vercel | Hobby (gratuit) | 0€/mois |
| Supabase | Free tier | 0€/mois |
| Domaine | (optionnel) | ~10€/an |
| **TOTAL** | | **0€/mois** |

Les limites du free tier sont largement suffisantes pour un MVP :
- Vercel : 100 GB bandwidth/mois
- Supabase : 500 MB base de données, 50 000 utilisateurs actifs/mois

---

## En cas de problème

**"Module not found" au démarrage local**
→ Lance `npm install` depuis le dossier codeloop

**"Invalid API key" Supabase**
→ Vérifie que les variables d'environnement dans Vercel correspondent exactement à celles de Supabase

**Le magic link ne fonctionne pas**
→ Vérifie que le Site URL dans Supabase correspond exactement à ton URL Vercel (avec https://)

**La progression ne se synchronise pas**
→ Si Supabase n'est pas configuré, l'app fonctionne en mode local (localStorage) — c'est normal et prévu.

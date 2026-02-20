import React, { useState } from 'react';
import './styles/global.css';
import { useAuth } from './hooks/useAuth';
import { useProgress } from './hooks/useProgress';
import { isSupabaseEnabled } from './lib/supabase';
import AuthModal from './components/AuthModal';
import Onboarding from './pages/Onboarding';
import Home from './pages/Home';
import Module from './pages/Module';
import Exercise from './pages/Exercise';
import ExerciseLive from './pages/ExerciseLive';

export default function App() {
  const { user, authStatus, email, setEmail, authView, setAuthView, sendMagicLink, signOut, isAuthenticated } = useAuth();
  const { progress, update, completeExercise } = useProgress(user?.id);

  const [view, setView] = useState(() =>
    progress.onboardingDone ? 'home' : 'onboarding'
  );
  const [currentModule, setCurrentModule] = useState(null);
  const [currentExercise, setCurrentExercise] = useState(null);
  const [showAuth, setShowAuth] = useState(false);

  const navigate = (target, data) => {
    if (target === 'home')          { setView('home'); }
    else if (target === 'module')   { setCurrentModule(data); setView('module'); }
    else if (target === 'exercise') { setCurrentExercise(data); setView('exercise'); }
    else if (target === 'exerciseLive') { setCurrentExercise(data); setView('exerciseLive'); }
  };

  const handleSendMagicLink = async (emailAddr) => {
    const { error } = await sendMagicLink(emailAddr);
    if (!error) setAuthView('sent');
  };

  // Auth interstitiel — propose après le 1er exercice complété
  const handleExerciseComplete = (exerciseId, marker) => {
    completeExercise(exerciseId, marker);
    if (isSupabaseEnabled && !isAuthenticated && (progress.completedExercises?.length || 0) === 0) {
      setTimeout(() => setShowAuth(true), 1800);
    }
  };

  if (authStatus === 'loading') {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        justifyContent: 'center', background: '#F3F4F6',
      }}>
        <div style={{ color: '#9CA3AF', fontSize: 14 }}>Chargement…</div>
      </div>
    );
  }

  return (
    <>
      {showAuth && (
        <AuthModal
          email={email}
          setEmail={setEmail}
          onSend={handleSendMagicLink}
          onClose={() => setShowAuth(false)}
          view={authView}
        />
      )}

      {view === 'onboarding' && (
        <Onboarding onComplete={() => setView('home')} update={update} />
      )}
      {view === 'home' && (
        <Home
          progress={progress}
          onNavigate={navigate}
          isAuthenticated={isAuthenticated}
          onShowAuth={() => { setAuthView('idle'); setShowAuth(true); }}
          onSignOut={signOut}
          supabaseEnabled={isSupabaseEnabled}
        />
      )}
      {view === 'module' && (
        <Module
          moduleId={currentModule}
          progress={progress}
          onNavigate={navigate}
          onBack={() => setView('home')}
        />
      )}
      {view === 'exercise' && (
        <Exercise
          exercise={currentExercise}
          onComplete={handleExerciseComplete}
          onBack={() => setView('module')}
        />
      )}
      {view === 'exerciseLive' && (
        <ExerciseLive
          exercise={currentExercise}
          onComplete={handleExerciseComplete}
          onBack={() => setView('module')}
        />
      )}
    </>
  );
}

import { useState, useCallback, useEffect } from 'react';
import { loadProgressFromDB, saveProgressToDB, recordExerciseComplete } from '../lib/db';
import { isSupabaseEnabled } from '../lib/supabase';

const STORAGE_KEY = 'codeloop_progress';

function loadLocal() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : defaultProgress();
  } catch { return defaultProgress(); }
}

function defaultProgress() {
  return {
    completedExercises: [],
    comprehensionMarkers: [],
    currentModule: null,
    onboardingDone: false,
    objective: null,
    level: null,
    sessions: 0,
  };
}

function saveLocal(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function useProgress(userId) {
  const [progress, setProgress] = useState(loadLocal);
  const [synced, setSynced] = useState(false);

  // Chargement depuis Supabase si dispo
  useEffect(() => {
    if (!userId || !isSupabaseEnabled || synced) return;
    loadProgressFromDB(userId).then(dbData => {
      if (dbData) {
        const merged = {
          completedExercises: dbData.completed_exercises || [],
          comprehensionMarkers: dbData.comprehension_markers || [],
          sessions: dbData.sessions || 0,
          objective: dbData.objective,
          level: dbData.level,
          currentModule: dbData.current_module,
          onboardingDone: dbData.onboarding_done || false,
        };
        setProgress(merged);
        saveLocal(merged);
      }
      setSynced(true);
    });
  }, [userId, synced]);

  const update = useCallback((updates) => {
    setProgress(prev => {
      const next = { ...prev, ...updates };
      saveLocal(next);
      if (userId && isSupabaseEnabled) saveProgressToDB(userId, next);
      return next;
    });
  }, [userId]);

  const completeExercise = useCallback((exerciseId, marker) => {
    setProgress(prev => {
      const next = {
        ...prev,
        completedExercises: [...new Set([...prev.completedExercises, exerciseId])],
        comprehensionMarkers: marker
          ? [...prev.comprehensionMarkers, { text: marker, date: new Date().toISOString() }]
          : prev.comprehensionMarkers,
        sessions: (prev.sessions || 0) + 1,
      };
      saveLocal(next);
      if (userId && isSupabaseEnabled) {
        saveProgressToDB(userId, next);
        recordExerciseComplete(userId, exerciseId, marker);
      }
      return next;
    });
  }, [userId]);

  const resetProgress = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setProgress(defaultProgress());
    setSynced(false);
  }, []);

  return { progress, update, completeExercise, resetProgress, synced };
}

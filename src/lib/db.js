import { supabase, isSupabaseEnabled } from './supabase';

// ── UTILISATEURS ──────────────────────────────────────────────────────────────

export async function getOrCreateUser(userId) {
  if (!isSupabaseEnabled) return null;
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();
  if (error && error.code === 'PGRST116') {
    // Utilisateur inexistant — on le crée
    const { data: newUser } = await supabase
      .from('users')
      .insert({ id: userId, created_at: new Date().toISOString() })
      .select()
      .single();
    return newUser;
  }
  return data;
}

// ── PROGRESSION ───────────────────────────────────────────────────────────────

export async function loadProgressFromDB(userId) {
  if (!isSupabaseEnabled) return null;
  const { data, error } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId)
    .single();
  if (error) return null;
  return data;
}

export async function saveProgressToDB(userId, progress) {
  if (!isSupabaseEnabled) return;
  await supabase
    .from('user_progress')
    .upsert({
      user_id: userId,
      completed_exercises: progress.completedExercises || [],
      comprehension_markers: progress.comprehensionMarkers || [],
      sessions: progress.sessions || 0,
      objective: progress.objective || null,
      level: progress.level || null,
      current_module: progress.currentModule || null,
      onboarding_done: progress.onboardingDone || false,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id' });
}

// ── EXERCICES COMPLÉTÉS ───────────────────────────────────────────────────────

export async function recordExerciseComplete(userId, exerciseId, marker) {
  if (!isSupabaseEnabled) return;
  await supabase
    .from('user_exercises')
    .upsert({
      user_id: userId,
      exercise_id: exerciseId,
      completed_at: new Date().toISOString(),
      comprehension_marker: marker || null,
    }, { onConflict: 'user_id,exercise_id' });
}

// ── SESSIONS ──────────────────────────────────────────────────────────────────

export async function recordSession(userId, moduleId) {
  if (!isSupabaseEnabled) return;
  await supabase
    .from('user_sessions')
    .insert({
      user_id: userId,
      module_id: moduleId,
      started_at: new Date().toISOString(),
    });
}

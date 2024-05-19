import { supabase } from '@lib/supabase';

import { EXERCISE_TABLE_NAME } from '@lib/constants';

export async function loadExercises() {
  try {
    const { data } = await supabase.from(EXERCISE_TABLE_NAME).select(`*`);

    return { success: true, data };
  } catch (error) {
    console.error('Unable to load exercises', error);
  }

  return { success: false, data: [] };
}

export async function updateExercise(exercise) {
  try {
    const { data } = await supabase
      .from(EXERCISE_TABLE_NAME)
      .update({ ...exercise })
      .eq('id', exercise.id)
      .select();

    return { success: true, data };
  } catch (error) {
    console.error('Unable to update exercise', error);
  }

  return { success: false, data: {} };
}

export async function insertExercise(exercise) {
  try {
    const { data } = await supabase
      .from(EXERCISE_TABLE_NAME)
      .insert({ ...exercise })
      .select();

    return { success: true, data: data[0] };
  } catch (error) {
    console.error('Unable to insert exercise', error);
  }

  return { success: false, data: {} };
}

export async function deleteExercise(id) {
  try {
    await supabase.from(EXERCISE_TABLE_NAME).delete().eq('id', id);

    return { success: true };
  } catch (error) {
    console.error('Unable to delete exercise', error);
  }

  return { success: false };
}

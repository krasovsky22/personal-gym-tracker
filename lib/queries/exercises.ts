import { supabase } from '@lib/supabase';
import { QueryResultType } from './types';
import { Database } from '../database.types';

export const EXERCISE_TABLE_NAME = 'exercise';

export type ExerciseRowType = Database['public']['Tables']['exercise']['Row'];
export type ExerciseInsertRowType =
  Database['public']['Tables']['exercise']['Insert'];

export async function loadExercises(): QueryResultType<ExerciseRowType[]> {
  try {
    const { data, error } = await supabase
      .from(EXERCISE_TABLE_NAME)
      .select(`*`)
      .returns<ExerciseRowType[]>();

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error('Unable to load exercises', error);
  }

  return { success: false, data: [] };
}

// export async function updateExercise(
//   exercise: ExerciseUpdateRowType
// ): QueryResultType<ExerciseRowType[]> {
//   try {
//     const { data, error } = await supabase
//       .from(EXERCISE_TABLE_NAME)
//       .update({ ...exercise })
//       .eq('id', exercise.id!)
//       .select()
//       .single();

//     if (error) throw error;
//     return { success: true, data };
//   } catch (error) {
//     console.error('Unable to update exercise', error);
//   }

//   return { success: false, data: {} };
// }

export async function insertExercise(
  exercise: ExerciseInsertRowType
): QueryResultType<ExerciseRowType> {
  try {
    const { data, error } = await supabase
      .from(EXERCISE_TABLE_NAME)
      .upsert([exercise], { onConflict: 'id', defaultToNull: false })
      .select()
      .single<ExerciseRowType>();

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error('Unable to insert exercise', error);
  }

  return { success: false };
}

export async function deleteExercise(
  id: number
): QueryResultType<ExerciseRowType> {
  try {
    await supabase.from(EXERCISE_TABLE_NAME).delete().eq('id', id);

    return { success: true };
  } catch (error) {
    console.error('Unable to delete exercise', error);
  }

  return { success: false };
}

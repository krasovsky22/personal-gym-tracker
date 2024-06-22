import { supabase } from '@lib/supabase';
import { QueryResultType } from './types';
import { Database } from '../database.types';
import { Tables, TablesInsert, TablesUpdate } from '../database.types';

import { WorkoutSnapshotOutType } from '@models/Workout';

const WORKOUT_TABLE = 'workout';
const WORKOUT_EXERCISE_TABLE = 'workout_exercise';

export type WorkoutRowType = Tables<'workout'>;
export type WorkoutRowInsertType = TablesInsert<'workout'>;

export type WorkoutExerciseRowType = Tables<'workout_exercise'>;
export type WorkoutExerciseRowInsertType = TablesInsert<'workout_exercise'>;
export type WorkoutExerciseRowUpdateType = TablesUpdate<'workout_exercise'>;

export async function insertWorkout(
  workout: WorkoutRowInsertType
): QueryResultType<WorkoutRowType> {
  try {
    const { data, error } = await supabase
      .from(WORKOUT_TABLE)
      .upsert([workout], { onConflict: 'id', defaultToNull: false })
      .select()
      .single<WorkoutRowType>();

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error('Unable to update workout', error);
  }

  return { success: false };
}

export async function insertWorkoutExercises(
  workoutExercises: WorkoutExerciseRowInsertType[]
): QueryResultType<WorkoutExerciseRowType[]> {
  try {
    const { data, error } = await supabase
      .from(WORKOUT_EXERCISE_TABLE)
      .upsert(workoutExercises, { onConflict: 'id', defaultToNull: false })
      .select()
      .returns<WorkoutExerciseRowType[]>();

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error('Unable to update/insert workout exercises', error);
  }

  return { success: false };
}

export async function removeWorkoutExercises(ids: string[]) {
  try {
    const { error } = await supabase
      .from(WORKOUT_EXERCISE_TABLE)
      .delete()
      .in('id', ids);

    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error('Unable to delete workout exercises', error);
  }

  return { success: false };
}

// export async function createWorkout({ name, exercises }) {
//   try {
//     const workout = {
//       name,
//     };

//     const { data: workoutSelect } = await supabase
//       .from(WORKOUT_TABLE)
//       .insert({ ...workout })
//       .select();

//     const insertedWorkout = workoutSelect[0];
//     const exercisesData = exercises.map((exercise, index) => ({
//       order: index,
//       sets_count: exercise.setsCount,
//       exercise_id: exercise.exercise,
//       workout_id: insertedWorkout.id,
//     }));

//     const { data: exercisesSelect } = await supabase
//       .from(WORKOUT_EXERCISE_TABLE)
//       .insert(exercisesData)
//       .select();

//     return {
//       success: true,
//       data: { workout: { ...insertedWorkout, exercises: exercisesSelect } },
//     };
//   } catch (error) {
//     console.error('Unable to insert exercise', error);
//   }

//   return { success: false, data: {} };
// }

export async function fetchWorkouts() {
  try {
    const query = supabase
      .from(WORKOUT_EXERCISE_TABLE)
      .select(
        `id, order, sets_count, exercise_id, created_at, workout (id , name, created_at )`
      );

    const { data, error } = await query;

    if (error) throw error;

    const workouts = data.reduce<{ [id: string]: WorkoutSnapshotOutType }>(
      (carry, workoutExercise) => {
        const { workout, ...workoutExerciseData } = workoutExercise;
        const { id } = workout!;

        carry[id] ??= {
          ...workout!,
          workoutExercises: [],
        };

        carry[id]?.workoutExercises?.push({
          ...workoutExerciseData,
          exercise: workoutExerciseData.exercise_id,
        });

        return carry;
      },
      {}
    );

    return Object.values(workouts);
  } catch (error) {
    console.log('Unable to load workouts: ', error);
  }

  return [];
}

export async function deleteWorkout(id: string): QueryResultType<{}> {
  try {
    const { error } = await supabase.from(WORKOUT_TABLE).delete().eq('id', id);

    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error('Unable to delete workout', error);
  }

  return { success: false };
}

import { supabase } from '@lib/supabase';

const WORKOUT_TABLE = 'workout';
const WORKOUT_EXERCISE_TABLE = 'workout_exercise';

export async function createWorkout({ name, exercises }) {
  try {
    const workout = {
      name,
    };

    const { data: workoutSelect } = await supabase
      .from(WORKOUT_TABLE)
      .insert({ ...workout })
      .select();

    const insertedWorkout = workoutSelect[0];
    const exercisesData = exercises.map((exercise, index) => ({
      order: index,
      sets_count: exercise.setsCount,
      exercise_id: exercise.exercise,
      workout_id: insertedWorkout.id,
    }));

    const { data: exercisesSelect } = await supabase
      .from(WORKOUT_EXERCISE_TABLE)
      .insert(exercisesData)
      .select();

    return {
      success: true,
      data: { workout: { ...insertedWorkout, exercises: exercisesSelect } },
    };
  } catch (error) {
    console.error('Unable to insert exercise', error);
  }

  return { success: false, data: {} };
}

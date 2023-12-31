import { supabase } from '@lib/supabase';

const WORKOUT_TABLE = 'workout';
const WORKOUT_EXERCISE_TABLE = 'workout_exercise';

const formdata = {
  exercises: [
    { exercise: '662132a4-c9f8-49cc-8717-545e5e3be684', setsCount: 20 },
    { exercise: 'e727be4d-bdca-4ec8-98b8-9d2cdc4eeffc', setsCount: 3 },
  ],
  name: 'Chest',
};

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
    // return { success: true, data: data[0] };
  } catch (error) {
    console.error('Unable to insert exercise', error);
  }

  return { success: false, data: {} };
}

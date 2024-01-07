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

export async function fetchWorkouts() {
  try {
    const { data } = await supabase
      .from(WORKOUT_EXERCISE_TABLE)
      .select(
        `id, order, sets_count, exercise_id, created_at, workout (id , name, created_at )`
      );

      const workouts = data.reduce((carry, workoutExercise) => {
        const { workout, ...workoutExerciseData } = workoutExercise;

        carry[workout.id] ??= {
            ...workout,
            workoutExercises: []
        }

        carry[workout.id].workoutExercises.push({
          ...workoutExerciseData,
          exercise: workoutExerciseData.exercise_id,
        });

        return carry;
      }, {})
    return Object.values(workouts);;
  } catch (error) {
    console.log('Unable to load workouts: ', error);
  }

  return [];
}

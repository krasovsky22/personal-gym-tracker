import { supabase } from '@lib/supabase';
import { QueryResultType } from './types';
import { Tables, TablesInsert } from '../database.types';

const USER_WORKOUT_TABLE = 'user_workout';
const USER_WORKOUT_EXERCISE_TABLE = 'user_workout_exercise';
const USER_WORKOUT_EXERCISE_SETS_TABLE = 'user_workout_exercise_set';

// export type UserWorkRowType =
//   Database['public']['Tables']['user_workout']['Row'];

export type UserWorkRowType = Tables<'user_workout'>;
export type UserWorkRowInsertType = TablesInsert<'user_workout'>;

export type UserWorkExerciseRowType = Tables<'user_workout_exercise'>;
export type UserWorkExerciseRowInsertType =
  TablesInsert<'user_workout_exercise'>;

export type UserWorkExerciseSetRowType = Tables<'user_workout_exercise_set'>;
export type UserWorkExerciseSetRowInsertType =
  TablesInsert<'user_workout_exercise_set'>;

export async function fetchUserWorkouts(): QueryResultType<UserWorkRowType[]> {
  try {
    const { data, error } = await supabase
      .from(USER_WORKOUT_TABLE)
      .select('*')
      .returns<UserWorkRowType[]>();

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error('Unable to load user workouts', error);
  }

  return { success: false, data: [] };
}

export async function insertUserWorkout(
  userWorkout: UserWorkRowInsertType
): QueryResultType<UserWorkRowType> {
  try {
    const { data, error } = await supabase
      .from(USER_WORKOUT_TABLE)
      .upsert([userWorkout], { onConflict: 'id', defaultToNull: false })
      .select()
      .single<UserWorkRowType>();

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error('Unable to save workout', error);
  }

  return { success: false };
}

export async function insertUserWorkoutExercises(
  userWorkoutExercises: UserWorkExerciseRowInsertType[]
): QueryResultType<UserWorkExerciseRowType[]> {
  try {
    const { data, error } = await supabase
      .from(USER_WORKOUT_EXERCISE_TABLE)
      .upsert(userWorkoutExercises, { onConflict: 'id', defaultToNull: false })
      .select()
      .returns<UserWorkExerciseRowType[]>();

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error('Unable to user workout exercises', error);
  }

  return { success: false };
}

export async function insertUserWorkoutExerciseSets(
  userWorkoutExerciseSets: UserWorkExerciseSetRowInsertType[]
): QueryResultType<UserWorkExerciseSetRowType[]> {
  try {
    const { data, error } = await supabase
      .from(USER_WORKOUT_EXERCISE_SETS_TABLE)
      .upsert(userWorkoutExerciseSets, {
        onConflict: 'id',
        defaultToNull: false,
      })
      .select()
      .returns<UserWorkExerciseSetRowType[]>();

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error('Unable to save user workout exercise sets', error);
  }

  return { success: false };
}

// export async function createUserWorkout({ workout_id }) {
//   try {
//     const userWorkout = {
//       workout_id,
//     };

//     console.log('saving', userWorkout);

//     const { data, error } = await supabase
//       .from(USER_WORKOUT_TABLE)
//       .insert(userWorkout)
//       .select()
//       .single();

//     console.log(data, error);

    // const insertedWorkout = workoutSelect[0];
    // const exercisesData = exercises.map((exercise, index) => ({
    //   order: index,
    //   sets_count: exercise.setsCount,
    //   exercise_id: exercise.exercise,
    //   workout_id: insertedWorkout.id,
    // }));

    // const { data: exercisesSelect } = await supabase
    //   .from(WORKOUT_EXERCISE_TABLE)
    //   .insert(exercisesData)
    //   .select();

    // return {
    //   success: true,
    //   data: { workout: { ...insertedWorkout, exercises: exercisesSelect } },
    // };
//   } catch (error) {
//     console.error('Unable to create user workout', error);
//   }

//   return { success: false, data: {} };
// }

// export async function fetchWorkouts() {
//   try {
//     const { data } = await supabase
//       .from(WORKOUT_EXERCISE_TABLE)
//       .select(
//         `id, order, sets_count, exercise_id, created_at, workout (id , name, created_at )`
//       );

//       const workouts = data.reduce((carry, workoutExercise) => {
//         const { workout, ...workoutExerciseData } = workoutExercise;

//         carry[workout.id] ??= {
//             ...workout,
//             workoutExercises: []
//         }

//         carry[workout.id].workoutExercises.push({
//           ...workoutExerciseData,
//           exercise: workoutExerciseData.exercise_id,
//         });

//         return carry;
//       }, {})
//     return Object.values(workouts);;
//   } catch (error) {
//     console.log('Unable to load workouts: ', error);
//   }

//   return [];
// }

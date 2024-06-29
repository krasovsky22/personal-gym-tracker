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

export type UserWorkoutCompleteType = UserWorkRowType & {
  userWorkoutExercises: (UserWorkExerciseRowType & {
    userWorkoutExerciseSets: UserWorkExerciseSetRowType[];
  })[];
};

type UserWorkoutExerciseSetSelectRowType = Omit<
  UserWorkExerciseSetRowType,
  'user_workout_exercise_id'
> & {
  user_workout_exercise_id: Omit<UserWorkExerciseRowType, 'user_workout_id'> & {
    user_workout_id: UserWorkRowType;
  };
};

export async function fetchUserWorkouts(): QueryResultType<
  UserWorkoutCompleteType[]
> {
  try {
    const { data, error } = await supabase
      .from(USER_WORKOUT_EXERCISE_SETS_TABLE)
      .select(`*, user_workout_exercise_id ( *, user_workout_id ( * ) )`)
      .order('created_at', {
        referencedTable: 'user_workout_exercise_id',
        ascending: true,
      })
      .returns<UserWorkoutExerciseSetSelectRowType[]>();

    if (error) throw error;

    console.log(data);
    const userWorkoutsMap = data.reduce((carry, row) => {
      const { user_workout_exercise_id, ...userWorkoutExerciseSetRow } = row;
      const { user_workout_id: userWorkout, ...userWorkoutExerciseRow } =
        user_workout_exercise_id;

      if (!carry.has(userWorkout.id)) {
        carry.set(userWorkout.id, {
          ...userWorkout,
          userWorkoutExercises: [],
        });
      }

      const userWorkoutExercises = carry.get(
        userWorkout.id
      )!.userWorkoutExercises;

      const userWorkoutExercise = userWorkoutExercises.find(
        (userWorkoutExercise) =>
          userWorkoutExercise.id === userWorkoutExerciseRow.id
      );

      const useWorkoutExerciseSetRowData = {
        ...userWorkoutExerciseSetRow,
        user_workout_exercise_id: userWorkoutExerciseRow.id,
      };

      if (!userWorkoutExercise) {
        userWorkoutExercises.push({
          ...userWorkoutExerciseRow,
          user_workout_id: userWorkout.id,
          userWorkoutExerciseSets: [useWorkoutExerciseSetRowData],
        });
      } else {
        userWorkoutExercise.userWorkoutExerciseSets.push(
          useWorkoutExerciseSetRowData
        );
      }

      return carry;
    }, new Map<string, UserWorkoutCompleteType>());

    console.log(userWorkoutsMap);
    const returnArray = Array.from(userWorkoutsMap, ([name, value]) => value);

    return { success: true, data: returnArray };
  } catch (error) {
    console.error('Unable to load user workouts', error);
  }

  return { success: false };
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

export async function insertUserWorkoutExercise(
  userWorkoutExercise: UserWorkExerciseRowInsertType
): QueryResultType<UserWorkExerciseRowType> {
  console.log('inserting', userWorkoutExercise);
  const { data } = await insertUserWorkoutExercises([userWorkoutExercise]);

  return { success: true, data: data?.[0] };
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

export async function insertUserWorkoutExerciseSet(
  userWorkoutExerciseSet: UserWorkExerciseSetRowInsertType
): QueryResultType<UserWorkExerciseSetRowType> {
  console.log(
    'inserting insertUserWorkoutExerciseSet ',
    userWorkoutExerciseSet
  );
  const { data } = await insertUserWorkoutExerciseSets([
    userWorkoutExerciseSet,
  ]);

  return { success: true, data: data?.[0] };
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

import { supabase } from '@lib/supabase';

import { SETS_TABLE_NAME } from '@lib/constants';

export default async function fetchSets() {
  try {
    const { data } = await supabase
      .from(SETS_TABLE_NAME)
      .select(
        `id, weight, repeats, set_order, workout_date, exercises (id , name, created_at )`
      );

    return data;
  } catch (error) {
    console.log('Unable to load workouts: ', error);
  }

  return [];
}

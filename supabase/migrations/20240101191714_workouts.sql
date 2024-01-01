alter table "public"."workout_exercise" drop constraint "workout_exercise_workout_id_fkey";

alter table "public"."workout_exercise" add constraint "workout_exercise_workout_id_fkey" FOREIGN KEY (workout_id) REFERENCES workout(id) ON DELETE CASCADE not valid;

alter table "public"."workout_exercise" validate constraint "workout_exercise_workout_id_fkey";



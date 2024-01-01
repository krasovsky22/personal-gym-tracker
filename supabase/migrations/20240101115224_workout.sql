alter table "public"."workout_exercise" drop constraint "workout_exercise_exercise_id_fkey";

alter table "public"."workout_exercise" add constraint "workout_exercise_exercise_id_fkey" FOREIGN KEY (exercise_id) REFERENCES exercise(id) ON DELETE CASCADE not valid;

alter table "public"."workout_exercise" validate constraint "workout_exercise_exercise_id_fkey";



alter table "public"."user_workout_exercise_set" add column "updated_at" timestamp with time zone not null default (now() AT TIME ZONE 'utc'::text);

create policy "update user workout"
on "public"."user_workout"
as permissive
for update
to authenticated
using (true)
with check ((auth.uid() = created_by));


create policy "Enable select only workouts created by authenticated user"
on "public"."user_workout_exercise"
as permissive
for select
to authenticated
using ((auth.uid() = created_by));


create policy "insert only authenticated"
on "public"."user_workout_exercise"
as permissive
for insert
to authenticated
with check (true);


create policy "update user workout exerciese"
on "public"."user_workout_exercise"
as permissive
for update
to authenticated
using (true)
with check ((auth.uid() = created_by));


create policy "Insert only by authenticated"
on "public"."user_workout_exercise_set"
as permissive
for insert
to authenticated
with check (true);


create policy "Update user workout set"
on "public"."user_workout_exercise_set"
as permissive
for update
to authenticated
using (true)
with check ((auth.uid() = created_by));




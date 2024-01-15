drop policy "Enable read for authenticated users only" on "public"."gym_equipment";

drop policy "Public profiles are viewable by everyone." on "public"."profiles";

drop policy "Users can insert their own profile." on "public"."profiles";

drop policy "Users can update own profile." on "public"."profiles";

alter table "public"."gym_equipment" drop constraint "gym_equipment_name_key";

alter table "public"."profiles" drop constraint "profiles_id_fkey";

alter table "public"."profiles" drop constraint "profiles_username_key";

alter table "public"."profiles" drop constraint "username_length";

alter table "public"."user_workout" drop constraint "user_workout_workout_id_fkey";

alter table "public"."gym_equipment" drop constraint "gym_equipment_pkey";

alter table "public"."profiles" drop constraint "profiles_pkey";

drop index if exists "public"."gym_equipment_name_key";

drop index if exists "public"."gym_equipment_pkey";

drop index if exists "public"."profiles_pkey";

drop index if exists "public"."profiles_username_key";

drop table "public"."gym_equipment";

drop table "public"."profiles";

alter table "public"."user_workout" alter column "id" set default gen_random_uuid();

alter table "public"."user_workout" add constraint "user_workout_workout_id_fkey" FOREIGN KEY (workout_id) REFERENCES workout(id) ON DELETE SET NULL not valid;

alter table "public"."user_workout" validate constraint "user_workout_workout_id_fkey";

create policy "Full Access to user workout table"
on "public"."user_workout"
as permissive
for all
to authenticated
using (true)
with check (true);




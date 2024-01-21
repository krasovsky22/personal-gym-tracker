drop policy "Full Access to user workout table" on "public"."user_workout";

alter table "public"."user_workout" drop constraint "user_workout_workout_id_fkey";

create table "public"."gym_equipment" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "created_at" timestamp with time zone not null default (now() AT TIME ZONE 'utc'::text)
);


alter table "public"."gym_equipment" enable row level security;

create table "public"."profiles" (
    "id" uuid not null,
    "updated_at" timestamp with time zone,
    "username" text,
    "full_name" text,
    "avatar_url" text,
    "website" text
);


alter table "public"."profiles" enable row level security;

CREATE UNIQUE INDEX gym_equipment_name_key ON public.gym_equipment USING btree (name);

CREATE UNIQUE INDEX gym_equipment_pkey ON public.gym_equipment USING btree (id);

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id);

CREATE UNIQUE INDEX profiles_username_key ON public.profiles USING btree (username);

alter table "public"."gym_equipment" add constraint "gym_equipment_pkey" PRIMARY KEY using index "gym_equipment_pkey";

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."gym_equipment" add constraint "gym_equipment_name_key" UNIQUE using index "gym_equipment_name_key";

alter table "public"."profiles" add constraint "profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."profiles" validate constraint "profiles_id_fkey";

alter table "public"."profiles" add constraint "profiles_username_key" UNIQUE using index "profiles_username_key";

alter table "public"."profiles" add constraint "username_length" CHECK ((char_length(username) >= 3)) not valid;

alter table "public"."profiles" validate constraint "username_length";

alter table "public"."user_workout" add constraint "user_workout_workout_id_fkey" FOREIGN KEY (workout_id) REFERENCES workout(id) not valid;

alter table "public"."user_workout" validate constraint "user_workout_workout_id_fkey";

create policy "Enable read for authenticated users only"
on "public"."gym_equipment"
as permissive
for select
to authenticated
using (true);


create policy "Public profiles are viewable by everyone."
on "public"."profiles"
as permissive
for select
to public
using (true);


create policy "Users can insert their own profile."
on "public"."profiles"
as permissive
for insert
to public
with check ((auth.uid() = id));


create policy "Users can update own profile."
on "public"."profiles"
as permissive
for update
to public
using ((auth.uid() = id));


create policy "Enable insert for authenticated users only"
on "public"."user_workout"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable select only workouts created by authenticated user"
on "public"."user_workout"
as permissive
for select
to authenticated
using ((auth.uid() = created_by));




create table "public"."gym_equipment" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "created_at" timestamp with time zone not null default (now() AT TIME ZONE 'utc'::text)
);


alter table "public"."gym_equipment" enable row level security;

CREATE UNIQUE INDEX gym_equipment_name_key ON public.gym_equipment USING btree (name);

CREATE UNIQUE INDEX gym_equipment_pkey ON public.gym_equipment USING btree (id);

alter table "public"."gym_equipment" add constraint "gym_equipment_pkey" PRIMARY KEY using index "gym_equipment_pkey";

alter table "public"."gym_equipment" add constraint "gym_equipment_name_key" UNIQUE using index "gym_equipment_name_key";

create policy "Enable read for authenticated users only"
on "public"."gym_equipment"
as permissive
for select
to authenticated
using (true);


insert into "public"."gym_equipment" (name)
  values ('Barbell'), ('Dumbbells')
  ON CONFLICT (name) DO NOTHING;

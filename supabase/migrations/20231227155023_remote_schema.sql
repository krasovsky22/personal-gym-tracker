
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$;

ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."exercise" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "metadata" "jsonb" DEFAULT '{}'::"jsonb" NOT NULL,
    "created_at" timestamp with time zone DEFAULT ("now"() AT TIME ZONE 'utc'::"text") NOT NULL,
    "created_by" "uuid" DEFAULT "auth"."uid"() NOT NULL
);

ALTER TABLE "public"."exercise" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."user_workout" (
    "id" "uuid" NOT NULL,
    "created_by" "uuid" DEFAULT "auth"."uid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT ("now"() AT TIME ZONE 'utc'::"text") NOT NULL,
    "updated_at" timestamp with time zone DEFAULT ("now"() AT TIME ZONE 'utc'::"text") NOT NULL,
    "workout_date" timestamp with time zone DEFAULT ("now"() AT TIME ZONE 'utc'::"text") NOT NULL,
    "workout_id" "uuid" NOT NULL,
    "completed" boolean DEFAULT false NOT NULL
);

ALTER TABLE "public"."user_workout" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."user_workout_exercise" (
    "id" "uuid" NOT NULL,
    "user_workout_id" "uuid" NOT NULL,
    "exercise_id" "uuid" NOT NULL,
    "created_by" "uuid" DEFAULT "auth"."uid"() NOT NULL,
    "created_at" timestamp without time zone DEFAULT "now"() NOT NULL,
    "completed" boolean DEFAULT false NOT NULL
);

ALTER TABLE "public"."user_workout_exercise" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."user_workout_exercise_set" (
    "id" "uuid" NOT NULL,
    "user_workout_exercise_id" "uuid" NOT NULL,
    "weight" double precision NOT NULL,
    "repeats" integer NOT NULL,
    "created_by" "uuid" DEFAULT "auth"."uid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT ("now"() AT TIME ZONE 'utc'::"text") NOT NULL
);

ALTER TABLE "public"."user_workout_exercise_set" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."workout" (
    "id" "uuid" NOT NULL,
    "created_by" "uuid" DEFAULT "auth"."uid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT ("now"() AT TIME ZONE 'utc'::"text") NOT NULL,
    "updated_at" timestamp with time zone DEFAULT ("now"() AT TIME ZONE 'utc'::"text") NOT NULL,
    "name" "text" NOT NULL
);

ALTER TABLE "public"."workout" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."workout_exercise" (
    "id" "uuid" NOT NULL,
    "workout_id" "uuid" NOT NULL,
    "exercise_id" "uuid" NOT NULL,
    "created_by" "uuid" DEFAULT "auth"."uid"() NOT NULL,
    "created_at" timestamp without time zone DEFAULT "now"() NOT NULL,
    "order" smallint NOT NULL
);

ALTER TABLE "public"."workout_exercise" OWNER TO "postgres";

ALTER TABLE ONLY "public"."exercise"
    ADD CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."user_workout_exercise_set"
    ADD CONSTRAINT "WorkoutExerciseSet_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."workout_exercise"
    ADD CONSTRAINT "WorkoutExercise_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."workout"
    ADD CONSTRAINT "Workout_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."user_workout_exercise"
    ADD CONSTRAINT "user_workout_exercise_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."user_workout"
    ADD CONSTRAINT "user_workout_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."exercise"
    ADD CONSTRAINT "exercise_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "auth"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."user_workout"
    ADD CONSTRAINT "user_workout_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "auth"."users"("id");

ALTER TABLE ONLY "public"."user_workout_exercise"
    ADD CONSTRAINT "user_workout_exercise_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "auth"."users"("id");

ALTER TABLE ONLY "public"."user_workout_exercise"
    ADD CONSTRAINT "user_workout_exercise_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "public"."exercise"("id");

ALTER TABLE ONLY "public"."user_workout_exercise_set"
    ADD CONSTRAINT "user_workout_exercise_set_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "auth"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."user_workout_exercise_set"
    ADD CONSTRAINT "user_workout_exercise_set_user_workout_exercise_id_fkey" FOREIGN KEY ("user_workout_exercise_id") REFERENCES "public"."user_workout_exercise"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."user_workout_exercise"
    ADD CONSTRAINT "user_workout_exercise_user_workout_id_fkey" FOREIGN KEY ("user_workout_id") REFERENCES "public"."user_workout"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."user_workout"
    ADD CONSTRAINT "user_workout_workout_id_fkey" FOREIGN KEY ("workout_id") REFERENCES "public"."workout"("id");

ALTER TABLE ONLY "public"."workout"
    ADD CONSTRAINT "workout_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "auth"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."workout_exercise"
    ADD CONSTRAINT "workout_exercise_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "auth"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."workout_exercise"
    ADD CONSTRAINT "workout_exercise_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "public"."exercise"("id");

ALTER TABLE ONLY "public"."workout_exercise"
    ADD CONSTRAINT "workout_exercise_workout_id_fkey" FOREIGN KEY ("workout_id") REFERENCES "public"."workout"("id");

CREATE POLICY "Allow access only from authenticated" ON "public"."exercise" TO "authenticated" USING (true) WITH CHECK (true);

CREATE POLICY "Allow access only from authenticated" ON "public"."user_workout_exercise_set" FOR SELECT TO "authenticated" USING (true);

CREATE POLICY "Allow access only from authenticated" ON "public"."workout" TO "authenticated" USING (true);

CREATE POLICY "Allow access only from authenticated" ON "public"."workout_exercise" TO "authenticated" USING (true);

ALTER TABLE "public"."exercise" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."user_workout" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."user_workout_exercise" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."user_workout_exercise_set" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."workout" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."workout_exercise" ENABLE ROW LEVEL SECURITY;

REVOKE USAGE ON SCHEMA "public" FROM PUBLIC;
GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";

GRANT ALL ON TABLE "public"."exercise" TO "anon";
GRANT ALL ON TABLE "public"."exercise" TO "authenticated";
GRANT ALL ON TABLE "public"."exercise" TO "service_role";

GRANT ALL ON TABLE "public"."user_workout" TO "anon";
GRANT ALL ON TABLE "public"."user_workout" TO "authenticated";
GRANT ALL ON TABLE "public"."user_workout" TO "service_role";

GRANT ALL ON TABLE "public"."user_workout_exercise" TO "anon";
GRANT ALL ON TABLE "public"."user_workout_exercise" TO "authenticated";
GRANT ALL ON TABLE "public"."user_workout_exercise" TO "service_role";

GRANT ALL ON TABLE "public"."user_workout_exercise_set" TO "anon";
GRANT ALL ON TABLE "public"."user_workout_exercise_set" TO "authenticated";
GRANT ALL ON TABLE "public"."user_workout_exercise_set" TO "service_role";

GRANT ALL ON TABLE "public"."workout" TO "anon";
GRANT ALL ON TABLE "public"."workout" TO "authenticated";
GRANT ALL ON TABLE "public"."workout" TO "service_role";

GRANT ALL ON TABLE "public"."workout_exercise" TO "anon";
GRANT ALL ON TABLE "public"."workout_exercise" TO "authenticated";
GRANT ALL ON TABLE "public"."workout_exercise" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;

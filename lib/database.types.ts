export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      exercise: {
        Row: {
          created_at: string
          created_by: string
          id: string
          metadata: Json
          name: string
        }
        Insert: {
          created_at?: string
          created_by?: string
          id?: string
          metadata?: Json
          name: string
        }
        Update: {
          created_at?: string
          created_by?: string
          id?: string
          metadata?: Json
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "exercise_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      gym_equipment: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      user_workout: {
        Row: {
          completed: boolean
          created_at: string
          created_by: string
          id: string
          updated_at: string
          workout_date: string
          workout_id: string
        }
        Insert: {
          completed?: boolean
          created_at?: string
          created_by?: string
          id?: string
          updated_at?: string
          workout_date?: string
          workout_id: string
        }
        Update: {
          completed?: boolean
          created_at?: string
          created_by?: string
          id?: string
          updated_at?: string
          workout_date?: string
          workout_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_workout_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_workout_workout_id_fkey"
            columns: ["workout_id"]
            referencedRelation: "workout"
            referencedColumns: ["id"]
          }
        ]
      }
      user_workout_exercise: {
        Row: {
          completed: boolean
          created_at: string
          created_by: string
          exercise_id: string
          id: string
          user_workout_id: string
        }
        Insert: {
          completed?: boolean
          created_at?: string
          created_by?: string
          exercise_id: string
          id: string
          user_workout_id: string
        }
        Update: {
          completed?: boolean
          created_at?: string
          created_by?: string
          exercise_id?: string
          id?: string
          user_workout_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_workout_exercise_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_workout_exercise_exercise_id_fkey"
            columns: ["exercise_id"]
            referencedRelation: "exercise"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_workout_exercise_user_workout_id_fkey"
            columns: ["user_workout_id"]
            referencedRelation: "user_workout"
            referencedColumns: ["id"]
          }
        ]
      }
      user_workout_exercise_set: {
        Row: {
          created_at: string
          created_by: string
          id: string
          repeats: number
          user_workout_exercise_id: string
          weight: number
        }
        Insert: {
          created_at?: string
          created_by?: string
          id: string
          repeats: number
          user_workout_exercise_id: string
          weight: number
        }
        Update: {
          created_at?: string
          created_by?: string
          id?: string
          repeats?: number
          user_workout_exercise_id?: string
          weight?: number
        }
        Relationships: [
          {
            foreignKeyName: "user_workout_exercise_set_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_workout_exercise_set_user_workout_exercise_id_fkey"
            columns: ["user_workout_exercise_id"]
            referencedRelation: "user_workout_exercise"
            referencedColumns: ["id"]
          }
        ]
      }
      workout: {
        Row: {
          created_at: string
          created_by: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "workout_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      workout_exercise: {
        Row: {
          created_at: string
          created_by: string
          exercise_id: string
          id: string
          order: number
          sets_count: number
          workout_id: string
        }
        Insert: {
          created_at?: string
          created_by?: string
          exercise_id: string
          id?: string
          order: number
          sets_count?: number
          workout_id: string
        }
        Update: {
          created_at?: string
          created_by?: string
          exercise_id?: string
          id?: string
          order?: number
          sets_count?: number
          workout_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workout_exercise_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workout_exercise_exercise_id_fkey"
            columns: ["exercise_id"]
            referencedRelation: "exercise"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workout_exercise_workout_id_fkey"
            columns: ["workout_id"]
            referencedRelation: "workout"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: unknown
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}


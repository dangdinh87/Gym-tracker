export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      exercises: {
        Row: {
          aliases: string[] | null
          category: Database["public"]["Enums"]["categorytype"]
          date_created: string
          date_updated: string
          description: string | null
          equipment: Database["public"]["Enums"]["equipmenttype"] | null
          force: Database["public"]["Enums"]["forcetype"] | null
          id: string
          instructions: string[] | null
          level: Database["public"]["Enums"]["leveltype"]
          mechanic: Database["public"]["Enums"]["mechanictype"] | null
          name: string
          primary_muscles: Database["public"]["Enums"]["muscle"][] | null
          secondary_muscles: Database["public"]["Enums"]["muscle"][] | null
          tips: string[] | null
        }
        Insert: {
          aliases?: string[] | null
          category: Database["public"]["Enums"]["categorytype"]
          date_created?: string
          date_updated?: string
          description?: string | null
          equipment?: Database["public"]["Enums"]["equipmenttype"] | null
          force?: Database["public"]["Enums"]["forcetype"] | null
          id: string
          instructions?: string[] | null
          level: Database["public"]["Enums"]["leveltype"]
          mechanic?: Database["public"]["Enums"]["mechanictype"] | null
          name: string
          primary_muscles?: Database["public"]["Enums"]["muscle"][] | null
          secondary_muscles?: Database["public"]["Enums"]["muscle"][] | null
          tips?: string[] | null
        }
        Update: {
          aliases?: string[] | null
          category?: Database["public"]["Enums"]["categorytype"]
          date_created?: string
          date_updated?: string
          description?: string | null
          equipment?: Database["public"]["Enums"]["equipmenttype"] | null
          force?: Database["public"]["Enums"]["forcetype"] | null
          id?: string
          instructions?: string[] | null
          level?: Database["public"]["Enums"]["leveltype"]
          mechanic?: Database["public"]["Enums"]["mechanictype"] | null
          name?: string
          primary_muscles?: Database["public"]["Enums"]["muscle"][] | null
          secondary_muscles?: Database["public"]["Enums"]["muscle"][] | null
          tips?: string[] | null
        }
        Relationships: []
      }
      nutrition_entries: {
        Row: {
          calories: number
          carbs: number
          created_at: string | null
          date: string
          fat: number
          food_name: string
          id: string
          protein: number
          quantity: number | null
          user_id: string
        }
        Insert: {
          calories: number
          carbs: number
          created_at?: string | null
          date: string
          fat: number
          food_name: string
          id?: string
          protein: number
          quantity?: number | null
          user_id: string
        }
        Update: {
          calories?: number
          carbs?: number
          created_at?: string | null
          date?: string
          fat?: number
          food_name?: string
          id?: string
          protein?: number
          quantity?: number | null
          user_id?: string
        }
        Relationships: []
      }
      nutrition_goals: {
        Row: {
          created_at: string | null
          daily_calories: number
          daily_carbs: number
          daily_fat: number
          daily_protein: number
          id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          daily_calories?: number
          daily_carbs?: number
          daily_fat?: number
          daily_protein?: number
          id?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          daily_calories?: number
          daily_carbs?: number
          daily_fat?: number
          daily_protein?: number
          id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          display_name: string | null
          id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          display_name?: string | null
          id?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          display_name?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      workout_exercises: {
        Row: {
          created_at: string
          exercise_id: string | null
          id: string
          name: string
          notes: string | null
          order_index: number
          sets: Json
          updated_at: string
          workout_id: string
        }
        Insert: {
          created_at?: string
          exercise_id?: string | null
          id?: string
          name: string
          notes?: string | null
          order_index?: number
          sets?: Json
          updated_at?: string
          workout_id: string
        }
        Update: {
          created_at?: string
          exercise_id?: string | null
          id?: string
          name?: string
          notes?: string | null
          order_index?: number
          sets?: Json
          updated_at?: string
          workout_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workout_exercises_exercise_id_fkey"
            columns: ["exercise_id"]
            isOneToOne: false
            referencedRelation: "exercises"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workout_exercises_workout_id_fkey"
            columns: ["workout_id"]
            isOneToOne: false
            referencedRelation: "workouts"
            referencedColumns: ["id"]
          },
        ]
      }
      workouts: {
        Row: {
          created_at: string | null
          date: string
          duration: number | null
          id: string
          name: string
          notes: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          date: string
          duration?: number | null
          id?: string
          name: string
          notes?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          date?: string
          duration?: number | null
          id?: string
          name?: string
          notes?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      categorytype:
        | "strength"
        | "stretching"
        | "plyometrics"
        | "strongman"
        | "powerlifting"
        | "cardio"
        | "olympic weightlifting"
      equipmenttype:
        | "body only"
        | "machine"
        | "other"
        | "foam roll"
        | "kettlebells"
        | "dumbbell"
        | "cable"
        | "barbell"
        | "bands"
        | "medicine ball"
        | "exercise ball"
        | "e-z curl bar"
      forcetype: "pull" | "push" | "static"
      leveltype: "beginner" | "intermediate" | "expert"
      mechanictype: "compound" | "isolation"
      muscle:
        | "abdominals"
        | "hamstrings"
        | "adductors"
        | "quadriceps"
        | "biceps"
        | "shoulders"
        | "chest"
        | "middle back"
        | "calves"
        | "glutes"
        | "lower back"
        | "lats"
        | "triceps"
        | "traps"
        | "forearms"
        | "neck"
        | "abductors"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      categorytype: [
        "strength",
        "stretching",
        "plyometrics",
        "strongman",
        "powerlifting",
        "cardio",
        "olympic weightlifting",
      ],
      equipmenttype: [
        "body only",
        "machine",
        "other",
        "foam roll",
        "kettlebells",
        "dumbbell",
        "cable",
        "barbell",
        "bands",
        "medicine ball",
        "exercise ball",
        "e-z curl bar",
      ],
      forcetype: ["pull", "push", "static"],
      leveltype: ["beginner", "intermediate", "expert"],
      mechanictype: ["compound", "isolation"],
      muscle: [
        "abdominals",
        "hamstrings",
        "adductors",
        "quadriceps",
        "biceps",
        "shoulders",
        "chest",
        "middle back",
        "calves",
        "glutes",
        "lower back",
        "lats",
        "triceps",
        "traps",
        "forearms",
        "neck",
        "abductors",
      ],
    },
  },
} as const

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName?: string;
          query?: string;
          variables?: Json;
          extensions?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      questionnaire_answers: {
        Row: {
          answer: Json;
          created_at: string;
          id: number;
          question_id: number;
          questionnaire_id: number | null;
          session_id: string;
          username: string;
        };
        Insert: {
          answer: Json;
          created_at?: string;
          id?: number;
          question_id: number;
          questionnaire_id?: number | null;
          session_id: string;
          username: string;
        };
        Update: {
          answer?: Json;
          created_at?: string;
          id?: number;
          question_id?: number;
          questionnaire_id?: number | null;
          session_id?: string;
          username?: string;
        };
        Relationships: [
          {
            foreignKeyName: "questionnaire_answers_question_id_fkey";
            columns: ["question_id"];
            isOneToOne: false;
            referencedRelation: "questionnaire_questions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "questionnaire_answers_questionnaire_id_fkey";
            columns: ["questionnaire_id"];
            isOneToOne: false;
            referencedRelation: "questionnaire_questionnaires";
            referencedColumns: ["id"];
          }
        ];
      };
      questionnaire_junction: {
        Row: {
          id: number;
          priority: number;
          question_id: number;
          questionnaire_id: number;
        };
        Insert: {
          id?: number;
          priority: number;
          question_id: number;
          questionnaire_id: number;
        };
        Update: {
          id?: number;
          priority?: number;
          question_id?: number;
          questionnaire_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "questionnaire_junction_question_id_fkey";
            columns: ["question_id"];
            isOneToOne: false;
            referencedRelation: "questionnaire_questions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "questionnaire_junction_questionnaire_id_fkey";
            columns: ["questionnaire_id"];
            isOneToOne: false;
            referencedRelation: "questionnaire_questionnaires";
            referencedColumns: ["id"];
          }
        ];
      };
      questionnaire_questionnaires: {
        Row: {
          id: number;
          name: string;
        };
        Insert: {
          id?: number;
          name: string;
        };
        Update: {
          id?: number;
          name?: string;
        };
        Relationships: [];
      };
      questionnaire_questions: {
        Row: {
          id: number;
          question: Json;
        };
        Insert: {
          id?: number;
          question: Json;
        };
        Update: {
          id?: number;
          question?: Json;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
      PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
      PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;

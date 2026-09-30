import { supabase } from "../lib/supabase";

export async function getStudentPreference(
  studentId: string,
  date: string
) {
  const { data, error } = await supabase
    .from("meal_preferences")
    .select("*")
    .eq("student_id", studentId)
    .eq("date", date)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function saveMealPreference(
  studentId: string,
  date: string,
  breakfast: boolean,
  lunch: boolean,
  dinner: boolean
) {
  const { data, error } = await supabase
    .from("meal_preferences")
    .upsert(
      {
        student_id: studentId,
        date,
        breakfast,
        lunch,
        dinner,
      },
      {
        onConflict: "student_id,date",
      }
    )
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getAllMealPreferences(
  date: string
) {
  const { data, error } = await supabase
    .from("meal_preferences")
    .select("*")
    .eq("date", date)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
}
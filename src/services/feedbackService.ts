import { supabase } from "../lib/supabase";

export async function submitFeedback(
  studentId: string,
  rating: number,
  message: string
) {
  const { data, error } = await supabase
    .from("feedback")
    .insert({
      student_id: studentId,
      rating,
      message,
    })
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getAllFeedback() {
  const { data, error } = await supabase
    .from("feedback")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
}
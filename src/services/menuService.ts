import { supabase } from "../lib/supabase";

export async function getMenuByDate(date: string) {
  const { data, error } = await supabase
    .from("menu")
    .select("*")
    .eq("date", date)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function saveMenu(
  date: string,
  breakfast: string,
  lunch: string,
  dinner: string
) {
  const { data, error } = await supabase
    .from("menu")
    .upsert(
      {
        date,
        breakfast,
        lunch,
        dinner,
      },
      {
        onConflict: "date",
      }
    )
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
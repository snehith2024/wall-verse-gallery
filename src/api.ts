import { supabase } from "@/integrations/supabase/client";

export async function getWallpapers() {
  const { data, error } = await supabase
    .from("wallpapers")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase error:", error.message);
    return [];
  }

  return data || [];
}

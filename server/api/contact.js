import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
    const supabase = await serverSupabaseClient(event);
    const body = await readBody(event);
    const { email, telephone, message } = body
  const { data, error } = await supabase
    .from('contact_backup')
    .insert([{ email, telephone, message }])

  if (error) {
    return {
      success: false,
      error: error.message
    }
  }

  return {
    success: true,
    data
  }
})
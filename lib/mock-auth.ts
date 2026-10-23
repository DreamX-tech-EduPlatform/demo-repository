// Stand-in for PCA-Dashboard's useStudentAuth().loginStudent — no Supabase in this PoC.
// Any PCA ID works with the password "demo".
export async function loginStudent(
  pcaid: string,
  password: string,
): Promise<{ success: boolean; error?: string }> {
  await new Promise((resolve) => setTimeout(resolve, 800));
  if (password === 'demo') return { success: true };
  return { success: false, error: `Invalid password for ${pcaid}. (Demo password is "demo")` };
}

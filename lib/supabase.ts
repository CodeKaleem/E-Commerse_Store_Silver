// Re-exports the SSR-aware browser client so all existing
// `import { supabase } from "@/lib/supabase"` calls keep working.
import { createBrowserClient } from "@supabase/ssr";

export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { db } from "@/lib/firebase/client";
import { doc, getDoc } from "firebase/firestore";
import { UserData } from "@/components/Leaderboard";

export function useSyncUser() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function sync() {
      // 1. Get Supabase user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        localStorage.removeItem("codeIIEST_user");
        setUserData(null);
        setLoading(false);
        return;
      }

      // 2. Firestore user document
      const ref = doc(db, "users", user.id);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const data = {
          uid: user.id,
          ...(snap.data() as any),
        } as UserData;

        localStorage.setItem("codeIIEST_user", JSON.stringify(data));
        setUserData(data);
      } else {
        // User logged into Supabase but not registered in Firestore
        setUserData(null);
      }

      setLoading(false);
    }

    sync();
  }, []);

  return { userData, loading, setUserData };
}

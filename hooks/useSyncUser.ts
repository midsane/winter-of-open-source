"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase/client";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { UserData } from "@/components/Leaderboard";

export function useSyncUser() {
  const [userData, setUserData] = useState < UserData | null > (null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        localStorage.removeItem("codeIIEST_user");
        setUserData(null);
        setLoading(false);
        return;
      }

      const ref = doc(db, "users", firebaseUser.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const data = { uid: firebaseUser.uid, ...(snap.data() as any) } as UserData;
        localStorage.setItem("codeIIEST_user", JSON.stringify(data));
        setUserData(data);
      } else {
        setUserData(null);
      }

      setLoading(false);
    });

    return () => unsub();
  }, []);

  return { userData, loading, setUserData };
}

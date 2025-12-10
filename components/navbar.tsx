"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { avatarImages } from "./Leaderboard";
import { X, Check } from "lucide-react";
import { useSyncUser } from "@/hooks/useSyncUser";
import { db } from "@/lib/firebase/client";
import { doc, updateDoc } from "firebase/firestore";
import type { UserData } from "./Leaderboard";
import { toast } from "sonner";

export const Navbar = () => {
  const router = useRouter();
  const { userData, loading, setUserData } = useSyncUser();

  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [tempSelectedAvatar, setTempSelectedAvatar] = useState(0);

  const openAvatarModal = () => {
    setTempSelectedAvatar(userData?.avatarIndex ?? 0);
    setIsAvatarModalOpen(true);
  };

  const saveAvatar = async () => {
    if (!userData) return;

    const ref = doc(db, "users", userData.uid!);

    await updateDoc(ref, { avatarIndex: tempSelectedAvatar });
    toast.success("Avatar updated successfully!");

    const updated: UserData = {
      ...userData,
      avatarIndex: tempSelectedAvatar,
    };

    localStorage.setItem("codeIIEST_user", JSON.stringify(updated));
    setUserData(updated);

    setIsAvatarModalOpen(false);
  };

  const handleRegister = () => {
    router.push("/register");
  };

  return (
    <>
      {isAvatarModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="bg-[#14151c] border border-white/10 rounded-2xl w-full max-w-sm shadow-xl p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Choose Avatar</h2>
              <button
                onClick={() => setIsAvatarModalOpen(false)}
                className="text-gray-400 hover:text-white transition"
              >
                <X size={22} />
              </button>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="w-28 h-28 rounded-full p-[3px] bg-gradient-to-br from-blue-500 to-purple-600 shadow-md">
                <img
                  src={avatarImages[tempSelectedAvatar]}
                  className="w-full h-full object-cover rounded-full border-4 border-[#14151c]"
                />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {avatarImages.map((img, idx) => {
                const active = tempSelectedAvatar === idx;

                return (
                  <button
                    key={idx}
                    onClick={() => setTempSelectedAvatar(idx)}
                    className={`relative rounded-xl overflow-hidden aspect-square border transition-all ${
                      active
                        ? "border-blue-500 shadow-[0_0_10px_rgba(0,123,255,0.35)] scale-[1.05]"
                        : "border-white/5 hover:border-white/20 opacity-80 hover:opacity-100"
                    }`}
                  >
                    <img src={img} className="w-full h-full object-cover" />
                    {active && (
                      <div className="absolute inset-0 bg-blue-600/20 flex items-center justify-center">
                        <div className="bg-blue-600 p-1 rounded-full">
                          <Check size={12} className="text-white" />
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <button
              onClick={saveAvatar}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 transition font-semibold text-white text-sm"
            >
              Save Avatar
            </button>
          </div>
        </div>
      )}

      <nav className="relative z-20 flex items-center justify-between px-6 py-5 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
            C
          </div>
          <span className="text-white text-xl font-bold">CodeIIEST</span>
        </Link>

        <Link
          href="/adminLogin"
          className="text-sm text-gray-400 hover:text-white transition-colors px-3 py-1 rounded-md border border-transparent hover:border-gray-600"
        >
          Admin Login
        </Link>

        <div className="flex items-center gap-4">
          {loading ? (
            <AvatarSkeleton />
          ) : !userData ? (
            <button
              onClick={handleRegister}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold"
            >
              Register
            </button>
          ) : (
            <button
              onClick={openAvatarModal}
              className="group relative w-10 h-10 rounded-full bg-gray-800 border border-white/10 overflow-hidden hover:border-blue-500 transition"
            >
              <img
                src={avatarImages[userData.avatarIndex || 0]}
                className="w-full h-full object-cover group-hover:scale-110 transition"
              />
            </button>
          )}
        </div>
      </nav>
    </>
  );
};

const AvatarSkeleton = () => (
  <div className="w-10 h-10 rounded-full bg-white/10 animate-pulse" />
);

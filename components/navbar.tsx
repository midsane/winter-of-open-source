"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { avatarImages } from "./Leaderboard";
import { X, Check, Menu } from "lucide-react";
import { useSyncUser } from "@/hooks/useSyncUser";
import { db } from "@/lib/firebase/client";
import { doc, updateDoc } from "firebase/firestore";
import type { UserData } from "./Leaderboard";
import { toast } from "sonner";
import logoImage from "@/public/images/favicon.png"
import Image from "next/image";

import clsx from 'clsx'

const navLinks = [
  { name: 'leaderboards', href: '/leaderboard' },
  { name: 'repos', href: '/repos' },
  { name: 'admin login', href: '/adminLogin' }
]


export const Navbar = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false)
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
    setOpen(false)
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
                    className={`relative rounded-xl overflow-hidden aspect-square border transition-all ${active
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

      <header className="fixed top-0 left-0 z-50 w-full backdrop-blur-md border-b-1 border-blue-400">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-1 sm:gap-2">
              <Image width={30} height={30}
                alt="codeiiest"
                src={logoImage} />
              <p className="hidden sm:block sm:text-sm" >CodeIIEST</p>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map(link => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium  text-white/80 hover:text-white transition"
                >
                  {link.name}
                </Link>
              ))}


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
            </div>

            <button
              aria-label="Toggle menu"
              onClick={() => setOpen(prev => !prev)}
              className="md:hidden rounded-lg p-2  transition"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          <div
            className={clsx(
              'md:hidden overflow-hidden transition-all duration-300',
              open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            )}
          >
            <div className="flex flex-col gap-4 py-4">
              {navLinks.map(link => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium  text-white/80 hover:text-white transition"
                >
                  {link.name}
                </Link>
              ))}
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
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

const AvatarSkeleton = () => (
  <div className="w-10 h-10 rounded-full bg-white/10 animate-pulse" />
);



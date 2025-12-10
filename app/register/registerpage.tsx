"use client";

import React, { useState, useEffect } from "react";
import { Check, User, Loader2 } from "lucide-react";
import { auth, db, provider } from "@/lib/firebase/client";
import { signInWithRedirect, getRedirectResult } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { avatarImages } from "@/components/Leaderboard";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";

const REQUIRED_DOMAIN = "@students.iiests.ac.in";

export function RegisterPage() {
    const router = useRouter();
    const [avatarIndex, setAvatarIndex] = useState(0);
    const [saving, setSaving] = useState(false);
    const [msg, setMsg] = useState("Only institute (@students.iiests.ac.in) emails allowed.");
    const [checking, setChecking] = useState(true);
    const [alreadyRegistered, setAlreadyRegistered] = useState(false);

    const parseEmail = (email: string) => {
        const local = email.split("@")[0];
        const [roll, ...nameParts] = local.split(".");
        const name = nameParts.join(" ");
        return { roll, name };
    };

    // Check local storage
    useEffect(() => {
        const stored = localStorage.getItem("codeIIEST_user");
        if (stored) setAlreadyRegistered(true);
    }, []);

    // Handle redirect result
    useEffect(() => {
        async function fetchRedirect() {
            try {
                const result = await getRedirectResult(auth);
                if (!result) {
                    setChecking(false);
                    return;
                }

                const email = result.user.email ?? "";

                if (!email.endsWith(REQUIRED_DOMAIN)) {
                    await auth.signOut();
                    setMsg("Only institute (@students.iiests.ac.in) emails allowed.");
                    setChecking(false);
                    return;
                }

                // Retrieve avatarIndex that user selected before redirect
                const storedAvatarIndex = Number(localStorage.getItem("avatarIndex") ?? 0);
                setAvatarIndex(storedAvatarIndex);

                const { name, roll } = parseEmail(email);
                const userRef = doc(db, "users", result.user.uid);
                const userSnap = await getDoc(userRef);

                if (!userSnap.exists()) {
                    await setDoc(userRef, {
                        name,
                        roll,
                        avatarIndex: storedAvatarIndex,
                        email,
                        easy: 0,
                        medium: 0,
                        hard: 0
                    });
                }

                localStorage.setItem(
                    "codeIIEST_user",
                    JSON.stringify({
                        uid: result.user.uid,
                        name,
                        roll,
                        email,
                        avatarIndex: storedAvatarIndex
                    })
                );

                router.push("/leaderboard");
            } catch (err) {
                setMsg(err instanceof Error ? err.message : String(err));
            } finally {
                setChecking(false);
            }
        }

        fetchRedirect();
    }, []);

    const handleRegister = async () => {
        setSaving(true);
        setMsg("");

        // store avatar index before redirect
        localStorage.setItem("avatarIndex", String(avatarIndex));

        try {
            await signInWithRedirect(auth, provider);
            return;
        } catch (err) {
            setMsg(err instanceof Error ? err.message : String(err));
            setSaving(false);
        }
    };

    if (checking) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                Checking registration...
            </div>
        );
    }

    if (alreadyRegistered) {
        return (
            <div className="relative min-h-screen w-full overflow-hidden">
                <Navbar />
                <div className="min-h-[calc(100vh-80px)] flex items-center justify-center text-center px-4">
                    <div className="bg-[#121218] border border-gray-700 rounded-xl p-8 max-w-md w-full shadow-xl">
                        <h2 className="text-3xl font-bold mb-4">You’re already registered</h2>
                        <p className="text-gray-400 mb-6">
                            You have already joined CodeIIEST Winter of Open Source Event. Continue to the leaderboard.
                        </p>

                        <button
                            onClick={() => router.push("/leaderboard")}
                            className="w-full py-3 bg-blue-600 hover:bg-blue-700 transition rounded-lg font-semibold"
                        >
                            Go to Leaderboard
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-8 font-sans">
            <div className="w-full max-w-[90%] sm:max-w-2xl bg-[#121218] border border-blue-900/50 rounded-xl shadow-2xl p-6 sm:p-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 text-center">
                    CodeIIEST Registration
                </h2>
                <p className="text-gray-400 mb-8 text-center">
                    Select your avatar and verify your institute identity to join the leaderboard.
                </p>

                <div className="mb-8">
                    <label className="block text-sm sm:text-lg font-medium text-blue-400 mb-4 flex items-center">
                        <User className="w-5 h-5 mr-2" /> Select Your Avatar
                    </label>

                    <div className="grid grid-cols-5 sm:grid-cols-8 gap-2 sm:gap-4">
                        {avatarImages.map((img, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={() => setAvatarIndex(index)}
                                className={`relative aspect-square rounded-full p-0.5 transition-all duration-200 ring-offset-2 ring-offset-[#121218] ${
                                    avatarIndex === index
                                        ? "ring-4 ring-blue-500 shadow-xl shadow-blue-500/30"
                                        : "opacity-70 hover:opacity-100 hover:ring-2 ring-gray-600"
                                }`}
                            >
                                <img src={img} className="w-full h-full object-cover rounded-full" />
                                {avatarIndex === index && (
                                    <Check className="absolute top-1 right-1 w-4 h-4 text-white bg-blue-600 rounded-full p-[1px]" />
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="mt-4 text-center">
                        <img
                            src={avatarImages[avatarIndex]}
                            className="sm:w-16 sm:h-16 h-12 w-12 mx-auto rounded-full ring-2 ring-blue-500"
                        />
                    </div>
                </div>

                <button
                    onClick={handleRegister}
                    className="w-full inline-flex items-center justify-center py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg shadow-blue-600/30 transition-all duration-300"
                    disabled={saving}
                >
                    {saving ? (
                        <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Verifying...
                        </>
                    ) : (
                        "Continue with Google"
                    )}
                </button>

                {msg && <p className="mt-4 text-center text-sm text-red-400">{msg}</p>}
            </div>
        </div>
    );
}

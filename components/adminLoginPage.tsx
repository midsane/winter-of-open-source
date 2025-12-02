"use client";

import { useState, useEffect } from "react";
import { auth, provider } from "@/lib/firebase/client";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { ADMIN_EMAILS } from "@/lib/allowedAdmins";
import { Navbar } from "./navbar";

export default function AdminLoginPage() {
    const router = useRouter();
    const [msg, setMsg] = useState("");
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        const isAdmin = localStorage.getItem("codeIIEST_admin") === "true";
        if (isAdmin) {
            router.replace("/admin");
        } else {
            setChecking(false);
        }
    }, [router]);

    const handleAdminLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const email = result.user.email ?? "";

            if (!ADMIN_EMAILS.includes(email)) {
                setMsg("You are not authorized as admin.");
                await auth.signOut();
                return;
            }

            localStorage.setItem("codeIIEST_admin", "true");
            router.push("/admin");
        } catch (err) {
            if (err instanceof Error) {
                setMsg(err.message);
            } else {
                setMsg(String(err));
            }
        }
    };

    if (checking) {
        return (
            <section className="min-h-screen flex items-center justify-center bg-black text-white">
                <p className="text-gray-400 text-sm">Checking admin status...</p>
            </section>
        );
    }

    return (
        <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#0c0c0d] via-[#121218] to-[#0d0e10] text-white">
            <Navbar />
            <div className="min-h-screen flex items-center justify-center text-white">
                <div className="bg-[#111] border border-gray-700 rounded-lg">
                    <h2 className="text-2xl mb-4 font-bold">Admin Login</h2>
                    <button
                        onClick={handleAdminLogin}
                        className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Continue with Google
                    </button>
                    {msg && <p className="text-red-400 mt-3">{msg}</p>}
                </div>
            </div>
        </section>
    );
}

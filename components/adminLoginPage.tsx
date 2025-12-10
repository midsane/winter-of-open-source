"use client";
import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

import { ADMIN_EMAILS } from "@/lib/allowedAdmins";

export default function AdminLoginPage() {
    const router = useRouter();
    const [checkingAdmin, setCheckingAdmin] = useState(true);
    const [loading, setLoading] = useState(false)
    const [msg, setMsg] = useState("")
    useEffect(() => {
        async function checkAdmin() {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            if (!user) {
                setCheckingAdmin(false);
                return;
            }

            const email = user.email ?? "";

            const ok = ADMIN_EMAILS.includes(email);
            setCheckingAdmin(false);
            if (ok) {
                router.push("/admin")
            }
        }

        checkAdmin();
    }, []);

    const handleAdminLogin = async () => {
        setLoading(true);
        try {
            await supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                    redirectTo: `${window.location.origin}/admin`,
                    queryParams: {
                        prompt: "select_account",
                    },
                },
            });
        } catch (err) {
            setMsg(err instanceof Error ? err.message : String(err));
            setLoading(false)
        }
    };

    if (checkingAdmin) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                Checking Admin Status...
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-8 font-sans">

            <div className="w-full max-w-[90%] justify-center items-center gap-5 flex flex-col sm:max-w-2xl bg-[#121218] border border-blue-900/50 rounded-xl shadow-2xl p-6 sm:p-10">
                <h1>Admin Login</h1>
                <button
                    onClick={handleAdminLogin}
                    className="w-full inline-flex items-center justify-center py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg shadow-blue-600/30 transition-all duration-300"
                    disabled={loading}
                >
                    {loading ? (
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
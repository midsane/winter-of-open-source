"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import { ADMIN_EMAILS } from "@/lib/allowedAdmins";
import { Loader2 } from "lucide-react";

export default function AdminLoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [checking, setChecking] = useState(true);
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function handleCallback() {
            const code = searchParams.get("code");
            if (!code) {
                setChecking(false);
                return;
            }

            setChecking(true);
            setMsg("");

            const { data, error } = await supabase.auth.exchangeCodeForSession(code);

            if (error) {
                setMsg(error.message);
                setChecking(false);
                return;
            }

            const email = data.user.email ?? "";

            if (!ADMIN_EMAILS.includes(email)) {
                await supabase.auth.signOut();
                setMsg("You are not authorized as admin.");
                setChecking(false);
                return;
            }

            router.replace("/admin");
        }

        handleCallback();
    }, [searchParams, router]);


    const loginWithGoogle = async () => {
        setMsg("");
        setLoading(true);

        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/admin-login`,
                queryParams: { prompt: "select_account" },
            },
        });

        if (error) {
            setMsg(error.message);
            setLoading(false);
        }
    };

    if (checking) {
        return (
            <section className="min-h-screen flex items-center justify-center text-white">
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                <p className="text-gray-400 text-sm">Checking admin status...</p>
            </section>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center text-white">
            <div className="bg-[#111] p-10 border border-gray-700 rounded-xl w-[350px]">
                <h2 className="text-2xl mb-4 font-bold text-center">Admin Login</h2>

                <button
                    onClick={loginWithGoogle}
                    disabled={loading}
                    className="w-full bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition font-semibold flex items-center justify-center"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin mr-2" />
                            Redirecting...
                        </>
                    ) : (
                        "Continue with Google"
                    )}
                </button>

                {msg && (
                    <p className="text-red-400 mt-3 text-sm text-center">{msg}</p>
                )}
            </div>
        </div>
    );
}

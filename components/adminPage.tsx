"use client";
import { supabase } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase/client";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { avatarImages } from "@/components/Leaderboard";
import { toast } from "sonner";
import { ADMIN_EMAILS } from "@/lib/allowedAdmins";

const Skeleton = ({ className = "" }) => (
    <div className={`animate-pulse bg-white/10 rounded-md ${className}`} />
);

type UserData = {
    uid: string;
    name: string;
    roll: string;
    email: string;
    avatarIndex: number;
    easy: number;
    medium: number;
    hard: number;
    bonus: number
};

export function AdminPage() {
    const [users, setUsers] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [checkingAdmin, setCheckingAdmin] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const toastId = toast.loading("Verifying admin permissions…");

        async function checkAdmin() {
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                toast.error("You are not logged in.");
                toast.dismiss(toastId);
                setCheckingAdmin(false);
                setIsAdmin(false);
                return;
            }

            const ok = ADMIN_EMAILS.includes(user.email ?? "");
            setIsAdmin(ok);
            setCheckingAdmin(false);

            toast.dismiss(toastId);

            if (ok) {
                toast.success("Admin verified. Loading users…");
            } else {
                toast.error("Access denied — you are not an admin.");
            }
        }

        checkAdmin();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        const snap = await getDocs(collection(db, "users"));
        const list: UserData[] = [];

        snap.forEach((d) => list.push({ uid: d.id, ...(d.data() as any) }));

        setUsers(list);
        setLoading(false);
    };

    const updateUser = async (uid: string, data: Partial<UserData>) => {
        setSaving(true);
        await updateDoc(doc(db, "users", uid), data);
        toast.success("Updated successfully!");
        setSaving(false);
    };

    useEffect(() => {
        if (isAdmin) fetchUsers();
    }, [isAdmin]);

    if (checkingAdmin) {
        return (
            <div className="min-h-screen flex flex-col gap-6 items-center justify-center text-white">
                <Skeleton className="w-64 h-6" />
                <Skeleton className="w-80 h-6" />
                <Skeleton className="w-56 h-6" />
            </div>
        );
    }

 
    if (!isAdmin) {
        return (
            <section className="min-h-screen flex flex-col items-center justify-center text-white ">
                <h1 className="text-3xl font-bold mb-4">Unauthorized</h1>
                <p className="text-gray-400">
                    You are not authorized to view this page.  
                    Login with an admin email.
                </p>
            </section>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen p-10 grid gap-6 grid-cols-1 md:grid-cols-2">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="p-6 bg-[#111] rounded-xl border border-gray-700">
                        <div className="flex gap-4 items-center">
                            <Skeleton className="w-16 h-16 rounded-full" />
                            <div className="flex-1 space-y-2">
                                <Skeleton className="w-32 h-4" />
                                <Skeleton className="w-24 h-3" />
                                <Skeleton className="w-40 h-3" />
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-3 mt-4">
                            <Skeleton className="h-10" />
                            <Skeleton className="h-10" />
                            <Skeleton className="h-10" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

  
    return (
        <div className="min-h-screen max-w-7xl mx-auto text-white p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Admin Panel - Edit User Stats</h1>

            <div className="mb-6">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by name, email, or roll..."
                    className="w-full px-4 py-2 rounded-lg bg-[#111] border border-gray-700 focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {users
                    .filter((u) => {
                        const q = search.toLowerCase();
                        return (
                            u.name.toLowerCase().includes(q) ||
                            u.email.toLowerCase().includes(q) ||
                            String(u.roll).toLowerCase().includes(q)
                        );
                    })
                    .map((u) => (
                        <div key={u.uid} className="p-4 bg-[#111] rounded-xl border border-gray-700">
                            <div className="flex items-center gap-4">
                                <img
                                    src={avatarImages[u.avatarIndex]}
                                    className="w-16 h-16 rounded-full ring-2 ring-blue-500"
                                />
                                <div>
                                    <p className="text-lg font-semibold">{u.name}</p>
                                    <p className="text-sm text-gray-400">Roll: {u.roll}</p>
                                    <p className="text-xs text-gray-500">{u.email}</p>
                                </div>
                            </div>

                            <div className="mt-4 grid grid-cols-3 gap-3">
                                {["easy", "medium", "hard", "bonus"].map((field) => (
                                    <div key={field}>
                                        <label className="text-sm capitalize">{field}</label>
                                        <input
                                            type="number"
                                            className="w-full px-2 py-1 rounded bg-[#222] border border-gray-600"
                                            value={u[field as keyof UserData] || 0 as number}
                                            onChange={(e) => {
                                                const v = Number(e.target.value) || 0;
                                                setUsers((prev) =>
                                                    prev.map((x) =>
                                                        x.uid === u.uid
                                                            ? { ...x, [field]: v }
                                                            : x
                                                    )
                                                );
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() =>
                                    updateUser(u.uid, {
                                        easy: u.easy,
                                        medium: u.medium,
                                        hard: u.hard,
                                        bonus: u.bonus
                                    })
                                }
                                className="mt-4 w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold"
                                disabled={saving}
                            >
                                {saving ? "Saving…" : "Save Changes"}
                            </button>
                        </div>
                    ))}
            </div>
        </div>
    );
}

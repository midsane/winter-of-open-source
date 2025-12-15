"use client";
import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Trophy } from "lucide-react";
import { db } from "@/lib/firebase/client";
import { collection, getDocs } from "firebase/firestore";
import { Banner } from "./banner/Banner";

export const avatarImages: string[] = [
  "https://imagedelivery.net/TkcHhODAR5Y7jFoICvSX0Q/014e9e28-9f8d-4523-3e9f-ef87569b1100/q=auto",
  "https://imagedelivery.net/TkcHhODAR5Y7jFoICvSX0Q/9a4fb1e5-d608-4911-48c5-b7ae6e3d1d00/q=auto",
  "https://imagedelivery.net/TkcHhODAR5Y7jFoICvSX0Q/9ea265db-6e7a-43df-2de5-faa209edd800/q=auto",
  "https://imagedelivery.net/TkcHhODAR5Y7jFoICvSX0Q/0f1bb4b3-7999-4ea0-a43a-05f014f96a00/q=auto",
  "https://imagedelivery.net/TkcHhODAR5Y7jFoICvSX0Q/956eb2cc-646d-4bc8-1fcd-4bbaab095200/q=auto",
  "https://imagedelivery.net/TkcHhODAR5Y7jFoICvSX0Q/b2065dec-b577-4e09-1696-b818ef99a500/q=auto",
  "https://imagedelivery.net/TkcHhODAR5Y7jFoICvSX0Q/2c007cb9-51c2-491b-b6e8-6c852b528800/q=auto",
  "https://imagedelivery.net/TkcHhODAR5Y7jFoICvSX0Q/8f7388a3-b108-42f0-51ad-f644af49df00/q=auto",
  "https://imagedelivery.net/TkcHhODAR5Y7jFoICvSX0Q/2fe89de3-78ce-4e21-80f3-298143a4f900/q=auto",
  "https://imagedelivery.net/TkcHhODAR5Y7jFoICvSX0Q/0bbfb6e2-8846-46c4-c298-c1ba23731300/q=auto",
  "https://imagedelivery.net/TkcHhODAR5Y7jFoICvSX0Q/078af3af-8872-4f67-1003-146681403d00/q=auto",
  "https://imagedelivery.net/TkcHhODAR5Y7jFoICvSX0Q/612daec9-02b9-4dfa-9355-6545a7826800/q=auto",
  "https://imagedelivery.net/TkcHhODAR5Y7jFoICvSX0Q/b3f58661-da8d-4ce3-e09f-8b7b0d26b400/q=auto",
  "https://imagedelivery.net/TkcHhODAR5Y7jFoICvSX0Q/47d7f1de-8dd8-46aa-3126-22c2fa574300/q=auto",
  "https://imagedelivery.net/TkcHhODAR5Y7jFoICvSX0Q/e0e4d189-776d-421d-40db-550721e92a00/q=auto",
];

export type UserData = {
  name: string;
  avatar: number;
  avatarIndex?: number;
  easy: number;
  medium: number;
  hard: number;
  bonus: number;
  roll?: string;
  points: number;
  uid?: string;
};

const getPoints = (easy: number, medium: number, hard: number, bonus: number) => {
  return easy * 2 + medium * 3 + hard * 5 + bonus;
};


const SkeletonPodium = () => (
  <div className="flex-1 max-w-[33%] flex flex-col items-center animate-pulse">
    <div className="rounded-2xl bg-white/10 w-20 h-20 sm:w-28 sm:h-28" />
    <div className="w-24 h-4 bg-white/10 rounded mt-3" />
    <div className="w-full h-32 sm:h-48 bg-white/5 rounded-t-2xl mt-4" />
  </div>
);

const SkeletonRow = () => (
  <div className="grid grid-8 gap-4 px-6 py-5 border-b border-white/5 animate-pulse">
    <div className="col-span-1 h-4 bg-white/10 rounded"></div>
    <div className="col-span-2 flex items-center gap-3">
      <div className="w-9 h-9 rounded-full bg-white/10"></div>
      <div className="w-24 h-4 bg-white/10 rounded"></div>
    </div>
    <div className="col-span-1 h-4 bg-white/10 rounded"></div>
    <div className="col-span-1 h-4 bg-white/10 rounded"></div>
    <div className="col-span-1 h-4 bg-white/10 rounded"></div>
    <div className="col-span-1 h-4 bg-white/10 rounded"></div>
  </div>
);

export default function LeaderboardPage() {
  const [dynamicData, setDynamicData] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");


  useEffect(() => {
    const fetchUsers = async () => {
      const snap = await getDocs(collection(db, "users"));
      const list: UserData[] = [];

      snap.forEach((docSnap) => {
        const d = docSnap.data();
        list.push({
          name: d.name,
          avatar: d.avatarIndex,
          easy: d.easy,
          medium: d.medium,
          hard: d.hard,
          roll: d.roll,
          bonus: d.bonus | 0,
          points: getPoints(d.easy, d.medium, d.hard, d.bonus | 0),
        });
      });

      setDynamicData(list);
      setLoading(false);
    };

    fetchUsers();
  }, []);

  const sorted = [...dynamicData].sort((a, b) => b.points - a.points);
  const top3 = sorted.slice(0, 3);
  const others = sorted.slice(3);

  const filteredOthers = others.filter((u) => {
    const q = search.toLowerCase();
    return (
      u.name.toLowerCase().includes(q) ||
      (u.roll?.toLowerCase() ?? "").includes(q)
    );
  });


  const ITEMS_PER_PAGE = 10;
  const [page, setPage] = useState(0);
  const tableRef = useRef<HTMLDivElement | null>(null);

  const paginated = filteredOthers.slice(page * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE + ITEMS_PER_PAGE);
  const maxPage = Math.ceil(others.length / ITEMS_PER_PAGE) - 1;

  useEffect(() => {
    if (page > 0 && tableRef.current) {
      tableRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [page]);

  const RenderPodiumUser = ({ user, rank }: { user: UserData; rank: number }) => {
    if (!user) return null;

    const isFirst = rank === 1;
    const boxHeight = isFirst ? "h-64 sm:h-80" : "h-48 sm:h-64";
    const borderColor = isFirst ? "border-blue-400" : "border-blue-800";
    const glow = isFirst
      ? "shadow-[0_-10px_50px_-10px_rgba(59,130,246,0.5)]"
      : "shadow-[0_-10px_30px_-10px_rgba(30,58,138,0.3)]";

    return (
      <div className={`relative flex flex-col items-center flex-1 max-w-[33%] ${isFirst ? "-mt-10 z-20" : "z-10"}`}>
        <div className="flex flex-col items-center mb-4 relative group">
          <div
            className={`${isFirst ? "w-20 h-20 sm:w-28 sm:h-28" : "w-16 h-16 sm:w-24 sm:h-24"}
            rounded-2xl border-2 ${borderColor} overflow-hidden shadow-2xl z-10 bg-black`}
          >
            <img
              src={avatarImages[user.avatar % avatarImages.length]}
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition"
            />
          </div>
          <h3 className="mt-3 text-xs sm:text-lg font-bold text-white tracking-wide text-center truncate w-full px-2">
            {user.name}
          </h3>
        </div>

        {/* Trophy + Points Box */}
        <div
          className={`w-full ${boxHeight} rounded-t-2xl border-t-2 border-x border-white/5 ${borderColor}
         bg-gradient-to-b from-[#1d2648] via-[#101426] to-transparent ${glow}
         flex flex-col items-center justify-start py-6 sm:py-8 gap-1 sm:gap-3 backdrop-blur-sm`}
        >
          <div className="bg-white/10 p-2 relative rounded-lg mb-1">
            <Trophy size={isFirst ? 60 : 48} className="text-yellow-400" />
            <span className="absolute text-sm sm:text-lg top-5 sm:top-4 left-1/2 -translate-x-1/2">{rank}</span>
          </div>

          <div className="flex flex-col items-center mt-2">
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="text-blue-400 text-sm sm:text-xl">💎</span>
              <span className="text-lg sm:text-3xl font-bold text-white">{user.points}</span>
            </div>
            <span className="text-[10px] sm:text-sm text-gray-400 mt-1">Points</span>
          </div>

          {/* Solved Breakdown */}
          <div className="flex flex-col gap-2 items-center">
            <div className="flex items-center mt-2">
              <span className="text-green-600">{user.easy}</span> +
              <span className="text-amber-600">{user.medium}</span> +
              <span className="text-red-600">{user.hard}</span>
            </div>
            <span className="text-[10px] sm:text-sm text-gray-400 mt-1">
              {user.easy + user.medium + user.hard} Issues Solved
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Banner
        serverNow={Date.now()}
        title="Winter Of Open Source "
        subtitle="ends in"
        backgroundImage="https://i.pinimg.com/1200x/47/7f/28/477f281a16f04de053a82b36b3d594c8.jpg"
        deadline={new Date("2026-01-15T12:00:00+05:30").getTime()}
        badges={[
          {
            text: "CodeIIEST",
            icon: "codeiiest",
            variant: "green"
          },
          {
            text: "GDSC",
            icon: "gdsc",
            variant: "red"
          }
        ]}
      />

      <div className="relative mt-20 z-10 max-w-5xl mx-auto px-4 pb-20">
        <div className="mt-12 mb-20 flex items-end justify-center w-full gap-2 sm:gap-6 px-0 sm:px-12">

          {loading ? (
            <>
              <SkeletonPodium />
              <SkeletonPodium />
              <SkeletonPodium />
            </>
          ) : (
            <>
              <RenderPodiumUser user={top3[1]} rank={2} />
              <RenderPodiumUser user={top3[0]} rank={1} />
              <RenderPodiumUser user={top3[2]} rank={3} />
            </>
          )}

        </div>


        <div className="relative group mb-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or roll number..."
            className="
                    w-full px-4 py-3 rounded-t-xl 
                    bg-[#0e111a] border border-white/10 
                    text-gray-200 placeholder-gray-500
                    max-w-5xl
                    shadow-[0_0_15px_-3px_rgba(0,0,0,0.4)]
                    backdrop-blur-xl

                    focus:outline-none 
                    focus:border-blue-500 
                    focus:ring-2 
                    focus:ring-blue-500/20
                    transition-all duration-200
                    "
          />

          <div className="
                  absolute right-4 top-1/2 -translate-y-1/2 
                  text-gray-400 
                  group-focus-within:text-blue-400 
                  transition 
                ">
            🔍
          </div>
        </div>
        <div
          ref={tableRef}
          className="bg-[#12141e]/50 backdrop-blur-md border max-w-5xl border-white/5 rounded-b-2xl overflow-x-auto hide-scrollbar"
        >
          <div className="min-w-[600px]">
            <div className="grid grid-cols-8 gap-4 px-6 py-4 border-b border-white/5 text-xs text-gray-500 font-medium uppercase tracking-wider">
              <div className="col-span-1">Rank</div>
              <div className="col-span-2">User name</div>
              <div className="col-span-1 text-right">Points</div>
              <div className="col-span-1 text-right">Easy</div>
              <div className="col-span-1 text-right">Medium</div>
              <div className="col-span-1 text-right">Hard</div>
              <div className="col-span-1 text-right">Bonus</div>
            </div>


            {loading ? (
              <>
                {Array.from({ length: 10 }).map((_, i) => (
                  <SkeletonRow key={i} />
                ))}
              </>
            ) : (
              <>
                {paginated.map((user, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-8 gap-4 px-6 py-5 border-b border-white/5 hover:bg-white/5 transition items-center text-sm group"
                  >
                    <div className="col-span-1 font-bold text-gray-400">
                      {page * ITEMS_PER_PAGE + index + 4}
                    </div>

                    <div className="col-span-2 flex items-center gap-3">
                      <img
                        src={avatarImages[user.avatar % avatarImages.length]}
                        className="w-9 h-9 rounded-full object-cover ring-2 ring-transparent group-hover:ring-blue-500/50 transition"
                      />
                      <div>
                        <div className="font-semibold text-gray-200">{user.name}</div>
                        <div className="text-xs text-gray-500">@{user.roll}</div>
                      </div>
                    </div>

                    <div className="col-span-1 flex justify-end">
                      <div className="flex items-center gap-1 bg-blue-500/10 px-2 py-1 rounded text-blue-400 text-xs font-bold border border-blue-500/20">
                        💎 {user.points}
                      </div>
                    </div>

                    <div className="col-span-1 text-right text-gray-300 font-mono">{user.easy}</div>
                    <div className="col-span-1 text-right font-bold text-white font-mono">{user.medium}</div>
                    <div className="col-span-1 text-right font-bold text-white font-mono">{user.hard}</div>
                    <div className="col-span-1 text-right font-bold text-white font-mono">{user.bonus | 0}</div>
                  </div>
                ))}
                {paginated?.length === 0 &&
                  <div className="flex justify-center items-center p-4">
                    No results found
                  </div>
                }
              </>
            )}

          </div>
        </div>

        {!loading && (
          <div className="flex justify-between items-center mt-6 text-sm text-gray-500">
            <span>Showing {paginated.length} of {others.length}</span>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="p-2 bg-white/5 hover:bg-white/10 rounded-lg disabled:opacity-30 transition"
              >
                <ChevronLeft size={18} />
              </button>

              <button
                onClick={() => setPage((p) => Math.min(maxPage, p + 1))}
                disabled={page === maxPage}
                className="p-2 bg-white/5 hover:bg-white/10 rounded-lg disabled:opacity-30 transition"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

      </div>
    </>
  );
}

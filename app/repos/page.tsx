import { Navbar } from "@/components/navbar";
import { RepoPage } from "@/components/repoPage";

export default function Page() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#0c0c0d] via-[#121218] to-[#0d0e10] text-white">
      <Navbar />
      <RepoPage />
    </section>
  )
}


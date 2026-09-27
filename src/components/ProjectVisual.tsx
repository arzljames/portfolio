import type { Project } from "../data/content";

// Lightweight CSS mock-ups used until a real screenshot is set on a project.

function Dashboard() {
  const bars = [45, 62, 50, 80, 92, 84, 96];
  return (
    <div className="flex h-full w-[82%] max-w-3xl flex-col overflow-hidden rounded-t-xl border border-white/10 bg-[#1b1a19] shadow-2xl">
      <div className="flex items-center gap-1.5 border-b border-white/5 px-3 py-2">
        <span className="size-2 rounded-full bg-white/15" />
        <span className="size-2 rounded-full bg-white/15" />
        <span className="size-2 rounded-full bg-white/15" />
        <span className="mx-auto h-3 w-1/3 rounded-full bg-white/5" />
      </div>
      <div className="grid flex-1 grid-cols-4 grid-rows-[auto_1fr] gap-2 p-3">
        {["1.2M", "$185K", "12.5%"].map((v, i) => (
          <div key={v} className={`rounded-md bg-white/[0.04] p-2 ${i === 0 ? "col-span-2" : ""}`}>
            <div className="h-1.5 w-8 rounded bg-white/15" />
            <div className="mt-1.5 text-[10px] font-bold text-[#ff9a52] sm:text-xs">{v}</div>
          </div>
        ))}
        <div className="col-span-2 flex items-end rounded-md bg-white/[0.04] p-2">
          <svg viewBox="0 0 100 40" className="h-full w-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="dash-fill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#ff7a30" stopOpacity="0.45" />
                <stop offset="1" stopColor="#ff7a30" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0 38 C20 30 35 28 50 24 S80 12 100 2 V40 H0Z" fill="url(#dash-fill)" />
            <path d="M0 38 C20 30 35 28 50 24 S80 12 100 2" fill="none" stroke="#ff9a52" strokeWidth="1.2" />
          </svg>
        </div>
        <div className="col-span-2 flex items-end gap-1.5 rounded-md bg-white/[0.04] p-2">
          {bars.map((h, i) => (
            <span
              key={i}
              style={{ height: `${h}%` }}
              className={`flex-1 rounded-sm ${i % 2 ? "bg-[#ff9a52]" : "bg-[#b4521c]"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Phone() {
  return (
    <div className="aspect-[9/18] h-[85%] rotate-[-18deg] rounded-[1.8rem] border-4 border-[#2a2622] bg-[#f4efe9] p-2 shadow-2xl">
      <div className="h-1/3 rounded-2xl bg-gradient-to-br from-[#6b4226] to-[#2b1a10] p-3">
        <div className="font-serif text-sm leading-tight text-white/90">Curated Finds</div>
        <div className="mt-2 h-2 w-10 rounded-full bg-[#ff7a30]" />
      </div>
      <div className="mt-2 grid grid-cols-2 gap-1.5">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="aspect-square rounded-lg bg-white p-1.5 shadow-sm">
            <div className="mx-auto aspect-square w-3/4 rounded-full bg-[#2a2622]" />
          </div>
        ))}
      </div>
    </div>
  );
}

function Brand() {
  return (
    <div className="grid h-[70%] w-[82%] rotate-[-4deg] grid-cols-[1.3fr_1fr] rounded-lg border border-[#d4a653]/40 bg-gradient-to-br from-[#252a33] to-[#161a20] p-6 shadow-2xl">
      <div className="flex flex-col items-center justify-center gap-2 border-r border-[#d4a653]/30">
        <span className="font-serif text-4xl font-bold text-[#e3b862]">AG</span>
        <span className="font-serif text-xs tracking-[0.2em] text-[#e3b862] sm:text-sm">AURUM GLOW</span>
      </div>
      <div className="flex flex-col justify-center gap-2 pl-4">
        <div className="flex gap-1">
          {["#15181d", "#e3b862", "#5b3a22", "#efe3c4"].map((c) => (
            <span key={c} style={{ background: c }} className="size-4 rounded-sm border border-white/10" />
          ))}
        </div>
        <span className="font-serif text-[10px] text-[#e3b862]/80">TYPOGRAPHY</span>
        <span className="font-serif text-xs text-[#e3b862]">Aurum Glow</span>
      </div>
    </div>
  );
}

function Laptop() {
  return (
    <div className="flex w-[70%] flex-col items-center">
      <div className="aspect-[16/10] w-full overflow-hidden rounded-t-lg border-4 border-[#2a2a2a] bg-white">
        <div className="h-1/2 bg-gradient-to-br from-[#3b4a5e] via-[#7d6a55] to-[#c79a6b] p-3">
          <div className="text-[10px] font-bold tracking-widest text-white">LUXURY ESTATES</div>
        </div>
        <div className="grid grid-cols-3 gap-2 p-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="aspect-[4/3] rounded bg-gradient-to-br from-[#c7b39a] to-[#6d5a45]" />
          ))}
        </div>
      </div>
      <div className="h-2 w-[112%] rounded-b-lg bg-[#bdbdbd]" />
    </div>
  );
}

const backgrounds: Record<Project["visual"], string> = {
  dashboard: "bg-gradient-to-b from-[#34363a] to-[#26282b]",
  phone: "bg-[radial-gradient(ellipse_at_50%_80%,#6d4a31,#2a1d15_70%)]",
  brand: "bg-[radial-gradient(ellipse_at_30%_20%,#2f3b4f,#161b24_70%)]",
  laptop: "bg-gradient-to-b from-[#cfd2d4] to-[#8d9193]",
};

export function ProjectVisual({ project }: { project: Project }) {
  if (project.image) {
    return (
      <img
        src={project.image}
        alt={`${project.title} preview`}
        loading="lazy"
        className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
      />
    );
  }

  const Mock = { dashboard: Dashboard, phone: Phone, brand: Brand, laptop: Laptop }[project.visual];
  return (
    <div
      className={`flex size-full justify-center transition-transform duration-700 group-hover:scale-[1.03] ${
        project.visual === "dashboard" ? "items-end pt-8" : "items-center"
      } ${backgrounds[project.visual]}`}
      role="img"
      aria-label={`${project.title} preview`}
    >
      <Mock />
    </div>
  );
}

export function StatusBadge({ status }: { status: Project["status"] }) {
  const styles = {
    Private: "border-white/15 bg-black/40 text-white/70",
    Live: "border-emerald-400/30 bg-emerald-500/15 text-emerald-300",
    WIP: "border-yellow-400/30 bg-yellow-500/15 text-yellow-300",
  }[status];
  return (
    <span
      className={`rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur-md ${styles}`}
    >
      {status}
    </span>
  );
}

"use client";

const items = [
  "Architecture",
  "Transformation",
  "Construction Neuve",
  "Extension & Agrandissement",
  "Bruxelles",
  "Réaffectation",
  "Belgique",
  "Design d'Intérieur",
  "Résidentiel & Tertiaire",
];

export default function MarqueeBand({
  dark = true,
  slow = false,
}: {
  dark?: boolean;
  slow?: boolean;
}) {
  const doubled = [...items, ...items];

  return (
    <div
      data-header-theme={dark ? "dark" : "light"}
      className={`overflow-hidden py-[18px] border-y ${
        dark
          ? "bg-[#1e3530] border-white/5"
          : "bg-bg-card border-accent/[0.08]"
      }`}
    >
      <div
        className={`flex whitespace-nowrap ${slow ? "animate-marquee-slow" : "animate-marquee"}`}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center shrink-0"
          >
            <span
              className={`font-body text-[10px] tracking-[0.45em] uppercase px-8 ${
                dark ? "text-[#8aaf9f]/55" : "text-accent/50"
              }`}
            >
              {item}
            </span>
            <span
              className={`text-[8px] ${
                dark ? "text-[#8aaf9f]/25" : "text-[#253d32]/20"
              }`}
            >
              ◆
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

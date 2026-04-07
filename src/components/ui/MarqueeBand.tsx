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
      className={`overflow-hidden py-[18px] border-y ${
        dark
          ? "bg-[#1e3530] border-white/5"
          : "bg-[#eae6de] border-[#253d32]/8"
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
              className={`text-[10px] tracking-[0.45em] uppercase px-8 ${
                dark ? "text-[#8aaf9f]/55" : "text-[#253d32]/50"
              }`}
              style={{ fontFamily: "var(--font-inter)" }}
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

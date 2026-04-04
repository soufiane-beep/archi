export default function Logo({
  className = "",
  showText = true,
  style,
}: {
  className?: string;
  showText?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox={`0 0 285 ${showText ? 300 : 210}`}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={style}
      fill="currentColor"
      aria-label="Premier Art Architecture"
    >
      {/* ── P : tige verticale ── */}
      <rect x="8" y="8" width="40" height="155" />

      {/* ── P : bol (arc épais) ── */}
      {/* Centre (48, 70) — arc extérieur r=62, arc intérieur r=36 */}
      <path d="M 48 8 A 62 62 0 0 1 48 132 L 48 106 A 36 36 0 0 0 48 34 Z" />

      {/* ── P : deux carrés en bas ── */}
      <rect x="8"  y="170" width="30" height="30" />
      <rect x="48" y="170" width="30" height="30" />

      {/* ── A : jambe gauche ── */}
      <polygon points="196,8 222,8 166,163 140,163" />

      {/* ── A : jambe droite ── */}
      <polygon points="196,8 222,8 278,163 252,163" />

      {/* ── Texte ARCHITECTURE ── */}
      {showText && (
        <text
          x="8"
          y="295"
          textLength="269"
          lengthAdjust="spacing"
          fontFamily="var(--font-inter), system-ui, sans-serif"
          fontSize="16"
          fontWeight="400"
        >
          ARCHITECTURE
        </text>
      )}
    </svg>
  );
}

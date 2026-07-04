export default function BookCover({ book, className = '' }) {
  const hue = book.coverHue;
  const gradId = `cover-${book.id}`;
  return (
    <svg viewBox="0 0 300 440" className={className} role="img" aria-label={`${book.title} cover`}>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={`hsl(${hue}, 75%, 25%)`} />
          <stop offset="100%" stopColor={`hsl(${(hue + 50) % 360}, 65%, 8%)`} />
        </linearGradient>
      </defs>
      <rect width="300" height="440" fill={`url(#${gradId})`} />
      
      {/* Spiderweb graphic lines on cover */}
      <g stroke="rgba(255,255,255,0.12)" strokeWidth="1" fill="none">
        <circle cx="150" cy="220" r="60" />
        <circle cx="150" cy="220" r="110" />
        <circle cx="150" cy="220" r="170" />
        <line x1="0" y1="0" x2="300" y2="440" />
        <line x1="300" y1="0" x2="0" y2="440" />
        <line x1="150" y1="0" x2="150" y2="440" />
        <line x1="0" y1="220" x2="300" y2="220" />
      </g>

      <rect x="14" y="14" width="272" height="412" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
      
      {/* Marvel Logo Banner */}
      <rect x="28" y="24" width="70" height="18" fill="var(--crimson)" rx="2" />
      <text x="63" y="37" fontFamily="Anton, sans-serif" fontSize="11" fill="#F3EFE4" textAnchor="middle" letterSpacing="0.05em">
        MARVEL
      </text>

      <text x="28" y="62" fontFamily="IBM Plex Mono, monospace" fontSize="9" fill="rgba(255,255,255,0.6)" tracking-widest="true">
        {book.series.toUpperCase()}
      </text>
      
      <text x="28" y="250" fontFamily="Anton, sans-serif" fontSize="36" fill="#F3EFE4" style={{ textTransform: 'uppercase' }} letterSpacing="0.02em">
        <tspan x="28" dy="0">SPIDER</tspan>
        <tspan x="28" dy="30" fill="var(--cyan)">MAN</tspan>
      </text>
      
      <text x="28" y="325" fontFamily="Anton, sans-serif" fontSize="16" fill="var(--crimson)" letterSpacing="0.05em">
        ISSUE #{book.issue}
      </text>
      
      <circle cx="255" cy="380" r="26" fill="rgba(0,0,0,0.5)" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
      <text x="255" y="385" fontFamily="IBM Plex Mono, monospace" fontSize="12" fill="#F3EFE4" textAnchor="middle">
        {book.year}
      </text>
    </svg>
  );
}


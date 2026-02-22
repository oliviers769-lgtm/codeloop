import React from 'react';

export default function InfinityLogo({ size = 80, animated = false, showCheck = false }) {
  const w = size * 1.8;
  const h = size;
  const cx = w / 2;
  const cy = h / 2;
  const r = size * 0.35;
  const lx = cx - r * 0.88;
  const rx = cx + r * 0.88;
  const stroke = size * 0.18;
  const innerR = r * 0.38;

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
        <defs>
          <linearGradient id="inf-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1A1A4E" />
            <stop offset="48%" stopColor="#2D2070" />
            <stop offset="52%" stopColor="#CC4400" />
            <stop offset="100%" stopColor="#F97316" />
          </linearGradient>
          <filter id="inf-shadow">
            <feDropShadow dx="0" dy="3" stdDeviation="6" floodColor="#1A1A4E" floodOpacity="0.15"/>
          </filter>
        </defs>

        {/* Left loop */}
        <circle cx={lx} cy={cy} r={r} fill="none"
          stroke="#1A1A4E" strokeWidth={stroke}
          clipPath={`circle(${r * 1.5}px at ${lx}px ${cy}px)`}
          style={animated ? { animation: 'pulse 3s ease-in-out infinite' } : {}}
        />

        {/* Right loop */}
        <circle cx={rx} cy={cy} r={r} fill="none"
          stroke="url(#inf-grad)" strokeWidth={stroke}
        />

        {/* Crossing overlay top */}
        <path d={`M ${cx - r * 0.42} ${cy - r * 0.5} Q ${cx} ${cy} ${cx + r * 0.42} ${cy - r * 0.5}`}
          fill="none" stroke="url(#inf-grad)" strokeWidth={stroke} strokeLinecap="round" />

        {/* Crossing overlay bottom */}
        <path d={`M ${cx - r * 0.42} ${cy + r * 0.5} Q ${cx} ${cy} ${cx + r * 0.42} ${cy + r * 0.5}`}
          fill="none" stroke="url(#inf-grad)" strokeWidth={stroke} strokeLinecap="round" />

        {/* Inner circles white bg */}
        <circle cx={lx} cy={cy} r={innerR} fill="#F3F4F6" />
        <circle cx={rx} cy={cy} r={innerR} fill="#F3F4F6" />

        {/* Left symbol: ? */}
        <text x={lx} y={cy + innerR * 0.38} textAnchor="middle"
          fontSize={innerR * 1.4} fontWeight="700"
          fill={showCheck ? "#10B981" : "#1A1A4E"}
          fontFamily="Fraunces, serif"
          style={{ transition: 'all 0.4s ease' }}>
          {showCheck ? "✓" : "?"}
        </text>

        {/* Right symbol: ✓ */}
        <text x={rx} y={cy + innerR * 0.38} textAnchor="middle"
          fontSize={innerR * 1.2} fontWeight="700"
          fill="#F97316"
          fontFamily="Fraunces, serif">
          ✓
        </text>
      </svg>
    </div>
  );
}

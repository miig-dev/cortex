import type { FC } from 'react';

interface CortexLogoProps {
  size?: number;
  animated?: boolean;
  className?: string;
}

export const CortexLogo: FC<CortexLogoProps> = ({
  size = 120,
  animated = true,
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <title>Cortex Logo</title>
      {/* Cercle (Cortex) */}
      <circle
        cx="60"
        cy="60"
        r="50"
        fill="#121212"
        stroke="#4361EE"
        strokeWidth="2"
      />

      {/* Symbole Terminal "> _" */}
      <text
        x="60"
        y="72"
        textAnchor="middle"
        fontFamily="JetBrains Mono, monospace"
        fontSize="32"
        fill="#4361EE"
        letterSpacing="2"
      >
        &gt; _
      </text>

      {/* Animation optionnelle : Curseur clignotant */}
      {animated && (
        <rect
          x="78"
          y="52"
          width="2"
          height="20"
          fill="#4361EE"
          className="animate-cursor-blink"
        />
      )}
    </svg>
  );
};

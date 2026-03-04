import { motion } from "motion/react";

interface ConfidenceRingProps {
  percentage: number;
  size?: "sm" | "md" | "lg";
  animated?: boolean;
}

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

function arcPath(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, startAngle);
  const end = polarToCartesian(cx, cy, r, endAngle);
  const sweep = endAngle - startAngle;
  const largeArc = sweep > 180 ? 1 : 0;
  return `M ${start.x.toFixed(3)} ${start.y.toFixed(3)} A ${r} ${r} 0 ${largeArc} 1 ${end.x.toFixed(3)} ${end.y.toFixed(3)}`;
}

export function getTier(pct: number) {
  if (pct >= 85) return { label: "High Confidence", short: "HIGH", color: "#2BA886", bg: "#EEFBF5", border: "#B0E8D1", ring: "#2BA886" };
  if (pct >= 68) return { label: "Moderate Risk", short: "MOD", color: "#D4952B", bg: "#FFF8EC", border: "#F5D98A", ring: "#D4952B" };
  if (pct >= 50) return { label: "Low Confidence", short: "LOW", color: "#E8524A", bg: "#FEF1F0", border: "#F9B4B1", ring: "#E8524A" };
  return { label: "Critical Risk", short: "CRIT", color: "#C23028", bg: "#FEF1F0", border: "#F9B4B1", ring: "#C23028" };
}

export function ConfidenceRing({ percentage, size = "lg", animated = true }: ConfidenceRingProps) {
  const tier = getTier(percentage);

  const configs = {
    sm: { vb: 80, cx: 40, cy: 40, r: 30, sw: 5 },
    md: { vb: 110, cx: 55, cy: 55, r: 42, sw: 6 },
    lg: { vb: 160, cx: 80, cy: 80, r: 62, sw: 8 },
  };

  const { vb, cx, cy, r, sw } = configs[size];
  const fullPath = arcPath(cx, cy, r, 225, 495);

  return (
    <div className="relative flex items-center justify-center" style={{ width: vb, height: vb }}>
      <svg viewBox={`0 0 ${vb} ${vb}`} width={vb} height={vb} overflow="visible">
        {/* Track */}
        <path
          d={fullPath}
          fill="none"
          stroke="#EBEBEF"
          strokeWidth={sw}
          strokeLinecap="round"
        />

        {/* Fill */}
        <motion.path
          d={fullPath}
          fill="none"
          stroke={tier.ring}
          strokeWidth={sw}
          strokeLinecap="round"
          initial={animated ? { pathLength: 0 } : { pathLength: percentage / 100 }}
          animate={{ pathLength: percentage / 100 }}
          transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
        />
      </svg>

      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ paddingTop: size === "lg" ? 8 : 4 }}>
        <motion.span
          initial={animated ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: size === "lg" ? "2rem" : size === "md" ? "1.2rem" : "0.9rem",
            fontWeight: 600,
            color: "#2C2C3A",
            lineHeight: 1,
            letterSpacing: "-0.03em",
          }}
        >
          {percentage}
        </motion.span>
        <motion.span
          initial={animated ? { opacity: 0 } : { opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          style={{
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: size === "lg" ? "0.58rem" : "0.5rem",
            fontWeight: 600,
            color: tier.color,
            letterSpacing: "0.12em",
            textTransform: "uppercase" as const,
            marginTop: size === "lg" ? 4 : 2,
          }}
        >
          {tier.short}
        </motion.span>
      </div>
    </div>
  );
}

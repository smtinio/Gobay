interface LineTagProps {
  system: "BART" | "Muni" | "Caltrain";
  line?: string;
  size?: "sm" | "md";
}

const SYSTEM_STYLES = {
  BART: { bg: "#2D8A97", text: "#FFFFFF" },
  Muni: { bg: "#E8524A", text: "#FFFFFF" },
  Caltrain: { bg: "#2C2C3A", text: "#FFFFFF" },
};

export function LineTag({ system, line, size = "sm" }: LineTagProps) {
  const style = SYSTEM_STYLES[system];
  const label = line ? `${system} ${line}` : system;

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        backgroundColor: style.bg,
        color: style.text,
        fontFamily: "'Instrument Sans', sans-serif",
        fontSize: size === "sm" ? "0.55rem" : "0.62rem",
        fontWeight: 700,
        letterSpacing: "0.1em",
        textTransform: "uppercase" as const,
        padding: size === "sm" ? "3px 8px" : "4px 10px",
        borderRadius: 3,
      }}
    >
      {label}
    </span>
  );
}

interface TierBadgeProps {
  tier: "HIGH" | "MOD" | "LOW" | "CRIT";
  size?: "sm" | "md";
}

const TIER_STYLES = {
  HIGH: { color: "#2BA886" },
  MOD: { color: "#D4952B" },
  LOW: { color: "#E8524A" },
  CRIT: { color: "#C23028" },
};

const TIER_LABELS = {
  HIGH: "High Confidence",
  MOD: "Moderate Risk",
  LOW: "Low Confidence",
  CRIT: "Critical Risk",
};

export function TierBadge({ tier, size = "sm" }: TierBadgeProps) {
  const style = TIER_STYLES[tier];

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        fontFamily: "'Instrument Sans', sans-serif",
        fontSize: size === "sm" ? "0.6rem" : "0.65rem",
        fontWeight: 700,
        letterSpacing: "0.08em",
        textTransform: "uppercase" as const,
        color: style.color,
      }}
    >
      {TIER_LABELS[tier]}
    </span>
  );
}

interface StatusDotProps {
  status: "good" | "degraded" | "critical" | "unknown";
  label?: string;
}

export function StatusDot({ status, label }: StatusDotProps) {
  const colors = {
    good: "#2BA886",
    degraded: "#D4952B",
    critical: "#E8524A",
    unknown: "#8E8E9A",
  };

  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
      <span
        style={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          backgroundColor: colors[status],
          display: "inline-block",
        }}
      />
      {label && (
        <span
          style={{
            fontFamily: "'Instrument Sans', sans-serif",
            fontSize: "0.6rem",
            fontWeight: 600,
            color: colors[status],
            textTransform: "uppercase" as const,
            letterSpacing: "0.08em",
          }}
        >
          {label}
        </span>
      )}
    </span>
  );
}
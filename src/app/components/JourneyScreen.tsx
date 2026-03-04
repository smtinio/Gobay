import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, AlertTriangle, CheckCircle, ChevronRight, Clock, Info, Shield, Zap } from "lucide-react";
import { ConfidenceRing, getTier } from "./ConfidenceRing";
import { LineTag, TierBadge } from "./LineTag";

const JOURNEYS = [
  {
    from: "Embarcadero",
    to: "Millbrae",
    system: "BART" as const,
    line: "Yellow Line",
    duration: "32 min",
    windows: [
      { label: "Now", departsIn: 4, pct: 79, note: "Peak congestion active" },
      { label: "+15m", departsIn: 19, pct: 84, note: "Congestion easing" },
      { label: "+30m", departsIn: 34, pct: 91, note: "Post-peak window" },
      { label: "+45m", departsIn: 49, pct: 88, note: "Stable headway" },
    ],
    legs: [
      { station: "Embarcadero", label: "Platform 1 · Yellow Line", type: "depart" },
      { station: "Montgomery St", label: "Through station", type: "through" },
      { station: "Powell St", label: "Through station", type: "through" },
      { station: "Civic Center", label: "Through station", type: "through" },
      { station: "Millbrae", label: "Terminal · Yellow Line", type: "arrive" },
    ],
    risks: [
      { level: "moderate", icon: "warn", text: "Peak AM congestion window through 9:15 AM adds +2-4 min headway variance" },
      { level: "low", icon: "info", text: "SFO single-track section may add 1-2 min delay probability 18% of trips" },
      { level: "good", icon: "ok", text: "No active BART alerts. Signal system nominal on Yellow corridor." },
    ],
  },
  {
    from: "SF 4th & King",
    to: "San Jose Diridon",
    system: "Caltrain" as const,
    line: "Baby Bullet",
    duration: "68 min",
    windows: [
      { label: "Now", departsIn: 11, pct: 72, note: "Walk buffer tight" },
      { label: "+30m", departsIn: 41, pct: 78, note: "Comfortable walk" },
      { label: "+60m", departsIn: 71, pct: 83, note: "Post-peak service" },
      { label: "+90m", departsIn: 101, pct: 76, note: "Local service only" },
    ],
    legs: [
      { station: "Embarcadero", label: "Walk 8 min to 4th & King", type: "walk" },
      { station: "SF 4th & King", label: "Platform 4 · Baby Bullet", type: "depart" },
      { station: "Millbrae", label: "Stop · 12 min", type: "through" },
      { station: "Redwood City", label: "Stop · 38 min", type: "through" },
      { station: "San Jose Diridon", label: "Terminal · 68 min", type: "arrive" },
    ],
    risks: [
      { level: "high", icon: "warn", text: "Walk from Embarcadero to 4th & King is 8 min - tight if train is early" },
      { level: "moderate", icon: "warn", text: "Baby Bullet schedule adherence 74% at SF departure due to single platform" },
      { level: "low", icon: "info", text: "Caltrain does not hold for BART connections. Plan 10+ min buffer." },
    ],
  },
  {
    from: "Embarcadero",
    to: "Millbrae + Caltrain",
    system: "BART" as const,
    line: "Yellow + Caltrain",
    duration: "95 min",
    windows: [
      { label: "Now", departsIn: 2, pct: 58, note: "Transfer window: 6 min" },
      { label: "+15m", departsIn: 17, pct: 64, note: "Transfer window: 12 min" },
      { label: "+30m", departsIn: 32, pct: 71, note: "Comfortable transfer" },
      { label: "+60m", departsIn: 62, pct: 68, note: "Later Caltrain" },
    ],
    legs: [
      { station: "Embarcadero", label: "Platform 1 · Yellow Line", type: "depart" },
      { station: "Millbrae", label: "Transfer · 32 min · TIGHT WINDOW", type: "transfer" },
      { station: "Hillsdale", label: "Caltrain Local stop", type: "through" },
      { station: "Palo Alto", label: "Caltrain Local stop", type: "through" },
      { station: "San Jose Diridon", label: "Terminal · +63 min", type: "arrive" },
    ],
    risks: [
      { level: "high", icon: "warn", text: "Transfer buffer at Millbrae is only 6 min. BART delay >4 min = missed Caltrain" },
      { level: "high", icon: "warn", text: "Muni bunching near Embarcadero may delay initial platform access" },
      { level: "moderate", icon: "info", text: "Next Caltrain from Millbrae if missed: +36 min. Total journey: 131 min." },
    ],
  },
];

const LEG_DOT_COLORS: Record<string, string> = {
  depart: "#2D8A97",
  through: "#D8D8DC",
  transfer: "#E8524A",
  arrive: "#2BA886",
  walk: "#8B5CF6",
};

interface JourneyScreenProps {
  journeyIndex: number;
  onNavigate: (screen: "home" | "journey" | "transfer" | "status") => void;
}

export function JourneyScreen({ journeyIndex, onNavigate }: JourneyScreenProps) {
  const journey = JOURNEYS[journeyIndex] ?? JOURNEYS[0];
  const [selectedWindow, setSelectedWindow] = useState(0);
  const currentPct = journey.windows[selectedWindow].pct;
  const tier = getTier(currentPct);

  return (
    <div
      style={{
        flex: 1,
        overflowY: "auto",
        backgroundColor: "#FFFFFF",
        fontFamily: "'Instrument Sans', sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: "#2D8A97",
          padding: "14px 24px 28px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <button
            onClick={() => onNavigate("home")}
            style={{
              width: 32,
              height: 32,
              borderRadius: 4,
              backgroundColor: "rgba(255,255,255,0.15)",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            <ArrowLeft size={15} color="#fff" />
          </button>
          <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" }}>
            Journey Reliability
          </span>
        </div>

        <div style={{ marginBottom: 8 }}>
          <LineTag system={journey.system} />
        </div>
        <div style={{ color: "#fff", fontSize: "1.4rem", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: 4 }}>
          {journey.from}
          <span style={{ color: "rgba(255,255,255,0.5)", margin: "0 10px" }}>→</span>
          {journey.to}
        </div>
        <div style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.58rem", letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 600 }}>
          {journey.line} · Est. {journey.duration}
        </div>
      </div>

      {/* Confidence Score */}
      <div style={{ padding: "24px 24px 0" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ color: "#E8524A", fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 8 }}>
              Transfer Confidence
            </div>
            <div style={{ marginTop: 10, fontSize: "0.6rem", color: "#8E8E9A", lineHeight: 1.5 }}>
              {journey.windows[selectedWindow].note}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentPct}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <ConfidenceRing percentage={currentPct} size="lg" animated={true} />
            </motion.div>
          </AnimatePresence>
        </div>

        <div style={{ height: 1, backgroundColor: "#EBEBEF", marginTop: 20 }} />
      </div>

      {/* Departure Windows */}
      <div style={{ padding: "20px 24px 0" }}>
        <div style={{ color: "#E8524A", fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 12 }}>
          Departure Windows
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {journey.windows.map((win, i) => {
            const wTier = getTier(win.pct);
            const isSelected = i === selectedWindow;
            return (
              <motion.button
                key={i}
                onClick={() => setSelectedWindow(i)}
                whileTap={{ scale: 0.97 }}
                style={{
                  flex: 1,
                  backgroundColor: isSelected ? "#2D8A97" : "#F7F7F9",
                  border: "none",
                  borderRadius: 4,
                  padding: "10px 4px",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                <div style={{ fontSize: "0.52rem", color: isSelected ? "rgba(255,255,255,0.7)" : "#8E8E9A", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>
                  {win.label}
                </div>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    color: isSelected ? "#fff" : "#2C2C3A",
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                  }}
                >
                  {win.pct}
                </div>
                <div style={{ fontSize: "0.46rem", color: isSelected ? "rgba(255,255,255,0.6)" : wTier.color, marginTop: 3, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  {wTier.short}
                </div>
              </motion.button>
            );
          })}
        </div>

        <div style={{ height: 1, backgroundColor: "#EBEBEF", marginTop: 20 }} />
      </div>

      {/* Route */}
      <div style={{ padding: "20px 24px 0" }}>
        <div style={{ color: "#E8524A", fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 14 }}>
          Route
        </div>
        <div>
          {journey.legs
            .filter((leg) => leg.type === "depart" || leg.type === "transfer" || leg.type === "arrive" || leg.type === "walk")
            .map((leg, i, filteredLegs) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 14,
                  paddingBottom: i < filteredLegs.length - 1 ? 0 : 0,
                }}
              >
                {/* Dot + line */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 4 }}>
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      backgroundColor: LEG_DOT_COLORS[leg.type] ?? "#D8D8DC",
                      flexShrink: 0,
                    }}
                  />
                  {i < filteredLegs.length - 1 && (
                    <div style={{ width: 1, height: 32, backgroundColor: leg.type === "transfer" ? "#F9B4B1" : "#EBEBEF", marginTop: 3 }} />
                  )}
                </div>

                <div style={{ flex: 1, paddingBottom: i < filteredLegs.length - 1 ? 10 : 0 }}>
                  <div style={{ fontSize: "0.78rem", fontWeight: 600, color: leg.type === "transfer" ? "#E8524A" : "#2C2C3A", letterSpacing: "-0.01em" }}>
                    {leg.station}
                  </div>
                  <div style={{ fontSize: "0.55rem", color: leg.type === "transfer" ? "#E8524A" : "#8E8E9A", marginTop: 2, letterSpacing: "0.02em" }}>
                    {leg.label}
                  </div>
                </div>

                {leg.type === "transfer" && (
                  <AlertTriangle size={12} color="#E8524A" style={{ marginTop: 4 }} />
                )}
                {leg.type === "depart" && (
                  <Clock size={11} color="#2D8A97" style={{ marginTop: 4 }} />
                )}
                {leg.type === "arrive" && (
                  <CheckCircle size={11} color="#2BA886" style={{ marginTop: 4 }} />
                )}
              </div>
            ))}
        </div>

        <div style={{ height: 1, backgroundColor: "#EBEBEF", marginTop: 20 }} />
      </div>

      {/* Key Risk */}
      <div style={{ padding: "20px 24px 28px" }}>
        <div style={{ color: "#E8524A", fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 12 }}>
          Key Risk
        </div>
        {(() => {
          const risk = journey.risks[0];
          const isHigh = risk.level === "high";
          return (
            <div
              style={{
                backgroundColor: "#F7F7F9",
                borderLeft: `3px solid ${isHigh ? "#E8524A" : "#D4952B"}`,
                borderRadius: "0 4px 4px 0",
                padding: "12px 14px",
                display: "flex",
                gap: 10,
                alignItems: "flex-start",
              }}
            >
              <AlertTriangle size={13} color={isHigh ? "#E8524A" : "#D4952B"} style={{ flexShrink: 0, marginTop: 1 }} />
              <p style={{ fontSize: "0.62rem", color: "#2C2C3A", lineHeight: 1.6, margin: 0 }}>{risk.text}</p>
            </div>
          );
        })()}

        {/* Transfer drill down CTA (only for route 2) */}
        {journeyIndex === 2 && (
          <motion.button
            onClick={() => onNavigate("transfer")}
            whileTap={{ scale: 0.98 }}
            style={{
              width: "100%",
              marginTop: 16,
              backgroundColor: "#E8524A",
              borderRadius: 4,
              padding: "14px 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: "pointer",
              border: "none",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Zap size={14} color="#fff" />
              <div style={{ textAlign: "left" }}>
                <div style={{ color: "#fff", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.04em" }}>Analyze Millbrae Transfer</div>
                <div style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.55rem", marginTop: 2 }}>Full risk analysis</div>
              </div>
            </div>
            <ChevronRight size={16} color="rgba(255,255,255,0.7)" />
          </motion.button>
        )}
      </div>
    </div>
  );
}
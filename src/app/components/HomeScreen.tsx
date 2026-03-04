import { motion } from "motion/react";
import { AlertTriangle, ChevronRight, Clock, TrendingUp } from "lucide-react";
import { getTier } from "./ConfidenceRing";
import { LineTag } from "./LineTag";

const ROUTES = [
  {
    id: 0,
    from: "Embarcadero",
    to: "Millbrae",
    system: "BART" as const,
    line: "Yellow",
    pct: 87,
    departsIn: 4,
    duration: "32 min",
    flags: 0,
    detail: "Direct · No transfer",
  },
  {
    id: 1,
    from: "SF 4th & King",
    to: "San Jose Diridon",
    system: "Caltrain" as const,
    line: "Baby Bullet",
    pct: 72,
    departsIn: 11,
    duration: "68 min",
    flags: 1,
    detail: "8 min walk · 1 transfer risk",
  },
  {
    id: 2,
    from: "Embarcadero",
    to: "Millbrae + Caltrain",
    system: "BART" as const,
    line: "Yellow + Caltrain",
    pct: 58,
    departsIn: 2,
    duration: "95 min",
    flags: 2,
    detail: "Tight transfer at Millbrae",
  },
];

interface HomeScreenProps {
  onSelectJourney: (id: number) => void;
  onNavigate: (screen: "home" | "journey" | "transfer" | "status") => void;
}

export function HomeScreen({ onSelectJourney, onNavigate }: HomeScreenProps) {
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
          padding: "24px 24px 32px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
          <div>
            <div style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 4 }}>
              LOCATION
            </div>
            <div style={{ color: "#fff", fontSize: "0.85rem", fontWeight: 600, letterSpacing: "-0.01em" }}>
              SF Financial District
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 4 }}>
              TIME
            </div>
            <div style={{ color: "#fff", fontSize: "0.85rem", fontWeight: 600 }}>
              8:42 AM
            </div>
          </div>
        </div>

        {/* Alert banner */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.35 }}
          style={{
            backgroundColor: "rgba(255,255,255,0.15)",
            borderRadius: 4,
            padding: "10px 12px",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <AlertTriangle size={14} color="rgba(255,255,255,0.85)" />
          <div>
            <div style={{ color: "#fff", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Elevated Corridor Stress
            </div>
            <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.58rem", marginTop: 1 }}>
              AM peak window · Muni L-Taraval delays
            </div>
          </div>
        </motion.div>
      </div>

      {/* Journey Options */}
      <div style={{ padding: "24px 24px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <span style={{ color: "#E8524A", fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" }}>
            Journey Options
          </span>
          <span style={{ fontSize: "0.55rem", color: "#8E8E9A", display: "flex", alignItems: "center", gap: 4, letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 600 }}>
            <TrendingUp size={10} />
            Reliability-ordered
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {ROUTES.map((route, i) => {
            const tier = getTier(route.pct);
            return (
              <motion.button
                key={route.id}
                onClick={() => onSelectJourney(route.id)}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 + 0.15, duration: 0.3 }}
                style={{
                  backgroundColor: "#FFFFFF",
                  borderTop: i === 0 ? "1px solid #EBEBEF" : "none",
                  borderBottom: "1px solid #EBEBEF",
                  padding: "18px 0",
                  textAlign: "left",
                  cursor: "pointer",
                  border: "none",
                  borderBlockEnd: "1px solid #EBEBEF",
                }}
              >
                {/* System + flags row */}
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <LineTag system={route.system} />
                  {route.flags > 0 && (
                    <span style={{ display: "flex", alignItems: "center", gap: 3, color: "#E8524A", fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                      <AlertTriangle size={9} />
                      {route.flags} risk{route.flags > 1 ? "s" : ""}
                    </span>
                  )}
                </div>

                {/* Route name + score */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "1.1rem", fontWeight: 400, color: "#2C2C3A", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
                      {route.from}
                      <span style={{ color: "#B0B0BA", margin: "0 8px" }}>→</span>
                      {route.to}
                    </div>
                    <div style={{ fontSize: "0.58rem", color: "#8E8E9A", marginTop: 6, letterSpacing: "0.02em" }}>{route.detail}</div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0, marginLeft: 12 }}>
                    <div style={{ textAlign: "right" }}>
                      <div
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "1.3rem",
                          fontWeight: 600,
                          color: tier.color,
                          letterSpacing: "-0.03em",
                          lineHeight: 1,
                        }}
                      >
                        {route.pct}
                      </div>
                      <div style={{ fontSize: "0.48rem", color: "#8E8E9A", marginTop: 2, letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600 }}>
                        {tier.short}
                      </div>
                    </div>
                    <ChevronRight size={16} color="#C8C8D0" />
                  </div>
                </div>

                {/* Bottom meta */}
                <div style={{ display: "flex", gap: 16, marginTop: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <Clock size={10} color="#8E8E9A" />
                    <span style={{ fontSize: "0.58rem", color: "#8E8E9A" }}>
                      Departs{" "}
                      <span style={{ fontWeight: 700, color: route.departsIn <= 3 ? "#E8524A" : "#2C2C3A" }}>
                        {route.departsIn} min
                      </span>
                    </span>
                  </div>
                  <span style={{ fontSize: "0.58rem", color: "#8E8E9A" }}>
                    {route.duration}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
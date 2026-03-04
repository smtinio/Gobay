import { motion } from "motion/react";
import { AlertTriangle, ArrowLeft, ArrowRight, CheckCircle, TrendingUp } from "lucide-react";
import { ConfidenceRing, getTier } from "./ConfidenceRing";
import { LineTag } from "./LineTag";

const ALTERNATIVES = [
  {
    label: "Next Caltrain",
    departsIn: "+36 min",
    pct: 94,
    note: "42 min buffer · Comfortable transfer",
    highlight: true,
  },
  {
    label: "Current + risk",
    departsIn: "Now",
    pct: 64,
    note: "6 min buffer · Tight window",
    highlight: false,
  },
];

interface TransferScreenProps {
  onNavigate: (screen: "home" | "journey" | "transfer" | "status") => void;
}

export function TransferScreen({ onNavigate }: TransferScreenProps) {
  const tier = getTier(64);

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
            Transfer Risk Analysis
          </span>
        </div>

        {/* Transfer diagram */}
        <div
          style={{
            backgroundColor: "rgba(255,255,255,0.12)",
            borderRadius: 4,
            padding: "14px 16px",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div style={{ flex: 1 }}>
            <LineTag system="BART" line="Yellow" />
            <div style={{ color: "#fff", fontSize: "0.8rem", fontWeight: 600, marginTop: 6 }}>Embarcadero</div>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.55rem", marginTop: 2, letterSpacing: "0.04em" }}>Arr. ~8:53 AM</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 4,
                backgroundColor: "#E8524A",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ArrowRight size={16} color="#fff" />
            </div>
            <div style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.5rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>
              Millbrae
            </div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: "rgba(255,255,255,0.7)",
                fontSize: "0.55rem",
                fontWeight: 600,
              }}
            >
              6 min
            </div>
          </div>

          <div style={{ flex: 1, textAlign: "right" }}>
            <LineTag system="Caltrain" line="Local" />
            <div style={{ color: "#fff", fontSize: "0.8rem", fontWeight: 600, marginTop: 6 }}>San Jose Diridon</div>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.55rem", marginTop: 2, letterSpacing: "0.04em" }}>Dep. ~8:59 AM</div>
          </div>
        </div>
      </div>

      {/* Score */}
      <div style={{ padding: "24px 24px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <ConfidenceRing percentage={64} size="md" animated={true} />

          <div style={{ flex: 1 }}>
            <div style={{ color: "#E8524A", fontSize: "0.55rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 6 }}>
              Transfer Confidence
            </div>
            <div style={{ fontSize: "1.1rem", fontWeight: 400, color: "#2C2C3A", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              Low Confidence
            </div>
            <div style={{ fontSize: "0.6rem", color: "#8E8E9A", marginTop: 8, lineHeight: 1.6 }}>
              <span style={{ fontWeight: 700, color: "#E8524A" }}>4 in 10 trips</span> miss this transfer during AM peak.
            </div>
          </div>
        </div>

        <div style={{ height: 1, backgroundColor: "#EBEBEF", marginTop: 24 }} />
      </div>

      {/* Recommendation */}
      <div style={{ padding: "20px 24px 0" }}>
        <div
          style={{
            backgroundColor: "#EEFBF5",
            borderLeft: "3px solid #2BA886",
            borderRadius: "0 4px 4px 0",
            padding: "14px 16px",
            display: "flex",
            gap: 10,
            alignItems: "flex-start",
          }}
        >
          <TrendingUp size={14} color="#2BA886" style={{ flexShrink: 0, marginTop: 1 }} />
          <div>
            <div style={{ fontSize: "0.62rem", fontWeight: 700, color: "#2BA886", letterSpacing: "0.04em", textTransform: "uppercase" }}>
              Recommended: Next Caltrain
            </div>
            <div style={{ fontSize: "0.58rem", color: "#2C2C3A", marginTop: 4, lineHeight: 1.6 }}>
              +36 min wait · 42-min buffer · 94% confidence. Highest reliability this morning.
            </div>
          </div>
        </div>

        <div style={{ height: 1, backgroundColor: "#EBEBEF", marginTop: 20 }} />
      </div>

      {/* Alternatives */}
      <div style={{ padding: "20px 24px 0" }}>
        <div style={{ color: "#E8524A", fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 14 }}>
          Alternative Scenarios
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {ALTERNATIVES.map((alt, i) => {
            const aTier = getTier(alt.pct);
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.08 }}
                style={{
                  borderBottom: "1px solid #EBEBEF",
                  padding: "14px 0",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                    {alt.highlight ? (
                      <CheckCircle size={12} color="#2BA886" />
                    ) : (
                      <AlertTriangle size={12} color="#D4952B" />
                    )}
                    <span style={{ fontSize: "0.7rem", fontWeight: 600, color: "#2C2C3A" }}>
                      {alt.label}
                    </span>
                  </div>
                  <div style={{ fontSize: "0.55rem", color: "#8E8E9A", marginLeft: 18, letterSpacing: "0.02em" }}>{alt.note}</div>
                </div>

                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "1.2rem",
                      fontWeight: 600,
                      color: aTier.color,
                      letterSpacing: "-0.03em",
                      lineHeight: 1,
                    }}
                  >
                    {alt.pct}
                  </div>
                  <div style={{ fontSize: "0.5rem", color: "#8E8E9A", marginTop: 3, letterSpacing: "0.08em", fontWeight: 600, textTransform: "uppercase" }}>{alt.departsIn}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Key Risk */}
      <div style={{ padding: "20px 24px 28px" }}>
        <div style={{ color: "#E8524A", fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 12 }}>
          Key Risk
        </div>
        <div
          style={{
            backgroundColor: "#F7F7F9",
            borderLeft: "3px solid #E8524A",
            borderRadius: "0 4px 4px 0",
            padding: "12px 14px",
            display: "flex",
            gap: 10,
            alignItems: "flex-start",
          }}
        >
          <AlertTriangle size={13} color="#E8524A" style={{ flexShrink: 0, marginTop: 1 }} />
          <p style={{ fontSize: "0.62rem", color: "#2C2C3A", lineHeight: 1.6, margin: 0 }}>
            Transfer buffer at Millbrae is only 6 min. BART delay &gt;3.5 min results in missed Caltrain — next service is +36 min later.
          </p>
        </div>
      </div>
    </div>
  );
}
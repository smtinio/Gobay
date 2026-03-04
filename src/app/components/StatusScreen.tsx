import { motion } from "motion/react";
import { AlertTriangle, CheckCircle, Clock, RefreshCw, Signal, XCircle } from "lucide-react";

const SYSTEMS = [
  {
    name: "BART",
    overall: 89,
    status: "good" as const,
    statusLabel: "Normal",
    color: "#2D8A97",
    totalLines: 5,
    affectedLines: 0,
    alerts: [],
  },
  {
    name: "Muni",
    overall: 68,
    status: "degraded" as const,
    statusLabel: "Degraded",
    color: "#E8524A",
    totalLines: 5,
    affectedLines: 3,
    alerts: [
      {
        severity: "critical",
        title: "L-Taraval Signal Failure",
        body: "Equipment issue at West Portal Junction. All L trains delayed 8-12 min. Crews on-site.",
        time: "8:31 AM",
      },
      {
        severity: "moderate",
        title: "N-Judah Bunching",
        body: "Three N trains bunching near Embarcadero. 7-min gap to next service westbound.",
        time: "8:18 AM",
      },
    ],
  },
  {
    name: "Caltrain",
    overall: 82,
    status: "good" as const,
    statusLabel: "Normal",
    color: "#2D8A97",
    totalLines: 5,
    affectedLines: 0,
    alerts: [],
  },
];

interface StatusScreenProps {
  onNavigate: (screen: "home" | "journey" | "transfer" | "status") => void;
}

export function StatusScreen({ onNavigate }: StatusScreenProps) {
  const totalAlerts = SYSTEMS.reduce((sum, sys) => sum + sys.alerts.length, 0);

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
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div>
            <div style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 4 }}>
              System Status
            </div>
            <div style={{ color: "#fff", fontSize: "1.1rem", fontWeight: 400, letterSpacing: "-0.02em" }}>
              SF-South Bay Corridor
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 5, color: "rgba(255,255,255,0.65)", fontSize: "0.55rem", fontWeight: 600, letterSpacing: "0.06em" }}>
            <RefreshCw size={10} />
            <span>8:42 AM</span>
          </div>
        </div>

        {/* Overall health */}
        <div
          style={{
            backgroundColor: "rgba(255,255,255,0.12)",
            borderRadius: 4,
            padding: "14px 16px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Corridor Health
            </span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: "#fff",
                fontSize: "0.85rem",
                fontWeight: 600,
                letterSpacing: "-0.02em",
              }}
            >
              77%
            </span>
          </div>
          <div style={{ height: 4, backgroundColor: "rgba(255,255,255,0.15)", borderRadius: 2, overflow: "hidden" }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "77%" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              style={{
                height: "100%",
                backgroundColor: "rgba(255,255,255,0.9)",
                borderRadius: 2,
              }}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
            <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.52rem", display: "flex", alignItems: "center", gap: 4 }}>
              <AlertTriangle size={9} />
              Moderate Degradation
            </span>
            <span style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.52rem" }}>
              {totalAlerts} active alert{totalAlerts !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </div>

      {/* Active Alerts */}
      {totalAlerts > 0 && (
        <div style={{ padding: "24px 24px 0" }}>
          <div style={{ color: "#E8524A", fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 14 }}>
            Active Alerts
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {SYSTEMS.flatMap((sys) =>
              sys.alerts.map((alert, i) => {
                const isCritical = alert.severity === "critical";
                return (
                  <motion.div
                    key={`${sys.name}-${i}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 + 0.15 }}
                    style={{
                      backgroundColor: "#F7F7F9",
                      borderLeft: `3px solid ${isCritical ? "#E8524A" : "#D4952B"}`,
                      borderRadius: "0 4px 4px 0",
                      padding: "14px 16px",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        {isCritical ? (
                          <XCircle size={13} color="#E8524A" />
                        ) : (
                          <AlertTriangle size={13} color="#D4952B" />
                        )}
                        <span style={{ fontSize: "0.68rem", fontWeight: 700, color: "#2C2C3A" }}>{alert.title}</span>
                      </div>
                      <span
                        style={{
                          backgroundColor: sys.color,
                          color: "#fff",
                          fontSize: "0.48rem",
                          fontWeight: 700,
                          padding: "2px 7px",
                          borderRadius: 3,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                        }}
                      >
                        {sys.name}
                      </span>
                    </div>
                    <div style={{ fontSize: "0.58rem", color: "#5C5C6A", lineHeight: 1.6, paddingLeft: 21 }}>
                      {alert.body}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, paddingLeft: 21, marginTop: 6 }}>
                      <Clock size={9} color="#8E8E9A" />
                      <span style={{ fontSize: "0.5rem", color: "#8E8E9A", letterSpacing: "0.04em" }}>{alert.time}</span>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>

          <div style={{ height: 1, backgroundColor: "#EBEBEF", marginTop: 20 }} />
        </div>
      )}

      {/* Systems */}
      <div style={{ padding: "20px 24px 0" }}>
        <div style={{ color: "#E8524A", fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 14 }}>
          Systems
        </div>

        {SYSTEMS.map((sys, si) => (
          <div
            key={sys.name}
            style={{
              borderBottom: "1px solid #EBEBEF",
              padding: "16px 0",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 4,
                    backgroundColor: sys.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Signal size={15} color="#fff" />
                </div>
                <div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "#2C2C3A", letterSpacing: "-0.01em" }}>{sys.name}</div>
                  <span
                    style={{
                      fontSize: "0.52rem",
                      fontWeight: 700,
                      color: sys.status === "good" ? "#2BA886" : sys.status === "degraded" ? "#D4952B" : "#E8524A",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    {sys.statusLabel}
                  </span>
                </div>
              </div>

              <div style={{ textAlign: "right" }}>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "1.3rem",
                    fontWeight: 600,
                    color: sys.overall >= 80 ? "#2BA886" : sys.overall >= 65 ? "#D4952B" : "#E8524A",
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                  }}
                >
                  {sys.overall}
                </div>
                <div style={{ fontSize: "0.48rem", color: "#8E8E9A", marginTop: 3, letterSpacing: "0.1em", fontWeight: 600, textTransform: "uppercase" }}>on-time %</div>
              </div>
            </div>

            {/* Line summary */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 10, paddingLeft: 44 }}>
              <span style={{ fontSize: "0.58rem", color: "#8E8E9A", letterSpacing: "0.02em" }}>
                {sys.totalLines} lines
              </span>
              {sys.affectedLines > 0 ? (
                <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.58rem", fontWeight: 700, color: "#D4952B" }}>
                  <AlertTriangle size={10} />
                  {sys.affectedLines} affected
                </span>
              ) : (
                <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.58rem", fontWeight: 600, color: "#2BA886" }}>
                  <CheckCircle size={10} />
                  All nominal
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div style={{ height: 24 }} />
    </div>
  );
}
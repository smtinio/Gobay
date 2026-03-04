import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeftRight, Home, Map, Signal } from "lucide-react";
import { HomeScreen } from "./components/HomeScreen";
import { JourneyScreen } from "./components/JourneyScreen";
import { TransferScreen } from "./components/TransferScreen";
import { StatusScreen } from "./components/StatusScreen";

type Screen = "home" | "journey" | "transfer" | "status";

const NAV_ITEMS: { id: Screen; icon: React.FC<any>; label: string }[] = [
  { id: "home", icon: Home, label: "NOW" },
  { id: "journey", icon: Map, label: "JOURNEY" },
  { id: "transfer", icon: ArrowLeftRight, label: "TRANSFER" },
  { id: "status", icon: Signal, label: "STATUS" },
];

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [journeyIndex, setJourneyIndex] = useState(0);

  function handleSelectJourney(id: number) {
    setJourneyIndex(id);
    setScreen("journey");
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#E8ECEF",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 16px",
        fontFamily: "'Instrument Sans', sans-serif",
      }}
    >
      {/* Desktop label */}
      <div
        style={{
          position: "fixed",
          top: 20,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          gap: 10,
          zIndex: 10,
        }}
      >
        <span style={{ color: "#2C2C3A", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>
          GoBay
        </span>
        <span
          style={{
            color: "#8E8E9A",
            fontSize: "0.58rem",
            fontWeight: 500,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          SF-South Bay Transit Reliability
        </span>
      </div>

      {/* Phone frame */}
      <div
        style={{
          width: 390,
          height: 844,
          borderRadius: 50,
          background: "#FFFFFF",
          boxShadow:
            "0 0 0 1px rgba(0,0,0,0.06), 0 40px 80px rgba(0,0,0,0.12), 0 16px 32px rgba(0,0,0,0.08)",
          overflow: "hidden",
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Notch */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: 120,
            height: 34,
            backgroundColor: "#FFFFFF",
            borderRadius: "0 0 20px 20px",
            zIndex: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
          }}
        >
          <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#EBEBEF" }} />
          <div style={{ width: 48, height: 6, borderRadius: 3, backgroundColor: "#EBEBEF" }} />
        </div>

        {/* Status bar */}
        <div
          style={{
            height: 44,
            backgroundColor: "#2D8A97",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            padding: "0 28px 8px",
            flexShrink: 0,
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.95)", fontSize: "0.72rem", fontWeight: 600 }}>8:42</span>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 1.5, height: 10 }}>
              {[4, 6, 8, 10].map((h, i) => (
                <div
                  key={i}
                  style={{
                    width: 3,
                    height: h,
                    borderRadius: 1,
                    backgroundColor: i < 3 ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.4)",
                  }}
                />
              ))}
            </div>
            <div
              style={{
                width: 22,
                height: 11,
                border: "1.5px solid rgba(255,255,255,0.7)",
                borderRadius: 3,
                position: "relative",
                display: "flex",
                alignItems: "center",
                padding: "1.5px",
              }}
            >
              <div
                style={{ width: "80%", height: "100%", backgroundColor: "rgba(255,255,255,0.9)", borderRadius: 1.5 }}
              />
              <div
                style={{
                  position: "absolute",
                  right: -4,
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 2.5,
                  height: 5,
                  backgroundColor: "rgba(255,255,255,0.5)",
                  borderRadius: "0 1px 1px 0",
                }}
              />
            </div>
          </div>
        </div>

        {/* Screen content */}
        <div style={{ flex: 1, overflow: "hidden", position: "relative", display: "flex", flexDirection: "column" }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={screen}
              initial={{ opacity: 0, y: screen === "home" ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}
            >
              {screen === "home" && (
                <HomeScreen onSelectJourney={handleSelectJourney} onNavigate={setScreen} />
              )}
              {screen === "journey" && (
                <JourneyScreen key={journeyIndex} journeyIndex={journeyIndex} onNavigate={setScreen} />
              )}
              {screen === "transfer" && <TransferScreen onNavigate={setScreen} />}
              {screen === "status" && <StatusScreen onNavigate={setScreen} />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Nav */}
        <div
          style={{
            height: 56,
            backgroundColor: "#FFFFFF",
            borderTop: "1px solid #EBEBEF",
            display: "flex",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          {NAV_ITEMS.map((item) => {
            const isActive = screen === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setScreen(item.id)}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 3,
                  cursor: "pointer",
                  border: "none",
                  backgroundColor: "transparent",
                  padding: "4px 0",
                }}
              >
                <Icon
                  size={16}
                  color={isActive ? "#E8524A" : "#B0B0BA"}
                  strokeWidth={isActive ? 2.2 : 1.6}
                />
                <span
                  style={{
                    fontSize: "0.5rem",
                    fontWeight: 700,
                    color: isActive ? "#E8524A" : "#B0B0BA",
                    letterSpacing: "0.1em",
                    fontFamily: "'Instrument Sans', sans-serif",
                  }}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Home indicator */}
        <div
          style={{
            height: 22,
            backgroundColor: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ width: 120, height: 5, borderRadius: 3, backgroundColor: "#EBEBEF" }} />
        </div>
      </div>
    </div>
  );
}
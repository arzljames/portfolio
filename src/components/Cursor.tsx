import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { useEffect, useState } from "react";

type Mode = "default" | "hover" | "label" | "text" | "hidden";

const INTERACTIVE = "a, button, [role='button'], label, select, summary";
const TEXT = "input:not([type='checkbox']):not([type='radio']), textarea, [contenteditable='true']";

/** Custom cursor on fine pointers only; touch devices and reduced motion keep the native one. */
function useCursorEnabled() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    const update = () => setEnabled(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("custom-cursor", enabled);
  }, [enabled]);

  return enabled;
}

export function Cursor() {
  const enabled = useCursorEnabled();
  const [mode, setMode] = useState<Mode>("hidden");
  const [label, setLabel] = useState("");
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // The ring trails the dot, and stretches along its direction of travel.
  const ringX = useSpring(x, { stiffness: 350, damping: 30, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 350, damping: 30, mass: 0.6 });
  const vx = useVelocity(ringX);
  const vy = useVelocity(ringY);
  const speed = useTransform([vx, vy], ([a, b]: number[]) => Math.hypot(a, b));
  const rotate = useTransform([vx, vy], ([a, b]: number[]) => (Math.atan2(b, a) * 180) / Math.PI);
  const scaleX = useTransform(speed, [0, 3000], [1, 1.45], { clamp: true });
  const scaleY = useTransform(speed, [0, 3000], [1, 0.7], { clamp: true });

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);

      const target = e.target instanceof Element ? e.target : null;
      const labelled = target?.closest<HTMLElement>("[data-cursor]");
      if (labelled) {
        setLabel(labelled.dataset.cursor ?? "");
        setMode("label");
      } else if (target?.closest(TEXT)) {
        setMode("text");
      } else if (target?.closest(INTERACTIVE)) {
        setMode("hover");
      } else {
        setMode("default");
      }
    };
    const onLeave = () => setMode("hidden");
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("pointermove", onMove);
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const ring = {
    default: { size: 36, opacity: 1, fill: "transparent", border: "var(--line-strong)" },
    hover: { size: 60, opacity: 1, fill: "var(--accent-soft)", border: "var(--accent)" },
    label: { size: 92, opacity: 1, fill: "var(--accent)", border: "var(--accent)" },
    text: { size: 36, opacity: 0, fill: "transparent", border: "var(--line-strong)" },
    hidden: { size: 36, opacity: 0, fill: "transparent", border: "var(--line-strong)" },
  }[mode];

  return (
    <div className="pointer-events-none fixed inset-0 z-[100]" aria-hidden="true">
      {/* Trailing ring */}
      <motion.div className="absolute top-0 left-0" style={{ x: ringX, y: ringY }}>
        <div className="-translate-x-1/2 -translate-y-1/2">
          <motion.div
            className="rounded-full border"
            style={{ rotate, scaleX, scaleY }}
            animate={{
              width: ring.size,
              height: ring.size,
              opacity: ring.opacity,
              backgroundColor: ring.fill,
              borderColor: ring.border,
              scale: pressed ? 0.8 : 1,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
          />
        </div>
        <AnimatePresence>
          {mode === "label" && (
            <motion.span
              key={label}
              className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 text-xs font-bold tracking-[0.15em] whitespace-nowrap text-white uppercase"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.2 }}
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Precise dot */}
      <motion.div className="absolute top-0 left-0" style={{ x, y }}>
        <motion.div
          className="size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
          animate={{
            scale: mode === "hidden" || mode === "text" || mode === "label" ? 0 : mode === "hover" ? 0.6 : 1,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </motion.div>
    </div>
  );
}

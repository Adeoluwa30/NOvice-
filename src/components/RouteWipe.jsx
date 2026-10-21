import { motion, useReducedMotion } from "motion/react";

/**
 * A single sheet that slides up and away on every route change, carrying the
 * name of the page you just landed on. Mounted with a `key` so each navigation
 * replays it.
 */
export default function RouteWipe({ label }) {
  const reduce = useReducedMotion();
  if (reduce) return null;

  return (
    <motion.div
      className="route-wipe"
      aria-hidden="true"
      initial={{ y: "0%" }}
      animate={{ y: "-100%" }}
      transition={{ duration: 0.72, ease: [0.76, 0, 0.24, 1] }}
    >
      <span className="route-wipe__line" />
      <span className="route-wipe__label">{label}</span>
      <span className="route-wipe__mark">✳</span>
    </motion.div>
  );
}

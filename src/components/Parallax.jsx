import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export default function Parallax({
  src,
  alt,
  className = "",
  amount = 40,
  loading = "lazy",
  priority = false,
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-amount, amount]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);

  return (
    <div className={`parallax ${className}`} ref={ref}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y, scale }}
        loading={priority ? "eager" : loading}
        fetchPriority={priority ? "high" : "auto"}
        draggable="false"
      />
    </div>
  );
}

import { useRef } from "react";

export default function Magnetic({ children, strength = 0.22, className = "" }) {
  const ref = useRef(null);

  const handleMove = (event) => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const rect = node.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    node.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = "translate3d(0, 0, 0)";
  };

  return (
    <span
      className={`magnetic ${className}`}
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onBlur={reset}
    >
      {children}
    </span>
  );
}

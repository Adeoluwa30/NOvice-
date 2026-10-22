export default function Marquee({
  children,
  reverse = false,
  speed = 38,
  className = "",
  pauseOnHover = false,
}) {
  const group = (
    <span className="marquee__group" aria-hidden="true">
      {children}
    </span>
  );

  return (
    <div
      className={`marquee ${reverse ? "marquee--reverse" : ""} ${
        pauseOnHover ? "marquee--hoverable" : ""
      } ${className}`}
      style={{
        "--marquee-duration": `${speed}s`,
        "--marquee-direction": reverse ? "reverse" : "normal",
      }}
    >
      <div className="marquee__track">
        <span className="marquee__group">{children}</span>
        {group}
      </div>
    </div>
  );
}

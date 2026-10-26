/**
 * SecureComply mark: a shield with a check, drawn in currentColor so it takes
 * the theme's contrast colour. It is a placeholder standing in for the real
 * logo, which was not available when the card was built; swap the SVG (or drop
 * the real file in public/assets/brands/) when it lands.
 */
export default function SecureComplyMark({ size = 76, className = "" }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M32 4.5 56 13v19.4C56 47.5 46.4 56.9 32 60.5 17.6 56.9 8 47.5 8 32.4V13L32 4.5Z"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <path
        d="M20.5 32.6 28.4 40.5 43.5 24.6"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="square"
      />
    </svg>
  );
}

/**
 * Hover text that rolls.
 *
 * Every character is a clipped mask. The glyph itself is drawn twice from the
 * character's data-char attribute, once by ::before and once by an absolute
 * ::after parked one line below; hovering the link or button slides both up by
 * one line, so the second copy arrives exactly as the first leaves. The
 * per-character delay (--i, set inline) turns the swap into a short wave.
 *
 * The duplicate lives in pseudo-elements on purpose: the DOM carries the label
 * once (the screen-reader copy), so selecting or copying the page never picks
 * up doubled or letter-spaced text. The visual layer is aria-hidden.
 *
 * Motion is driven from CSS by the parent's :hover (see the .stext rules in
 * main.css), so this component only renders structure. Pointer-less devices
 * never hover, and the first copy simply stays put.
 */
export default function SlideText({ children, mode = "char", className = "", ...rest }) {
  const text = Array.isArray(children) ? children.join("") : String(children ?? "");
  const units = mode === "char" ? Array.from(text) : [text];

  return (
    <span className={`stext ${className}`.trim()} {...rest}>
      <span className="sr-only">{text}</span>
      <span className="stext__vis" aria-hidden="true">
        {units.map((unit, i) =>
          unit === " " ? (
            <span className="stext__space" key={`space-${i}`} data-char=" " />
          ) : (
            <span
              className="stext__ch"
              key={`${unit}-${i}`}
              data-char={unit}
              style={{ "--i": i }}
            />
          )
        )}
      </span>
    </span>
  );
}

import Logo from "./Logo";
import { site } from "../site";

/**
 * The motion placeholder: a thumbnail frame in which the AdE mark spins into
 * place and the name types itself out underneath, then the frame clears and
 * plays again, like a title card on loop. Pure CSS (see `.sig` in main.css),
 * and decorative, so it is hidden from assistive tech; the card it sits in
 * carries the real heading. Reduced motion gets the finished frame.
 */
export default function SignatureMark() {
  const letters = Array.from(site.name);

  return (
    <span className="sig" aria-hidden="true">
      <span className="sig__logo">
        <Logo size={64} title="" />
      </span>
      <span className="sig__name">
        {letters.map((letter, i) => (
          <span className="sig__char" style={{ "--i": i }} key={`${letter}-${i}`}>
            {letter === " " ? " " : letter}
          </span>
        ))}
      </span>
      <span className="sig__rule" />
      <span className="sig__caption">Motion · Coming soon</span>
      <span className="sig__progress" />
    </span>
  );
}

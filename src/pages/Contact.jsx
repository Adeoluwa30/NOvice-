import { useState } from "react";
import Marquee from "../components/Marquee";
import Reveal from "../components/Reveal";
import Magnetic from "../components/Magnetic";
import { faqs, site } from "../site";
import { usePageMeta } from "../hooks/usePageMeta";

export default function Contact() {
  usePageMeta(
    "Contact",
    "Start a project, ask a question or say hello — contact Adeoluwa Adeoye, interface & experience designer."
  );

  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch (error) {
      window.location.href = `mailto:${site.email}`;
    }
  };

  return (
    <>
      <header className="page-head page-head--contact">
        <div className="shell">
          <div className="page-head__top">
            <p className="eyebrow">(Contact)</p>
            <p className="eyebrow">
              <span className="dot" /> {site.availability}
            </p>
          </div>
          <Reveal as="h1" className="page-head__title">
            Let&apos;s build, and
            <br />
            <span className="serif">create</span> together.
          </Reveal>
          <Reveal as="p" className="page-head__lede" delay={100}>
            Have a product in mind, a problem worth solving, or a role to fill? Tell me about it.
            I read everything, and I like a good brief.
          </Reveal>

          <Reveal className="contact-email-row" delay={160}>
            <a className="contact-email" href={`mailto:${site.email}`} data-cursor="Email">
              {site.email}
            </a>
            <button type="button" className="copy-btn" onClick={copyEmail} data-cursor="Copy">
              {copied ? "Copied ↗" : "Copy email"}
            </button>
          </Reveal>
        </div>
      </header>

      <section className="contact-body section">
        <div className="shell">
          <div className="contact-grid">
            <Reveal className="contact-col">
              <p className="eyebrow">(Elsewhere)</p>
              <div className="contact-links">
                {site.socials.map((social) => (
                  <a key={social.label} href={social.href} target="_blank" rel="noreferrer">
                    {social.label} <span>↗</span>
                  </a>
                ))}
                <a href={`mailto:${site.email}`}>
                  Email <span>↗</span>
                </a>
              </div>
            </Reveal>

            <Reveal className="contact-col" delay={80}>
              <p className="eyebrow">(Good to know)</p>
              <dl className="contact-facts">
                <div>
                  <dt>Availability</dt>
                  <dd>{site.availabilityNote}</dd>
                </div>
                <div>
                  <dt>Response</dt>
                  <dd>Usually within a couple of days.</dd>
                </div>
                <div>
                  <dt>Based in</dt>
                  <dd>
                    {site.location} — working with teams anywhere.
                  </dd>
                </div>
              </dl>
            </Reveal>

            <Reveal className="contact-col contact-col--cta" delay={140}>
              <p className="eyebrow">(Prefer a call?)</p>
              <p className="contact-col__note">
                Send a short note with what you&apos;re building and where you are in the process.
                I&apos;ll reply with times.
              </p>
              <Magnetic>
                <a className="btn btn--solid" href={`mailto:${site.email}`} data-cursor="Say hi">
                  <span>Start a conversation</span>
                  <span className="btn__arrow">↗</span>
                </a>
              </Magnetic>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="faq section">
        <div className="shell">
          <div className="faq__head">
            <Reveal as="p" className="eyebrow">
              (FAQ)
            </Reveal>
            <Reveal as="h2" className="faq__title" delay={60}>
              Questions? <span className="serif">Answered.</span>
            </Reveal>
            <Reveal as="p" className="faq__note" delay={120}>
              For your information.
            </Reveal>
          </div>

          <div className="faq__list">
            {faqs.map((item, i) => (
              <Reveal key={item.q} delay={i * 60}>
                <details className="faq__item">
                  <summary>
                    <span className="faq__q">{item.q}</span>
                    <span className="faq__icon" aria-hidden="true" />
                  </summary>
                  <div className="faq__answer">
                    <p>{item.a}</p>
                  </div>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-band">
        <Marquee speed={30}>
          <span>Make contact</span>
          <span className="asterisk">✳</span>
          <span className="serif">Make contact</span>
          <span className="asterisk">✳</span>
        </Marquee>
      </section>
    </>
  );
}

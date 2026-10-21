import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Marquee from "../components/Marquee";
import Reveal from "../components/Reveal";
import Magnetic from "../components/Magnetic";
import { faqs, site } from "../site";
import { usePageMeta } from "../hooks/usePageMeta";

const topics = [
  {
    id: "project",
    label: "A project",
    text: "Hi Adeoluwa, I'd like to talk about a product. Here is what we are building: ",
  },
  {
    id: "freelance",
    label: "Freelance",
    text: "Hi Adeoluwa, are you open to a freelance engagement? The scope is: ",
  },
  {
    id: "role",
    label: "Full-time role",
    text: "Hi Adeoluwa, we are hiring a product designer. Here is the team and the work: ",
  },
  {
    id: "hello",
    label: "Just saying hi",
    text: "Hi Adeoluwa, ",
  },
];

export default function Contact() {
  usePageMeta(
    "Contact",
    "Start a project, ask a question or just say hello. Contact Adeoluwa Adeoye, interface & experience designer."
  );

  const [copied, setCopied] = useState(false);
  const [topic, setTopic] = useState(topics[0]);
  const [message, setMessage] = useState(topics[0].text);
  const [openFaq, setOpenFaq] = useState(0);

  const whatsappHref = useMemo(() => {
    const digits = (site.whatsapp || "").replace(/\D/g, "");
    if (!digits) return null;
    return `https://wa.me/${digits}?text=${encodeURIComponent(message.trim())}`;
  }, [message]);

  const mailHref = `mailto:${site.email}?subject=${encodeURIComponent(
    `Portfolio enquiry: ${topic.label}`
  )}&body=${encodeURIComponent(message.trim())}`;

  const sendHref = whatsappHref || mailHref;

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch (error) {
      window.location.href = `mailto:${site.email}`;
    }
  };

  const chooseTopic = (next) => {
    setTopic(next);
    setMessage(next.text);
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
        <div className="shell contact-layout">
          <Reveal className="contact-chat">
            <div className="contact-chat__head">
              <p className="eyebrow">(Direct message)</p>
              <h2 className="contact-chat__title">
                Start it in
                <br />
                <span className="serif">a chat.</span>
              </h2>
              <p className="contact-chat__note">
                Pick a reason, write the first line, and the message opens ready to send. No form,
                no five-field briefing.
              </p>
            </div>

            <div className="chat" aria-label="Message composer">
              <div className="chat__head">
                <span className="chat__avatar" aria-hidden="true">
                  <span className="chat__mark">✳</span>
                  <span className="chat__status" />
                </span>
                <div>
                  <p className="chat__name">Adeoluwa Adeoye</p>
                  <p className="chat__meta">Usually replies within a day</p>
                </div>
                <span className="chat__channel">{whatsappHref ? "WhatsApp" : "Email"}</span>
              </div>

              <div className="chat__body">
                <p className="chat__bubble chat__bubble--in">
                  Hey, thanks for stopping by. What brings you here?
                  <span className="chat__time">now</span>
                </p>

                <div className="chat__chips" role="group" aria-label="Reason for your message">
                  {topics.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className={`chat__chip ${topic.id === item.id ? "is-active" : ""}`}
                      onClick={() => chooseTopic(item)}
                      aria-pressed={topic.id === item.id}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                {message.trim() !== topic.text.trim() && (
                  <p className="chat__bubble chat__bubble--out">
                    {message}
                    <span className="chat__time">
                      now <span className="chat__ticks" aria-hidden="true">✓✓</span>
                    </span>
                  </p>
                )}
              </div>

              <div className="chat__composer">
                <label className="sr-only" htmlFor="chat-message">
                  Your message
                </label>
                <textarea
                  id="chat-message"
                  className="chat__input"
                  value={message}
                  rows={2}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Write your first line"
                />
                <a className="chat__send" href={sendHref} data-cursor="Send">
                  <span>{whatsappHref ? "WhatsApp" : "Email"}</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
              <p className="chat__hint">
                {whatsappHref
                  ? "Opens WhatsApp with your message already written."
                  : "Opens your mail app with your message already written."}
              </p>
            </div>
          </Reveal>

          <aside className="contact-side">
            <Reveal className="contact-col">
              <p className="eyebrow">(Elsewhere)</p>
              <div className="contact-links">
                {site.socials.map((social) => (
                  <a key={social.label} href={social.href} target="_blank" rel="noreferrer">
                    {social.label} <span aria-hidden="true">↗</span>
                  </a>
                ))}
                <a href={`mailto:${site.email}`}>
                  Email <span aria-hidden="true">↗</span>
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
                  <dd>{site.location}, working with teams anywhere.</dd>
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
                  <span className="btn__arrow" aria-hidden="true">
                    ↗
                  </span>
                </a>
              </Magnetic>
            </Reveal>
          </aside>
        </div>
      </section>

      <section className="faq section">
        <div className="shell faq__layout">
          <div className="faq__head">
            <Reveal as="p" className="eyebrow">
              (FAQ)
            </Reveal>
            <Reveal as="h2" className="faq__title" delay={60}>
              Questions? <span className="serif">Answered.</span>
            </Reveal>
            <Reveal as="p" className="faq__note" delay={120}>
              Four things people usually ask before we start.
            </Reveal>
          </div>

          <div className="faq__list">
            {faqs.map((item, i) => {
              const open = openFaq === i;
              return (
                <Reveal key={item.q} delay={i * 60}>
                  <div className={`faq__item ${open ? "is-open" : ""}`}>
                    <button
                      type="button"
                      className="faq__trigger"
                      aria-expanded={open}
                      onClick={() => setOpenFaq(open ? -1 : i)}
                    >
                      <span className="faq__n">0{i + 1}</span>
                      <span className="faq__q">{item.q}</span>
                      <span className="faq__icon" aria-hidden="true" />
                    </button>

                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          className="faq__answer"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <p>{item.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              );
            })}
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

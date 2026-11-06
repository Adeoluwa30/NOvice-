const img = (project, name) => `/assets/${project}/${name}.webp`;

// Every case study belongs to a track, which decides the Projects tab it
// appears under: "product" (the default) or "motion". Both use the same case
// study page, so a motion piece gets the brief, the process, the tools and the
// thinking, not just a video.
//
// Motion case studies can use two extra fields:
// - `tools`: what it was made in, e.g. ["Figma", "After Effects"]. Shown in the
//   case study header. Any project can have it.
// - a chapter `video` in place of `image`:
//     video: {
//       src: "/assets/<project>/<name>.mp4",    // H.264, ideally under 8 MB
//       webm: "/assets/<project>/<name>.webm",  // optional, smaller
//       poster: "/assets/<project>/<name>.webp", // a still frame
//       width: 1920,
//       height: 1080,
//     },
//   It plays muted and looped while it is on screen. Videos must be
//   self-hosted: the site's security policy blocks YouTube and Vimeo embeds.

const catalogue = [
  {
    slug: "chef4me-user",
    index: "01",
    title: "Chef4me User",
    display: "Chef4me",
    displayAccent: "User",
    kind: "Food · Mobile",
    tone: "red",
    discipline: "Product Design",
    year: "2025",
    client: "Chef4me",
    industry: "Food & Hospitality",
    role: "UI/UX Design, Design System",
    platform: "iOS & Android",
    scope: "End-to-end product design",
    tagline:
      "A mobile app that lets anyone hire a private chef, order chef-made meals or request a custom quote, all in one place.",
    summary:
      "Hiring a private chef or ordering a custom, chef-made meal usually means long chats, unclear pricing and a lot of back-and-forth. Chef4me set out to connect people directly with chefs, and the user app had to carry the hard parts for them: custom quotes, single and multi-day hires, and three different ways to get the food.",
    challenge:
      "Hiring, ordering and quoting are three different jobs. They had to live in one app without it feeling like three apps stitched together.",
    cover: img("chef-user", "hero"),
    thumb: "/assets/thumbs/chef-user.webp",
    chapters: [
      {
        eyebrow: "Trust",
        title: "Designing for trust",
        body:
          "Hiring a chef means letting a stranger into your home, or trusting them with your food. So the chef profile works like a storefront: verified reviews, visible ratings, a clear About section and enough of the chef's personality that the choice feels personal rather than random.",
        images: [
          { src: img("chef-user", "profile-map"), alt: "Chef4me map view with chefs nearby", layout: "tall" },
          { src: img("chef-user", "profile-chef"), alt: "Chef4me chef profile screen", layout: "tall" },
        ],
        note: "Find chefs by cuisine and distance, then meet the person behind the menu.",
      },
      {
        eyebrow: "Complexity",
        title: "A wizard, not a form",
        body:
          "A custom order needs a lot of detail. Instead of one long form, the quote request is a step-by-step wizard: event details first, then food preferences. Each screen asks for one kind of decision, so the whole request feels lighter and is easier to finish.",
        image: img("chef-user", "wizard"),
        alt: "Chef4me quote wizard with dish and dietary preference selection",
        note: "Guest ages, dishes and dietary needs, one decision at a time.",
      },
      {
        eyebrow: "Logic",
        title: "Hiring isn't one-size-fits-all",
        body:
          "A one-day hire needs a date, a time and a guest count. A multi-day hire needs a weekly schedule, repeat menus and more. I designed a separate path for each, so the app only ever asks for what that event actually needs.",
        image: img("chef-user", "quote"),
        alt: "Chef4me event time and guest count selection cards",
        note: "Short for simple hires, complete for complex ones.",
      },
      {
        eyebrow: "Logistics",
        title: "Checkout without the guesswork",
        body:
          "Home service, dispatch and pickup are genuinely different jobs. Choosing the method before checkout, instead of folding it into an address field, removes ambiguous addresses and surprise fees at the final step.",
        image: img("chef-user", "checkout"),
        alt: "Chef4me checkout and delivery selection screens",
        note: "Home service, dispatch or pickup, chosen before the basket is confirmed.",
      },
    ],
    quote:
      "The work was making three products feel like one. Hiring, ordering and quoting now share one app, one vocabulary and one set of components.",
    outcomes: [
      {
        label: "Logistics",
        text: "Streamlined checkout by separating Dispatch and Pickup workflows, reducing user error at the final step.",
      },
      {
        label: "Flexibility",
        text: "A custom quoting system that lets chefs monetise unique services beyond standard menus.",
      },
      {
        label: "Scalability",
        text: "A modular design system that supports rapid feature expansion as the product grows.",
      },
    ],
    faqs: [
      {
        q: "What was the hardest part of the Chef4me User app?",
        a: "Holding three behaviours (hiring a chef, ordering meals and requesting a quote) inside one app without making it feel like three products stitched together. Each flow got its own logic, while navigation, vocabulary and components stayed shared.",
      },
      {
        q: "How did you keep custom quotes from feeling like a form?",
        a: "The quote request became a step-by-step wizard: event details first, then food preferences. Each screen asks for one kind of decision, and the flow only requests what the event actually needs.",
      },
      {
        q: "How did the design handle delivery, dispatch and pickup?",
        a: "They are genuinely different jobs, so they were separated before checkout instead of merged into one address field. Choosing the method first removes ambiguous addresses and surprise fees at the final step.",
      },
    ],
    next: "chef4me-chef",
  },
  {
    slug: "chef4me-chef",
    index: "02",
    title: "Chef4me Chef",
    display: "Chef4me",
    displayAccent: "Chef",
    kind: "Food · Web App",
    tone: "ink",
    discipline: "Product Design",
    year: "2025",
    client: "Chef4me",
    industry: "Food & Hospitality",
    role: "UI/UX Design, Design System",
    platform: "Web App",
    scope: "Dashboard, storefront & premium",
    tagline:
      "A web app where chefs manage orders, menus, earnings and their storefront, all from one place.",
    summary:
      "Many chefs would rather run their business from a bigger screen. The Chef4me web app gives them one place to take orders, update menus and their food gallery, track payments and talk to clients, whether they are at home, in a kitchen or at an event. It had to be quick to learn, even for chefs who don't think of themselves as tech-savvy.",
    challenge:
      "How do you help a chef run a business in the minutes between cooking? That question shaped every screen.",
    cover: img("chef-chef", "hero"),
    thumb: "/assets/thumbs/chef-chef.webp",
    chapters: [
      {
        eyebrow: "Approach",
        title: "Approachable, not overwhelming",
        body:
          "Chefs work on their feet, in busy kitchens. The dashboard had to be readable at a glance from across a counter, not studied at a desk. Clear hierarchy, generous spacing and a calm visual style keep it from feeling like accounting software.",
        image: img("chef-chef", "tablet"),
        alt: "Chef4me chef dashboard on a tablet on a marble kitchen counter",
        note: "The dashboard, in the room where the work actually happens.",
      },
      {
        eyebrow: "Structure",
        title: "Built around how chefs work",
        body:
          "Some chefs deliver meals; others cook in clients' homes. One interface serves both by showing only what applies: menus, discounts and promotions appear where they are relevant and stay out of the way when they are not.",
        image: img("chef-chef", "menus"),
        alt: "Chef4me menu details and discounts management screens",
        note: "A powerful back office that still feels simple.",
      },
      {
        eyebrow: "Clarity",
        title: "Everything in its place",
        body:
          "Orders, earnings, ratings and availability sit in one readable view. Storefront settings are grouped by the job they do, so changing a price or publishing a menu never means digging through settings.",
        image: img("chef-chef", "monitor"),
        alt: "Chef4me storefront management on a desktop monitor",
        note: "A storefront a chef can update between services.",
      },
      {
        eyebrow: "Growth",
        title: "Premium, made simple",
        body:
          "Chef4me Premium gives chefs a personalised storefront, business assets and a custom URL. The upgrade had to feel worth it, not complicated, so each screen shows what Premium would change for that chef instead of listing features.",
        image: img("chef-chef", "premium"),
        alt: "Chef4me Premium upgrade screen on a marble background",
        note: "Selling an upgrade by showing the outcome, not the feature list.",
      },
    ],
    quote:
      "The goal was a management tool that feels approachable, not overwhelming, for someone who would rather be cooking.",
    outcomes: [
      {
        label: "One place",
        text: "Orders, menus, earnings and kitchen logistics brought into a single, coherent workspace.",
      },
      {
        label: "Less friction",
        text: "Conditional content blocks and progressive disclosure keep the interface clean as features grow.",
      },
      {
        label: "A clear upgrade",
        text: "A premium flow that communicates value through the product itself rather than a feature list.",
      },
    ],
    faqs: [
      {
        q: "Why a web app for chefs instead of a phone app?",
        a: "Chefs manage menus, orders and earnings at a desk or counter, often between services. A larger canvas keeps the whole business visible at once instead of burying it behind tabs on a phone.",
      },
      {
        q: "How do you design a dashboard for someone who is also cooking?",
        a: "By working at a glance. Clear hierarchy, generous spacing and a calm visual language mean the important numbers read from a counter, not a desk, and the interface never competes with the room it sits in.",
      },
      {
        q: "How was Chef4Me Premium designed?",
        a: "As an outcome rather than a feature list: a personalised storefront, business assets and a custom URL, shown in the product itself. Each screen answers what Premium would change for that chef.",
      },
    ],
    next: "brandit",
  },
  {
    slug: "brandit",
    index: "03",
    title: "Brandit",
    display: "Brandit",
    displayAccent: "",
    kind: "Fashion · E-commerce",
    tone: "forest",
    discipline: "Product Design",
    year: "2024",
    client: "Brandit",
    industry: "Fashion",
    role: "UI/UX Design, Visual Design",
    platform: "Website",
    scope: "Storefront, checkout & account",
    tagline:
      "An online store that moved a fashion brand's sales from WhatsApp chats to its own website, with browsing, ordering and accounts.",
    summary:
      "Brandit sold almost entirely through WhatsApp, with every order handled by hand in a chat. The brief was a website that brings in traffic, turns enquiries into orders and shows the full range of what Brandit offers, while staying clear, consistent and true to the brand's identity.",
    challenge:
      "Ordering on WhatsApp felt fast, until it wasn't. The store had to save customers time and make the brand look as credible as its clothes.",
    cover: img("brandit", "hero"),
    thumb: "/assets/thumbs/brandit.webp",
    chapters: [
      {
        eyebrow: "Shift",
        title: "From DMs to a storefront",
        body:
          "Every WhatsApp order was a conversation someone had to have. The store keeps that warmth but removes the back-and-forth: browse by category, see the product clearly, know the price, move on.",
        image: img("brandit", "store"),
        alt: "Brandit store category browsing screen over a retail interior",
        note: "A catalogue to explore, not a list to scroll past.",
      },
      {
        eyebrow: "Product",
        title: "Product pages that answer questions",
        body:
          "The design builds on Brandit's visual identity and pushes it forward: soft curves, confident colour and a calm layout. Product photos lead, and size, fabric and price sit exactly where shoppers look for them.",
        image: img("brandit", "product"),
        alt: "Brandit product detail page with hoodie imagery",
        note: "Answers the question before it becomes a DM.",
      },
      {
        eyebrow: "Retention",
        title: "An account that feels personal",
        body:
          "For returning customers, the account is a small hub: order history, saved favourites and a clear way back into the store. Sensible defaults and helpful prompts make it work for first-time shoppers and regulars alike.",
        image: img("brandit", "account"),
        alt: "Brandit account profile and order history screen",
        note: "A return visit should feel shorter than the first.",
      },
      {
        eyebrow: "Conversion",
        title: "Checkout without doubt",
        body:
          "A single-page checkout with an order summary that stays in view, shipping costs shown upfront and familiar payment options. Nothing new appears between the cart and the confirmation.",
        image: img("brandit", "checkout"),
        alt: "Brandit checkout with order summary and payment methods",
        note: "No surprises between cart and confirmation.",
      },
      {
        eyebrow: "System",
        title: "One brand, everywhere",
        body:
          "The same visual language carries from desktop to mobile, through launch campaigns, FAQs, quick actions and the reseller programme.",
        image: img("brandit", "mobile"),
        alt: "A fan of Brandit mobile screens",
        note: "One identity, translated across every touchpoint.",
      },
    ],
    quote:
      "Building a full e-commerce site taught me that cutting features and polishing the core flows has the biggest business impact.",
    outcomes: [
      {
        label: "Self-service",
        text: "Manual DM conversations transformed into a storefront that lets customers explore, decide and shop on their own.",
      },
      {
        label: "Confidence",
        text: "Clear pricing, shipping and payment details remove the hesitation that used to end in an abandoned chat.",
      },
      {
        label: "Identity",
        text: "A visual system drawn from Brandit's own DNA, carried consistently from homepage to checkout.",
      },
    ],
    faqs: [
      {
        q: "Why move Brandit off WhatsApp?",
        a: "Every WhatsApp order was a conversation someone had to have. A storefront lets customers browse, see prices and check out on their own, while keeping the warmth of the original relationship.",
      },
      {
        q: "How did the design keep Brandit's personality?",
        a: "The visual language came from the brand's own DNA: soft curves, confident colour and a calm layout. That system travelled from the homepage to product pages, account and checkout.",
      },
      {
        q: "What changed at checkout?",
        a: "A single page with a persistent order summary, visible shipping costs and familiar payment options. Nothing arrives as a surprise between the cart and the confirmation.",
      },
    ],
    next: "chef4me-web",
  },
  {
    slug: "chef4me-web",
    index: "04",
    title: "Chef4me Web App",
    display: "Chef4me",
    displayAccent: "Web",
    kind: "Food · User Web App",
    tone: "cream",
    discipline: "Product Design",
    year: "2024",
    client: "Chef4me",
    industry: "Food & Hospitality",
    role: "UI/UX Design",
    platform: "Web App",
    scope: "Discovery & chef profiles",
    tagline:
      "A web version of Chef4me that anyone can use without signing up: find a chef, customise an order and check out.",
    summary:
      "The web app is where visitors and members find and book chefs. The aim was to remove the barriers of the mobile app, so people can do everything without downloading anything, and fewer of them drop off before they order. Search covers chef name, cuisine, availability and distance.",
    challenge:
      "A mobile app asks for commitment before it gives value. The web experience had to give value first, and make signing up feel like a choice, not a toll.",
    cover: img("chef-web", "hero"),
    thumb: "/assets/thumbs/chef-web.webp",
    chapters: [
      {
        eyebrow: "Access",
        title: "Open by default",
        body:
          "No download and no account wall. Visitors land straight in the marketplace, with cuisines, chefs, availability and prices in view. Everything the app can do, the web can do, so a first-time visitor can judge the product in seconds.",
        image: img("chef-web", "access"),
        alt: "Chef4me web marketplace with search, cuisine categories and chef listings",
        note: "The marketplace is the home page: no wall between the visitor and the first chef.",
      },
      {
        eyebrow: "Discovery",
        title: "Search that matches intent",
        body:
          "People don't browse chefs by category; they arrive with a craving, a budget or a date. Search covers name, cuisine, availability and distance, and the filters stay out of the way until they are needed.",
        image: img("chef-web", "search"),
        alt: "Chef4me web search with filter, cuisine categories and chef cards",
        note: "One search field, six cuisines and the shortlist underneath.",
      },
      {
        eyebrow: "Connection",
        title: "The chef profile at the centre",
        body:
          "The chef profile is where people decide. It had to feel welcoming to customers and give chefs room to show their story and their work. Photos, reviews, bios and the menu sit together, so a customer can trust the chef and take the next step.",
        image: img("chef-web", "profile"),
        alt: "Chef4me web storefront with a chef's menu and a dish detail panel",
        note: "A chef's menu, story and order panel in one continuous page.",
      },
      {
        eyebrow: "Continuity",
        title: "Chat that keeps the thread",
        body:
          "Order a meal, hire a chef or request a quote: the built-in chat keeps every request and detail in one thread, so nothing gets lost between the first message and the final confirmation.",
      },
    ],
    quote:
      "In the end it came down to trust. Photos, reviews and bios together give a customer the confidence to book.",
    outcomes: [
      {
        label: "Entry",
        text: "A frictionless way into Chef4me for people who aren't ready to install an app.",
      },
      {
        label: "Discovery",
        text: "Search and filters built around how people actually choose a chef, not how a database is organised.",
      },
      {
        label: "Trust",
        text: "Chef profiles that carry story, proof and personality in one place.",
      },
    ],
    faqs: [
      {
        q: "Why build a web app when Chef4me already had a mobile app?",
        a: "The mobile app asks for a download before it gives any value. The web experience lets a first-time visitor evaluate chefs, prices and availability immediately, and treat signing up as a choice rather than a toll.",
      },
      {
        q: "How does search work in the Chef4me web app?",
        a: "People arrive with a craving, a budget or a date, not a category. Search covers chef name, cuisine, availability and proximity, with filters that stay out of the way until they are needed.",
      },
      {
        q: "What did the chef profile have to do?",
        a: "Carry trust. Photos, reviews, bios and the menu sit together so a customer can decide without a conversation, while the chat keeps the thread once they do want to talk.",
      },
    ],
    next: "bubble",
  },
  {
    slug: "bubble",
    index: "05",
    title: "Bubble",
    display: "Bubble",
    displayAccent: "",
    kind: "Law · Web App",
    tone: "violet",
    discipline: "Product Design",
    year: "2023",
    client: "Personal project",
    industry: "Legal",
    role: "UI/UX Design",
    platform: "Web App",
    scope: "Case tracking, tasks & reporting",
    tagline:
      "A legal case management platform that keeps Nigerian lawyers, documents and deadlines in sync with the judicial process.",
    summary:
      "In Nigeria's legal industry, many lawyers still manage cases, documents and communication across WhatsApp threads, email and handwritten notes. That means poor collaboration, missed deadlines and knowledge that leaves when a person does. Bubble is a concept legal-tech product that brings civil and criminal case handling into one system lawyers can trust.",
    challenge:
      "Lawyers work in teams, but their tools don't. Visibility, ownership and deadlines all live in different places.",
    cover: "/assets/thumbs/bubble.webp",
    thumb: "/assets/thumbs/bubble.webp",
    chapters: [
      {
        eyebrow: "Structure",
        title: "One case, one source of truth",
        body:
          "Every matter is tracked from intake to final judgment (filing, hearing, ruling), with documents, notes and people attached to the stage they belong to. Nothing lives in a side conversation or in someone's memory, and only the people who need a case can see it.",
        image: "/assets/bubble/screen.webp",
        alt: "Bubble case dashboard on a desktop monitor, listing civil and criminal matters",
        note: "Case stages mirror the real judicial process, not a generic kanban board.",
      },
      {
        eyebrow: "Collaboration",
        title: "Shared work, controlled access",
        body:
          "Lawyers work in teams, but their tools rarely show who is doing what. Bubble lets colleagues co-manage a matter, assign responsibilities and restrict access in one secure place, so a junior can prepare without seeing everything and a lead can review without chasing files.",
        image: "/assets/bubble/team.webp",
        alt: "Bubble clients view with portraits of everyone attached to a matter",
        note: "Roles and access are designed around how a chambers actually divides work.",
      },
      {
        eyebrow: "Reporting",
        title: "Progress you can read",
        body:
          "Each case has a live report: what has happened, what is pending and where the delays are. A central reports view then compares matters side by side, so problems show up early instead of when a client asks.",
        image: "/assets/bubble/reports.webp",
        alt: "Bubble reports view on a laptop, charting the progress of cases by status and type",
        note: "Case-level detail rolls up into a firm-wide view.",
      },
      {
        eyebrow: "Rhythm",
        title: "Deadlines, tied to the case",
        body:
          "Tasks sit at the core: deadlines, priorities and next actions tied to a case stage and to a calendar that follows court schedules. The home view answers the one question that matters on a busy morning: what needs me today?",
        image: "/assets/bubble/deadlines.webp",
        alt: "Bubble court calendar with hearings mapped across the month",
        note: "Tasks are never detached from the matter they belong to.",
      },
    ],
    quote:
      "From intake to final judgment, Bubble is a single source of truth: everything logged, structured and shared only with the people who need it.",
    outcomes: [
      {
        label: "Centralised",
        text: "Cases, documents, tasks and conversation consolidated into one place instead of scattered channels.",
      },
      {
        label: "Accountable",
        text: "Ownership and access designed around real legal teams, with a visible trail of who did what.",
      },
      {
        label: "Foresighted",
        text: "Reporting that surfaces delays across cases before they turn into missed court dates.",
      },
    ],
    faqs: [
      {
        q: "Why does legal case management need its own product in Nigeria?",
        a: "Many chambers still run on WhatsApp threads, email and handwritten notes, so documents, ownership and deadlines live in different places. Bubble centralises civil and criminal matters into a single system.",
      },
      {
        q: "How does Bubble handle access and permissions?",
        a: "Every matter has roles attached to it. Peers co-manage a case, responsibilities are assigned explicitly, and access can be restricted so a junior can prepare without seeing everything.",
      },
      {
        q: "How are deadlines connected to a case?",
        a: "Tasks carry deadlines, priorities and next actions tied to a case stage, and roll into a calendar that follows court schedules. The home view answers one question: what needs me today?",
      },
    ],
    next: "chef4me-user",
  },
];

// Work that exists but is not a case study yet. Rendered as a card that never
// links anywhere: the hover states the status instead of promising a page.
export const upcoming = [
  {
    slug: "securecomply",
    track: "product",
    mark: "securecomply",
    index: "06",
    title: "SecureComply",
    display: "Secure",
    displayAccent: "Comply",
    kind: "Compliance · Web Platform",
    year: "2026",
    client: "Vernovi Cyber",
    status: "In preparation",
    blurb:
      "A GRC workspace for compliance teams: 800+ screens across owner, admin and member roles, designed and delivered in under a month.",
  },
  {
    slug: "motion-01",
    track: "motion",
    mark: "signature",
    index: "01",
    title: "Motion case study",
    display: "Motion",
    displayAccent: "Study",
    kind: "Motion · Case study",
    year: "2026",
    status: "In production",
    note: "The first motion case study is in production. It lands here, process and all, when it's ready.",
    blurb:
      "Each motion piece arrives as a full case study: the brief, the storyboard, the tools and the thinking behind every frame.",
  },
];

// Chef4me Web is the user-facing web app: its own project, distinct from the
// chef dashboard and the mobile user app.
export const projects = catalogue;

const trackOf = (item) => item.track || "product";
export const projectsIn = (track) => projects.filter((p) => trackOf(p) === track);
export const upcomingIn = (track) => upcoming.filter((u) => trackOf(u) === track);

export const getProject = (slug) => projects.find((p) => p.slug === slug);
export const getNextProject = (slug) => {
  const project = getProject(slug);
  return getProject(project?.next) ?? projects[0];
};

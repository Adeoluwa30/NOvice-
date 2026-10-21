const img = (project, name) => `/assets/${project}/${name}.webp`;

export const projects = [
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
      "Democratising access to private culinary talent through a flexible, logistics-first platform.",
    summary:
      "Finding a private chef or ordering custom, chef-prepared meals is traditionally a high-friction process involving fragmented communication and unclear pricing. Chef4me needed a user-facing app that could bridge the gap between hungry users and culinary professionals, handling complex logistics like custom quotes, multi-day hirings and varied delivery methods.",
    challenge:
      "Three distinct behaviours (hiring, ordering and quoting) had to live inside one app without ever feeling like three apps stitched together.",
    cover: img("chef-user", "hero"),
    thumb: "/assets/thumbs/chef-user.webp",
    chapters: [
      {
        eyebrow: "Trust",
        title: "Designing for trust",
        body:
          "Users are inviting strangers into their homes, or trusting them with their food. The Chef Profile was designed to work as a comprehensive storefront: verified reviews, visible ratings, a clear About section and enough of a chef's personality to make the decision feel human.",
        images: [
          { src: img("chef-user", "profile-map"), alt: "Chef4me map view with chefs nearby", layout: "tall" },
          { src: img("chef-user", "profile-chef"), alt: "Chef4me chef profile screen", layout: "tall" },
        ],
        note: "Search by cuisine and proximity, then meet the person behind the menu.",
      },
      {
        eyebrow: "Complexity",
        title: "A wizard, not a form",
        body:
          "Custom orders require detailed inputs. To prevent cognitive overload, the Request Quote flow uses a step-by-step wizard: Event Details, then Food Preferences. Breaking the task into small decisions reduced the perceived effort of the form and encouraged higher completion.",
        image: img("chef-user", "wizard"),
        alt: "Chef4me quote wizard with dish and dietary preference selection",
        note: "Guest age range, dishes and dietary restrictions. One decision at a time.",
      },
      {
        eyebrow: "Logic",
        title: "Hiring isn't one-size-fits-all",
        body:
          "A single-day hire is date, time and guests. A multi-day hire needs weekly scheduling, repeat menus and different data. I created distinct logic paths for each, so the interface only ever asks for what the event actually requires.",
        image: img("chef-user", "quote"),
        alt: "Chef4me event time and guest count selection cards",
        note: "Conditional paths keep the flow short for simple hires and complete for complex ones.",
      },
      {
        eyebrow: "Logistics",
        title: "Checkout without the guesswork",
        body:
          "Delivery, dispatch and pickup are genuinely different jobs. Separating those workflows reduced error at checkout and made the last step feel as considered as the first: no ambiguous addresses, no surprise fees.",
        image: img("chef-user", "checkout"),
        alt: "Chef4me checkout and delivery selection screens",
        note: "Home service, dispatch or pickup, chosen before the basket is confirmed.",
      },
    ],
    quote:
      "The final design consolidated three distinct user behaviours (hiring, ordering and requesting quotes) into a single, cohesive application.",
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
      "A platform built to empower chefs to manage orders, update menus, track earnings and run their kitchen, all from one place.",
    summary:
      "The chef web app was created to make Chef4me more accessible and flexible for chefs who prefer managing work from a larger screen. Whether they're at home, in the kitchen or at an event, it gives them the tools to stay organised and responsive, from receiving meal orders to updating their food gallery, handling payments and engaging with clients. The experience was built with usability, clarity and speed in mind, so even non-tech-savvy chefs can navigate it with ease.",
    challenge:
      "What is the fastest approach to chefs managing business whilst cooking deliciousness? That question shaped everything.",
    cover: img("chef-chef", "hero"),
    thumb: "/assets/thumbs/chef-chef.webp",
    chapters: [
      {
        eyebrow: "Approach",
        title: "Approachable, not overwhelming",
        body:
          "Chefs work in busy, physical environments. The interface had to be clean, open and strain-free: readable at a glance from a counter, not a desk. Clear hierarchy, generous spacing and a calm visual language keep the dashboard from feeling like accounting software.",
        image: img("chef-chef", "tablet"),
        alt: "Chef4me chef dashboard on a tablet on a marble kitchen counter",
        note: "The dashboard, in the room where the work actually happens.",
      },
      {
        eyebrow: "Structure",
        title: "Adapts to how chefs actually work",
        body:
          "Some chefs deliver meals. Others cook at clients' homes. Designing one interface for both, without clutter or confusion, meant conditional content blocks and progressive disclosure. Menus, discounts and promos appear where they're relevant, and stay out of the way when they're not.",
        image: img("chef-chef", "menus"),
        alt: "Chef4me menu details and discounts management screens",
        note: "Progressive disclosure keeps a powerful back office feeling simple.",
      },
      {
        eyebrow: "Clarity",
        title: "Details without the clutter",
        body:
          "Orders, earnings, ratings and availability sit in one readable system. Storefront settings are grouped by the job they do, so updating a price or publishing a menu is never buried in a settings maze.",
        image: img("chef-chef", "monitor"),
        alt: "Chef4me storefront management on a desktop monitor",
        note: "A storefront a chef can run between services.",
      },
      {
        eyebrow: "Growth",
        title: "Premium, without the complexity",
        body:
          "Chef4Me Premium was more than a feature: it was a mindset shift. The upgrade had to feel valuable, not complicated: a personalised storefront, business assets and a custom URL. Every screen was crafted to spark curiosity, build trust and show chefs exactly how Premium could take their craft further.",
        image: img("chef-chef", "premium"),
        alt: "Chef4me Premium upgrade screen on a marble background",
        note: "Selling an upgrade by showing the outcome, not the feature list.",
      },
    ],
    quote:
      "The goal was to create an approachable, not overwhelming, management system for chefs.",
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
      "An online store that shifts customer interactions from WhatsApp to a branded website for easy browsing, ordering and account management.",
    summary:
      "Brandit relied heavily on manual WhatsApp orders. The challenge was to design a platform that drives traffic to the website, converts inquiries into orders and showcases the broader scope of their services, without sacrificing clarity or brand consistency, and while genuinely using the brand's identity.",
    challenge:
      "Ordering through WhatsApp felt fast, until it wasn't. The store had to respect the customer's time while lifting the brand's credibility.",
    cover: img("brandit", "hero"),
    thumb: "/assets/thumbs/brandit.webp",
    chapters: [
      {
        eyebrow: "Shift",
        title: "From DMs to a storefront",
        body:
          "Every WhatsApp order was a conversation someone had to have. The new store had to carry that same warmth while removing the back-and-forth: browse by category, see the product clearly, know the price, move on. Consistency, clarity and connection: every page earning the trust to take the next step.",
        image: img("brandit", "store"),
        alt: "Brandit store category browsing screen over a retail interior",
        note: "The catalogue became a place to explore, not a list to scroll past.",
      },
      {
        eyebrow: "Product",
        title: "Product pages that earn the click",
        body:
          "The design borrowed from Brandit's visual DNA but pushed it forward: soft curves, confident colour and a calm layout that guides each interaction. Product imagery leads; sizing, fabric and price sit exactly where a shopper looks for them.",
        image: img("brandit", "product"),
        alt: "Brandit product detail page with hoodie imagery",
        note: "Details that answer the question before it becomes a DM.",
      },
      {
        eyebrow: "Retention",
        title: "An account that feels personal",
        body:
          "For returning customers, the account became a small hub: order history, saved favourites and a clear path back into the store. Clean layouts, smart defaults and helpful nudges throughout, designed with empathy for a first-time shopper and a regular alike.",
        image: img("brandit", "account"),
        alt: "Brandit account profile and order history screen",
        note: "A return visit should feel shorter than the first.",
      },
      {
        eyebrow: "Conversion",
        title: "Checkout that removes doubt",
        body:
          "A single-page checkout with a persistent order summary, visible shipping costs and familiar payment options. The layout wasn't just aesthetic; it was intentional. Every section works harder to tell the story, showcase the product and earn the click.",
        image: img("brandit", "checkout"),
        alt: "Brandit checkout with order summary and payment methods",
        note: "No surprises between cart and confirmation.",
      },
      {
        eyebrow: "System",
        title: "A brand that holds up everywhere",
        body:
          "The same visual language travelled from desktop to mobile: launch campaigns, FAQs, quick actions and the reseller programme. Building a full e-commerce site taught me that cutting features and polishing core flows creates the biggest business impact.",
        image: img("brandit", "mobile"),
        alt: "A fan of Brandit mobile screens",
        note: "One identity, translated across every touchpoint.",
      },
    ],
    quote:
      "Building a full e-commerce site taught me that cutting features and polishing core flows creates the biggest business impact.",
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
    next: "chef4me-web",
  },
  {
    slug: "chef4me-web",
    index: "04",
    title: "Chef4me Web",
    display: "Chef4me",
    displayAccent: "Web",
    kind: "Food · Web App",
    tone: "cream",
    discipline: "Product Design",
    year: "2024",
    client: "Chef4me",
    industry: "Food & Hospitality",
    role: "UI/UX Design",
    platform: "Web App",
    scope: "Discovery & chef profiles",
    tagline:
      "A web-based experience that opens Chef4me to everyone. No sign-up needed: just explore, customise and order.",
    summary:
      "The web app is the main space where visitors and registered users find and connect with chefs. The goal was to make access straightforward and frictionless, removing barriers present in the mobile app, letting people take any action without limitations and reducing drop-off. Users can search by chef name, cuisine, availability and proximity.",
    challenge:
      "A mobile app asks for commitment before it gives value. The web experience had to give value first, and make signing up feel like a choice, not a toll.",
    cover: img("chef-web", "hero"),
    thumb: "/assets/thumbs/chef-web.webp",
    chapters: [
      {
        eyebrow: "Access",
        title: "Open by default",
        body:
          "No download, no account wall. Visitors land in the marketplace itself: cuisines, chefs, availability and prices. Every action available in the app is available here, so a first-time visitor can evaluate the product in seconds instead of installing something first.",
        image: img("chef-web", "listing"),
        alt: "Chef4me web marketplace listing chefs by cuisine",
        note: "The marketplace is the landing page.",
      },
      {
        eyebrow: "Discovery",
        title: "Search that understands intent",
        body:
          "People don't browse chefs by category; they arrive with a craving, a budget or a date. Search by name, cuisine, availability and proximity, with filters that stay out of the way until they're needed. The result is a shortlist that feels curated, not exhaustive.",
      },
      {
        eyebrow: "Connection",
        title: "The chef profile as the centre",
        body:
          "The chef profile became the centre of everything. It had to feel clear and welcoming for customers, while giving chefs room to show their story and work with confidence. Photos, reviews and bios came together to help customers trust the chef and take the next step.",
      },
      {
        eyebrow: "Continuity",
        title: "Chat that keeps the thread",
        body:
          "Order a meal, hire a chef or request a quote. The built-in chat keeps every request and detail in one place, so nothing gets lost between the first message and the final confirmation.",
      },
    ],
    quote:
      "In the end, it was about connection. Photos, reviews and bios came together to help customers trust the chef and take the next step.",
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
      "In Nigeria's legal industry, many lawyers still manage cases, documents and communication through scattered channels: WhatsApp threads, email, handwritten notes. The result is poor collaboration, missed deadlines and information that disappears when someone leaves the room. Bubble was built as a conceptual law-tech product that centralises civil and criminal case handling into one system lawyers can trust.",
    challenge:
      "Lawyers work in teams, but their tools don't. Visibility, ownership and deadlines all live in different places.",
    cover: null,
    thumb: "/assets/thumbs/bubble.webp",
    chapters: [
      {
        eyebrow: "Structure",
        title: "One case, one source of truth",
        body:
          "Every matter is tracked from intake to final judgment (filing, hearing, ruling), with documents, notes and people attached to the stage they belong to. Nothing lives in a side conversation or someone's memory, and only the people who need to see a case can see it.",
        note: "Case stages mirror the real judicial process, not a generic kanban board.",
      },
      {
        eyebrow: "Collaboration",
        title: "Shared work, controlled access",
        body:
          "Lawyers often work in teams, yet traditional tools limit visibility. Bubble lets peers co-manage a matter, assign responsibilities and restrict access within one secure environment, so a junior can prepare without seeing everything, and a lead can review without chasing files.",
        note: "Roles and access are designed around how a chambers actually divides work.",
      },
      {
        eyebrow: "Reporting",
        title: "Progress you can read",
        body:
          "Each case carries a dynamic report: what has happened, what is pending and where the delays are. A central reporting hub then compares across matters, so patterns surface before they become problems rather than after a client asks.",
        note: "Case-level detail rolls up into a firm-wide view.",
      },
      {
        eyebrow: "Rhythm",
        title: "Deadlines, tied to the case",
        body:
          "Task management sits at the core: deadlines, priorities and next actions tied directly to a case stage, connected to a calendar that follows court schedules. The interface answers the only question that matters on a busy morning: what needs me today?",
        note: "Tasks are never detached from the matter they belong to.",
      },
    ],
    quote:
      "From case intake to final judgment, the platform is a single source of truth: everything logged, structured and shared with only the people who need it.",
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
    next: "chef4me-user",
  },
];

export const getProject = (slug) => projects.find((p) => p.slug === slug);
export const getNextProject = (slug) => {
  const project = getProject(slug);
  return getProject(project?.next) ?? projects[0];
};

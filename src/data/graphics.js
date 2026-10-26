// Graphic design work, pulled from the Behance gallery and curated for the wall.
//
// `campaign` drives the filter above the wall and `client` is what shows on
// the piece. Order in this array is the order of the stack, so reordering
// here reorders the page.
//
// To add a piece: export it as WebP into public/assets/graphic/ (a 1500w and a
// 760w version, like these) and add an entry with its real pixel size.

export const behanceGallery = "https://www.behance.net/gallery/213238687/Graphic-Designs";
export const behanceProfile = "https://www.behance.net/adeoluwaadeoye";

// What a commission can be. Used by the brief panel at the foot of the page.
export const graphicPractice = [
  "Event flyers",
  "Posters & print",
  "Identity & marks",
  "Social campaigns",
  "Packaging",
  "Brand collateral",
];

export const graphics = [
  // ---- Lane one: portrait work ----
  {
    campaign: "Brandit",
    title: "Identity Culture",
    client: "Brandit",
    category: "Campaign art",
    src: "/assets/graphic/brandit-identity-culture.webp",
    small: "/assets/graphic/brandit-identity-culture-760.webp",
    width: 1080,
    height: 1350,
    alt:
      "Streetwear campaign poster: a model in a red-trimmed black jacket standing still while the " +
      "crowd blurs around her, under a tall outlined “Identity” headline with “Buying” set into it, " +
      "and a line of small white capitals at the foot.",
    note: "The crowd is blurred and she is not. The poster is about standing out in a moving street, and the headline sits in the gap between the two.",
  },
  {
    campaign: "Brandit",
    title: "Grand Opening 2.0",
    client: "Brandit",
    category: "Event graphics",
    src: "/assets/graphic/brandit-grand-opening.webp",
    small: "/assets/graphic/brandit-grand-opening-760.webp",
    width: 1080,
    height: 1400,
    alt:
      "Black halftone store-opening invite with huge white outlined type, scattered red dots and the " +
      "address set across the bottom.",
    note: "Halftone, outline and a hard crop: a look built for a story post that gets half a second.",
  },
  {
    campaign: "D. Logistics",
    title: "Cargo Shipments",
    client: "D. Logistics",
    category: "Campaign art",
    src: "/assets/graphic/d-cargo-shipments.webp",
    small: "/assets/graphic/d-cargo-shipments-760.webp",
    width: 1500,
    height: 1875,
    alt:
      "Teal freight ad: an airliner and a container ship in a cut-out collage beneath banked headline " +
      "type, with an air and sea rate panel on the right.",
    note: "One system for a whole campaign: the same teal grid and rate panel each time, with a different vehicle dropped into the frame.",
  },
  {
    campaign: "D. Logistics",
    title: "Express Delivery",
    client: "D. Logistics",
    category: "Campaign art",
    src: "/assets/graphic/d-express-delivery.webp",
    small: "/assets/graphic/d-express-delivery-760.webp",
    width: 1500,
    height: 1875,
    alt:
      "Teal courier ad built on a 3D airliner banking across the words “Express Delivery”, with a dark " +
      "service tag at the foot of the frame.",
    note: "The same campaign system, this time with a rendered aircraft instead of a photograph.",
  },
  {
    campaign: "Munchin",
    title: "Wanna Hear That Crunch",
    client: "Munchin",
    category: "Social & launch",
    src: "/assets/graphic/munchin-crunch.webp",
    small: "/assets/graphic/munchin-crunch-760.webp",
    width: 1080,
    height: 1350,
    alt:
      "Snack brand post: a close crop of a smiling mouth and jaw on a two-tone brown ground, with " +
      "“Wanna hear that crunch!!” stacked over it in white and yellow letters and the Munchin " +
      "wordmark beneath.",
    note: "Type set to sound like the product: stacked, bounced and pushed big enough to read as noise before it reads as words.",
  },
  {
    campaign: "HOB Games",
    title: "Press Con",
    client: "HOB Games",
    category: "Posters & print",
    src: "/assets/graphic/hob-press-con.webp",
    small: "/assets/graphic/hob-press-con-760.webp",
    width: 1500,
    height: 2000,
    alt:
      "Blue press-conference poster: a row of labelled microphones on a desk under “Press Con” in " +
      "white italic capitals, with the date and time across the lower third.",
    note: "A fixture announcement built like a broadcast lower third, so the date still reads on a phone screen.",
  },
  {
    campaign: "T-Havens",
    title: "CEO Package",
    client: "T-Havens Services",
    category: "Posters & print",
    src: "/assets/graphic/thavens-ceo-package.webp",
    small: "/assets/graphic/thavens-ceo-package-760.webp",
    width: 1178,
    height: 1349,
    alt:
      "Dark teal company-registration ad headed “CEO Package”, with an 85K price, a tiered list of " +
      "services and a contact footer.",
    note: "The price and the tier name carry the hierarchy. Everything under them is a list you can scan in a single pass.",
  },
  {
    campaign: "Independent",
    title: "Fresh Foodstuffs",
    client: "Ronnie",
    category: "Posters & print",
    src: "/assets/graphic/ronnie-fresh-foodstuffs.webp",
    small: "/assets/graphic/ronnie-fresh-foodstuffs-760.webp",
    width: 1500,
    height: 1578,
    alt:
      "Dark food-delivery flyer: a wire basket of produce cut out over a woven texture, with “Fresh " +
      "Foodstuffs” in a tall serif and a delivery badge below it.",
    note: "Produce cut out against a dark weave, so the colour of the food does the advertising.",
  },
  {
    campaign: "Solution Parish",
    title: "King of Kings",
    client: "Solution Parish",
    category: "Campaign art",
    src: "/assets/graphic/king-of-kings.webp",
    small: "/assets/graphic/king-of-kings-760.webp",
    width: 1080,
    height: 1400,
    alt:
      "Crimson ministry poster: a figure in a jewelled crown and grey embroidered cloak beneath a " +
      "gothic “K” locked into “King of Kings”, with a crown of thorns at the foot and the service " +
      "details beneath.",
    note: "A cape, a crown and one ornamental face do all of the work. The restraint is what makes it feel solemn.",
  },
  {
    campaign: "Independent",
    title: "Real Estate",
    client: "Editorial profile",
    category: "Editorial layout",
    src: "/assets/graphic/real-editorial.webp",
    small: "/assets/graphic/real-editorial-760.webp",
    width: 1500,
    height: 2000,
    alt:
      "Editorial profile layout: a black-and-white portrait of a grinning young man on the left, a " +
      "huge serif “Real” over “Estate” on the right with a column of body copy, and a blue 3D block " +
      "filling the lower right.",
    note: "Magazine logic at poster scale. The text is set as a column because it is actually meant to be read.",
  },
  {
    campaign: "Independent",
    title: "Picnic Hangout",
    client: "Event flyer",
    category: "Event graphics",
    src: "/assets/graphic/picnic-hangout.webp",
    small: "/assets/graphic/picnic-hangout-760.webp",
    width: 1080,
    height: 1560,
    alt:
      "Picnic event flyer on a cream and red checkered ground with a striped parasol, a picnic basket " +
      "and a layered “Picnic Hangout” logotype in pink and blue.",
    note: "The picnic blanket is the grid. The checks give the layout its rhythm before a single word is set.",
  },
  {
    campaign: "HOB Games",
    title: "Elites vs Vertex",
    client: "HOB Games",
    category: "Posters & print",
    src: "/assets/graphic/hob-elites-vertex.webp",
    small: "/assets/graphic/hob-elites-vertex-760.webp",
    width: 1500,
    height: 2000,
    alt:
      "Football fixture poster in blue: two players in kit either side of the team names “Elites” and " +
      "“Vertex” in tall white capitals, with the date along the bottom.",
    note: "Two players, two names, one scoreboard. The matchup reads from across the room.",
  },
  {
    campaign: "D. Logistics",
    title: "Thank You 2025",
    client: "D. Logistics",
    category: "Campaign art",
    src: "/assets/graphic/thank-you-2025.webp",
    small: "/assets/graphic/thank-you-2025-760.webp",
    width: 1500,
    height: 1875,
    alt:
      "Year-end thank-you artwork: teal and charcoal parcels lined up beneath oversized black type, a " +
      "glossy heart badge and tumbling blue cubes.",
    note: "A year-end thank-you to clients and partners: one small 3D still life, one badge, and type doing the rest of the work.",
  },
  {
    campaign: "Solution Parish",
    title: "He Is Risen",
    client: "Solution Parish",
    category: "Campaign art",
    src: "/assets/graphic/he-is-risen.webp",
    small: "/assets/graphic/he-is-risen-760.webp",
    width: 1500,
    height: 2000,
    alt:
      "Easter artwork: a crucifix in silhouette against a fiery orange and pink cloudscape, with “He " +
      "Is Risen” staggered in translucent capitals and “Happy Easter” beneath.",
    note: "Type set into the light rather than on top of it, so the sky and the headline read as one material.",
  },

  // ---- Lane two: wide and square work ----
  {
    campaign: "Munchin",
    title: "Crunch Pour",
    client: "Munchin",
    category: "Packaging",
    src: "/assets/graphic/munchin-crunch-pour.webp",
    small: "/assets/graphic/munchin-crunch-pour-760.webp",
    width: 1500,
    height: 1304,
    alt: "Product still: hands tipping a yellow Munchin pouch so the snack spills across a deep maroon surface.",
    note: "Packaging shot in use rather than standing still. The spill is the proof of the texture.",
  },
  {
    campaign: "Brandit",
    title: "We Are Hiring",
    client: "Brandit",
    category: "Social & launch",
    src: "/assets/graphic/brandit-hiring.webp",
    small: "/assets/graphic/brandit-hiring-760.webp",
    width: 1500,
    height: 1500,
    alt:
      "Hiring post: “We Are Hiring” in heavy black capitals above a grid of blurred portrait " +
      "placeholders, with one circle filled in red.",
    note: "The empty frames are the argument: a grid of positions waiting to be filled, with one seat already taken.",
  },
  {
    campaign: "Solution Parish",
    title: "Excellent Fruits",
    client: "Solution Parish",
    category: "Campaign art",
    src: "/assets/graphic/excellent-fruits.webp",
    small: "/assets/graphic/excellent-fruits-760.webp",
    width: 1500,
    height: 844,
    alt:
      "Wide orange-to-magenta gradient with a glossy apple tree at the centre and “Excellent Fruits” " +
      "in tall white letters above it.",
    note: "One warm gradient, one object, two words. Nothing else is allowed to compete.",
  },
  {
    campaign: "Munchin",
    title: "Munchin Jar",
    client: "Munchin",
    category: "Packaging",
    src: "/assets/graphic/munchin-jar.webp",
    small: "/assets/graphic/munchin-jar-760.webp",
    width: 1500,
    height: 1304,
    alt: "Light product still: a clear jar of Munchin snacks lying among scattered pieces on a pale grey surface.",
    note: "Shot light and flat for the grid, where it has to sit beside a dozen other posts without shouting.",
  },
  {
    campaign: "T-Havens",
    title: "NIN Course",
    client: "T-Havens Services",
    category: "Posters & print",
    src: "/assets/graphic/thavens-nin-course.webp",
    small: "/assets/graphic/thavens-nin-course-760.webp",
    width: 1500,
    height: 1500,
    alt:
      "Course ad in teal and white built around a giant letter N, with a graduate's cap and a numbered " +
      "list of what the course covers.",
    note: "The letterform is the layout: the N carries the headline and the course list in one shape.",
  },
  {
    campaign: "T-Havens",
    title: "Regular Package",
    client: "T-Havens Services",
    category: "Posters & print",
    src: "/assets/graphic/thavens-regular-package.webp",
    small: "/assets/graphic/thavens-regular-package-760.webp",
    width: 1500,
    height: 1500,
    alt:
      "Red and purple registration ad: two certificate mockups, a 20K price, a short service list and " +
      "a portrait of the agent.",
    note: "Proof as the design: the certificates are shown as objects and the price is the second-largest thing on the page.",
  },
  {
    campaign: "Brandit",
    title: "50% Off",
    client: "Brandit",
    category: "Social & launch",
    src: "/assets/graphic/brandit-sale.webp",
    small: "/assets/graphic/brandit-sale-760.webp",
    width: 1080,
    height: 1080,
    alt:
      "Sale post: a portrait against white, cut by a red banner reading “All in-store items” above a " +
      "huge red “Sale”.",
    note: "Red does all the shouting. The portrait is cropped at the shoulders so the banner has room to cut across it.",
  },
  {
    campaign: "Munchin",
    title: "Shelf Still",
    client: "Munchin",
    category: "Packaging",
    src: "/assets/graphic/munchin-jar-still.webp",
    small: "/assets/graphic/munchin-jar-still-760.webp",
    width: 1500,
    height: 1006,
    alt: "Munchin jar standing on a wooden board with stones and scattered pieces against a warm beige backdrop.",
    note: "A natural set for the premium read: wood, stone, warm light and nothing glossy.",
  },
];

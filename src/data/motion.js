// Motion work for the Motion tab on the Projects page.
//
// While this list is empty the tab shows an "in the edit" panel instead of an
// empty grid. Adding the first entry switches it to the reel automatically.
//
// To add a piece:
// 1. Export the video as MP4 (H.264, no audio track needed, ideally under 8 MB)
//    and, if you can, a WebM alongside it. Put both in public/assets/motion/.
// 2. Export one still frame as a WebP poster into the same folder. It shows
//    before the video loads and for anyone who has asked for less motion.
// 3. Add an entry below. `width` and `height` are the video's real pixel size,
//    so the card keeps the right shape before anything loads.
//
// Videos are self-hosted on purpose: the site's security policy only allows
// media from its own domain, so a YouTube or Vimeo embed would be blocked.
//
// Example:
// {
//   title: "Chef4me onboarding",
//   client: "Chef4me",
//   category: "Product animation",
//   src: "/assets/motion/chef4me-onboarding.mp4",
//   webm: "/assets/motion/chef4me-onboarding.webm",
//   poster: "/assets/motion/chef4me-onboarding.webp",
//   width: 1080,
//   height: 1350,
//   duration: "0:12",
//   description: "Three onboarding screens sliding into place as the user picks a cuisine.",
//   note: "One line on why the motion is there and what it explains.",
// },

export const motionWork = [];

// What a motion brief can be. Shown on the tab and in the empty state.
export const motionPractice = [
  "Product & UI animation",
  "Micro-interactions",
  "Motion graphics",
  "Logo & brand animation",
  "Social & launch video",
];

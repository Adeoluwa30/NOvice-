import { useEffect } from "react";

const DEFAULT_TITLE = "Adeoluwa Adeoye, Interface & Experience Designer";
const DEFAULT_DESCRIPTION =
  "Adeoluwa Adeoye is a UI/UX and interface designer based in Lagos, Nigeria, designing digital products where clarity, motion and craft meet.";

export function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title ? `${title}, Adeoluwa Adeoye` : DEFAULT_TITLE;

    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", description || DEFAULT_DESCRIPTION);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", title ? `${title}, Adeoluwa Adeoye` : DEFAULT_TITLE);

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute("content", description || DEFAULT_DESCRIPTION);
  }, [title, description]);
}

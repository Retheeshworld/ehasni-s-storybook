/**
 * EDIT ME — all personal content for the birthday story lives here.
 * Replace the photo files in /public/images/ (memory-01.jpg ... memory-06.jpg)
 * with real photos, and edit the text below. Nothing else needs to change.
 */

export const her = "Ehasni";
export const him = "Retheesh R";
export const birthday = "23 • 08 • 2006";
export const birthdayLong = "23 August 2006";

/** SCENE 04 — edit these four values with your real dates / moments. */
export const chapterOne = [
  { label: "First meeting", value: "FIRST-MEETING-DATE" },
  { label: "First memory", value: "FIRST-MEMORY" },
  { label: "First photo", value: "FIRST-PHOTO" },
  { label: "First special moment", value: "FIRST-SPECIAL-MOMENT" },
];

/** SCENE 03 — memory cards */
export const discoveryCards = [
  { title: "A Moment", front: "Some moments don't look special when they happen…", back: "…until you realize later that they became your favorite memories." },
  { title: "A Smile", front: "There's a smile I keep thinking about.", back: "It has a way of making an ordinary day feel lighter." },
  { title: "A Conversation", front: "Some talks end.", back: "Ours always felt like they were just paused for a while." },
  { title: "A Memory", front: "I kept a few of them.", back: "Quietly. Carefully. Exactly the way they happened." },
  { title: "A Secret", front: "There's something I never said out loud.", back: "You became my favorite part of the day without even trying." },
];

/** SCENE 06 — happy moments */
export const happyCards = [
  { icon: "😂", title: "The moments we laughed", text: "The kind of laughing where you forget what was even funny — I remember all of those." },
  { icon: "💬", title: "The conversations I remember", text: "Late replies, long messages, small nonsense. Somehow all of it mattered." },
  { icon: "📸", title: "The pictures I keep looking at", text: "I open them more often than I should admit." },
  { icon: "❤️", title: "The moments that mean more than words", text: "The quiet ones. The ones nobody else would notice but us." },
];

/** SCENE 09 — the three doors */
export const doors = [
  { n: "01", kind: "A Memory", reveal: "A random day, nothing planned — and it still became one of my favourites. That's you." },
  { n: "02", kind: "A Secret", reveal: "I rehearsed saying all of this. Then I built a whole little world instead." },
  { n: "03", kind: "A Surprise", reveal: "Keep scrolling. The best part of tonight hasn't happened yet. 🎁" },
];

/** SCENE 11 — reasons */
export const reasons = [
  "Your Smile",
  "Your Kindness",
  "Your Presence",
  "Your Little Habits",
  "The Way You Make Me Feel",
  "The Memories We Share",
  "Simply… You.",
];

/** SCENE 05 / 16 — photos (real memories, CDN-hosted). */
import m01 from "@/assets/memory-01.jpg.asset.json";
import m02 from "@/assets/memory-02.jpg.asset.json";
import m03 from "@/assets/memory-03.jpg.asset.json";
import m04 from "@/assets/memory-04.jpg.asset.json";
import m05 from "@/assets/memory-05.jpg.asset.json";
import m06 from "@/assets/memory-06.jpg.asset.json";
import m07 from "@/assets/memory-07.jpg.asset.json";
import m08 from "@/assets/memory-08.jpg.asset.json";
import m09 from "@/assets/memory-09.jpg.asset.json";
import m10 from "@/assets/memory-010.jpg.asset.json";

export const photos = [
  { src: m01.url, caption: "One moment." },
  { src: m02.url, caption: "One smile." },
  { src: m03.url, caption: "One evening at the temple." },
  { src: m04.url, caption: "One night I still think about." },
  { src: m05.url, caption: "By the water." },
  { src: m06.url, caption: "One ordinary day that wasn't." },
  { src: m07.url, caption: "That silly afternoon." },
  { src: m08.url, caption: "Just us, being us." },
  { src: m09.url, caption: "The rose in your hair." },
  { src: m10.url, caption: "One memory I never want to forget." },
];


/** SCENE 08 — the letter */
export const letter = `Dear ${her},

I don't know if words will ever be enough to explain what you mean to me.

But today, I want you to know how grateful I am for every little moment we've shared.

Your smile, your presence, our conversations, our memories — they all became pieces of a story that means so much to me.

I hope this birthday brings you the happiness you deserve.

I hope you achieve everything you dream about.

And most importantly, I hope you never forget how special you are.

Happy Birthday, ${her}.

With all my love,
${him.split(" ")[0]} ❤️`;

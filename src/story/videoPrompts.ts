/**
 * AI VIDEO STORY PROMPTS — preloaded, editable in the Creator Panel (/creator).
 * Edit here to change the defaults; edits made in the panel are saved locally.
 */

export const globalVideoStyle = `Premium cinematic romantic animated movie, realistic 3D animation, young adult characters, emotionally expressive but natural faces, sophisticated visual design, cinematic lighting, midnight blue, deep burgundy and warm golden color palette, volumetric lighting, soft particles, realistic environments, shallow depth of field, beautiful bokeh, subtle film grain, smooth camera movement, high-end movie cinematography, emotional storytelling, elegant romantic atmosphere, realistic physics, natural body movement, no horror, no childish cartoon style, no exaggerated expressions, no distorted faces, no extra fingers, no text, no subtitles, no watermark.`;

export type VideoPrompt = {
  id: string;
  n: string;
  title: string;
  duration: number;
  prompt: string;
};

export const videoPrompts: VideoPrompt[] = [
  {
    id: "s01",
    n: "01",
    title: "The Mystery",
    duration: 6,
    prompt: `A completely dark cinematic screen slowly reveals a single tiny golden glowing particle floating in the center of darkness. The particle becomes brighter and begins attracting hundreds of tiny stars around it. The camera slowly pushes toward the glowing particle. Deep midnight-blue space gradually becomes visible. Soft golden dust floats through the darkness. The atmosphere is mysterious, emotional and beautiful, as if an unforgettable story is about to begin. End with the glowing particle filling the frame.`,
  },
  {
    id: "s02",
    n: "02",
    title: "The Universe",
    duration: 7,
    prompt: `The camera travels slowly through a breathtaking galaxy filled with millions of stars, glowing cosmic dust and distant galaxies. The camera continues forward until Earth appears in the distance. The camera moves toward Earth and transitions into a beautiful nighttime city filled with tiny glowing lights. A young adult man stands alone looking toward the distant horizon. He is shown as an elegant cinematic silhouette. The camera slowly moves behind him. The atmosphere suggests that among billions of people, one person will become incredibly important.`,
  },
  {
    id: "s03",
    n: "03",
    title: "The Beginning",
    duration: 7,
    prompt: `A young adult man and a young adult woman walk toward each other on a beautiful quiet city street during golden hour. Warm sunlight reflects from the buildings and wet pavement. They notice each other for the first time and slowly stop. They exchange a natural, gentle smile. The camera slowly circles around them while the background becomes softly blurred. Small golden particles float through the warm air. The moment feels like the beginning of an important love story.`,
  },
  {
    id: "s04",
    n: "04",
    title: "Ehasni",
    duration: 7,
    prompt: `Introduce a beautiful young adult woman named Ehasni through a cinematic character moment. She stands in a peaceful garden during golden sunset. Warm sunlight surrounds her. A gentle breeze moves her hair naturally. Flower petals float slowly through the air. She turns toward the camera and gives a genuine, warm smile. The camera slowly moves closer to her face and captures a soft emotional expression. Make the character elegant, natural and realistic, like the main character of a premium romantic movie.`,
  },
  {
    id: "s05",
    n: "05",
    title: "The Memories",
    duration: 8,
    prompt: `A beautiful cinematic room filled with warm hanging lights. Dozens of photographs and Polaroids float slowly through the air. The camera moves between them. Each photograph transforms into a short living memory: the young couple laughing together, walking through a city, talking, taking photographs, enjoying sunset light and sharing quiet moments. The memories transition smoothly from one to another like chapters of a romantic movie. The atmosphere is joyful, warm and nostalgic. End with several photographs floating together and forming a beautiful memory wall.`,
  },
  {
    id: "s06",
    n: "06",
    title: "The Emotion",
    duration: 7,
    prompt: `The young adult couple sits together on a peaceful hill at night. A huge star-filled sky and beautiful Milky Way stretch above them. The city glows softly in the distance. They sit close together, quietly looking toward the horizon. A gentle breeze moves their hair and clothing naturally. The camera begins close behind them and slowly pulls backward, revealing the enormous sky and city. The mood is intimate, peaceful and deeply emotional, representing two people becoming an important part of each other's lives.`,
  },
  {
    id: "s07",
    n: "07",
    title: "The Love Letter",
    duration: 7,
    prompt: `A beautiful dark romantic room illuminated by a warm vintage lamp and several candles. On a wooden desk sits an elegant handwritten letter, a black fountain pen and a single red rose. The camera slowly moves toward the letter. The candle flame flickers naturally. A gentle breeze moves the paper slightly. Rose petals slowly move across the desk. The letter opens naturally and warm golden light comes from the pages. Create a deeply personal and emotional feeling. Do not generate readable text on the letter.`,
  },
  {
    id: "s08",
    n: "08",
    title: "The Birthday Reveal",
    duration: 8,
    prompt: `A dark night sky suddenly fills with thousands of glowing golden particles. The particles rise into the sky and transform into spectacular elegant fireworks. Warm gold, burgundy and soft pink light illuminates a distant city skyline. Floating heart-shaped particles appear among the fireworks. The camera slowly rises higher as the celebration becomes larger and brighter. The scene should feel like the emotional climax of a romantic movie. End with golden particles exploding outward and leaving a glowing empty center for birthday text to be added during editing.`,
  },
  {
    id: "s09",
    n: "09",
    title: "The Future",
    duration: 7,
    prompt: `A young adult couple walks together along a beautiful open road during sunrise. Golden sunlight passes through dramatic clouds. Mountains appear in the distance. The couple walks naturally side by side, occasionally looking toward each other and smiling. The camera follows them from behind and slowly rises upward, revealing the enormous road continuing toward the glowing horizon. The scene represents future memories, hope, adventure and a new chapter beginning.`,
  },
  {
    id: "s10",
    n: "10",
    title: "The Secret Gift",
    duration: 7,
    prompt: `A mysterious elegant room appears in darkness. In the center is a beautiful gift box surrounded by red rose petals and small glowing candles. Golden particles slowly float around the box. The camera slowly approaches. The gift box begins glowing from inside. The lid slowly opens and brilliant warm golden light fills the room. Hundreds of tiny glowing hearts and particles rise from the box and float toward the camera. The feeling is magical, romantic and surprising, but sophisticated rather than childish.`,
  },
  {
    id: "s11",
    n: "11",
    title: "The Final Chapter",
    duration: 8,
    prompt: `The young adult couple stands together on a peaceful hill during a breathtaking sunset. The sky is filled with warm orange, gold and burgundy clouds. They gently hold hands and look toward the horizon. The camera slowly moves backward and upward, making them smaller while revealing the enormous beautiful landscape. They begin walking together toward the glowing horizon. Tiny golden particles float around them. The mood is hopeful, romantic and peaceful, representing that their story is continuing.`,
  },
  {
    id: "s12",
    n: "12",
    title: "The Final Birthday Moment",
    duration: 7,
    prompt: `A beautiful cinematic night scene filled with candles, red roses and thousands of floating golden particles. In the center, a glowing heart forms from tiny points of golden light. The heart slowly pulses with warm light. Rose petals gently fall through the scene. The camera slowly moves toward the glowing heart. As the heart fills the frame, the entire screen becomes warm golden light and slowly fades to black. End with an emotional, beautiful and unforgettable feeling.`,
  },
];

export const voiceoverScript = `Every story begins somewhere.
But some stories become unforgettable.
In a world full of billions of people,
sometimes one person becomes your whole universe.
Then one day...
I met you.
You probably never knew it,
but somewhere along the way,
you became my favorite chapter.
A conversation became a memory.
A smile became a reason to smile.
And the little moments became the moments
I wanted to remember.
Some people enter your life
and quietly become part of your heart.
You became part of mine.
Dear Ehasni,
Thank you for becoming such a beautiful part of my story.
I hope your life is filled with happiness,
dreams, laughter and beautiful memories.
And I hope we create many more.
Happy Birthday, Ehasni.
I don't know what every tomorrow will bring...
But there are still so many memories waiting to happen.
More laughs.
More adventures.
More memories.
More chapters.
This isn't the end of our story.
It's another beautiful chapter.
With love,
Retheesh.`;

export const finalStructure = [
  "Countdown: 5 · 4 · 3 · 2 · 1",
  "01 Mystery → 02 Universe → 03 Beginning → 04 Ehasni → 05 Memories → 06 Emotion",
  "07 Love Letter → 08 Birthday Reveal → 09 Future → 10 Secret Gift → 11 Final Chapter → 12 Final Birthday",
  "Cinematic transitions between every scene",
  "Black screen — wait 1 second",
  "Reveal: HAPPY BIRTHDAY EHASNI ❤️ · 23 • 08 • 2006",
  '"Thank you for being a beautiful part of my story." — Retheesh R',
  'Wait 3 seconds → "Wait... one last secret."',
  '"If you smiled while watching this... then my mission is complete. ❤️"',
  'Final: "Happy Birthday, Ehasni."',
];

export const generationRules = [
  "Generate every scene separately — never the whole story in one video.",
  "Maintain consistent character design, clothing style, age and visual identity across all scenes.",
  "Use cinematic continuity between scenes.",
  "No text inside the AI video — all titles, dates and messages are added by the website afterwards.",
];

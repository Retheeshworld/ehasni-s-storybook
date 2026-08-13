import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Atmosphere } from "@/components/story/Atmosphere";
import { Overture } from "@/components/story/Overture";
import { MusicPlayer } from "@/components/story/MusicPlayer";
import { SceneChapterOne, SceneCuriosity, SceneDiscovery } from "@/components/story/ActOne";
import {
  SceneDoors,
  SceneHappy,
  SceneLetter,
  SceneMontage,
  ScenePause,
  ScenePromise,
  SceneReasons,
  SceneSecretRoom,
} from "@/components/story/ActTwo";
import {
  SceneCountdown,
  SceneFilm,
  SceneGift,
} from "@/components/story/ActThree";
import {
  SceneBeforeYou,
  SceneForYou,
  SceneHowItStarted,
  SceneNotTheEnd,
  SceneThenYouHappened,
  SceneThingsYouDontKnow,
} from "@/components/story/Chapters";
import { her, him } from "@/story/content";

const title = `The Girl Who Didn't Know She Was My Favorite Chapter — For ${her}`;
const description = `A cinematic interactive story written by ${him} for ${her}: chapters, memories, secrets and a birthday she'll remember.`;


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [entered, setEntered] = useState(false);
  const [secretUnlocked, setSecretUnlocked] = useState(false);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[var(--cine-deep)] text-[var(--ink)]">
      <Atmosphere active={entered} />
      {!entered && <Overture onEnter={() => setEntered(true)} />}
      <MusicPlayer started={entered} />

      <h1 className="sr-only">
        The Girl Who Didn't Know She Was My Favorite Chapter — a story for {her} by {him}
      </h1>

      <div className={`relative z-10 transition-opacity duration-[1500ms] ${entered ? "opacity-100" : "opacity-0"}`}>
        <SceneHowItStarted />
        <SceneCuriosity />
        <SceneDiscovery />
        <SceneBeforeYou />
        <SceneChapterOne />
        <SceneThenYouHappened />
        <SceneMontage />
        <SceneHappy />
        <ScenePause />
        <SceneThingsYouDontKnow />
        <SceneLetter />
        <SceneDoors onSecret={() => setSecretUnlocked(true)} />
        <SceneSecretRoom unlocked={secretUnlocked} />
        <SceneReasons />
        <ScenePromise />
        <SceneFiveHearts />
        <SceneCountdown />
        <SceneForYou />
        <SceneGift />
        <SceneFilm />
        <SceneNotTheEnd />

        <footer className="relative z-10 pb-28 text-center text-[0.65rem] uppercase tracking-[0.3em] text-[var(--muted-ink)]">
          made with love by {him}
          <br />
          <Link to="/creator" className="mt-4 inline-block opacity-50 transition hover:opacity-100">
            creator panel
          </Link>
        </footer>

      </div>
    </main>
  );
}

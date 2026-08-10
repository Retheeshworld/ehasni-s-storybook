import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
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
  SceneBirthday,
  SceneCountdown,
  SceneFilm,
  SceneFinale,
  SceneFinalMessage,
  SceneGift,
} from "@/components/story/ActThree";
import { her, him } from "@/story/content";

const title = `For ${her} — A Cinematic Birthday Story`;
const description = `An interactive romantic film made by ${him} for ${her}'s birthday: 19 scenes of memories, secrets, a love letter and a surprise.`;

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
        Happy Birthday {her} — a cinematic interactive story by {him}
      </h1>

      <div className={`relative z-10 transition-opacity duration-[1500ms] ${entered ? "opacity-100" : "opacity-0"}`}>
        <SceneCuriosity />
        <SceneDiscovery />
        <SceneChapterOne />
        <SceneMontage />
        <SceneHappy />
        <ScenePause />
        <SceneLetter />
        <SceneDoors onSecret={() => setSecretUnlocked(true)} />
        <SceneSecretRoom unlocked={secretUnlocked} />
        <SceneReasons />
        <ScenePromise />
        <SceneCountdown />
        <SceneBirthday />
        <SceneGift />
        <SceneFilm />
        <SceneFinalMessage />
        <SceneFinale />
        <footer className="relative z-10 pb-28 text-center text-[0.65rem] uppercase tracking-[0.3em] text-[var(--muted-ink)]">
          made with love by {him}
        </footer>
      </div>
    </main>
  );
}

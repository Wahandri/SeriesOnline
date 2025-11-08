import EpisodePlayerPage from "@/components/EpisodePlayerPage";
import episodes from "@/data/monster-hunter-stories.json";

const STORAGE_KEY = "vistos_monster_hunter_stories";

export default function MonsterHunterStoriesEpisodePage() {
  return (
    <EpisodePlayerPage
      episodes={episodes}
      storageKey={STORAGE_KEY}
      basePath="/monster-hunter-stories"
      backHref="/monster-hunter-stories"
      backLabel="← Volver a Monster Hunter Stories"
    />
  );
}

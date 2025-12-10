import SeriesListPage from "@/components/SeriesListPage";
import episodes from "@/data/monster-hunter-stories.json";
import Link from "next/link";

const STORAGE_KEY = "vistos_monster_hunter_stories";
const PLACEHOLDER_THUMB = "/monster-hunter-stories-placeholder.svg";

const HERO_CONFIG = {
  title: "Monster Hunter Stories",
  subtitle:
    "Acompaña a Lute y su Rathalos en una aventura llena de vínculos y batallas inolvidables.",
  bannerImage: "https://www.nintendo.com/eu/media/images/10_share_images/games_15/nintendo_switch_download_software_1/2x1_NSwitchDS_MonsterHunterStories_image1600w.jpg",
};

const getThumbnail = (episode) => episode.thumbnail || PLACEHOLDER_THUMB;

const handleThumbnailError = (event) => {
  event.currentTarget.onerror = null;
  event.currentTarget.src = PLACEHOLDER_THUMB;
};

export default function MonsterHunterStoriesPage() {
  return (
    <>
      <Link href="/" className="back-link">
        ← Volver al inicio
      </Link>
      <SeriesListPage
        episodes={episodes}
        storageKey={STORAGE_KEY}
        basePath="/monster-hunter-stories"
        hero={HERO_CONFIG}
        getEpisodeThumbnail={getThumbnail}
        onThumbnailError={handleThumbnailError}
      />
    </>
  );
}

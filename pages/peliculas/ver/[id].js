import EpisodePlayerPage from "@/components/EpisodePlayerPage";
import movies from "@/data/peliculas.json";

const STORAGE_KEY = "vistos_peliculas";

export default function PeliculaPlayerPage() {
  return (
    <EpisodePlayerPage
      episodes={movies}
      storageKey={STORAGE_KEY}
      basePath="/peliculas"
      backHref="/peliculas"
      backLabel="← Volver a Películas"
      notFoundLabel="Película no encontrada"
      resumeNotice="Este reproductor puede tardar unos segundos en cargar. Si falla, abre el enlace original en una pestaña nueva."
    />
  );
}

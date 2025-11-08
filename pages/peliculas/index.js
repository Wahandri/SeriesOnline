import SeriesListPage from "@/components/SeriesListPage";
import movies from "@/data/peliculas.json";
import Link from "next/link";

const STORAGE_KEY = "vistos_peliculas";
const MOVIE_PLACEHOLDER = "/movies-placeholder.svg";

const HERO_CONFIG = {
  title: "Colección de películas",
  subtitle:
    "Anímate a maratonear clásicos familiares, comedias españolas y anime doblado al castellano.",
  bannerImage: "/movies-banner.svg",
};

const LIST_LABELS = {
  searchLabel: "Buscar película",
  searchPlaceholder: "Escribe el título de la película",
  emptyStateMessage: "No se encontraron películas con ese nombre.",
  resetButtonLabel: "Borrar progreso",
  progressFormatter: (seen, total) => `${seen} / ${total} películas vistas`,
  cardAriaLabel: (movie) => `Reproducir película ${movie.title}`,
  renderEpisodeTitle: (movie) => movie.title,
  toggleButtonLabel: (seen) => (seen ? "Vista" : "Marcar vista"),
  toggleButtonAriaLabel: (seen) =>
    seen ? "Marcar película como no vista" : "Marcar película como vista",
};

const getMovieThumbnail = (movie) => movie.thumbnail || MOVIE_PLACEHOLDER;

const handleThumbnailError = (event) => {
  event.currentTarget.onerror = null;
  event.currentTarget.src = MOVIE_PLACEHOLDER;
};

export default function PeliculasPage() {
  return (
    <>
      <Link href="/" className="back-link">
        ← Volver al inicio
      </Link>
      <SeriesListPage
        episodes={movies}
        storageKey={STORAGE_KEY}
        basePath="/peliculas"
        hero={HERO_CONFIG}
        getEpisodeThumbnail={getMovieThumbnail}
        onThumbnailError={handleThumbnailError}
        {...LIST_LABELS}
      />
    </>
  );
}

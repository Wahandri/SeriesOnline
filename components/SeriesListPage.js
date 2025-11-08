import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "@/styles/Home.module.css";
import { loadProgress, saveProgress } from "@/utils/progressStorage";

function defaultThumbnailResolver(episode) {
  return episode.thumbnail || "";
}

const defaultProgressFormatter = (seenCount, totalCount) =>
  `${seenCount} / ${totalCount} episodios vistos`;

const defaultCardAriaLabel = (episode) =>
  `Reproducir episodio ${episode.id}: ${episode.title}`;

const defaultRenderEpisodeTitle = (episode) =>
  `${episode.id}. ${episode.title}`;

const defaultToggleButtonLabel = (isSeen) =>
  isSeen ? "Visto" : "Marcar visto";

const defaultToggleButtonAriaLabel = (isSeen) =>
  isSeen ? "Marcar como no visto" : "Marcar como visto";

export default function SeriesListPage({
  episodes,
  storageKey,
  legacyStorageKeys = [],
  basePath,
  hero,
  getEpisodeThumbnail = defaultThumbnailResolver,
  onThumbnailError,
  searchLabel = "Buscar capítulo",
  searchPlaceholder = "Escribe el nombre del capítulo",
  emptyStateMessage = "No se encontraron capítulos con ese nombre.",
  resetButtonLabel = "Borrar progreso",
  progressFormatter = defaultProgressFormatter,
  cardAriaLabel = defaultCardAriaLabel,
  renderEpisodeTitle = defaultRenderEpisodeTitle,
  toggleButtonLabel = defaultToggleButtonLabel,
  toggleButtonAriaLabel = defaultToggleButtonAriaLabel,
}) {
  const router = useRouter();
  const [seenEpisodes, setSeenEpisodes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const legacySignature = legacyStorageKeys.join("|");

  useEffect(() => {
    const stored = loadProgress(storageKey, legacyStorageKeys);
    setSeenEpisodes(stored);
  }, [storageKey, legacySignature]);

  const updateProgress = useCallback(
    (next) => {
      setSeenEpisodes(next);
      saveProgress(storageKey, next);
    },
    [storageKey]
  );

  const handleToggleSeen = useCallback(
    (episodeId, event) => {
      event?.stopPropagation();
      const isSeen = seenEpisodes.includes(episodeId);
      const updated = isSeen
        ? seenEpisodes.filter((ep) => ep !== episodeId)
        : [...seenEpisodes, episodeId];
      updateProgress(updated);
    },
    [seenEpisodes, updateProgress]
  );

  const handleCardActivation = useCallback(
    (episodeId) => {
      if (!seenEpisodes.includes(episodeId)) {
        updateProgress([...seenEpisodes, episodeId]);
      }
      router.push(`${basePath}/ver/${episodeId}`);
    },
    [basePath, router, seenEpisodes, updateProgress]
  );

  const progress = useMemo(() => {
    if (!episodes?.length) return 0;
    return Math.round((seenEpisodes.length / episodes.length) * 100);
  }, [episodes, seenEpisodes]);

  const normalizedSearch = searchTerm.trim().toLowerCase();

  const filteredEpisodes = useMemo(() => {
    if (!normalizedSearch) return episodes;

    return episodes.filter((episode) =>
      episode.title.toLowerCase().includes(normalizedSearch)
    );
  }, [episodes, normalizedSearch]);

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  return (
    <div className={styles.container}>
      <header
        className={styles.hero}
        style={{ backgroundImage: `url(${hero.bannerImage})` }}
      >
        <div className={styles.overlay}>
          {hero.switchLink ? (
            <div className={styles.switchRow}>
              <Link href={hero.switchLink.href} className={styles.switchBtn}>
                {hero.switchLink.label}
              </Link>
            </div>
          ) : null}

          <h1 className={styles.title}>{hero.title}</h1>

          {hero.subtitle ? (
            <p className={styles.subtitle}>{hero.subtitle}</p>
          ) : null}

          <div className={styles.searchWrapper}>
            <label className={styles.searchLabel} htmlFor="episode-search">
              {searchLabel}
            </label>
            <input
              id="episode-search"
              type="search"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder={searchPlaceholder}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.progressWrapper}>
            <div
              className={styles.progressBar}
              aria-label="Progreso de visualización"
            >
              <div
                className={styles.progressFill}
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className={styles.progressText}>
              {progressFormatter(seenEpisodes.length, episodes.length)}
            </p>
          </div>

          <button
            onClick={() => updateProgress([])}
            className={styles.resetBtn}
          >
            {resetButtonLabel}
          </button>
        </div>
      </header>

      <main className={styles.grid}>
        {filteredEpisodes.length === 0 ? (
          <p className={styles.emptyState}>
            {emptyStateMessage}
          </p>
        ) : null}

        {filteredEpisodes.map((episode) => {
          const thumbnailSrc = getEpisodeThumbnail(episode);
          const seen = seenEpisodes.includes(episode.id);

          const handleKeyDown = (event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              handleCardActivation(episode.id);
            }
          };

          return (
            <div
              key={episode.id}
              className={styles.card}
              onClick={() => handleCardActivation(episode.id)}
              role="button"
              tabIndex={0}
              onKeyDown={handleKeyDown}
              aria-label={cardAriaLabel(episode)}
            >
              <div className={styles.thumbWrapper}>
                <img
                  src={thumbnailSrc}
                  alt={episode.title}
                  className={styles.thumbnail}
                  onError={onThumbnailError}
                />

                <div className={styles.hoverOverlay}>
                  <span className={styles.playIcon}>▶</span>
                </div>

                {seen ? <span className={styles.watchedMark}>✓</span> : null}
              </div>

              <h2 className={styles.epTitle}>
                {renderEpisodeTitle(episode)}
              </h2>

              <button
                className={`${styles.vistoBtn} ${seen ? styles.vistoActivo : ""}`}
                onClick={(event) => handleToggleSeen(episode.id, event)}
                aria-pressed={seen}
                aria-label={toggleButtonAriaLabel(seen)}
              >
                {toggleButtonLabel(seen)}
              </button>
            </div>
          );
        })}
      </main>
    </div>
  );
}

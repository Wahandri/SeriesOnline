import Link from "next/link";
import styles from "@/styles/MovieCard.module.css";

export default function MovieCard({ item, basePath, linkPrefix, isLandscape }) {
    // Determine the link href.
    // 1. If item has a direct link property, use it (for Series cards).
    // 2. If linkPrefix is provided, append item.id (for Movies: /peliculas/ver/[id]).
    // 3. If basePath is provided, append item.id (fallback).
    // 4. Default to /watch/[id].

    let href = item.link;
    if (!href) {
        if (linkPrefix) {
            href = `${linkPrefix}/${item.id}`;
        } else if (basePath) {
            href = `${basePath}/${item.id}`;
        } else {
            href = `/watch/${item.id}`;
        }
    }

    return (
        <Link href={href} className={`${styles.card} ${isLandscape ? styles.cardLandscape : ""}`}>
            <div className={styles.imageWrapper}>
                <img src={item.thumbnail} alt={item.title} className={styles.image} />
            </div>
            <div className={styles.info}>
                <h3 className={styles.title}>{item.title}</h3>
            </div>
        </Link>
    );
}

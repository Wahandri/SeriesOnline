import MovieCard from "./MovieCard";
import styles from "@/styles/ContentRow.module.css";

export default function ContentRow({ title, items, basePath, linkPrefix, isLandscape }) {
    return (
        <div className={styles.row}>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.rowPosters}>
                {items.map((item) => (
                    <MovieCard
                        key={item.id}
                        item={item}
                        basePath={basePath}
                        linkPrefix={linkPrefix}
                        isLandscape={isLandscape}
                    />
                ))}
            </div>
        </div>
    );
}

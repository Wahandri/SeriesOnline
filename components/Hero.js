import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "@/styles/Hero.module.css";

export default function Hero({ items }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [item, setItem] = useState(items[0]);
    const [fade, setFade] = useState(false);

    useEffect(() => {
        if (!items || items.length === 0) return;

        const interval = setInterval(() => {
            setFade(true); // Start fade out
            setTimeout(() => {
                // Select a random index
                const randomIndex = Math.floor(Math.random() * items.length);
                setCurrentIndex(randomIndex);
                setFade(false); // Start fade in
            }, 500); // Wait for fade out to complete (matches CSS transition)
        }, 5000);

        return () => clearInterval(interval);
    }, [items]);

    useEffect(() => {
        if (items && items.length > 0) {
            setItem(items[currentIndex]);
        }
    }, [currentIndex, items]);

    if (!item) return null;

    const backgroundStyle = {
        backgroundImage: `url(${item.thumbnail || ""})`,
        backgroundSize: "contain",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#000",
        opacity: fade ? 0 : 1,
        transition: "opacity 0.5s ease-in-out",
    };

    // Determine link
    const href = item.link || (item.id ? `/peliculas/ver/${item.id}` : "#");

    return (
        <Link href={href} className={styles.heroLink}>
            <header className={styles.hero} style={backgroundStyle}>
                <div className={styles.heroContents}>
                    <div className={styles.textContainer}>
                        <h1 className={styles.heroTitle}>{item.title}</h1>
                        <p className={styles.heroDescription}>
                            {item.description}
                        </p>
                    </div>
                </div>
                <div className={styles.heroFadeBottom} />
            </header>
        </Link>
    );
}

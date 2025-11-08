import Link from "next/link";
import styles from "@/styles/Landing.module.css";

const featuredCollections = [
  {
    slug: "digimon",
    title: "Digimon Adventure",
    description:
      "Revive las aventuras digitales de Tai, Agumon y el resto de los Niños Elegidos en el Digimundo.",
    accent: "orange",
  },
  {
    slug: "beyblade",
    title: "Beyblade",
    description:
      "Siente la emoción de los combates entre peonzas y acompaña a Tyson y sus amigos en cada torneo.",
    accent: "blue",
  },
];

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.content}>
        <section className={styles.hero}>
          <h1 className={styles.title}>Series en castellano</h1>
          <p className={styles.subtitle}>
            Tu catálogo de series y películas clásicas dobladas al castellano, organizado y listo para maratonear.
          </p>
        </section>

        <section className={styles.sections}>
          <h2 className={styles.sectionHeading}>Explora las colecciones disponibles</h2>
          <div className={styles.grid}>
            {featuredCollections.map((collection) => (
              <article
                key={collection.slug}
                className={`${styles.card} ${styles[collection.accent]}`}
              >
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>{collection.title}</h3>
                </div>
                <p className={styles.cardDescription}>{collection.description}</p>
                <Link href={`/${collection.slug}`} className={styles.cardLink}>
                  Ver colección
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

import Head from "next/head";
import Hero from "@/components/Hero";
import ContentRow from "@/components/ContentRow";
import styles from "@/styles/Landing.module.css";

// Import data
import peliculas from "@/data/peliculas.json";

export default function Home() {
  // Select a random item for the Hero.
  const heroItem = peliculas.find((p) => p.title.includes("Mario")) || peliculas[0];

  // Define Series data manually
  const series = [
    {
      id: "digimon",
      title: "Digimon Adventure",
      thumbnail: "/header.jpg",
      link: "/digimon",
      description: "Sigue las aventuras de Tai y los Niños Elegidos en el Mundo Digital junto a sus compañeros Digimon.",
    },
    {
      id: "beyblade",
      title: "Beyblade",
      thumbnail: "/beyblade.jpg",
      link: "/beyblade",
      description: "Tyson Granger y sus amigos compiten para convertirse en los mejores Beybladers del mundo.",
    },
    {
      id: "monster-hunter-stories",
      title: "Monster Hunter Stories",
      thumbnail: "https://www.nintendo.com/eu/media/images/10_share_images/games_15/nintendo_switch_download_software_1/2x1_NSwitchDS_MonsterHunterStories_image1600w.jpg",
      link: "/monster-hunter-stories",
      description: "Lute y sus amigos se embarcan en una aventura para convertirse en Riders y formar vínculos con monstruos.",
    },
  ];

  // Combine series and a few movies for the Hero carousel
  const heroItems = [...series, ...peliculas.slice(0, 5)];

  return (
    <div className={styles.app}>
      <Head>
        <title>SeriesOnline - Tu Streaming Favorito</title>
        <meta name="description" content="Ver series y películas online" />
      </Head>

      <Hero items={heroItems} />

      <div className={styles.rowsContainer}>
        <ContentRow title="Series" items={series} isLandscape={true} />
        <ContentRow
          title="Películas"
          items={peliculas}
          linkPrefix="/peliculas/ver"
          isLandscape={true}
        />
      </div>
    </div>
  );
}

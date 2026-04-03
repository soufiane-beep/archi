import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const BASE = "https://www.premierart.be/assets/img";

const projects = [
  {
    id: "projet-hf6",
    title: "Projet HF6",
    category: "Villa Contemporaine",
    location: "Floreffe, Wallonie",
    year: "2023",
    description: "Villa contemporaine implantée sur un terrain en pente. Deux niveaux s'adaptent à la topographie, avec une alternance contrôlée de crépis blanc et de bardage bois vertical.",
    fullDescription: "Cette villa contemporaine à Floreffe tire parti de son terrain en pente pour déployer deux niveaux en dialogue avec le paysage. La façade joue sur une alternance rigoureuse entre crépis blanc et bardage bois vertical. Les ouvertures sont pensées pour capter la lumière à chaque heure de la journée. La piscine constitue le point focal de la composition extérieure.",
    image: `${BASE}/property-083.jpg`,
    gallery: [`${BASE}/thumbnail-34.jpg`, `${BASE}/thumbnail-350.png`, `${BASE}/thumbnail-360.png`, `${BASE}/thumbnail-371.jpg`, `${BASE}/thumbnail-381.jpg`, `${BASE}/thumbnail-391.jpg`],
    specSurface: "N/C", specDuration: "N/C", specBudget: "Confidentiel", specTeam: "Premier Art SRL",
    featured: true, color: "#2d3a2e", displayOrder: 0,
  },
  {
    id: "projet-cv35",
    title: "Projet CV35",
    category: "Rénovation & Extension",
    location: "Merchtem, Flandre",
    year: "2023",
    description: "Doublement de la surface habitable — de 300 à 650 m². Suite parentale de 90 m², hall d'entrée vitré à double hauteur, miroir d'eau et sous-sol bien-être.",
    fullDescription: "Cette transformation radicale double la surface de la maison, passant de 300 à 650 m². La suite parentale de 90 m² bénéficie d'une luminosité exceptionnelle. Le hall d'entrée vitré à double hauteur crée une entrée spectaculaire. En sous-sol, un espace bien-être complet — fitness, home cinéma — complète le programme.",
    image: `${BASE}/property-08.jpg`,
    gallery: [`${BASE}/thumbnail-10.jpg`, `${BASE}/thumbnail-101.jpg`, `${BASE}/thumbnail-11.jpg`, `${BASE}/thumbnail-111.jpg`],
    specSurface: "650 m²", specDuration: "N/C", specBudget: "Confidentiel", specTeam: "Premier Art SRL",
    featured: true, color: "#2a2d35", displayOrder: 1,
  },
  {
    id: "projet-ms37",
    title: "Projet MS37",
    category: "Rénovation Urbaine",
    location: "Strombeek, Flandre",
    year: "2022",
    description: "Rénovation et extension d'une maison de ville en contexte urbain dense. Extension en façade arrière, redistribution intérieure et ajout d'un niveau sous nouvelle toiture.",
    fullDescription: "Dans un contexte urbain dense à Strombeek, cette maison de ville a été entièrement repensée. L'extension en façade arrière libère le séjour vers le jardin. La redistribution intérieure optimise chaque mètre carré. Un niveau supplémentaire sous nouvelle toiture accueille deux chambres et un bureau en attique.",
    image: `${BASE}/property-081.jpg`,
    gallery: [`${BASE}/thumbnail-12.jpg`, `${BASE}/thumbnail-121.jpg`, `${BASE}/thumbnail-13.jpg`, `${BASE}/thumbnail-131.jpg`, `${BASE}/thumbnail-14.jpg`, `${BASE}/thumbnail-141.jpg`],
    specSurface: "N/C", specDuration: "N/C", specBudget: "Confidentiel", specTeam: "Premier Art SRL",
    featured: true, color: "#2e2a28", displayOrder: 2,
  },
  {
    id: "projet-ceb27",
    title: "Projet CEB27",
    category: "Architecture Médicale",
    location: "Bruxelles",
    year: "2023",
    description: "Reconversion d'anciens aquariums en centre médical pluridisciplinaire. Médecine générale, kinésithérapie, dentisterie, psychologie, psychiatrie, radiologie et salle d'opération.",
    fullDescription: "Cet ancien bâtiment d'aquariums à Bruxelles a été métamorphosé en un centre médical pluridisciplinaire. Des patios végétalisés percés dans la structure existante apportent une lumière naturelle précieuse à chaque espace. La circulation a été entièrement rationalisée pour servir à la fois patients et praticiens.",
    image: `${BASE}/property-082.jpg`,
    gallery: [`${BASE}/thumbnail-20.jpg`, `${BASE}/thumbnail-201.jpg`, `${BASE}/thumbnail-21.jpg`, `${BASE}/thumbnail-211.jpg`, `${BASE}/thumbnail-22.jpg`, `${BASE}/thumbnail-221.jpg`],
    specSurface: "N/C", specDuration: "N/C", specBudget: "Confidentiel", specTeam: "Premier Art SRL",
    featured: false, color: "#2a2830", displayOrder: 3,
  },
  {
    id: "projet-pvh53",
    title: "Immeuble PVH53",
    category: "Immeuble Résidentiel",
    location: "Bruxelles",
    year: "2022",
    description: "Immeuble d'angle accueillant deux duplex familiaux et deux garages. Façade en brique rouge avec encadrements beige clair.",
    fullDescription: "Implanté sur un terrain d'angle à Bruxelles, cet immeuble mixte abrite deux duplex familiaux et deux garages. La façade principale en brique rouge avec ses encadrements beige clair s'inscrit harmonieusement dans le tissu urbain existant.",
    image: `${BASE}/property-084.jpg`,
    gallery: [`${BASE}/thumbnail-40.jpg`, `${BASE}/thumbnail-401.jpg`, `${BASE}/thumbnail-41.jpg`, `${BASE}/thumbnail-411.jpg`, `${BASE}/thumbnail-42.jpg`, `${BASE}/thumbnail-421.jpg`],
    specSurface: "N/C", specDuration: "N/C", specBudget: "Confidentiel", specTeam: "Premier Art SRL",
    featured: false, color: "#2e2d28", displayOrder: 4,
  },
  {
    id: "projet-mw1341",
    title: "Projet MW1341",
    category: "Architecture Médicale",
    location: "Auderghem, Bruxelles",
    year: "2022",
    description: "Centre médical pluridisciplinaire à Auderghem. Radiologie, médecine générale, ORL, gynécologie, dentisterie et soins psychologiques.",
    fullDescription: "Ce centre médical pluridisciplinaire à Auderghem regroupe radiologie, médecine générale, ORL, gynécologie, dentisterie et soins psychologiques. Un socle en briques de verre, des papiers peints graphiques distincts pour chaque spécialité et des espaces d'attente humanisés définissent l'identité du lieu.",
    image: `${BASE}/property-085.jpg`,
    gallery: [`${BASE}/thumbnail-49.jpg`, `${BASE}/thumbnail-491.jpg`, `${BASE}/thumbnail-50.jpg`, `${BASE}/thumbnail-501.jpg`, `${BASE}/thumbnail-51.jpg`, `${BASE}/thumbnail-511.jpg`],
    specSurface: "N/C", specDuration: "N/C", specBudget: "Confidentiel", specTeam: "Premier Art SRL",
    featured: false, color: "#282e2d", displayOrder: 5,
  },
  {
    id: "projet-pl3",
    title: "Projet PL3",
    category: "Maison Individuelle",
    location: "Wallonie",
    year: "2022",
    description: "Maison familiale en simplicité maîtrisée — volume à toiture deux pans, terrasse bois, carport latéral. Brique beige clair et anthracite, menuiseries noires minimalistes.",
    fullDescription: "Cette maison individuelle en Wallonie illustre l'approche de Premier Art : une architecture résidentielle où la simplicité formelle cache une grande maîtrise technique. Le calepinage des briques et les menuiseries noires créent une élégance sobre et durable.",
    image: `${BASE}/property-086.jpg`,
    gallery: [`${BASE}/thumbnail-56.jpg`, `${BASE}/thumbnail-561.jpg`, `${BASE}/thumbnail-57.jpg`, `${BASE}/thumbnail-571.jpg`],
    specSurface: "N/C", specDuration: "N/C", specBudget: "Confidentiel", specTeam: "Premier Art SRL",
    featured: false, color: "#2a2828", displayOrder: 6,
  },
  {
    id: "projet-pw10",
    title: "Projet PW10",
    category: "Extension Verticale",
    location: "Waterloo, Wallonie",
    year: "2023",
    description: "Surélévation complète d'une maison quatre façades existante. Brique rouge régionale et ardoise en toiture. Suite parentale, chambres d'enfants et terrasse bois avec cheminée.",
    fullDescription: "À Waterloo, cette surélévation complète d'une maison quatre façades ajoute un niveau entier tout en respectant le caractère résidentiel du quartier. La brique rouge régionale et la toiture en ardoise assurent la continuité avec le bâti existant.",
    image: `${BASE}/property-087.jpg`,
    gallery: [`${BASE}/thumbnail-60.jpg`, `${BASE}/thumbnail-601.png`, `${BASE}/thumbnail-61.jpg`, `${BASE}/thumbnail-611.png`, `${BASE}/thumbnail-62.jpg`, `${BASE}/thumbnail-621.png`],
    specSurface: "N/C", specDuration: "N/C", specBudget: "Confidentiel", specTeam: "Premier Art SRL",
    featured: false, color: "#2e2a2a", displayOrder: 7,
  },
  {
    id: "projet-sb72",
    title: "Projet SB72",
    category: "Rénovation & Extension",
    location: "Flandre",
    year: "2024",
    description: "Rénovation et extension d'une maison familiale en Flandre. Surélévation avec vues sur les champs. Suite parentale en attique, baies vitrées généreuses. Crépis blanc et menuiseries noires.",
    fullDescription: "Cette maison familiale en Flandre a été profondément transformée par une rénovation totale associée à une extension. Le projet préserve les vues sur les champs alentour. La suite parentale créée en attique bénéficie d'un panorama exceptionnel.",
    image: `${BASE}/property-088.jpg`,
    gallery: [`${BASE}/thumbnail-68.jpg`, `${BASE}/thumbnail-681.png`, `${BASE}/thumbnail-69.jpg`, `${BASE}/thumbnail-691.png`, `${BASE}/thumbnail-70.jpg`, `${BASE}/thumbnail-701.png`],
    specSurface: "N/C", specDuration: "N/C", specBudget: "Confidentiel", specTeam: "Premier Art SRL",
    featured: false, color: "#2c2e28", displayOrder: 8,
  },
];

async function main() {
  console.log("Seeding database...");
  for (const p of projects) {
    await prisma.project.upsert({
      where: { id: p.id },
      update: {},
      create: {
        ...p,
        gallery: JSON.stringify(p.gallery),
      },
    });
    console.log(`  ✓ ${p.title}`);
  }
  console.log("Done!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

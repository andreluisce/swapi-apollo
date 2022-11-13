import { getPageFetcher } from "../connectors/swapi";
import createImageUrl from "../utils/createImageUrl";

const path = "/species/";

export default (fetch) => ({
  Query: {
    allSpecies: (_, params) =>
      getPageFetcher(fetch)(path, params.search, params.offset, params.limit),
    species: (_, params) => fetch(`${path}${params.id}/`),
  },
  Species: {
    id: (species) => species.url.replace(/\D/g, ""),
    name: (species) => species.name,
    entity: () => "species",
    imageEntity: (specie) => ({
      width: 400,
      height: 550,
      placeholderPath: createImageUrl("placeholders", 'species'),
      imageUrl: createImageUrl("species", specie.url.replace(/\D/g, "")),
    }),

    attributes: (species, _, context) => ({
      averageHeight: isNaN(species.average_height)
        ? null
        : species.average_height,
      designation: species.designation,
      language: species.language,
      classification: species.classification,
      skinColors: species.skin_colors.split(","),
      hairColors: species.hair_colors.split(","),
      eyeColors: species.eye_colors.split(","),
      averageLifespan: species.average_lifespant,
      homeworld: species.homeworld
        ? context.loader.load(species.homeworld)
        : null,
    }),

    associations: (species, _, context) => ({
      people: context.loader.loadMany(species.people),
      films: context.loader.loadMany(species.films),
    }),
  },
});

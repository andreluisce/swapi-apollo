import { getPageFetcher } from "../connectors/swapi";
import createImageUrl from "../utils/createImageUrl";

const path = "/people/";

export default (fetch) => ({
  Query: {
    allPeople: (_, params) =>
      getPageFetcher(fetch)(path, params.search, params.offset, params.limit),
    person: (_, params) => fetch(`${path}${params.id}/`),
  },
  Person: {
    id: (person) => person.url.replace(/\D/g, ""),
    name: (person) => person.name,
    entity: () => "people",
    imageEntity: (person) => ({
      width: 400,
      height: 550,
      placeholderPath:createImageUrl("placeholders", 'people'),
      imageUrl: createImageUrl("people", person.url.replace(/\D/g, "")),
    }),

    attributes: (person, _, context) => ({
      hairColor: person.hair_color,
      gender: person.gender,
      mass: person.mass,
      height: person.height,
      skinColor: person.skin_color,
      eyeColor: person.eye_color,
      birthYear: person.birth_year,
      homeworld: context.loader.load(person.homeworld),
    }),
    associations: (person, _, context) => ({
      films: context.loader.loadMany(person.films),
      species: context.loader.loadMany(person.species),
      starships: context.loader.loadMany(person.starships),
      vehicles: context.loader.loadMany(person.vehicles),
    }),
  },
});

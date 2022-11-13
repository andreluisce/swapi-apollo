import { getPageFetcher } from "../connectors/swapi";
import createImageUrl from "../utils/createImageUrl";

const path = "/planets/";

export default (fetch) => ({
  Query: {
    allPlanets: (_, params) =>
      getPageFetcher(fetch)(path, params.search, params.offset, params.limit),
    planet: (_, params) => fetch(`${path}${params.id}/`),
  },
  Planet: {
    id: (planet) => planet.url.replace(/\D/g, ""),
    name: (planet) => planet.name,
    entity: () => "planets",
    imageEntity: (planet) => ({
      width: 400,
      height: 400,
      placeholderPath: createImageUrl("placeholders", 'planets'),
      imageUrl: createImageUrl("planets", planet.url.replace(/\D/g, "")),
    }),
    attributes: (planet) => ({
      rotationPeriod: planet.rotation_period,
      orbitalPeriod: planet.orbital_period,
      surfaceWater: planet.surface_water,
      diameter: planet.diameter,
      climate: planet.climate,
      gravity: planet.gravity,
      terrain: planet.terrain,
      population: planet.population,
    }),
    associations: (planet, _, context) => ({
      residents: context.loader.loadMany(planet.residents),
      films: context.loader.loadMany(planet.films),
    }),
  },
});

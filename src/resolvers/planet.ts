import { getPageFetcher } from '../connectors/swapi'
import createImageUrl from '../utils/createImageUrl'

const path = '/planets/'

export default (fetch) => ({
  Query: {
      allPlanets: (_, params) => getPageFetcher(fetch)(path, params.search, params.offset, params.limit),
      planet: (_, params) => fetch(params.id || `${path}${params.planetID}/`),
  },
  Planet: {
    id: (planet) => planet.url.replace(/\D/g, ''),
    rotationPeriod: (planet) => planet.rotation_period,
    orbitalPeriod: (planet) => planet.orbital_period,
    surfaceWater: (planet) => planet.surface_water,
    residents: (planet, _, context) => context.loader.loadMany(planet.residents),
    films: (planet, _, context) => context.loader.loadMany(planet.films),
    imageUrl: (planet) => createImageUrl('planets', planet.url.replace(/\D/g, '')),
  },
})

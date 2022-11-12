import { getPageFetcher } from '../connectors/swapi'
import createImageUrl from '../utils/createImageUrl'

const path = '/starships/'

export default (fetch) => ({
  Query: {
      allStarships: (_, params) => getPageFetcher(fetch)(path, params.search, params.offset, params.limit),
      starship: (_, params) => fetch(`${path}${params.id}/`),
  },
  Starship: {
    id: (starship) => starship.url.replace(/\D/g, ''),
    costInCredits: (starship) => starship.cost_in_credits,
    maxAtmospheringSpeed: (starship) => starship.max_atmosphering_speed,
    cargoCapacity: (starship) => starship.cargo_capacity,
    hyperdriveRating: (starship) => starship.hyperdrive_rating,
    starshipClass: (starship) => starship.starship_class,
    pilots: (starship, _, context) => context.loader.loadMany(starship.pilots),
    films: (starship, _, context) => context.loader.loadMany(starship.films),
    imageUrl: (starship) => createImageUrl('starships', starship.url.replace(/\D/g, '')),
  },
})

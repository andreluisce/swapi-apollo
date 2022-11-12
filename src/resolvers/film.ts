import { getPageFetcher } from '../connectors/swapi'
import createImageUrl from '../utils/createImageUrl'

const path = '/films/'

export default (fetch) => ({
  Query: {
      allFilms: (_, params) => getPageFetcher(fetch)(path, params.search, params.offset, params.limit),
      film: (_, params) => fetch(params.id || `${path}${params.filmID}/`),
  },
  Film: {
    id: (film) => film.url,
    episodeID: (film) => film.episode_id,
    openingCrawl: (film) => film.opening_crawl,
    releaseDate: (film) => film.release_date,
    imageUrl: (film) => createImageUrl('films', film.episode_id),
    details: (film) => ({
      species: film.species,
      starships: film.starships,
      vehicles: film.vehicles,
      characters: film.characters,
      planets: film.planets,
    }),
  },
  FilmDetails: {
    species: (details, _, context) => context.loader.loadMany(details.species),
    starships: (details, _, context) => context.loader.loadMany(details.starships),
    vehicles: (details, _, context) => context.loader.loadMany(details.vehicles),
    characters: (details, _, context) => context.loader.loadMany(details.characters),
    planets: (details, _, context) => context.loader.loadMany(details.planets),
  },
})

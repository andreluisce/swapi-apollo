import { getPageFetcher } from "../connectors/swapi";
import createImageUrl from "../utils/createImageUrl";

const path = "/films/";

export default (fetch) => ({
  Query: {
    allFilms: (_, params) =>
      getPageFetcher(fetch)(path, params.search, params.offset, params.limit),
    film: (_, params) => fetch(`${path}${params.id}/`),
  },
  Film: {
    id: (film) => film.url.replace(/\D/g, ""),
    name: (film) => film.title,
    
    entity: () => "films",
    imageEntity: (film) => ({
      width: 400,
      height: 550,
      placeholderPath: createImageUrl("placeholders", 'placeholder_tall'),
      imageUrl:  createImageUrl("films", film.episode_id),
    }),
    attributes: (film) => ({
      episodeID: film.episode_id,
      openingCrawl: film.opening_crawl,
      releaseDate: film.release_date,
      director: film.director,
      producers: film?.producer?.split?.(","),
    }),
    associations: (film, _, context) => ({
      species: context.loader.loadMany(film.species),
      starships: context.loader.loadMany(film.starships),
      vehicles: context.loader.loadMany(film.vehicles),
      characters: context.loader.loadMany(film.characters),
      planets: context.loader.loadMany(film.planets),
    }),
  },
});

import { getPageFetcher } from "../connectors/swapi";
import createImageUrl from "../utils/createImageUrl";

const path = "/starships/";

export default (fetch) => ({
  Query: {
    allStarships: (_, params) =>
      getPageFetcher(fetch)(path, params.search, params.offset, params.limit),
    starship: (_, params) => fetch(`${path}${params.id}/`),
  },
  Starship: {
    id: (starship) => starship.url.replace(/\D/g, ""),
    name: (starship) => starship.name,
    entity: () => "starships",
    imageEntity: (starship) => ({
      width: 600,
      height: 400,
      placeholderPath:createImageUrl("placeholders", 'starships'),
      imageUrl: createImageUrl("starships", starship.url.replace(/\D/g, "")),
    }),
    

    attributes: (starship) => ({
      costInCredits: isNaN(starship.cost_in_credits) ? null : starship.cost_in_credits as number,
      maxAtmospheringSpeed: starship.max_atmosphering_speed,
      cargoCapacity: starship.cargo_capacity,
      hyperdriveRating: starship.hyperdrive_rating,
      starshipClass: starship.starship_class,
    }),
    
    associations:(starship, _, context) => ({
      pilots:  context.loader.loadMany(starship.pilots),
    films:  context.loader.loadMany(starship.films),
    })
  },
});

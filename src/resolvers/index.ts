import { IFetcher } from "../connectors/swapi";
import film from "./film";
import people from "./people";
import planet from "./planet";
import species from "./species";
import starship from "./starship";
import vehicle from "./vehicle";

export default (fetch: IFetcher) =>
  Object.assign(
    {},
    film(fetch),
    people(fetch),
    planet(fetch),
    species(fetch),
    starship(fetch),
    vehicle(fetch),
    {
      Query: Object.assign(
        {},
        film(fetch).Query,
        people(fetch).Query,
        planet(fetch).Query,
        species(fetch).Query,
        starship(fetch).Query,
        vehicle(fetch).Query
      ),

      Item: {
        __resolveType(obj, context, info) {
            debugger
          // Only Author has a name field
          if (obj.episode_id) {
            return "Film";
          }
          if (obj.birth_year) {
            return "Person";
          }
          if (obj.rotationPeriod) {
            return "Planet";
          }
          if (obj.rotation_period) {
            return "Planet";
          }
          if (obj.language) {
            return "Species";
          }
          if (obj.starship_class) {
            return "Starship";
          }
          if (obj.vehicle_class) {
            return "Vehicle";
          }

          return null; // GraphQLError is thrown
        },
      },
    }
  );

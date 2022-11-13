import { getPageFetcher } from "../connectors/swapi";
import createImageUrl from "../utils/createImageUrl";

const path = "/vehicles/";

export default (fetch) => ({
  Query: {
    allVehicles: (_, params) =>
      getPageFetcher(fetch)(path, params.search, params.offset, params.limit),
    vehicle: (_, params) => fetch(`${path}${params.id}/`),
  },
  Vehicle: {
    id: (vehicle) => vehicle.url.replace(/\D/g, ""),
    name: (vehicle) => vehicle.name,
    entity: () => "vehicles",
    imageEntity: (vehicle)=> ({
      width: 600,
      height: 400,
      placeholderPath: createImageUrl("placeholders", 'vehicles'),
      imageUrl: createImageUrl("vehicles", vehicle.url.replace(/\D/g, "")),
    }),
    
    attributes: (vehicle) =>  {
      return {
        costInCredits: isNaN(vehicle.cost_in_credits) ? null : vehicle.cost_in_credits as number,
        maxAtmospheringSpeed: vehicle.max_atmosphering_speed,
        cargoCapacity: vehicle.cargo_capacity,
        vehicleClass: vehicle.vehicle_class,
        model: vehicle.model,
        manufacturer: vehicle.manufacturer,
        length: vehicle.length,
        crew: vehicle.crew,
        passengers: vehicle.passengers,
        consumables: vehicle.consumables,
      }
    },

    associations: (vehicle, _, context) => ({
      pilots: context.loader.loadMany(vehicle.pilots),
      films: context.loader.loadMany(vehicle.films),
    }),
  },
});

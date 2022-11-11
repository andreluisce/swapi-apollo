import { getPageFetcher } from '../connectors/swapi'
import createImageUrl from '../utils/createImageUrl'

const path = '/vehicles/'

export default (fetch) => ({
  RootQuery: {
      allVehicles: (_, params) => getPageFetcher(fetch)(path, params.search, params.offset, params.limit),
      vehicle: (_, params) => fetch(params.id || `${path}${params.vehicleID}/`),
  },
  Vehicle: {
    id: (vehicle) => vehicle.url,
    costInCredits: (vehicle) => vehicle.cost_in_credits,
    maxAtmospheringSpeed: (vehicle) => vehicle.max_atmosphering_speed,
    cargoCapacity: (vehicle) => vehicle.cargo_capacity,
    vehicleClass: (vehicle) => vehicle.vehicle_class,
    pilots: (vehicle, _, context) => context.loader.loadMany(vehicle.pilots),
    films: (vehicle, _, context) => context.loader.loadMany(vehicle.films),
    imageUrl: (vehicle) => createImageUrl('vehicles', vehicle.url.replace(/\D/g, '')),
  },
})

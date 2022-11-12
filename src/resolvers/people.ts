import { getPageFetcher } from '../connectors/swapi'
import createImageUrl from '../utils/createImageUrl'

const path = '/people/'

export default (fetch) => ({
  Query: {
      allPeople: (_, params) => getPageFetcher(fetch)(path, params.search, params.offset, params.limit),
      person: (_, params) => fetch(params.id || `${path}${params.personID}/`),
  },
  Person: {
    id: (person) => person.url.replace(/\D/g, ''),
    hairColor: (person) => person.hair_color,
    skinColor: (person) => person.skin_color,
    eyeColor: (person) => person.eye_color,
    birthYear: (person) => person.birth_year,
    homeworld: (person, _, context) => context.loader.loadMany(person.homeworld),
    films: (person, _, context) => context.loader.loadMany(person.films),
    species: (person, _, context) => context.loader.loadMany(person.species),
    starships: (person, _, context) => context.loader.loadMany(person.starships),
    vehicles: (person, _, context) => context.loader.loadMany(person.vehicles),
    imageUrl: (person) => createImageUrl('people', person.url.replace(/\D/g, '')),
  },
})

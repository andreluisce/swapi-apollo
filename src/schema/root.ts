export default `

type RootQuery {
  allFilms(after: String, first: Int, before: String, last: Int): FilmsConnection
  film(id: ID, filmID: ID): Film
  allPeople(after: String, first: Int, before: String, last: Int): PeopleConnection
  person(id: ID, personID: ID): Person
  allPlanets(after: String, first: Int, before: String, last: Int): PlanetsConnection
  planet(id: ID, planetID: ID): Planet
  allSpecies(after: String, first: Int, before: String, last: Int): SpeciesConnection
  species(id: ID, speciesID: ID): Species
  allStarships(after: String, first: Int, before: String, last: Int): StarshipsConnection
  starship(id: ID, starshipID: ID): Starship
  allVehicles(after: String, first: Int, before: String, last: Int): VehiclesConnection
  vehicle(id: ID, vehicleID: ID): Vehicle
  node(id: ID!): Node
}

`
const ports = {
    localServer: "",
};

const endpoints = {
    swapiAPI: 'https://swapi.dev/api',
    localServer: "https://swapi-graphql.onrender.com"
};

const config = {
    serverRuntimeConfig: {
        endpoints,
        ports,
    },
};

export default config;

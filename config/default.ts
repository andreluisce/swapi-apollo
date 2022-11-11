const ports = {
    localServer: 3001,
};

const endpoints = {
    swapiAPI: 'https://swapi.dev/api',
    localServer: "http://localhost"
};

const config = {
    serverRuntimeConfig: {
        endpoints,
        ports,
    },
};

export default config;

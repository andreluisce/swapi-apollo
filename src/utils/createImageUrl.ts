import config from 'config';

const PORT = config.get('serverRuntimeConfig.ports.localServer');
const URL = config.get('serverRuntimeConfig.endpoints.localServer')

const _port = PORT ? `:${PORT}` : "";
const createImageUrl = (resource:string, id: string) => `${URL}${_port}/static/${resource}/${id}.jpg`

export default createImageUrl;

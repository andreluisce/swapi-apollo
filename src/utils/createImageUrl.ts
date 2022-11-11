import config from 'config';

const PORT = config.get('serverRuntimeConfig.ports.localServer');
const URL = config.get('serverRuntimeConfig.endpoints.localServer')

const createImageUrl = (resource:string, id: string) => `${URL}:${PORT}/static/${resource}/${id}.jpg`

export default createImageUrl;

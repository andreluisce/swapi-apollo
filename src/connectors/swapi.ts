process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

import axios from "axios";
import https from 'https';

const DataLoader = require("dataloader");

export interface IFetcher {
  (resource: string): Promise<any>;
}

export const getFetcher = (rootURL?: string): IFetcher => {
  const apiRoot = rootURL;

  return (resource: string): Promise<any> => {
    const url = resource.indexOf(apiRoot) === 0 ? resource : apiRoot + resource;

    const agent = new https.Agent({  
      rejectUnauthorized: false
    });

    return axios.get(url,  { httpsAgent: agent })
    .then((response) => response.data)
    .catch(err => console.log(err));

  };
};

export const getLoader = (fetch: IFetcher) => {
  return new DataLoader(
    (urls) => {
      const promises = urls.map((url) => {
        return fetch(url);
      });
      return Promise.all(promises);
    },
    { batch: false }
  );
};

export const getPageFetcher =
  (fetch: IFetcher) =>
  (resource: string, search?: string, offset?: number, limit?: number) => {
    let results = [];
    let index = 0;
    const size = limit || 0;

    function pagination(pageURL: string) {
      const urlApi = pageURL.includes("swapi.dev/api")
        ? pageURL
        : search
        ? `${pageURL}?search=${search}`
        : pageURL;
      return new Promise<any>((resolve, reject) => {
        fetch(urlApi).then((data) => {
          // fast forward until offset is reached
          if (offset && results.length === 0) {
            if (index + data.results.length > offset) {
              results = data.results.slice(offset - index);
            }
            if (data.next) {
              index = index + data.results.length;
              pagination(data.next).then(resolve);
            } else {
              resolve({ results, count: data.count, page: index? (index / 10): 1 });
            }
          } else {
            if (size > 0 && size - results.length - data.results.length < 0) {
              results = results.concat(
                data.results.slice(0, size - results.length)
              );
            } else {
              results = results.concat(data.results);
            }
            if (data.next && (size === 0 || size - results.length > 0)) {
              pagination(data.next).then(resolve);
            } else {
              resolve({ results, count: data.count, page: index? (index / 10): 1 });
            }
          }
        });
      });
    }

    return pagination(resource);
  };

import httpService from "./http.service";

const catalogEndpoint = "catalog/";

const catalogService = {
  get: async () => {
    const { data } = await httpService.get(catalogEndpoint);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.post(catalogEndpoint, payload);
    return data;
  },
  remove: async (productId) => {
    const { data } = await httpService.delete(catalogEndpoint, productId);
    return data;
  },
  update: async (payload, productId) => {
    const { data } = await httpService.patch(
      catalogEndpoint + productId,
      payload
    );
    return data;
  },
};

export default catalogService;

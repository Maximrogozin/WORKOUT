import httpService from "./http.service";

const catalogEndpoint = "catalog/";

const catalogService = {
  getProducts: async () => {
    const { data } = await httpService.get(catalogEndpoint);
    return data;
  },
  createProduct: async (payload) => {
    const { data } = await httpService.post(catalogEndpoint, payload);
    return data;
  },
  removeProduct: async (productId) => {
    const { data } = await httpService.delete(catalogEndpoint, productId);
    return data;
  },
};

export default catalogService;

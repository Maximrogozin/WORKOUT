import httpService from "./http.service";

const orderEndpoint = "orders/";

const ordersService = {
  get: async () => {
    const { data } = await httpService.get(orderEndpoint);
    return data;
  },
  remove: async (orderId) => {
    const { data } = await httpService.delete(orderEndpoint + orderId);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.post(orderEndpoint, payload);
    return data;
  },
};

export default ordersService;

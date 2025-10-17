import httpRequest from "../http";

class OrdersService {

    #requestUrl = "orders";

    createOrder = async (token, formData) => {
        httpRequest.headers = {
            Authorization: "Bearer " + token,
        };
        return await httpRequest.createOne(`${this.#requestUrl}`, formData)
    }

    getOrders = async (token, status = 'active', page=1) => {
        httpRequest.headers = {
            Authorization: "Bearer " + token,
        };
        return await httpRequest.getAll(`${this.#requestUrl}/?status=${status}&pg=${page}&lt=20`)
    }
    
}

export default OrdersService;
import httpRequest from "../http";

class OrdersService {

    #requestUrl = "orders";

    createOrder = async (token, formData) => {
        httpRequest.headers = {
            Authorization: "Bearer " + token,
        };
        return await httpRequest.createOne(`${this.#requestUrl}`, formData)
    }

    getOrders = async (token) => {
        httpRequest.headers = {
            Authorization: "Bearer " + token,
        };
        return await httpRequest.getAll(`${this.#requestUrl}`)
    }
    
}

export default OrdersService;
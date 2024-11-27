import httpRequest from "../http";

class OrdersService {

    #requestUrl = "orders";

    createOrder = async (token, formData) => {
        httpRequest.headers = {
            Authorization: "Bearer " + token,
        };
        return await httpRequest.createOne(`${this.#requestUrl}`, formData)
    }
}

export default OrdersService;
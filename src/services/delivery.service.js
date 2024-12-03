import httpRequest from "../http";

class DeliveryService {

    #requestUrl = "delivery";

    getFee = async (token) => {
        httpRequest.headers = {
            Authorization: "Bearer " + token
        };
        return await httpRequest.getAll(`${this.#requestUrl}/fee`)
    }
}

export default DeliveryService;
import httpRequest from "../http";

class PriceTableService {

    #requestUrl = "price-table";

    getPriceTable = async (formData) => {
        return await httpRequest.post(`${this.#requestUrl}`, formData)
    }
}

export default PriceTableService;
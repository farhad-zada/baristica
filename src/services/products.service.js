import httpRequest from "../http";

class ProductsService {

    #requestUrl = "products";

    getProducts = async (token, type) => {
        httpRequest.headers = {
            Authorization: "Bearer " + token,
        };
        return await httpRequest.getAll(`${this.#requestUrl}?ptp=${type}`)
    }

}

export default ProductsService;
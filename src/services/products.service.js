import httpRequest from "../http";

class ProductsService {

    #requestUrl = "products";

    getProducts = async (token, type) => {
        httpRequest.headers = {
            Authorization: "Bearer " + token,
        };
        return await httpRequest.getAll(`${this.#requestUrl}?ptp=${type}`)
    }
    getProductsByType = async (token,type, key) => {
        httpRequest.headers = {
            Authorization: "Bearer " + token,
        };
        return await httpRequest.getAll(`${this.#requestUrl}?ptp=${type}&key=${key}`)
    }
}

export default ProductsService;
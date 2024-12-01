import httpRequest from "../http";

class ProductsService {

    #requestUrl = "products";

    getProducts = async (token, type, page) => {
        if (token) {
            httpRequest.headers = {
                Authorization: "Bearer " + token,
            };
        }
        return await httpRequest.getAll(`${this.#requestUrl}?ptp=${type}&lt=9&pg=${page}`)
    }
    getProductsByType = async (token, type, key) => {
        httpRequest.headers = {
            Authorization: "Bearer " + token,
        };
        return await httpRequest.getAll(`${this.#requestUrl}?ptp=${type}&key=${key}`)
    }

    getOneProduct = async (token, id) => {
        if (token) {
            httpRequest.headers = {
                Authorization: "Bearer " + token,
            };
        }
        return await httpRequest.getOne(`${this.#requestUrl}`, id)
    }

    rateProduct = async (token, id, formData) => {
        if (token) {
            httpRequest.headers = {
                Authorization: "Bearer " + token,
            };
        }
        return await httpRequest.createOne(`${this.#requestUrl}/${id}/rate`, formData)
    }
}

export default ProductsService;
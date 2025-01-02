import httpRequest from "../http";

class ProductsService {

    #requestUrl = "products";

    getProducts = async (token, type, page, filter) => {
        if (token) {
            httpRequest.headers = {
                Authorization: "Bearer " + token,
            };
        }
        return await httpRequest.getAll(`${this.#requestUrl}?ptp=${type}&lt=9&pg=${page}&${filter}`)
    }
    getProductsByType = async (token,filterWord, type, key) => {
        if(token){
            httpRequest.headers = {
                Authorization: "Bearer " + token,
            };
        }
        return await httpRequest.getAll(`${this.#requestUrl}?ptp=${type}&${filterWord}=${key}`)
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
import httpRequest from "../http";

class ProductsService {

    #requestUrl = "products";

    getProducts = async (token, type) => {
        if(token){
            httpRequest.headers = {
                Authorization: "Bearer " + token,
            };
        }
        return await httpRequest.getAll(`${this.#requestUrl}?ptp=${type}`)
    }
    getProductsByType = async (token,type, key) => {
        httpRequest.headers = {
            Authorization: "Bearer " + token,
        };
        return await httpRequest.getAll(`${this.#requestUrl}?ptp=${type}&key=${key}`)
    }

    getOneProduct = async (token, id) => {
        if(token){
            httpRequest.headers = {
                Authorization: "Bearer " + token,
            };
        }
        return await httpRequest.getOne(`${this.#requestUrl}`, id)
    }
}

export default ProductsService;
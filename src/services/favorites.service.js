import httpRequest from "../http";

class FavoritesService {

    #requestUrl = "favorites";
    addFavorite = async(token, id) => {
        httpRequest.headers = {
            Authorization: "Bearer " + token,
        }
        return await httpRequest.postOne(`${this.#requestUrl}`, id)
    }
    
    getFavorites = async (token, type) => {
        httpRequest.headers = {
            Authorization: "Bearer " + token,
        };
        return await httpRequest.getAll(`${this.#requestUrl}?ptp=${type}`)
    }
    getFavoritesByType = async (token,type, key) => {
        httpRequest.headers = {
            Authorization: "Bearer " + token,
        };
        return await httpRequest.getAll(`${this.#requestUrl}?ptp=${type}&key=${key}`)
    }
}

export default FavoritesService;
import httpRequest from "../http";

class FavoritesService {

    #requestUrl = "favorites";
    addFavorite = async(token, id) => {
        httpRequest.headers = {
            Authorization: "Bearer " + token,
        }
        return await httpRequest.postOne(`${this.#requestUrl}`, id)
    }
    
    getFavorites = async (token) => {
        httpRequest.headers = {
            Authorization: "Bearer " + token,
        };
        return await httpRequest.getAll(`${this.#requestUrl}`)
    }
    
    getFavoritesByType = async (token,type, key) => {
        httpRequest.headers = {
            Authorization: "Bearer " + token,
        };
        return await httpRequest.getAll(`${this.#requestUrl}?ptp=${type}&key=${key}`)
    }
}

export default FavoritesService;
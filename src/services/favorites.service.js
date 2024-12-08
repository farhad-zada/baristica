import httpRequest from "../http";

class FavoritesService {

    #requestUrl = "favorites";
    addFavorite = async(token, id) => {
        httpRequest.headers = {
            Authorization: "Bearer " + token,
        }
        return await httpRequest.postOne(`${this.#requestUrl}`, id)
    }
    
    getFavorites = async (token, page = 1) => {
        httpRequest.headers = {
            Authorization: "Bearer " + token,
        };
        return await httpRequest.getAll(`${this.#requestUrl}?lt=9&pg=${page}`)
    }
    
    getFavoritesByType = async (token,type, key) => {
        httpRequest.headers = {
            Authorization: "Bearer " + token,
        };
        return await httpRequest.getAll(`${this.#requestUrl}?ptp=${type}&key=${key}`)
    }
}

export default FavoritesService;
import httpRequest from "../http";

class CountriesService {

    #requestUrl = "countries";

    getCountries = async (token) => {
        return await httpRequest.getAll(`${this.#requestUrl}`)
    }
}

export default CountriesService;
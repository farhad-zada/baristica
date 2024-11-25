import httpRequest from "../http";

class UserService {

    #requestUrl = "me";
    getUser = async (token) => {
        httpRequest.headers = {
            Authorization: "Bearer " + token,
        };
        return await httpRequest.getAll(`${this.#requestUrl}`)
    }

}

export default UserService;
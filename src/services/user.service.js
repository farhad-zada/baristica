import httpRequest from "../http";

class UserService {

    #requestUrl = "users";
    getUser = async (token) => {
        httpRequest.headers = {
            Authorization: "Bearer " + token,
        };
        return await httpRequest.getAll(`${this.#requestUrl}/me`)
    }

}

export default UserService;
import httpRequest from "../http";

class UserService {

    #requestUrl = "users";
    getUser = async (token) => {
        httpRequest.headers = {
            Authorization: "Bearer " + token,
        };
        return await httpRequest.getAll(`${this.#requestUrl}/me`)
    }
    changePersonalData = async (token, formData) => {
        httpRequest.headers = {
            Authorization: "Bearer " + token,
        };
        return await httpRequest.patchOne(`${this.#requestUrl}/me`, '', formData)
    }
    addAddress = async (token, formData) => {
        httpRequest.headers = {
            Authorization: "Bearer " + token,
        };
        return await httpRequest.createOne(`${this.#requestUrl}/me/address`, formData)
    }
    deleteAddress = async (token, id) => {
        httpRequest.headers = {
            Authorization: "Bearer " + token,
        };
        return await httpRequest.deleteOne(`${this.#requestUrl}/me/address`, id)
    }
    editAddress = async (token, id, formData) => {
        httpRequest.headers = {
            Authorization: "Bearer " + token,
        };
        return await httpRequest.patchOne(`${this.#requestUrl}/me/address`, id, formData)
    }

    getComments = async (token, page) => {
        httpRequest.headers = {
            Authorization: "Bearer " + token,
        };
        return await httpRequest.getAll(`${this.#requestUrl}/comments?lt=2&pg=${page}`)
    }


}

export default UserService;
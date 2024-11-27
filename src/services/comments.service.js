import httpRequest from "../http";

class CommentsService {

    #requestUrl = "comments";

    getMyComments = async (token) => {
        httpRequest.headers = {
            Authorization: "Bearer " + token,
        };
        return await httpRequest.getAll(`${this.#requestUrl}`)
    }
    createComment = async (token, formData) => {
        httpRequest.headers = {
            Authorization: "Bearer " + token,
        };
        return await httpRequest.createOne(`${this.#requestUrl}`, formData)
    }
    updateComment = async (token, formData, id) => {
        httpRequest.headers = {
            Authorization: "Bearer " + token,
        };
        return await httpRequest.updateByPatch(`${this.#requestUrl}`, id, formData)
    }
}

export default CommentsService;
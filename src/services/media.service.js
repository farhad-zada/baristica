import httpRequest from "../http";

class MediaService {

    #requestUrl = "media";

    createImg = async (token, formData) => {
        httpRequest.headers = {
            Authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
        };
        return await httpRequest.createOne(`${this.#requestUrl}`, formData)
    }
}

export default MediaService;
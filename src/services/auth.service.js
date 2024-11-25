import httpRequest from "../http";

class AuthService {

    #requestUrl = "auth";
    register = async (formData) => {
        return await httpRequest.post(`${this.#requestUrl}/register`, formData)
    }

    login = async (formData) => {
        return await httpRequest.post(`${this.#requestUrl}/login`, formData)
    }
    // ask about this
    logout = async (token) => {
        httpRequest.headers = {
            Authorization: "Bearer " + token,
        };
        return await httpRequest.post(`${this.#requestUrl}/login`, {})
    }

    forgotPassword = async (formData) => {
        return await httpRequest.post(`${this.#requestUrl}/forgot-password`, formData)
    }

    resetPassword = async (formData, token) => {
        // ask about reset token ( should it be in bearer or in query )
        return await httpRequest.post(`${this.#requestUrl}/forgot-password`, formData)
    }

    updatePassword = async (formData, token) => {
        httpRequest.headers = {
            Authorization: "Bearer " + token,
        };
        return await httpRequest.patch(`${this.#requestUrl}/update-password`, formData)
    }


}

export default AuthService;
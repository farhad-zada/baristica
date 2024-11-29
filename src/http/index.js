import Axios from "axios";
import { HOST_URL } from "../config/index.js";

class HttpRequest {
  _endpoint = "api/v1";
  _url = `${HOST_URL}/${this._endpoint}`;

  _headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Authorization,Content-Type,X-Requested-With,accept,Origin,Access-Control-Request-Method,Access-Control-Request-Headers",
    // "Content-Type": 'application/json'
  };

  get headers() {
    return this._headers;
  }

  set headers(config) {
    // Merge headers
    this._headers = { ...this._headers, ...config };
    // Default to application/json if Content-Type is not explicitly provided
    if (!config["Content-Type"]) {
      this._headers["Content-Type"] = "application/json";
    }
  }

  constructUrl = (urlRoute, id = "") =>
    `${this._url}/${urlRoute}${id ? "/" + id : ""}`;

  getByParams = async (urlRoute, params = {}) => {
    const response = await Axios.get(this.constructUrl(urlRoute), {
      headers: this._headers,
      params,
    });
    return response.data;
  };

  post = async (urlRoute, formData) => {
    const response = await Axios.post(this.constructUrl(urlRoute), formData, {
      headers: this._headers,
    });
    return response.data;
  };

  getAll = async (urlRoute) => {
    const response = await Axios.get(this.constructUrl(urlRoute), {
      headers: this._headers,
    });
    return response.data;
  };

  getOne = async (urlRoute, id) => {
    const response = await Axios.get(this.constructUrl(urlRoute, id), {
      headers: this._headers,
    });
    return response.data;
  };

  postOne = async (urlRoute, id) => {
    const response = await Axios.post(this.constructUrl(urlRoute, id),{} ,{
      headers: this._headers,
    });
    return response.data;
  }

  createOne = async (urlRoute, formData) => {
    const response = await Axios.post(this.constructUrl(urlRoute), formData, {
      headers: this._headers,
    });
    return response.data;
  };

  updateOne = async (urlRoute, formData, id) => {
    const response = await Axios.put(this.constructUrl(urlRoute, id), formData, {
      headers: this._headers,
    });
    return response.data;
  };

  patchOne = async (urlRoute, id, formData) => {
    const response = await Axios.patch(this.constructUrl(urlRoute, id), formData, {
      headers: this._headers,
    });
    return response.data;
  }

  deleteOne = async (urlRoute, id) => {
    const response = await Axios.delete(this.constructUrl(urlRoute, id), {
      headers: this._headers,
    });
    return response.data;
  };
  deleteItem = async (urlRoute, id) => {
    const response = await Axios.patch(this.constructUrl(urlRoute, id), {
      headers: this._headers,
    });
    return response.data;
  };

  patch = async (urlRoute) => {
    const response = await Axios.patch(this.constructUrl(urlRoute), {
      headers: this._headers,
    });
    return response.data;
  }
}

export default new HttpRequest();

import httpRequest from "../http";

class NonBusinessDaysIntervalsService {
  #requestUrl = "non-business-days-intervals";

  getIntervals = async () => {
    return await httpRequest.getAll(`${this.#requestUrl}`);
  };
}

export default NonBusinessDaysIntervalsService;


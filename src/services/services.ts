import APIService from "./APIService";
import LocalStorageService from "./LocalStorageService";

const localStorageService = new LocalStorageService();
const apiService = new APIService(localStorageService);

export { apiService, localStorageService };

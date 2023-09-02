import AsyncStorage from "@react-native-async-storage/async-storage";

import City from "../models/City";
// keys
const SAVED_CITIES_KEY = "saved_cities";
const FAVORITE_CITY_ID = "favorite_city_id";

class LocalStorageService {
  private static instance: LocalStorageService | null = null;

  // save cities to local storage
  async saveCities(cities: City[]) {
    try {
      const jsonValue = JSON.stringify(cities);
      await AsyncStorage.setItem(SAVED_CITIES_KEY, jsonValue);
    } catch (e) {
      console.log(e);
    }
  }

  // add new city to local storage
  async addCity(city: City) {
    try {
      const cities = await this.getCities();
      cities.push(city);
      await this.saveCities(cities);
    } catch (e) {
      console.log(e);
    }
  }

  // get cities from local storage
  async getCities(): Promise<City[]> {
    try {
      const cities = await AsyncStorage.getItem(SAVED_CITIES_KEY);
      if (cities !== null) {
        return JSON.parse(cities);
      }
    } catch (e) {
      console.log(e);
    }
    return [];
  }

  // clear cities from local storage
  async clearCities(): Promise<void> {
    try {
      await AsyncStorage.removeItem(SAVED_CITIES_KEY);
    } catch (e) {
      console.log(e);
    }
  }

  // get city by id
  async getCityById(id: number): Promise<City | null> {
    try {
      const cities = await this.getCities();
      const city = cities.find((city) => city.id === id);
      return city ? city : null;
    } catch (e) {
      console.log(e);
    }
    return null;
  }

  // save favorite city
  // id is number but we save it as string
  async saveFavoriteCity(cityId: number) {
    try {
      await AsyncStorage.setItem(FAVORITE_CITY_ID, cityId.toString());
    } catch (e) {
      console.log(e);
    }
  }

  // get favorite city
  // if there is no favorite city, return the first city in the list
  // if there is no city in the list, return null
  async getFavoriteCity(): Promise<City | null> {
    try {
      const cities = await this.getCities();
      const favoriteCityIdString = await AsyncStorage.getItem(FAVORITE_CITY_ID);
      const favoriteCityId = favoriteCityIdString
        ? parseInt(favoriteCityIdString)
        : null;

      const favoriteCity = favoriteCityId
        ? cities.find((city) => city.id === favoriteCityId)
        : null;

      if (favoriteCity) {
        return favoriteCity;
      } else {
        if (cities.length > 0) {
          return cities[0];
        }
      }
    } catch (e) {
      console.log(e);
    }
    return null;
  }

  // delete city by id
  async deleteCityById(id: number) {
    try {
      const cities = await this.getCities();
      const newCities = cities.filter((city) => city.id !== id);
      await this.saveCities(newCities);
    } catch (e) {
      console.log(e);
    }
  }
}

export default LocalStorageService;

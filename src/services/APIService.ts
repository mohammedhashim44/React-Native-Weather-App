import axios from "axios";

import LocalStorageService from "./LocalStorageService";
import City from "../models/City";
import {
  DayForcast,
  HourlyForcast,
  TodaySummary,
  WeatherData,
} from "../models/WeatherData";

class APIService {
  private localStorageService: LocalStorageService;

  constructor(localStorageService: LocalStorageService) {
    this.localStorageService = localStorageService;
  }

  fetchWeatherData = async (cityId: number): Promise<WeatherData> => {
    if (!this.localStorageService) {
      throw new Error("Local storage service not found");
    }

    const city = await this.localStorageService.getCityById(cityId);
    if (!city) {
      throw new Error("No city found");
    }
    const latitute = city.latitude;
    const longitude = city.longitude;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitute}&longitude=${longitude}&hourly=temperature_2m,weathercode&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`;
    const response = await axios.get(url);
    const daysData = response.data.daily!;

    // daily data
    const count = daysData.time.length;
    const dailyData: DayForcast[] = [];

    for (let i = 0; i < count; i++) {
      const day = daysData.time[i];
      const minTemp = daysData.temperature_2m_min[i];
      const maxTemp = daysData.temperature_2m_max[i];
      const weatherCode = daysData.weathercode[i];
      dailyData.push({ day, minTemp, maxTemp, weatherCode });
    }

    // hourly data
    const hourlyData = response.data.hourly!;
    const count2 = hourlyData.time.length;
    const data2: HourlyForcast[] = [];
    for (let i = 0; i < count2; i++) {
      const time = hourlyData.time[i];
      const temp = hourlyData.temperature_2m[i];
      const weatherCode = hourlyData.weathercode[i];
      data2.push({ time, temp, weatherCode });
    }

    // get current hour
    const currentHour = data2.find((hour) => {
      const now = new Date();
      const hourDate = new Date(hour.time);

      if (
        hourDate.getMonth() === now.getMonth() &&
        hourDate.getDate() === now.getDate() &&
        hourDate.getHours() === now.getHours()
      ) {
        return true;
      }
    });

    //lowet temp will be the min temp of the first day
    // highest temp will be the max temp of the first day
    const firstDay = dailyData[0];

    // currnt day will be the first day in the array
    const todaySummary: TodaySummary = {
      city: city.name,
      temperature: currentHour?.temp || 0,
      weatherCode: currentHour?.weatherCode || "",
      currentTemp: currentHour?.temp || 0,
      minTemp: firstDay.minTemp || 0,
      maxTemp: firstDay.maxTemp || 0,
    };

    return { daysForcast: dailyData, hourlyForcast: data2, todaySummary };
  };

  async searchCity(searchQuery: string): Promise<City[]> {
    const url = "https://geocoding-api.open-meteo.com/v1/search?name=";
    const fullUrl = url + searchQuery;
    const response = await axios.get(fullUrl); // Replace with your API endpoint
    const data = response.data.results as City[];
    return data;
  }

  // get city basic summary data
  async getCitySummary(cityId: number): Promise<TodaySummary> {
    const weatherData = await this.fetchWeatherData(cityId);
    return weatherData.todaySummary;

    // const city = await this.localStorageService.getCityById(cityId);
    // if (!city) {
    //   throw new Error("City not found");
    // }

    // const latitute = city.latitude;
    // const longitude = city.longitude;
    // const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitute}&longitude=${longitude}&hourly=temperature_2m,weathercode&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`;
    // const response = await axios.get(url);
    // const daysData = response.data.daily!;

    // // daily data
    // const count = daysData.time.length;
    // const dailyData: DayForcast[] = [];

    // for (let i = 0; i < count; i++) {
    //   const day = daysData.time[i];
    //   const minTemp = daysData.temperature_2m_min[i];
    //   const maxTemp = daysData.temperature_2m_max[i];
    //   const weatherCode = daysData.weathercode[i];
    //   dailyData.push({ day, minTemp, maxTemp, weatherCode });
    // }

    // // hourly data
    // const hourlyData = response.data.hourly!;
    // const count2 = hourlyData.time.length;
    // const data2: HourlyForcast[] = [];
    // for (let i = 0; i < count2; i++) {
    //   const time = hourlyData.time[i];
    //   const temp = hourlyData.temperature_2m[i];
    //   const weatherCode = hourlyData.weathercode[i];
    //   data2.push({ time, temp, weatherCode });
    // }

    // // get current hour
    // const currentHour = data2.find((hour) => {
    //   const now = new Date();
    //   const hourDate = new Date(hour.time);

    //   if (
    //     hourDate.getMonth() === now.getMonth() &&
    //     hourDate.getDate() === now.getDate() &&
    //     hourDate.getHours() === now.getHours()
    //   ) {
    //     return true;
    //   }
    // });

    // //lowet temp will be the min temp of the first day
    // // highest temp will be the max temp of the first day
    // const firstDay = dailyData[0];

    // // currnt day will be the first day in the array
    // const todaySummary: TodaySummary = {
    //   city: city.name,
    //   temperature: currentHour?.temp || 0,
    //   weatherCode: currentHour?.weatherCode || "",
    //   currentTemp: currentHour?.temp || 0,
    //   minTemp: firstDay.minTemp || 0,
    //   maxTemp: firstDay.maxTemp || 0,
    // };

    // return todaySummary;
  }
}

export default APIService;

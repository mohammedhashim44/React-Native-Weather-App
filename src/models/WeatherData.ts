export interface WeatherData {
  daysForcast: DayForcast[];
  hourlyForcast: HourlyForcast[];
  todaySummary: TodaySummary;
}

export interface TodaySummary {
  city: string;
  temperature: number;
  weatherCode: string;
  currentTemp: number;
  minTemp: number;
  maxTemp: number;
}

export interface DayForcast {
  day: string;
  minTemp: number;
  maxTemp: number;
  weatherCode: string;
}

export interface HourlyForcast {
  time: string;
  temp: number;
  weatherCode: string;
}

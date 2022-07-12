export interface LatLong {
  lat: number;
  lon: number;
}
export interface Location extends LatLong {
  city: string;
  country: string;
}

export interface Weather {
  temp: number;
	feels_like: number;
	temp_min: number;
	temp_max: number;
	pressure: number;
	humidity: number;
  id: number;
  main: string;
  description: string;
  icon: string;
}
export interface Forecast {
  date: string;
  humidity: number;
  icon_id: number;
  temperature: number;
  description: string;
  wind_speed: number;
  icon: string;
  temp_max: number;
  temp_min: number;
}

export type WeatherData<T = {}> = T & {
  location: Location;
  weather: Weather;
}
export type ForecastData<T = {}> = T & {
  forecast: Forecast[];
  forecastSearchData: Forecast[];
}
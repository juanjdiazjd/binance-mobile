import { createAction } from "../types/actionType";
import { LatLong, WeatherData } from "../types/Home/weather";
import { HomeActionTypes } from "./actionTypes";

export type Status = { key: string; value: boolean };

export const HomeActions = {
  getCurrentWeather: () =>
    createAction({ type: HomeActionTypes.GetCurrentWeather }),
  setCurrentWeather: (response: WeatherData) =>
    createAction({
      type: HomeActionTypes.SetCurrentWeather,
      payload: response,
    }),
  IsFetchingCurrentMethod: (fetching: boolean) =>
    createAction({
      type: HomeActionTypes.IsFetchingCurrentMethod,
      payload: fetching,
    }),
  getForecastWeather: (location?: LatLong) =>
    createAction({
      type: HomeActionTypes.GetForecastWeather,
      payload: location,
    }),
  setForecastWeather: (response: WeatherData) =>
    createAction({
      type: HomeActionTypes.SetForecastWeather,
      payload: response,
    }),
  setForecastSearchWeather: (response: WeatherData) =>
    createAction({
      type: HomeActionTypes.SetForecastSearchWeather,
      payload: response,
    }),
  IsFetchingForecastMethod: (fetching: boolean) =>
    createAction({
      type: HomeActionTypes.IsFetchingForecastMethod,
      payload: fetching,
    }),
};

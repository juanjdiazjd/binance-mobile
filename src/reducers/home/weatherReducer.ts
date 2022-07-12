import {HomeActionTypes} from '../../actions/actionTypes';
import {actionType} from '../../types/actionType';
import {ForecastData, WeatherData} from '../../types/Home/weather';
import {OptionsState} from '../../types/responseType';

const initialState: WeatherData<OptionsState> & ForecastData = {
  location: {},
  weather: {},
  forecast: {},
  forecastSearchData:{},
  isFetchingCurrentMethod: undefined,
  errorCurrentMethod: undefined,
  isFetchingForecastMethod: undefined,
  errorForecastMethod: undefined,
} as WeatherData<OptionsState> & ForecastData;

function homeReducer(state = initialState, action: actionType<WeatherData<OptionsState> & ForecastData>) {
  switch (action.type) {
    case HomeActionTypes.SetCurrentWeather:
      return {
        ...state,
        location: action.payload?.location,
        weather: action.payload?.weather,
      };
    case HomeActionTypes.IsFetchingCurrentMethod:
      return {
        ...state,
        isFetchingCurrentMethod: action.payload,
      };
    case HomeActionTypes.SetForecastWeather:
      return {
        ...state,
        forecast: action.payload?.forecast,
      };
      case HomeActionTypes.SetForecastSearchWeather:
        return {
          ...state,
          forecastSearchData: action.payload?.forecast,
        };
      
    case HomeActionTypes.IsFetchingForecastMethod:
      return {
        ...state,
        isFetchingForecastMethod: action.payload,
      };
    case HomeActionTypes.ClearCurrent:
      return initialState;
    default:
      return state;
  }
}

export default homeReducer;

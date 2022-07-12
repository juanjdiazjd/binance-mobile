import {takeLatest} from '@redux-saga/core/effects';
import {HomeActionTypes} from '../../actions/actionTypes';
import {PERMISSIONS, request} from 'react-native-permissions';
import {BUE_LAT_LONG} from '../../utils/locationCustom';
import Geolocation from 'react-native-geolocation-service';
import {actionType} from '../../types/actionType';
import {call, put} from 'redux-saga/effects';
import weatherApi from '../../api';
import {HomeActions} from '../../actions/homeActions';
import {LatLong} from '../../types/Home/weather';

// Constants
const CONFIG_DEFAULT_LOCATION = {
  enableHighAccuracy: true,
  timeout: 15000,
  maximumAge: 10000,
};

//Types
export type ConfigPosition = {
  enableHighAccuracy: boolean;
  timeout: number;
  maximumAge: number;
};

//API Services
const {weatherServices: weatherAPI} = weatherApi;

//Methods
function* fetchCurrentWeather() {
  try {
    const {coords: coords}: Geolocation.GeoPosition =
      yield currentPositionPromise(CONFIG_DEFAULT_LOCATION);
    const bodyRequest: LatLong = {lat: coords.latitude, lon: coords.longitude};
    const {ok, problem, data} = yield call(
      weatherAPI.currentWeather,
      bodyRequest,
    );
    yield put(HomeActions.IsFetchingCurrentMethod(true));

    if (!ok) {
      yield put(HomeActions.IsFetchingCurrentMethod(false));
      throw new Error(problem);
    }
    yield put(HomeActions.IsFetchingCurrentMethod(false));
    yield put(HomeActions.setCurrentWeather(data));
  } catch (error) {}
}
function* fetchForecastWeather(action:actionType<LatLong>) {
  try {
    const {coords: coords}:  Geolocation.GeoPosition =
      yield currentPositionPromise(CONFIG_DEFAULT_LOCATION);
    const bodyRequest: LatLong = {lat: action.payload?.lat || coords.latitude, lon: action.payload?.lon || coords.longitude};
    const {ok, problem, data} = yield call(
      weatherAPI.forecastWeather,
      bodyRequest,
    );
    yield put(HomeActions.IsFetchingForecastMethod(true));

    if (!ok) {
      yield put(HomeActions.IsFetchingForecastMethod(false));
      //Falta setear error
      throw new Error(problem);
    }
    yield put(HomeActions.IsFetchingForecastMethod(false));
    if(action.payload?.lat && action.payload?.lon){
      yield put(HomeActions.setForecastSearchWeather(data));

    }else{
      yield put(HomeActions.setForecastWeather(data));

    }
  } catch (error) {}
}

export const currentPositionPromise: (
  config: ConfigPosition,
) => Promise<Geolocation.GeoPosition> = async () =>
  new Promise(async (resolve, reject) => {
    request(PERMISSIONS.IOS.LOCATION_ALWAYS).then(result => {
      if (result == 'granted') {
        Geolocation.getCurrentPosition(
          currentPositionResponse => {
            resolve(currentPositionResponse);
          },
          error => {
            if (error.code == 1) {
              resolve({
                coords: {
                  accuracy: 5,
                  altitude: 0,
                  altitudeAccuracy: -1,
                  heading: -1,
                  latitude: BUE_LAT_LONG.lat,
                  longitude: BUE_LAT_LONG.long,
                  speed: -1,
                },
                timestamp: 1632790198315.311,
              });
            }
          },
          CONFIG_DEFAULT_LOCATION,
        );
      }
    });
    request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(result => {
      if (result == 'granted') {
        Geolocation.getCurrentPosition(
          currentPositionResponse => {
            resolve(currentPositionResponse);
          },
          error => {},
          CONFIG_DEFAULT_LOCATION,
        );
      }
    });
  });

function* homeSagas() {
  yield takeLatest(HomeActionTypes.GetCurrentWeather, fetchCurrentWeather);
  yield takeLatest(HomeActionTypes.GetForecastWeather, fetchForecastWeather);

}

export default homeSagas;

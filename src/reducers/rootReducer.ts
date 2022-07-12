import { combineReducers } from 'redux';
import weatherCurrentReducer from './home/weatherReducer';


const allReducers = combineReducers({
  weatherCurrentReducer,
});

export type RootState = ReturnType<typeof allReducers>;

export default allReducers;

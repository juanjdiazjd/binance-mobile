import {all} from '@redux-saga/core/effects';

import homeSagas from './Home/homeSaga';

function* root() {
  yield all([homeSagas()]);
}

export default root;

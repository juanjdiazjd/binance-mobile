import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootSaga from '../sagas';
import rootReducer from '../reducers/rootReducer';

function configureStore() {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = applyMiddleware(sagaMiddleware);
  const store = createStore(rootReducer, middleware);

  sagaMiddleware.run(rootSaga);

  return store;
}

export default configureStore;

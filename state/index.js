import { combineReducers } from 'redux'
import rootSaga from '../sagas/'

import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

// creates the store
const configureStore = (rootReducer, rootSaga) => {
  /* ------------- Redux Configuration ------------- */

  const middleware = [];
  const enhancers = [];

  /* ------------- Saga Middleware ------------- */
  const sagaMiddleware = createSagaMiddleware();
  middleware.push(sagaMiddleware);

  /* ------------- Assemble Middleware ------------- */
  enhancers.push(applyMiddleware(...middleware));

  if (window.__REDUX_DEVTOOLS_EXTENSION__) {
    enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
  }

  const createAppropriateStore = createStore;
  /* eslint-disable no-underscore-dangle */
  const store = createAppropriateStore(
    rootReducer,
    compose(...enhancers)
  );
  /* eslint-enable */

  // kick off root saga
  sagaMiddleware.run(rootSaga);

  return store;
};

export default () => {
  /* ------------- Assemble The Reducers ------------- */
  const rootReducer = combineReducers({
    lessons: require('../containers/lessons/reducers').reducer,
    cards: require('../containers/cards/reducers').reducer,
  })

  return configureStore(rootReducer, rootSaga)
}

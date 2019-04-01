import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../sagas/'

export default () => {
    /* ------------- Assemble The Reducers ------------- */
    const rootReducer = combineReducers({
        lessons: require('./lessonsReducer').reducer
    })

    return configureStore(rootReducer, rootSaga)
}
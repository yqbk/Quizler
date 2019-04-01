import { call, put } from 'redux-saga/effects';
import LessonsActions from '../state/lessonsReducer';

export function* getLessonsFlow(api, action) {
  try {
    console.log('1. get lessons');
    // const response = yield call(api.getCocktails);

    // console.log('2. response', response);

    // if (response.ok) {
    //   yield put(CocktailsActions.getCocktailsSuccess(response.data.drinks));
    // } else {
    //   yield put(CocktailsActions.getCocktailsFailure('Connection problems :('));
    // }
  } catch (error) {
    yield put(LessonsActions.getLessonsFailure(error.message));
  }
}

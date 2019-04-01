import { call, put } from 'redux-saga/effects';
import LessonsActions from '../state/lessonsReducer';
import API, { graphqlOperation } from '@aws-amplify/api';
import { listLessons } from '../src/graphql/queries';

export function* getLessonsFlow() {
  try {
    const operation = graphqlOperation(listLessons);
    const test = () => API.graphql(operation);

    const graphqlData = yield call(test);

    const response = graphqlData.data;


    if (response) {
      yield put(LessonsActions.getLessonsSuccess(response.listLessons.items));
    } else {
      yield put(LessonsActions.getLessonsFailure('Connection problems :('));
    }
  } catch (error) {
    yield put(LessonsActions.getLessonsFailure(error.message));
  }
}

import { all, takeEvery } from 'redux-saga/effects';
// import API from '../Services/Api'

/* ------------- Types ------------- */
import { LessonsTypes } from '../state/lessonsReducer';

/* ------------- Sagas ------------- */
import { getLessonsFlow } from './lessonsSaga';
import { addLessonFlow } from './lessonsSaga';
import { removeLessonFlow } from './lessonsSaga';

/* ------------- API ------------- */
// const api = API.create()

/* ------------- Connect Types To Sagas ------------- */
export default function* root() {
  yield all([yield takeEvery(LessonsTypes.GET_LESSONS_REQUEST, getLessonsFlow)]);
  yield all([yield takeEvery(LessonsTypes.ADD_LESSON_REQUEST, addLessonFlow)]);
  yield all([yield takeEvery(LessonsTypes.REMOVE_LESSON_REQUEST, removeLessonFlow)]);
}

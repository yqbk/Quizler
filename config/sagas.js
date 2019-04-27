import { all, takeEvery } from 'redux-saga/effects'
// import API from '../Services/Api'

/* ------------- Types ------------- */
import { LessonsTypes } from '../containers/lessons/reducers'

/* ------------- Sagas ------------- */
import { getLessonsFlow } from '../containers/lessons/sagas'
import { addLessonFlow } from '../containers/lessons/sagas'
import { removeLessonFlow } from '../containers/lessons/sagas'
import { CardsTypes } from '../containers/cards/actions'
import {
  getCardsFlow,
  addCardFlow,
  removeCardFlow,
} from '../containers/cards/sagas'

/* ------------- API ------------- */
// const api = API.create()

/* ------------- Connect Types To Sagas ------------- */
export default function* root() {
  yield all([yield takeEvery(LessonsTypes.GET_LESSONS_REQUEST, getLessonsFlow)])
  yield all([yield takeEvery(LessonsTypes.ADD_LESSON_REQUEST, addLessonFlow)])
  yield all([
    yield takeEvery(LessonsTypes.REMOVE_LESSON_REQUEST, removeLessonFlow),
  ])

  yield all([yield takeEvery(CardsTypes.GET_CARDS_REQUEST, getCardsFlow)])
  yield all([yield takeEvery(CardsTypes.ADD_CARD_REQUEST, addCardFlow)])
  yield all([yield takeEvery(CardsTypes.REMOVE_CARD_REQUEST, removeCardFlow)])
}

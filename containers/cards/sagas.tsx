import { call, put } from 'redux-saga/effects'
import CardsActions from './actions'
import API, { graphqlOperation } from '@aws-amplify/api'
import { getLesson } from '../../src/graphql/queries'
import { createQuestion, deleteQuestion } from '../../src/graphql/mutations'
import _get from 'lodash/get'

export function* getCardsFlow({ lessonID }) {
  try {
    const operation = graphqlOperation(getLesson, { id: lessonID })
    const test = () => API.graphql(operation)
    const graphqlData = yield call(test)

    const response = graphqlData.data

    if (response) {
      const cards = _get(response, ['getLesson', 'questions', 'items'])
      console.log('response', response, cards)

      yield put(CardsActions.getCardsSuccess(cards))
    } else {
      yield put(CardsActions.getCardsFailure('Connection problems :('))
    }
  } catch (error) {
    yield put(CardsActions.getCardsFailure(error.message))
  }
}

export function* addCardFlow({ lessonId, ask, answer }) {
  try {
    const operation = graphqlOperation(createQuestion, {
      input: { ask: ask, answer: answer, questionLessonId: lessonId },
    })
    const addCardApi = () => API.graphql(operation)
    const graphqlData = yield call(addCardApi)
    const response = graphqlData.data

    if (response) {
      yield put(CardsActions.addCardSuccess(response))
    } else {
      yield put(CardsActions.addCardFailure(`Add lesson failure: ${lessonId}`))
    }
  } catch (error) {
    yield put(CardsActions.addCardFailure(error.message))
  }
}

export function* removeCardFlow({ id }) {
  try {
    console.log(' remove: card', id)

    const operation = graphqlOperation(deleteQuestion, { input: { id } })
    const removeCardApi = () => API.graphql(operation)
    const graphqlData = yield call(removeCardApi)
    const response = graphqlData.data

    if (response) {
      yield put(CardsActions.removeCardSuccess(response.id))
    } else {
      yield put(CardsActions.removeCardFailure(`Remove lesson failure: ${id}`))
    }
  } catch (error) {
    yield put(CardsActions.removeCardFailure(error.message))
  }
}

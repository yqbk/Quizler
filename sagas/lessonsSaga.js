import { call, put } from 'redux-saga/effects'
import LessonsActions from '../containers/lessons/reducers'
import API, { graphqlOperation } from '@aws-amplify/api'
import { listLessons } from '../src/graphql/queries'
import { createLesson, deleteLesson } from '../src/graphql/mutations'
import { goBack } from '../utils/actions'

export function* getLessonsFlow() {
  try {
    const operation = graphqlOperation(listLessons)
    const test = () => API.graphql(operation)

    const graphqlData = yield call(test)

    const response = graphqlData.data

    if (response) {
      yield put(LessonsActions.getLessonsSuccess(response.listLessons.items))
    } else {
      yield put(LessonsActions.getLessonsFailure('Connection problems :('))
    }
  } catch (error) {
    yield put(LessonsActions.getLessonsFailure(error.message))
  }
}

export function* addLessonFlow({ title }) {
  try {
    const operation = graphqlOperation(createLesson, {
      input: { title: title },
    })
    const addLessonApi = () => API.graphql(operation)

    const graphqlData = yield call(addLessonApi)

    const response = graphqlData.data

    if (response) {
      yield put(LessonsActions.addLessonSuccess(response))
    } else {
      yield put(LessonsActions.addLessonFailure(`Add lesson failure: ${title}`))
    }
  } catch (error) {
    yield put(LessonsActions.addLessonFailure(error.message))
  }
}

export function* removeLessonFlow({ id }) {
  try {
    console.log('lessonId', id)

    const operation = graphqlOperation(deleteLesson, { input: { id: id } })
    const removeLessonApi = () => API.graphql(operation)

    const graphqlData = yield call(removeLessonApi)

    const deletedLessonId = graphqlData.data.deleteLesson.id

    if (deletedLessonId) {
      yield put(LessonsActions.removeLessonSuccess(deletedLessonId))
      yield put(goBack(null))
    } else {
      yield put(
        LessonsActions.removeLessonFailure(`Remove lesson failure: ${id}`),
      )
    }
  } catch (error) {
    yield put(LessonsActions.removeLessonFailure(error.message))
  }
}

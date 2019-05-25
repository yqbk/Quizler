import { call, put, select } from 'redux-saga/effects'
import LessonsActions from './reducers'
import API, { graphqlOperation } from '@aws-amplify/api'
import { listLessons, getUser, getLesson } from '../../src/graphql/queries'
import {
  createLesson,
  deleteLesson,
  createUser,
  updateLesson,
} from '../../src/graphql/mutations'
import { goBack } from '../../utils/actions'
import Auth from '@aws-amplify/auth'
import _get from 'lodash/get'
import { lessonSelector } from './selector'

export function* getLessonsFlow() {
  try {
    const a = () => Auth.currentUserInfo()
    const test = yield call(a)
    const currentUserId = _get(a, 'id') || test.id
    const currentUserUsername = _get(a, 'username') || test.username

    if (!currentUserId) {
      return
    }

    const operation = graphqlOperation(getUser, {
      id: currentUserId,
    })
    const getUserApi = () => API.graphql(operation)

    const graphqlData = yield call(getUserApi)

    const response = graphqlData.data

    if (!response.getUser) {
      const operation2 = graphqlOperation(createUser, {
        input: {
          id: currentUserId,
          name: currentUserUsername,
        },
      })

      const createUserApi = () => API.graphql(operation2)

      const graphqlData2 = yield call(createUserApi)

      const response2 = graphqlData2.data
    }

    const data =
      _get(response, ['getUser', 'lessons', 'items']) ||
      _get(response, ['createUser', 'lessons', 'items']) ||
      []

    yield put(LessonsActions.getLessonsSuccess(data))
  } catch (error) {
    console.log('error', error)
    yield put(LessonsActions.getLessonsFailure(error.message))
  }
}

export function* addLessonFlow({ title }) {
  try {
    const a = () => Auth.currentUserInfo()
    const test = yield call(a)
    const currentUserId = _get(a, 'id') || test.id

    if (!currentUserId) {
      return
    }

    const operation = graphqlOperation(createLesson, {
      input: {
        title: title,
        lessonUserId: currentUserId,
      },
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

export function* updateLessonFlow({ title, id, successRatio } = {}) {
  try {
    // const a = () => Auth.currentUserInfo()
    // const test = yield call(a)
    // const currentUserId = _get(a, 'id') || test.id

    // if (!currentUserId) {
    //   return
    // }

    const lessonData = yield select(lessonSelector(id))

    // ---------
    const operation1 = graphqlOperation(getLesson, {
      id: id,
    })
    const getCurrentLessonApi = () => API.graphql(operation1)

    const graphqlData1 = yield call(getCurrentLessonApi)

    const currentDataSuccessRatio =
      _get(graphqlData1, ['data', 'getLesson', 'successRatio']) || []

    // debugger

    // ---------

    const operation = graphqlOperation(updateLesson, {
      input: {
        title: title,
        id: id,
        // lessonUserId: currentUserId,
        successRatio: [...currentDataSuccessRatio, successRatio],
      },
    })
    const updateLessonApi = () => API.graphql(operation)

    const graphqlData = yield call(updateLessonApi)

    const response = graphqlData.data

    if (response) {
      yield put(LessonsActions.updateLessonSuccess(response))
    } else {
      yield put(
        LessonsActions.updateLessonFailure(`Add lesson failure: ${title}`),
      )
    }
  } catch (error) {
    yield put(LessonsActions.addLessonFailure(error.message))
  }
}

export function* removeLessonFlow({ id }) {
  try {
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

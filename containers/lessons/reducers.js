import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  getLessonsRequest: null,
  getLessonsSuccess: ['response'],
  getLessonsFailure: ['error'],

  addLessonRequest: ['title'],
  addLessonSuccess: ['response'],
  addLessonFailure: ['error'],

  removeLessonRequest: ['id'],
  removeLessonSuccess: ['id'],
  removeLessonFailure: ['error'],
})

export const LessonsTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  lessons: [],
  status: '',
  fetching: true,
  errorMessage: '',
  error: false,
})

/* ------------- Reducers ------------- */
export const getLessonsRequest = (state, action) => {
  return state.merge({ fetching: true, error: false, errorMessage: '' })
}

export const getLessonsSuccess = (state, action) => {
  return state.merge({
    fetching: false,
    error: false,
    errorMessage: '',
    lessons: action.response,
  })
}

export const getLessonsFailure = (state, action) => {
  return state.merge({
    fetching: false,
    error: true,
    errorMessage: action.error,
  })
}

// ----

export const addLessonRequest = (state, action) => {
  return state.merge({ fetching: true, error: false, errorMessage: '' })
}

export const addLessonSuccess = (state, action) => {
  return state.merge({
    fetching: false,
    error: false,
    errorMessage: '',
    lessons: [...state.lessons, { ...action.response.createLesson }],
  })
}

export const addLessonFailure = (state, action) => {
  return state.merge({
    fetching: false,
    error: true,
    errorMessage: action.error,
  })
}

// ----

export const removeLessonRequest = (state, action) => {
  return state.merge({ fetching: true, error: false, errorMessage: '' })
}

export const removeLessonSuccess = (state, action) => {
  return state.merge({
    fetching: false,
    error: false,
    errorMessage: '',
    lessons: state.lessons.filter(lesson => lesson.id !== action.id),
  })
}

export const removeLessonFailure = (state, action) => {
  return state.merge({
    fetching: false,
    error: true,
    errorMessage: action.error,
  })
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_LESSONS_REQUEST]: getLessonsRequest,
  [Types.GET_LESSONS_SUCCESS]: getLessonsSuccess,
  [Types.GET_LESSONS_FAILURE]: getLessonsFailure,

  [Types.ADD_LESSON_REQUEST]: addLessonRequest,
  [Types.ADD_LESSON_SUCCESS]: addLessonSuccess,
  [Types.ADD_LESSON_FAILURE]: addLessonFailure,

  [Types.REMOVE_LESSON_REQUEST]: removeLessonRequest,
  [Types.REMOVE_LESSON_SUCCESS]: removeLessonSuccess,
  [Types.REMOVE_LESSON_FAILURE]: removeLessonFailure,
})

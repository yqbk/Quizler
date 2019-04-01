import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
    getLessonsRequest: null,
    getLessonsSuccess: ['response'],
    getLessonsFailure: ['error']
})

export const LessonsTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
    lessons: [],
    status: '',
    fetching: true,
    errorMessage: '',
    error: false
})

/* ------------- Reducers ------------- */
export const getLessonsRequest = (state, action) => {
    const { tipo } = action
    return state.merge({ fetching: true, error: false, errorMessage: '' })
}

export const getLessonsSuccess = (state, action) => {
    return state.merge({ fetching: false, error: false, errorMessage: '', lessons: action.response })
}

export const getLessonsFailure = (state, action) => {
    return state.merge({ fetching: false, error: true, errorMessage: action.error })
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_LESSONS_REQUEST]: getLessonsRequest,
    [Types.GET_LESSONS_SUCCESS]: getLessonsSuccess,
    [Types.GET_LESSONS_FAILURE]: getLessonsFailure
})
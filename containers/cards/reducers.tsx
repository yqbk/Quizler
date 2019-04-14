import { createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';
import { CardsTypes } from './actions';

/* ------------- Initial State ------------- */
export const INITIAL_STATE = Immutable({
  lessons: [],
  status: '',
  fetching: true,
  errorMessage: '',
  error: false,
});

/* ------------- Reducers ------------- */
export const getCardsRequest = (state, action) => {
  return state.merge({ fetching: true, error: false, errorMessage: '' });
};

export const getCardsSuccess = (state, action) => {
  return state.merge({ fetching: false, error: false, errorMessage: '', lessons: action.response });
};

export const getCardsFailure = (state, action) => {
  return state.merge({ fetching: false, error: true, errorMessage: action.error });
};

// ----

export const addCardRequest = (state, action) => {
  return state.merge({ fetching: true, error: false, errorMessage: '' });
};

export const addCardSuccess = (state, action) => {
  return state.merge({
    fetching: false,
    error: false,
    errorMessage: '',
    lessons: [...state.lessons, { ...action.response.createCard }],
  });
};

export const addCardFailure = (state, action) => {
  return state.merge({ fetching: false, error: true, errorMessage: action.error });
};

// ----

export const removeCardRequest = (state, action) => {
  return state.merge({ fetching: true, error: false, errorMessage: '' });
};

export const removeCardSuccess = (state, action) => {
  return state.merge({
    fetching: false,
    error: false,
    errorMessage: '',
    lessons: state.lessons.filter(lesson => lesson.id !== action.id),
  });
};

export const removeCardFailure = (state, action) => {
  return state.merge({ fetching: false, error: true, errorMessage: action.error });
};

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [CardsTypes.GET_CARDS_REQUEST]: getCardsRequest,
  [CardsTypes.GET_CARDS_SUCCESS]: getCardsSuccess,
  [CardsTypes.GET_CARDS_FAILURE]: getCardsFailure,

  [CardsTypes.ADD_CARD_REQUEST]: addCardRequest,
  [CardsTypes.ADD_CARD_SUCCESS]: addCardSuccess,
  [CardsTypes.ADD_CARD_FAILURE]: addCardFailure,

  [CardsTypes.REMOVE_CARD_REQUEST]: removeCardRequest,
  [CardsTypes.REMOVE_CARD_SUCCESS]: removeCardSuccess,
  [CardsTypes.REMOVE_CARD_FAILURE]: removeCardFailure,
});

import { call, put } from 'redux-saga/effects';
import CardsActions from './actions';
import API, { graphqlOperation } from '@aws-amplify/api';
import { listQuestions, listQuestionsByTitle } from '../..//src/graphql/queries';
import { createCard, deleteCard } from '../src/graphql/mutations';
// import console = require('console');
// import { goBack } from '../utils/actions';

export function* getCardsFlow({ title }) {
  try {
    console.log('title', title);
    const operation = graphqlOperation(listQuestionsByTitle(title));
    console.log('operation', operation);
    const test = () => API.graphql(operation);

    const graphqlData = yield call(test);

    const response = graphqlData.data;

    if (response) {
      yield put(CardsActions.getCardsSuccess(response.listCards.items));
    } else {
      yield put(CardsActions.getCardsFailure('Connection problems :('));
    }
  } catch (error) {
    yield put(CardsActions.getCardsFailure(error.message));
  }
}

// export function* addCardFlow({ title }) {
//   try {
//     const operation = graphqlOperation(createCard, { input: { title: title } });
//     const addCardApi = () => API.graphql(operation);

//     const graphqlData = yield call(addCardApi);

//     const response = graphqlData.data;

//     if (response) {
//       yield put(CardsActions.addCardSuccess(response));
//     } else {
//       yield put(CardsActions.addCardFailure(`Add lesson failure: ${title}`));
//     }
//   } catch (error) {
//     yield put(CardsActions.addCardFailure(error.message));
//   }
// }

// export function* removeCardFlow({ id }) {
//   try {
//     console.log('lessonId', id);

//     const operation = graphqlOperation(deleteCard, { input: { id: id } });
//     const removeCardApi = () => API.graphql(operation);

//     const graphqlData = yield call(removeCardApi);

//     const deletedCardId = graphqlData.data.deleteCard.id;

//     if (deletedCardId) {
//       yield put(CardsActions.removeCardSuccess(deletedCardId));
//       yield put(goBack(null));
//     } else {
//       yield put(CardsActions.removeCardFailure(`Remove lesson failure: ${id}`));
//     }
//   } catch (error) {
//     yield put(CardsActions.removeCardFailure(error.message));
//   }
// }

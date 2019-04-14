import { createActions } from 'reduxsauce';

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  getCardsRequest: ['title'],
  getCardsSuccess: ['response'],
  getCardsFailure: ['error'],

  addCardRequest: ['title'],
  addCardSuccess: ['response'],
  addCardFailure: ['error'],

  removeCardRequest: ['id'],
  removeCardSuccess: ['id'],
  removeCardFailure: ['error'],
});

export const CardsTypes = Types;
export default Creators;

import { createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  getCardsRequest: ['lessonID'],
  getCardsSuccess: ['response'],
  getCardsFailure: ['error'],

  addCardRequest: ['lessonId', 'ask', 'answer'],
  addCardSuccess: ['response'],
  addCardFailure: ['error'],

  removeCardRequest: ['id'],
  removeCardSuccess: ['id'],
  removeCardFailure: ['error'],
})

export const CardsTypes = Types
export default Creators

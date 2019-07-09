import { createSelector } from 'reselect'

export const cardsSelector = state => state.cards.cards
export const cardsFetchingSelector = state => state.cards.fetching

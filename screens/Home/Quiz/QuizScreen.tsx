import React from 'react'
import {
  Container,
  Content,
  Button,
  Text,
  Icon,
  List,
  ListItem,
} from 'native-base'

import { ListView, Alert } from 'react-native'

import { connect } from 'react-redux'
import { lifecycle, compose } from 'recompose'

import { View } from 'react-native'
import styled from 'styled-components'

import { bindActionCreators } from '../../../utils/reduxUtils'
import { cardsSelector } from '../../../containers/cards/selector'

const QuizScreen = ({
  // navigation,
  removeLesson,
  cards,
  getCards,
  removeCard,
}) => {
  return (
    <Container>
      <Content padder contentContainerStyle={{ flexGrow: 1 }}>
        <Text>Quiz</Text>
      </Content>
    </Container>
  )
}

const mapStateToProps = state => ({
  cards: cardsSelector(state),
})

const mapDispatchToProps = bindActionCreators({
  // removeLesson: title => LessonsActions.removeLessonRequest(title),
  // getCards: lessonID => CardsActions.getCardsRequest(lessonID),
  // removeCard: cardId => CardsActions.removeCardRequest(cardId),
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(QuizScreen)

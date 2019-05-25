import React from 'react'
import { Bar } from 'react-native-progress'
import { Container, Text, Card, CardItem, Button } from 'native-base'

import SwipeCards from 'react-native-swipe-cards'
import Analytics from '@aws-amplify/analytics'
import LessonsActions from '../../../containers/lessons/reducers'

import { connect } from 'react-redux'
import {
  lifecycle,
  compose,
  withState,
  withHandlers,
  withPropsOnChange,
} from 'recompose'

import { View, Dimensions, Alert } from 'react-native'
import styled from 'styled-components'

import { bindActionCreators } from '../../../utils/reduxUtils'
import { cardsSelector } from '../../../containers/cards/selector'
import FlipCard from 'react-native-flip-card'
import { lessonSelector } from '../../../containers/lessons/selector'

const shuffle = (a: Array<Object>) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const QuizScreen = ({
  cards,
  cardsList,
  setCards,
  setInitialCardsNumber,
  initialCardsNumber,
  navigation,
  repeatedCards,
  setRepeatedCards,
  result,
  updateLesson,
}) => {
  const lessonDetails = navigation.getParam('lessonDetails')

  console.log('lessonDetails', lessonDetails)

  const handleSwipeLeft = item => {
    setCards(shuffle([...cards]))

    setRepeatedCards([...new Set([...repeatedCards, item.id])])

    Analytics.record({
      name: 'Swipe left - difficult',
      attributes: {
        lessonId: lessonDetails.id,
        lessonTitle: lessonDetails.title,
        cardId: item.id,
        ask: item.ask,
      },
    })
  }

  const handleSwipeRight = item => {
    setCards(cards.slice(1))

    Analytics.record({
      name: 'Swipe right - easy',
      attributes: {
        lessonId: lessonDetails.id,
        lessonTitle: lessonDetails.title,
        cardId: item.id,
        ask: item.ask,
      },
    })
  }

  const handleSwipeUp = item => {
    setCards(shuffle([...cards, item, item]))
    setInitialCardsNumber((initialCardsNumber += 2))
    setRepeatedCards([...new Set([...repeatedCards, item.id])])

    Analytics.record({
      name: 'Swipe up - very hard',
      attributes: {
        lessonId: lessonDetails.id,
        lessonTitle: lessonDetails.title,
        cardId: item.id,
        ask: item.ask,
      },
    })
  }

  return (
    <Container>
      {Array.isArray(cards) && (
        <SwipeCards
          cards={cards}
          renderCard={item => (
            <View
              style={{
                paddingVertical: 50,
              }}
            >
              <CardItem
                cardBody
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderColor: 'transparent',
                }}
              >
                <FlipCard
                  style={{
                    flex: 1,
                    borderColor: 'transparent',
                    width: Dimensions.get('window').width - 40,
                    height: Dimensions.get('window').height - 40,
                  }}
                  friction={6}
                  perspective={1000}
                  flipVertical
                  flip={false}
                  clickable
                >
                  <CardFace>
                    <BigText>{item.ask}</BigText>
                  </CardFace>

                  <CardBack>
                    <BigText>{item.answer}</BigText>
                  </CardBack>
                </FlipCard>
              </CardItem>
            </View>
          )}
          renderNoMoreCards={() => (
            <View>
              <VeryBigText>
                {`No more cards! 👏 \n\nResult: ${result * 100}%`}
              </VeryBigText>
              <Button
                block
                onPress={() => navigation.goBack()}
                style={{ marginTop: 32 }}
              >
                <ButtonText>Go back</ButtonText>
              </Button>
            </View>
          )}
          handleYup={handleSwipeRight}
          handleNope={handleSwipeLeft}
          handleMaybe={handleSwipeUp}
          hasMaybeAction
          yupText="Ok 👌"
          nopeText="Repeat 🤔"
          maybeText={'It is really hard! 🤯'}
          onClickHandler={() => {}}
        />
      )}

      <BottomView>
        <Bar
          progress={
            initialCardsNumber && cards
              ? (initialCardsNumber - cards.length) / initialCardsNumber
              : 0
          }
          width={Dimensions.get('window').width * 0.6}
        />
        <SmallText>{`${initialCardsNumber -
          cards.length} / ${initialCardsNumber}`}</SmallText>
      </BottomView>
    </Container>
  )
}

const mapStateToProps = state => ({
  cardsList: cardsSelector(state),
})

const mapDispatchToProps = bindActionCreators({
  updateLesson: (title, id, successRatio) =>
    LessonsActions.updateLessonRequest(title, id, successRatio),
})

export default compose(
  withState('cards', 'setCards', ''),
  withState('repeatedCards', 'setRepeatedCards', []),
  withState('initialCardsNumber', 'setInitialCardsNumber', 0),
  withHandlers({
    changeAsk: ({ setCards }) => () => setCards(cards => cards),
  }),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withPropsOnChange(['repeatedCards'], ({ repeatedCards, cardsList }) => ({
    result: (
      (cardsList.length - repeatedCards.length) /
      cardsList.length
    ).toFixed(2),
  })),
  lifecycle({
    componentDidMount() {
      this.props.setCards(this.props.cardsList)
      this.props.setInitialCardsNumber(this.props.cardsList.length)
    },

    componentWillUnmount() {
      const { title, id } = this.props.navigation.getParam('lessonDetails')
      // const test = this.props.lessonData

      this.props.updateLesson(title, id, this.props.result)
      console.log('Wynik', this.props.result)
      Alert.alert(`Wynik: ${this.props.result}`)
    },
  }),
)(QuizScreen)

const CardFace = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  border: 2px solid rgba(0, 0, 0, 0.3);
  border-radius: 2px;
`

const CardBack = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  border: 2px solid transparent;
  border-radius: 2px;
  background-color: rgba(0, 0, 255, 0.15);
`

const BottomView = styled.View`
  justify-content: center;
  align-items: center;
  height: 70px;
`

const SmallText = styled.Text`
  font-size: 14px;
  font-weight: 700;
  padding-top: 10px;
`

const ButtonText = styled.Text`
  font-size: 14px;
  font-weight: 700;
  color: white;
`

const BigText = styled.Text`
  font-size: 28px;
  font-family: 'lato';
`

const VeryBigText = styled.Text`
  font-size: 36px;
  font-weight: 700;
  align-items: center;
  justify-content: center;
  text-align: center;
`

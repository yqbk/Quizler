import React from 'react'
import { Bar } from 'react-native-progress'
import { Container, Text, Card, CardItem } from 'native-base'

import SwipeCards from 'react-native-swipe-cards'
import Analytics from '@aws-amplify/analytics'

import { connect } from 'react-redux'
import { lifecycle, compose, withState, withHandlers } from 'recompose'

import { View, Dimensions } from 'react-native'
import styled from 'styled-components'

import { bindActionCreators } from '../../../utils/reduxUtils'
import { cardsSelector } from '../../../containers/cards/selector'
import FlipCard from 'react-native-flip-card'

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
}) => {
  const lessonDetails = navigation.getParam('lessonDetails')

  console.log('lessonDetails', lessonDetails)

  const handleSwipeLeft = item => {
    setCards(shuffle([...cards]))

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
              <VeryBigText>No more cards! 👏</VeryBigText>
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

const BigText = styled.Text`
  font-size: 28px;
  font-family: 'lato';
`

const VeryBigText = styled.Text`
  font-size: 36px;
  font-weight: 700;
`

const mapStateToProps = state => ({
  cardsList: cardsSelector(state),
})

const mapDispatchToProps = bindActionCreators({
  // removeCard: cardId => CardsActions.removeCardRequest(cardId),
})

export default compose(
  withState('cards', 'setCards', ''),
  withState('initialCardsNumber', 'setInitialCardsNumber', 0),
  withHandlers({
    changeAsk: ({ setCards }) => () => setCards(cards => cards),
  }),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  lifecycle({
    componentDidMount() {
      this.props.setCards(this.props.cardsList)
      this.props.setInitialCardsNumber(this.props.cardsList.length)
    },
  }),
)(QuizScreen)

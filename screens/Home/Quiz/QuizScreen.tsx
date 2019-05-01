import React from 'react'
import { Bar } from 'react-native-progress'
import {
  Container,
  Content,
  Text,
  DeckSwiper,
  Card,
  CardItem,
  Button,
  Icon,
} from 'native-base'

import Swiper from 'react-native-deck-swiper'
import SwipeCards from 'react-native-swipe-cards'

import { ListView, Alert } from 'react-native'

import { connect } from 'react-redux'
import {
  lifecycle,
  compose,
  withState,
  withHandlers,
  withPropsOnChange,
} from 'recompose'

import { View } from 'react-native'
import styled from 'styled-components'

import { bindActionCreators } from '../../../utils/reduxUtils'
import { cardsSelector } from '../../../containers/cards/selector'
import FlipCard from 'react-native-flip-card'

Array.prototype.insert = function(index: number, item: Object): void {
  this.splice(index, 0, item)
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const QuizScreen = ({
  // navigation,
  removeLesson,
  cards,
  cardsList,
  setCards,
  getCards,
  removeCard,
  changeProgress,
}) => {
  const handleSwipeLeft = item => {
    console.log('item', item)
    const cardsWithoutItem = cards.filter(card => card.id !== item.id)
    console.log(
      ' -> ',
      item.id,
      cardsWithoutItem.map(card => card.ask),
      cards.map(card => card.ask),
    )
    setCards(cardsWithoutItem)
    // console.log('=>', this._deckSwiper._root.props.dataSource.length)
  }

  // repeat car
  const handleSwipeRight = item => {
    const newIndex = Math.floor(Math.random() * (cards.length - 1))
    const lessCards = cards.slice(1)
    const firstItem = cards[0]
    const shuffled = shuffle(cards.slice(1))
    const cardsWithRepeatedItem = [firstItem, ...shuffled]
    // debugger
    setCards(cardsWithRepeatedItem)
    console.log(
      ' -> ',
      cardsWithRepeatedItem.map(card => card.ask),
      cards.map(card => card.ask),
    )
    // console.log('==', this._deckSwiper._root)
    // console.log('=>', this._deckSwiper._root.props.dataSource.length)
    // changeProgress()
  }

  // const handleYup = card => {
  //   console.log(`Yup for ${card.text}`)

  //   this.setState({
  //     completed: this.state.completed + 1,
  //   })
  // }
  // const handleNope = card => {
  //   const shuffled = shuffle([...this.state.cards])

  //   console.log(shuffled[0])

  //   this.setState({
  //     cards: shuffled,
  //   })

  //   console.log(`Nope for ${card.text}`)
  // }
  // const handleMaybe = card => {
  //   this.setState({
  //     cards: [...this.state.cards, card],
  //   })

  //   console.log(`Maybe for ${card.text}`)
  // }

  return (
    <Container>
      {Array.isArray(cards) && (
        <SwipeCards
          cards={cards}
          renderCard={item => (
            <Card
              style={{
                flex: 1,
                height: 300,
                //
                borderWidth: 1,
                borderRadius: 2,
                borderColor: '#ddd',
                borderBottomWidth: 0,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 2,
                elevation: 1,
              }}
            >
              <CardItem
                cardBody
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* <Text>{item.ask}</Text> */}
                <FlipCard
                  style={{
                    flex: 1,
                    borderColor: 'transparent',
                    width: 350,
                    elevation: 3,
                  }}
                  friction={6}
                  perspective={1000}
                  flipVertical
                  flip={false}
                  clickable={true}
                  onFlipEnd={isFlipEnd => {
                    // console.log('isFlipEnd', isFlipEnd)
                  }}
                >
                  <CardFace>
                    <Text>{item.ask}</Text>
                  </CardFace>

                  <CardBack>
                    <Text>{item.answer}</Text>
                  </CardBack>
                </FlipCard>
              </CardItem>
            </Card>
          )}
          renderNoMoreCards={() => (
            <View>
              <Text>No more cards</Text>
            </View>
          )}
          handleYup={handleSwipeRight}
          handleNope={handleSwipeLeft}
          // handleMaybe={this.handleMaybe}
          hasMaybeAction={false}
        />
      )}

      <BottomView>
        <Bar
          progress={cards && cardsList && (cardsList.length - cards.length) / cardsList.length}
          width={200}
        />
      </BottomView>

      {/* <BottomView>
        <Bar progress={0.3} width={200} />
      </BottomView>
      <View
        style={{
          flexDirection: 'row',
          flex: 0,
          // position: 'absolute',
          // bottom: 50,
          // left: 0,
          // right: 0,
          justifyContent: 'space-between',
          padding: 15,
        }}
      >
        <Button iconLeft onPress={() => this._deckSwiper._root.swipeLeft()}>
          <Icon name="arrow-back" />
          <Text>ok</Text>
        </Button>
        <Button
          danger
          iconRight
          onPress={() => this._deckSwiper._root.swipeRight()}
        >
          <Text>Repeat</Text>
          <Icon name="arrow-forward" />
        </Button>
      </View> */}
    </Container>
  )
}

const CardFace = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  border: 3px solid blue;
  border-radius: 3px;
`

const BottomView = styled.View`
  /* flex: 0; */
  justify-content: center;
  align-items: center;
  height: 50px;
  border: 1px dashed red;
`

const CardBack = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  border: 3px solid red;
  border-radius: 3px;
`

const mapStateToProps = state => ({
  cardsList: cardsSelector(state),
})

const mapDispatchToProps = bindActionCreators({
  // removeCard: cardId => CardsActions.removeCardRequest(cardId),
})

export default compose(
  withState('cards', 'setCards', ''),
  withState('progress', 'calculateProgress', 0),
  withHandlers({
    changeAsk: ({ setCards }) => () => setCards(cards => cards),
    changeProgress: ({ cards, cardsList, calculateProgress }) => () =>
      calculateProgress(cards.length / cardsList.length),
  }),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  // withPropsOnChange(),
  lifecycle({
    componentDidMount() {
      // const { id } = this.props.navigation.getParam('lesson')
      this.props.setCards(this.props.cardsList)
      // console.log(this.props.cards)
    },
  }),
)(QuizScreen)

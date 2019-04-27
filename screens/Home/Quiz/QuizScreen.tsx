import React from 'react'
import {
  Container,
  Content,
  Text,
  DeckSwiper,
  Card,
  CardItem,
} from 'native-base'

import { ListView, Alert } from 'react-native'

import { connect } from 'react-redux'
import { lifecycle, compose } from 'recompose'

import { View } from 'react-native'
import styled from 'styled-components'

import { bindActionCreators } from '../../../utils/reduxUtils'
import { cardsSelector } from '../../../containers/cards/selector'
import FlipCard from 'react-native-flip-card'

const QuizScreen = ({
  // navigation,
  removeLesson,
  cards,
  getCards,
  removeCard,
}) => {
  console.log('->', cards)
  return (
    <Container>
      <Content
        padder
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <DeckSwiper
          dataSource={cards}
          renderItem={item => (
            <Card
              style={{
                flex: 1,
                height: 500,
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
                    console.log('isFlipEnd', isFlipEnd)
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
        />
      </Content>
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

const CardBack = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  border: 3px solid red;
  border-radius: 3px;
`

const mapStateToProps = state => ({
  cards: cardsSelector(state),
})

const mapDispatchToProps = bindActionCreators({
  // removeCard: cardId => CardsActions.removeCardRequest(cardId),
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(QuizScreen)

import React from 'react'
import { Button, Text, Icon, Spinner, SwipeRow } from 'native-base'
import { Alert, View, FlatList } from 'react-native'
import _get from 'lodash/get'
import { connect } from 'react-redux'
import { lifecycle, compose } from 'recompose'
import styled from 'styled-components'

import LessonsActions from '../../../containers/lessons/reducers'
import CardsActions from '../../../containers/cards/actions'
import { bindActionCreators } from '../../../utils/reduxUtils'
import {
  cardsSelector,
  cardsFetchingSelector,
} from '../../../containers/cards/selector'
import AddCard from './components/AddCard'
import COLORS from '../../../config/Colors'

const removeLessonDialog = (className, removeLesson, id, navigation) =>
  Alert.alert(
    'Do you want to remove this class?',
    `${className}`,
    [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      { text: 'OK', onPress: () => {
        navigation.goBack()
        removeLesson(id)
      } },
    ],
    { cancelable: false },
  )

const LessonScreen = ({
  cardsFetching,
  removeLesson,
  navigation,
  removeCard,
  getCards,
  cards,
}) => {
  const { title, id } = navigation.getParam('lesson')

  if (cardsFetching) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Spinner color={COLORS.mainBlue} />
      </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <AddCard lessonId={id} updateCards={() => getCards(id)} />

      {cards.length ? (
        <FlatList
          data={cards}
          refreshing={cardsFetching}
          onRefresh={() => getCards(id)}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <SwipeRow
              leftOpenValue={75}
              rightOpenValue={-75}
              body={
                <View
                  style={{
                    flex: 1,
                    padding: 24,
                    flexDirection: 'row',
                  }}
                >
                  <Order>{`${index + 1}. `}</Order>
                  <AskText>{item.ask}</AskText>
                  <AnswerText>{item.answer}</AnswerText>
                </View>
              }
              disableRightSwipe
              right={
                <Button
                  full
                  danger
                  onPress={() => {
                    removeCard(item.id)
                    getCards(id)
                  }}
                >
                  <Icon active name="trash" />
                </Button>
              }
            />
          )}
        />
      ) : (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <AskText>No cards...</AskText>
        </View>
      )}

      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
          flexDirection: 'row',
        }}
      >
        <Button
          block
          onPress={() =>
            navigation.navigate('Quiz', {
              lessonDetails: { id, title },
            })
          }
          style={{ flex: 4 }}
        >
          <Text>Start lesson</Text>
        </Button>

        <View style={{ flex: 1 }} />

        <Button
          danger
          block
          onPress={() => removeLessonDialog(title, removeLesson, id, navigation)}
          style={{ flex: 2 }}
        >
          <Text>Remove</Text>
        </Button>
      </View>
    </View>
  )
}


const Order = styled.Text`
  width: 24px;
  font-size: 14px;
  justify-content: center;
  align-items: center;
  text-align: center;
`

const AskText = styled.Text`
  flex: 1;
  font-size: 18px;
  font-weight: 500;
  justify-content: center;
  align-items: center;
  text-align: center;
`

const AnswerText = styled.Text`
  font-size: 18px;
  color: gray;
  flex: 1;
  justify-content: center;
  align-items: center;
  text-align: center;
`

export const Spacer = styled.View`
  flex: 1;
`

const mapStateToProps = state => ({
  cards: cardsSelector(state),
  cardsFetching: cardsFetchingSelector(state),
})

const mapDispatchToProps = bindActionCreators({
  removeLesson: title => LessonsActions.removeLessonRequest(title),
  getCards: lessonID => CardsActions.getCardsRequest(lessonID),
  removeCard: cardId => CardsActions.removeCardRequest(cardId),
})

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  lifecycle({
    componentDidMount() {
      const { id } = this.props.navigation.getParam('lesson')
      this.props.getCards(id)
    },
  }),
)(LessonScreen)

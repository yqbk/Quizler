import React from 'react'
import {
  Container,
  Content,
  Button,
  Text,
  Icon,
  List,
  ListItem,
  Card, CardItem, Body
} from 'native-base'


import { ListView, Alert } from 'react-native'

import { connect } from 'react-redux'
import { lifecycle, compose } from 'recompose'

import { View } from 'react-native'
import styled from 'styled-components'

import LessonsActions from '../../../containers/lessons/reducers'
import CardsActions from '../../../containers/cards/actions'
import { bindActionCreators } from '../../../utils/reduxUtils'
import { cardsSelector } from '../../../containers/cards/selector'
import AddCard from './components/AddCard'

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

const removeLessonDialog = (className, removeLesson, id) =>
  Alert.alert(
    'Do you want to remove this class?',
    `${className}`,
    [
      {
        text: 'Cancel',
        // onPress: () => null,
        style: 'cancel',
      },
      { text: 'OK', onPress: () => removeLesson(id) },
    ],
    { cancelable: false },
  )

const LessonScreen = ({
  navigation,
  removeLesson,
  cards,
  getCards,
  removeCard,
}) => {
  const { title, id } = navigation.getParam('lesson')

  return (
    <Container>
      <Content padder contentContainerStyle={{ flexGrow: 1 }}>
        <List
          leftOpenValue={75}
          rightOpenValue={-75}
          dataSource={ds.cloneWithRows(cards)}
          renderRow={data => (
            <ListItem>
              <Text> {data.ask} </Text>
              <AnswerText> {data.answer} </AnswerText>
            </ListItem>
          )}
          renderRightHiddenRow={data => (
            <Button full onPress={() => console.log(data)}>
              <Icon active name="information-circle" />
            </Button>
          )}
          renderLeftHiddenRow={data => (
            <Button full danger onPress={() => removeCard(data.id)}>
              <Icon active name="trash" />
            </Button>
          )}
        />

        <AddCard lessonId={id} />

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
            onPress={() => navigation.navigate('Quiz')}
            style={{ flex: 1 }}
          >
            <Text> Start lesson </Text>
          </Button>

          <Button
            danger
            block
            onPress={() => removeLessonDialog(title, removeLesson, id)}
            style={{ flex: 1 }}
          >
            <Text> Remove lesson </Text>
          </Button>
        </View>
      </Content>
    </Container>
  )
}

const CardsView = styled.View`
  flex: 1;
`

const AnswerText = styled.Text`
  font-size: 12px;
  color: gray;
`

export const Spacer = styled.View`
  flex: 1;
`

const mapStateToProps = state => ({
  cards: cardsSelector(state),
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

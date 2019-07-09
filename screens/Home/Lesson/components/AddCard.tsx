import React from 'react'
import { Button, Text, Item, Input, Label, Card, CardItem } from 'native-base'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { compose, withState } from 'recompose'

import CardsActions from '../../../../containers/cards/actions'
import { bindActionCreators } from '../../../../utils/reduxUtils'

const AddCard = ({
  lessonId,
  addCard,
  ask,
  setAsk,
  answer,
  setAnswer,
  updateCards,
}) => (
  <View style={{ padding: 12 }}>
    <Card>
      <CardItem>
        <Item floatingLabel style={{ flex: 1 }}>
          <Label> Question </Label>
          <Input onChangeText={setAsk} value={ask} />
        </Item>

        <Item floatingLabel style={{ flex: 1 }}>
          <Label> Answer </Label>
          <Input onChangeText={setAnswer} value={answer} />
        </Item>

        <Button
          transparent={true}
          onPress={() => {
            addCard(lessonId, ask, answer)
            setAsk('')
            setAnswer('')
            updateCards()
          }}
          disabled={!ask || !answer}
        >
          <Text> Add </Text>
        </Button>
      </CardItem>
    </Card>
  </View>
)

const mapDispatchToProps = bindActionCreators({
  addCard: (lessonId, ask, answer) =>
    CardsActions.addCardRequest(lessonId, ask, answer),
})

export default compose(
  connect(
    null,
    mapDispatchToProps,
  ),
  withState('ask', 'setAsk', ''),
  withState('answer', 'setAnswer', ''),
)(AddCard)

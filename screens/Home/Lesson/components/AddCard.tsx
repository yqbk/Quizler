import React from 'react';
import { Button, Text, Item, Input, Label, Card, CardItem } from 'native-base';

import { ListView } from 'react-native';

import { connect } from 'react-redux';
import { lifecycle, compose, withState, withHandlers } from 'recompose';

import { View, FlatList } from 'react-native';
import styled from 'styled-components';

import CardsActions from '../../../../containers/cards/actions';
import { bindActionCreators } from '../../../../utils/reduxUtils';

const AddCard = ({ lessonId, addCard, ask, setAsk, answer, setAnswer }) => {
  console.log('->', lessonId, ask, answer);
  return (
    <Card>
      <View style={{ flex: 1 }}>
        <Item floatingLabel={true} style={{ flex: 1 }}>
          <Label> Question </Label>
          <Input onChangeText={setAsk} />
        </Item>
        <Item floatingLabel={true} style={{ flex: 1 }}>
          <Label> Answer </Label>
          <Input onChangeText={setAnswer} />
        </Item>
      </View>
      <CardItem footer={true}>
        <Button
          transparent={true}
          onPress={() => addCard(lessonId, ask, answer)}
          disabled={!ask || !answer}
        >
          <Text> Add </Text>
        </Button>
      </CardItem>
    </Card>
  );
};

const mapStateToProps = state => ({
  //   cards: cardsSelector(state),
});

const mapDispatchToProps = bindActionCreators({
  addCard: (lessonId, ask, answer) => CardsActions.addCardRequest(lessonId, ask, answer),
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withState('ask', 'setAsk', ''),
  withState('answer', 'setAnswer', ''),
  withHandlers({
    changeAsk: ({ setAsk }) => () => setAsk(ask => ask),
    changeAnswer: ({ setAnswer }) => () => setAnswer(answer => answer),
  })
)(AddCard);

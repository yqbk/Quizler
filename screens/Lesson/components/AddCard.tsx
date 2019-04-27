import React from 'react';
import { Button, Text, Item, Input, Label, Card, CardItem } from 'native-base';

import { ListView } from 'react-native';

import { connect } from 'react-redux';
import { lifecycle, compose, withState, withHandlers } from 'recompose';

import { View, FlatList } from 'react-native';
import styled from 'styled-components';

import CardsActions from '../../../containers/cards/actions';
import { bindActionCreators } from '../../../utils/reduxUtils';

const AddCard = ({ addCard }) => {
  return (
    <Card>
      <View style={{ flex: 1 }}>
        <Item floatingLabel={true} style={{ flex: 1 }}>
          <Label> Question </Label>
          <Input />
        </Item>
        <Item floatingLabel={true} style={{ flex: 1 }}>
          <Label> Answer </Label>
          <Input />
        </Item>
      </View>
      <CardItem footer={true}>
        <Button transparent={true} onPress={() => alert('test')}>
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
  withState('counter', 'setCounter', 0),
  withHandlers({
    increment: ({ setCounter }) => () => setCounter(n => n + 1),
    decrement: ({ setCounter }) => () => setCounter(n => n - 1),
    reset: ({ setCounter }) => () => setCounter(0),
  })

  //   lifecycle({
  //     componentDidMount() {
  //       const { title, id, ...rest } = this.props.navigation.getParam('lesson');

  //       console.log('lesson mounted', title, id);
  //       this.props.getCards(id);
  //     },
  //   })
)(AddCard);

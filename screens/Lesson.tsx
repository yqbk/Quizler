import React from 'react';

import { connect } from 'react-redux';
import { lifecycle, compose, withProps, pure } from 'recompose';

import { Text, Button, View, FlatList } from 'react-native';
import styled from 'styled-components';

import LessonsActions from '../state/lessonsReducer';
import CardsActions from '../containers/cards/actions';
import { bindActionCreators } from '../utils/reduxUtils';
import { cardsSelector } from '../containers/cards/selector';

const LessonScreen = ({ navigation, removeLesson, cards, getCards, addCard }) => {
  const { title, id, ...rest } = navigation.getParam('lesson');

  console.log('cards', cards);

  return (
    <LessonView>
      <View style={{ flex: 1, flexDirection: 'column', borderWidth: 2, paddingBottom: 32 }}>
        <Text> {title} </Text>
        <Button title="get cards" onPress={() => getCards(id)} />
        <Button title="add question" onPress={() => addCard(id, 'pytanie', 'odpowiedz')} />
      </View>

      <CardsView>
        {cards && (
          <FlatList
            data={[{ isNew: true }, ...cards]}
            keyExtractor={this._keyExtractor}
            renderItem={({ item }) => (
              <View>
                <Text>
                  Card -> {item.ask} = {item.answer}
                </Text>
              </View>
            )}
          />
        )}
      </CardsView>
      <Button color="red" title=" Delete lesson " onPress={() => removeLesson(id)} />
    </LessonView>
  );
};

const CardsView = styled.View`
  border: 1px solid red;
  flex: 1;
`;

const LessonView = styled.View`
  border: 1px solid #000000ab;
  border-radius: 5px;
  flex: 1;
  padding-top: 15;
`;

const mapStateToProps = state => ({
  cards: cardsSelector(state),
});

const mapDispatchToProps = bindActionCreators({
  removeLesson: title => LessonsActions.removeLessonRequest(title),
  getCards: lessonID => CardsActions.getCardsRequest(lessonID),
  addCard: (lessonId, ask, answer) => CardsActions.addCardRequest(lessonId, ask, answer),
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  // withProps(({ closeDialog }) => ({
  // TODO SELECTOR?
  //   timeout: () => {
  //     closeDialog();
  //   },
  // })),
  lifecycle({
    componentDidMount() {
      const { title, id, ...rest } = this.props.navigation.getParam('lesson');

      console.log('lesson mounted', title, id);
      this.props.getCards(id);
    },
  })
)(LessonScreen);

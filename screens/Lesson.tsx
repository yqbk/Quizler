import React from 'react';
// import { Font } from 'expo';
// import { Ionicons } from '@expo/vector-icons';
import {
  Container,
  Header,
  Content,
  Accordion,
  Button,
  Text,
  Icon,
  List,
  ListItem,
  Body,
  Title,
} from 'native-base';

import { ListView } from 'react-native';

import { connect } from 'react-redux';
import { lifecycle, compose, withProps, pure } from 'recompose';

import { View, FlatList } from 'react-native';
import styled from 'styled-components';

import LessonsActions from '../state/lessonsReducer';
import CardsActions from '../containers/cards/actions';
import { bindActionCreators } from '../utils/reduxUtils';
import { cardsSelector } from '../containers/cards/selector';

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

const LessonScreen = ({ navigation, removeLesson, cards, getCards, addCard }) => {
  const { title, id, ...rest } = navigation.getParam('lesson');

  console.log('cards', cards);

  return (
    // <LessonView>
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
          renderLeftHiddenRow={data => (
            <Button full onPress={() => alert(data)}>
              <Icon active name="information-circle" />
            </Button>
          )}
          renderRightHiddenRow={(data, secId, rowId, rowMap) => (
            <Button full danger onPress={_ => alert('delete')}>
              <Icon active name="trash" />
            </Button>
          )}
        />
      </Content>
      <Button danger big onPress={() => removeLesson(id)}>
        <Text> Delete lesson </Text>
      </Button>
    </Container>
    // </LessonView>
  );
};

const CardsView = styled.View`
  flex: 1;
`;

const LessonView = styled.View`
  border: 1px solid #000000ab;
  flex: 1;
  padding-top: 15;
  justify-content: center;
`;

const AnswerText = styled.Text`
  font-size: 12px;
  color: gray;
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

  lifecycle({
    componentDidMount() {
      const { title, id, ...rest } = this.props.navigation.getParam('lesson');

      console.log('lesson mounted', title, id);
      this.props.getCards(id);
    },
  })
)(LessonScreen);

import React from 'react';

import { connect } from 'react-redux';
import { lifecycle, compose, withProps, pure } from 'recompose';

import { Text, Button, View, FlatList } from 'react-native';
import styled from 'styled-components';

import LessonsActions from '../state/lessonsReducer';
import CardsActions from '../containers/cards/actions';
import { bindActionCreators } from '../utils/reduxUtils';

const LessonScreen = ({ navigation, removeLesson, cards, getCards }) => {
  // console.log('navigation?', navigation);

  const { title, id, ...rest } = navigation.getParam('lesson');

  // console.log('=> ', this.props.lessons);
  // let lekcje = null;

  console.log('cards', cards);

  // if (this.props.lessons && this.props.lessons.length) {
  //   lekcje = this.props.lessons.filter(item => item.id && item.title);
  //   lekcje.map(lekcja => console.log(lekcja.title));
  // }

  return (
    <LessonView>
      <View style={{ flex: 1, flexDirection: 'column', borderWidth: 2, paddingBottom: 32 }}>
        <Text> {title} </Text>
        <Button title="get cards" onPress={() => getCards(title)} />
      </View>

      {/* <CardsView>
        {cards && (
          <FlatList
            data={[{ isNew: true }, ...cards]}
            keyExtractor={this._keyExtractor}
            renderItem={({ item }) => (
              <View>
                <Text>Card -> </Text>
              </View>
            )}
          />
        )}
      </CardsView> */}
      <Button color="red" title=" Delete lesson " onPress={() => removeLesson(id)} />
    </LessonView>
  );
};

const CardsView = styled.View`
  border: 1px solid red;
`;

const LessonView = styled.View`
  border: 1px solid #000000ab;
  border-radius: 5px;
  flex: 1;
  padding-top: 15;
`;

const mapDispatchToProps = bindActionCreators({
  removeLesson: title => LessonsActions.removeLessonRequest(title),
  getCards: title => CardsActions.getCardsRequest(title),
});

export default compose(
  connect(
    null,
    mapDispatchToProps
  ),
  // withProps(({ closeDialog }) => ({
  //   timeout: () => {
  //     closeDialog();
  //   },
  // })),
  lifecycle({
    componentDidMount() {
      const { title, id, ...rest } = this.props.navigation.getParam('lesson');

      console.log('lesson mounted', title, id);

      // console.log('this', this.props);
      this.props.getCards(title);

      // if (this.props.enhanced) {
      //   setTimeout(this.props.timeout, 5000);
      // }
    },
  })
)(LessonScreen);

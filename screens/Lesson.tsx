import React from 'react';

import { connect } from 'react-redux';
import { compose } from 'recompose';

import { Text, Button, View } from 'react-native';
import styled from 'styled-components';

import LessonsActions from '../state/lessonsReducer';
import { bindActionCreators } from '../utils/reduxUtils';

const LessonScreen = ({ navigation, removeLesson }) => {
  console.log('navigation?', navigation);
  const { title, id, ...rest } = navigation.getParam('lesson');

  return (
    <LessonScrollView>
      <View style={{ flex: 1, flexDirection: 'column', borderWidth: 2, paddingBottom: 32 }}>
        <Text> {title} </Text>
      </View>
      <Button color="red" title=" Delete lesson " onPress={() => removeLesson(id)} />
    </LessonScrollView>
  );
};

const LessonScrollView = styled.ScrollView`
  border: 1px solid #000000ab;
  border-radius: 5px;
  flex: 1;
  padding-top: 15;
`;

const mapDispatchToProps = bindActionCreators({
  removeLesson: title => LessonsActions.removeLessonRequest(title),
});

export default compose(
  connect(
    null,
    mapDispatchToProps
  )
)(LessonScreen);

import React from 'react';

import styled from 'styled-components';
import {
  ScrollView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  Button,
  TextInput,
  Alert,
  FlatList,
} from 'react-native';

import { ExpoLinksView } from '@expo/samples';

export default class LessonScreen extends React.Component {
  static navigationOptions = {
    title: 'Lesson',
  };

  render() {
    const { title, ...rest } = this.props.navigation.getParam('lesson');

    console.log('-> lesson', title, rest);

    return (
      <LessonScrollView>
        <View style={{ flex: 1, flexDirection: 'column', borderWidth: 2, paddingBottom: 32 }}>
          <Text> {title} </Text>
          <Text> {title} </Text>
          <Text> {title} </Text>
        </View>
        <Button color="red" title=" Delete lesson " onPress={() => console.log('Delete lesson')} />
      </LessonScrollView>
    );
  }
}

const LessonScrollView = styled.ScrollView`
  border: 1px solid #000000ab;
  border-radius: 5px;
  flex: 1;
  padding-top: 15;
  /* background-color: '#fff'; */
  /* align-content: 'space-between'; */
`;

// Vconst Lesson = ({ lessonName, onPress, isNew }) => (
//   <LessonWrapper onPress={onPress} isNew={isNew}>
//     {
//         isNew ?
//     <NewLesson /> :
//     <LessonTitle>{lessonName || 'empty'}</LessonTitle>
//     }
//     {/* <LessonTitle>{lessonName || 'test'}</LessonTitle> */}
//   </LessonWrapper>
// );

// const LessonWrapper = styled.TouchableOpacity`
//   border: 1px solid #000000ab;
//   flex-direction: row;
//   margin-horizontal: 60px;
//   margin-vertical: 15px;
//   height: 120px;
//   align-items: center;
//   justify-content: center;
//   border-radius: 5px;

//   /* background: ${props => (props.isNew ? `#000000ae` : `white`)}; */
// `;

// const LessonTitle = styled.Text`
//   color: black;
//   font-size: 24px;
//   text-align: center;
//   flex: 1;
//   font-weight: 900;
// `;

// export default Lesson;

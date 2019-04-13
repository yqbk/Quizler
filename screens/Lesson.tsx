import React from 'react';

import { compose } from 'recompose';
import { connect } from 'react-redux';

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


import { removeLessonRequest } from '../state/lessonsReducer';
import { bindActionCreators } from '../utils/reduxUtils';

// export default class LessonScreen extends React.Component {
//   static navigationOptions = {
//     title: 'Lesson',
//   };

//   render() {
//     const { title, ...rest } = this.props.navigation.getParam('lesson');

//     console.log('-> lesson', title, rest);

//     return (
//       <LessonScrollView>
//         <View style={{ flex: 1, flexDirection: 'column', borderWidth: 2, paddingBottom: 32 }}>
//           <Text> {title} </Text>
//           <Text> {title} </Text>
//           <Text> {title} </Text>
//         </View>
//         <Button color="red" title=" Delete lesson " onPress={() => console.log('Delete lesson')} />
//       </LessonScrollView>
//     );
//   }
// }

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
  removeLesson: title => removeLessonRequest(title),
});

export default compose(
  connect(
    null,
    mapDispatchToProps
  )
)(LessonScreen);

import React from 'react';
import styled from 'styled-components';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Button,
  TextInput,
  Alert,
  FlatList,
} from 'react-native';
import NewLesson from './NewLesson';

const Lesson = ({ lessonName, onPress, isNew }) => (
  <LessonWrapper onPress={onPress} isNew={isNew}>
    {
        isNew ? 
    <NewLesson /> : 
    <LessonTitle>{lessonName || 'empty'}</LessonTitle>
    }
    {/* <LessonTitle>{lessonName || 'test'}</LessonTitle> */}
  </LessonWrapper>
);

const LessonWrapper = styled.TouchableOpacity`
  border: 1px solid #000000ab;
  flex-direction: row;
  margin-horizontal: 60px;
  margin-vertical: 15px;
  height: 120px;
  align-items: center;
  justify-content: center;
  border-radius: 5px;

  /* background: ${props => (props.isNew ? `#000000ae` : `white`)}; */
`;

const LessonTitle = styled.Text`
  color: black;
  font-size: 24px;
  text-align: center;
  flex: 1;
  font-weight: 900;
`;

export default Lesson;

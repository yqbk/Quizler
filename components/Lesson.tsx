import React from 'react'
import styled from 'styled-components'
import {
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
  FlatList,
} from 'react-native'
import NewLesson from './NewLesson'

import {
  Container,
  Content,
  Button,
  Text,
  Icon,
  List,
  ListItem,
  Card,
  CardItem,
  Body,
} from 'native-base'

import COLORS from '../config/Colors'

const Lesson = ({ lessonName, onPress, isNew }) => (
  <LessonWrapper onPress={onPress} isNew={isNew}>
    {isNew ? (
      <NewLesson />
    ) : (
      <Card style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <CardItem
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <LessonTitle>{lessonName || 'empty'}</LessonTitle>
        </CardItem>
      </Card>
    )}
  </LessonWrapper>
)

const LessonWrapper = styled.TouchableOpacity`
  /* border: 1px solid #000000ab; */
  flex-direction: row;
  margin-horizontal: 16px;
  margin-vertical: 8px;
  height: 120px;
  align-items: center;
  justify-content: center;
  /* border-radius: 5px; */
  /* background-color: ${COLORS.background} */
  /* box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23); */

  /* background: ${props => (props.isNew ? `#000000ae` : `white`)}; */
`

const LessonTitle = styled.Text`
  /* color: ${COLORS.mainBlue}; */
  opacity: 0.75;
  font-size: 32px;
  text-align: center;
  flex: 1;
  font-weight: 900;
`

export default Lesson

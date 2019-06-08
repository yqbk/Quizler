import React from 'react'
import styled from 'styled-components'

import NewLesson from './NewLesson'

import { Card, CardItem } from 'native-base'

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
  flex-direction: row;
  margin-horizontal: 16px;
  margin-vertical: 8px;
  height: 120px;
  align-items: center;
  justify-content: center;
`

const LessonTitle = styled.Text`
  color: ${COLORS.mainBlue};
  font-size: 32px;
  text-align: center;
  flex: 1;
  font-weight: 900;
`

export default Lesson

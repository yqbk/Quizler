import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import LessonsActions from '../containers/lessons/reducers'

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

import Amplify from '@aws-amplify/core'
import config from '../aws-exports'
Amplify.configure(config)
import { bindActionCreators } from '../utils/reduxUtils'
class NewLesson extends React.Component {
  state = {
    lessons: [],
    title: '',
  }

  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }

  render() {
    return (
      <Card style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <CardItem
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <NewLessonInput
            placeholder="enter text"
            onChangeText={val => this.onChangeText('title', val)}
            value={this.state.title}
          />
          <NewLessonButton
            onPress={() => this.props.addLesson(this.state.title)}
            title="Add Lesson!"
            size={'small'}
          />
        </CardItem>
      </Card>
    )
  }
}

const mapDispatchToProps = bindActionCreators({
  addLesson: title => LessonsActions.addLessonRequest(title),
})

export default connect(
  null,
  mapDispatchToProps,
)(NewLesson)

const NewLessonWrapper = styled.View`
  align-items: center;
  justify-content: center;
  border: 1px solid black;
`

const NewLessonButton = styled.Button`
  font-size: 8;
  color: red;
  width: 30px;
  border: 1px solid black;
`

const NewLessonText = styled.Text`
  font-size: 20;
  font-weight: 500;
`

const NewLessonInput = styled.TextInput`
  font-size: 20;
  font-weight: 300;
  margin: 10px;
  padding: 10px;
  flex: 1;
  min-width: 180px;
  text-align: center;
`

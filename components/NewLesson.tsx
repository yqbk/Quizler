import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
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
} from 'react-native'

import LessonsActions from '../containers/lessons/reducers'

import Amplify from '@aws-amplify/core'
import config from '../aws-exports'
Amplify.configure(config)
import API, { graphqlOperation } from '@aws-amplify/api'
import { createLesson } from '../src/graphql/mutations'
import Analytics from '@aws-amplify/analytics'
import { bindActionCreators } from '../utils/reduxUtils'
class NewLesson extends React.Component {
  state = {
    lessons: [],
    title: '',
  }

  // addLesson = async () => {
  //   const lessonTitle = this.state.title;

  //   console.log('1. lessonTitle', lessonTitle);

  //   if (lessonTitle === '') return;

  //   const lessons = [...this.state.lessons, { title: lessonTitle }];

  //   console.log('2. state', this.state);

  //   this.setState({ lessons, title: '' });
  //   try {
  //     await API.graphql(graphqlOperation(createLesson, { input: { title: lessonTitle } }));

  //     console.log('lesson successfully created.');
  //     Analytics.record({
  //       name: 'Lesson created',
  //       attributes: {
  //         lessonTitle: lessonTitle,
  //       },
  //     });
  //   } catch (err) {
  //     console.log('error creating lesson...', err);
  //   }
  // };

  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }

  render() {
    // console.log('this.props', this.props);

    return (
      <NewLessonWrapper>
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
      </NewLessonWrapper>
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
`

const NewLessonButton = styled.Button`
  font-size: 8;
  color: red;
  width: 30px;
  border: 1px solid black;
`

const NewLessonText = styled.Text`
  /* color: red; */
  font-size: 20;
  font-weight: 500;
`

const NewLessonInput = styled.TextInput`
  font-size: 20;
  font-weight: 300;
  /* border: 1px solid black;
  border-radius: 3px; */
  margin: 10px;
  padding: 10px;
  flex: 1;
  min-width: 180px;
  /* align-content: center;
    justify-content: center; */
  text-align: center;
`

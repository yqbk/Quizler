import React from 'react'
import { connect } from 'react-redux'

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
import { WebBrowser } from 'expo'
import Swiper from 'react-native-deck-swiper'
import FlipCard from 'react-native-flip-card'

import LessonsActions from '../../containers/lessons/reducers'

import Amplify from '@aws-amplify/core'
import config from '../../aws-exports'
Amplify.configure(config)
import API, { graphqlOperation } from '@aws-amplify/api'
import Analytics from '@aws-amplify/analytics'

import { MonoText } from '../../components/StyledText'
import { styles } from '../styles'
import { listLessons } from '../../src/graphql/queries'
import { createLesson } from '../../src/graphql/mutations'
import Lesson from '../../components/Lesson'
import { lessonsSelector } from '../../containers/lessons/selector'

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
    // title: 'Lessons',
  }

  state = {
    lessons: [],
    title: '',
  }

  async componentDidMount() {
    this.props.getLessons()
  }

  render() {
    let lekcje = []
    if (this.props.lessons && this.props.lessons.length) {
      lekcje = this.props.lessons.filter(item => item.id && item.title)
    }

    return (
      <View style={{ flex: 1, paddingTop: 50 }}>
        <FlatList
          data={[...lekcje, { isNew: true }]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Lesson
              lessonName={item.title}
              isNew={item.isNew}
              onPress={() => {
                this.props.navigation.navigate('Lesson', {
                  lesson: item,
                })
              }}
            />
          )}
        />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  lessons: lessonsSelector(state),
})

const mapDispatchToProps = dispatch => {
  return {
    getLessons: () =>
      dispatch(LessonsActions.getLessonsRequest('test payload')),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen)

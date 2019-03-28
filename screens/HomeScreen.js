import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View, Button, TextInput } from 'react-native';
import { WebBrowser } from 'expo';
import Swiper from 'react-native-deck-swiper';
import FlipCard from 'react-native-flip-card';

import Amplify from '@aws-amplify/core';
import config from '../aws-exports';
Amplify.configure(config);
import API, { graphqlOperation } from '@aws-amplify/api';
import Analytics from '@aws-amplify/analytics';

import { MonoText } from '../components/StyledText';
import { styles } from './styles';
import { listLessons } from '../src/graphql/queries';
import { createLesson } from '../src/graphql/mutations';

// const listLessons = `
//   query {
//     listLesson {
//       items {
//         id
//         title
//         questions
//       }
//     }
//  }
// `;
// const createLesson = `
//   mutation($title: String!) {
//     createLesson(input: {
//       title: $title
//   }) {
//     id
//     title
//   }
// }`;

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    // header: null,
  };

  state = {
    lessons: [],
    title: '',
  };

  async componentDidMount() {
    try {
      const graphqlData = await API.graphql(graphqlOperation(listLessons));
      console.log('graphqldata:', graphqlData);
      this.setState({ lessons: graphqlData.data.listLessons.items });
    } catch (err) {
      console.log('error: ', err);
    }
  }

  onChangeText = (key, val) => {
    this.setState({ [key]: val });
  };

  addLesson = async () => {
    const lessonTitle = this.state.title;

    console.log('1. lessonTitle', lessonTitle);

    if (lessonTitle === '') return;

    const lessons = [...this.state.lessons, { title: lessonTitle }];

    console.log('2. state', this.state);

    this.setState({ lessons, title: '' });
    try {
      await API.graphql(graphqlOperation(createLesson, { input: { title: lessonTitle } }));
      console.log('lesson successfully created.');
      Analytics.record({
        name: 'Lesson created',
        attributes: {
          lessonTitle: lessonTitle,
        },
      });
    } catch (err) {
      console.log('error creating lesson...', err);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={val => this.onChangeText('title', val)}
          placeholder="Lesson Name"
          value={this.state.title}
        />

        <Button onPress={this.addLesson} title="Add Lesson!" />

        <Text style={styles.header}>Lessons</Text>

        {this.state.lessons.map((lesson, index) => (
          <View key={index} style={styles.lesson}>
            <Text style={styles.lessonTitle}>{lesson.title}</Text>
          </View>
        ))}
        {/* <Swiper
          cards={['DO', 'MORE', 'OF', 'WHAT', 'MAKES', 'YOU', 'HAPPY']}
          marginBottom={100}
          marginTop={80}
          renderCard={card => {
            return (
              <View style={styles.card}>
                <FlipCard
                  style={styles.flipCard}
                  friction={6}
                  perspective={1000}
                  flipHorizontal
                  flipVertical={false}
                  flip={false}
                  clickable
                  onFlipped={isFlipped => {}}
                >
                  <View style={styles.face}>
                    <Text style={styles.text}>{card.question}</Text>
                    <Text style={styles.text}>A</Text>
                  </View>

                  <View style={styles.back}>
                    <Text style={styles.text}>B</Text>
                    {!this.state.completed && (
                      <View>
                        <Text style={styles.smallText}>
                          If you know the answer swipe the card to the
                          <Text style={{ color: 'blue' }}>right.</Text>
                        </Text>
                        <Text style={styles.smallText}>
                          {' '}
                          If you would like to repeat this question some more swipe to the
                          <Text style={{ color: 'red' }}>left.</Text>
                        </Text>
                      </View>
                    )}
                  </View>
                </FlipCard>
              </View>
            );
          }}
          onSwiped={cardIndex => {
            console.log(cardIndex);
          }}
          onSwipedAll={() => {
            console.log('onSwipedAll');
          }}
          cardIndex={0}
          backgroundColor={'white'}
          stackSize={3}
        /> */}
        {/* <View style={{ height: 150, borderWidth: 3 }} /> */}
      </View>
    );
  }
}

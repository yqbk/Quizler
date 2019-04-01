import React from 'react';
import { connect } from 'react-redux';
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
import { WebBrowser } from 'expo';
import Swiper from 'react-native-deck-swiper';
import FlipCard from 'react-native-flip-card';

import LessonsActions from '../state/lessonsReducer';

import Amplify from '@aws-amplify/core';
import config from '../aws-exports';
Amplify.configure(config);
import API, { graphqlOperation } from '@aws-amplify/api';
import Analytics from '@aws-amplify/analytics';

import { MonoText } from '../components/StyledText';
import { styles } from './styles';
import { listLessons } from '../src/graphql/queries';
import { createLesson } from '../src/graphql/mutations';
import Lesson from '../components/Lesson';

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

class HomeScreen extends React.Component {
  static navigationOptions = {
    // header: null,
    title: 'Lessons',
  };

  state = {
    lessons: [],
    title: '',
  };

  async componentDidMount() {
    this.props.getLessons();
  }

  render() {
    // console.log('test', this.props.lessons);
    let lekcje = null;
    if (this.props.lessons && this.props.lessons.length) {
      lekcje = this.props.lessons.filter(item => item.id && item.title);
      lekcje.map(lekcja => console.log(lekcja.title));
    }


    return (
      <View>
        {lekcje && lekcje.length && (
          <FlatList
            data={[{ isNew: true }, ...lekcje]}
            keyExtractor={this._keyExtractor}
            renderItem={({ item }) => (
              <Lesson
                lessonName={item.title}
                isNew={item.isNew}
                onPress={() => {
                  Alert.alert(
                    'Lesson name',
                    item.title,
                    [{ text: 'Go to lesson!', onPress: () => console.log('Ask me later pressed') }],
                    { cancelable: true }
                  );
                }}
              />
            )}
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    lessons: state.lessons.lessons,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getLessons: () => dispatch(LessonsActions.getLessonsRequest('test payload')),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);

//  // <View style={styles.container}>
//       //   <Text style={styles.header}>Lessons</Text>
//         {/* {this.state.lessons.map((lesson, index) => (

//           ))} */}
//         {/* <TextInput
//           style={styles.input}
//           onChangeText={val => this.onChangeText('title', val)}
//           placeholder="Lesson Name"
//           value={this.state.title}
//         />

//         <Button onPress={this.addLesson} title="Add Lesson!" /> */}

//         {/* <Text style={styles.header}>Lessons</Text> */}

//         {/* <Swiper
//           cards={['DO', 'MORE', 'OF', 'WHAT', 'MAKES', 'YOU', 'HAPPY']}
//           marginBottom={100}
//           marginTop={80}
//           renderCard={card => {
//             return (
//               <View style={styles.card}>
//                 <FlipCard
//                   style={styles.flipCard}
//                   friction={6}
//                   perspective={1000}
//                   flipHorizontal
//                   flipVertical={false}
//                   flip={false}
//                   clickable
//                   onFlipped={isFlipped => {}}
//                 >
//                   <View style={styles.face}>
//                     <Text style={styles.text}>{card.question}</Text>
//                     <Text style={styles.text}>A</Text>
//                   </View>

//                   <View style={styles.back}>
//                     <Text style={styles.text}>B</Text>
//                     {!this.state.completed && (
//                       <View>
//                         <Text style={styles.smallText}>
//                           If you know the answer swipe the card to the
//                           <Text style={{ color: 'blue' }}>right.</Text>
//                         </Text>
//                         <Text style={styles.smallText}>
//                           {' '}
//                           If you would like to repeat this question some more swipe to the
//                           <Text style={{ color: 'red' }}>left.</Text>
//                         </Text>
//                       </View>
//                     )}
//                   </View>
//                 </FlipCard>
//               </View>
//             );
//           }}
//           onSwiped={cardIndex => {
//             console.log(cardIndex);
//           }}
//           onSwipedAll={() => {
//             console.log('onSwipedAll');
//           }}
//           cardIndex={0}
//           backgroundColor={'white'}
//           stackSize={3}
//         /> */}
//         {/* <View style={{ height: 150, borderWidth: 3 }} /> */}
//       // </View>
//       );

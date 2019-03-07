import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View, Button } from 'react-native';
import { WebBrowser } from 'expo';
import Swiper from 'react-native-deck-swiper';
import FlipCard from 'react-native-flip-card';

import { MonoText } from '../components/StyledText';
import { styles } from './styles';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <Swiper
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
                    {/* <Text style={styles.text}>{card.question}</Text> */}
                    <Text style={styles.text}>A</Text>
                  </View>

                  <View style={styles.back}>
                    <Text style={styles.text}>B</Text>
                    {/* {!this.state.completed && (
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
                    )} */}
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
        />
        {/* <View style={{ height: 150, borderWidth: 3 }} /> */}
      </View>
    );
  }
}

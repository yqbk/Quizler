import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View, Button } from 'react-native';
import { WebBrowser } from 'expo';
import Swiper from 'react-native-deck-swiper';

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
          renderCard={card => {
            return (
              <View style={styles.card}>
                <Text style={styles.text}>{card}</Text>
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
          backgroundColor={'#4FD0E9'}
          stackSize={3}
        />
      </View>
    );
  }
}

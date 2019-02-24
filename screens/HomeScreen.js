import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';
import { styles } from './styles';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Test</Text>
      </View>
    );
  }
}

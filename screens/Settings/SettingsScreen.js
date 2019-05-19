import React from 'react'
import { ExpoConfigView } from '@expo/samples'
import { Auth } from 'aws-amplify'
import { ScrollView, View, StyleSheet } from 'react-native'
import { Button, Text } from 'native-base'

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  }
  
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <ExpoConfigView />

        <Button
          block
          onPress={() => {
            Auth.signOut()
              .then(data => console.log(data))
              .then(() => this.props.onStateChange('signedOut', null))
              .catch(err => console.log(err))
          }}
          style={{ margin: 40 }}
        >
          <Text>Logout</Text>
        </Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

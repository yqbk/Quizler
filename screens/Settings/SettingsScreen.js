import React from 'react'
import { ExpoConfigView } from '@expo/samples'
import { Auth } from 'aws-amplify'
import { ScrollView, Button, View, Text } from 'react-native'

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'app.json',
  }

  constructor(props) {
    super(props)
  }

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <ScrollView>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16,
          }}
        >
          {/* <Text>Sign out</Text> */}
          <Button
            onPress={() => {
              console.log('Sign out')
              Auth.signOut()
                .then(data => console.log(data))
                .then(() => this.props.onStateChange('signedOut', null))
                // .catch(err => this.error(err));
                .catch(err => console.log(err))
            }}
            title="Sign out"
          />
        </View>
        {/* <ExpoConfigView />; */}
      </ScrollView>
    )
  }
}

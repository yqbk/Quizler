import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { AppLoading, Asset, Font, Icon } from 'expo'
import { Platform, StatusBar, StyleSheet, View } from 'react-native'
import AppNavigator from '../navigation/AppNavigator.js'
import createStore from '../config/state.js'

import Auth from '@aws-amplify/auth'
import Analytics from '@aws-amplify/analytics'
import { withAuthenticator } from 'aws-amplify-react-native'
import awsconfig from '../aws-exports'
import { MyTheme } from './AuthConfig'

// retrieve temporary AWS credentials and sign requests
Auth.configure(awsconfig)

const signUpConfig: any = {
  hiddenDefaults: ['phone_number'],
}

const store = createStore()

class App extends React.Component {
  public state = {
    isLoadingComplete: false,
    username: '',
    phone_number: '',
    password: '',
    email: '',
    authCode: '',
    user: {},
  }

  // store user info in the state
  async componentDidMount() {
    const user = await Auth.currentAuthenticatedUser()
    this.setState({ user })
  }

  public async signUp() {
    const { username, password, email } = this.state
    await Auth.signUp({
      username,
      password,
      attributes: { email },
    })
    console.log('sign up successful!')
  }

  public async confirmSignUp() {
    const { username, authCode } = this.state
    await Auth.configSignignUp(username, authCode)
    console.log('confirm sign up successful!')
  }

  public render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      )
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <Provider store={store}>
            <AppNavigator />
          </Provider>
        </View>
      )
    }
  }

  public _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        // require('../assets/images/robot-dev.png'),
        // require('../assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        'lato': require('./assets/fonts/Lato-Regular.ttf'),
        'lato-thin': require('./assets/fonts/Lato-Hairline.ttf'),
      }),
    ])
  }

  public _handleLoadingError = (error: Error) => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error)
  }

  public _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true })

    // here?
    Analytics.record({
      name: 'Button Clicked',
      attributes: { username: this.state.user.username },
    })
  }
}

export default withAuthenticator(
  App,
  { includeGreetings: false, signUpConfig },
  [],
  null,
  MyTheme,
)

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
})

import React from 'react'
import { Platform } from 'react-native'
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation'

import TabBarIcon from '../components/TabBarIcon'
import HomeScreen from '../screens/Home/HomeScreen'
import ProgressScreen from '../screens/Progress/ProgressScreen'
import SettingsScreen from '../screens/Settings/SettingsScreen'
import LessonScreen from '../screens/Home/Lesson/LessonScreen'
import QuizScreen from '../screens/Home/Quiz/QuizScreen'

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Lesson: LessonScreen,
  Quiz: {
    screen: QuizScreen,
    navigationOptions: ({ navigation }) => ({
      mode: 'modal',
    }),
  },
})

HomeStack.navigationOptions = ({ navigation }) => ({
  tabBarLabel: 'Quiz',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-albums' : 'md-albums'}
    />
  ),
  tabBarVisible: navigation.state.index < 1,
})

// todo rename to progress stack
const ProgressStack = createStackNavigator({
  Progress: ProgressScreen,
})

ProgressStack.navigationOptions = {
  tabBarLabel: 'Progress',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-analytics' : 'md-analytics'}
    />
  ),
}

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
})

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
}

export default createBottomTabNavigator(
  {
    HomeStack,
    ProgressStack,
    SettingsStack,
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarVisible: false,
    }),
  },
)

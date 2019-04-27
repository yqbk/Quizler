import React from 'react'
import { Platform } from 'react-native'
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation'

import TabBarIcon from '../components/TabBarIcon'
import HomeScreen from '../screens/Home/HomeScreen'
import LinksScreen from '../screens/Progress/LinksScreen'
import SettingsScreen from '../screens/Settings/SettingsScreen'
import LessonScreen from '../screens/Home/Lesson/LessonScreen'
import QuizScreen from '../screens/Home/Quiz/QuizScreen'

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Lesson: LessonScreen,
  Quiz: QuizScreen,
})

HomeStack.navigationOptions = {
  tabBarLabel: 'Cards',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-albums' : 'md-albums'}
    />
  ),
}

const LinksStack = createStackNavigator({
  Links: LinksScreen,
})

LinksStack.navigationOptions = {
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

export default createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,
})

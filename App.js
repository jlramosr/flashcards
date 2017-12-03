import React from 'react'
import { View, Platform, StatusBar } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Constants } from 'expo'
import { green, yellow, white, orange, black } from './utils/colors'
import DeckList from './components/DeckList'
import DeckDetail from './components/DeckDetail'
import NewDeck from './components/NewDeck'

const AppBar = ({backgroundColor, ...props}) => {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = TabNavigator({
  Decks: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'DECKS',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'NEW DECK',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    }
  }
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: yellow,
    style: {
      height: 46,
      backgroundColor: Platform.OS === 'ios' ? orange : green
    }
  }
})

const AppNavigator = StackNavigator({
  Home: {
    screen: Tabs
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: black
      }
    }
  }
})

export default class App extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <AppBar backgroundColor={green} barStyle="light-content" />
        <AppNavigator />
      </View>
    )
  }
}
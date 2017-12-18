import React from 'react'
import { View } from 'react-native'
import { green } from './utils/colors'
import { setLocalNotification } from './utils/helpers'
import { AppBar, AppNavigator } from './components/AppNavigation'
import { getDecks } from './utils/api'

export default class App extends React.Component {
  state = {
    decks: null
  }

  getDecksInfo = () => {
    getDecks().then(decks => 
      this.setState({decks})
    )
  }

  componentDidMount = () => {
    this.getDecksInfo()
    setLocalNotification()
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <AppBar backgroundColor={green} barStyle="light-content" />
        <AppNavigator screenProps={{decks: this.state.decks, updateDecks:this.getDecksInfo}}/>
      </View>
    )
  }
}
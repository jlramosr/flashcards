import React, { Component } from 'react'
import { KeyboardAvoidingView, View, Text, TextInput, StyleSheet } from 'react-native'
import { Foundation } from '@expo/vector-icons'
import { green, orange, black, white } from '../utils/colors'
import TextButton from './TextButton'
import { saveDeckTitle } from '../utils/api'
import { NavigationActions } from 'react-navigation'
import { getDeck } from '../utils/api'

export default class DeckDetail extends Component {
  state = {
    deck: {
      title: '',
      questions: []
    }
  }

  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params
    return {title}
  }

  componentDidMount = () => {
    const { title } = this.props.navigation.state.params
    getDeck(title).then(deck =>
      this.setState({deck})
    )
  }

  render = () => {
    const { deck } = this.state

    return (
      <View style={styles.container}>
        <View style={styles.info}>
          <Text style={styles.infoTitle}>{deck.title}</Text>
          <Text style={styles.infoCards}>{deck.questions.length} cards</Text>
        </View>
        <View>
          <TextButton style={styles.buttonAddCard} onPress={() => {
            saveDeckTitle(title).then(() =>
              this.toHome()
            )
          }}>
            Add Card
          </TextButton>
          <TextButton onPress={() => {
            saveDeckTitle(title).then(() =>
              this.toHome()
            )
          }}>
            Start Quiz
          </TextButton>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  info: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoTitle: {
    fontSize: 46,
    color: green
  },
  infoCards: {
    fontSize: 26,
    color: orange
  },
  buttonAddCard: {
    backgroundColor: white,
    color: black,
    borderWidth: 1,
    borderColor: black
  }
})
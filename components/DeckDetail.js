import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { green, orange, black, white } from '../utils/colors'
import TextButton from './TextButton'
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

  getDeckInfo = () => {
    const { title } = this.props.navigation.state.params
    getDeck(title).then(deck =>
      this.setState({deck})
    )
  }

  componentDidMount = () => {
    this.getDeckInfo()
  }

  toAddCard = title => {
    const { navigation } = this.props
    navigation.navigate('NewCard', {
      title,
      updateDeck: this.getDeckInfo
    })
  }

  toQuizDetail = questions => {
    this.props.navigation.navigate('QuizDetail', {questions})
  }

  render = () => {
    const { deck } = this.state
    const { title } = this.props.navigation.state.params

    return (
      <View style={styles.container}>
        <View style={styles.info}>
          <Text style={styles.infoTitle}>{deck.title}</Text>
          <Text style={styles.infoCards}>{deck.questions.length} cards</Text>
        </View>
        <View>
          <TextButton
            style={styles.buttonAddCard}
            onPress={() => {
              this.toAddCard(title)
            }}
          >
            Add Card
          </TextButton>
          <TextButton 
            disabled={!deck.questions.length}
            style={{opacity: deck.questions.length ? 1 : 0.2}} 
            onPress={() => {
              this.toQuizDetail(deck.questions, 0)
            }}
          >
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
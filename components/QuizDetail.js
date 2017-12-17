import React, { Component } from 'react'
import { View, Text, Platform, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { green, red, orange, white, black } from '../utils/colors'
import TextButton from './TextButton'
import { getDeck } from '../utils/api'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'

export default class QuizDetail extends Component {
  state = {
    mode: 'Question',
    numQuiz: 0,
    numCorrects: 0
  }

  componentDidMount = () => {
    const { question } = this.props.navigation.state.params
  }

  render = () => {
    const { questions } = this.props.navigation.state.params
    const { mode, numQuiz, numCorrects } = this.state

    if (numQuiz === questions.length) {
      clearLocalNotification().then(
        setLocalNotification
      )
      return (
        <View style={styles.container}>
          <Text style={styles.results}>{`You have guessed ${numCorrects*100/questions.length}% of the answers`}</Text>
          <View>
            <TextButton
              style={styles.buttonBack}
              onPress={() => {
                this.props.navigation.goBack()
              }}
            >
              Back to Deck
            </TextButton>
            <TextButton
              style={styles.buttonRestart}
              onPress={() => {
                this.setState(prevState => ({
                  numQuiz: 0,
                  numCorrects: 0,
                  mode: 'Question'
                }))
              }}
            >
              Restart Quiz
            </TextButton>
          </View>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <View style={styles.left}>
          <Text style={styles.leftTitle}>{numQuiz + 1}/{questions.length}</Text>
        </View>
        <View style={styles.right}>
          {mode === 'Question' ?
            <Ionicons
              name={Platform.OS === 'ios' ? 'ios-eye' : 'md-eye'}
              size={24}
              onPress={() => this.setState({mode: 'Answer'})}
            /> :
            <Ionicons
              name={Platform.OS === 'ios' ? 'ios-eye-off' : 'md-eye-off'}
              size={24}
              onPress={() => this.setState({mode: 'Question'})}/>
          }
        </View>
        <View style={styles.info}>
          <Text style={styles.infoTitle}>{questions[numQuiz][mode.toLowerCase()]}</Text>
          <Text style={styles.infoMode}>{mode}</Text>
        </View>
        <View>
          <TextButton
            style={styles.buttonCorrect}
            onPress={() => {
              this.setState(prevState => ({
                numQuiz: prevState.numQuiz + 1,
                numCorrects: prevState.numCorrects + 1,
                mode: 'Question'
              }))
            }}
          >
            Correct
          </TextButton>
          <TextButton
            style={styles.buttonIncorrect}
            onPress={() => {
              this.setState(prevState => ({
                numQuiz: prevState.numQuiz + 1,
                mode: 'Question'
              }))
            }}
          >
            Incorrect
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
  results: {
    fontSize: 20,
    color: green,
    textAlign: 'center'
  },
  left: {
    position: 'absolute',
    left: 16,
    top: 8
  },
  right: {
    position: 'absolute',
    right: 16,
    top: 8
  },
  leftTitle: {
    fontSize: 20
  },
  info: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoTitle: {
    fontSize: 36,
    color: green,
    textAlign: 'center'
  },
  infoMode: {
    fontSize: 14,
    color: orange
  },
  buttonCorrect: {
    backgroundColor: green
  },
  buttonIncorrect: {
    backgroundColor: red
  },
  buttonRestart: {
    backgroundColor: black
  },
  buttonBack: {
    color: black,
    backgroundColor: white
  }
})
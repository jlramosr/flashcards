import React, { Component } from 'react'
import { KeyboardAvoidingView, View, Text, TextInput, StyleSheet } from 'react-native'
import { green, white } from '../utils/colors'
import TextButton from './TextButton'
import { addCardToDeck } from '../utils/api'

export default class NewCard extends Component {
  state = {
    question: '',
    answer: ''
  }

  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params
    return {title}
  }

  toDeckDetail = title => {
    const { navigation, screenProps } = this.props
    navigation.state.params.updateDeck()
    navigation.goBack()
    screenProps.updateDecks()
  }

  handleQuestionChange = question => {
    this.setState({question})
  }

  handleAnswerChange = answer => {
    this.setState({answer})
  }

  render = () => {
    const { question, answer } = this.state
    const { title } = this.props.navigation.state.params

    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            value={question}
            style={styles.input}
            onChangeText={this.handleQuestionChange}
            placeholder="Question"
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            value={answer}
            style={styles.input}
            onChangeText={this.handleAnswerChange}
            placeholder="Answer"
          />
        </View>
        <TextButton
          disabled={!(question.length && answer.length)}
          style={{opacity: question.length && answer.length ? 1 : 0.2}}
          onPress={() => {
            if (question && answer) {
              addCardToDeck(title, {question,answer}).then(() =>
                this.toDeckDetail(title)
              )
            }
          }}
        >
          Submit
        </TextButton>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  inputContainer: {
    marginBottom: 32,
    flexDirection: 'row'
  },
  input: {
    borderWidth: 1,
    borderRadius: 4,
    flex: 1,
    padding: 4
  }
})
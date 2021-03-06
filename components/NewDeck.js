import React, { Component } from 'react'
import { KeyboardAvoidingView, View, Text, TextInput, StyleSheet } from 'react-native'
import { green } from '../utils/colors'
import TextButton from './TextButton'
import { saveDeckTitle } from '../utils/api'
import { NavigationActions } from 'react-navigation'

export default class NewDeck extends Component {
  state = {
    title: ''
  }

  toDeck = title => {
    if (title) {
      const { navigation, screenProps } = this.props
      screenProps.updateDecks()
      this.setState({title: ''})
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Home'}),
        ]
      })
      navigation.dispatch(resetAction)
      navigation.navigate('DeckDetail', {title})
    }
  }

  handleTextChange = title => {
    this.setState({title})
  }

  render = () => {
    const { title } = this.state

    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Text style={styles.text}>What is the title of your new deck?</Text>
        <View style={styles.inputContainer}>
          <TextInput
            value={title}
            style={styles.input}
            onChangeText={this.handleTextChange}
            placeholder="Deck Title"
          />
        </View>
        <TextButton
          style={styles.button}
          disabled={!title}
          style={{opacity: title ? 1 : 0.2}}
          onPress={() => {
            saveDeckTitle(title).then(() =>
              this.toDeck(title)
            )
          }
        }>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: green,
    fontSize: 42,
    textAlign: 'center',
    marginBottom: 16,
    padding: 16
  },
  inputContainer: {
    flexDirection: 'row'
  },
  input: {
    borderWidth: 1,
    borderRadius: 4,
    flex: 1,
    padding: 4
  },
  button: {
    marginTop: 16
  }
})
import React, { Component } from 'react'
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native'
import { green, grey, orange } from '../utils/colors'
import { getDecks } from '../utils/api'

const Deck = ({ title, questions }) => {
  return (
    <View style={styles.deck}>
      <Text style={styles.deckTitle}>{title}</Text>
      <Text style={styles.deckCards}>{questions.length} cards</Text>
    </View>
  )
}

export default class DeckList extends Component {
  state = {
    decks: null
  }

  componentDidMount = () => {
    getDecks().then(decks => 
      this.setState({decks})
    )
  }

  toDeckDetail = title => {
    this.props.navigation.navigate('DeckDetail', {title})
  }

  renderDeck = ({item}) => {
    return (
      <TouchableOpacity onPress={() => this.toDeckDetail(item.title)}>
        <Deck {...item}/>
      </TouchableOpacity>
    )
  }

  render = () => {
    const { decks } = this.state

    if (!decks) {
      return <ActivityIndicator />
    }

    if (!Object.keys(decks).length) {
      return (
        <View style={styles.empty}>
          <Text>There is no decks yet</Text>
        </View>
      )
    }

    const decksArray = Object.keys(decks).reduce((arr,key) => [
      ...arr,decks[key]
    ],[])
    return (
      <View style={styles.container}>
        <FlatList
          data={decksArray}
          renderItem={this.renderDeck}
          keyExtractor={deck => deck.title}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'space-between'
  },
  deck: {
    padding: 46,
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: grey
  },
  deckTitle: {
    fontSize: 26,
    color: green
  },
  deckCards: {
    fontSize: 16,
    color: orange
  }
})
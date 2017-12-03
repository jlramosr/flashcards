import { AsyncStorage } from 'react-native'
import { DECKS_STORAGE_KEY } from './_decks'
import { cleanWhiteSpaces } from './helpers'

export const getDecks = () => {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(decks => {
      return decks === null
        ? {}
        : JSON.parse(decks)
    })
}

export const getDeck = title => {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(decks => {
      return decks === null
        ? {}
        : JSON.parse(decks)[cleanWhiteSpaces(title)]
    })
}

export const saveDeckTitle = title => {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [cleanWhiteSpaces(title)]: {
      title: title,
      questions: []
    }
  }))
}

export function addCardToDeck (title, card) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [title.replace(/\s/g, '')]: {
      questions: [...card]
    }
  }))
}
import { AsyncStorage } from 'react-native'
import { DECKS_STORAGE_KEY } from './_decks'
import { cleanWhiteSpaces } from './helpers'

//AsyncStorage.removeItem(DECKS_STORAGE_KEY)

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
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(decks => {
      if (decks === null) return []
      const currentQuestions = JSON.parse(decks)[cleanWhiteSpaces(title)].questions
      return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
        [cleanWhiteSpaces(title)]: {
          questions: [...currentQuestions, card]
        }
      }))
    })
}
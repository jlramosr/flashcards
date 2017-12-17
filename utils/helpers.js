import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'
import { NOTIFICATIONS_STORAGE_KEY } from './_notifications'

export const cleanWhiteSpaces = string => {
  return string.replace(/\s/g, '')
}

export const clearLocalNotification = () => {
  return AsyncStorage.removeItem(NOTIFICATIONS_STORAGE_KEY)
    .then(Notifications.cancelAllScheduledNotificationAsync)
}

const createNotification = () => {
  return {
    title: 'Complete one quiz!',
    body: 'Dont\'f forget to complete one quiz for today',
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: 'high',
      vibrate: 'true',
      sticky: false
    }
  }
}

export const setLocalNotification = () => {
  AsyncStorage.getItem(NOTIFICATIONS_STORAGE_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()
              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(23)
              tomorrow.setMinutes(30)
              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day'
                }
              )
              AsyncStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(true))
            }
          })
      }
    })
}
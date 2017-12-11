import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { white, black } from '../utils/colors'

export default function TextButton ({ children, onPress, disabled = false, style = {} }) {
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress}>
      <Text style={[styles.button, style]}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    textAlign: 'center',
    backgroundColor: black,
    color: white,
    marginTop: 6,
    marginBottom: 6,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 62,
    paddingRight: 62,
    borderRadius: 4,
    fontSize: 24
  }
})
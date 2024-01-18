import { StyleSheet, View } from 'react-native'
import React from 'react'
import Colors from '../styles/colors'

const Line = () => {
  return (
    <View style={styles.line}></View>
  )
}

export default Line

const styles = StyleSheet.create({
    line:{
        backgroundColor: Colors.textColor,
        height: 2,
        width: '100%',
        alignSelf: 'center',
        margin: 10
    },
})
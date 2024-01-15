import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Line = () => {
  return (
    <View style={styles.line}></View>
  )
}

export default Line

const styles = StyleSheet.create({
    line:{
        backgroundColor: '#64748B',
        height: 2,
        width: '100%',
        alignSelf: 'center',
        margin: 10
    },
})
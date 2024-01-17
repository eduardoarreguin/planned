import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../styles/colors'

const Header = () => {
  return (
    <SafeAreaView>
      <Text style={styles.text}>Expense planner</Text>
    </SafeAreaView>
  )
}

export default Header

const styles = StyleSheet.create({
    
    text:{
        textAlign: 'center',
        fontSize: 30,
        color: Colors.secondaryColor,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        paddingTop: 20,
        paddingHorizontal: 20
    }
})
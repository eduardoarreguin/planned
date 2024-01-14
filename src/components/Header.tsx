import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

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
        color: '#fff',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        paddingTop: 20,
        paddingHorizontal: 20
    }
})
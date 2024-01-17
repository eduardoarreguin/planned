// SplashScreen.js

import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

const SplashScreen = ({ navigation }: any) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('MainScreen');
    }, 1000); 
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.label} >Planned</Text>
      <Image
        source={require('../img/new-spent.png')} 
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label:{
    fontSize: 40,
    color: 'rgb(48, 174, 256)',
    fontWeight: 'bold',
    marginBottom: 20,
    textTransform: 'uppercase'
  },
  image: {
     width: 200,
     height: 200
  },
});

export default SplashScreen;

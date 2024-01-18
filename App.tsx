// App.js
import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './src/styles/SplashScreen';
import MainScreen from './src/components/MainScreen'; 
import { AppProvider } from './src/context/AppContext';

const Stack = createStackNavigator();

const App = () => {
    return (
        <AppState>
            <NavigationContainer>
                <Stack.Navigator 
                    initialRouteName="Splash"
                    screenOptions={{
                        headerShown: false
                    }}
                >
                    <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="MainScreen" component={MainScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </AppState>
    );
};

const AppState: React.FC<{ children: React.ReactNode }> = ({ children })  => {
    return (
      <AppProvider>
        { children }
      </AppProvider>
    )
  }

export default App;

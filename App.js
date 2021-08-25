import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {AuthProvider} from './src/context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Main from './src/screens/Main';
import {NavigationContainer} from '@react-navigation/native';
import {Stack} from './src/components/Navigation';
import OnboardingScreen from './src/screens/OnboardingScreen';

export default function App() {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then(value => {
      if (value === null) {
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  if (isFirstLaunch === null) {
    return null;
  } else if (isFirstLaunch === true) {
    return (
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="OnboardingScreen"
            // screenOptions={{headerStyle: 'none'}}
          >
            <Stack.Screen
              name="OnboardingScreen"
              component={OnboardingScreen}
            />
            <Stack.Screen name="Main" component={Main} />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    );
  } else {
    return (
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator headerMode={false}>
            <Stack.Screen name="Main" component={Main} />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    );
  }
}

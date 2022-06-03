import { Amplify } from 'aws-amplify';

import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import { expo as expoConfig } from './app.json';
import { registerRootComponent } from 'expo';
import AsyncStorage from '@react-native-async-storage/async-storage';

import config from './src/aws-exports';

import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import App from './src/Main';
import AppIntro from './src/pages/AppIntro';

Amplify.configure(config);

function AppWithNavigationContainer() {
  const [initialized, setInitialized] = React.useState(false);

  React.useEffect(() => {
    isInitialized().then((val) => setInitialized(val === 'true'));
  }, []);

  return initialized ? (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  ) : (
    <AppIntro
      next={() => {
        initialize();
        setInitialized(true);
      }}
    />
  );
}

const initialize = async () => {
  try {
    await AsyncStorage.setItem('initialized', 'true');
  } catch (e) {
    // error reading value
    console.log(e);
  }
};

const isInitialized = async () => {
  try {
    const value = await AsyncStorage.getItem('initialized');
    if (value !== null) {
      return value;
    }
  } catch (e) {
    // error reading value
    console.log(e);
  }
};

registerRootComponent(AppWithNavigationContainer);

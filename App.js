import { Amplify } from 'aws-amplify'

import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import { expo as expoConfig } from './app.json';
import { registerRootComponent } from 'expo';

import config from './src/aws-exports';

import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import App from './src/Main';

Amplify.configure(config);

function AppWithNavigationContainer() {
  return (
    <NavigationContainer>
        <App />
    </NavigationContainer>
  );
}

registerRootComponent(AppWithNavigationContainer);

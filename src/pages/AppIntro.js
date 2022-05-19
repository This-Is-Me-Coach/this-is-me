//import {Amplify, Auth, API, graphqlOperation} from 'aws-amplify'
//import config from './src/aws-exports'
//Amplify.configure(config);
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
} from 'react-native';

import { IconButton, Icons } from '../components';

const { RightArrow } = Icons;

export default class AppIntro extends React.Component {
  state = {
    step: 0,
  };

  messages = [
    'Welcome to the first day of the rest of your life. Start now....the journey with us, now....',
    'Manageable steps to be in control of your life. Utilise your time and your phenominal personal resources.',
    'Gift yourself 7 minutes a day to spend with us to achieve all you would want to.',
  ];

  screens = this.messages.map((message) => {
    return (
      <View style={[styles.screen]}>
        <Image
          style={[styles.img]}
          source={require('../../assets/image_12.png')}
        />

        <Text style={styles.title}>{message}</Text>
        {/* -> should be an icon*/}
      </View>
    );
  });

  next_screen(dir = 1) {
    this.setState((prev_state) => {
      const next = (prev_state.step + dir) % this.messages.length;
      return { step: next };
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.global_container}>
        <View style={[styles.container]}>
          {this.screens[this.state.step]}
          <Text>{this.state.step}</Text>
          <View style={styles.btn_container}>
            <Button
              style={styles.button}
              onPress={() => this.next_screen(-1)}
              title={this.state.step === 0 ? 'skip' : 'back'}
              color="black"
              accessibilityLabel="Learn more about this purple button"
            />
            <IconButton
              onPress={() => this.next_screen()}
              iconComponent={
                <RightArrow width={18} height={16} stroke="black" />
              }
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  show_border: {
    borderWidth: 2,
    borderColor: 'red',
  },
  global_container: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FAFAFA', //TODO: move this to a theme
    padding: 20,
  },
  screen: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {},
  img: {
    height: 350,
    width: 350,
  },
  title: {
    fontSize: 22,
    fontWeight: '500',
    lineHeight: 28,
  },
  rect: {
    width: 299,
    height: 306,
    backgroundColor: '#E6E6E6',
    alignSelf: 'center',
  },
  rect2: {
    width: 300,
    height: 201,
    backgroundColor: '#E6E6E6',
    marginTop: 35,
    marginLeft: 37,
  },
  rect3: {
    width: 300,
    height: 50,
    backgroundColor: '#E6E6E6',
    marginTop: 49,
    marginLeft: 37,
  },
  rect4: {
    width: 87,
    height: 12,
    backgroundColor: '#E6E6E6',
    marginTop: -68,
    marginLeft: 37,
  },
});

//const styles = StyleSheet.create({
//  container: {
//    flex: 1,
//    justifyContent: 'center',
//    alignItems: 'center',
//  },
//  item: { padding: 10 },
//  name: { fontSize: 20 },
//  description: { fontWeight: '600', marginTop: 4, color: 'rgba(0, 0, 0, .5)' },
//  title: {
//    fontSize: 28,
//  },
//});

//withAuthenticator(AppIntro, {
//  includeGreetings: true,
//});

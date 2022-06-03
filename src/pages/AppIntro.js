import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  NativeModules,
  Animated,
  Easing,
} from 'react-native';
import { Platform } from 'react-native';

const { StatusBarManager } = NativeModules;

const status_bar_height = get_status_bar_height();

//TODO: move to helpers.js??
function get_status_bar_height() {
  if (Platform.OS === 'web') {
    return 0;
  }

  if (Platform.OS === 'ios') {
    return 20;
  }

  return StatusBarManager.HEIGHT;
}

import { IconButton, Icons, ProgressIndicator } from '../components';

const { RightArrow } = Icons;

const messages = [
  'Welcome to the first day of the rest of your life. Start now....the journey with us, now....',
  'Manageable steps to be in control of your life. Utilise your time and your phenominal personal resources.',
  'Gift yourself 7 minutes a day to spend with us to achieve all you would want to.',
];

const circle_size = 500;

export default class AppIntro extends React.Component {
  state = {
    step: 0,
    splash_z_index: 10,
  };

  splash_opacity = new Animated.Value(1);

  screens = messages.map((message) => {
    return (
      <View style={[styles.screen]}>
        <Image
          style={[styles.img]}
          source={require('../assets/image_12.png')}
        />

        <Text style={styles.title}>{message}</Text>
      </View>
    );
  });

  next_screen(dir = 1) {
    this.setState((prev_state) => {
      const next = prev_state.step + dir;

      if (next < messages.length) {
        return { step: next < 0 ? messages.length - 1 : next };
      }

      this.props.next();
    });
  }

  componentDidMount() {
    Animated.timing(this.splash_opacity, {
      toValue: 0,
      duration: 3000,
      easing: Easing.back(10),
      useNativeDriver: false,
    }).start(() => {
      this.setState(() => {
        return { splash_z_index: -10 };
      });
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.global_container}>
        <Animated.View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: status_bar_height,
            left: 0,
            opacity: this.splash_opacity,
            zIndex: this.state.splash_z_index,
            backgroundColor: '#7E5FF9',
          }}
        >
          <Image
            style={[{ width: 200, height: 200 }]}
            source={require('../assets/logo.png')}
          />
          <Text style={[{ color: 'white', fontSize: 30, fontWeight: 'bold' }]}>
            This Is Me
          </Text>
          <Text style={[{ color: 'white' }]}>
            Welcome to the first day of the rest of your life.
          </Text>
          <View
            style={[
              {
                position: 'absolute',
                top: '80%',
                width: circle_size,
                height: circle_size,
                alignItems: 'center',
                justifyContent: 'center',
              },
              styles.cirle,
            ]}
          >
            <View
              style={[
                {
                  width: circle_size * 0.8,
                  height: circle_size * 0.8,
                },
                styles.cirle,
              ]}
            ></View>
          </View>
        </Animated.View>
        <View style={[styles.container]}>
          {this.screens[this.state.step]}

          <View style={{ paddingBottom: 50, margin: 10 }}>
            <ProgressIndicator
              steps={messages.length}
              step={this.state.step}
              color="#7E5FF9" //TODO: use theme
            />
          </View>

          <View style={styles.btn_container}>
            <Button
              style={[styles.button]}
              onPress={
                this.state.step === 0
                  ? () => this.props.next()
                  : () => this.next_screen(-1)
              }
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
    alignSelf: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '500',
    lineHeight: 28,
    paddingLeft: 10,
  },
  rect: {
    width: 299,
    height: 306,
    backgroundColor: '#E6E6E6',
    alignSelf: 'center',
  },
  cirle: {
    borderRadius: circle_size,
    backgroundColor: '#c7bafb',
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
});

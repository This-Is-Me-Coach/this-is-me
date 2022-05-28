import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { ActionButton } from '../../components';

import SignIn from './SignIn';
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassword';

const { width } = Dimensions.get('window');

class Auth extends React.Component {
  state = {
    showSignUp: false,
    formType: 'showSignIn',
  };
  toggleAuthType = (formType) => {
    this.setState({ formType });
  };
  render() {
    const showOptions = this.state.formType === 'showOptions';
    const showSignIn = this.state.formType === 'showSignIn';
    const showSignUp = this.state.formType === 'showSignUp';
    const showForgotPassword = this.state.formType === 'showForgotPassword';
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      >
        <View style={[styles.header]}>
          <Image
            style={styles.logo}
            resizeMode="contain"
            source={require('../../assets/this-is-me.png')}
          />
          <View>
            <Text style={styles.title}>This Is Me</Text>
            <Text style={styles.tagline}>Tagline</Text>
          </View>
        </View>

        {showOptions && (
          <View>
            <Text style={styles.subtitle}>Sign Up</Text>
            <ActionButton
              title="Sign Up with username"
              onPress={() => this.toggleAuthType('showSignUp')}
            />
            <ActionButton title="Twetter" onPress={() => {}} />
            <ActionButton title="Googel" onPress={() => {}} />
          </View>
        )}

        {showSignIn && (
          <SignIn
            toggleAuthType={this.toggleAuthType}
            updateAuth={() => this.props.updateAuth('mainNav')}
          />
        )}
        {showSignUp && <SignUp toggleAuthType={this.toggleAuthType} />}
        {showForgotPassword && (
          <ForgotPassword toggleAuthType={this.toggleAuthType} />
        )}
        <View style={{ position: 'absolute', bottom: 40 }}>
          {showSignUp || showOptions || showForgotPassword ? (
            <Text style={styles.bottomMessage}>
              Already signed up?{' '}
              <Text
                style={styles.bottomMessageHighlight}
                onPress={() => this.toggleAuthType('showSignIn')}
              >
                &nbsp;&nbsp;Sign In
              </Text>
            </Text>
          ) : (
            <Text style={styles.bottomMessage}>
              Need an account?
              <Text
                onPress={() => this.toggleAuthType('showOptions')}
                style={styles.bottomMessageHighlight}
              >
                &nbsp;&nbsp;Sign Up
              </Text>
            </Text>
          )}
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  optionsContainer: {
    alignItems: 'stretch',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
  },

  header: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 50,
  },

  logo: {
    height: width / 3,
    width: width / 3,
  },
  title: {
    fontSize: 26,
    marginTop: 15,
    fontWeight: 'bold',
    fontFamily: 'SourceSansPro-SemiBold',
  },
  tagline: {
    fontSize: 20,
    marginBottom: 20,
    fontFamily: 'SourceSansPro-Regular',
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 20,
    fontFamily: 'SourceSansPro-Regular',
  },
  bottomMessage: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 18,
  },
  bottomMessageHighlight: {
    paddingLeft: 10,
  },
});

export default Auth;

import React from 'react';
import { Dimensions, StyleSheet, TextInput } from 'react-native';

const { width } = Dimensions.get('window');

const Input = ({
  placeholder,
  type,
  secureTextEntry = false,
  onChangeText,
}) => (
  <TextInput
    style={[{}, styles.input]}
    placeholder={placeholder}
    autoCapitalize="none"
    autoCorrect={false}
    onChangeText={(v) => onChangeText(type, v)}
    secureTextEntry={secureTextEntry}
    placeholderTextColor="#DDDDDD"
    selectionColor={'#7E5FF9'}
  />
);

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 2,
    borderBottomColor: '#DDDDDD',
    height: 45,
    width: width - 20,
    marginBottom: 10,
    fontSize: 16,
    paddingHorizontal: 14,
    fontFamily: 'SourceSansPro-Regular',
  },
});

export default Input;

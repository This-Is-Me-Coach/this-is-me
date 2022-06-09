import React from 'react';
import {
  TouchableHighlight,
  Text,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const ActionButton = ({
  onPress,
  title,
  color = 'white',
  bgColor = '#7E5FF9',
}) => (
  <TouchableHighlight
    onPress={onPress}
    style={[{ backgroundColor: bgColor }, styles.buttonContainer]}
    underlayColor="#ffbf2d"
  >
    <View style={styles.button}>
      <Text style={[{ color }, styles.buttonText]}>{title}</Text>
    </View>
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 4,
    marginBottom: 10,
  },
  button: {
    height: 50,
    width: width - 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontFamily: 'SourceSansPro-SemiBold',
  },
});

export default ActionButton;

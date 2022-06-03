import { View, StyleSheet, TouchableOpacity } from 'react-native';

export default function IconButton({ onPress, iconComponent }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.button]}>{iconComponent}</View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
  },
});

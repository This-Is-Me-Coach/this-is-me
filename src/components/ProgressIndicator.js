import { useState, useEffect } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';

const circle_dims = 5;
const current_init = circle_dims * 2;
const current_final_width = circle_dims * circle_dims;

const default_margin = circle_dims;
const current_margin_init = current_final_width - current_init + default_margin;

const easing = Easing.in;
const duration = 300;

export default function ProgressIndicator({ steps, step, color }) {
  let [steps_arr, set_steps_arr] = useState([...Array(steps)]);
  let [animated_value, set_animated_value] = useState(
    new Animated.Value(current_init)
  );
  let [animated_margin, set_animated_margin] = useState(
    new Animated.Value(current_margin_init)
  );

  useEffect(() => {
    const views = steps_arr.map((_, i) => {
      const current = step == i;

      let animated_style = {
        width: current ? animated_value : circle_dims,
        marginRight: current ? animated_margin : default_margin,
      };
      return (
        <Animated.View
          key={i}
          style={[
            {
              backgroundColor: `${current ? color : 'grey'}`,
              opacity: `${current ? 1 : 0.3}`,
            },
            animated_style,
            styles.circle,
          ]}
        ></Animated.View>
      );
    });

    set_steps_arr(views);
  }, [step]);

  useEffect(() => {
    set_animated_value(new Animated.Value(current_init));
    Animated.timing(animated_value, {
      toValue: current_final_width,
      duration,
      easing,
      useNativeDriver: false,
    }).start();

    set_animated_margin(new Animated.Value(current_margin_init));
    Animated.timing(animated_margin, {
      toValue: default_margin,
      duration,
      easing,
      useNativeDriver: false,
    }).start();
  }, [step]);

  return <View style={[styles.progress_indicator]}>{steps_arr}</View>;
}

const styles = StyleSheet.create({
  progress_indicator: {
    flexDirection: 'row',
  },
  circle: {
    height: circle_dims,
    borderRadius: 50,
  },
});

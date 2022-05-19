import Svg, { Path } from 'react-native-svg';

const lineProps = {
  strokeOpacity: 1,
  strokeWidth: 2,
  strokeLineCap: 'round',
  strokeLineJoin: 'round',
};

export const RightArrow = (props) => (
  <Svg fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <Path
      d="M9.563 1.25 16.313 8l-6.75 6.75M15.375 8H1.687"
      strokeWidth={props.strokeWidth ? props.strokeWidth : 2.25}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

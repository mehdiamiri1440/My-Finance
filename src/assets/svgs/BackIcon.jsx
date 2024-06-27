import React from 'react';
import {Path, Svg} from 'react-native-svg';

function BackIcon({style, onPress}) {
  return (
    <Svg
      style={style}
      onPress={onPress}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M12 20L4 12L12 4L13.425 5.4L7.825 11H20V13H7.825L13.425 18.6L12 20Z"
        fill="white"
      />
    </Svg>
  );
}

export default BackIcon;

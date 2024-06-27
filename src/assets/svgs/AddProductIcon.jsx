import React from 'react';
import {ClipPath, Defs, G, Path, Rect, Svg} from 'react-native-svg';

function AddProductIcon({fill}) {
  return (
    <Svg
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <G clip-path="url(#clip0_736_1891)">
        <Path
          d="M15.8337 11.3334H10.8337V16.3334H9.16699V11.3334H4.16699V9.66675H9.16699V4.66675H10.8337V9.66675H15.8337V11.3334Z"
          fill={fill || "#0B1596"}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_736_1891">
          <Rect
            width="20"
            height="20"
            fill="white"
            transform="translate(0 0.5)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default AddProductIcon;

import React from 'react';
import {G, Mask, Path, Rect, Svg} from 'react-native-svg';

function ArrowForwardIcon({fill}) {
  return (
    <Svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Mask
        id="mask0_116_1105"
        style="mask-type:alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="20"
        height="20">
        <Rect width="20" height="20" fill="#D9D9D9" />
      </Mask>
      <G mask="url(#mask0_116_1105)">
        <Path
          d="M9.41634 16.0833C9.26356 15.9306 9.1837 15.7361 9.17676 15.5C9.16981 15.2639 9.24273 15.0694 9.39551 14.9167L13.4788 10.8333H4.16634C3.93023 10.8333 3.73231 10.7535 3.57259 10.5938C3.41287 10.434 3.33301 10.2361 3.33301 10C3.33301 9.76389 3.41287 9.56597 3.57259 9.40625C3.73231 9.24653 3.93023 9.16667 4.16634 9.16667H13.4788L9.39551 5.08333C9.24273 4.93056 9.16981 4.73611 9.17676 4.5C9.1837 4.26389 9.26356 4.06944 9.41634 3.91667C9.56912 3.76389 9.76356 3.6875 9.99967 3.6875C10.2358 3.6875 10.4302 3.76389 10.583 3.91667L16.083 9.41667C16.1663 9.48611 16.2254 9.57292 16.2601 9.67708C16.2948 9.78125 16.3122 9.88889 16.3122 10C16.3122 10.1111 16.2948 10.2153 16.2601 10.3125C16.2254 10.4097 16.1663 10.5 16.083 10.5833L10.583 16.0833C10.4302 16.2361 10.2358 16.3125 9.99967 16.3125C9.76356 16.3125 9.56912 16.2361 9.41634 16.0833Z"
          fill={fill || '#0B9FF2'}
        />
      </G>
    </Svg>
  );
}

export default ArrowForwardIcon;

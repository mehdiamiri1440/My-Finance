import React from 'react';
import {ClipPath, Defs, G, Mask, Path, Rect, Svg} from 'react-native-svg';

function HomeIcon({color}) {
  return (
    <Svg
      width="30"
      height="30"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Mask
        id="mask0_136_4051"
        style="mask-type:alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="20"
        height="20">
        <Rect width="20" height="20" fill="#D9D9D9" />
      </Mask>
      <G mask="url(#mask0_136_4051)">
        <Path
          d="M4.99967 15.8337H7.49967V10.8337H12.4997V15.8337H14.9997V8.33366L9.99967 4.58366L4.99967 8.33366V15.8337ZM4.99967 17.5003C4.54134 17.5003 4.14898 17.3371 3.82259 17.0107C3.4962 16.6844 3.33301 16.292 3.33301 15.8337V8.33366C3.33301 8.06977 3.39204 7.81977 3.51009 7.58366C3.62815 7.34755 3.79134 7.1531 3.99967 7.00033L8.99967 3.25033C9.15245 3.13921 9.31217 3.05588 9.47884 3.00033C9.64551 2.94477 9.81912 2.91699 9.99967 2.91699C10.1802 2.91699 10.3538 2.94477 10.5205 3.00033C10.6872 3.05588 10.8469 3.13921 10.9997 3.25033L15.9997 7.00033C16.208 7.1531 16.3712 7.34755 16.4893 7.58366C16.6073 7.81977 16.6663 8.06977 16.6663 8.33366V15.8337C16.6663 16.292 16.5031 16.6844 16.1768 17.0107C15.8504 17.3371 15.458 17.5003 14.9997 17.5003H10.833V12.5003H9.16634V17.5003H4.99967Z"
          fill={color}
        />
      </G>
    </Svg>
  );
}

export default HomeIcon;

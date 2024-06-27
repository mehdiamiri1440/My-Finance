import React from 'react';
import {G, Mask, Path, Rect, Svg} from 'react-native-svg';

function ArrowUpIcon({style}) {
  return (
    <Svg
      style={style}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Mask
        id="mask0_126_2445"
        style="mask-type:alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="20"
        height="20">
        <Rect
          y="20"
          width="20"
          height="20"
          transform="rotate(-90 0 20)"
          fill="#D9D9D9"
        />
      </Mask>
      <G mask="url(#mask0_126_2445)">
        <Path
          d="M14.417 12.7503C14.2642 12.9031 14.0698 12.9795 13.8337 12.9795C13.5975 12.9795 13.4031 12.9031 13.2503 12.7503L10.0003 9.50033L6.75033 12.7503C6.59755 12.9031 6.4031 12.9795 6.16699 12.9795C5.93088 12.9795 5.73644 12.9031 5.58366 12.7503C5.43088 12.5975 5.35449 12.4031 5.35449 12.167C5.35449 11.9309 5.43088 11.7364 5.58366 11.5837L9.41699 7.75033C9.50033 7.66699 9.5906 7.60796 9.68783 7.57324C9.78505 7.53852 9.88921 7.52116 10.0003 7.52116C10.1114 7.52116 10.2156 7.53852 10.3128 7.57324C10.41 7.60796 10.5003 7.66699 10.5837 7.75033L14.417 11.5837C14.5698 11.7364 14.6462 11.9309 14.6462 12.167C14.6462 12.4031 14.5698 12.5975 14.417 12.7503Z"
          fill="#0B1596"
        />
      </G>
    </Svg>
  );
}

export default ArrowUpIcon;

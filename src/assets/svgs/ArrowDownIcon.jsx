import React from 'react';
import {G, Mask, Path, Rect, Svg} from 'react-native-svg';

function ArrowDownIcon({style}) {
  return (
    <Svg
      style={style}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Mask
        id="mask0_126_2529"
        style="mask-type:alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="20"
        height="20">
        <Rect
          width="20"
          height="20"
          transform="matrix(0 1 1 0 0 0)"
          fill="#D9D9D9"
        />
      </Mask>
      <G mask="url(#mask0_126_2529)">
        <Path
          d="M14.417 7.24967C14.2642 7.0969 14.0698 7.02051 13.8337 7.02051C13.5975 7.02051 13.4031 7.0969 13.2503 7.24967L10.0003 10.4997L6.75033 7.24967C6.59755 7.0969 6.4031 7.02051 6.16699 7.02051C5.93088 7.02051 5.73644 7.0969 5.58366 7.24967C5.43088 7.40245 5.35449 7.5969 5.35449 7.83301C5.35449 8.06912 5.43088 8.26356 5.58366 8.41634L9.41699 12.2497C9.50033 12.333 9.5906 12.392 9.68783 12.4268C9.78505 12.4615 9.88921 12.4788 10.0003 12.4788C10.1114 12.4788 10.2156 12.4615 10.3128 12.4268C10.41 12.392 10.5003 12.333 10.5837 12.2497L14.417 8.41634C14.5698 8.26356 14.6462 8.06912 14.6462 7.83301C14.6462 7.5969 14.5698 7.40245 14.417 7.24967Z"
          fill="#9B9B9B"
        />
      </G>
    </Svg>
  );
}

export default ArrowDownIcon;

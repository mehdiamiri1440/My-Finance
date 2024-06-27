import React from 'react';
import {G, Mask, Path, Rect, Svg} from 'react-native-svg';

function EuroIcon({style}) {
  return (
    <Svg
      style={style}
      width="23"
      height="23"
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Mask
        id="mask0_21_867"
        style="mask-type:alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="23"
        height="23">
        <Rect width="23" height="23" fill="#D9D9D9" />
      </Mask>
      <G mask="url(#mask0_21_867)">
        <Path
          d="M14.375 20.125C12.4903 20.125 10.8132 19.5899 9.34375 18.5198C7.87431 17.4497 6.83611 16.0681 6.22917 14.375H2.875V12.4583H5.79792C5.76597 12.2826 5.75 12.1229 5.75 11.9792V11.0208C5.75 10.8771 5.76597 10.7174 5.79792 10.5417H2.875V8.625H6.22917C6.83611 6.93194 7.87431 5.55035 9.34375 4.48021C10.8132 3.41007 12.4903 2.875 14.375 2.875C15.4771 2.875 16.5193 3.06667 17.5016 3.45C18.4839 3.83333 19.3583 4.37639 20.125 5.07917L18.4479 6.75625C17.8889 6.29306 17.262 5.92969 16.5672 5.66615C15.8724 5.4026 15.1417 5.27083 14.375 5.27083C13.1771 5.27083 12.087 5.5783 11.1047 6.19323C10.1224 6.80816 9.37569 7.61875 8.86458 8.625H14.375V10.5417H8.24167C8.20972 10.7174 8.18576 10.8771 8.16979 11.0208C8.15382 11.1646 8.14583 11.3243 8.14583 11.5C8.14583 11.6757 8.15382 11.8354 8.16979 11.9792C8.18576 12.1229 8.20972 12.2826 8.24167 12.4583H14.375V14.375H8.86458C9.37569 15.3812 10.1224 16.1918 11.1047 16.8068C12.087 17.4217 13.1771 17.7292 14.375 17.7292C15.1417 17.7292 15.8804 17.5974 16.5911 17.3339C17.3019 17.0703 17.9208 16.7069 18.4479 16.2437L20.125 17.9208C19.3583 18.6236 18.4839 19.1667 17.5016 19.55C16.5193 19.9333 15.4771 20.125 14.375 20.125Z"
          fill="#0B1596"
        />
      </G>
    </Svg>
  );
}

export default EuroIcon;

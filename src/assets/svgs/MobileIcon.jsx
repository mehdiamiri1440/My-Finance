import React from 'react';
import {G, Mask, Path, Rect, Svg} from 'react-native-svg';

function MobileIcon() {
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Mask
        id="mask0_34_475"
        style="mask-type:alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24">
        <Rect width="24" height="24" fill="#D9D9D9" />
      </Mask>
      <G mask="url(#mask0_34_475)">
        <Path
          d="M16 13H21V10H16V13ZM16 15L14.85 16.15C14.6833 16.3167 14.5 16.3583 14.3 16.275C14.1 16.1917 14 16.0333 14 15.8V9C14 8.71667 14.0958 8.47917 14.2875 8.2875C14.4792 8.09583 14.7167 8 15 8H22C22.2833 8 22.5208 8.09583 22.7125 8.2875C22.9042 8.47917 23 8.71667 23 9V14C23 14.2833 22.9042 14.5208 22.7125 14.7125C22.5208 14.9042 22.2833 15 22 15H16ZM7 23C6.45 23 5.97917 22.8042 5.5875 22.4125C5.19583 22.0208 5 21.55 5 21V3C5 2.45 5.19583 1.97917 5.5875 1.5875C5.97917 1.19583 6.45 1 7 1H17C17.55 1 18.0208 1.19583 18.4125 1.5875C18.8042 1.97917 19 2.45 19 3V7H17V6H7V18H17V17H19V21C19 21.55 18.8042 22.0208 18.4125 22.4125C18.0208 22.8042 17.55 23 17 23H7ZM7 20V21H17V20H7ZM7 4H17V3H7V4Z"
          fill="#E67829"
        />
      </G>
    </Svg>
  );
}

export default MobileIcon;

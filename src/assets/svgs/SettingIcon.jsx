import React from 'react';
import {G, Mask, Path, Rect, Svg} from 'react-native-svg';

function SettingIcon({onPress, style}) {
  return (
    <Svg
      onPress={onPress}
      style={style}
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Mask
        id="mask0_5_12181"
        style="mask-type:alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="26"
        height="26">
        <Rect width="26" height="26" fill="#fff" />
      </Mask>
      <G mask="url(#mask0_5_12181)">
        <Path
          d="M12.9997 21.6663C12.4038 21.6663 11.8938 21.4542 11.4695 21.0299C11.0452 20.6056 10.833 20.0955 10.833 19.4997C10.833 18.9038 11.0452 18.3938 11.4695 17.9695C11.8938 17.5452 12.4038 17.333 12.9997 17.333C13.5955 17.333 14.1056 17.5452 14.5299 17.9695C14.9542 18.3938 15.1663 18.9038 15.1663 19.4997C15.1663 20.0955 14.9542 20.6056 14.5299 21.0299C14.1056 21.4542 13.5955 21.6663 12.9997 21.6663ZM12.9997 15.1663C12.4038 15.1663 11.8938 14.9542 11.4695 14.5299C11.0452 14.1056 10.833 13.5955 10.833 12.9997C10.833 12.4038 11.0452 11.8938 11.4695 11.4695C11.8938 11.0452 12.4038 10.833 12.9997 10.833C13.5955 10.833 14.1056 11.0452 14.5299 11.4695C14.9542 11.8938 15.1663 12.4038 15.1663 12.9997C15.1663 13.5955 14.9542 14.1056 14.5299 14.5299C14.1056 14.9542 13.5955 15.1663 12.9997 15.1663ZM12.9997 8.66634C12.4038 8.66634 11.8938 8.45419 11.4695 8.02988C11.0452 7.60558 10.833 7.09551 10.833 6.49967C10.833 5.90384 11.0452 5.39377 11.4695 4.96947C11.8938 4.54516 12.4038 4.33301 12.9997 4.33301C13.5955 4.33301 14.1056 4.54516 14.5299 4.96947C14.9542 5.39377 15.1663 5.90384 15.1663 6.49967C15.1663 7.09551 14.9542 7.60558 14.5299 8.02988C14.1056 8.45419 13.5955 8.66634 12.9997 8.66634Z"
          fill="#fff"
        />
      </G>
    </Svg>
  );
}

export default SettingIcon;

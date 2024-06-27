import React from 'react';
import Svg,{G, Mask, Path, Rect} from 'react-native-svg';

 export default ({onPress=_=>{},style={}}) =>{
  return (
    <Svg
      onPress={onPress}
      style={{...style}}
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Mask
        id="mask0_172_4781"
        style="mask-type:alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="26"
        height="26">
        <Rect width="26" height="26" fill="#D9D9D9" />
      </Mask>
      <G mask="url(#mask0_172_4781)">
        <Path
          d="M11.9162 21.6663C11.6092 21.6663 11.3519 21.5625 11.1443 21.3549C10.9367 21.1472 10.8329 20.89 10.8329 20.583V14.083L4.54952 6.06634C4.27868 5.70523 4.23806 5.32606 4.42764 4.92884C4.61723 4.53162 4.94674 4.33301 5.41618 4.33301H20.5829C21.0523 4.33301 21.3818 4.53162 21.5714 4.92884C21.761 5.32606 21.7204 5.70523 21.4495 6.06634L15.1662 14.083V20.583C15.1662 20.89 15.0624 21.1472 14.8547 21.3549C14.6471 21.5625 14.3898 21.6663 14.0829 21.6663H11.9162ZM12.9995 13.3247L18.362 6.49967H7.63702L12.9995 13.3247Z"
          fill="#0B1596"
        />
      </G>
    </Svg>
  );
}

import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const PriceSlider = ({className, range, min, max, value, onChange }) => {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px' }}>
        <div style={{ padding: '10px'}}>{min}</div>
        <Slider range min={min} max={max} value={value} onChange={onChange} style={{ margin: 'auto'}}/>
        <div style={{ padding: '10px'}}>{max}</div>
      </div>
    </div>
  );
};

export default PriceSlider;
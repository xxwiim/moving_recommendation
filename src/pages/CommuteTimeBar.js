import React, {useState} from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

function CommuteTimeBar() {
    const [value, setValue] = useState(0);

    const sliderProps = {
        min: 0,
        max: 120,
        step: 20,
        marks: {0: '0',20: '20', 40: '40', 60: '60', 80: '80', 100: '100', 120: '120'}
    }

    return (
        <div className="CommuteTimeBar" style={{display: 'absolute'}}>
            <Slider
            value={value}
            onChange={val =>setValue(val)} {...sliderProps}
            style={{width: '300px', margin: "2.5%"}}
            handleStyle={{backgroundColor: '#CCE9CC', border: '1', borderColor: '#62a562'}}
            trackStyle={{backgroundColor: "#cce9cc"}}
            />
        </div>
    );
};

export default CommuteTimeBar;
import React, {useState} from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import axios from 'axios';

function CommuteTimeBar() {
    const [value, setValue] = useState('');

    const sliderProps = {
        min: 0,
        max: 120,
        step: 20,
        marks: {0: '0',20: '20', 40: '40', 60: '60', 80: '80', 100: '100', 120: '120'}
    }

    axios.post('http://localhost:4000',
        {
            commutetime: {value}
        }
    )
        .then((response) => { console.log(response.data);})
        .catch((response) => { console.log('error!') });

    return (
        <div className="CommuteTimeBar" style={{display: 'absolute'}}>
            <Slider
            value={value}
            onChange={val =>setValue(val)} {...sliderProps}
            style={{width: '300px', margin: "2.5%"}}
            handleStyle={{backgroundColor: '#CCE9CC', border: '1', borderColor: '#62a562'}}
            trackStyle={{backgroundColor: "#cce9cc"}}
            />
            {(console.log(value))}
        </div>
    );
};

export default CommuteTimeBar;
import React, {useState} from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import axios from 'axios';

function BudgetBar() {
    const [value, setValue] = useState(0);

    const sliderProps = {
        min: 0,
        max: 1000000000,
        step: 100000000,
        marks: {0: '0',100000000: '1', 200000000: '2', 300000000: '3', 400000000: '4', 500000000: '5', 600000000: '6', 700000000: '7', 800000000: '8', 900000000: '9', 1000000000: '10'}
    }

    axios.post('http://localhost:4000',
        {
            price: {value}
        }
    )
        .then((response) => { console.log(response.data);})
        .catch((response) => { console.log('error!') });

    return (
        <div className="BudgetBar" style={{display: 'absolute'}}>
            <Slider
            value={value}
            onChange={val =>setValue(val)} {...sliderProps}
            style={{width: '400px', margin: "2.5%"}}
            handleStyle={{backgroundColor: '#CCE9CC', border: '1', borderColor: '#62a562'}}
            trackStyle={{backgroundColor: "#cce9cc"}}
            />
            {(console.log(value))}
        </div>
    );
};

export default BudgetBar;


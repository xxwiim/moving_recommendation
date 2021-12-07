import React, {useState} from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import axios from 'axios';

function BudgetBar() {
    const [value, setValue] = useState(0);

    const sliderProps = {
        min: 0,
        max: 10000000000,
        step: 1000000000,
        marks: {0: '0',1000000000: '1', 2000000000: '2', 3000000000: '3', 4000000000: '4', 5000000000: '5', 6000000000: '6', 7000000000: '7', 8000000000: '8', 9000000000: '9', 10000000000: '10'}
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


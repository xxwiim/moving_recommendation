import React, {useState, useEffect} from "react";
import {MdDirectionsRun, MdDirectionsBus, MdDirectionsSubway, MdDirectionsCar} from 'react-icons/md';
import './CommuteWay.scss';
import axios from 'axios';

const CommuteWay = () => {
    const [checked, setChecked] = useState('');
    const handleClick = (radioBtnName) => {
        setChecked(radioBtnName)
    }

    axios.post('http://localhost:4000',
        {
            commuteway: {checked}
        }
    )
        .then((response) => { console.log(response.data);})
        .catch((response) => { console.log('error!') });

    return (
        <div className="CommuteWay">
            <div id="run" style={{display: 'inline-block', float: 'left', marginLeft: '4%', textAlign: 'center', marginTop: '1%'}}>
                <MdDirectionsRun size="20" color="#009000"/><br />도보<br />
                <input 
                type="radio"
                onClick={() => handleClick('radiorun')}
                checked={checked === 'radiorun'}
                /> 
            </div>
            <div id="bus" style={{display: 'inline-block', float: 'left', marginLeft: '3%', textAlign: 'center', marginTop: '1%'}}>
                <MdDirectionsBus size="20" color="#009000"/><br />버스<br />
                <input 
                type="radio"
                onClick={() => handleClick('radiobus')}
                checked={checked === 'radiobus'}
                /> 
            </div>
            <div id="subway" style={{display: 'inline-block', float: 'left', marginLeft: '3%', textAlign: 'center', marginTop: '1%'}}>
                <MdDirectionsSubway size="20" color="#009000"/><br />지하철<br />
                <input 
                type="radio"
                onClick={() => handleClick('radiosubway')}
                checked={checked === 'radiosubway'}
                /> 
            </div>
            <div id="car" style={{display: 'inline-block', float: 'left', marginLeft: '3%', textAlign: 'center', marginTop: '1%'}}>
                <MdDirectionsCar size="20" color="#009000"/><br />자차<br />
                <input 
                type="radio"
                onClick={() => handleClick('radiocar')}
                checked={checked === 'radiocar'}
                /><br/>
                {console.log(checked)}
            </div>
        </div>
    )
}

export default CommuteWay;


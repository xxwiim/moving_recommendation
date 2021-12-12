import React, {useEffect, useState} from'react';
import './Medical.scss';
import axios from 'axios';

const Medical = () => {
    const [checkedInputs, setCheckedInputs] = useState([]);

    const changeHandler = (checked, id) => {
        if (checked) {
            setCheckedInputs([...checkedInputs, id]);
        } else {
            setCheckedInputs(checkedInputs.filter((el) => el !== id));
        }
    };

    axios.post('http://localhost:4000',
        {
            medichecks: {checkedInputs}
        }
    )
        .then((response) => { console.log(response.data);})
        .catch((response) => { console.log('error!') });

    return (
        <div className="LifeStyleDetails">
            <input
            id={'hopital'}
            type='checkbox'
            onChange={(e) => {
                changeHandler(e.currentTarget.checked, 'hospital')
            }}
            checked={checkedInputs.includes('hospital') ? true : false}
            />병원<br/><br/>
            <input
            id={'drug'}
            type='checkbox'
            onChange={(e) => {
                changeHandler(e.currentTarget.checked, 'drug')
            }}
            checked={checkedInputs.includes('drug') ? true : false}
            />약국<br/><br/>
            <input
            id={'publichealth'}
            type='checkbox'
            onChange={(e) => {
                changeHandler(e.currentTarget.checked, 'publichealth')
            }}
            checked={checkedInputs.includes('publichealth') ? true : false}
            />보건소
            {console.log(checkedInputs)}
        </div>
    );   
};

export default Medical;
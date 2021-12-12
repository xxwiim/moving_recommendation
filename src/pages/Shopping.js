import React, {useEffect, useState} from'react';
import './Shopping.scss';
import axios from 'axios';

const Shopping = () => {
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
            shopchecks: {checkedInputs}
        }
    )
        .then((response) => { console.log(response.data);})
        .catch((response) => { console.log('error!') });

    return (
        <div className="LifeStyleDetails">
            <input
            id={'department'}
            type='checkbox'
            onChange={(e) => {
                changeHandler(e.currentTarget.checked, 'department')
            }}
            checked={checkedInputs.includes('department') ? true : false}
            />백화점<br/><br/>
            <input
            id={'mall'}
            type='checkbox'
            onChange={(e) => {
                changeHandler(e.currentTarget.checked, 'mall')
            }}
            checked={checkedInputs.includes('mall') ? true : false}
            />대형마트<br/><br/>
            <input
            id={'complexshopping'}
            type='checkbox'
            onChange={(e) => {
                changeHandler(e.currentTarget.checked, 'complexshopping')
            }}
            checked={checkedInputs.includes('complexshopping') ? true : false}
            />복합쇼핑센터<br/><br/>
            <input
            id={'market'}
            type='checkbox'
            onChange={(e) => {
                changeHandler(e.currentTarget.checked, 'market')
            }}
            checked={checkedInputs.includes('market') ? true : false}
            />시장
            {console.log(checkedInputs)}
        </div>
    );   
};

export default Shopping;
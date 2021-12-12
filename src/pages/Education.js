import React, {useEffect, useState} from'react';
import './Education.scss';
import axios from 'axios';

const Education = () => {
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
            educhecks: {checkedInputs}
        }
    )
        .then((response) => { console.log(response.data);})
        .catch((response) => { console.log('error!') });

    return (
        <div className="LifeStyleDetails">
            <input
            id={'kinder'}
            type='checkbox'
            onChange={(e) => {
                changeHandler(e.currentTarget.checked, 'kinder')
            }}
            checked={checkedInputs.includes('kinder') ? true : false}
            />유치원<br/><br/>
            <input
            id={'elemen'}
            type='checkbox'
            onChange={(e) => {
                changeHandler(e.currentTarget.checked, 'elemen')
            }}
            checked={checkedInputs.includes('elemen') ? true : false}
            />초등학교<br/><br/>
            <input
            id={'middle'}
            type='checkbox'
            onChange={(e) => {
                changeHandler(e.currentTarget.checked, 'middle')
            }}
            checked={checkedInputs.includes('middle') ? true : false}
            />중학교<br/><br/>
            <input
            id={'high'}
            type='checkbox'
            onChange={(e) => {
                changeHandler(e.currentTarget.checked, 'high')
            }}
            checked={checkedInputs.includes('high') ? true : false}
            />고등학교<br/><br/>
            <input
            id={'academy'}
            type='checkbox'
            onChange={(e) => {
                changeHandler(e.currentTarget.checked, 'academy')
            }}
            checked={checkedInputs.includes('academy') ? true : false}
            />학원
            {console.log(checkedInputs)}
        </div>
    );   
};

export default Education;
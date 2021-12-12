import React, {useEffect, useState} from'react';
import './Welfare.scss';
import axios from 'axios';

const Welfare = () => {
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
            welfarechecks: {checkedInputs}
        }
    )
        .then((response) => { console.log(response.data);})
        .catch((response) => { console.log('error!') });

    return (
        <div className="LifeStyleDetails">
            <input
            id={'childrenhouse'}
            type='checkbox'
            onChange={(e) => {
                changeHandler(e.currentTarget.checked, 'childrenhouse')
            }}
            checked={checkedInputs.includes('childrenhouse') ? true : false}
            />어린이집<br/><br/>
            <input
            id={'elderhouse'}
            type='checkbox'
            onChange={(e) => {
                changeHandler(e.currentTarget.checked, 'elderhouse')
            }}
            checked={checkedInputs.includes('elderhouse') ? true : false}
            />경로당<br/><br/>
            <input
            id={'socialhouse'}
            type='checkbox'
            onChange={(e) => {
                changeHandler(e.currentTarget.checked, 'socialhouse')
            }}
            checked={checkedInputs.includes('socialhouse') ? true : false}
            />사회복지관
            {console.log(checkedInputs)}
        </div>
    );   
};

export default Welfare;
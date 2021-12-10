import React, {useEffect, useState} from'react';
import './Health.scss';

const Health = () => {
    const [checkedInputs, setCheckedInputs] = useState([]);

    const changeHandler = (checked, id) => {
        if (checked) {
            setCheckedInputs([...checkedInputs, id]);
        } else {
            setCheckedInputs(checkedInputs.filter((el) => el !== id));
        }
    };

    return (
        <div className="LifeStyleDetails">
            <input
            id={'gym'}
            type='checkbox'
            onChange={(e) => {
                changeHandler(e.currentTarget.checked, 'gym')
            }}
            checked={checkedInputs.includes('gym') ? true : false}
            />헬스장<br/><br/>
            <input
            id={'swimming'}
            type='checkbox'
            onChange={(e) => {
                changeHandler(e.currentTarget.checked, 'swimming')
            }}
            checked={checkedInputs.includes('swimming') ? true : false}
            />수영장<br/><br/>
            <input
            id={'publicgym'}
            type='checkbox'
            onChange={(e) => {
                changeHandler(e.currentTarget.checked, 'publicgym')
            }}
            checked={checkedInputs.includes('publicgym') ? true : false}
            />체육관
            {console.log(checkedInputs)}
        </div>
    );   
};

export default Health;
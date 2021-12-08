import React, {useEffect, useState} from'react';
import './Facility.scss';

const Facility = () => {
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
            id={'movie'}
            type='checkbox'
            onChange={(e) => {
                changeHandler(e.currentTarget.checked, 'movie')
            }}
            checked={checkedInputs.includes('movie') ? true : false}
            />영화관<br/><br/>
            <input
            id={'cafe'}
            type='checkbox'
            onChange={(e) => {
                changeHandler(e.currentTarget.checked, 'cafe')
            }}
            checked={checkedInputs.includes('cafe') ? true : false}
            />카페<br/><br/>
            <input
            id={'park'}
            type='checkbox'
            onChange={(e) => {
                changeHandler(e.currentTarget.checked, 'park')
            }}
            checked={checkedInputs.includes('park') ? true : false}
            />공원<br/><br/>
            <input
            id={'playground'}
            type='checkbox'
            onChange={(e) => {
                changeHandler(e.currentTarget.checked, 'playground')
            }}
            checked={checkedInputs.includes('playground') ? true : false}
            />놀이터<br/><br/>
            <input
            id={'library'}
            type='checkbox'
            onChange={(e) => {
                changeHandler(e.currentTarget.checked, 'library')
            }}
            checked={checkedInputs.includes('library') ? true : false}
            />도서관
            {console.log(checkedInputs)}
        </div>
    );   
};

export default Facility;
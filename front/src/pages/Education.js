import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { eduChecked } from '../redux/checked/actions'; //action
import './Education.scss';
import useSessionStorage from '../useSessionStorage';

const Education = ({ eduChecked }) => {
  //const [checkedInputs, setCheckedInputs] = useState([]);
  const [checkedInputs, setCheckedInputs] = useSessionStorage(
    'educheckedInputs',
    [],
  );
  useEffect(() => {
    console.log('제발찍혀라', checkedInputs);
    eduChecked(checkedInputs);
  }, [checkedInputs, setCheckedInputs]);

  const changeHandler = (checked, id) => {
    if (checked) {
      setCheckedInputs([...checkedInputs, id]);
    } else {
      setCheckedInputs(checkedInputs.filter((el) => el !== id));
    }
  };

  return (
    <div className="LifeStyleDetails" style={{ fontSize: '10px' }}>
      <input
        id={'초등학교'}
        type="checkbox"
        onChange={(e) => {
          changeHandler(e.currentTarget.checked, '초등학교');
        }}
        checked={checkedInputs.includes('초등학교') ? true : false}
      />
      초등학교
      <br />
      <br />
      <input
        id={'중학교'}
        type="checkbox"
        onChange={(e) => {
          changeHandler(e.currentTarget.checked, '중학교');
        }}
        checked={checkedInputs.includes('중학교') ? true : false}
      />
      중학교
      <br />
      <br />
      <input
        id={'고등학교'}
        type="checkbox"
        onChange={(e) => {
          changeHandler(e.currentTarget.checked, '고등학교');
        }}
        checked={checkedInputs.includes('고등학교') ? true : false}
      />
      고등학교
      <br />
      <br />
      <input
        id={'학원'}
        type="checkbox"
        onChange={(e) => {
          changeHandler(e.currentTarget.checked, '학원');
        }}
        checked={checkedInputs.includes('학원') ? true : false}
      />
      학원
      {console.log(checkedInputs)}
    </div>
  );
};
const mapStateToProps = (state) => {
  console.log(state, 'state');
  return {
    checked: state.checked.checked,
  };
};

const mapDispatchToProps = {
  eduChecked: (checkedInputs) => eduChecked(checkedInputs),
};
export default connect(mapStateToProps, mapDispatchToProps)(Education);

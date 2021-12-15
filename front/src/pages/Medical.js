import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { hosChecked } from '../redux/checked/actions'; //action
import './Medical.scss';

const Medical = ({ hosChecked }) => {
  const [checkedInputs, setCheckedInputs] = useState([]);

  useEffect(() => {
    console.log('health: ', checkedInputs);
    hosChecked(checkedInputs);
  }, [checkedInputs, setCheckedInputs]);

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
        id={'병원'}
        type="checkbox"
        onChange={(e) => {
          changeHandler(e.currentTarget.checked, '병원');
        }}
        checked={checkedInputs.includes('병원') ? true : false}
      />
      병원
      <br />
      <br />
      <input
        id={'약국'}
        type="checkbox"
        onChange={(e) => {
          changeHandler(e.currentTarget.checked, '약국');
        }}
        checked={checkedInputs.includes('약국') ? true : false}
      />
      약국
      <br />
      <br />
      <input
        id={'보건소'}
        type="checkbox"
        onChange={(e) => {
          changeHandler(e.currentTarget.checked, '보건소');
        }}
        checked={checkedInputs.includes('보건소') ? true : false}
      />
      보건소
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
  hosChecked: (checkedInputs) => hosChecked(checkedInputs),
};
export default connect(mapStateToProps, mapDispatchToProps)(Medical);

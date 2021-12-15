import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { welChecked } from '../redux/checked/actions'; //action
import './Welfare.scss';

const Welfare = ({ welChecked }) => {
  const [checkedInputs, setCheckedInputs] = useState([]);
  useEffect(() => {
    console.log('health: ', checkedInputs);
    welChecked(checkedInputs);
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
        id={'어린이집'}
        type="checkbox"
        onChange={(e) => {
          changeHandler(e.currentTarget.checked, '어린이집');
        }}
        checked={checkedInputs.includes('어린이집') ? true : false}
      />
      어린이집
      <br />
      <br />
      <input
        id={'경로당'}
        type="checkbox"
        onChange={(e) => {
          changeHandler(e.currentTarget.checked, '경로당');
        }}
        checked={checkedInputs.includes('경로당') ? true : false}
      />
      경로당
      <br />
      <br />
      <input
        id={'사회복지관'}
        type="checkbox"
        onChange={(e) => {
          changeHandler(e.currentTarget.checked, '사회복지관');
        }}
        checked={checkedInputs.includes('사회복지관') ? true : false}
      />
      사회복지관
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
  welChecked: (checkedInputs) => welChecked(checkedInputs),
};
export default connect(mapStateToProps, mapDispatchToProps)(Welfare);

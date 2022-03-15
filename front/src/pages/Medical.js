import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { hosChecked } from '../redux/checked/actions'; //action
import './Medical.scss';
import useSessionStorage from '../useSessionStorage';
const Medical = ({ hosChecked }) => {
  //const [checkedInputs, setCheckedInputs] = useState([]);
  const [checkedInputs, setCheckedInputs] = useSessionStorage(
    'medicheckedInputs',
    [],
  );
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
    <div className="LifeStyleDetails" style={{ fontSize: '10px' }}>
      <input
        id={'병의원 및 약국'}
        type="checkbox"
        onChange={(e) => {
          changeHandler(e.currentTarget.checked, '병의원 및 약국');
        }}
        checked={checkedInputs.includes('병의원 및 약국') ? true : false}
      />
      병의원 및 약국
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
      <br />
      <br />
      <input
        id={'응급의료기관시설'}
        type="checkbox"
        onChange={(e) => {
          changeHandler(e.currentTarget.checked, '응급의료기관시설');
        }}
        checked={checkedInputs.includes('응급의료기관시설') ? true : false}
      />
      응급의료기관시설
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

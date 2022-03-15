import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { facChecked } from '../redux/checked/actions'; //action
import './Facility.scss';
import useSessionStorage from '../useSessionStorage';
const Facility = ({ facChecked }) => {
  //const [checkedInputs, setCheckedInputs] = useState([]);
  const [checkedInputs, setCheckedInputs] = useSessionStorage(
    'faccheckedInputs',
    [],
  );

  useEffect(() => {
    console.log('fac: ', checkedInputs);
    facChecked(checkedInputs);
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
        id={'영화관'}
        type="checkbox"
        onChange={(e) => {
          changeHandler(e.currentTarget.checked, '영화관');
        }}
        checked={checkedInputs.includes('영화관') ? true : false}
      />
      영화관
      <br />
      <br />
      <input
        id={'카페'}
        type="checkbox"
        onChange={(e) => {
          changeHandler(e.currentTarget.checked, '카페');
        }}
        checked={checkedInputs.includes('카페') ? true : false}
      />
      카페
      <br />
      <br />
      <input
        id={'도서관'}
        type="checkbox"
        onChange={(e) => {
          changeHandler(e.currentTarget.checked, '도서관');
        }}
        checked={checkedInputs.includes('도서관') ? true : false}
      />
      도서관
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
  facChecked: (checkedInputs) => facChecked(checkedInputs),
};
export default connect(mapStateToProps, mapDispatchToProps)(Facility);

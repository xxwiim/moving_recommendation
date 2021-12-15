import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { facChecked } from '../redux/checked/actions'; //action
import './Facility.scss';

const Facility = ({ facChecked }) => {
  const [checkedInputs, setCheckedInputs] = useState([]);

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
    <div className="LifeStyleDetails">
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
        id={'공원'}
        type="checkbox"
        onChange={(e) => {
          changeHandler(e.currentTarget.checked, '공원');
        }}
        checked={checkedInputs.includes('공원') ? true : false}
      />
      공원
      <br />
      <br />
      <input
        id={'놀이터'}
        type="checkbox"
        onChange={(e) => {
          changeHandler(e.currentTarget.checked, '놀이터');
        }}
        checked={checkedInputs.includes('놀이터') ? true : false}
      />
      놀이터
      <br />
      <br />
      <input
        id={'도서관'}
        type="checkbox"
        onChange={(e) => {
          changeHandler(e.currentTarget.checked, '도서관');
        }}
        checked={checkedInputs.includes('l도서관') ? true : false}
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

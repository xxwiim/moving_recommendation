import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { natureChecked } from '../redux/checked/actions'; //action
import useSessionStorage from '../useSessionStorage';
const Nature = ({ natureChecked }) => {
  //const [checkedInputs, setCheckedInputs] = useState([]);
  const [checkedInputs, setCheckedInputs] = useSessionStorage(
    'naturecheckedInputs',
    [],
  );
  useEffect(() => {
    console.log('nature: ', checkedInputs);
    natureChecked(checkedInputs);
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
        id={'등산로'}
        type="checkbox"
        onChange={(e) => {
          changeHandler(e.currentTarget.checked, '등산로');
        }}
        checked={checkedInputs.includes('등산로') ? true : false}
      />
      등산로
      <br />
      <br />
      <input
        id={'산책로'}
        type="checkbox"
        onChange={(e) => {
          changeHandler(e.currentTarget.checked, '산책로');
        }}
        checked={checkedInputs.includes('산책로') ? true : false}
      />
      산책로
      <br />
      <br />
      <input
        id={'미세먼지'}
        type="checkbox"
        onChange={(e) => {
          changeHandler(e.currentTarget.checked, '미세먼지');
        }}
        checked={checkedInputs.includes('미세먼지') ? true : false}
      />
      미세먼지
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
  natureChecked: (checkedInputs) => natureChecked(checkedInputs),
};
export default connect(mapStateToProps, mapDispatchToProps)(Nature);

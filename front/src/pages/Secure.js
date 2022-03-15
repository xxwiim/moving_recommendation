import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { secureChecked } from '../redux/checked/actions'; //action
import useSessionStorage from '../useSessionStorage';
const Secure = ({ secureChecked }) => {
  //const [checkedInputs, setCheckedInputs] = useState([]);
  const [checkedInputs, setCheckedInputs] = useSessionStorage(
    'securecheckedInputs',
    [],
  );
  useEffect(() => {
    console.log('secure: ', checkedInputs);
    secureChecked(checkedInputs);
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
        id={'범죄안전등급'}
        type="checkbox"
        onChange={(e) => {
          changeHandler(e.currentTarget.checked, '범죄안전등급');
        }}
        checked={checkedInputs.includes('범죄안전등급') ? true : false}
      />
      범죄안전등급
      <br />
      <br />
      <input
        id={'경찰관서'}
        type="checkbox"
        onChange={(e) => {
          changeHandler(e.currentTarget.checked, '경찰관서');
        }}
        checked={checkedInputs.includes('경찰관서') ? true : false}
      />
      경찰관서
      <br />
      <br />
      <input
        id={'여성안심지킴이집'}
        type="checkbox"
        onChange={(e) => {
          changeHandler(e.currentTarget.checked, '여성안심지킴이집');
        }}
        checked={checkedInputs.includes('여성안심지킴이집') ? true : false}
      />
      여성안심지킴이집
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
  secureChecked: (checkedInputs) => secureChecked(checkedInputs),
};
export default connect(mapStateToProps, mapDispatchToProps)(Secure);

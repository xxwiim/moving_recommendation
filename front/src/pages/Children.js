import React, { useEffect, useState } from 'react';
import './Children.scss';
import { connect } from 'react-redux';
import { childrenChecked } from '../redux/checked/actions'; //action
import useSessionStorage from '../useSessionStorage';
const Children = ({ childrenChecked }) => {
  //const [checkedInputs, setCheckedInputs] = useState([]);
  const [checkedInputs, setCheckedInputs] = useSessionStorage(
    'childcheckedInputs',
    [],
  );

  useEffect(() => {
    console.log('child: ', checkedInputs);
    childrenChecked(checkedInputs);
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
        id={'유치원 및 어린이집'}
        type="checkbox"
        onChange={(e) => {
          changeHandler(e.currentTarget.checked, '유치원 및 어린이집');
        }}
        checked={checkedInputs.includes('유치원 및 어린이집') ? true : false}
      />
      유치원 및 어린이집
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
  childrenChecked: (checkedInputs) => childrenChecked(checkedInputs),
};
export default connect(mapStateToProps, mapDispatchToProps)(Children);

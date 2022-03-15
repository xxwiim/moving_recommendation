import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { shopChecked } from '../redux/checked/actions'; //action
import './Shopping.scss';
import useSessionStorage from '../useSessionStorage';
const Shopping = ({ shopChecked }) => {
  //const [checkedInputs, setCheckedInputs] = useState([]);
  const [checkedInputs, setCheckedInputs] = useSessionStorage(
    'shopcheckedInputs',
    [],
  );
  useEffect(() => {
    console.log('health: ', checkedInputs);
    shopChecked(checkedInputs);
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
        id={'백화점'}
        type="checkbox"
        onChange={(e) => {
          changeHandler(e.currentTarget.checked, '백화점');
        }}
        checked={checkedInputs.includes('백화점') ? true : false}
      />
      백화점
      <br />
      <br />
      <input
        id={'대형마트'}
        type="checkbox"
        onChange={(e) => {
          changeHandler(e.currentTarget.checked, '대형마트');
        }}
        checked={checkedInputs.includes('대형마트') ? true : false}
      />
      대형마트
      <br />
      <br />
      <input
        id={'복합쇼핑센터'}
        type="checkbox"
        onChange={(e) => {
          changeHandler(e.currentTarget.checked, '복합쇼핑센터');
        }}
        checked={checkedInputs.includes('복합쇼핑센터') ? true : false}
      />
      복합쇼핑센터
      <br />
      <br />
      <input
        id={'시장'}
        type="checkbox"
        onChange={(e) => {
          changeHandler(e.currentTarget.checked, '시장');
        }}
        checked={checkedInputs.includes('시장') ? true : false}
      />
      시장
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
  shopChecked: (checkedInputs) => shopChecked(checkedInputs),
};
export default connect(mapStateToProps, mapDispatchToProps)(Shopping);

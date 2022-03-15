import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { healChecked } from '../redux/checked/actions';
import './Health.scss';
import useSessionStorage from '../useSessionStorage';
const Health = ({ healChecked }) => {
  //const [checkedInputs, setCheckedInputs] = useState([]);
  const [checkedInputs, setCheckedInputs] = useSessionStorage(
    'healcheckedInputs',
    [],
  );
  useEffect(() => {
    console.log('health: ', checkedInputs);
    healChecked(checkedInputs);
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
        id={'헬스장'}
        type="checkbox"
        onChange={(e) => {
          changeHandler(e.currentTarget.checked, '헬스장');
        }}
        checked={checkedInputs.includes('헬스장') ? true : false}
      />
      헬스장
      <br />
      <br />
      <input
        id={'수영장'}
        type="checkbox"
        onChange={(e) => {
          changeHandler(e.currentTarget.checked, '수영장');
        }}
        checked={checkedInputs.includes('수영장') ? true : false}
      />
      수영장
      <br />
      <br />
      <input
        id={'체육관'}
        type="checkbox"
        onChange={(e) => {
          changeHandler(e.currentTarget.checked, '체육관');
        }}
        checked={checkedInputs.includes('체육관') ? true : false}
      />
      체육관
      {console.log(checkedInputs)}
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
      {console.log(checkedInputs)}
    </div>
  );
};
const mapStateToProps = (state) => {
  console.log(state, 'state');
  return {
    checked: state.checked.checked, //{checked} -> 그냥 checked로 사용가능
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     addChecked: () => dispatch(addChecked()), //앞에꺼는 같은 이름
//   };
// };
const mapDispatchToProps = {
  //간결
  healChecked: (checkedInputs) => healChecked(checkedInputs), //이 다음 넘긴 것을 action에서 처리
};
export default connect(mapStateToProps, mapDispatchToProps)(Health); //redux와 연결

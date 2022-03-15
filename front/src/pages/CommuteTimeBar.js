import React, { useState } from 'react';
import Slider from 'rc-slider';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { getTime } from '../redux/time/actions';
import 'rc-slider/assets/index.css';
import useSessionStorage from '../useSessionStorage';

function CommuteTimeBar({ getTime }) {
  //const [time, setTimeValue] = useState();
  const [time, setTimeValue] = useSessionStorage('time', 0);
  useEffect(() => {
    console.log('time: ', time);
    getTime(time);
  }, [time, setTimeValue]);

  const sliderProps = {
    min: 0,
    max: 120,
    step: 20,
    marks: {
      0: '0',
      20: '20',
      40: '40',
      60: '60',
      80: '80',
      100: '100',
      120: '120',
    },
  };

  return (
    <div className="CommuteTimeBar" style={{ display: 'absolute' }}>
      <Slider
        value={time}
        onChange={(val) => setTimeValue(val)}
        {...sliderProps}
        style={{ width: '300px', margin: '2.5%' }}
        handleStyle={{
          backgroundColor: '#CCE9CC',
          border: '1',
          borderColor: '#62a562',
        }}
        trackStyle={{ backgroundColor: '#cce9cc' }}
      />
    </div>
  );
}
const mapStateToProps = (state) => {
  console.log(state, 'state');
  return {
    time: state.checked.checked,
  };
};

const mapDispatchToProps = {
  getTime: (time) => getTime(time),
};
export default connect(mapStateToProps, mapDispatchToProps)(CommuteTimeBar);

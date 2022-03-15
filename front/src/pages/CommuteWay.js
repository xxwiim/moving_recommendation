import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getTransit } from '../redux/transit/actions';
import {
  MdDirectionsRun,
  MdDirectionsBus,
  MdDirectionsSubway,
  MdDirectionsCar,
} from 'react-icons/md';
import './CommuteWay.scss';
import useSessionStorage from '../useSessionStorage';

const CommuteWay = (props) => {
  //const [checked, setChecked] = useState('');
  const handleClick = (radioBtnName) => {
    setChecked(radioBtnName);
  };

  const [checked, setChecked] = useSessionStorage('transit', '');

  useEffect(() => {
    console.log('transit: ', checked);
    props.getTransit(checked);
  }, [checked, setChecked]);

  return (
    <div className="CommuteWay">
      <div
        id="run"
        style={{
          display: 'inline-block',
          float: 'left',
          marginLeft: '4%',
          textAlign: 'center',
          marginTop: '1%',
        }}
      >
        <MdDirectionsRun size="20" color="#009000" />
        <br />
        도보
        <br />
        <input
          type="radio"
          onClick={() => handleClick('walking')}
          checked={checked === 'walking'}
        />
      </div>
      <div
        id="bus"
        style={{
          display: 'inline-block',
          float: 'left',
          marginLeft: '3%',
          textAlign: 'center',
          marginTop: '1%',
        }}
      >
        <MdDirectionsBus size="20" color="#009000" />
        <br />
        버스
        <br />
        <input
          type="radio"
          onClick={() => handleClick('bus')}
          checked={checked === 'bus'}
        />
      </div>
      <div
        id="subway"
        style={{
          display: 'inline-block',
          float: 'left',
          marginLeft: '3%',
          textAlign: 'center',
          marginTop: '1%',
        }}
      >
        <MdDirectionsSubway size="20" color="#009000" />
        <br />
        지하철
        <br />
        <input
          type="radio"
          onClick={() => handleClick('subway')}
          checked={checked === 'subway'}
        />
      </div>
      <div
        id="car"
        style={{
          display: 'inline-block',
          float: 'left',
          marginLeft: '3%',
          textAlign: 'center',
          marginTop: '1%',
        }}
      >
        <MdDirectionsCar size="20" color="#009000" />
        <br />
        자차
        <br />
        <input
          type="radio"
          onClick={() => handleClick('driving')}
          checked={checked === 'driving'}
        />
        <br />
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  console.log(state, 'state');
  return {
    transit: state.checked.checked,
  };
};

const mapDispatchToProps = {
  getTransit: (transit) => getTransit(transit),
};
export default connect(mapStateToProps, mapDispatchToProps)(CommuteWay);

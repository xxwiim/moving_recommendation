import React, { useEffect, useState } from 'react';
import './Detail.scss';
import Popup from './Popup';
import Contents1 from './Contents1';
import Contents2 from './Contents2';
import Contents3 from './Contents3';

import useSessionStorage from '../useSessionStorage';
//import { set } from '../../node_modules/immer/dist/internal';

const DetailsforShare = () => {
  const [resultShare, setResultShare] = useSessionStorage('resultShare', []);
  const [result, setResult] = useState(resultShare[(3, 5)]);
  useEffect(() => {
    console.log(result);
  }, []);
  const [ashowPopup, setaShowPopup] = useState(false);
  const atogglePopup = () => {
    setaShowPopup(true);
  };
  const closeaPopup = () => {
    setaShowPopup(false);
  };

  const [bshowPopup, setbShowPopup] = useState(false);
  const btogglePopup = () => {
    setbShowPopup(true);
  };
  const closebPopup = () => {
    setbShowPopup(false);
  };

  const [cshowPopup, setcShowPopup] = useState(false);
  const ctogglePopup = () => {
    setcShowPopup(true);
  };
  const closecPopup = () => {
    setcShowPopup(false);
  };

  return (
    <div className="Detail">
      <div className="d1">
        <div className="number1" style={{ display: 'inline-block' }}>
          a
        </div>
        &nbsp;&nbsp;&nbsp;{result[0][0]}
        <br />
        <br />
        <div className="result1">
          • 2021년 공동주택 기준 평균 가격 {Math.round(result[0][1])}원
          <br />• {result[0][2]}
          <br />• {result[0][4]} {Math.round(result[0][3])}분
          <br />
          <button className="amore" onClick={atogglePopup}>
            +더보기
          </button>
          {ashowPopup && (
            <Popup
              visible={ashowPopup}
              closable={true}
              maskClosable={true}
              onClose={closeaPopup}
            >
              <Contents1 result1={result[0]} />
            </Popup>
          )}
          <br />
        </div>
        <br />
      </div>
      <div className="eval1"></div>
      <br />
      <div className="d2">
        <div className="number2" style={{ display: 'inline-block' }}>
          b
        </div>
        &nbsp;&nbsp;&nbsp;{result[1][0]}
        <br />
        <br />
        <div className="result2">
          • 2021년 공동주택 기준 평균 가격 {Math.round(result[1][1])}원
          <br />• {result[1][2]}
          <br />• {result[1][4]} {Math.round(result[1][3])}분
          <br />
          <div className="bmore" onClick={btogglePopup}>
            +더보기
          </div>
          {bshowPopup && (
            <Popup
              visible={bshowPopup}
              closable={true}
              maskClosable={true}
              onClose={closebPopup}
            >
              <Contents2 result2={result[1]} />
            </Popup>
          )}
          <br />
        </div>
      </div>
      <br />
      <div className="eval2"></div>
      <br />
      <div className="d3">
        <div className="number3" style={{ display: 'inline-block' }}>
          c
        </div>
        &nbsp;&nbsp;&nbsp;{result[2][0]}
        <br />
        <br />
        <div className="result3">
          • 2021년 공동주택 기준 평균 가격 {Math.round(result[2][1])}원
          <br />• {result[2][2]}
          <br />• {result[2][4]} {Math.round(result[2][3])}분
          <br />
          <div className="cmore" onClick={ctogglePopup}>
            +더보기
          </div>
          {cshowPopup && (
            <Popup
              visible={cshowPopup}
              closable={true}
              maskClosable={true}
              onClose={closecPopup}
            >
              <Contents3 result3={result[2]} />
            </Popup>
          )}
          <br />
        </div>
      </div>
      <br />
      <div className="eval2"></div>
      <br />
    </div>
  );
};

export default DetailsforShare;

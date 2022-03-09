import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { connect } from 'react-redux';
import { getResult } from '../redux/result/actions';
import { loadChecked } from '../redux/load/actions';
import './Detail.scss';
import Popup from './Popup';
import Contents1 from './Contents1';
import Contents2 from './Contents2';
import Contents3 from './Contents3';
import Evaluation from './Evaluation';
import API from '../API';
import Loading from './Loading';

const Details = ({ getResult, loadChecked }) => {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState('로딩중');

  useEffect(() => {
    const load = async () => {
      try {
        await submitServer();
      } catch (e) {
        console.log(e);
      }
    };

    load();
    console.log(result);
  }, []);

  useEffect(() => {
    console.log('result: ', result);
    getResult(result);
  }, [result, setResult]);

  const checked = useSelector((state) => state.checked);
  const location = useSelector((state) => state.location);
  const price = useSelector((state) => state.price);
  const transit = useSelector((state) => state.transit);
  const time = useSelector((state) => state.time);

  const submitServer = () => {
    API.post('/recommendation/input', {
      address: location['location'],
      price: [0, price['price']],
      transit: transit['transit'],
      limit: time['time'],
      option: [
        checked.edu,
        checked.hos,
        checked.fac,
        checked.wel,
        checked.shop,
        checked.heal,
      ].flat(),
    })
      .then(function (res) {
        setLoading(false);
        loadChecked(false);
        console.log('추천결과: ', res.data);
        setResult(res.data);
      })
      .then(() => {})
      .then(function (err) {
        console.log('err:', err);
      });
  };
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

  if (loading) return <Loading />;
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
        <br/>
      </div>
      <div className='eval1'>
            <Evaluation />
      </div>
      <br/>
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
      <div className='eval2'>
            <Evaluation />
      </div>
      <br/>
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
      <br/>
      <div className='eval2'>
            <Evaluation />
      </div>
      <br/>
    </div>
  );
};
const mapStateToProps = (state) => {
  console.log(state, 'state');
  return {
    result: state.result.result,
    load: state.load.load,
  };
};

const mapDispatchToProps = {
  getResult: (result) => getResult(result),
  loadChecked: (load) => loadChecked(load),
};

export default connect(mapStateToProps, mapDispatchToProps)(Details);

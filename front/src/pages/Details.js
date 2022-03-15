import React, { useState, Fragment } from 'react';
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
import { useHistory } from 'react-router-dom';
import Loader from 'react-spinner-loader';
import { css } from '@emotion/react';
import moment from '../../node_modules/moment/moment';
import useSessionStorage from '../useSessionStorage';
const Details = ({ getResult, loadChecked }) => {
  const [showEval, setShowEval] = useState(false);
  const history = useHistory();
  const [ResultForSession, setResultForSession] = useSessionStorage(
    'ResultForSession',
    [],
  );
  const [forShare, setForShare] = useSessionStorage('forShare', []);
  //const [result1List, setResultList1] = useState();
  const [Rate1, setRate1] = useState();
  const [Rate2, setRate2] = useState();
  const [Rate3, setRate3] = useState();
  const [showRate, setshowRate] = useState(false);

  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState('로딩중');
  //const [result, setResult] = useState([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    const load = async () => {
      try {
        loadChecked(true);
        submitServer();
      } catch (ex) {
        if (ex.response && ex.response.status === 400) {
          console.log('error 입니다');
        }
      }
    };
    setLoading(true);
    load();

    console.log(result);
  }, []);

  useEffect(() => {
    console.log('result: ', result);
    getResult(result);
    setForShare(result);
    console.log(result, '왜 언디파인드??');
    if (result !== '로딩중') {
      getRate(result).then(() => {
        setshowRate(true);
      });
    }
    // const newArray = [result[0][2], Rate1];
    // console.log(newArray);
    // [(result[0][2], Rate1)].map((result1) =>
    //   console.log('이건뭘까요? ', result1),
    // );
  }, [result, setResult]);

  const checked = useSelector((state) => state.checked);
  const location = useSelector((state) => state.location);
  //const AllAddress = useSelector((state) => state.alladdress);
  const price = useSelector((state) => state.price);
  const transit = useSelector((state) => state.transit);
  const time = useSelector((state) => state.time);

  //const submitServer = () => {
  const submitServer = async () => {
    const requestTime = moment().format('YYYY-MM-DD-HH-mm-ss');
    await API.post('/recommendation/input', {
      address: location['location'],
      price: [0, price['price']],
      transit: transit['transit'],
      limit: time['time'],
      option: [
        checked.edu,
        checked.children,
        checked.hos,
        checked.fac,
        checked.wel,
        checked.shop,
        checked.heal,
        checked.nature,
        checked.secure,
      ].flat(),
      requestTime: requestTime,
    })
      .then(function (res) {
        setLoading(false);
        loadChecked(false);
        console.log('error: ', error);
        console.log('추천결과: ', res.data);
        setResultForSession(res.data);
        const regionResult = res.data.slice(2);
        setResult(regionResult);

        // function setData() {
        //   return new Promise(function (resolve, reject) {
        //     setResult(regionResult);
        //     resolve(result);
        //   });
        // }

        // // resolve()의 결과 값 data를 resolvedData로 받음
        // setData().then(function (result) {
        //   console.log('프로미스!!!!', result); // 100
        //   getRate(result);
        // });

        //getRate(result);
        setShowEval(true);
      })
      .then((res) => {
        // getRate(result);
        //console.log('요청을 보냈습니다');
      })
      .catch(() => {
        console.log('error400입니다');
        history.push('/error');

        //return <Link to="/error" />;
        setError(true);
        //render(<ErrorPage />);
      });
  };

  const getRate = async (result) => {
    const resultlenght = result[0][2].length;
    console.log(resultlenght, '길이');
    let IndexList = [];

    for (var i = 0; i < resultlenght; i++) {
      IndexList.push(result[0][2][i]);
    }
    console.log(IndexList, '인덱스리스트 요청보냄');

    await API.post('/recommendation/getRate', {
      IndexList: IndexList,
      region1: result[0][0],
      region2: result[1][0],
      region3: result[2][0],
    }).then(function (res) {
      console.log(res, 'rate응답옴');
      setRate1(res.data[0]);
      console.log('data1:', res.data[0]);
      setRate2(res.data[1]);
      setRate3(res.data[2]);
      setshowRate(true);
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
  const override = css`
  primary:'#009000',
  secondary: '#009000'`;

  // console.log('되나', result1List);
  //return result1List;

  if (loading)
    return (
      <Loader
        show={loading}
        type="body"
        stack="vertical"
        message="Loading Data"
        spinnerStyle={override}
        spinnerSize="70px"
      />
    );

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
          <span className="bold1">2021년 공동주택 기준 평균 가격</span>{' '}
          {result[0][1]}원{'     '}
          <span className="bold1">{result[1][4]}</span>{' '}
          {Math.round(result[0][3])}분
          <br />
          {showEval && showRate ? (
            <Fragment>
              {result[0][2].map((result1) => (
                <span>
                  <span className="bold1">{result1[0]}</span>
                  <span className="number"> {result1[1]}</span>
                  {result1[0] == '범죄안전등급' ? (
                    <span>등급</span>
                  ) : result1[0] == '미세먼지' ? (
                    <span>㎍/m³</span>
                  ) : (
                    <span>개</span>
                  )}
                  &nbsp;&nbsp;&nbsp;
                  <span className={Rate1[result1[0]]}>{Rate1[result1[0]]}</span>
                  &nbsp;
                  <br />
                </span>
              ))}
            </Fragment>
          ) : null}
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
      <div className="eval1">
        {showEval && showRate ? (
          <Evaluation
            ResultForSession={ResultForSession}
            feedback={'feedback1'}
            showEval={showEval}
          />
        ) : null}
      </div>
      <br />
      <div className="d2">
        <div className="number2" style={{ display: 'inline-block' }}>
          b
        </div>
        &nbsp;&nbsp;&nbsp;{result[1][0]}
        <br />
        <br />
        <div className="result2">
          <span className="bold2">2021년 공동주택 기준 평균 가격</span>{' '}
          {result[1][1]}원{'     '}
          <span className="bold2">{result[1][4]}</span>{' '}
          {Math.round(result[1][3])}분
          <br />
          {showEval && showRate ? (
            <Fragment>
              {result[1][2].map((result1, idx) => (
                <span>
                  <span className="bold2">{result1[0]}</span>
                  <span className="number"> {result1[1]}</span>
                  {result1[0] == '범죄안전등급' ? (
                    <span>등급</span>
                  ) : result1[0] == '미세먼지' ? (
                    <span>㎍/m³</span>
                  ) : (
                    <span>개</span>
                  )}
                  &nbsp;&nbsp;&nbsp;
                  <span className={Rate2[result1[0]]}>
                    {' '}
                    {Rate2[result1[0]]}
                  </span>{' '}
                  <br />
                </span>
              ))}
            </Fragment>
          ) : null}
          {/* <span className="bold2">{result[1][4]}</span>{' '}
          {Math.round(result[1][3])}분*/}
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
      <div className="eval2">
        {showEval && showRate ? (
          <Evaluation
            ResultForSession={ResultForSession}
            feedback={'feedback2'}
            showEval={showEval}
          />
        ) : null}
      </div>
      <br />
      <div className="d3">
        <div className="number3" style={{ display: 'inline-block' }}>
          c
        </div>
        &nbsp;&nbsp;&nbsp;{result[2][0]}
        <br />
        <br />
        <div className="result3">
          <span className="bold3">2021년 공동주택 기준 평균 가격</span>{' '}
          {result[2][1]}원{'     '}
          <span className="bold3">{result[1][4]}</span>{' '}
          {Math.round(result[2][3])}분
          <br />
          {showEval && showRate ? (
            <Fragment>
              {result[2][2].map((result1) => (
                <span>
                  <span className="bold3">{result1[0]}</span>
                  <span className="number"> {result1[1]}</span>
                  {result1[0] == '범죄안전등급' ? (
                    <span>등급</span>
                  ) : result1[0] == '미세먼지' ? (
                    <span>㎍/m³</span>
                  ) : (
                    <span>개</span>
                  )}
                  &nbsp;&nbsp;&nbsp;
                  <span className={Rate3[result1[0]]}>
                    {' '}
                    {Rate3[result1[0]]}
                  </span>{' '}
                  <br />
                </span>
              ))}
            </Fragment>
          ) : null}
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
      <div className="eval2">
        {showEval && showRate ? (
          <Evaluation
            ResultForSession={ResultForSession}
            feedback={'feedback3'}
            showEval={showEval}
          />
        ) : null}
      </div>
      <br />
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

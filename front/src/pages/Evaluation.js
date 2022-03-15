import React, { useState } from 'react';
import { MdThumbUp, MdThumbDown } from 'react-icons/md';
//import { set } from '../../node_modules/immer/dist/internal';
import './Evaluation.scss';
import { useEffect } from 'react';
import API from '../API';

const Evaluation = (/*feedback,*/ props /*ResultForSession*/) => {
  const ResultForSession = sessionStorage.getItem('ResultForSession');
  const resultForSession = props.ResultForSession;
  const userID = resultForSession[0]['userID'];
  const requestTime = resultForSession[1];
  const currentUrl = window.location.href + `result/${userID}/${requestTime}`;
  const [assess, setAssess] = useState(null);
  const [feedbackNo, setfeedbackNo] = useState(props.feedback);
  const [alarm, setAlarm] = useState(false);

  /*useEffect(() => {
    try {
      setAlarm(false);
      setfeedbackNo(feedback);
      console.log(feedbackNo);
      console.log(currentUrl);
    } catch (ex) {
      console.log('오류');
    }
  }, []);*/

  //const currentUrl = window.location.href;

  const submitAssess = async (tmp) => {
    console.log('확인"::::', resultForSession);
    console.log('확인"::::', userID);
    console.log('확인"::::', requestTime);
    //setcurrentUrl(window.location.href + `${userID}/${requestTime}`);
    await API.post(`/assess/${userID}/${requestTime}`, {
      resultForSession: resultForSession,
      feedbackNo: feedbackNo,
      assess: tmp,
    })
      .then(() => {
        console.log('보냈음!!!!!!!!><');
        console.log(currentUrl);
      })
      .then(() => {
        setAlarm(true);
        setAssess(tmp);
        if (alarm === true && assess === 'good') {
          alert('서버로 전송되었습니다!👍');
          setAlarm(false);
        }
        if (alarm === true && assess === 'bad') {
          alert('서버로 전송되었습니다!👎');
          setAlarm(false);
        }
      });
  };

  return (
    <div className="Evaluation">
      &nbsp;&nbsp;&nbsp;추천 결과에 만족하셨나요?
      <div
        className="likes"
        style={{ display: 'inline-block', float: 'right' }}
      >
        <button
          id="love"
          style={{ background: 'none', border: 'none' }}
          onClick={() => {
            submitAssess('good');
            alert('서버로 전송되었습니다!👍');
          }}
        >
          <MdThumbUp size="20" color="#009000" />
          &nbsp;&nbsp;
        </button>
        <button
          id="hate"
          style={{ background: 'none', border: 'none' }}
          onClick={() => {
            submitAssess('bad');
            alert('서버로 전송되었습니다!👎');
          }}
        >
          <MdThumbDown size="20" color="#009000" />
        </button>
      </div>
    </div>
  );
};

export default Evaluation;

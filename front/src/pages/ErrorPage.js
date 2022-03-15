import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ErrorPage.scss';
import { MdWarningAmber } from 'react-icons/md';

const ErrorPage = () => {
  return (
    <div className="ErrorPage">
      <div className="main-title">
        <Link to="/">Ubrs</Link>
      </div>
      <hr />
      <div className="back">
        <Link to="/recommendation">← 다시 설정</Link>
      </div>
      <div className="err" style={{ marginLeft: '45%', marginTop: '4%' }}>
        <MdWarningAmber size="130" color="#009000" />
      </div>
      <div
        className="errmessage"
        style={{ marginLeft: '47%', fontSize: '20pt', fontWeight: 'bold' }}
      >
        Sorry...
      </div>
      <br />
      <div
        className="errmessage2"
        style={{ fontSize: '11pt', textAlign: 'center', fontWeight: 'bold' }}
      >
        추천 결과가 없습니다.
        {/*<br />
        혹시 이렇게 하지는 않으셨나요?*/}
      </div>
      <br />
      <div className="errmessagedetail" style={{ fontSize: '10pt' }}>
        {/*1. 직장 위치와 예산, 통근 방법 및 수단을 입력하지 않았어요<br/>
          2. 현재 서울•경기•인천만 서비스가 가능해요<br/>
  3. 추천 결과가 충분하지 않은 지역이에요<br/>*/}
        추천 결과가 충분하지 않아요. 조건을 다시 설정해주세요
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default ErrorPage;

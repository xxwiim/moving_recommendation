import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ResultPage.scss';
import Location from './Location';
import DetailsforShare from './DetailsforShare';
//import Evaluation from './Evaluation';
import API from '../API';
import axios from '../../node_modules/axios/index';
import useSessionStorage from '../useSessionStorage';

const SharePage = () => {
  const [resultShare, setResultShare] = useSessionStorage('resultShare', []);

  useEffect(() => {
    const url = window.location.pathname;
    console.log(url);
    const urlArray = url.split('/');
    setResultShare(null);
    console.log(urlArray[2]);
    console.log(urlArray[3]);

    API.post(`/share/${urlArray[2]}/${urlArray[3]}`, {
      data: {
        userID: urlArray[2],
        requestTime: urlArray[3],
      },
    }).then((res) => {
      setResultShare(JSON.parse(res['data']));
      console.log(resultShare);
    });
  }, []);

  return (
    <div className="ResultPage">
      <div className="main-title">
        <Link to="/">Ubrs</Link>
      </div>
      <hr />
      <div className="back">
        <Link to="/recommendation">← 다시 설정</Link>
      </div>

      <DetailsforShare result={resultShare} />
      <br />
      <br />
    </div>
  );
};

export default SharePage;

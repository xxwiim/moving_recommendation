import React, { useEffect, useState } from 'react';
import './SocialContent.scss';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterIcon,
  TwitterShareButton,
  LineShareButton,
  LineIcon,
} from 'react-share';
import API from '../API';

const SocialContent = () => {
  //const [currentUrl, setcurrentUrl] = useState();
  const ResultForSession = sessionStorage.getItem('ResultForSession');
  const resultForSession = JSON.parse(ResultForSession);
  const userID = resultForSession[0]['userID'];
  const requestTime = resultForSession[1];
  const currentUrl = window.location.href + `share/${userID}/${requestTime}`;
  const forShare = sessionStorage.getItem('forShare');
  const mapforShare = sessionStorage.getItem('mapforShare');

  useEffect(() => {
    try {
      submitSession();

      console.log(currentUrl);
    } catch (ex) {
      console.log('오류');
    }
  }, []);

  //const currentUrl = window.location.href;

  const submitSession = async () => {
    console.log('보냈음!!!!!!!!><');
    //setcurrentUrl(window.location.href + `${userID}/${requestTime}`);
    API.post(`/result/${userID}/${requestTime}`, {
      resultForSession: resultForSession,
      forShare: forShare,
      mapforShare: mapforShare,
    }).then(() => {
      //setcurrentUrl(res.body.url);
      console.log(currentUrl);
    });
  };

  return (
    <div className="SocialContent">
      <div className="title">공유하기</div>
      <br />
      <div className="description">Ubrs의 추천결과를 SNS에 공유해주세요</div>
      <br />
      <div className="share">
        <FacebookShareButton url={currentUrl} style={{ marginRight: '20px' }}>
          <FacebookIcon size={45} round={true} borderRadius={15}></FacebookIcon>
        </FacebookShareButton>
        <TwitterShareButton url={currentUrl} style={{ marginRight: '20px' }}>
          <TwitterIcon size={45} round={true} borderRadius={15}></TwitterIcon>
        </TwitterShareButton>
        <LineShareButton url={currentUrl} style={{ marginRight: '20px' }}>
          <LineIcon size={45} round={true} borderRadius={15}></LineIcon>
        </LineShareButton>
      </div>
    </div>
  );
};

export default SocialContent;

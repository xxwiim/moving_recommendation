import React from 'react';
import './SocialContent.scss';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterIcon,
  TwitterShareButton,
  LineShareButton,
  LineIcon,
} from 'react-share';

const SocialContent = () => {
  const currentUrl = window.location.href;
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

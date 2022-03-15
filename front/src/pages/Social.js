import React, { useEffect, useState } from 'react';
import { MdShare } from 'react-icons/md';
import SocialPopup from './SocialPopup';
import SocialContent from './SocialContent';
import API from '../API';

const Social = () => {
  /* useEffect(()=>{
    API.get("/:userID/:requestTime/",{

    })
  })*/
  const [showPopup, setshowPopup] = useState(false);
  const togglePopup = () => {
    setshowPopup(true);
  };
  const closePopup = () => {
    setshowPopup(false);
  };

  return (
    <div className="social">
      <button
        className="share"
        onClick={togglePopup}
        style={{
          float: 'right',
          marginRight: '10%',
          border: '0',
          backgroundColor: '#009000',
          color: 'white',
          padding: '0.7%',
          borderRadius: '10px',
          fontSize: '13px',
        }}
      >
        <MdShare color="white" size="20" />
        &nbsp;공유하기
      </button>
      {showPopup && (
        <SocialPopup
          visible={showPopup}
          closable={true}
          maskClosable={true}
          onClose={closePopup}
        >
          <SocialContent />
        </SocialPopup>
      )}
    </div>
  );
};

export default Social;

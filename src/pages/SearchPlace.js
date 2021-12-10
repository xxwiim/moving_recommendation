import React, { useState } from 'react';
import DaumPostCode from 'react-daum-postcode';
import MapContainer from './MapContainer';

const SearchPlace = () => {
    const [address, setAddress] = useState('');
    const [fullAddress, setFullAddress] = useState('');
    const [isDaumPost, setIsDaumPost] = useState(false);

    const handleOpenPost = () => {
        setIsDaumPost(!isDaumPost);
    };

    // postcode
    const handleAddress = (data) => {
        let AllAddress = data.address;
        let extraAddress = '';
        
        if (data.addressType === 'R') {
          if (data.bname !== '') {
            extraAddress += data.bname;
          }
          if (data.buildingName !== '') {
            extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
          }
          AllAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
        setAddress(data.zonecode);
        setFullAddress(AllAddress);
        setIsDaumPost(false);
      };
      
        // DaumPostCode style
        const width = "500px";
        const height = "150px";
        const modalStyle = {
            position: "absolute",
            zIndex: "100",
            border: "1px solid #000000",
            overflow: "hidden",
            width: "500px",
            height: "300px"
        }

        return (
              <div className="modalRow">
                  <div className="modalCell">
                    <div className="address" style={{display: 'inline'}}>
                      <input placeholder="직장의 주소를 입력해주세요" value={fullAddress} style={{width: '320px', marginLeft: "1%", marginTop: "1%", height: '22px', backgroundColor: "#CCE9CC", borderRadius: '10px', border: 'none'}} />
                    </div>
                      <div className="cellFirst" style={{display: 'inline'}}>
                          <button type="button" onClick={handleOpenPost} style={{backgroundColor: '#009000', color: 'white', borderRadius: '10px', marginLeft: "1%"}} >
                              <span>주소 찾기</span>
                          </button>
                      </div>
                      {
                          isDaumPost ?
                              <DaumPostCode
                                  onComplete={handleAddress}
                                  autoClose
                                  width={width}
                                  height={height}
                                  style={modalStyle}
                                  isDaumPost={isDaumPost}
                          		/>
                          : null
                      }{console.log(fullAddress)}
                  </div>
                  <MapContainer searchPlace={fullAddress} />
              </div>
        );
};

export default SearchPlace;
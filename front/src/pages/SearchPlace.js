import React, { useEffect, useState } from 'react';
import DaumPostCode from 'react-daum-postcode';
import MapContainer from './MapContainer';
import { useHistory } from '../../node_modules/react-router-dom/index';
//import { connect } from 'react-redux';
//import { getalladdress } from '../redux/alladdress/action'; //action
import useSessionStorage from '../useSessionStorage';

const SearchPlace = ({ getalladdress }) => {
  const [address, setAddress] = useState('');
  //const [fullAddress, setFullAddress] = useState('');
  const [isDaumPost, setIsDaumPost] = useState(false);
  const history = useHistory();
  const [fullAddress, setFullAddress] = useSessionStorage('fullAddress', '');
  //useEffect(() => {
  //console.log('fac: ', checkedInputs);
  //getalladdress(fullAddress);
  //}, [fullAddress, setFullAddress]);

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
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      AllAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    if (
      !(
        AllAddress.includes('서울') ||
        AllAddress.includes('인천') ||
        AllAddress.includes('경기')
      )
    ) {
      alert('현재 서울•경기•인천만 서비스가 가능해요');
      setAddress(37.5465770572176, 126.96458430932942);
      setFullAddress(' 수도권 지역으로 다시 설정해주세요 ');
      setIsDaumPost(false);

      //history.push('/recommendation');
    } else {
      setAddress(data.zonecode);
      setFullAddress(AllAddress);
      setIsDaumPost(false);
    }
  };

  // DaumPostCode style
  const width = '500px';
  const height = '150px';
  const modalStyle = {
    position: 'absolute',
    zIndex: '100',
    border: '1px solid #000000',
    overflow: 'hidden',
    width: '500px',
    height: '300px',
  };

  return (
    <div className="modalRow">
      <div className="modalCell">
        <div className="address" style={{ display: 'inline' }}>
          <input
            placeholder="직장의 주소를 입력해주세요"
            value={fullAddress}
            style={{
              width: '320px',
              marginLeft: '1%',
              marginTop: '1%',
              height: '22px',
              backgroundColor: '#CCE9CC',
              borderRadius: '10px',
              border: 'none',
            }}
          />
        </div>
        <div className="cellFirst" style={{ display: 'inline' }}>
          <button
            type="button"
            onClick={handleOpenPost}
            style={{
              backgroundColor: '#009000',
              color: 'white',
              borderRadius: '10px',
              marginLeft: '1%',
            }}
          >
            <span>주소 찾기</span>
          </button>
        </div>

        {isDaumPost ? (
          <DaumPostCode
            onComplete={handleAddress}
            autoClose
            width={width}
            height={height}
            style={modalStyle}
            isDaumPost={isDaumPost}
          />
        ) : null}
        {console.log(fullAddress)}
      </div>
      <MapContainer searchPlace={fullAddress} />
    </div>
  );
};

/*const mapStateToProps = (state) => {
  console.log(state, 'state');
  return {
    alladdress: state.alladdress,
  };
};

const mapDispatchToProps = {
  getalladdress: (fullAddress) => getalladdress(fullAddress),
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPlace);*/

export default SearchPlace;

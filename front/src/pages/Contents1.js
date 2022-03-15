import React, { useState } from 'react';
import { useEffect } from 'react';
import API from '../API';
import './Contents1.scss';
import {
  MdSchool,
  MdOutlineBabyChangingStation,
  MdOutlineLocalHospital,
  MdOutlineLocalLibrary,
  MdFavorite,
  MdShoppingCart,
  MdOutlineAccessibilityNew,
  MdNaturePeople,
  MdFrontHand,
} from 'react-icons/md';

const Contents1 = (props) => {
  const [DBresult1, setDBResult1] = useState('로딩중');
  useEffect(() => {
    console.log('props.result1: ', props.result1);
    console.log('props.result1[0]: ', props.result1[0]);
    API.get('/result/popup/', {
      params: { id: 1, dong_name: props.result1[0] },
    }).then((res) => {
      setDBResult1(res.data);
      console.log('DBresult1: ', res.data);
    });
  }, []);

  return (
    <div className="Contents1">
      <div className="d1">
        <div className="number1" style={{ display: 'inline-block' }}>
          a
        </div>
        &nbsp;&nbsp;&nbsp;{props.result1[0]}
        <div className="result1">
          • <span className="bold1">2021년 공동주택 기준 평균 가격</span>
          {'  '}
          {props.result1[1]}원
          <br />•{' '}
          {props.result1[2].map((result1) => (
            <span>
              <span className="bold1">{result1[0]}</span> :{' '}
              <span className="number"> {result1[1]} </span>
              {result1[0] == '범죄안전등급' ? (
                <span>등급</span>
              ) : result1[0] == '미세먼지' ? (
                <span>㎍/m³</span>
              ) : (
                <span>개</span>
              )}{' '}
            </span>
          ))}
          <br />• <span className="bold1">{props.result1[4]}</span>
          {'  '}
          {Math.round(props.result1[3])}분
          <br />
        </div>
      </div>
      <div className="detailedContents">
        <div className="edu">
          <MdSchool size="20" color="#009000" />
          &nbsp;교육시설
          <div className="educontents">
            학원 {DBresult1['학원']}개 초등학교 {DBresult1['초등학교']}개 중학교{' '}
            {DBresult1['중학교']}개 고등학교 {DBresult1['고등학교']}개가
            있습니다.
          </div>
        </div>
        <br />
        <div className="children">
          <MdOutlineBabyChangingStation size="20" color="#009000" />
          &nbsp;어린이시설
          <div className="childrencontents">
            유치원 및 어린이집 {DBresult1['유치원 및 어린이집']}개 놀이터{' '}
            {DBresult1['놀이터']}개가 있습니다.
          </div>
        </div>
        <br />
        <div className="medi">
          <MdOutlineLocalHospital size="20" color="#009000" />
          &nbsp;의료시설
          <div className="medicontents">
            병의원 및 약국 {DBresult1['병의원 및 약국']}개 보건소{' '}
            {DBresult1['보건소']}개 응급의료기관시설{' '}
            {DBresult1['응급의료기관시설']}개가 있습니다.
          </div>
        </div>
        <br />
        <div className="facility">
          <MdOutlineLocalLibrary size="20" color="#009000" />
          &nbsp;여가시설
          <div className="facicontents">
            영화관 {DBresult1['영화관']}개 카페 {DBresult1['카페']}개 도서관{' '}
            {DBresult1['도서관']}개가 있습니다.
          </div>
        </div>
        <br />
        <div className="welfare">
          <MdFavorite size="20" color="#009000" />
          &nbsp;노인복지시설
          <div className="welcontents">
            경로당 {DBresult1['경로당']}개 사회복지관 {DBresult1['사회복지관']}
            개가 있습니다.
          </div>
        </div>
        <br />
        <div className="shopping">
          <MdShoppingCart size="20" color="#009000" />
          &nbsp;쇼핑시설
          <div className="shopcontents">
            백화점 {DBresult1['백화점']}개 대형마트 {DBresult1['대형마트']}개
            복합쇼핑센터 {DBresult1['복합쇼핑센터']}개 시장 {DBresult1['시장']}
            개가 있습니다.
          </div>
        </div>
        <br />
        <div className="health">
          <MdOutlineAccessibilityNew size="20" color="#009000" />
          &nbsp;체육 및 공원시설
          <div className="healthcontents">
            헬스장 {DBresult1['헬스장']}개 수영장 {DBresult1['수영장']}개 체육관{' '}
            {DBresult1['체육관']}개 공원 {DBresult1['공원']}개가 있습니다.
          </div>
        </div>
        <br />
        <div className="nature">
          <MdNaturePeople size="20" color="#009000" />
          &nbsp;자연/환경
          <div className="naturecontents">
            등산로 {DBresult1['등산로']}개 산책로 {DBresult1['산책로']}개
            미세먼지 {DBresult1['미세먼지']}㎍/m³가 있습니다.
          </div>
        </div>
        <br />
        <div className="secure">
          <MdFrontHand size="20" color="#009000" />
          &nbsp;안전
          <div className="securecontents">
            범죄안전등급 {DBresult1['범죄안전등급']}등급 경찰관서{' '}
            {DBresult1['경찰관서']}개 여성안심지킴이집{' '}
            {DBresult1['여성안심지킴이집']}개가 있습니다.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contents1;

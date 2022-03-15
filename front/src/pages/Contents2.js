import React, { useState } from 'react';
import { useEffect } from 'react';
import API from '../API';
import { useSelector } from 'react-redux';
import './Contents2.scss';
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

const Contents2 = (props) => {
  const [DBresult2, setDBResult2] = useState('로딩중');
  useEffect(() => {
    API.get('/result/popup/', {
      params: { id: 2, dong_name: props.result2[0] },
    }).then((res) => {
      setDBResult2(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <div className="Contents2">
      <div className="d2">
        <div className="number2" style={{ display: 'inline-block' }}>
          b
        </div>
        &nbsp;&nbsp;&nbsp;{props.result2[0]}
        <div className="result2">
          • <span className="bold2">2021년 공동주택 기준 평균 가격</span>
          {'  '}
          {props.result2[1]}원
          <br />•{' '}
          {props.result2[2].map((result1) => (
            <span>
              <span className="bold2">{result1[0]}</span> :{' '}
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
          <br />• <span className="bold2">{props.result2[4]}</span>
          {'  '}
          {Math.round(props.result2[3])}분
          <br />
        </div>
      </div>
      <div className="detailedContents">
        <div className="edu">
          <MdSchool size="20" color="#009000" />
          &nbsp;교육시설
          <div className="educontents">
            학원 {DBresult2['학원']}개 초등학교 {DBresult2['초등학교']}개 중학교{' '}
            {DBresult2['중학교']}개 고등학교 {DBresult2['고등학교']}개가
            있습니다.
          </div>
        </div>
        <br />
        <div className="children">
          <MdOutlineBabyChangingStation size="20" color="#009000" />
          &nbsp;어린이시설
          <div className="childrencontents">
            유치원 및 어린이집 {DBresult2['유치원 및 어린이집']}개 놀이터{' '}
            {DBresult2['놀이터']}개가 있습니다.
          </div>
        </div>
        <br />
        <div className="medi">
          <MdOutlineLocalHospital size="20" color="#009000" />
          &nbsp;의료시설
          <div className="medicontents">
            병의원 및 약국 {DBresult2['병의원 및 약국']}개 보건소{' '}
            {DBresult2['보건소']}개 응급의료기관시설{' '}
            {DBresult2['응급의료기관시설']}개가 있습니다.
          </div>
        </div>
        <br />
        <div className="facility">
          <MdOutlineLocalLibrary size="20" color="#009000" />
          &nbsp;여가시설
          <div className="facicontents">
            영화관 {DBresult2['영화관']}개 카페 {DBresult2['카페']}개 도서관{' '}
            {DBresult2['도서관']}개가 있습니다.
          </div>
        </div>
        <br />
        <div className="welfare">
          <MdFavorite size="20" color="#009000" />
          &nbsp;노인복지시설
          <div className="welcontents">
            경로당 {DBresult2['경로당']}개 사회복지관 {DBresult2['사회복지관']}
            개가 있습니다.
          </div>
        </div>
        <br />
        <div className="shopping">
          <MdShoppingCart size="20" color="#009000" />
          &nbsp;쇼핑시설
          <div className="shopcontents">
            백화점 {DBresult2['백화점']}개 대형마트 {DBresult2['대형마트']}개
            복합쇼핑센터 {DBresult2['복합쇼핑센터']}개 시장 {DBresult2['시장']}
            개가 있습니다.
          </div>
        </div>
        <br />
        <div className="health">
          <MdOutlineAccessibilityNew size="20" color="#009000" />
          &nbsp;체육 및 공원시설
          <div className="healthcontents">
            헬스장 {DBresult2['헬스장']}개 수영장 {DBresult2['수영장']}개 체육관{' '}
            {DBresult2['체육관']}개 공원 {DBresult2['공원']}개가 있습니다.
          </div>
        </div>
        <br />
        <div className="nature">
          <MdNaturePeople size="20" color="#009000" />
          &nbsp;자연/환경
          <div className="naturecontents">
            등산로 {DBresult2['등산로']}개 산책로 {DBresult2['산책로']}개
            미세먼지 {DBresult2['미세먼지']}㎍/m³가 있습니다.
          </div>
        </div>
        <br />
        <div className="secure">
          <MdFrontHand size="20" color="#009000" />
          &nbsp;안전
          <div className="securecontents">
            범죄안전등급 {DBresult2['범죄안전등급']}등급 경찰관서{' '}
            {DBresult2['경찰관서']}개 여성안심지킴이집{' '}
            {DBresult2['여성안심지킴이집']}개가 있습니다.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contents2;

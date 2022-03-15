import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import API from '../API';
import './Contents3.scss';
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

const Contents3 = (props) => {
  const [DBresult3, setDBResult3] = useState('로딩중');
  useEffect(() => {
    API.get('/result/popup/', {
      params: { id: 3, dong_name: props.result3[0] },
    }).then((res) => {
      setDBResult3(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <div className="Contents3">
      <div className="d3">
        <div className="number3" style={{ display: 'inline-block' }}>
          c
        </div>
        &nbsp;&nbsp;&nbsp;{props.result3[0]}
        <div className="result3">
          • <span className="bold3">2021년 공동주택 기준 평균 가격</span>
          {'  '}
          {props.result3[1]}원
          <br />•{' '}
          {props.result3[2].map((result1) => (
            <span>
              <span className="bold3">{result1[0]}</span> :{' '}
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
          <br />• <span className="bold3">{props.result3[4]}</span>
          {'  '}
          {Math.round(props.result3[3])}분
          <br />
        </div>
      </div>
      <div className="detailedContents">
        <div className="edu">
          <MdSchool size="20" color="#009000" />
          &nbsp;교육시설
          <div className="educontents">
            학원 {DBresult3['학원']}개 초등학교 {DBresult3['초등학교']}개 중학교{' '}
            {DBresult3['중학교']}개 고등학교 {DBresult3['고등학교']}개가
            있습니다.
          </div>
        </div>
        <br />
        <div className="children">
          <MdOutlineBabyChangingStation size="20" color="#009000" />
          &nbsp;어린이시설
          <div className="childrencontents">
            유치원 및 어린이집 {DBresult3['유치원 및 어린이집']}개 놀이터{' '}
            {DBresult3['놀이터']}개가 있습니다.
          </div>
        </div>
        <br />
        <div className="medi">
          <MdOutlineLocalHospital size="20" color="#009000" />
          &nbsp;의료시설
          <div className="medicontents">
            병의원 및 약국 {DBresult3['병의원 및 약국']}개 보건소{' '}
            {DBresult3['보건소']}개 응급의료기관시설{' '}
            {DBresult3['응급의료기관시설']}개가 있습니다.
          </div>
        </div>
        <br />
        <div className="facility">
          <MdOutlineLocalLibrary size="20" color="#009000" />
          &nbsp;여가시설
          <div className="facicontents">
            영화관 {DBresult3['영화관']}개 카페 {DBresult3['카페']}개 도서관{' '}
            {DBresult3['도서관']}개가 있습니다.
          </div>
        </div>
        <br />
        <div className="welfare">
          <MdFavorite size="20" color="#009000" />
          &nbsp;노인복지시설
          <div className="welcontents">
            경로당 {DBresult3['경로당']}개 사회복지관 {DBresult3['사회복지관']}
            개가 있습니다.
          </div>
        </div>
        <br />
        <div className="shopping">
          <MdShoppingCart size="20" color="#009000" />
          &nbsp;쇼핑시설
          <div className="shopcontents">
            백화점 {DBresult3['백화점']}개 대형마트 {DBresult3['대형마트']}개
            복합쇼핑센터 {DBresult3['복합쇼핑센터']}개 시장 {DBresult3['시장']}
            개가 있습니다.
          </div>
        </div>
        <br />
        <div className="health">
          <MdOutlineAccessibilityNew size="20" color="#009000" />
          &nbsp;체육 및 공원시설
          <div className="healthcontents">
            헬스장 {DBresult3['헬스장']}개 수영장 {DBresult3['수영장']}개 체육관{' '}
            {DBresult3['체육관']}개 공원 {DBresult3['공원']}개가 있습니다.
          </div>
        </div>
        <br />
        <div className="nature">
          <MdNaturePeople size="20" color="#009000" />
          &nbsp;자연/환경
          <div className="naturecontents">
            등산로 {DBresult3['등산로']}개 산책로 {DBresult3['산책로']}개
            미세먼지 {DBresult3['미세먼지']}㎍/m³가 있습니다.
          </div>
        </div>
        <br />
        <div className="secure">
          <MdFrontHand size="20" color="#009000" />
          &nbsp;안전
          <div className="securecontents">
            범죄안전등급 {DBresult3['범죄안전등급']}등급 경찰관서{' '}
            {DBresult3['경찰관서']}개 여성안심지킴이집{' '}
            {DBresult3['여성안심지킴이집']}개가 있습니다.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contents3;

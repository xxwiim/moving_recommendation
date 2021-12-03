import React from 'react';
import './Contents1.scss';
import {MdSchool, MdOutlineLocalHospital, MdOutlineLocalLibrary, MdFavorite, MdShoppingCart, MdOutlineAccessibilityNew} from 'react-icons/md';

const Contents1 = () => {
    return (
        <div className="Contents1">
            <div className="d1" >
                <div className="number1" style={{display: 'inline-block'}}>
                    a
                </div>&nbsp;&nbsp;&nbsp;서울시 강서구 염창동
                <div className="result1">
                • 2021년 공동주택 기준 평균 가격 (2억 9천)만원<br/>
                • 내 직장 (숙명여자대학교)에서 가장 가까워요!<br/>
                • 도보 (20)분 버스 (10)분 지하철 (3)정거장<br/>
                </div>
            </div>
            <div className="detailedContents">
                <div className="edu">
                    <MdSchool size="20" color="#009000"/>&nbsp;교육시설
                    <div className="educontents">
                        학원 (134)개 초등학교 (3)개 중학교 (2)개 고등학교 (0)개 유치원 (1)개가 있습니다.
                    </div>
                </div><br/>
                <div className="medi">
                    <MdOutlineLocalHospital size='20' color="#009000"/>&nbsp;의료시설
                    <div className="medicontents">
                        약국 (14)개 병원 (44)개가 있습니다.
                    </div>
                </div><br/>
                <div className="facility">
                    <MdOutlineLocalLibrary size='20' color="#009000"/>&nbsp;여가시설
                    <div className="facicontents">
                        영화관 (1)개 카페 (13)개 공원 (1)개 놀이터 (3)개 도서관 (3)개가 있습니다.
                    </div>
                </div><br/>
                <div className="welfare">
                    <MdFavorite size='20' color="#009000"/>&nbsp;복지시설
                    <div className="welcontents">
                        어린이집 (1)개 경로당 (8)개 사회복지관 (0)개가 있습니다.
                    </div>
                </div><br/>
                <div className="shopping">
                    <MdShoppingCart size='20' color="#009000"/>&nbsp;쇼핑시설
                    <div className="shopcontents">
                    백화점 (0)개 대형마트 (0)개 복합쇼핑센터 (0)개 시장 (1)개가 있습니다.
                    </div>
                </div><br/>
                <div className="health">
                    <MdOutlineAccessibilityNew size='20' color="#009000"/>&nbsp;체육시설
                    <div className="healthcontents">
                    헬스장 (1)개 수영장 (1)개 체육관 (0)개가 있습니다.
                    </div>
                </div><br/>
            </div>
        </div>
    );
};

export default Contents1;
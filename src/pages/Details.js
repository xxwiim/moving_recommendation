import React, {useState} from 'react';
import './Detail.scss';
import Popup from './Popup';
import Contents1 from './Contents1';
import Contents2 from './Contents2';
import Contents3 from './Contents3';

const Details = () => {
    const [ashowPopup, setaShowPopup] = useState(false);
    const atogglePopup = () => {
        setaShowPopup(true);
    };
    const closeaPopup = () => {
        setaShowPopup(false)
    };

    const [bshowPopup, setbShowPopup] = useState(false);
    const btogglePopup = () => {
        setbShowPopup(true);
    };
    const closebPopup = () => {
        setbShowPopup(false)
    };

    const [cshowPopup, setcShowPopup] = useState(false);
    const ctogglePopup = () => {
        setcShowPopup(true);
    };
    const closecPopup = () => {
        setcShowPopup(false)
    };
    
    return (
        <div className="Detail">
            <div className="d1" >
                <div className="number1" style={{display: 'inline-block'}}>
                    a
                </div>&nbsp;&nbsp;&nbsp;서울시 강서구 염창동<br/><br/>
                <div className="result1">
                • 2021년 공동주택 기준 평균 가격 (2억 9천)만원<br/>
                • 내 직장 (숙명여자대학교)에서 가장 가까워요!<br/>
                • 도보 (20)분 버스 (10)분 지하철 (3)정거장<br/>
                    <button className="amore" onClick ={atogglePopup}>
                        +더보기
                    </button>
                    {
                        ashowPopup && 
                        <Popup visible={ashowPopup} closable={true} maskClosable={true} onClose={closeaPopup}>
                            <Contents1/>
                        </Popup>
                    }
                    <br/>
                </div>
            </div><br/>
            <div className="d2">
                <div className="number2" style={{display: 'inline-block'}}>
                    b
                </div>&nbsp;&nbsp;&nbsp;서울시 마포구 상암동<br/><br/>
                <div className="result2">
                • 2021년 공동주택 기준 평균 가격 (3억 8천)만원<br/>
                • 근처에 (학원)이 가장 많아요!<br/>
                • 도보 (40)분 버스 (30)분 지하철 (8)정거장<br/>
                    <div className="bmore" onClick={btogglePopup}>
                        +더보기
                    </div>
                    {
                        bshowPopup && 
                        <Popup visible={bshowPopup} closable={true} maskClosable={true} onClose={closebPopup}>
                            <Contents2/>
                        </Popup>
                    }
                    <br/>
                </div>
            </div><br/>
            <div className="d3">
                <div className="number3" style={{display: 'inline-block'}}>
                    c
                </div>&nbsp;&nbsp;&nbsp;서울시 양천구 신정동<br/><br/>
                <div className="result3">
                • 2021년 공동주택 기준 평균 가격 (4억 2천)만원<br/>
                • 근처에 (병원)이 가장 많아요!<br/>
                • 도보 (86)분 버스 (40)분 지하철 (8)정거장<br/>
                    <div className="cmore" onClick={ctogglePopup}>
                        +더보기
                    </div>
                    {
                        cshowPopup && 
                        <Popup visible={cshowPopup} closable={true} maskClosable={true} onClose={closecPopup}>
                            <Contents3/>
                        </Popup>
                    }
                    <br/>
                </div>
            </div>
        </div>
    )
}

export default Details;
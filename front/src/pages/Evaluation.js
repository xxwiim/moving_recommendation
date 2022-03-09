import React from 'react';
import {MdThumbUp, MdThumbDown} from 'react-icons/md';
import './Evaluation.scss';

const Evaluation = () => {
    return (
        <div className="Evaluation">
            &nbsp;&nbsp;&nbsp;추천 결과에 만족하셨나요?
            <div className="likes" style={{display: 'inline-block', float: 'right'}}>
                <button id="love" style={{background: 'none', border: 'none'}} onClick={() => {alert('서버로 전송되었습니다!👍');}}>
                    <MdThumbUp size="20" color="#009000"/>&nbsp;&nbsp;
                </button>
                <button id="hate" style={{background: 'none', border: 'none'}} onClick={() => {alert('서버로 전송되었습니다!👎');}}>
                    <MdThumbDown size="20" color="#009000"/>
                </button>
            </div>
        </div>
    )
}

export default Evaluation;
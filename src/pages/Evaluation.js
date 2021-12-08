import React from 'react';
import {MdThumbUp, MdThumbDown} from 'react-icons/md';
import './Evaluation.scss';

const Evaluation = () => {
    return (
        <div className="Evaluation">
            &nbsp;&nbsp;&nbsp;추천 결과에 만족하셨나요?
            <div className="likes" style={{display: 'inline-block', float: 'right'}}>
                <MdThumbUp size="20" color="#009000"/>&nbsp;&nbsp;
                <MdThumbDown size="20" color="#009000"/>
            </div>
        </div>
    )
}

export default Evaluation;
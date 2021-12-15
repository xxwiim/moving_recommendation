import React from 'react';
import { Link } from 'react-router-dom';
import './ResultPage.scss';
import Location from './Location';
import Details from './Details';
import Evaluation from './Evaluation';
import Social from './Social';

const ResultPage = () => {
    return (
        <div className="ResultPage">
            <div className="main-title">
                <Link to='/'>
                    Ubrs
                </Link>
            </div>
            <hr />
            <div className="back">
                <Link to='/recommendation'>
                    ← 다시 설정
                </Link>
            </div>
            <Location />
            <Details /><br/><br/>
            <Social /><br/><br/><br/>
            <Evaluation/><br/><br/>
        </div>
    )
};

export default ResultPage;

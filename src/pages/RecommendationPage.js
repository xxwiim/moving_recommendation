import React from 'react';
import './RecommendationPage.scss';
import { Link } from 'react-router-dom';
import SearchPlace from './SearchPlace';
import BudgetBar from './BudgetBar';
import CommuteWay from './CommuteWay';
import CommuteTimeBar from "./CommuteTimeBar";
import LifeStyleBtn from './LifeStyleBtn';

const RecommendationPage = () => {
    return (
        <div className='RecommendationPage'>
            <div className="main-title">
                <Link to='/main'>
                    Ubrs
                </Link>
            </div>
            <hr />
            <div className="workplace">
                나의 직장은 어디인가요?
            </div>
            <SearchPlace />
            <div className="budget">
                나의 예산은 얼마인가요? (단위: 억 원)
            </div>
            <BudgetBar />
            <div className="commute">
                선호하는 출근 방식과 시간을 선택해주세요. (단위: 분)
            </div>
            <CommuteWay /><br/><br/><br/>
            <CommuteTimeBar />
            <div className="lifestyle">
                어떤 지역에 살고싶나요?
            </div>
            <LifeStyleBtn />
            <div className="recommend" style={{marginLeft: "68%"}}>
                <Link to='./result'>
                추천받기
                </Link>
            </div><br/>
        </div>
    );
};

export default RecommendationPage;



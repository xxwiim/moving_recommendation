import React from 'react';
import './MainPage.scss';
import { Link } from 'react-router-dom';

const MainPage = () => {
    return (
        <div className="MainPage">
            <div className="main-title">
                <Link to='/main'>
                    Ubrs
                </Link>
            </div>
            <div className="content">
                <div className="content1"><br/><br/>근무지를 고려한<br/>맞춤형 거주지 추천 서비스.</div><br/>
                <div className="content2"><br/>수도권 직장인을 위한 1:1 거주지 추천 서비스<br/>
                Ubrs에서 원하는 집값, 직장과의 교통편, 그리고 라이프스타일까지 설정해보세요.</div>
                <div className="shortcuts"><br/>
                    <Link to='/recommendation'>
                        추천받으러 가기↗
                    </Link>
                </div>
            </div>
        </div>
    )
};

export default MainPage;
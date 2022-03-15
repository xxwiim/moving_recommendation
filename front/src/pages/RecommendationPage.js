import React, { useState } from 'react';
import { useEffect } from 'react';
import './RecommendationPage.scss';
import { Link, useHistory } from 'react-router-dom';
import SearchPlace from './SearchPlace';
import BudgetBar from './BudgetBar';
import CommuteWay from './CommuteWay';
import CommuteTimeBar from './CommuteTimeBar';
import LifeStyleBtn from './LifeStyleBtn';
import API from '../API';
import { useSelector } from 'react-redux';
import ErrorPage from './ErrorPage';

const RecommendationPage = (props, { text }) => {
  const history = useHistory();

  const [nextPage, setNextPage] = useState();

  const location = useSelector((state) => state.location);
  const price = useSelector((state) => state.price);
  const transit = useSelector((state) => state.transit);
  const time = useSelector((state) => state.time);
  const checked = useSelector((state) => state.checked);

  const checkedList = () => {
    let list = [];
    list = list.concat(
      checked.children,
      checked.edu,
      checked.fac,
      checked.secure,
      checked.shop,
      checked.wel,
    );

    list = list.filter((element, i) => element !== undefined);
    return list;
  };

  useEffect(() => {
    if (
      location === undefined ||
      price === 0 ||
      transit === '' ||
      time === 0 ||
      checked ===
        {
          children: [],
          edu: [],
          fac: [],
          heal: [],
          hos: [],
          secure: [],
          shop: [],
          wel: [],
        }
    ) {
      console('확인');
      setNextPage(false);
      setNextPage(true);
    } else {
      setNextPage(true);
    }
  }, [location, price, transit, time, checked]);

  const nextPageConfirm2 = () => {
    console.log(
      'loca',
      location,
      'price:',
      price,
      'transit: ',
      transit,
      'time: ',
      transit,
      'checked: ',
      checked,
    );
  };

  const nextPageConfirm = () => {
    /*console.log(
      'loca',
      location,
      'price:',
      price,
      'transit: ',
      transit,
      'time: ',
      transit,
      'checked: ',
      checked,
    );*/
    const list = checkedList();
    console.log('checkList: ****', list);
    console.log('locations', location);
    console.log('price', price);
    console.log('transit', transit);
    console.log('time', time);

    if (
      location === undefined ||
      price === 0 ||
      transit === '' ||
      time === 0 ||
      list.length === 0
      /*checked ===
        {
          children: [],
          edu: [],
          fac: [],
          heal: [],
          hos: [],
          secure: [],
          shop: [],
          wel: [],
        }*/
    ) {
      alert(
        '직장 위치와 예산, 통근 방법 및 수단을 입력하지 않았어요\n모두 선택해주세요',
      );
    } else {
      console.log('여기로옴');
      history.push('/result');
      //history.push('/error');
    }
  };
  /*if (
      location === undefined ||
      price === 0 ||
      transit === '' ||
      time === 0 ||
      checked ===
        {
          children: [],
          edu: [],
          fac: [],
          heal: [],
          hos: [],
          secure: [],
          shop: [],
          wel: [],
        }
    ) {
      console('확인');
      setNextPage(false);
    } else {
      setNextPage(true);
    }*/

  return (
    <div className="RecommendationPage">
      <div className="main-title">
        <Link to="/">Ubrs</Link>
      </div>
      <hr />
      <div className="workplace">나의 직장은 어디인가요?</div>
      <SearchPlace />
      <div className="budget">나의 예산은 얼마인가요? (단위: 억 원)</div>
      <BudgetBar />
      <div className="commute">
        선호하는 출근 방식과 시간을 선택해주세요. (단위: 분)
      </div>
      <CommuteWay />
      <br />
      <br />
      <br />
      <CommuteTimeBar />
      <div className="lifestyle">어떤 지역에 살고싶나요?</div>
      <LifeStyleBtn />

      <div className="recommend" style={{ marginLeft: '68%' }}>
        <button className="recommendbt" onClick={nextPageConfirm}>
          추천받기
        </button>

        {/*<Link onClick={nextPageConfirm}>추천받기</Link>*/}
      </div>
      <br />
    </div>
  );
};
/*<Link onclick={nextPageConfirm} to="/result">
          추천받기
  </Link>*/
export default RecommendationPage;

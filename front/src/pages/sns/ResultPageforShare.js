import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../ResultPage.scss';
import Location from '../Location';
import Details from '../Details';
import Social from '../Social';
import API from '../API';
import { useSelector } from 'react-redux';
import { connect } from 'react-redux';
import { getResult } from '../redux/result/actions';
import { loadChecked } from '../redux/load/actions';
import Loading from '../Loading';
import { Container } from 'react-dom';

const ResultPage = ({ getResult, loadChecked }) => {
  const change = useSelector((state) => state.load.load);
  console.log('change: ', change);
  useEffect(() => {
    if (change === false) {
      setshowMap(true);
    } else {
      setshowMap(false);
    }
  }, [change]);

  const [showMap, setshowMap] = useState(false);

  return (
    <div className="ResultPage">
      <div className="main-title">
        <Link to="/">Ubrs</Link>
      </div>
      <hr />
      <div className="back">
        <Link to="/recommendation">← 다시 설정</Link>
      </div>
      {showMap && <Location />}
      <Details />
      <br />
      <br />
      {/*<Social />*/}
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state, 'state');
  return {
    result: state.result.result,
  };
};

const mapDispatchToProps = {
  getResult: (result) => getResult(result),
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultPage);

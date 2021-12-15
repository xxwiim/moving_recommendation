import React, { useState } from 'react';
import './LifeStyleBtn.scss';
import Education from './Education';
import Medical from './Medical';
import Facility from './Facility';
import Welfare from './Welfare';
import Shopping from './Shopping';
import Health from './Health';
import {
  MdSchool,
  MdOutlineLocalHospital,
  MdOutlineLocalLibrary,
  MdFavorite,
  MdShoppingCart,
  MdOutlineAccessibilityNew,
} from 'react-icons/md';

const LifeStyleBtn = (props) => {
  const [eduView, setEduView] = useState(false);
  const [mediView, setMediView] = useState(false);
  const [faciView, setFaciView] = useState(false);
  const [welView, setWelView] = useState(false);
  const [shopView, setShopView] = useState(false);
  const [healthView, setHealthView] = useState(false);

  return (
    <div className="Buttons">
      <div className="edu">
        <button id="school" type="button" onClick={() => setEduView(true)}>
          <MdSchool color="#009000" size="20" />
          &nbsp;교육시설
        </button>
        {eduView ? <Education /> : null}
      </div>
      <div className="medi">
        <button id="hospital" type="button" onClick={() => setMediView(true)}>
          <MdOutlineLocalHospital color="#009000" size="20" />
          &nbsp;의료시설
        </button>
        {mediView ? <Medical /> : null}
      </div>
      <div className="facility">
        <button id="facility" type="button" onClick={() => setFaciView(true)}>
          <MdOutlineLocalLibrary color="#009000" size="20" />
          &nbsp;여가시설
        </button>
        {faciView ? <Facility /> : null}
      </div>
      <div className="welfare">
        <button id="welfare" type="button" onClick={() => setWelView(true)}>
          <MdFavorite color="#009000" size="20" />
          &nbsp;복지시설
        </button>
        {welView ? <Welfare /> : null}
      </div>
      <div className="shopping">
        <button id="shopping" type="button" onClick={() => setShopView(true)}>
          <MdShoppingCart color="#009000" size="20" />
          &nbsp;쇼핑시설
        </button>
        {shopView ? <Shopping /> : null}
      </div>
      <div className="health">
        <button id="health" type="button" onClick={() => setHealthView(true)}>
          <MdOutlineAccessibilityNew color="#009000" size="20" />
          &nbsp;체육시설
        </button>
        {healthView ? <Health /> : null}
      </div>
    </div>
  );
};

export default LifeStyleBtn;

import React, { useState } from 'react';
import './LifeStyleBtn.scss';
import Education from './Education';
import Children from './Children';
import Medical from './Medical';
import Facility from './Facility';
import Welfare from './Welfare';
import Shopping from './Shopping';
import Health from './Health';
import Nature from './Nature';
import Secure from './Secure';
import {
  MdSchool,
  MdOutlineBabyChangingStation,
  MdOutlineLocalHospital,
  MdOutlineLocalLibrary,
  MdFavorite,
  MdShoppingCart,
  MdOutlineAccessibilityNew,
  MdNaturePeople,
  MdFrontHand,
} from 'react-icons/md';
import useSessionStorage from '../useSessionStorage';

const LifeStyleBtn = (props) => {
  /*const [eduView, setEduView] = useState(false);
  const [childrenView, setChildrenView] = useState(false);
  const [mediView, setMediView] = useState(false);
  const [faciView, setFaciView] = useState(false);
  const [welView, setWelView] = useState(false);
  const [shopView, setShopView] = useState(false);
  const [healthView, setHealthView] = useState(false);
  const [natureView, setNatureView] = useState(false);
  const [secureView, setSecureView] = useState(false);*/

  const [eduView, setEduView] = useSessionStorage('eduView', false);
  const [childrenView, setChildrenView] = useSessionStorage(
    'childrenView',
    false,
  );
  const [mediView, setMediView] = useSessionStorage('mediView', false);
  const [faciView, setFaciView] = useSessionStorage('faciView', false);
  const [welView, setWelView] = useSessionStorage('welView', false);
  const [shopView, setShopView] = useSessionStorage('shopView', false);
  const [healthView, setHealthView] = useSessionStorage('healthView', false);
  const [natureView, setNatureView] = useSessionStorage('natureView', false);
  const [secureView, setSecureView] = useSessionStorage('secureView', false);

  return (
    <div className="Buttons">
      <div className="edu">
        <button
          id="school"
          type="button"
          onClick={() => (eduView ? setEduView(false) : setEduView(true))}
        >
          <MdSchool color="#009000" size="20" />
          &nbsp;교육시설
        </button>
        {eduView ? <Education /> : null}
      </div>
      <div className="children">
        <button
          id="baby"
          type="button"
          onClick={() =>
            childrenView ? setChildrenView(false) : setChildrenView(true)
          }
        >
          <MdOutlineBabyChangingStation color="#009000" size="20" />
          &nbsp;어린이시설
        </button>
        {childrenView ? <Children /> : null}
      </div>
      <div className="medi">
        <button
          id="hospital"
          type="button"
          onClick={() => (mediView ? setMediView(false) : setMediView(true))}
        >
          <MdOutlineLocalHospital color="#009000" size="20" />
          &nbsp;의료시설
        </button>
        {mediView ? <Medical /> : null}
      </div>
      <div className="facility">
        <button
          id="facility"
          type="button"
          onClick={() => (faciView ? setFaciView(false) : setFaciView(true))}
        >
          <MdOutlineLocalLibrary color="#009000" size="20" />
          &nbsp;여가시설
        </button>
        {faciView ? <Facility /> : null}
      </div>
      <div className="welfare">
        <button
          id="welfare"
          type="button"
          onClick={() => (welView ? setWelView(false) : setWelView(true))}
        >
          <MdFavorite color="#009000" size="20" />
          &nbsp;노인복지시설
        </button>
        {welView ? <Welfare /> : null}
      </div>
      <div className="shopping">
        <button
          id="shopping"
          type="button"
          onClick={() => (shopView ? setShopView(false) : setShopView(true))}
        >
          <MdShoppingCart color="#009000" size="20" />
          &nbsp;쇼핑시설
        </button>
        {shopView ? <Shopping /> : null}
      </div>
      <div className="health">
        <button
          id="health"
          type="button"
          onClick={() =>
            healthView ? setHealthView(false) : setHealthView(true)
          }
        >
          <MdOutlineAccessibilityNew color="#009000" size="20" />
          &nbsp;체육 및 공원시설
        </button>
        {healthView ? <Health /> : null}
      </div>
      <div className="nature">
        <button
          id="nature"
          type="button"
          onClick={() =>
            natureView ? setNatureView(false) : setNatureView(true)
          }
        >
          <MdNaturePeople color="#009000" size="20" />
          &nbsp;자연/환경
        </button>
        {natureView ? <Nature /> : null}
      </div>
      <div className="secure">
        <button
          id="secure"
          type="button"
          onClick={() =>
            secureView ? setSecureView(false) : setSecureView(true)
          }
        >
          <MdFrontHand color="#009000" size="20" />
          &nbsp;안전
        </button>
        {secureView ? <Secure /> : null}
      </div>
    </div>
  );
};

export default LifeStyleBtn;

import React, { useState } from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { getPrice } from '../redux/price/actions';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import useSessionStorage from '../useSessionStorage';

import API from '../API';
function BudgetBar({ getPrice }) {
  //const [price, setPrice] = useState(0)

  const [price, setPrice] = useSessionStorage('price', 0);
  useEffect(() => {
    console.log('price: ', price);
    getPrice(price);
  }, [price, setPrice]);

  const sliderProps = {
    min: 0,
    max: 1000000000,
    step: 100000000,
    marks: {
      0: '0',
      100000000: '1',
      200000000: '2',
      300000000: '3',
      400000000: '4',
      500000000: '5',
      600000000: '6',
      700000000: '7',
      800000000: '8',
      900000000: '9',
      1000000000: '10',
    },
  };

  return (
    <div className="BudgetBar" style={{ display: 'absolute' }}>
      <Slider
        value={price}
        onChange={(val) => setPrice(val)}
        {...sliderProps}
        style={{ width: '400px', margin: '2.5%' }}
        handleStyle={{
          backgroundColor: '#CCE9CC',
          border: '1',
          borderColor: '#62a562',
        }}
        trackStyle={{ backgroundColor: '#CCE9CC' }}
      />
    </div>
  );
}
const mapStateToProps = (state) => {
  console.log(state, 'state');
  return {
    price: state.checked.checked,
  };
};

const mapDispatchToProps = {
  getPrice: (price) => getPrice(price),
};
export default connect(mapStateToProps, mapDispatchToProps)(BudgetBar);

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
//import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
//import rootReducer from './modules';

////const store = createStore(rootReducer, composeWithDevTools());
console.log(store.getState());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

reportWebVitals();

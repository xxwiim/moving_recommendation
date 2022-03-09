import React from 'react';
import { Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import RecommendationPage from './pages/RecommendationPage';
import ResultPage from './pages/ResultPage';
import ErrorPage from './pages/ErrorPage';

const App = () => {
  return (
    <>
      <Route component={MainPage} path exact="/" />
      <Route component={RecommendationPage} path="/recommendation" />
      <Route component={ResultPage} path="/result" />
      <Route component={ErrorPage} path='/error' />
    </>
  );
};

export default App;

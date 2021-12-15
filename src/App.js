import React from 'react';
import { Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import RecommendationPage from './pages/RecommendationPage';
import ResultPage from './pages/ResultPage';

const App = () => {
  return (
    <>
      <Route component={MainPage} path exact="/" />
      <Route component={RecommendationPage} path="/recommendation" />
      <Route component={ResultPage} path="/result" />
    </>
  );
};

export default App;

import Loader from 'react-spinner-loader';
import { Oval } from 'react-loader-spinner';
import SpinContainer from 'react-loader-spinner';
import './Loading.scss';

function Loading() {
  return (
    <div className="load">
      <Loader type="body" message="Loading Data" />
    </div>
  );
}

export default Loading;

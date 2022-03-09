import Loader from 'react-loader-spinner';
import SpinContainer from 'react-loader-spinner';
import './Loading.scss';

function Loading() {
  return (
    <div className="load">
      <SpinContainer>
        <Loader type="Oval" color="green" height={30} width={30} />
      </SpinContainer>
    </div>
  );
}

export default Loading;

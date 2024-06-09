import React from 'react';
import {TailSpin} from 'react-loader-spinner'


const LoaderEffect = ({ loading }) => {
  return (
    <div className="loader-container">
      <TailSpin type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  );
};

export default LoaderEffect;

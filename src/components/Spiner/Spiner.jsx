import React from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const Spiner = () => {
  const styles = {
    height: '60vh',
    width: '1100px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: '999',
  };

  return (
    <div style={styles}>
      {' '}
      <Loader type="Grid" color="#3EB060" height={100} width={100} />{' '}
    </div>
  );
};

export default Spiner;

import React from 'react';
import loading from './loading.gif';

const Loading = () => {
  return <div
    style={{
      width: '100%',
      marginTop: '0%',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'fixed',
      top: 0,
      left: 0,
      backgroundColor: '#fff',
      zIndex: 9999,
      opacity: 0.7
    }}
  >
    <img src={loading} alt="Loading..." />
  </div>
}

export default Loading;

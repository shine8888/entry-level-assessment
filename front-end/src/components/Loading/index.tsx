import React from 'react';
import { Spin } from 'antd';

import './styles.scss';

const Loading = () => {
  return (
    <div className="loading">
      <Spin />
    </div>
  );
};

export default Loading;

import { Button, Input, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { LIST_STATUS } from '../../constants';
import Sessions from '../Sessions';
import { SessionResponse } from '../../types/types';

import './styles.scss';
import { fetchSessionData, getFilteredData } from '../../utils/utils';
import Loading from '../Loading';

const HomePage = () => {
  // Usestate
  const [datasource, setDatasource] = useState(undefined);
  const [tempDatasource, setTempDatasource] = useState<
    SessionResponse[] | undefined
  >(datasource);
  const [shortTitle, setShortTitle] = useState('');
  const [status, setStatus] = useState('');

  // Handle functions
  const onSetShortTitle = (value: string) => {
    setShortTitle(value);
    const filteredData = getFilteredData({
      status,
      shortTitle,
      data: datasource,
    });
    setTempDatasource(filteredData);
  };

  const onSelectStatusValue = (value: string) => {
    setStatus(value);
    const filteredData = getFilteredData({
      status,
      shortTitle,
      data: datasource,
    });
    setTempDatasource(filteredData);
  };

  const onFilterSessions = async () => {
    const { data } = await fetchSessionData({ status, shortTitle });
    setDatasource(data);
    setTempDatasource(data);
  };

  // UseEffect to update data
  useEffect(() => {
    if (!status && !shortTitle) {
      setTempDatasource(datasource);
    }
  }, [status, shortTitle, datasource]);

  useEffect(() => {
    const main = async () => {
      const { data } = await fetchSessionData({});
      setDatasource(data);
    };

    main();
  }, []);

  if (!datasource) return <Loading />;

  return (
    <div>
      <div className="searching-container">
        <div className="searching-wrapper">
          <Input
            placeholder="Short title input"
            onChange={(e) => onSetShortTitle(e.target.value)}
            style={{ width: 300 }}
            allowClear
          />
          <Select
            style={{ width: 300 }}
            placeholder="Status"
            allowClear
            onChange={(value) => onSelectStatusValue(value)}
          >
            {LIST_STATUS.map((type) => (
              <Select.Option key={type} value={type}>
                {type}
              </Select.Option>
            ))}
          </Select>
        </div>

        <Button type="primary" onClick={() => onFilterSessions()}>
          Search
        </Button>
      </div>

      {tempDatasource && <Sessions data={tempDatasource} />}
    </div>
  );
};

export default HomePage;

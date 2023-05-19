import React from 'react';
import { Card } from 'antd';
import DateFns from 'date-fns';
import { formatDate } from '../../utils/utils';

const { Meta } = Card;

interface SessionCardProps {
  programTitle: string;
  imgThumbnailUrl: string;
  startDate: string;
  endDate: string;
}
const SessionCard = ({
  programTitle,
  imgThumbnailUrl,
  startDate,
  endDate,
}: SessionCardProps) => {
  return (
    <Card
      style={{ width: 400 }}
      cover={
        <img
          alt="example"
          src={imgThumbnailUrl}
          style={{ height: 250, width: 400 }}
        />
      }
      hoverable
    >
      <Meta
        title={programTitle}
        description={`${formatDate(startDate)} - ${formatDate(endDate)}`}
      />
    </Card>
  );
};

export default SessionCard;

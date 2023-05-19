import React from 'react';
import { SessionResponse } from '../../types/types';
import SessionCard from '../Card';
import { Col, Row } from 'antd';

import './styles.scss';

interface SessionProps {
  data: SessionResponse[];
}

const Sessions = ({ data }: SessionProps) => {
  return (
    <Row gutter={[32, 32]} className="session-cards-container">
      {data.map((session, i) => (
        <Col xs={32} sm={12} lg={6} key={i}>
          <SessionCard
            key={`${session.id}_${session.program.id}`}
            programTitle={session.program.display_title}
            imgThumbnailUrl={session.program.thumbnail_img_url}
            startDate={session.start_date}
            endDate={session.end_date}
          />
        </Col>
      ))}
    </Row>
  );
};

export default Sessions;

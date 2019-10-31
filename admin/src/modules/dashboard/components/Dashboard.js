import React from 'react';

import {
  Card
} from 'antd';

const data = Array(25).fill().map(Math.random);
export default function Dashboard() {
  return (
    <Card
      title={<div>Dashboard</div>}
    >
    some shits here
    </Card>
  );
}

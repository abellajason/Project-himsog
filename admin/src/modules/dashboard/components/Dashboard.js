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
      <h1>Malnourishment status in map </h1>
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d251170.19456105938!2d123.70620594883302!3d10.379071837973026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a999258dcd2dfd%3A0x4c34030cdbd33507!2sCebu%20City%2C%20Cebu!5e0!3m2!1sen!2sph!4v1572483883387!5m2!1sen!2sph" width="1200" height="450" frameborder="0" style={{border:'0'}} allowfullscreen=""></iframe>

      <div style={{marginTop:'30px'}}>
        <h1>Malnourishment status in chart</h1>
        <iframe src="//datawrapper.dwcdn.net/Wa2Ci/16/" scrolling="no" frameborder="0" allowtransparency="true" width="1100" height="400"></iframe>
      </div>
    </Card>
  );
}

import React from 'react';
import { Route } from 'react-router-dom';
import DonationList from './containers/DonationList';

export default function UsersRoutes() {
  return (
    <div>
      <Route exact path="/donations/list/:pageNum?" component={DonationList}></Route>
    </div>
  );
}

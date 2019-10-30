import React from 'react';
import { Route } from 'react-router-dom';
import VolunteerList from './containers/VolunteerList';
// import VolunteerAdd from './containers/VolunteerAdd';

export default function UsersRoutes() {
  return (
    <div>
      <Route exact path="/volunteers/list/:pageNum?" component={VolunteerList}></Route>
      {
        /*
        <Route exact path="/volunteers/add" component={VolunteerAdd}></Route>
        */
      }
    </div>
  );
}

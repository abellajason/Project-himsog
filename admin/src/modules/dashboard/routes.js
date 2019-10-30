import React from 'react';
import { Route } from 'react-router-dom';
import Dashboard from './containers/Dashboard';
// import VolunteerAdd from './containers/VolunteerAdd';

export default function UsersRoutes() {
  return (
    <div>
      <Route exact path="/dashboard" component={Dashboard}></Route>
      {
        /*
        <Route exact path="/volunteers/add" component={VolunteerAdd}></Route>
        */
      }
    </div>
  );
}

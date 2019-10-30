import React from 'react';
import { Route } from 'react-router-dom';
import UserList from './containers/UserList';
import UserAdd from './containers/UserAdd';

export default function UsersRoutes() {
  return (
    <div>
      <Route exact path="/users/list/:pageNum?" component={UserList}></Route>
      <Route exact path="/users/add" component={UserAdd}></Route>
    </div>
  );
}

import React from 'react';
import { Route } from 'react-router-dom';
import AdminList from './containers/AdminList';
import AdminAdd from './containers/AdminAdd';

export default function UsersRoutes() {
  return (
    <div>
      <Route exact path="/admins/list/:pageNum?" component={AdminList}></Route>
      <Route exact path="/admins/add" component={AdminAdd}></Route>
    </div>
  );
}

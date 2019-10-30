import React from 'react';
import { Route } from 'react-router-dom';
import ChildrenList from './containers/ChildrenList';
import ChildrenAdd from './containers/ChildrenAdd';

export default function UsersRoutes() {
  return (
    <div>
      <Route exact path="/children/list/:pageNum?" component={ChildrenList}></Route>
      <Route exact path="/children/add" component={ChildrenAdd}></Route>
    </div>
  );
}

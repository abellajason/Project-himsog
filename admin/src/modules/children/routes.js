import React from 'react';
import { Route } from 'react-router-dom';
import ChildrenList from './containers/ChildrenList';
import ChildrenAdd from './containers/ChildrenAdd';
import ChildrenView from './containers/ChildrenView';

export default function UsersRoutes() {
  return (
    <div>
      <Route exact path="/children/list/:pageNum?" component={ChildrenList}></Route>
      <Route exact path="/children/add" component={ChildrenAdd}></Route>
      <Route exact path="/children/view/:_id" component={ChildrenView}></Route>
    </div>
  );
}

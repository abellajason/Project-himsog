import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getChildren } from '../actions';

import Component from '../components/ChildrenList';

const mapStateToProps = function (state) {
  return {
    ...state.core,
    users: state.users,
  };
};

const mapDispatchToProps = function (dispatch) {
  return (
    bindActionCreators({
      getChildren,
    }, dispatch)
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);

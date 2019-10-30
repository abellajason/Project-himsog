import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createChild } from '../actions';

import Component from '../components/ChildrenAdd';

const mapStateToProps = function (state) {
  return {
    ...state.core,
    children: state.children,
  };
};

const mapDispatchToProps = function (dispatch) {
  return (
    bindActionCreators({
      createChild,
    }, dispatch)
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);

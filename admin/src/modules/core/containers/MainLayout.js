import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { logout } from '../actions';

import Component from '../components/MainLayout';

const mapStateToProps = function (state) {
  return {
    ...state.core,

  };
};

const mapDispatchToProps = function (dispatch) {
  return (
    bindActionCreators({
      logout,
    }, dispatch)
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);

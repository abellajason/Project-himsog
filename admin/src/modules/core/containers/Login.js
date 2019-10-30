import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { login } from '../actions';
import Component from '../components/Login';

const mapStateToProps = function (state) {
  return {
    ...state.core,
  };
};

const mapDispatchToProps = function (dispatch) {
  return (
    bindActionCreators({
      login,
    }, dispatch)
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);

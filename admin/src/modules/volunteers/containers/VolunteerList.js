import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUsers, patchUser } from '../../users/actions';

import Component from '../components/VolunteerList';

const mapStateToProps = function (state) {
  return {
    ...state.core,
    users: state.users,
  };
};

const mapDispatchToProps = function (dispatch) {
  return (
    bindActionCreators({
      getUsers,
      patchUser
    }, dispatch)
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);

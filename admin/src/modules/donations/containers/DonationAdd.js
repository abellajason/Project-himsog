import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createDonation } from '../actions';

import Component from '../components/DonationAdd';

const mapStateToProps = function (state) {
  return {
    ...state.core,
  };
};

const mapDispatchToProps = function (dispatch) {
  return (
    bindActionCreators({
      createDonation,
    }, dispatch)
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);

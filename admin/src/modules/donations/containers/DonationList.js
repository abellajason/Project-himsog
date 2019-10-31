import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getDonations } from '../actions';

import Component from '../components/DonationList';

const mapStateToProps = function (state) {
  return {
    ...state.core,
    donations: state.donations,
  };
};

const mapDispatchToProps = function (dispatch) {
  return (
    bindActionCreators({
      getDonations,
    }, dispatch)
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getChildren } from '../actions';
import { getRecords, createRecord } from '../../records/actions'
import Component from '../components/ChildrenView';

const mapStateToProps = function (state, props) {
  const { _id } = props.match.params;

  return {
    ...state.core,
    _id,
    children: state.children,
    childDetails: state.children.byId[_id],
    records: state.records,
  };
};

const mapDispatchToProps = function (dispatch) {
  return (
    bindActionCreators({
      getChildren,
      getRecords,
      createRecord,
    }, dispatch)
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);

import { updateById } from '../../lib/helpers';

const defaultState = {
  byId: {},
};

export default function recordsReducer(state = defaultState, action) {
  switch (action.type) {
    case 'RECORD_LIST': {
      let byId = { ...state.byId };

      action.data.data.forEach((row) => {
        byId = updateById(byId, row);
      });

      return {
        ...state,
        byId,
      };
    }

    case 'UPDATE_RECORD':
    case 'CREATE_RECORD': {
      return {
        ...state,
        byId: updateById(state.byId, action.data),
      };
    }

    default: return state;
  }
}

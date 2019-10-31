import { updateById } from '../../lib/helpers';

const defaultState = {
  byId: {},
};

export default function donationsReducer(state = defaultState, action) {
  switch (action.type) {
    case 'DONATION_LIST': {
      let byId = { ...state.byId };

      action.data.data.forEach((row) => {
        byId = updateById(byId, row);
      });

      return {
        ...state,
        byId,
      };
    }

    case 'UPDATE_DONATION':
    case 'CREATE_DONATION': {
      return {
        ...state,
        byId: updateById(state.byId, action.data),
      };
    }

    default: return state;
  }
}

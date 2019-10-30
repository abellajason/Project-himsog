import { updateById } from '/lib/helpers';

const defaultState = {
  byId: {},
};

export default function usersReducer(state = defaultState, action) {
  switch (action.type) {
    case 'USER_LIST': {
      let byId = { ...state.byId };

      action.data.data.forEach((row) => {
        byId = updateById(byId, row);
      });

      return {
        ...state,
        byId,
      };
    }

    case 'UPDATE_USER':
    case 'CREATE_USER': {
      return {
        ...state,
        byId: updateById(state.byId, action.data),
      };
    }

    default: return state;
  }
}

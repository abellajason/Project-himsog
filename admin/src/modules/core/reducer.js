const defaultData = {
  isAuthenticated: null,
  mainUser: null,
};

export default function coreReducer(state = defaultData, action) {
  switch (action.type) {
    case 'LOGIN': {
      return {
        ...state,
        isAuthenticated: true,
        mainUser: { ...(action.mainUser || {}) },
        forceReload: false,
      };
    }

    case 'LOGOUT': {
      return {
        ...state,
        isAuthenticated: false,
        mainUser: undefined,
      };
    }

    // case 'UPDATE_USER': {
    //   if (state.mainUser && state.mainUser._id && action.data && action.data._id === state.mainUser._id) {
    //     return {
    //       ...state,
    //       mainUser: { ...(state.mainUser || {}), ...action.data },
    //     };
    //   }
    //
    //   break;
    // }

    default:
      return state;
  }

}

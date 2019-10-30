import app from '../../../feathers';

export function login({ email, password }) {
  return async function () {
    return await app.authenticate({
      strategy: 'local',
      email,
      password,
    });
  };
}

export function logout() {
  return async function (dispatch) {
    await app.logout();
    dispatch({ type: 'LOGOUT' });
  };
}

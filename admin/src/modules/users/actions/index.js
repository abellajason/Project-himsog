import app from '../../../feathers';

export function createUser(data) {
  return async function () {
    return await app.service('users').create(data);
  };
}

export function getUsers(query = {}) {
  return async function (dispatch) {
    const users = await app.service('users').find({
      query: {
        ...query,
      },
    });

    dispatch({ type: 'USER_LIST', data: users });

    return users;
  };
}

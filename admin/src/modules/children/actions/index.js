import app from '../../../feathers';

export function createChild(data) {
  return async function () {
    return await app.service('children').create(data);
  };
}

export function getChildren(query = {}) {
  return async function (dispatch) {
    const data = await app.service('children').find({
      query: {
        ...query,
      },
    });

    dispatch({ type: 'CHILD_LIST', data });

    return data;
  };
}

import app from '../../../feathers';


export function getRecords(query = {}) {
  return async function (dispatch) {
    const records = await app.service('records').find({
      query: {
        ...query,
      },
    });

    dispatch({ type: 'RECORD_LIST', data: records });

    return records;
  };
}

export function createRecord(data) {
  return async function () {
    return await app.service('records').create(data);
  };
}

import app from '../../../feathers';

export function createDonation(data) {
  return async function () {
    return await app.service('donations').create(data);
  };
}

export function getDonations(query = {}) {
  return async function (dispatch) {
    const data = await app.service('donations').find({
      query: {
        ...query,
      },
    });

    dispatch({ type: 'DONATION_LIST', data });

    return data;
  };
}

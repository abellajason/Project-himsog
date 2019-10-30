import app from '../../../feathers';

export function createDonation(data) {
  return async function () {
    return await app.service('donations').create(data);
  };
}

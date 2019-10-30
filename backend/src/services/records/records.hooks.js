const { authenticate } = require('@feathersjs/authentication').hooks;

function _calculateAge(birthday) { // birthday is a date
  var ageDifMs = Date.now() - birthday.getTime();
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [
      async (context) => {
        const { data, app } = context;
        const { weight, height, child_id } = data;

        if (child_id) {
          const { birthdate } = await app.service('children').get(child_id);
          if (birthdate) {
            data.age = _calculateAge(birthdate);
          }
        }

        if (weight && height) {
          const mHeight = height / 100;
          data.bmi = weight / (mHeight * mHeight);

          data.isMalnourished = data.bmi < 18.5;
        }

        return context;
      }
    ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [
      async (context) => {
        const { result: { child_id, age, bmi, weight, height }, app } = context;

        await app.service('children').patch(child_id, {
          age,
          bmi,
          weight,
          height
        });

        return context;
      }
    ],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};

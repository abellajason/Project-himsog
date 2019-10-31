const stripe = require('stripe')('sk_test_JlfWtBlvbsM0FzrARwksZe7h00H78fFbtK');


module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      async (context) => {
        const { amount, token, description, currency } = context.data;

        context.data.debug = await stripe.charges.create({ // eslint-disable-line
          amount: amount * 100,
          currency,
          description,
          source: token,
        });

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
    create: [],
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

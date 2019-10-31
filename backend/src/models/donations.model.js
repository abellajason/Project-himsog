// donations-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const donations = new Schema({
    name: String,
    organization: String,
    description: String,
    amount: Number,
    currency: String,
    token: String,
    debug: Schema.Types.Mixed,
  }, {
    timestamps: true
  });

  return mongooseClient.model('donations', donations);
};

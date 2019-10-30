// children-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const children = new Schema({
    firstname: { type: String },
    middlename: { type: String },
    lastname: { type: String },
    gender: { type: String },
    birthdate: { type: Date },
    height: { type: Number },
    weight: { type: Number },
    bmi: { type: Number },
    isMalnourished: { type: Boolean },
  }, {
    timestamps: true
  });

  return mongooseClient.model('children', children);
};
